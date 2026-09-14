import { SeededRandom } from './prng'
import { Chain, genAddress, shortAddr } from './addressGen'

export interface GraphNode {
  id: string
  address: string
  chain: Chain
  type: 'source' | 'wallet' | 'mixer' | 'bridge' | 'exchange' | 'cluster'
  hop: number
  label: string
  clusterId?: string
  vaspName?: string
  jurisdiction?: string
  kycTier?: string
}

export interface GraphEdge {
  id: string
  from: string
  to: string
  chain: Chain
  amount: number
  asset: string
  txHash: string
  timestampOffsetMin: number
  bridged: boolean
}

export interface FraudTypology {
  key: string
  label: string
}

export const FRAUD_TYPES: FraudTypology[] = [
  { key: 'investment_scam', label: 'Investment / Trading Scam' },
  { key: 'task_fraud', label: 'Task-Based Fraud' },
  { key: 'sextortion', label: 'Sextortion' },
  { key: 'ransomware', label: 'Ransomware' },
  { key: 'phishing', label: 'Phishing' },
  { key: 'darknet', label: 'Darknet Marketplace' },
]

export interface VaspRecord {
  id: number
  name: string
  chain: string
  deposit_address: string
  jurisdiction: string
  kyc_tier: string
  risk_tag: string
}

export interface TraceResult {
  caseRef: string
  inputAddress: string
  chain: Chain
  fraudType: FraudTypology
  hopCount: number
  clusterSize: number
  mixerExposure: boolean
  bridgeHops: number
  chainsInvolved: Chain[]
  riskScore: number
  riskBand: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
  riskFactors: { label: string; weight: number; detail: string }[]
  attributedVasp: VaspRecord | null
  nodes: GraphNode[]
  edges: GraphEdge[]
  totalAmountEstimateInr: number
  timeline: { hop: number; minutesElapsed: number; note: string }[]
}

const ALL_CHAINS: Chain[] = ['BTC', 'ETH', 'TRON', 'BSC']

function assetForChain(chain: Chain): string {
  return { BTC: 'BTC', ETH: 'ETH', TRON: 'USDT-TRC20', BSC: 'BNB' }[chain]
}

/**
 * Deterministic multi-hop trace simulation.
 *
 * Production note (see Technical Approach): this function is the seam where
 * live chain data plugs in — Etherscan/BscScan/Tronscan + Blockchair/Bitquery
 * for real transaction graphs, feeding the same clustering + risk-scoring
 * pipeline below unchanged. For the demo it uses a seeded PRNG so the same
 * input address always reproduces the same trace (explainable & reproducible
 * — the same duty-of-care requirement chain forensics reports demand).
 */
