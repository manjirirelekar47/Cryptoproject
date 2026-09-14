import { Nav, Footer } from '../components/layout'
import { IconSearch, IconNetwork, IconDatabase, IconDownload, IconExternal } from '../lib/icons'

export const DemoPage = () => (
  <>
    <Nav />
    <div class="demo-shell">
      <div class="container">
        <div class="demo-head">
          <div class="eyebrow">LIVE DEMO</div>
          <h1 class="section-title" style="color:#fff">Wallet-in, exchange-out attribution engine</h1>
          <p class="section-lede">
            Enter a victim-reported wallet address (or pick a sample), and the tracing engine will simulate
            multi-hop, multi-chain fund-flow tracing, wallet clustering, risk scoring and VASP attribution —
            the same pipeline described in the architecture above, running against a seeded deterministic
            model so results are explainable and reproducible for a demo/investigator setting.
          </p>
        </div>

        <div class="stats-row" id="statsRow">
          <div class="mini-stat"><div class="ms-num" id="statTotalCases">–</div><div class="ms-label">Cases traced this session</div></div>
          <div class="mini-stat"><div class="ms-num" id="statAttribRate">–</div><div class="ms-label">Attribution rate</div></div>
          <div class="mini-stat"><div class="ms-num" id="statAvgRisk">–</div><div class="ms-label">Avg. risk score</div></div>
          <div class="mini-stat"><div class="ms-num" id="statVaspSize">–</div><div class="ms-label">VASPs in registry</div></div>
        </div>

        <div class="demo-grid">
          {/* ---------------- LEFT PANEL: FORM ---------------- */}
          <div>
            <div class="panel" style="margin-bottom:20px">
              <div class="panel-title"><IconSearch style="width:18px;height:18px;color:#00E5FF" /> Trace a wallet</div>

              <div class="field">
                <label>Wallet address</label>
                <input type="text" id="addrInput" placeholder="Paste a BTC / ETH / TRON / BSC address…" autocomplete="off" spellcheck={false} />
              </div>

              <div class="field">
                <label>Chain</label>
                <div class="chain-badge-row" id="chainChips">
                  <div class="chip active" data-chain="">Auto-detect</div>
                  <div class="chip" data-chain="BTC">BTC</div>
                  <div class="chip" data-chain="ETH">ETH</div>
                  <div class="chip" data-chain="TRON">TRON</div>
                  <div class="chip" data-chain="BSC">BSC</div>
                </div>
              </div>

              <div class="field">
                <label>Reported fraud type</label>
                <select id="fraudSelect">
                  <option value="investment_scam">Investment / Trading Scam</option>
                  <option value="task_fraud">Task-Based Fraud</option>
                  <option value="sextortion">Sextortion</option>
                  <option value="ransomware">Ransomware</option>
                  <option value="phishing">Phishing</option>
                  <option value="darknet">Darknet Marketplace</option>
                </select>
              </div>

              <button class="btn btn-primary btn-block" id="traceBtn">
                <IconNetwork style="width:16px;height:16px" />
                <span id="traceBtnLabel">Run Trace</span>
              </button>

              <div class="error-box" id="errorBox"></div>

              <div style="margin-top:22px">
                <label style="display:block;font-size:12.5px;font-weight:700;color:#A9B7D0;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.04em">Try a sample address</label>
                <div class="sample-list" id="sampleList"></div>
              </div>
            </div>

            <div class="panel">
              <div class="panel-title"><IconDatabase style="width:18px;height:18px;color:#00E5FF" /> Recent cases</div>
              <div id="recentCases">
                <p style="color:#7C8AAE;font-size:13px">No cases traced yet this session.</p>
              </div>
            </div>
          </div>

          {/* ---------------- RIGHT PANEL: RESULTS ---------------- */}
          <div>
            <div class="empty-state" id="emptyState">
              <IconNetwork />
              <div style="font-weight:700;color:#fff;margin-bottom:6px;font-size:16px">No trace run yet</div>
              <div style="max-width:360px">Enter a wallet address on the left, or click a sample address to see the full attribution pipeline in action.</div>
            </div>

            <div class="result-area" id="resultArea">
              <div class="case-meta-bar">
                <span class="case-ref-tag" id="caseRefTag">CFA-2026-XXXXXX</span>
                <div style="display:flex;gap:10px">
                  <a class="btn btn-outline btn-sm" id="reportLink" href="#" target="_blank" rel="noopener">
                    <IconExternal style="width:14px;height:14px" /> Open Report
                  </a>
                </div>
              </div>

              <div class="result-top">
                <div class="panel gauge-card">
                  <div class="panel-title" style="justify-content:center">Risk Score</div>
                  <svg width="180" height="110" viewBox="0 0 180 110" style="margin:0 auto">
                    <path d="M 15 100 A 75 75 0 0 1 165 100" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="14" stroke-linecap="round" />
                    <path id="gaugeArc" d="M 15 100 A 75 75 0 0 1 165 100" fill="none" stroke="#00E5FF" stroke-width="14" stroke-linecap="round" stroke-dasharray="0 500" />
                  </svg>
                  <div style="font-family:'Lora',serif;font-size:38px;font-weight:800;color:#fff;margin-top:-38px" id="riskScoreNum">–</div>
                  <div id="riskBandTag" class="risk-band-tag band-LOW">LOW</div>
                </div>

                <div class="panel attribution-card">
                  <div class="panel-title">Attribution Result</div>
                  <div id="attrContent">
                    <div class="attr-name">—</div>
                  </div>
                </div>
              </div>

              <div class="panel" style="margin-bottom:20px">
                <div class="panel-title"><IconNetwork style="width:18px;height:18px;color:#00E5FF" /> Fund-flow graph</div>
                <div class="graph-legend">
                  <span><i class="legend-dot" style="background:#00E5FF"></i> Wallet</span>
                  <span><i class="legend-dot" style="background:#FFB100"></i> Mixer / Tumbler</span>
                  <span><i class="legend-dot" style="background:#35D07F"></i> Bridge</span>
                  <span><i class="legend-dot" style="background:#FF5C7A"></i> Exchange (attributed)</span>
                </div>
                <div class="graph-wrap">
                  <svg id="graphSvg" width="900" height="260"></svg>
                </div>
              </div>

              <div class="two-col">
                <div class="panel">
                  <div class="panel-title">Risk factor breakdown</div>
                  <div id="factorList"></div>
                </div>
                <div class="panel">
                  <div class="panel-title">Trace timeline</div>
                  <div class="demo-timeline" id="timelineList"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="panel" style="margin-top:40px">
          <div class="panel-title"><IconDatabase style="width:18px;height:18px;color:#00E5FF" /> VASP / Exchange deposit-address registry (seed data)</div>
          <div class="vasp-table-wrap">
            <table class="vasp-table" id="vaspTable">
              <thead>
                <tr><th>Exchange</th><th>Chain</th><th>Jurisdiction</th><th>KYC Tier</th><th>Risk Tag</th></tr>
              </thead>
              <tbody id="vaspTableBody">
                <tr><td colspan="5" style="color:#7C8AAE">Loading registry…</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    <script src="/static/demo.js"></script>
  </>
)
