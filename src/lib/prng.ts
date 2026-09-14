// Deterministic seeded PRNG (mulberry32) so the same wallet address always
// produces the same trace in a demo/investigator setting — reproducible,
// explainable, and swappable later for live on-chain data (see architecture).

export function hashStringToSeed(str: string): number {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return h >>> 0
}

export function mulberry32(seed: number) {
  let a = seed
  return function () {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export class SeededRandom {
  private rand: () => number

  constructor(seedStr: string) {
    this.rand = mulberry32(hashStringToSeed(seedStr))
  }

  next(): number {
    return this.rand()
  }

  int(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min
  }

  float(min: number, max: number): number {
    return this.next() * (max - min) + min
  }

  pick<T>(arr: T[]): T {
    return arr[this.int(0, arr.length - 1)]
  }

  chance(probability: number): boolean {
    return this.next() < probability
  }

  hex(len: number): string {
    let s = ''
    const chars = '0123456789abcdef'
    for (let i = 0; i < len; i++) s += chars[this.int(0, 15)]
    return s
  }
}
