(function () {
  const pagePrefix = window.location.pathname.includes('/pages/') ? '' : 'pages/';
  const searchModal = document.getElementById('searchModal');
  const searchIconButton = document.getElementById('searchIconBtn');
  const closeSearchButton = document.getElementById('closeSearchBtn');
  const searchInput = document.getElementById('searchInput');
  const resultsBox = document.getElementById('searchDropdownResults');
  const searchSubmitIcon = searchInput && searchInput.parentElement.querySelector('svg');

  if (!searchModal || !searchIconButton || !closeSearchButton || !searchInput || !resultsBox) return;

  const categories = [
    { href: `${pagePrefix}parti.html`, label: 'Parti Serisi ve Işık Şovları', icon: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>' },
    { href: `${pagePrefix}catalog.html`, label: 'Taşınabilir Hoparlörler (GO, Pulse, BoomBox)', icon: '<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v1a7 7 0 0 1-14 0v-1"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>' },
    { href: `${pagePrefix}kulakliklar.html`, label: 'Kulak Üstü & Kablosuz TWS Kulaklıklar', icon: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>' },
    { href: `${pagePrefix}oyun.html`, label: 'Oyun & Yayın Ekipmanları (Quantum Kulaklıklar)', icon: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 12h4m-2-2v4M15 11h.01M18 13h.01"/>' }
  ];

  function renderPopularCategories() {
    resultsBox.innerHTML = `<div style="font-size: 0.8rem; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 5px;">Popüler Kategoriler & Aramalar</div>${categories.map((category) => `<a href="${category.href}" style="display: flex; align-items: center; justify-content: space-between; padding: 10px 12px; background: #f9f9f9; border-radius: 4px; text-decoration: none; color: #111; font-weight: 600; font-size: 0.95rem; transition: background 0.2s;"><span style="display: flex; align-items: center; gap: 10px;"><svg style="width: 18px; height: 18px; stroke: #ff5900; fill: none; stroke-width: 2;" viewBox="0 0 24 24">${category.icon}</svg>${category.label}</span><span style="font-size: 0.8rem; color: #ff5900; font-weight: bold;">Git →</span></a>`).join('')}`;
  }

  function getSearchTarget(value) {
    const query = value.toLocaleLowerCase('tr-TR').trim();

    if (['iade', 'garanti', 'bozuldu', 'tamir', 'arızalı'].some((keyword) => query.includes(keyword))) {
      return `${pagePrefix}garanti.html`;
    }

    if (['kargo', 'teslimat', 'sipariş'].some((keyword) => query.includes(keyword))) {
      return `${pagePrefix}contact.html`;
    }

    return `${pagePrefix}catalog.html`;
  }

  searchIconButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (searchInput.value.trim()) {
      window.location.href = getSearchTarget(searchInput.value);
      return;
    }
    searchModal.style.display = 'flex';
    window.setTimeout(() => searchInput.focus(), 100);
  });

  closeSearchButton.addEventListener('click', () => { searchModal.style.display = 'none'; });
  window.addEventListener('click', (event) => { if (event.target === searchModal) searchModal.style.display = 'none'; });

  searchInput.addEventListener('input', function () {
    const value = this.value.trim();
    if (!value) { renderPopularCategories(); return; }
    const target = { href: getSearchTarget(value), label: 'Arama sonuçlarını görüntüle' };
    resultsBox.innerHTML = `<div style="font-size: 0.8rem; font-weight: 700; color: #888; text-transform: uppercase; margin-bottom: 5px;">Arama Sonucu</div><a href="${target.href}" style="display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; background: #fff3ec; border: 1px solid #ff5900; border-radius: 4px; text-decoration: none; color: #111; font-weight: 700; font-size: 1rem;"><span>🔍 "${this.value}" için sonuç: ${target.label}</span><span style="color: #ff5900; font-size: 0.85rem;">Git →</span></a>`;
  });

  searchInput.addEventListener('keypress', function (event) {
    if (event.key !== 'Enter') return;
    window.location.href = getSearchTarget(this.value);
  });

  if (searchSubmitIcon) {
    searchSubmitIcon.style.cursor = 'pointer';
    searchSubmitIcon.addEventListener('click', () => {
      window.location.href = getSearchTarget(searchInput.value);
    });
  }

  renderPopularCategories();
})();
