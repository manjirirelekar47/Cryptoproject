-- Seed VASP / exchange deposit-address registry (illustrative demo data)
INSERT OR IGNORE INTO vasps (name, chain, deposit_address, jurisdiction, kyc_tier, risk_tag) VALUES
('WazirX', 'BTC', 'bc1qwzx9k2m4h6n8p0q2r4s6t8u0v2w4x6y8z0a2b', 'India', 'Tier-1 KYC', 'standard'),
('WazirX', 'ETH', '0xwzx1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3', 'India', 'Tier-1 KYC', 'standard'),
('CoinDCX', 'BTC', 'bc1qcdcx7h9j1k3m5n7p9q1r3s5t7u9v1w3x5y7z9', 'India', 'Tier-1 KYC', 'standard'),
('CoinDCX', 'ETH', '0xcdcx2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4', 'India', 'Tier-1 KYC', 'standard'),
('CoinDCX', 'TRON', 'TCdcx9Ha7Mq3Lp5Nr7Ot9Qv1Sx3Uz5Wb7Yd9Af', 'India', 'Tier-1 KYC', 'standard'),
('ZebPay', 'BTC', 'bc1qzbp3k5m7n9p1q3r5s7t9u1v3w5x7y9z1a3b5', 'India', 'Tier-1 KYC', 'standard'),
('ZebPay', 'ETH', '0xzbp3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5', 'India', 'Tier-1 KYC', 'standard'),
('Binance', 'BTC', 'bc1qbnb5m7n9p1q3r5s7t9u1v3w5x7y9z1a3b5c7', 'Global', 'Tier-1 KYC', 'standard'),
('Binance', 'ETH', '0xbinance28C6c06298d514Db089934071355E5743b', 'Global', 'Tier-1 KYC', 'standard'),
('Binance', 'BSC', '0xbnbBSC4d5e6f708192a3b4c5d6e7f8091a2b3c4d5', 'Global', 'Tier-1 KYC', 'standard'),
('Binance', 'TRON', 'TBnb7Mq3Lp5Nr7Ot9Qv1Sx3Uz5Wb7Yd9Af1Ch3E', 'Global', 'Tier-1 KYC', 'standard'),
('OKX', 'ETH', '0xokx4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6', 'Seychelles', 'Tier-1 KYC', 'standard'),
('OKX', 'TRON', 'TOkx3Lp5Nr7Ot9Qv1Sx3Uz5Wb7Yd9Af1Ch3Ej5G', 'Seychelles', 'Tier-1 KYC', 'standard'),
('KuCoin', 'ETH', '0xkuc5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f7', 'Seychelles', 'Tier-2 KYC', 'elevated'),
('KuCoin', 'BSC', '0xkucBSC6f708192a3b4c5d6e7f8091a2b3c4d5e6f7', 'Seychelles', 'Tier-2 KYC', 'elevated'),
('HTX (Huobi)', 'TRON', 'THtx5Nr7Ot9Qv1Sx3Uz5Wb7Yd9Af1Ch3Ej5Gl7I', 'Seychelles', 'Tier-2 KYC', 'elevated'),
('HTX (Huobi)', 'ETH', '0xhtx6f708192a3b4c5d6e7f8091a2b3c4d5e6f708', 'Seychelles', 'Tier-2 KYC', 'elevated'),
('Bybit', 'ETH', '0xbybit7f708192a3b4c5d6e7f8091a2b3c4d5e6f7', 'Dubai', 'Tier-1 KYC', 'standard'),
('Bybit', 'BSC', '0xbybitBSC8192a3b4c5d6e7f8091a2b3c4d5e6f70', 'Dubai', 'Tier-1 KYC', 'standard'),
('MEXC', 'ETH', '0xmexc8192a3b4c5d6e7f8091a2b3c4d5e6f70819', 'Seychelles', 'Tier-3 KYC', 'high'),
('MEXC', 'TRON', 'TMexc7Ot9Qv1Sx3Uz5Wb7Yd9Af1Ch3Ej5Gl7Ip9K', 'Seychelles', 'Tier-3 KYC', 'high'),
('Unnamed OTC Desk', 'TRON', 'TOtc9Qv1Sx3Uz5Wb7Yd9Af1Ch3Ej5Gl7Ip9Kr1M', 'Unknown', 'No KYC', 'high'),
('Unnamed OTC Desk', 'ETH', '0xotc9a3b4c5d6e7f8091a2b3c4d5e6f7081920a3', 'Unknown', 'No KYC', 'high');

INSERT OR IGNORE INTO app_stats (key, value) VALUES ('total_cases_processed', '0');
INSERT OR IGNORE INTO app_stats (key, value) VALUES ('total_funds_traced_inr', '0');