export function runTrace(
  inputAddress: string,
  chain: Chain,
  fraudTypeKey: string,
  vaspPool: VaspRecord[]
): TraceResult {
  const rng = new SeededRandom(inputAddress.toLowerCase() + '|' + chain)
  const fraudType = FRAUD_TYPES.find((f) => f.key === fraudTypeKey) || FRAUD_TYPES[0]

  const nodes: GraphNode[] = []
  const edges: GraphEdge[] = []

  const hopCount = rng.int(3, 6)
  const sourceId = 'n0'
  nodes.push({
    id: sourceId,
    address: inputAddress,
    chain,
    type: 'source',
    hop: 0,
    label: 'Reported wallet',
  })

  let currentId = sourceId
  let currentChain = chain
  let cumulativeMinutes = 0
  let mixerExposure = false
  let bridgeHops = 0
  const chainsInvolvedSet = new Set<Chain>([chain])
  const timeline: TraceResult['timeline'] = [
    { hop: 0, minutesElapsed: 0, note: `Victim-reported ${chain} wallet ingested from complaint` },
  ]

  // Base amount, degrades slightly (fees/layering) hop to hop
  let amount = rng.float(15000, 850000) // INR-equivalent value at first hop
  const totalAmountEstimateInr = amount

  const clusterId = 'cluster-' + rng.hex(6)

  for (let h = 1; h <= hopCount; h++) {
    const nextId = 'n' + h
    cumulativeMinutes += rng.int(4, 45)

    // Decide node type for this hop
    let nodeType: GraphNode['type'] = 'wallet'
    let willBridge = false
    let isMixer = false

    const isLastHop = h === hopCount

    if (!isLastHop) {
      if (rng.chance(0.16)) {
        isMixer = true
        mixerExposure = true
        nodeType = 'mixer'
      } else if (rng.chance(0.22) && ALL_CHAINS.length > 1) {
        willBridge = true
        nodeType = 'bridge'
      }
    }

    let nextChain = currentChain
    if (willBridge) {
      const candidates = ALL_CHAINS.filter((c) => c !== currentChain)
      nextChain = rng.pick(candidates)
      bridgeHops++
      chainsInvolvedSet.add(nextChain)
    }

    const addr = genAddress(nextChain, rng)
    nodes.push({
      id: nextId,
      address: addr,
      chain: nextChain,
      type: isLastHop ? 'wallet' : nodeType,
      hop: h,
      label: isMixer ? 'Mixer / tumbler service' : willBridge ? 'Cross-chain bridge contract' : `Hop ${h} wallet`,
      clusterId: !isMixer ? clusterId : undefined,
    })

    amount = amount * rng.float(0.86, 0.98) // layering fee/dust loss

    edges.push({
      id: 'e' + h,
      from: currentId,
      to: nextId,
      chain: willBridge ? currentChain : nextChain,
      amount: Math.round(amount),
      asset: assetForChain(willBridge ? currentChain : nextChain),
      txHash: (nextChain === 'TRON' ? '' : '0x') + rng.hex(nextChain === 'TRON' ? 40 : 64),
      timestampOffsetMin: cumulativeMinutes,
      bridged: willBridge,
    })

    timeline.push({
      hop: h,
      minutesElapsed: cumulativeMinutes,
      note: isMixer
        ? `Funds routed through a mixing service — exposure flagged, confidence-scored not blocked`
        : willBridge
        ? `Cross-chain bridge hop: ${currentChain} → ${nextChain}`
        : `Layering hop ${h} on ${nextChain}`,
    })

    currentId = nextId
    currentChain = nextChain
  }

  // Attribution: pick a real VASP on the final chain if available, else mark unresolved
  const finalChain = currentChain
  const candidateVasps = vaspPool.filter((v) => v.chain === finalChain)
  let attributedVasp: VaspRecord | null = null
  if (candidateVasps.length > 0) {
    // Bias toward standard-KYC exchanges (more common) but allow high-risk ones through
    attributedVasp = rng.pick(candidateVasps)
  }

  const lastNode = nodes[nodes.length - 1]
  lastNode.type = 'exchange'
  lastNode.label = attributedVasp ? `${attributedVasp.name} deposit address` : 'Unattributed endpoint'
  if (attributedVasp) {
    lastNode.address = attributedVasp.deposit_address
    lastNode.vaspName = attributedVasp.name
    lastNode.jurisdiction = attributedVasp.jurisdiction
    lastNode.kycTier = attributedVasp.kyc_tier
  }

  cumulativeMinutes += rng.int(2, 10)
  timeline.push({
    hop: hopCount + 1,
    minutesElapsed: cumulativeMinutes,
    note: attributedVasp
      ? `Endpoint matched to ${attributedVasp.name} (${attributedVasp.jurisdiction}) deposit-address registry`
      : `Endpoint held in an unlabeled wallet — flagged for manual registry enrichment`,
  })

  // Cluster size: count of same-clusterId wallet nodes (excludes mixers/bridges/exchange)
  const clusterSize = nodes.filter((n) => n.clusterId === clusterId).length

  // --- Risk scoring model (weighted, explainable — never a black-box binary) ---
  const riskFactors: TraceResult['riskFactors'] = []
  let score = 20 // base

  const hopFactor = Math.min(hopCount * 6, 30)
  score += hopFactor
  riskFactors.push({
    label: 'Hop distance',
    weight: hopFactor,
    detail: `${hopCount} hops between report and endpoint — deeper layering raises risk`,
  })

  if (mixerExposure) {
    score += 25
    riskFactors.push({
      label: 'Mixer / tumbler exposure',
      weight: 25,
      detail: 'Funds passed through a known mixing service at least once',
    })
  }

  const bridgeFactor = bridgeHops * 8
  if (bridgeHops > 0) {
    score += bridgeFactor
    riskFactors.push({
      label: 'Cross-chain bridging',
      weight: bridgeFactor,
      detail: `${bridgeHops} bridge hop(s) across ${chainsInvolvedSet.size} chains — harder to subpoena a single custodian`,
    })
  }

  const clusterFactor = Math.min(clusterSize * 3, 15)
  score += clusterFactor
  riskFactors.push({
    label: 'Cluster size',
    weight: clusterFactor,
    detail: `${clusterSize} wallets heuristically grouped under one controlling entity`,
  })

  if (attributedVasp) {
    if (attributedVasp.risk_tag === 'high') {
      score += 15
      riskFactors.push({
        label: 'Destination KYC tier',
        weight: 15,
        detail: `${attributedVasp.name} (${attributedVasp.kyc_tier}) — weak KYC raises recovery difficulty`,
      })
    } else if (attributedVasp.risk_tag === 'elevated') {
      score += 7
      riskFactors.push({
        label: 'Destination KYC tier',
        weight: 7,
        detail: `${attributedVasp.name} (${attributedVasp.kyc_tier}) — moderate KYC assurance`,
      })
    } else {
      score -= 8
      riskFactors.push({
        label: 'Destination KYC tier',
        weight: -8,
        detail: `${attributedVasp.name} (${attributedVasp.kyc_tier}) — strong KYC improves freeze/recovery odds`,
      })
    }
  } else {
    score += 12
    riskFactors.push({
      label: 'Unattributed endpoint',
      weight: 12,
      detail: 'No registry match yet — flagged for manual enrichment and follow-up trace',
    })
  }

  score = Math.max(5, Math.min(99, Math.round(score)))
  let riskBand: TraceResult['riskBand'] = 'LOW'
  if (score >= 80) riskBand = 'CRITICAL'
  else if (score >= 60) riskBand = 'HIGH'
  else if (score >= 35) riskBand = 'MEDIUM'

  const caseRef = 'CFA-' + new Date().getFullYear() + '-' + rng.hex(6).toUpperCase()

  return {
    caseRef,
    inputAddress,
    chain,
    fraudType,
    hopCount,
    clusterSize,
    mixerExposure,
    bridgeHops,
    chainsInvolved: Array.from(chainsInvolvedSet),
    riskScore: score,
    riskBand,
    riskFactors,
    attributedVasp,
    nodes,
    edges,
    totalAmountEstimateInr: Math.round(totalAmountEstimateInr),
    timeline,
  }
}

export { shortAddr }
