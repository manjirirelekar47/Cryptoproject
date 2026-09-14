import { Nav, Footer, NavScript } from '../components/layout'
import {
  IconWallet, IconBurner, IconLayers, IconClock, IconDoc, IconGavel, IconHandCoin,
  IconSearch, IconNetwork, IconSwap, IconBell, IconPeople, IconScale, IconPlug,
  IconDatabase, IconGear, IconBrain, IconChart, IconServer, IconGlobe, IconLock,
  IconCheck, IconWarning, IconLink, IconServerStack, IconFlow, IconRocket, IconMobile,
  IconMail, IconTarget, IconArrowRight, IconExternal,
} from '../lib/icons'

export const HomePage = () => (
  <>
    <Nav />

    {/* ============ HERO ============ */}
    <section class="hero" id="hero">
      <svg class="hero-net" viewBox="0 0 800 500" preserveAspectRatio="xMaxYMin meet">
        <g stroke="#00E5FF" stroke-width="1" opacity="0.35">
          <line x1="520" y1="60" x2="620" y2="140" />
          <line x1="620" y1="140" x2="600" y2="240" />
          <line x1="600" y1="240" x2="700" y2="300" />
          <line x1="520" y1="60" x2="470" y2="160" />
          <line x1="470" y1="160" x2="600" y2="240" />
          <line x1="700" y1="300" x2="660" y2="400" />
        </g>
        <g fill="#00E5FF">
          <circle cx="520" cy="60" r="4" opacity="0.9" />
          <circle cx="620" cy="140" r="5" opacity="0.7" />
          <circle cx="470" cy="160" r="3.5" opacity="0.6" />
          <circle cx="600" cy="240" r="6" opacity="0.9">
            <animate attributeName="r" values="6;9;6" dur="2.4s" repeatCount="indefinite" />
          </circle>
          <circle cx="700" cy="300" r="4" opacity="0.6" />
          <circle cx="660" cy="400" r="5" opacity="0.8" />
        </g>
      </svg>
      <div class="container hero-inner">
        <div class="eyebrow gold">MINISTRY OF HOME AFFAIRS · I4C, CIS DIVISION · BLOCKCHAIN &amp; CYBERSECURITY</div>
        <h1>Real-Time Crypto Fraud<br />Attribution System</h1>
        <p class="hero-sub">From victim-reported wallet address to identified exchange — in minutes, not weeks.</p>
        <div class="hero-cta-row">
          <a href="/demo" class="btn btn-primary">
            <IconRocket class="icon-inline" style="width:16px;height:16px" />
            Launch Live Demo
          </a>
          <a href="#idea" class="btn btn-outline">See How It Works</a>
        </div>
        <div class="hero-badge-row">
          <div class="hero-badge">
            <div class="hb-num">30-hr</div>
            <div class="hb-label">Hackathon build</div>
          </div>
          <div class="hero-badge">
            <div class="hb-num">Multi-chain</div>
            <div class="hb-label">BTC · ETH · TRON · BSC</div>
          </div>
          <div class="hero-badge">
            <div class="hb-num">Real-time</div>
            <div class="hb-label">Tracing &amp; alerts</div>
          </div>
        </div>
        <div class="hero-footer-line">Team Submission &nbsp;|&nbsp; Theme: Blockchain &amp; Cybersecurity &nbsp;|&nbsp; Dept: I4C, CIS Division</div>
      </div>
    </section>

    {/* ============ THE PROBLEM ============ */}
    <section class="section section-dark" id="problem">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow">THE PROBLEM</div>
          <h2 class="section-title">Fraud proceeds outrun the investigation</h2>
          <p class="section-lede">
            Victims report suspect wallet addresses used in investment scams, task-based fraud, sextortion,
            ransomware, phishing and darknet deals — but these are almost never the exchange account itself.
          </p>
        </div>

        <div class="problem-layout fade-up">
          <div>
            <div class="wallet-card">
              <div class="icon-badge on-dark"><IconWallet /></div>
              <div>
                <div class="card-title">Non-custodial wallets</div>
                <div class="card-desc">No KYC, no owner identity attached on-chain</div>
              </div>
            </div>
            <div class="wallet-card">
              <div class="icon-badge on-dark"><IconBurner /></div>
              <div>
                <div class="card-title">Burner wallets</div>
                <div class="card-desc">Used once, abandoned, designed to break the trail</div>
              </div>
            </div>
            <div class="wallet-card">
              <div class="icon-badge on-dark"><IconLayers /></div>
              <div>
                <div class="card-title">Layering / mule wallets</div>
                <div class="card-desc">Chains of intermediary hops to launder funds</div>
              </div>
            </div>
            <p class="problem-footnote">
              Manual blockchain tracing needs deep technical expertise, especially across multi-chain transfers,
              DeFi protocols, mixers/tumblers and bridges — expertise most cyber cells don't have on tap, 24/7.
            </p>
          </div>

          <div class="callout-dark">
            <h4>WHAT DELAY COSTS</h4>
            <div class="callout-item">
              <div class="icon-badge on-dark" style="width:38px;height:38px"><IconClock /></div>
              <div>
                <div class="ci-title">Freezing of assets</div>
                <div class="ci-desc">Every hour lets funds move further from reach</div>
              </div>
            </div>
            <div class="callout-item">
              <div class="icon-badge on-dark" style="width:38px;height:38px"><IconDoc /></div>
              <div>
                <div class="ci-title">Evidence preservation</div>
                <div class="ci-desc">On-chain trails get buried under layering</div>
              </div>
            </div>
            <div class="callout-item">
              <div class="icon-badge on-dark" style="width:38px;height:38px"><IconSearch /></div>
              <div>
                <div class="ci-title">Fund-flow tracing</div>
                <div class="ci-desc">Manual analysis can't keep pace with the fraud</div>
              </div>
            </div>
            <div class="callout-item">
              <div class="icon-badge on-dark" style="width:38px;height:38px"><IconHandCoin /></div>
              <div>
                <div class="ci-title">Victim fund recovery</div>
                <div class="ci-desc">Recovery odds fall sharply after the first hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ THE IDEA ============ */}
    <section class="section section-light" id="idea">
      <div class="container">
        <div class="idea-top">
          <div class="fade-up">
            <div class="eyebrow" style="color:#0F9BB0">THE IDEA</div>
            <h2 class="section-title" style="color:#0A1128">One wallet address in. The exchange, the path, and the risk — out in real time.</h2>
            <p class="section-lede" style="color:#5A6478">
              A Real-Time Crypto Fraud Attribution System that ingests victim-reported wallet addresses from
              NCRP/SAHYOG, automatically traces on-chain fund movement across hops and chains, and pinpoints
              the nearest identifiable exchange endpoint.
            </p>
          </div>
          <div class="callout-dark fade-up">
            <h4>WHY IT MATTERS</h4>
            <p style="color:#fff;font-size:15px;line-height:1.7">
              Crypto fraud in India has grown into a multi-thousand-crore annual problem. Attribution speed is
              the single biggest lever on whether victims ever see their money again — and whether fraudsters
              can be identified at all.
            </p>
          </div>
        </div>

        <div class="pipeline-row fade-up">
          <div class="pipeline-step">
            <div class="ps-num">01</div>
            <div class="icon-badge on-light"><IconDoc /></div>
            <div class="ps-title">Ingest</div>
            <div class="ps-desc">Wallet address reported via complaint system / manual entry</div>
          </div>
          <div class="pipeline-step">
            <div class="ps-num">02</div>
            <div class="icon-badge on-light"><IconNetwork /></div>
            <div class="ps-title">Trace</div>
            <div class="ps-desc">Multi-hop, multi-chain graph traversal of fund flow</div>
          </div>
          <div class="pipeline-step">
            <div class="ps-num">03</div>
            <div class="icon-badge on-light"><IconLayers /></div>
            <div class="ps-title">Cluster</div>
            <div class="ps-desc">Heuristics + ML group wallets to a single controlling entity</div>
          </div>
          <div class="pipeline-step">
            <div class="ps-num">04</div>
            <div class="icon-badge on-light"><IconSwap /></div>
            <div class="ps-title">Attribute</div>
            <div class="ps-desc">Match against tagged VASP/exchange deposit address registry</div>
          </div>
          <div class="pipeline-step">
            <div class="ps-num">05</div>
            <div class="icon-badge on-light"><IconBell /></div>
            <div class="ps-title">Act</div>
            <div class="ps-desc">Risk score, alert, and a standardized report for the investigator</div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ RELEVANCE & REACH ============ */}
    <section class="section section-dark" id="impact">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow">RELEVANCE &amp; REACH</div>
          <h2 class="section-title">This isn't a niche problem — it's the fastest-growing one</h2>
        </div>

        <div class="grid grid-3 fade-up">
          <div class="stat-card">
            <div class="stat-num">₹000s Cr</div>
            <div class="stat-desc">lost annually to reported cyber financial fraud in India, with crypto increasingly used as the exit rail</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">1 in 4</div>
            <div class="stat-desc">cybercrime cases with a financial component now involves at least one crypto wallet in the fund trail</div>
          </div>
          <div class="stat-card">
            <div class="stat-num">Hours</div>
            <div class="stat-desc">is often all investigators have before funds are layered beyond practical recovery</div>
          </div>
        </div>

        <div class="sub-eyebrow" style="margin-top:56px;text-align:center">WHO IS AFFECTED</div>
        <div class="affected-row fade-up">
          <div class="affected-item text-center">
            <div class="icon-badge on-dark" style="margin:0 auto 16px"><IconPeople /></div>
            <div class="aff-title">Fraud victims</div>
            <div class="aff-desc">awaiting freeze orders and any chance of recovery</div>
          </div>
          <div class="affected-item text-center">
            <div class="icon-badge on-dark" style="margin:0 auto 16px"><IconGavel /></div>
            <div class="aff-title">I4C &amp; state cyber cells</div>
            <div class="aff-desc">racing the clock with limited forensic bandwidth</div>
          </div>
          <div class="affected-item text-center">
            <div class="icon-badge on-dark" style="margin:0 auto 16px"><IconSwap /></div>
            <div class="aff-title">Exchanges / VASPs</div>
            <div class="aff-desc">flooded with inconsistent, manual LEA requests</div>
          </div>
          <div class="affected-item text-center">
            <div class="icon-badge on-dark" style="margin:0 auto 16px"><IconScale /></div>
            <div class="aff-title">Regulators &amp; policy</div>
            <div class="aff-desc">need aggregated typology data to act on AML gaps</div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ TECHNICAL APPROACH: STACK ============ */}
    <section class="section section-light" id="tech">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow" style="color:#0F9BB0">TECHNICAL APPROACH</div>
          <h2 class="section-title" style="color:#0A1128">Tech stack — chosen to ship a working MVP in 30 hours</h2>
        </div>

        <div class="grid grid-3 fade-up">
          <div class="card card-light">
            <div class="icon-badge on-light" style="margin-bottom:16px"><IconPlug /></div>
            <div class="card-title">Data &amp; Chain Access</div>
            <div class="card-desc">Etherscan / BscScan / Tronscan APIs<br />Blockchair &amp; Bitquery (GraphQL) for BTC<br />Covalent (GoldRush) unified multi-chain API</div>
          </div>
          <div class="card card-light">
            <div class="icon-badge on-light" style="margin-bottom:16px"><IconDatabase /></div>
            <div class="card-title">Storage</div>
            <div class="card-desc">Neo4j — wallet/transaction graph<br />PostgreSQL — cases, labels, metadata<br />Redis — job queue &amp; hot-path caching</div>
          </div>
          <div class="card card-light">
            <div class="icon-badge on-light" style="margin-bottom:16px"><IconGear /></div>
            <div class="card-title">Backend &amp; Processing</div>
            <div class="card-desc">Python + FastAPI — tracing &amp; scoring services<br />NetworkX — graph traversal &amp; clustering<br />Celery workers — async multi-hop tracing jobs</div>
          </div>
          <div class="card card-light">
            <div class="icon-badge on-light" style="margin-bottom:16px"><IconBrain /></div>
            <div class="card-title">AI / ML</div>
            <div class="card-desc">Heuristic clustering (common-input-ownership, peel-chain detection)<br />Gradient-boosted risk scoring model<br />GNN-based attribution — roadmapped</div>
          </div>
          <div class="card card-light">
            <div class="icon-badge on-light" style="margin-bottom:16px"><IconChart /></div>
            <div class="card-title">Frontend &amp; Visualization</div>
            <div class="card-desc">React + Tailwind CSS dashboard<br />Cytoscape.js / D3.js — fund-flow graphs<br />WebSockets — live trace updates</div>
          </div>
          <div class="card card-light">
            <div class="icon-badge on-light" style="margin-bottom:16px"><IconServer /></div>
            <div class="card-title">Infra &amp; Integration</div>
            <div class="card-desc">Docker + Docker Compose (cloud-ready)<br />REST/JSON APIs for NCRP &amp; SAHYOG<br />JWT auth + role-based access, audit logs</div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ TECHNICAL APPROACH: ARCHITECTURE ============ */}
    <section class="section section-alt-dark">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow">TECHNICAL APPROACH</div>
          <h2 class="section-title">System architecture</h2>
        </div>

        <div class="arch-flow fade-up">
          <div class="arch-col">
            <div class="arch-arrow"></div>
            <div class="icon-badge on-dark"><IconPlug /></div>
            <div class="arch-col-title">Ingestion</div>
            <div class="arch-inner-item">NCRP / SAHYOG API</div>
            <div class="arch-inner-item">Manual complaint entry</div>
            <div class="arch-inner-item">Bulk CSV upload</div>
          </div>
          <div class="arch-col">
            <div class="arch-arrow"></div>
            <div class="icon-badge on-dark"><IconNetwork /></div>
            <div class="arch-col-title">Tracing Engine</div>
            <div class="arch-inner-item">Multi-hop graph traversal</div>
            <div class="arch-inner-item">Cross-chain bridge linking</div>
            <div class="arch-inner-item">Mixer / tumbler detection</div>
          </div>
          <div class="arch-col">
            <div class="arch-arrow"></div>
            <div class="icon-badge on-dark"><IconBrain /></div>
            <div class="arch-col-title">Attribution &amp; Risk</div>
            <div class="arch-inner-item">VASP address registry match</div>
            <div class="arch-inner-item">Clustering heuristics + ML</div>
            <div class="arch-inner-item">Weighted risk scoring</div>
          </div>
          <div class="arch-col">
            <div class="icon-badge on-dark"><IconBell /></div>
            <div class="arch-col-title">Action Layer</div>
            <div class="arch-inner-item">Investigator dashboard</div>
            <div class="arch-inner-item">Automated alerts</div>
            <div class="arch-inner-item">Standardized report export</div>
          </div>
        </div>
        <p class="arch-note">Every layer is a stateless service behind a message queue — new blockchains or heuristics plug in without touching the rest of the pipeline.</p>
      </div>
    </section>

    {/* ============ IMPLEMENTATION PLAN ============ */}
    <section class="section section-light">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow" style="color:#0F9BB0">TECHNICAL APPROACH</div>
          <h2 class="section-title" style="color:#0A1128">Implementation plan — 30-hour build sprint</h2>
        </div>

        <div class="timeline fade-up">
          <div class="tl-item">
            <div class="tl-pill">0–6h</div>
            <div class="tl-dot"></div>
            <div>
              <div class="tl-title">Foundation</div>
              <div class="tl-desc">Project scaffolding, chain-API integration (Etherscan/Blockchair/Covalent), wallet ingestion endpoint, seed VASP address registry</div>
            </div>
          </div>
          <div class="tl-item">
            <div class="tl-pill">6–14h</div>
            <div class="tl-dot"></div>
            <div>
              <div class="tl-title">Tracing Core</div>
              <div class="tl-desc">Multi-hop BFS/DFS traversal engine, transaction graph builder in Neo4j, exchange-address matching logic</div>
            </div>
          </div>
          <div class="tl-item">
            <div class="tl-pill">14–22h</div>
            <div class="tl-dot"></div>
            <div>
              <div class="tl-title">Intelligence Layer</div>
              <div class="tl-desc">Clustering heuristics (common-input-ownership, peel-chain), cross-chain bridge detection, weighted risk scoring model</div>
            </div>
          </div>
          <div class="tl-item">
            <div class="tl-pill">22–28h</div>
            <div class="tl-dot"></div>
            <div>
              <div class="tl-title">Dashboard &amp; Alerts</div>
              <div class="tl-desc">React investigator dashboard, Cytoscape fund-flow graph, automated alert + PDF report generation</div>
            </div>
          </div>
          <div class="tl-item">
            <div class="tl-pill">28–30h</div>
            <div class="tl-dot"></div>
            <div>
              <div class="tl-title">Integration &amp; Demo</div>
              <div class="tl-desc">Mock NCRP/SAHYOG API hookup, end-to-end test cases, demo script and final polish</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ KEY FEATURES ============ */}
    <section class="section section-dark">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow">TECHNICAL APPROACH</div>
          <h2 class="section-title">Key features, technically speaking</h2>
        </div>

        <div class="grid grid-3 fade-up">
          {[
            [IconNetwork, 'Multi-hop wallet tracing', 'BFS/DFS traversal of on-chain transactions up to N configurable hops from the reported address'],
            [IconLayers, 'Wallet clustering', 'Common-input-ownership & peel-chain heuristics group addresses under one controlling entity'],
            [IconSwap, 'VASP attribution engine', 'Matches traced endpoints against a curated, continuously-enriched exchange deposit-address registry'],
            [IconLink, 'Cross-chain linking', 'Detects bridge & swap contract interactions to follow funds across BTC / ETH / TRON / BSC'],
            [IconTarget, 'AI risk scoring', 'Weighted model factoring mixer exposure, hop distance, cluster size and address reputation'],
            [IconFlow, 'Live fund-flow graph', 'Interactive Cytoscape/D3 visualization investigators can explore hop-by-hop'],
            [IconBell, 'Automated alerts', 'Real-time notification the moment traced funds land on a known exchange deposit address'],
            [IconDoc, 'Standardized reports', 'One-click, court-ready PDF/JSON evidence report with full trace chain-of-custody'],
            [IconPlug, 'NCRP / SAHYOG integration', 'API-first design for direct ingestion from and reporting back to LEA case systems'],
          ].map(([Icon, title, desc]: any) => (
            <div class="card card-dark">
              <div class="icon-badge on-dark" style="margin-bottom:16px"><Icon /></div>
              <div class="card-title">{title}</div>
              <div class="card-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============ FEASIBILITY: BUILDABLE ============ */}
    <section class="section section-light">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow" style="color:#0F9BB0">FEASIBILITY &amp; IMPACT</div>
          <h2 class="section-title" style="color:#0A1128">Why this is buildable, not just a pitch deck</h2>
        </div>

        <div class="fade-up">
          {[
            ['Transparent ledgers', 'Bitcoin & Ethereum-family chains are fully public — no special access needed to trace flows'],
            ['Labels already exist', 'Etherscan tags, community datasets (Chainabuse, CryptoScamDB) seed a usable VASP registry from day one'],
            ['Proven heuristics', 'Common-input-ownership clustering is peer-reviewed and implementable with NetworkX in hours, not weeks'],
            ['Mature open tooling', 'Neo4j, FastAPI, Cytoscape.js are free, documented, and hackathon-friendly'],
            ['Narrow, real MVP', 'Wallet in → up to 5-hop trace → exchange match → visual + report is fully achievable in 30 hours'],
          ].map(([title, desc]) => (
            <div class="check-list-item">
              <div class="check-list-title">
                <span class="check-badge"><IconCheck /></span>
                {title}
              </div>
              <div class="check-list-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============ FEASIBILITY: CHALLENGES ============ */}
    <section class="section section-dark">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow">FEASIBILITY &amp; IMPACT</div>
          <h2 class="section-title">Challenges — and how we handle them</h2>
        </div>

        <div class="grid grid-3 fade-up">
          {[
            ['Privacy coins & mixers (Monero, Tornado Cash)', 'Flag & score exposure rather than force de-anonymization; surface confidence, not false certainty'],
            ['Incomplete exchange address labels', 'Crowdsourced + LEA feedback loop continuously enriches the registry after every confirmed case'],
            ['Cross-chain bridges break simple tracing', 'Maintain a curated bridge-contract registry; integrate bridge-explorer APIs for hop continuity'],
            ['False positives in clustering', 'Confidence-scored output with human-in-the-loop verification, never binary auto-decisions'],
            ['Free API rate limits at scale', 'Multi-provider fallback, caching layer, and a path to self-hosted nodes in production'],
            ['Data privacy & legal compliance', 'Role-based access, full audit logging, deployment restricted to authorized LEA infrastructure'],
          ].map(([title, mit]) => (
            <div class="challenge-card">
              <div class="ch-head">
                <div class="icon-badge gold" style="width:38px;height:38px;flex-shrink:0"><IconWarning /></div>
                <div class="ch-title">{title}</div>
              </div>
              <hr />
              <div class="ch-mit"><b>Mitigation:</b> {mit}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============ FEASIBILITY: SCALE ============ */}
    <section class="section section-light">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow" style="color:#0F9BB0">FEASIBILITY &amp; IMPACT</div>
          <h2 class="section-title" style="color:#0A1128">Built to scale beyond the demo</h2>
        </div>

        <div class="split-cards fade-up">
          <div class="split-card light">
            <h4>TECHNICAL SCALABILITY</h4>
            <div class="split-point">
              <div class="icon-badge on-light" style="width:40px;height:40px;flex-shrink:0"><IconLayers /></div>
              <div>
                <div class="sp-title">Modular by chain</div>
                <div class="sp-desc">Add Bitcoin, Ethereum, Tron, Polygon, BSC incrementally as independent connector modules</div>
              </div>
            </div>
            <div class="split-point">
              <div class="icon-badge on-light" style="width:40px;height:40px;flex-shrink:0"><IconServerStack /></div>
              <div>
                <div class="sp-title">Horizontal scaling</div>
                <div class="sp-desc">Queue-based indexing workers (Kafka-ready) scale tracing throughput with case volume</div>
              </div>
            </div>
            <div class="split-point">
              <div class="icon-badge on-light" style="width:40px;height:40px;flex-shrink:0"><IconPlug /></div>
              <div>
                <div class="sp-title">Deep LEA integration</div>
                <div class="sp-desc">Plugs into NCRP as an automatic wallet lookup at complaint filing, and into SAHYOG for cross-agency case sharing</div>
              </div>
            </div>
          </div>
          <div class="split-card dark">
            <h4>REAL-WORLD APPLICATION</h4>
            <div class="split-point">
              <div class="icon-badge gold" style="width:40px;height:40px;flex-shrink:0"><IconGlobe /></div>
              <div>
                <div class="sp-title">Beyond India</div>
                <div class="sp-desc">VASP attribution is a global AML/CFT need under the FATF Travel Rule — directly exportable</div>
              </div>
            </div>
            <div class="split-point">
              <div class="icon-badge gold" style="width:40px;height:40px;flex-shrink:0"><IconScale /></div>
              <div>
                <div class="sp-title">Serves multiple stakeholders</div>
                <div class="sp-desc">Same core engine can power exchange-side KYC/AML screening as a compliance offering</div>
              </div>
            </div>
            <div class="split-point">
              <div class="icon-badge gold" style="width:40px;height:40px;flex-shrink:0"><IconChart /></div>
              <div>
                <div class="sp-title">Grows smarter over time</div>
                <div class="sp-desc">Every resolved case enriches the address registry and retrains the risk model</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ CONCLUSION: IMPACT ============ */}
    <section class="section section-dark">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow">CONCLUSION</div>
          <h2 class="section-title">Impact on the people who use it</h2>
        </div>

        <div class="grid grid-2 fade-up">
          {[
            [IconGavel, 'Investigators (I4C & state cyber cells)', 'Exchange identification drops from days of manual tracing to minutes — freeze requests go out while funds are still reachable'],
            [IconPeople, 'Fraud victims', 'Faster action in the critical early "golden hours" meaningfully improves the odds of recovering stolen funds'],
            [IconSwap, 'Exchanges / VASPs', 'Receive standardized, well-evidenced LEA requests instead of ad hoc queries — faster compliant turnaround'],
            [IconScale, 'Policymakers & regulators', 'Aggregated fraud-typology intelligence informs AML policy and VASP compliance enforcement'],
          ].map(([Icon, title, desc]: any) => (
            <div class="card card-dark" style="display:flex;gap:18px;align-items:flex-start">
              <div class="icon-badge on-dark" style="width:52px;height:52px;flex-shrink:0"><Icon /></div>
              <div>
                <div class="card-title" style="font-size:17px">{title}</div>
                <div class="card-desc">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============ CONCLUSION: BOTTOM LINE ============ */}
    <section class="section section-alt-dark">
      <div class="container">
        <div class="eyebrow fade-up">CONCLUSION</div>
        <div class="conclusion-split fade-up">
          <div class="concl-left">
            <h2 style="color:#fff;font-size:clamp(24px,3vw,32px);margin-bottom:20px">From on-chain noise to<br />actionable intelligence</h2>
            <p class="body">
              The Real-Time Crypto Fraud Attribution System turns a slow, expert-dependent manual process into
              an automated pipeline: ingest a wallet, trace it across hops and chains, cluster and attribute it
              to a real exchange endpoint, and hand the investigator a ready-to-act report.
            </p>
            <div class="concl-check"><span class="check-badge" style="flex-shrink:0"><IconCheck /></span> Built on proven blockchain-forensics heuristics, not speculative tech</div>
            <div class="concl-check"><span class="check-badge" style="flex-shrink:0"><IconCheck /></span> Designed to plug directly into NCRP &amp; SAHYOG, not sit beside them</div>
            <div class="concl-check"><span class="check-badge" style="flex-shrink:0"><IconCheck /></span> Modular architecture scales from a hackathon MVP to production</div>
          </div>
          <div class="concl-right">
            <h5>BOTTOM LINE</h5>
            <div class="big-line">Minutes to attribute an exchange, not weeks.</div>
            <div class="small-line">That is the difference between a frozen account and a closed case.</div>
          </div>
        </div>
      </div>
    </section>

    {/* ============ FUTURE ENHANCEMENTS ============ */}
    <section class="section section-light">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow" style="color:#0F9BB0">FUTURE ENHANCEMENTS</div>
          <h2 class="section-title" style="color:#0A1128">Where this goes after the hackathon</h2>
        </div>

        <div class="grid grid-3 fade-up">
          {[
            [IconBrain, 'Graph Neural Networks', 'Move beyond heuristics to GNN-based clustering for higher-precision entity attribution'],
            [IconGlobe, 'Global watchlist linking', 'Cross-reference OFAC/FATF sanctions lists for cross-border case correlation'],
            [IconLock, 'Privacy-coin analytics', 'Statistical ring-signature analysis to flag (not fully de-anonymize) Monero exposure'],
            [IconMobile, 'Mobile app for field officers', 'Instant wallet-check and alerting tied directly to NCRP complaint numbers'],
            [IconMail, 'Automated MLAT drafting', 'Auto-generate mutual legal assistance requests for foreign-domiciled VASPs'],
            [IconChart, 'Predictive typology detection', 'ML models trained on historical cases to flag emerging fraud patterns early'],
          ].map(([Icon, title, desc]: any) => (
            <div class="card card-light">
              <div class="icon-badge on-light" style="margin-bottom:16px"><Icon /></div>
              <div class="card-title">{title}</div>
              <div class="card-desc">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============ REFERENCES ============ */}
    <section class="section section-dark">
      <div class="container">
        <div class="section-header fade-up">
          <div class="eyebrow">REFERENCES</div>
          <h2 class="section-title">Sources &amp; further reading</h2>
        </div>
        <div class="ref-list fade-up">
          {[
            'Meiklejohn, S. et al. "A Fistful of Bitcoins: Characterizing Payments Among Men with No Names" — common-input-ownership heuristic, IMC 2013.',
            'FATF — "Updated Guidance for a Risk-Based Approach to Virtual Assets and VASPs" (Travel Rule).',
            'Chainalysis — "Crypto Crime Report" (annual), on typologies including scams, ransomware and mixers.',
            'Indian Cyber Crime Coordination Centre (I4C) — National Cybercrime Reporting Portal (NCRP) documentation.',
            'Etherscan, Blockchair, Bitquery and Covalent (GoldRush) — public blockchain data & API documentation.',
            'Neo4j Graph Data Platform — documentation on graph modelling for transaction network analysis.',
          ].map((ref, i) => (
            <div class="ref-item">
              <div class="ref-num">{i + 1}</div>
              <div class="ref-text">{ref}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ============ FINAL CTA ============ */}
    <section class="section section-light">
      <div class="container">
        <div class="cta-banner fade-up">
          <div>
            <h3>See the tracing engine work on a real wallet address.</h3>
            <p>Open the live demo, drop in a sample wallet, and watch the multi-hop trace, clustering, risk scoring and exchange attribution run end to end.</p>
          </div>
          <a href="/demo" class="btn btn-primary">
            <IconRocket style="width:16px;height:16px" />
            Launch Live Demo
          </a>
        </div>
      </div>
    </section>

    <Footer />
    <NavScript />
  </>
)
