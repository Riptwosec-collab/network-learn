(function(){
  'use strict';

  const SECTION_LABELS = {
    fundamentals: '1. Fundamentals',
    automation: '2. Automation',
    linux: '3. Linux',
    cloud: '4. Cloud',
    security: '5. Security',
    sdwan: '6. SD-WAN/DC',
    monitoring: '7. Monitoring'
  };

  function normalizeSectionId(id) {
    if (!id) return 'fundamentals';
    return String(id).replace(/^#/, '');
  }

  function allSections() {
    return Array.from(document.querySelectorAll('.section[id]'));
  }

  function setActiveNav(id) {
    document.querySelectorAll('.nav-tab').forEach(tab => {
      const target = (tab.getAttribute('onclick') || '').match(/showSection\('([^']+)'\)/)?.[1];
      tab.classList.toggle('active', target === id);
    });
    document.querySelectorAll('.topic-item').forEach(item => {
      item.classList.toggle('active-topic', item.dataset.sectionId === id);
    });
  }

  function activateSection(id, options) {
    const opts = Object.assign({ scroll: true, hash: true }, options || {});
    const cleanId = normalizeSectionId(id);
    const target = document.getElementById(cleanId) || document.getElementById(cleanId.replace('ext-', '')) || document.getElementById('fundamentals');
    if (!target) return;

    allSections().forEach(section => section.classList.remove('active'));
    target.classList.add('active');
    setActiveNav(target.id);

    if (opts.hash && window.location.hash !== '#' + target.id) {
      history.replaceState(null, '', '#' + target.id);
    }
    if (opts.scroll) window.scrollTo({ top: 0, behavior: 'smooth' });

    window.dispatchEvent(new CustomEvent('networklearn:sectionchange', { detail: { id: target.id } }));
  }

  function buildTopicExplorer() {
    if (document.getElementById('topicExplorer')) return;
    const explorer = document.createElement('div');
    explorer.id = 'topicExplorer';
    explorer.className = 'topic-explorer';
    explorer.innerHTML = `
      <div class="topic-panel" role="dialog" aria-modal="true" aria-label="All learning topics">
        <div class="topic-panel-head">
          <div>
            <div class="topic-panel-title">All Topics</div>
            <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted);margin-top:4px;">เปิดทุกหน้า ทุกหัวข้อ จากที่เดียว</div>
          </div>
          <button class="topic-close" type="button" aria-label="Close topics" onclick="toggleTopicExplorer(false)">×</button>
        </div>
        <input class="topic-filter" id="topicFilter" placeholder="Filter เช่น BGP, VLAN, Cloud, NETCONF" autocomplete="off">
        <div class="topic-list" id="topicList"></div>
      </div>`;
    explorer.addEventListener('click', event => {
      if (event.target === explorer) window.toggleTopicExplorer(false);
    });
    document.body.appendChild(explorer);

    const input = document.getElementById('topicFilter');
    input.addEventListener('input', () => renderTopicList(input.value));
    renderTopicList('');
  }

  function sectionTitle(section) {
    return section.querySelector('.section-title')?.textContent?.trim() || SECTION_LABELS[section.id] || section.id;
  }

  function renderTopicList(filter) {
    const list = document.getElementById('topicList');
    if (!list) return;
    const q = (filter || '').trim().toLowerCase();
    const rows = allSections().map((section, index) => ({
      id: section.id,
      index: index + 1,
      title: sectionTitle(section),
      text: section.textContent.toLowerCase()
    })).filter(item => !q || item.title.toLowerCase().includes(q) || item.id.toLowerCase().includes(q) || item.text.includes(q));

    list.innerHTML = rows.map(item => `
      <button type="button" class="topic-item" data-section-id="${item.id}" onclick="gotoTab('${item.id}');toggleTopicExplorer(false)">
        <span class="topic-item-kicker">${String(item.index).padStart(2, '0')} / ${item.id.replace('ext-', '')}</span>
        <span class="topic-item-title">${item.title}</span>
      </button>`).join('') || '<div style="color:var(--text-muted);font-family:JetBrains Mono,monospace;font-size:12px;padding:16px;text-align:center;">ไม่พบหัวข้อ</div>';
    setActiveNav(document.querySelector('.section.active')?.id || 'fundamentals');
  }

  function initializeInteractiveDefaults() {
    const calls = [
      ['showOSI', 7], ['calcSubnet'], ['showProto', 'ospf'], ['showCloud', 'aws'], ['updateMetrics'],
      ['buildEncapLayers'], ['showTrouble', 'ping'], ['renderIPAM'], ['showIncident', 'ddos'], ['renderFlash'],
      ['searchCLI', ''], ['renderProg'], ['buildScenarios'], ['renderMV'], ['renderHarden'], ['calcQoS'],
      ['buildDSCP'], ['showMaturity', 0], ['runHSRPSim'], ['buildRunbookTabs'], ['buildDesignCards'],
      ['calcTCP'], ['calcBDP'], ['buildPurdue'], ['calcCost'], ['buildCompFramework'], ['calcCapacity']
    ];
    calls.forEach(([name, arg]) => {
      try {
        if (typeof window[name] === 'function') {
          arg === undefined ? window[name]() : window[name](arg);
        }
      } catch (error) {
        console.warn('Initializer skipped:', name, error);
      }
    });
  }

  window.showSection = function(id) { activateSection(id); };
  window.gotoTab = function(tabId) { activateSection(tabId); };
  window.toggleTopicExplorer = function(force) {
    buildTopicExplorer();
    const explorer = document.getElementById('topicExplorer');
    const shouldOpen = typeof force === 'boolean' ? force : !explorer.classList.contains('open');
    explorer.classList.toggle('open', shouldOpen);
    if (shouldOpen) {
      renderTopicList(document.getElementById('topicFilter')?.value || '');
      setTimeout(() => document.getElementById('topicFilter')?.focus(), 30);
    }
  };

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') window.toggleTopicExplorer(false);
  });

  document.addEventListener('DOMContentLoaded', () => {
    buildTopicExplorer();
    initializeInteractiveDefaults();
    activateSection(window.location.hash || 'fundamentals', { scroll: false, hash: Boolean(window.location.hash) });
  });
})();
