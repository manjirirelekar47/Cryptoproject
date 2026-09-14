-- VASP / Exchange deposit-address registry
CREATE TABLE IF NOT EXISTS vasps (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  chain TEXT NOT NULL,
  deposit_address TEXT NOT NULL,
  jurisdiction TEXT NOT NULL,
  kyc_tier TEXT NOT NULL,
  risk_tag TEXT NOT NULL DEFAULT 'standard',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_vasps_chain ON vasps(chain);
CREATE INDEX IF NOT EXISTS idx_vasps_address ON vasps(deposit_address);

-- Traced cases (a wallet-in / attribution-out run)
CREATE TABLE IF NOT EXISTS cases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  case_ref TEXT UNIQUE NOT NULL,
  input_address TEXT NOT NULL,
  chain TEXT NOT NULL,
  fraud_type TEXT,
  status TEXT NOT NULL DEFAULT 'attributed',
  hop_count INTEGER NOT NULL,
  cluster_size INTEGER NOT NULL,
  mixer_exposure INTEGER NOT NULL DEFAULT 0,
  risk_score INTEGER NOT NULL,
  risk_band TEXT NOT NULL,
  attributed_vasp_id INTEGER,
  attributed_vasp_name TEXT,
  attributed_vasp_address TEXT,
  graph_json TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (attributed_vasp_id) REFERENCES vasps(id)
);

CREATE INDEX IF NOT EXISTS idx_cases_created ON cases(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cases_address ON cases(input_address);

-- Simple key-value app config / running counters (also doubles as KV replacement)
CREATE TABLE IF NOT EXISTS app_stats (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
