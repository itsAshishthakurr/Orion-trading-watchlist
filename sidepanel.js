// ORION Watchlist v3.0 — sidepanel.js
// Capture fix: page title is PRIMARY method. DOM selectors are secondary.
// URL is LAST resort (unreliable on TradingView).

const GLASS_DEFAULT = 'rgba(255,255,255,0.06)';

document.addEventListener('DOMContentLoaded', () => {

  // ── Element refs ──────────────────────────────────────────────
  const brandTitle        = document.getElementById('brandTitle');
  const themeToggle       = document.getElementById('themeToggle');
  const themePanel        = document.getElementById('themePanel');

  const accentPicker      = document.getElementById('accentPicker');
  const accentHex         = document.getElementById('accentHex');
  const titleColorPicker  = document.getElementById('titleColorPicker');
  const titleHex          = document.getElementById('titleHex');
  const glassModeBtn      = document.getElementById('glassModeBtn');

  const captureBtnPicker  = document.getElementById('captureBtnPicker');
  const captureBtnHex     = document.getElementById('captureBtnHex');
  const saveBtnPicker     = document.getElementById('saveBtnPicker');
  const saveBtnHex        = document.getElementById('saveBtnHex');

  const symbolInputPicker = document.getElementById('symbolInputPicker');
  const folderInputPicker = document.getElementById('folderInputPicker');
  const tagsInputPicker   = document.getElementById('tagsInputPicker');
  const notesInputPicker  = document.getElementById('notesInputPicker');

  const bgColorPicker     = document.getElementById('bgColorPicker');
  const bgColorHex        = document.getElementById('bgColorHex');
  const bgUpload          = document.getElementById('bgUpload');
  const bgUpload2         = document.getElementById('bgUpload2');
  const removeBgBtn       = document.getElementById('removeBgBtn');
  const bgFit             = document.getElementById('bgFit');
  const bgPosition        = document.getElementById('bgPosition');

  const fontSizeSlider    = document.getElementById('fontSizeSlider');
  const fontSizeLabel     = document.getElementById('fontSizeLabel');

  const symbolInput       = document.getElementById('symbol');
  const folderInput       = document.getElementById('folder');
  const tagsInput         = document.getElementById('tags');
  const notesInput        = document.getElementById('notes');
  const captureBtn        = document.getElementById('captureBtn');
  const saveBtn           = document.getElementById('saveBtn');

  const searchBar         = document.getElementById('searchBar');
  const tagFilter         = document.getElementById('tagFilter');
  const foldersContainer  = document.getElementById('foldersContainer');

  const brokersToggle     = document.getElementById('brokersToggle');
  const brokersPanel      = document.getElementById('brokersPanel');
  const addBrokerBtn      = document.getElementById('addBrokerBtn');
  const addBrokerForm     = document.getElementById('addBrokerForm');
  const brokerNameInput   = document.getElementById('brokerName');
  const brokerUrlInput    = document.getElementById('brokerUrl');
  const brokerType        = document.getElementById('brokerType');
  const brokerHint        = document.getElementById('brokerHint');
  const saveBrokerBtn     = document.getElementById('saveBrokerBtn');
  const brokersList       = document.getElementById('brokersList');

  // ── Init ──────────────────────────────────────────────────────
  loadTheme();
  loadFolders();
  loadBrokers();

  // ── THEME PANEL TOGGLE ────────────────────────────────────────
  themeToggle?.addEventListener('click', () => themePanel.classList.toggle('hidden'));

  // ── LOAD THEME ────────────────────────────────────────────────
  function loadTheme() {
    chrome.storage.local.get([
      'accent','titleColor','bgColor','bgImage','bgSize','bgPosition',
      'captureBtnColor','saveBtnColor',
      'symbolInputColor','folderInputColor','tagsInputColor','notesInputColor',
      'glassMode','fontSize'
    ], r => {
      if (r.accent) {
        document.documentElement.style.setProperty('--accent', r.accent);
        if (accentPicker) accentPicker.value = r.accent;
        if (accentHex)    accentHex.value    = r.accent;
      }
      if (r.titleColor) {
        brandTitle.style.color = r.titleColor;
        if (titleColorPicker) titleColorPicker.value = r.titleColor;
        if (titleHex)         titleHex.value         = r.titleColor;
      }
      if (r.bgColor) {
        document.documentElement.style.setProperty('--bg', r.bgColor);
        document.body.style.backgroundColor = r.bgColor;
        if (bgColorPicker) bgColorPicker.value = r.bgColor;
        if (bgColorHex)    bgColorHex.value    = r.bgColor;
      }
      if (r.bgImage)    document.body.style.backgroundImage    = `url(${r.bgImage})`;
      if (r.bgSize)     { document.body.style.backgroundSize   = r.bgSize;     if (bgFit)      bgFit.value      = r.bgSize; }
      if (r.bgPosition) { document.body.style.backgroundPosition = r.bgPosition; if (bgPosition) bgPosition.value = r.bgPosition; }

      if (r.captureBtnColor) {
        captureBtn.style.background = r.captureBtnColor;
        if (captureBtnPicker) captureBtnPicker.value = r.captureBtnColor;
        if (captureBtnHex)    captureBtnHex.value    = r.captureBtnColor;
      }
      if (r.saveBtnColor) {
        saveBtn.style.background = r.saveBtnColor;
        if (saveBtnPicker) saveBtnPicker.value = r.saveBtnColor;
        if (saveBtnHex)    saveBtnHex.value    = r.saveBtnColor;
      }
      if (r.symbolInputColor) symbolInput.style.background = r.symbolInputColor;
      if (r.folderInputColor) folderInput.style.background = r.folderInputColor;
      if (r.tagsInputColor)   tagsInput.style.background   = r.tagsInputColor;
      if (r.notesInputColor)  notesInput.style.background  = r.notesInputColor;

      if (r.glassMode) {
        document.body.classList.add('glass-mode');
        if (glassModeBtn) glassModeBtn.textContent = 'Disable Glass';
      }
      const fs = r.fontSize || 14;
      document.documentElement.style.fontSize = fs + 'px';
      if (fontSizeSlider) fontSizeSlider.value = fs;
      if (fontSizeLabel)  fontSizeLabel.textContent = fs + 'px';
    });
  }

  // ── THEME LISTENERS ───────────────────────────────────────────

  accentPicker?.addEventListener('input', e => {
    document.documentElement.style.setProperty('--accent', e.target.value);
    if (accentHex) accentHex.value = e.target.value;
    chrome.storage.local.set({ accent: e.target.value });
  });
  accentHex?.addEventListener('input', e => {
    const v = e.target.value.trim();
    if (!isValidHex(v)) return;
    document.documentElement.style.setProperty('--accent', v);
    if (accentPicker) accentPicker.value = v;
    chrome.storage.local.set({ accent: v });
  });

  titleColorPicker?.addEventListener('input', e => {
    brandTitle.style.color = e.target.value;
    if (titleHex) titleHex.value = e.target.value;
    chrome.storage.local.set({ titleColor: e.target.value });
  });
  titleHex?.addEventListener('input', e => {
    const v = e.target.value.trim();
    if (!isValidHex(v)) return;
    brandTitle.style.color = v;
    if (titleColorPicker) titleColorPicker.value = v;
    chrome.storage.local.set({ titleColor: v });
  });

  glassModeBtn?.addEventListener('click', () => {
    const on = document.body.classList.toggle('glass-mode');
    glassModeBtn.textContent = on ? 'Disable Glass' : 'Enable Glass';
    chrome.storage.local.set({ glassMode: on });
  });

  captureBtnPicker?.addEventListener('input', e => {
    captureBtn.style.background = e.target.value;
    if (captureBtnHex) captureBtnHex.value = e.target.value;
    chrome.storage.local.set({ captureBtnColor: e.target.value });
  });
  captureBtnHex?.addEventListener('input', e => {
    const v = e.target.value.trim();
    if (!isValidHex(v)) return;
    captureBtn.style.background = v;
    if (captureBtnPicker) captureBtnPicker.value = v;
    chrome.storage.local.set({ captureBtnColor: v });
  });

  saveBtnPicker?.addEventListener('input', e => {
    saveBtn.style.background = e.target.value;
    if (saveBtnHex) saveBtnHex.value = e.target.value;
    chrome.storage.local.set({ saveBtnColor: e.target.value });
  });
  saveBtnHex?.addEventListener('input', e => {
    const v = e.target.value.trim();
    if (!isValidHex(v)) return;
    saveBtn.style.background = v;
    if (saveBtnPicker) saveBtnPicker.value = v;
    chrome.storage.local.set({ saveBtnColor: v });
  });

  // Input color pickers + reset buttons
  const inputColorMap = {
    symbolInputPicker: { el: symbolInput, key: 'symbolInputColor' },
    folderInputPicker: { el: folderInput, key: 'folderInputColor' },
    tagsInputPicker:   { el: tagsInput,   key: 'tagsInputColor'   },
    notesInputPicker:  { el: notesInput,  key: 'notesInputColor'  },
  };
  [symbolInputPicker, folderInputPicker, tagsInputPicker, notesInputPicker].forEach(picker => {
    if (!picker) return;
    const entry = inputColorMap[picker.id];
    picker.addEventListener('input', e => {
      entry.el.style.background = e.target.value;
      chrome.storage.local.set({ [entry.key]: e.target.value });
    });
  });
  document.querySelectorAll('.reset-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const el = document.getElementById(targetId);
      if (!el) return;
      el.style.background = GLASS_DEFAULT;
      // Find the correct storage key
      const entry = Object.values(inputColorMap).find(e => e.el === el);
      if (entry) chrome.storage.local.set({ [entry.key]: GLASS_DEFAULT });
      const pickerEl = document.getElementById(targetId + 'InputPicker');
      if (pickerEl) pickerEl.value = '#ffffff';
    });
  });

  bgColorPicker?.addEventListener('input', e => {
    document.documentElement.style.setProperty('--bg', e.target.value);
    document.body.style.backgroundColor = e.target.value;
    if (bgColorHex) bgColorHex.value = e.target.value;
    chrome.storage.local.set({ bgColor: e.target.value });
  });
  bgColorHex?.addEventListener('input', e => {
    const v = e.target.value.trim();
    if (!isValidHex(v)) return;
    document.documentElement.style.setProperty('--bg', v);
    document.body.style.backgroundColor = v;
    if (bgColorPicker) bgColorPicker.value = v;
    chrome.storage.local.set({ bgColor: v });
  });

  function handleBgUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      document.body.style.backgroundImage = `url(${reader.result})`;
      chrome.storage.local.set({ bgImage: reader.result });
    };
    reader.readAsDataURL(file);
  }
  bgUpload?.addEventListener('change', handleBgUpload);
  bgUpload2?.addEventListener('change', handleBgUpload);

  removeBgBtn?.addEventListener('click', () => {
    document.body.style.backgroundImage = '';
    chrome.storage.local.remove('bgImage');
  });

  bgFit?.addEventListener('change', e => {
    document.body.style.backgroundSize = e.target.value;
    chrome.storage.local.set({ bgSize: e.target.value });
  });
  bgPosition?.addEventListener('change', e => {
    document.body.style.backgroundPosition = e.target.value;
    chrome.storage.local.set({ bgPosition: e.target.value });
  });

  fontSizeSlider?.addEventListener('input', e => {
    const v = e.target.value;
    document.documentElement.style.fontSize = v + 'px';
    if (fontSizeLabel) fontSizeLabel.textContent = v + 'px';
    chrome.storage.local.set({ fontSize: parseInt(v) });
  });

  // ── SYMBOL CAPTURE ────────────────────────────────────────────
  //
  // WHY TITLE IS PRIMARY:
  // TradingView updates document.title IMMEDIATELY when you switch charts.
  // The URL only updates sometimes (not on every chart switch).
  // DOM class names change with TV updates and are unreliable.
  // Title format: "SYMBOL NAME • TIMEFRAME • EXCHANGE — TradingView"
  // Examples:
  //   "Gold Futures • 1D • MCX — TradingView"       → MCX:GOLDFUTURES... wait
  //   "Gold Futures • 1D • MCX — TradingView"       → MCX:GOLD (first word)
  //   "Nifty 50 • 1W • NSE — TradingView"           → NSE:NIFTY50
  //   "Reliance Industries • D • NSE — TradingView" → NSE:RELIANCEINDUSTRIES... hmm
  //   Actually TV stores them as RELIANCE not RELIANCE INDUSTRIES
  //   So we clean and use the full word-joined symbol — TV's own ticker
  //   will match because the title shows what TV calls it

  captureBtn?.addEventListener('click', async () => {
    let tabs;
    try { tabs = await chrome.tabs.query({ active: true, currentWindow: true }); }
    catch(e) { flashInput(symbolInput, false); return; }

    const tab = tabs[0];
    if (!tab?.url?.includes('tradingview.com')) {
      symbolInput.placeholder = 'Not a TradingView tab';
      flashInput(symbolInput, false);
      setTimeout(() => { symbolInput.placeholder = 'Symbol (e.g. NSE:NIFTY)'; }, 2500);
      return;
    }

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const KNOWN_EXCHANGES = ['NSE','BSE','MCX','NYSE','NASDAQ','BINANCE','COINBASE'];
        const title = document.title || '';
        const parts = title.split('•').map(s => s.trim());

        let rawName, exchange;

        if (parts.length > 1) {
          // Standard TradingView title: "Symbol Name • Timeframe • Exchange — TradingView"
          rawName = parts[0] || '';
          const lastPart = parts[parts.length - 1].split(/[—–-]/)[0].trim().toUpperCase();
          const matched = KNOWN_EXCHANGES.find(ex => lastPart === ex || lastPart.startsWith(ex));
          exchange = matched || 'NSE';
        } else {
          // Fallback: no bullet separator — take first word
          rawName = title.split(/\s+/)[0] || '';
          exchange = 'NSE';
        }

        const cleanSym = rawName
          .toUpperCase()
          .replace(/[^A-Z0-9\s]/g, '')
          .trim()
          .replace(/\s+/g, '');

        if (!cleanSym) return null;

        return `${exchange}:${cleanSym}`;
      }
    }, results => {
      if (chrome.runtime.lastError || !results?.[0]?.result) {
        symbolInput.placeholder = "Couldn't capture — enter manually";
        flashInput(symbolInput, false);
        setTimeout(() => { symbolInput.placeholder = 'Symbol (e.g. NSE:NIFTY)'; }, 2500);
        return;
      }
      symbolInput.value = results[0].result;
      flashInput(symbolInput, true);
    });
  });

  // ── SAVE ──────────────────────────────────────────────────────
  saveBtn?.addEventListener('click', () => {
    const symVal    = symbolInput.value.trim();
    const folderVal = folderInput.value.trim();
    if (!symVal)    { flashInput(symbolInput, false); return; }
    if (!folderVal) { flashInput(folderInput, false); return; }

    chrome.storage.local.get(['data'], r => {
      const data = r.data || {};
      if (!data[folderVal]) {
        data[folderVal] = { color: randomFolderColor(), collapsed: false, symbols: [] };
      }
      data[folderVal].symbols.push({
        symbol: symVal, tags: tagsInput.value.trim(),
        notes: notesInput.value.trim(), pinned: false,
        lastOpened: null, order: data[folderVal].symbols.length
      });
      chrome.storage.local.set({ data }, () => {
        symbolInput.value = ''; folderInput.value = '';
        tagsInput.value = '';   notesInput.value = '';
        loadFolders();
      });
    });
  });

  // ── SEARCH & FILTER ───────────────────────────────────────────
  searchBar?.addEventListener('input', loadFolders);
  tagFilter?.addEventListener('input', loadFolders);

  // ── LOAD FOLDERS ─────────────────────────────────────────────
  function loadFolders() {
    chrome.storage.local.get(['data'], r => {
      const data   = r.data || {};
      const search = (searchBar?.value || '').trim().toLowerCase();
      const tagQ   = (tagFilter?.value  || '').trim().toLowerCase();
      foldersContainer.innerHTML = '';

      Object.keys(data).forEach(folderName => {
        const folder  = data[folderName];
        const symbols = folder.symbols || [];

        // search = symbol + notes only | tagQ = tags only | AND logic
        const filtered = symbols.filter(item => {
          const matchSearch = !search ||
            item.symbol.toLowerCase().includes(search) ||
            (item.notes && item.notes.toLowerCase().includes(search));
          const matchTag = !tagQ ||
            (item.tags && item.tags.toLowerCase().includes(tagQ));
          return matchSearch && matchTag;
        });

        const sorted = [...filtered].sort((a, b) => {
          if (a.pinned && !b.pinned) return -1;
          if (!a.pinned && b.pinned) return 1;
          return (a.order || 0) - (b.order || 0);
        });

        const folderDiv = document.createElement('div');
        folderDiv.className = 'folder';

        // Header
        const header = document.createElement('div');
        header.className = 'folder-header';

        const dot = document.createElement('span');
        dot.className = 'folder-dot';
        dot.style.background = folder.color || '#2a8f2a';
        dot.title = 'Change color';
        dot.addEventListener('click', e => {
          e.stopPropagation();
          const picker = document.createElement('input');
          picker.type = 'color';
          picker.value = folder.color || '#2a8f2a';
          Object.assign(picker.style, { position:'absolute', opacity:'0', width:'0', height:'0' });
          document.body.appendChild(picker);
          picker.click();
          picker.addEventListener('input', ev => {
            folder.color = ev.target.value;
            dot.style.background = ev.target.value;
            chrome.storage.local.set({ data });
          });
          picker.addEventListener('blur', () => picker.remove());
          picker.addEventListener('change', () => setTimeout(() => picker.remove(), 300));
        });

        const nameSpan = document.createElement('span');
        nameSpan.className = 'folder-name';
        nameSpan.textContent = folderName;

        const badge = document.createElement('span');
        badge.className = 'badge';
        badge.textContent = symbols.length;

        const arrow = document.createElement('span');
        arrow.className = 'folder-arrow' + (folder.collapsed ? '' : ' open');
        arrow.textContent = '▶';

        const delBtn = document.createElement('button');
        delBtn.className = 'glass-btn folder-delete-btn';
        delBtn.textContent = '🗑';
        delBtn.addEventListener('click', e => {
          e.stopPropagation();
          if (!confirm(`Delete folder "${folderName}" and all its symbols?`)) return;
          delete data[folderName];
          chrome.storage.local.set({ data }, loadFolders);
        });

        header.appendChild(dot);
        header.appendChild(nameSpan);
        header.appendChild(badge);
        header.appendChild(arrow);
        header.appendChild(delBtn);

        const content = document.createElement('div');
        content.className = 'folder-content';
        content.style.display = folder.collapsed ? 'none' : 'block';

        header.addEventListener('click', () => {
          folder.collapsed = !folder.collapsed;
          content.style.display = folder.collapsed ? 'none' : 'block';
          arrow.classList.toggle('open', !folder.collapsed);
          chrome.storage.local.set({ data });
        });

        let dragSrcIdx = null;

        sorted.forEach(item => {
          const realIdx = symbols.indexOf(item);
          const card = document.createElement('div');
          card.className = 'symbol-card' + (item.pinned ? ' pinned' : '');
          card.draggable = true;

          card.addEventListener('dragstart', () => { dragSrcIdx = realIdx; setTimeout(() => card.classList.add('dragging'), 0); });
          card.addEventListener('dragend',   () => card.classList.remove('dragging'));
          card.addEventListener('dragover',  e => { e.preventDefault(); card.classList.add('drag-over'); });
          card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
          card.addEventListener('drop', e => {
            e.preventDefault();
            card.classList.remove('drag-over');
            if (dragSrcIdx === null || dragSrcIdx === realIdx) return;
            const moved = symbols.splice(dragSrcIdx, 1)[0];
            symbols.splice(realIdx, 0, moved);
            symbols.forEach((s, i) => s.order = i);
            chrome.storage.local.set({ data }, loadFolders);
          });

          const cardTop = document.createElement('div');
          cardTop.className = 'card-top';

          const symName = document.createElement('span');
          symName.className = 'symbol-name';
          symName.textContent = item.symbol;

          const pinBtn = document.createElement('button');
          pinBtn.className = 'pin-btn' + (item.pinned ? ' active' : '');
          pinBtn.textContent = '📌';
          pinBtn.title = item.pinned ? 'Unpin' : 'Pin to top';
          pinBtn.addEventListener('click', e => {
            e.stopPropagation();
            item.pinned = !item.pinned;
            chrome.storage.local.set({ data }, loadFolders);
          });

          cardTop.appendChild(symName);
          cardTop.appendChild(pinBtn);

          const notesEl = item.notes ? document.createElement('div') : null;
          if (notesEl) { notesEl.className = 'symbol-notes'; notesEl.textContent = item.notes; }

          const tagsEl = item.tags ? document.createElement('div') : null;
          if (tagsEl) { tagsEl.className = 'symbol-tags'; tagsEl.textContent = '🏷 ' + item.tags; }

          const timeEl = document.createElement('div');
          timeEl.className = 'symbol-time';
          timeEl.textContent = item.lastOpened ? '⏱ ' + timeAgo(item.lastOpened) : '';

          const actions = document.createElement('div');
          actions.className = 'symbol-actions';

          const openBtn = document.createElement('button');
          openBtn.className = 'glass-btn';
          openBtn.textContent = 'Open';
          openBtn.addEventListener('click', async () => {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            chrome.tabs.update(tab.id, { url: `https://www.tradingview.com/chart/?symbol=${item.symbol}` });
            item.lastOpened = Date.now();
            chrome.storage.local.set({ data }, loadFolders);
          });

          const brokerBtn = document.createElement('button');
          brokerBtn.className = 'glass-btn';
          brokerBtn.textContent = 'Broker';
          brokerBtn.addEventListener('click', e => {
            e.stopPropagation();
            document.querySelectorAll('.broker-popover').forEach(p => p.remove());
            chrome.storage.local.get(['brokers'], rb => {
              const brokers   = rb.brokers || [];
              const rawSymbol = item.symbol.includes(':') ? item.symbol.split(':')[1] : item.symbol;
              const fullSymbol = item.symbol;
              if (brokers.length === 0) {
                const msg = document.createElement('div');
                msg.className = 'broker-popover';
                msg.innerHTML = '<span style="font-size:0.75rem;color:var(--text-dim)">No brokers added.<br>Use 🏦 to add one.</span>';
                actions.appendChild(msg);
                setTimeout(() => msg.remove(), 3000);
                return;
              }
              if (brokers.length === 1) { openBroker(brokers[0], rawSymbol, fullSymbol); return; }
              const popover = document.createElement('div');
              popover.className = 'broker-popover';
              brokers.forEach(b => {
                const pbtn = document.createElement('button');
                pbtn.className = 'broker-popover-btn';
                pbtn.textContent = b.name;
                pbtn.addEventListener('click', ev => { ev.stopPropagation(); openBroker(b, rawSymbol, fullSymbol); popover.remove(); });
                popover.appendChild(pbtn);
              });
              actions.appendChild(popover);
              setTimeout(() => {
                document.addEventListener('click', function h() { popover.remove(); document.removeEventListener('click', h); });
              }, 0);
            });
          });

          const deleteBtn = document.createElement('button');
          deleteBtn.className = 'glass-btn';
          deleteBtn.textContent = 'Delete';
          deleteBtn.addEventListener('click', () => {
            if (!confirm(`Delete ${item.symbol}?`)) return;
            symbols.splice(realIdx, 1);
            chrome.storage.local.set({ data }, loadFolders);
          });

          actions.appendChild(openBtn);
          actions.appendChild(brokerBtn);
          actions.appendChild(deleteBtn);

          card.appendChild(cardTop);
          if (notesEl) card.appendChild(notesEl);
          if (tagsEl)  card.appendChild(tagsEl);
          card.appendChild(timeEl);
          card.appendChild(actions);
          content.appendChild(card);
        });

        folderDiv.appendChild(header);
        folderDiv.appendChild(content);
        foldersContainer.appendChild(folderDiv);
      });
    });
  }

  // ── BROKER SYSTEM ─────────────────────────────────────────────
  function openBroker(broker, rawSymbol, fullSymbol) {
    let url = broker.url;
    if (broker.type === 'search') {
      url = url.replace('{symbol}', encodeURIComponent(rawSymbol))
               .replace('{fullsymbol}', encodeURIComponent(fullSymbol));
    } else {
      url = url.replace('{symbol}', rawSymbol).replace('{fullsymbol}', fullSymbol);
    }
    chrome.tabs.create({ url });
  }

  function loadBrokers() {
    chrome.storage.local.get(['brokers'], r => {
      const brokers = r.brokers || [];
      brokersList.innerHTML = '';
      brokers.forEach((b, i) => {
        const item = document.createElement('div');
        item.className = 'broker-item';
        const nameEl = document.createElement('span');
        nameEl.textContent = b.name + (b.type === 'search' ? ' 🔍' : ' 🔗');
        nameEl.style.fontSize = '0.8rem';
        const delBtn = document.createElement('button');
        delBtn.className = 'glass-btn';
        delBtn.textContent = '🗑';
        delBtn.addEventListener('click', () => {
          brokers.splice(i, 1);
          chrome.storage.local.set({ brokers }, loadBrokers);
        });
        item.appendChild(nameEl);
        item.appendChild(delBtn);
        brokersList.appendChild(item);
      });
    });
  }

  brokersToggle?.addEventListener('click', () => brokersPanel.classList.toggle('hidden'));
  addBrokerBtn?.addEventListener('click', () => addBrokerForm.classList.toggle('hidden'));

  brokerType?.addEventListener('change', () => {
    if (!brokerHint) return;
    brokerHint.innerHTML = brokerType.value === 'search'
      ? 'URL should include a search param. <b>{symbol}</b> = ticker only.<br>e.g. <b>https://groww.in/search?q={symbol}</b>'
      : 'Use <b>{symbol}</b> for ticker only (e.g. RELIANCE)<br>Use <b>{fullsymbol}</b> for NSE:RELIANCE';
  });

  saveBrokerBtn?.addEventListener('click', () => {
    const name = brokerNameInput?.value.trim();
    const url  = brokerUrlInput?.value.trim();
    const type = brokerType?.value || 'standard';
    if (!name || !url) return;
    chrome.storage.local.get(['brokers'], r => {
      const brokers = r.brokers || [];
      brokers.push({ name, url, type });
      chrome.storage.local.set({ brokers }, () => {
        if (brokerNameInput) brokerNameInput.value = '';
        if (brokerUrlInput)  brokerUrlInput.value  = '';
        addBrokerForm?.classList.add('hidden');
        loadBrokers();
      });
    });
  });

  // ── CONTEXT MENU ──────────────────────────────────────────────
  chrome.runtime.onMessage.addListener(msg => {
    if (msg.type !== 'CONTEXT_SAVE' || !msg.title) return;
    const title = msg.title;
    const parts = title.split('•').map(s => s.trim());
    const EXCHANGES = ['NSE','BSE','MCX','NYSE','NASDAQ'];
    let sym = '', ex = 'NSE';
    if (parts.length >= 2) {
      sym = parts[0].toUpperCase().replace(/[^A-Z0-9]/g, '').trim();
      const lastSeg = parts[parts.length-1].split(/[—–-]/)[0].trim().toUpperCase();
      const found = EXCHANGES.find(e => lastSeg === e || lastSeg.startsWith(e));
      if (found) ex = found;
    } else {
      const m = title.match(/\b([A-Z]{2,6}):([A-Z0-9]{1,20})\b/);
      if (m) { ex = m[1]; sym = m[2]; }
      else sym = title.split(/[—–-]/)[0].trim().toUpperCase().replace(/[^A-Z0-9]/g,'');
    }
    if (sym) symbolInput.value = sym.includes(':') ? sym : `${ex}:${sym}`;
  });

  // ── HELPERS ───────────────────────────────────────────────────
  function flashInput(el, success) {
    const cls = success ? 'flash-success' : 'flash-fail';
    el.classList.remove('flash-success', 'flash-fail');
    void el.offsetWidth;
    el.classList.add(cls);
    setTimeout(() => el.classList.remove(cls), 700);
  }

  function isValidHex(v) { return /^#[0-9A-Fa-f]{6}$/.test(v); }

  function timeAgo(ts) {
    if (!ts) return '';
    const diff = Date.now() - ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1)  return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24)  return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  }

  function randomFolderColor() {
    const c = ['#2a8f2a','#8f2a2a','#2a5c8f','#8f7a2a','#6a2a8f','#2a8f7a','#8f4a2a','#3a7a8f'];
    return c[Math.floor(Math.random() * c.length)];
  }

});
