import { Hono } from 'hono'
import type { Bindings } from '../lib/types'
import { runTrace, FRAUD_TYPES, VaspRecord } from '../lib/traceEngine'
import { detectChain, isValidAddress, Chain } from '../lib/addressGen'

const api = new Hono<{ Bindings: Bindings }>()

// GET /api/fraud-types
api.get('/fraud-types', (c) => {
  return c.json({ fraudTypes: FRAUD_TYPES })
})

// GET /api/vasps  — list the exchange deposit-address registry
api.get('/vasps', async (c) => {
  const { results } = await c.env.DB.prepare(
    'SELECT id, name, chain, deposit_address, jurisdiction, kyc_tier, risk_tag FROM vasps ORDER BY name'
  ).all()
  return c.json({ vasps: results })
})

// GET /api/stats — headline counters for the dashboard
api.get('/stats', async (c) => {
  const caseCountRow = await c.env.DB.prepare('SELECT COUNT(*) as n FROM cases').first<{ n: number }>()
  const avgRiskRow = await c.env.DB.prepare('SELECT AVG(risk_score) as avg_risk FROM cases').first<{
    avg_risk: number | null
  }>()
  const attributedRow = await c.env.DB.prepare(
    "SELECT COUNT(*) as n FROM cases WHERE attributed_vasp_id IS NOT NULL"
  ).first<{ n: number }>()
  const vaspCountRow = await c.env.DB.prepare('SELECT COUNT(*) as n FROM vasps').first<{ n: number }>()
  const recent = await c.env.DB.prepare(
    `SELECT case_ref, input_address, chain, hop_count, cluster_size, risk_score, risk_band,
            attributed_vasp_name, created_at
     FROM cases ORDER BY created_at DESC LIMIT 8`
  ).all()

  const totalCases = caseCountRow?.n || 0
  const attributed = attributedRow?.n || 0

  return c.json({
    totalCases,
    attributionRate: totalCases > 0 ? Math.round((attributed / totalCases) * 100) : 0,
    avgRiskScore: avgRiskRow?.avg_risk ? Math.round(avgRiskRow.avg_risk) : 0,
    vaspRegistrySize: vaspCountRow?.n || 0,
    recentCases: recent.results,
  })
})

// GET /api/cases — full case history (paginated-ish, simple limit)
api.get('/cases', async (c) => {
  const limit = Math.min(parseInt(c.req.query('limit') || '20', 10), 100)
  const { results } = await c.env.DB.prepare(
    `SELECT case_ref, input_address, chain, fraud_type, hop_count, cluster_size, risk_score,
            risk_band, attributed_vasp_name, attributed_vasp_address, created_at
     FROM cases ORDER BY created_at DESC LIMIT ?`
  )
    .bind(limit)
    .all()
  return c.json({ cases: results })
})

// GET /api/cases/:ref — full detail incl. graph
api.get('/cases/:ref', async (c) => {
  const ref = c.req.param('ref')
  const row = await c.env.DB.prepare('SELECT * FROM cases WHERE case_ref = ?').bind(ref).first()
  if (!row) return c.json({ error: 'Case not found' }, 404)
  return c.json({
    ...row,
    graph: JSON.parse(row.graph_json as string),
  })
})

// POST /api/trace  { address, chain?, fraudType }
api.post('/trace', async (c) => {
  const body = await c.req.json<{ address?: string; chain?: string; fraudType?: string }>()
  const rawAddress = (body.address || '').trim()

  if (!rawAddress) {
    return c.json({ error: 'Wallet address is required.' }, 400)
  }

  let chain = (body.chain as Chain) || detectChain(rawAddress)
  if (!chain) {
    return c.json({
      error:
        'Could not detect chain from address format. Please select BTC, ETH, TRON or BSC explicitly.',
    }, 400)
  }

  if (!isValidAddress(chain, rawAddress)) {
    return c.json({
      error: `"${rawAddress}" does not look like a valid ${chain} address. Check the format and try again.`,
    }, 400)
  }

  const fraudType = body.fraudType || 'investment_scam'

  const { results: vaspRows } = await c.env.DB.prepare(
    'SELECT id, name, chain, deposit_address, jurisdiction, kyc_tier, risk_tag FROM vasps'
  ).all()
  const vaspPool = vaspRows as unknown as VaspRecord[]

  const result = runTrace(rawAddress, chain, fraudType, vaspPool)

  // Persist case (idempotent-ish: same address+chain will regenerate same trace,
  // but we still log every run as a distinct investigator query for audit trail)
  try {
    await c.env.DB.prepare(
      `INSERT INTO cases
        (case_ref, input_address, chain, fraud_type, status, hop_count, cluster_size,
         mixer_exposure, risk_score, risk_band, attributed_vasp_id, attributed_vasp_name,
         attributed_vasp_address, graph_json)
       VALUES (?, ?, ?, ?, 'attributed', ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        result.caseRef,
        result.inputAddress,
        result.chain,
        result.fraudType.label,
        result.hopCount,
        result.clusterSize,
        result.mixerExposure ? 1 : 0,
        result.riskScore,
        result.riskBand,
        result.attributedVasp?.id ?? null,
        result.attributedVasp?.name ?? null,
        result.attributedVasp?.deposit_address ?? null,
        JSON.stringify({ nodes: result.nodes, edges: result.edges, timeline: result.timeline })
      )
      .run()

    await c.env.DB.prepare(
      `INSERT INTO app_stats (key, value) VALUES ('total_cases_processed', '1')
       ON CONFLICT(key) DO UPDATE SET value = CAST(CAST(value AS INTEGER) + 1 AS TEXT)`
    ).run()
  } catch (e) {
    // Non-fatal: still return the trace result even if logging fails
    console.error('Failed to persist case', e)
  }

  return c.json(result)
})

export default api
