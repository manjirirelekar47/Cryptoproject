(function () {
  'use strict';

  var CHAIN_COLORS = { BTC: '#FFB100', ETH: '#00E5FF', TRON: '#35D07F', BSC: '#F0B90B' };
  var NODE_COLORS = {
    source: '#00E5FF',
    wallet: '#7C8AAE',
    mixer: '#FFB100',
    bridge: '#35D07F',
    exchange: '#FF5C7A',
    cluster: '#7C8AAE',
  };

  var SAMPLES = [
    { label: 'Investment scam · BTC', chain: 'BTC', address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', fraudType: 'investment_scam' },
    { label: 'Task-based fraud · ETH', chain: 'ETH', address: '0x28C6c06298d514Db089934071355E5743bf24d60', fraudType: 'task_fraud' },
    { label: 'Sextortion · TRON', chain: 'TRON', address: 'TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9', fraudType: 'sextortion' },
    { label: 'Ransomware payout · BSC', chain: 'BSC', address: '0x8894e0a0c962cb723c1976a4421c95949be2d4e3', fraudType: 'ransomware' },
    { label: 'Phishing drain · ETH', chain: 'ETH', address: '0x5aAeb6053f3e94c9b9a09f33669435e7ef1beaed', fraudType: 'phishing' },
    { label: 'Darknet payment · BTC', chain: 'BTC', address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5', fraudType: 'darknet' },
  ];

  var state = {
    chain: '',
    sessionCases: 0,
    riskSum: 0,
    attributedCount: 0,
    recent: [],
  };

  function $(id) { return document.getElementById(id); }

  function renderSamples() {
    var list = $('sampleList');
    list.innerHTML = '';
    SAMPLES.forEach(function (s) {
      var btn = document.createElement('div');
      btn.className = 'sample-btn';
      btn.innerHTML = '<span class="sb-tag">' + s.chain + '</span>' + s.address;
      btn.title = s.label;
      btn.addEventListener('click', function () {
        $('addrInput').value = s.address;
        setActiveChain(s.chain);
        $('fraudSelect').value = s.fraudType;
        runTrace();
      });
      list.appendChild(btn);
    });
  }

  function setActiveChain(chain) {
    state.chain = chain || '';
    document.querySelectorAll('#chainChips .chip').forEach(function (c) {
      c.classList.toggle('active', c.getAttribute('data-chain') === (chain || ''));
    });
  }

  function initChainChips() {
    document.querySelectorAll('#chainChips .chip').forEach(function (c) {
      c.addEventListener('click', function () {
        setActiveChain(c.getAttribute('data-chain'));
      });
    });
  }

  function showError(msg) {
    var box = $('errorBox');
    box.textContent = msg;
    box.classList.add('show');
  }
  function clearError() {
    var box = $('errorBox');
    box.classList.remove('show');
    box.textContent = '';
  }

  function fmtINR(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }

  async function loadFraudTypes() {
    try {
      var res = await fetch('/api/fraud-types');
      var data = await res.json();
      var sel = $('fraudSelect');
      sel.innerHTML = '';
      data.fraudTypes.forEach(function (f) {
        var opt = document.createElement('option');
        opt.value = f.key;
        opt.textContent = f.label;
        sel.appendChild(opt);
      });
    } catch (e) { /* keep static fallback options already in HTML */ }
  }

  async function loadVasps() {
    try {
      var res = await fetch('/api/vasps');
      var data = await res.json();
      var tbody = $('vaspTableBody');
      tbody.innerHTML = '';
      data.vasps.forEach(function (v) {
        var tr = document.createElement('tr');
        var tagClass = v.risk_tag === 'high' ? 'tag-high' : v.risk_tag === 'elevated' ? 'tag-elevated' : 'tag-standard';
        tr.innerHTML =
          '<td>' + v.name + '</td>' +
          '<td>' + v.chain + '</td>' +
          '<td>' + v.jurisdiction + '</td>' +
          '<td>' + v.kyc_tier + '</td>' +
          '<td><span class="tag-pill ' + tagClass + '">' + v.risk_tag + '</span></td>';
        tbody.appendChild(tr);
      });
      $('statVaspSize').textContent = data.vasps.length;
    } catch (e) {
      $('vaspTableBody').innerHTML = '<tr><td colspan="5" style="color:#FF5C7A">Failed to load registry.</td></tr>';
    }
  }

  function updateStats() {
    $('statTotalCases').textContent = state.sessionCases;
    $('statAttribRate').textContent = state.sessionCases > 0
      ? Math.round((state.attributedCount / state.sessionCases) * 100) + '%'
      : '–';
    $('statAvgRisk').textContent = state.sessionCases > 0
      ? Math.round(state.riskSum / state.sessionCases)
      : '–';
  }

  function renderRecent() {
    var el = $('recentCases');
    if (state.recent.length === 0) {
      el.innerHTML = '<p style="color:#7C8AAE;font-size:13px">No cases traced yet this session.</p>';
      return;
    }
    el.innerHTML = '';
    state.recent.slice(0, 6).forEach(function (c) {
      var row = document.createElement('div');
      row.className = 'recent-case-row';
      row.innerHTML =
        '<div class="rc-left"><span class="rc-ref">' + c.caseRef + '</span><span>' + c.chain + '</span></div>' +
        '<span style="color:' + bandColor(c.riskBand) + ';font-weight:700">' + c.riskScore + '</span>';
      row.addEventListener('click', function () {
        window.open('/report/' + c.caseRef, '_blank');
      });
      el.appendChild(row);
    });
  }

  function bandColor(band) {
    return { LOW: '#35D07F', MEDIUM: '#FFB100', HIGH: '#ff8c3c', CRITICAL: '#FF5C7A' }[band] || '#00E5FF';
  }

  function drawGauge(score) {
    var arc = $('gaugeArc');
    var circumference = Math.PI * 75; // half circle length
    var frac = Math.max(0, Math.min(100, score)) / 100;
    var len = circumference * frac;
    arc.style.transition = 'none';
    arc.setAttribute('stroke-dasharray', '0 500');
    arc.setAttribute('stroke', bandColor(scoreToBand(score)));
    requestAnimationFrame(function () {
      arc.style.transition = 'stroke-dasharray 1s cubic-bezier(.2,.8,.2,1)';
      arc.setAttribute('stroke-dasharray', len.toFixed(1) + ' 500');
    });
  }

  function scoreToBand(score) {
    if (score >= 80) return 'CRITICAL';
    if (score >= 60) return 'HIGH';
    if (score >= 35) return 'MEDIUM';
    return 'LOW';
  }

  function renderGraph(nodes, edges) {
    var svg = $('graphSvg');
    var W = Math.max(900, nodes.length * 150);
    svg.setAttribute('width', W);
    svg.setAttribute('viewBox', '0 0 ' + W + ' 260');
    svg.innerHTML = '';

    var maxHop = Math.max.apply(null, nodes.map(function (n) { return n.hop; }));
    var xStep = (W - 140) / Math.max(maxHop, 1);
    var positions = {};
    nodes.forEach(function (n) {
      positions[n.id] = { x: 70 + n.hop * xStep, y: 130 };
    });

    var ns = 'http://www.w3.org/2000/svg';

    // edges first (so nodes draw on top)
    edges.forEach(function (e, i) {
      var p1 = positions[e.from], p2 = positions[e.to];
      var path = document.createElementNS(ns, 'path');
      var midX = (p1.x + p2.x) / 2;
      var curveY = 130 + (i % 2 === 0 ? -46 : 46);
      var d = 'M ' + p1.x + ' ' + p1.y + ' Q ' + midX + ' ' + curveY + ' ' + p2.x + ' ' + p2.y;
      path.setAttribute('d', d);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', e.bridged ? '#35D07F' : 'rgba(0,229,255,0.45)');
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-dasharray', e.bridged ? '5 4' : 'none');
      var animLen = document.createElementNS(ns, 'animate');
      svg.appendChild(path);

      // amount label
      var label = document.createElementNS(ns, 'text');
      label.setAttribute('x', midX);
      label.setAttribute('y', curveY + (curveY < 130 ? -6 : 16));
      label.setAttribute('fill', '#7C8AAE');
      label.setAttribute('font-size', '10.5');
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-family', 'monospace');
      label.textContent = e.asset + ' · ' + fmtINR(e.amount);
      svg.appendChild(label);
    });

    // nodes
    nodes.forEach(function (n) {
      var pos = positions[n.id];
      var g = document.createElementNS(ns, 'g');

      var circle = document.createElementNS(ns, 'circle');
      circle.setAttribute('cx', pos.x);
      circle.setAttribute('cy', pos.y);
      circle.setAttribute('r', n.type === 'exchange' ? 14 : n.type === 'source' ? 12 : 9);
      circle.setAttribute('fill', NODE_COLORS[n.type] || '#7C8AAE');
      circle.setAttribute('stroke', '#0A1128');
      circle.setAttribute('stroke-width', '3');
      g.appendChild(circle);

      if (n.type === 'exchange') {
        var glow = document.createElementNS(ns, 'circle');
        glow.setAttribute('cx', pos.x);
        glow.setAttribute('cy', pos.y);
        glow.setAttribute('r', 20);
        glow.setAttribute('fill', 'none');
        glow.setAttribute('stroke', NODE_COLORS.exchange);
        glow.setAttribute('stroke-width', '1.5');
        glow.setAttribute('opacity', '0.5');
        var anim = document.createElementNS(ns, 'animate');
        anim.setAttribute('attributeName', 'r');
        anim.setAttribute('values', '14;24;14');
        anim.setAttribute('dur', '2.2s');
        anim.setAttribute('repeatCount', 'indefinite');
        glow.appendChild(anim);
        var animOp = document.createElementNS(ns, 'animate');
        animOp.setAttribute('attributeName', 'opacity');
        animOp.setAttribute('values', '0.5;0;0.5');
        animOp.setAttribute('dur', '2.2s');
        animOp.setAttribute('repeatCount', 'indefinite');
        glow.appendChild(animOp);
        g.appendChild(glow);
      }

      var chainLbl = document.createElementNS(ns, 'text');
      chainLbl.setAttribute('x', pos.x);
      chainLbl.setAttribute('y', pos.y + 4);
      chainLbl.setAttribute('text-anchor', 'middle');
      chainLbl.setAttribute('font-size', '8');
      chainLbl.setAttribute('font-weight', '700');
      chainLbl.setAttribute('fill', '#0A1128');
      if (n.type === 'source' || n.type === 'exchange' || n.type === 'mixer' || n.type === 'bridge') {
        chainLbl.textContent = n.chain;
        g.appendChild(chainLbl);
      }

      var label = document.createElementNS(ns, 'text');
      label.setAttribute('x', pos.x);
      label.setAttribute('y', pos.y + 32);
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('font-size', '10.5');
      label.setAttribute('fill', '#fff');
      label.setAttribute('font-weight', n.type === 'exchange' || n.type === 'source' ? '700' : '400');
      label.textContent = n.label;
      g.appendChild(label);

      var addrLabel = document.createElementNS(ns, 'text');
      addrLabel.setAttribute('x', pos.x);
      addrLabel.setAttribute('y', pos.y + 46);
      addrLabel.setAttribute('text-anchor', 'middle');
      addrLabel.setAttribute('font-size', '9');
      addrLabel.setAttribute('fill', '#7C8AAE');
      addrLabel.setAttribute('font-family', 'monospace');
      addrLabel.textContent = shortAddr(n.address);
      g.appendChild(addrLabel);

      svg.appendChild(g);
    });
  }

  function shortAddr(a) {
    if (!a || a.length <= 14) return a;
    return a.slice(0, 8) + '…' + a.slice(-6);
  }

  function renderFactors(factors) {
    var maxAbs = Math.max.apply(null, factors.map(function (f) { return Math.abs(f.weight); })) || 1;
    var container = $('factorList');
    container.innerHTML = '';
    factors.forEach(function (f) {
      var row = document.createElement('div');
      row.className = 'factor-row';
      var pct = Math.min(100, (Math.abs(f.weight) / maxAbs) * 100);
      row.innerHTML =
        '<div class="factor-top"><span class="f-label">' + f.label + '</span><span class="f-weight">' + (f.weight > 0 ? '+' : '') + f.weight + '</span></div>' +
        '<div class="factor-bar-track"><div class="factor-bar-fill' + (f.weight < 0 ? ' neg' : '') + '" style="width:' + pct + '%"></div></div>' +
        '<div class="factor-detail">' + f.detail + '</div>';
      container.appendChild(row);
    });
  }

  function renderTimeline(timeline) {
    var container = $('timelineList');
    container.innerHTML = '';
    timeline.forEach(function (t) {
      var item = document.createElement('div');
      item.className = 'dt-item';
      item.innerHTML =
        '<div class="dt-time">T+' + t.minutesElapsed + ' min &middot; Hop ' + t.hop + '</div>' +
        '<div class="dt-note">' + t.note + '</div>';
      container.appendChild(item);
    });
  }

  function renderAttribution(result) {
    var el = $('attrContent');
    if (result.attributedVasp) {
      var v = result.attributedVasp;
      var tagClass = v.risk_tag === 'high' ? 'tag-high' : v.risk_tag === 'elevated' ? 'tag-elevated' : 'tag-standard';
      el.innerHTML =
        '<div class="attr-name">' + v.name + '</div>' +
        '<div class="attr-meta-row">' +
          '<span class="attr-meta">' + v.chain + '</span>' +
          '<span class="attr-meta">' + v.jurisdiction + '</span>' +
          '<span class="attr-meta">' + v.kyc_tier + '</span>' +
          '<span class="tag-pill ' + tagClass + '">' + v.risk_tag + ' risk</span>' +
        '</div>' +
        '<div class="attr-address">' + v.deposit_address + '</div>';
    } else {
      el.innerHTML =
        '<div class="unattributed">Unattributed endpoint</div>' +
        '<div class="card-desc" style="margin-top:8px;color:#A9B7D0">No registry match on the final hop — flagged for manual VASP registry enrichment and continued monitoring.</div>';
    }
  }

  async function runTrace() {
    clearError();
    var address = $('addrInput').value.trim();
    if (!address) {
      showError('Please enter a wallet address or pick a sample.');
      return;
    }
    var btn = $('traceBtn');
    var label = $('traceBtnLabel');
    btn.disabled = true;
    var prevLabel = label.textContent;
    label.innerHTML = '<span class="loading-spinner"></span> Tracing…';

    try {
      var res = await fetch('/api/trace', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: address,
          chain: state.chain || undefined,
          fraudType: $('fraudSelect').value,
        }),
      });
      var data = await res.json();
      if (!res.ok) {
        showError(data.error || 'Trace failed. Please check the address and try again.');
        return;
      }

      // Update session stats
      state.sessionCases++;
      state.riskSum += data.riskScore;
      if (data.attributedVasp) state.attributedCount++;
      state.recent.unshift(data);
      updateStats();
      renderRecent();

      // Populate result panel
      $('emptyState').classList.add('hide');
      $('resultArea').classList.add('show');
      $('caseRefTag').textContent = data.caseRef;
      $('reportLink').href = '/report/' + data.caseRef;
      $('riskScoreNum').textContent = data.riskScore;
      var bandTag = $('riskBandTag');
      bandTag.textContent = data.riskBand;
      bandTag.className = 'risk-band-tag band-' + data.riskBand;
      drawGauge(data.riskScore);
      renderAttribution(data);
      renderGraph(data.nodes, data.edges);
      renderFactors(data.riskFactors);
      renderTimeline(data.timeline);

      document.getElementById('resultArea').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) {
      showError('Network error — could not reach the tracing service. Please try again.');
    } finally {
      btn.disabled = false;
      label.textContent = prevLabel;
    }
  }

  function init() {
    renderSamples();
    initChainChips();
    loadFraudTypes();
    loadVasps();
    updateStats();
    $('traceBtn').addEventListener('click', runTrace);
    $('addrInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') runTrace();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
