# CRYPTO-ATTRIB // I4C — Real-Time Crypto Fraud Attribution System

A working prototype built from a hackathon pitch: trace a victim-reported crypto wallet address across multiple hops/chains and attribute it to a real exchange (VASP) deposit address — with a risk score and an investigator-ready report, in minutes instead of weeks.

**Built for**: Ministry of Home Affairs · I4C, CIS Division · Theme: Blockchain & Cybersecurity (30-hr hackathon submission)

**Live**: [cryptoproject.manjiri-relekar47.workers.dev](https://cryptoproject.manjiri-relekar47.workers.dev/)

---

## What's Implemented

1. **Marketing / pitch site** (`/`) — rebuilds all 15 slides of the original deck as an animated single page: Problem, Idea/Pipeline, Relevance & Reach, Technical Approach, Feasibility & Impact, Conclusion, Future Enhancements, References. Dark navy (`#0A1128`) + cyan/gold/green accent theme matching the deck's palette.
2. **Live interactive demo** (`/demo`) — a functional wallet-tracing tool:
   - Paste a BTC / ETH / TRON / BSC address (or use a sample) and pick a reported fraud type
   - A deterministic, seeded multi-hop trace engine (`src/lib/traceEngine.ts`) simulates cross-chain fund flow — mixer/tumbler detection, cross-chain bridge hops, wallet clustering — and matches the final hop against a VASP deposit-address registry in D1
   - Animated SVG fund-flow graph, risk gauge, explainable weighted risk-factor breakdown, hop-by-hop timeline
   - Every trace is persisted as a case in D1 and exposed as a shareable, printable investigator report (`/report/:caseRef`)
3. **Hono + Cloudflare D1 backend** (`src/routes/api.ts`) — `/api/trace`, `/api/vasps`, `/api/cases`, `/api/cases/:ref`, `/api/stats`, `/api/fraud-types`.

## URLs

- **Production**: https://cryptoproject.manjiri-relekar47.workers.dev
  - Landing page: `/`
  - Live demo: `/demo`
  - Sample report: `/report/<caseRef>` (caseRef returned by any trace)
- **GitHub**: https://github.com/manjirirelekar47/Cryptoproject

## Data Architecture

- **Storage**: Cloudflare D1 (SQLite at the edge)
  - `vasps` — seeded exchange deposit-address registry (WazirX, CoinDCX, ZebPay, Binance, OKX, KuCoin, HTX, Bybit, MEXC, and an illustrative no-KYC OTC desk) across BTC/ETH/TRON/BSC
  - `cases` — every trace run: input address, chain, fraud type, hop count, cluster size, mixer exposure, risk score/band, attributed VASP, full graph JSON, timestamp
  - `app_stats` — running counters
- **Trace engine**: deterministic seeded PRNG (`mulberry32`) keyed off the input address, so the same wallet always reproduces the same trace — explainable and reproducible, not a black box. This is the seam where live chain APIs (Etherscan/BscScan/Tronscan, Blockchair/Bitquery, Covalent) would plug in for production, feeding the same clustering + risk-scoring pipeline unchanged.
- **Risk scoring**: weighted, explainable model (hop distance, mixer exposure, cross-chain bridging, cluster size, destination KYC tier).

## User Guide

1. Open `/` to read the full pitch/architecture story.
2. Click **"Launch Live Demo"** (or go to `/demo`).
3. Paste a wallet address + pick chain/fraud type, or click a sample address.
4. Click **Run Trace** — watch the risk gauge, attribution card, fund-flow graph, risk-factor breakdown, and timeline populate.
5. Click **Open Report** for a printable, investigator-style report for that case.
6. Scroll down on `/demo` to browse the seeded VASP/exchange registry.

## Deployment

- **Platform**: Cloudflare Workers (Hono + D1), built with Vite
- **Status**: ✅ Live in production at the URL above, with Workers Builds connected to GitHub for auto-deploy on every push to `main`
- **Database**: Cloudflare D1, real production database provisioned, schema migrated and seeded (`crypto-fraud-attribution-production`)
- **Why Cloudflare over Vercel**: D1 only runs on Cloudflare's edge — keeping the frontend and backend on one platform avoided splitting the stack across two providers for no benefit
- **Tech stack**: Hono (TypeScript) + Cloudflare Workers + Cloudflare D1, vanilla JS + inline SVG on the frontend (no framework-heavy client bundle), Inter + Lora webfonts, hand-rolled icon set

## Known Issues

- `/demo` — VASP registry section is stuck in a loading state, and the stats panel shows placeholder values instead of live D1 data. Fix this before relying on the demo for the PPT or Round 1 presentation.

## Not Yet Implemented / Next Steps

- **Real blockchain API integration** — `runTrace()` in `src/lib/traceEngine.ts` currently runs a deterministic simulation; swapping in live Etherscan/BscScan/Tronscan/Blockchair/Covalent calls is the natural next step, without needing to touch clustering, risk-scoring, storage, or UI layers.
- Future-enhancement ideas from the original deck (GNN-based clustering, sanctions-list linking, mobile app, MLAT drafting, predictive typology detection) remain intentionally out of scope for this build.

## Note on the Demo Data

The tracing/clustering/attribution results in `/demo` are generated by a **deterministic simulation**, not live blockchain calls — a deliberate scope decision to keep the project self-contained, fast, and reproducible for demo/review purposes. The architecture is designed so that swapping `runTrace()` for real chain-API calls would not require changing the clustering, risk-scoring, storage, or UI layers.
