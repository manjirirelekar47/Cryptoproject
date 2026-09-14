# CRYPTO-ATTRIB // I4C — Real-Time Crypto Fraud Attribution System

## Project Overview
- **Name**: Real-Time Crypto Fraud Attribution System
- **Goal**: Turn the original hackathon pitch deck into a working product — trace a victim-reported crypto wallet address across multiple hops/chains and attribute it to a real exchange (VASP) deposit address, with a risk score and an investigator-ready report, in minutes instead of weeks.
- **Built for**: Ministry of Home Affairs · I4C, CIS Division · Theme: Blockchain & Cybersecurity (30-hr hackathon submission)

## What's Implemented
1. **Full marketing / pitch site** (`/`) — faithfully rebuilds all 15 slides of the original deck as a polished, animated single page: Problem, Idea/Pipeline, Relevance & Reach, Technical Approach (stack, architecture, 30h build timeline, key features), Feasibility & Impact (buildable, challenges + mitigations, scalability), Conclusion, Future Enhancements, References. Dark navy (`#0A1128`) + cyan/gold/green accent theme, serif headlines, matching the deck's exact color palette extracted from the source `.pptx`.
2. **Live interactive demo** (`/demo`) — a genuinely functional wallet-tracing tool:
   - Paste any BTC / ETH / TRON / BSC address (or click a sample) and pick a reported fraud type
   - A deterministic, seeded multi-hop trace engine (`src/lib/traceEngine.ts`) simulates cross-chain fund flow: mixer/tumbler detection, cross-chain bridge hops, wallet clustering, and matches the final hop against a real VASP deposit-address registry stored in D1
   - Animated SVG fund-flow graph, risk gauge, explainable weighted risk-factor breakdown, and a hop-by-hop timeline
   - Every trace is persisted as a case in D1 and exposed via a shareable, printable investigator report (`/report/:caseRef`)
3. **Hono + Cloudflare D1 backend** (`src/routes/api.ts`) — `/api/trace`, `/api/vasps`, `/api/cases`, `/api/cases/:ref`, `/api/stats`, `/api/fraud-types`.

## URLs
- **Local sandbox preview**: https://3000-i6f48cbow5z0irm9eerhl-5634da27.sandbox.novita.ai
  - Landing page: `/`
  - Live demo: `/demo`
  - Sample report: `/report/<caseRef>` (caseRef returned by any trace)
- **Production**: not yet deployed — see "Next Steps" below.
- **GitHub**: not yet connected — see "Next Steps" below.

## Data Architecture
- **Storage**: Cloudflare D1 (SQLite at the edge)
  - `vasps` — seeded exchange deposit-address registry (WazirX, CoinDCX, ZebPay, Binance, OKX, KuCoin, HTX, Bybit, MEXC, and an illustrative no-KYC OTC desk) across BTC/ETH/TRON/BSC
  - `cases` — every trace run: input address, chain, fraud type, hop count, cluster size, mixer exposure, risk score/band, attributed VASP, full graph JSON, timestamp
  - `app_stats` — running counters
- **Trace engine**: deterministic seeded PRNG (`mulberry32`) keyed off the input address, so the same wallet always reproduces the same trace — explainable and reproducible, matching the "confidence-scored, not black-box" design principle stated in the deck. This is the seam where live chain APIs (Etherscan/BscScan/Tronscan, Blockchair/Bitquery, Covalent) would plug in for production, feeding the same clustering + risk-scoring pipeline unchanged.
- **Risk scoring**: weighted, explainable model (hop distance, mixer exposure, cross-chain bridging, cluster size, destination KYC tier) — never a binary decision.

## User Guide
1. Open `/` to read the full pitch/architecture story (same content as the original deck, restyled as a live site).
2. Click **"Launch Live Demo"** (or go to `/demo`).
3. Either paste a wallet address + pick chain/fraud type, or click one of the sample addresses on the left.
4. Click **Run Trace** — watch the risk gauge, attribution card, fund-flow graph, risk-factor breakdown and timeline populate.
5. Click **Open Report** to view/print a standardized, court-style investigator report for that case.
6. Scroll down on `/demo` to browse the full seeded VASP/exchange registry.

## Deployment
- **Platform target**: Cloudflare Pages (Hono + D1)
- **Status**: ✅ Running locally in the sandbox (PM2 + `wrangler pages dev --local` against a local D1 SQLite instance, migrated and seeded). ❌ Not yet deployed to a live Cloudflare Pages URL, and not yet pushed to GitHub.
- **Tech Stack**: Hono (TypeScript) + Cloudflare Pages/Workers + Cloudflare D1, vanilla JS + inline SVG on the frontend (no framework/build-heavy client bundle), Inter + Lora webfonts, hand-rolled icon set (no icon-font dependency).

## Not Yet Implemented / Next Steps
- **Deploy to a public Cloudflare Pages URL** — needs either the user's own Cloudflare API token (BYOK path) or the Genspark-hosted deploy path; both were available but not yet chosen/run this session.
- **Push to GitHub** — `setup_github_environment` not yet run; no remote configured yet.
- **Remote D1 provisioning** — `wrangler.jsonc` currently has a placeholder `database_id`; a real production D1 database needs to be created (`wrangler d1 create ...`) and migrations/seed applied with `--remote` before/at deploy time.
- Nice-to-haves called out in the deck's own "Future Enhancements" section (GNN-based clustering, sanctions-list linking, mobile app, MLAT drafting, predictive typology detection) are intentionally out of scope for this build.

## Note on the Demo Data
The tracing/clustering/attribution results in `/demo` are generated by a **deterministic simulation**, not live blockchain calls — this was a deliberate scope decision to keep the project fully self-contained, fast, and reproducible for demo/review purposes. The architecture is designed so that swapping `runTrace()` in `src/lib/traceEngine.ts` for real Etherscan/Blockchair/Covalent calls (as described in the Technical Approach section of the site) would not require changing the clustering, risk-scoring, storage, or UI layers.
