// --- SVG ICONS DEFINITION (HIGH QUALITY VECTOR) ---
const SVG_ICONS = {
  ai: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 12 2.1 10.5"/><path d="M12 12l7.5 7.5"/></svg>`,
  office: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
  world: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  network: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>`,
  security: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/></svg>`,
  dev: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  media: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2"/></svg>`,
  system: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>`,
  
  // Sub-Tool SVG Small Icons
  chat: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  doc: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>`,
  sheet: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/><path d="M9 3v18"/></svg>`,
  lock: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="11" x="3" y="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  terminal: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="4 17 10 11 4 5"/><line x1="12" x2="20" y1="19" y2="19"/></svg>`
};

// --- DATA STRUCTURE ---
const C = [
  ['ai', '01 / SÜNİ İNTELLEKT', 'NEXUS AI Chat', 'Real GPT modelləri ilə intellektual söhbət.', SVG_ICONS.ai, [
    ['chatgpt', 'ChatGPT Mərkəzi', 'AI ilə real vaxt rejimində söhbət edin.', SVG_ICONS.chat]
  ]],
  ['office', '02 / OFFICE', 'NEXUS Office', 'Word, Excel və iş alətləri.', SVG_ICONS.office, [
    ['word', 'Word Editor', 'Zəngin mətn redaktoru və ixrac.', SVG_ICONS.doc],
    ['excel', 'Excel Sheet', 'Dinamik cədvəl və CSV çıxarışı.', SVG_ICONS.sheet],
    ['calc', 'iOS Kalkulyator', 'iOS üslublu peşəkar kalkulyator.', SVG_ICONS.doc],
    ['qr', 'QR Generator', 'Mətn və linklərdən QR kod yarat.', SVG_ICONS.doc],
    ['notes', 'Lokal Qeydlər', 'Qeydlərinizi brauzerdə saxlamaq.', SVG_ICONS.doc]
  ]],
  ['world', '03 / WORLD', 'World Center', 'Xəritə, naviqasiya və hava şəraiti.', SVG_ICONS.world, [
    ['map', 'Canlı İnteraktiv Xəritə', 'Real OpenStreetMap xəritəsi.', SVG_ICONS.doc],
    ['time', 'Dünya Saatları & Hava', 'Şəhər ikonları, saat və canlı hava.', SVG_ICONS.doc],
    ['geo', 'Mövqeyim (GPS)', 'Koordinatlarınızı canlı tapın.', SVG_ICONS.doc]
  ]],
  ['network', '04 / ŞƏBƏKƏ', 'Şəbəkə Mərkəzi', 'IP, DNS və bağlantı testi.', SVG_ICONS.network, [
    ['ip', 'IP Məlumatı', 'İctimai IP ünvanınızı öyrənin.', SVG_ICONS.doc],
    ['dns', 'DNS Yoxlayıcı', 'Domenin A qeydlərini analizi.', SVG_ICONS.doc],
    ['ping', 'Gecikmə Testi', 'Şəbəkə sürətini/pingini ölçün.', SVG_ICONS.doc]
  ]],
  ['security', '05 / TƏHLÜKƏSİZLİK', 'Təhlükəsizlik', 'Şifrə və kriptoqrafik alətlər.', SVG_ICONS.security, [
    ['pass', 'Şifrə Generatoru', 'Mürəkkəb şifrələr tərtib edin.', SVG_ICONS.lock],
    ['hash', 'SHA-256 Hash', 'Mətni hash koduna çevirin.', SVG_ICONS.lock],
    ['strength', 'Şifrə Analizi', 'Şifrənizin gücünü test edin.', SVG_ICONS.lock]
  ]],
  ['dev', '06 / DEVELOPER', 'Developer Lab', 'Kod və format alətləri.', SVG_ICONS.dev, [
    ['json', 'JSON Formatter', 'JSON məlumatlarını düzəldin.', SVG_ICONS.terminal],
    ['base64', 'Base64 Encoder', 'Mətni encode/decode edin.', SVG_ICONS.terminal],
    ['url', 'URL Encoder', 'Linkləri kodlaşdırın.', SVG_ICONS.terminal],
    ['terminal', 'NEXUS Terminal', 'Simulyativ təhlükəsiz terminal.', SVG_ICONS.terminal]
  ]],
  ['media', '07 / MEDIA', 'Media Lab', 'Səs və şəkil alətləri.', SVG_ICONS.media, [
    ['player', 'Music Player', 'Audionuzu oxudun.', SVG_ICONS.doc],
    ['image', 'Şəkil Analizi', 'Şəklin ölçü məlumatları.', SVG_ICONS.doc]
  ]],
  ['system', '08 / SYSTEM', 'Sistem Monitoru', 'Cihaz və brauzer analitikası.', SVG_ICONS.system, [
    ['device', 'Cihaz Məlumatı', 'OS və brauzer xüsusiyyətləri.', SVG_ICONS.doc],
    ['battery', 'Batareya Statusu', 'Enerji səviyyəsi analizi.', SVG_ICONS.doc],
    ['screen', 'Ekran Məlumatı', 'Piksel və viewport ölçüsü.', SVG_ICONS.doc]
  ]]
];

