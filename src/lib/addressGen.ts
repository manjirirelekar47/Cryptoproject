import { SeededRandom } from './prng'

export type Chain = 'BTC' | 'ETH' | 'TRON' | 'BSC'

export function isValidAddress(chain: Chain, address: string): boolean {
  const a = address.trim()
  switch (chain) {
    case 'BTC':
      return /^(bc1[a-z0-9]{20,60}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/.test(a)
    case 'ETH':
    case 'BSC':
      return /^0x[a-fA-F0-9]{40}$/.test(a)
    case 'TRON':
      return /^T[a-zA-Z0-9]{33}$/.test(a)
  }
}

export function genAddress(chain: Chain, rng: SeededRandom): string {
  switch (chain) {
    case 'BTC':
      return 'bc1q' + rng.hex(38)
    case 'ETH':
      return '0x' + rng.hex(40)
    case 'BSC':
      return '0x' + rng.hex(40)
    case 'TRON':
      return 'T' + rng.hex(1).toUpperCase() + rng.hex(32)
  }
}

export function shortAddr(address: string): string {
  if (address.length <= 14) return address
  return address.slice(0, 8) + '…' + address.slice(-6)
}

export function detectChain(address: string): Chain | null {
  const a = address.trim()
  if (/^(bc1[a-z0-9]{20,60}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/.test(a)) return 'BTC'
  if (/^T[a-zA-Z0-9]{33}$/.test(a)) return 'TRON'
  if (/^0x[a-fA-F0-9]{40}$/.test(a)) return 'ETH' // ETH/BSC share format; default ETH
  return null
}