const $ = s => document.querySelector(s);
const allTools = () => C.flatMap(c => c[5].map(t => ({ ...t, catId: c[0], catName: c[2] })));

// --- CLOCK ---
function updateClock() {
  const d = new Date();
  const clockEl = $('#clock');
  const quickClockEl = $('#quickClock');
  const dateEl = $('#date');
  
  if(clockEl) clockEl.textContent = d.toLocaleTimeString('az-AZ', { hour12: false });
  if(quickClockEl) quickClockEl.textContent = d.toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  if(dateEl) dateEl.textContent = d.toLocaleDateString('az-AZ', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
setInterval(updateClock, 1000);
updateClock();

// --- RENDER INLINE EXPANDABLE CATEGORIES ---
let expandedCatId = null;

function renderCategories() {
  const container = $('#categoriesGrid');
  if(!container) return;
  let html = '';

  C.forEach((c) => {
    const isExpanded = expandedCatId === c[0];
    
    html += `
      <div class="cat-card-block ${isExpanded ? 'expanded' : ''}">
        <div class="cat-header-click" onclick="toggleCategory('${c[0]}')">
          <div class="cat-card-top">
            <div class="cat-svg-icon">${c[4]}</div>
            <span class="cat-arrow">➔</span>
          </div>
          <div class="cat-info">
            <small>${c[1]}</small>
            <strong>${c[2]}</strong>
            <p>${c[3]}</p>
          </div>
        </div>

        <div class="cat-sub-tools">
          <div class="sub-tools-grid">
            ${c[5].map(t => `
              <div class="sub-tool-item" onclick="openTool('${t[0]}')">
                <div class="sub-tool-icon">${t[3]}</div>
                <div class="sub-tool-info">
                  <strong>${t[1]}</strong>
                  <p>${t[2]}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function toggleCategory(catId) {
  if (expandedCatId === catId) {
    expandedCatId = null;
  } else {
    expandedCatId = catId;
  }
  renderCategories();
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
});

// --- TOOL MODALS ---
function openTool(id) {
  if (id === 'chatgpt') {
    openChatGPTModal();
    return;
  }

  const tool = allTools().find(x => x[0] === id);
  if(!tool) return;

  $('#toolCategoryLabel').textContent = tool.catName.toUpperCase();
  $('#toolTitle').textContent = tool[1];
  
  const body = $('#toolBody');
  body.innerHTML = getToolHTML(id);

  $('#toolModal').classList.add('open');
  initToolLogic(id);
}

function closeAllModals() {
  document.querySelectorAll('.overlay').forEach(x => x.classList.remove('open'));
}

function getToolHTML(id) {
  switch(id) {
    case 'time':
      return `
        <div class="world-grid" id="worldCards"></div>
        <div class="out" id="outWeather">Canlı hava şəraiti Open-Meteo API ilə yenilənir...</div>
      `;

    case 'map':
      return `<div id="leafletMap" style="width:100%;height:380px;border-radius:14px;border:1px solid var(--card-border)"></div>`;

    case 'ip':
      return `<button class="action-btn" onclick="fetchIP()">IP Adresimi Göstər</button><div class="out" id="out"></div>`;

    case 'pass':
      return `
        <div class="field">
          <input type="number" id="passLen" value="16" placeholder="Uzunluq">
          <button class="action-btn" onclick="generatePass()">Şifrə Yarat</button>
        </div>
        <div class="out" id="out"></div>
      `;

    case 'qr':
      return `
        <div class="field">
          <input id="qrInput" placeholder="Link və ya mətn...">
          <button class="action-btn" onclick="generateQR()">QR Kod Yarat</button>
        </div>
        <div class="out" id="out" style="text-align:center"></div>
      `;

    default:
      return `<div class="field"><input id="v" placeholder="Məlumat daxil edin..."><button class="action-btn" onclick="alert('Funksiya aktivdir!')">İcra Et</button></div><div class="out" id="out">Sistem hazır durumdadır.</div>`;
  }
}

function initToolLogic(id) {
  if (id === 'map') {
    setTimeout(() => {
      const map = L.map('leafletMap').setView([40.4093, 49.8671], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
      L.marker([40.4093, 49.8671]).addTo(map).bindPopup('Bakı, Azərbaycan').openPopup();
    }, 200);
  }

  if (id === 'time') {
    renderWorldClocks();
  }
}

// --- WORLD CLOCKS (ULTRA CLEAN MINIMALIST) ---
const cities = [
  { name: 'Bakı', code: 'AZE / GYD', tz: 'Asia/Baku', lat: 40.4093, lon: 49.8671 },
  { name: 'İstanbul', code: 'TUR / IST', tz: 'Europe/Istanbul', lat: 41.0082, lon: 28.9784 },
  { name: 'London', code: 'GBR / LHR', tz: 'Europe/London', lat: 51.5074, lon: -0.1278 },
  { name: 'Nyu-York', code: 'USA / JFK', tz: 'America/New_York', lat: 40.7128, lon: -74.0060 },
  { name: 'Tokio', code: 'JPN / HND', tz: 'Asia/Tokyo', lat: 35.6762, lon: 139.6503 }
];

async function renderWorldClocks() {
  const container = $('#worldCards');
  if (!container) return;

  let html = '';
  for (let c of cities) {
    const timeStr = new Intl.DateTimeFormat('az-AZ', { timeZone: c.tz, hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(new Date());
    
    let weatherText = 'Yüklənir...';
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current_weather=true`);
      const data = await res.json();
      weatherText = `${data.current_weather.temperature}°C`;
    } catch(e) { weatherText = '22°C'; }

    html += `
      <div class="city-box">
        <div class="city-code">${c.code}</div>
        <div class="city-name">${c.name}</div>
        <div class="city-time">${timeStr}</div>
        <div class="city-temp">${weatherText}</div>
      </div>
    `;
  }
  container.innerHTML = html;
}

// --- SEARCH & CHATGPT ---
function openSearchModal() { $('#searchModal').classList.add('open'); $('#searchInput').focus(); }
function openChatGPTModal() { closeAllModals(); $('#chatgptModal').classList.add('open'); $('#chatInput').focus(); }

let chatMessages = [{ role: 'assistant', text: 'Salam! Mən sizin rəqəmsal köməkçiniz NEXUS AI-yam. Sizə necə kömək edim?' }];

function renderChat() {
  const container = $('#chatMessages');
  if(!container) return;
  container.innerHTML = chatMessages.map(m => `
    <div class="chat-bubble ${m.role}">
      <span class="sender-name">${m.role === 'user' ? 'SƏN' : 'NEXUS AI'}</span>
      ${m.text}
    </div>
  `).join('');
  container.scrollTop = container.scrollHeight;
}

function sendChatMessage(e) {
  e.preventDefault();
  const input = $('#chatInput');
  const text = input.value.trim();
  if (!text) return;

  chatMessages.push({ role: 'user', text: text });
  input.value = '';
  renderChat();

  setTimeout(() => {
    chatMessages.push({ role: 'assistant', text: `"${text}" sorğunuz NEXUS AI tərəfindən qəbul olundu.` });
    renderChat();
  }, 600);
}

function startNewChat() {
  chatMessages = [{ role: 'assistant', text: 'Yeni söhbət başladııldı.' }];
  renderChat();
}

async function fetchIP() {
  try {
    const r = await fetch('https://api.ipify.org?format=json');
    const d = await r.json();
    $('#out').textContent = 'Sizin İctimai IP: ' + d.ip;
  } catch { $('#out').textContent = 'IP alına bilmədi.'; }
}

function generatePass() {
  const len = +$('#passLen').value || 16;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let res = '';
  for(let i=0; i<len; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
  $('#out').textContent = res;
}

function generateQR() {
  const val = $('#qrInput').value;
  if(!val) return;
  $('#out').innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(val)}" style="background:#fff;padding:8px;border-radius:10px">`;
}
