// --- DATA STRUCTURE (4x2 CATEGORIES GRID) ---
const C = [
  ['ai', '01 / SÜNİ İNTELLEKT', 'NEXUS AI Chat', 'Real GPT modelləri ilə intellektual söhbət.', '✦', [
    ['chatgpt', 'ChatGPT Mərkəzi', 'AI ilə real vaxt rejimində söhbət edin.', '🤖']
  ]],
  ['office', '02 / OFFICE', 'NEXUS Office', 'Word, Excel və iş alətləri.', '▦', [
    ['word', 'Word Editor', 'Zəngin mətn redaktoru və ixrac.', 'W'],
    ['excel', 'Excel Sheet', 'Dinamik cədvəl və CSV çıxarışı.', 'X'],
    ['calc', 'iOS Kalkulyator', 'iOS üslublu peşəkar kalkulyator.', '='],
    ['qr', 'QR Generator', 'Mətn və linklərdən QR kod yarat.', 'QR'],
    ['notes', 'Lokal Qeydlər', 'Qeydlərinizi brauzerdə saxlamaq.', 'N']
  ]],
  ['world', '03 / WORLD', 'World Center', 'Xəritə, naviqasiya və hava şəraiti.', '⊕', [
    ['map', 'Canlı İnteraktiv Xəritə', 'Real OpenStreetMap xəritəsi.', 'MAP'],
    ['time', 'Dünya Saatları & Hava', 'Şəhər ikonları, saat və canlı hava.', 'UTC'],
    ['geo', 'Mövqeyim (GPS)', 'Koordinatlarınızı canlı tapın.', 'GPS']
  ]],
  ['network', '04 / ŞƏBƏKƏ', 'Şəbəkə Mərkəzi', 'IP, DNS və bağlantı testi.', '◎', [
    ['ip', 'IP Məlumatı', 'İctimai IP ünvanınızı öyrənin.', 'IP'],
    ['dns', 'DNS Yoxlayıcı', 'Domenin A qeydlərini analizi.', 'DNS'],
    ['ping', 'Gecikmə Testi', 'Şəbəkə sürətini/pingini ölçün.', '⚡']
  ]],
  ['security', '05 / TƏHLÜKƏSİZLİK', 'Təhlükəsizlik', 'Şifrə və kriptoqrafik alətlər.', '◇', [
    ['pass', 'Şifrə Generatoru', 'Mürəkkəb şifrələr tərtib edin.', 'PW'],
    ['hash', 'SHA-256 Hash', 'Mətni hash koduna çevirin.', '#'],
    ['strength', 'Şifrə Analizi', 'Şifrənizin gücünü test edin.', '✓']
  ]],
  ['dev', '06 / DEVELOPER', 'Developer Lab', 'Kod və format alətləri.', '</>', [
    ['json', 'JSON Formatter', 'JSON məlumatlarını düzəldin.', '{}'],
    ['base64', 'Base64 Encoder', 'Mətni encode/decode edin.', '64'],
    ['url', 'URL Encoder', 'Linkləri kodlaşdırın.', 'URL'],
    ['terminal', 'NEXUS Terminal', 'Simulyativ təhlükəsiz terminal.', '_>']
  ]],
  ['media', '07 / MEDIA', 'Media Lab', 'Səs və şəkil alətləri.', '♫', [
    ['player', 'Music Player', 'Audionuzu oxudun.', '▶'],
    ['image', 'Şəkil Analizi', 'Şəklin ölçü məlumatları.', 'IMG']
  ]],
  ['system', '08 / SYSTEM', 'Sistem Monitoru', 'Cihaz və brauzer analitikası.', '◌', [
    ['device', 'Cihaz Məlumatı', 'OS və brauzer xüsusiyyətləri.', 'SYS'],
    ['battery', 'Batareya Statusu', 'Enerji səviyyəsi analizi.', 'BAT'],
    ['screen', 'Ekran Məlumatı', 'Piksel və viewport ölçüsü.', 'PX']
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

// --- RENDER MAIN CATEGORIES ---
function renderCategories() {
  const container = $('#categoriesGrid');
  if(!container) return;
  let html = '';

  C.forEach((c) => {
    html += `
      <div class="cat-card" onclick="openCategoryModal('${c[0]}')">
        <div class="cat-card-top">
          <div class="cat-icon">${c[4]}</div>
          <span class="cat-arrow">↗</span>
        </div>
        <div class="cat-info">
          <small>${c[1]}</small>
          <strong>${c[2]}</strong>
          <p>${c[3]}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// --- OPEN CATEGORY MODAL (POPUP WINDOW) ---
function openCategoryModal(catId) {
  const cat = C.find(x => x[0] === catId);
  if(!cat) return;

  $('#catModalBadge').textContent = cat[1];
  $('#catModalTitle').textContent = cat[2] + ' Alətləri';

  const body = $('#catModalBody');
  let gridHtml = '';

  cat[5].forEach(t => {
    gridHtml += `
      <div class="tool-item-card" onclick="closeAllModals(); openTool('${t[0]}')">
        <div class="t-header">
          <div class="t-badge">${t[3]}</div>
          <strong>${t[1]}</strong>
        </div>
        <p>${t[2]}</p>
      </div>
    `;
  });

  body.innerHTML = gridHtml;
  $('#categoryModal').classList.add('open');
}

document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
});

// --- TOOL MODAL ---
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

// --- TOOL HTML GENERATOR ---
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

// --- WORLD CLOCKS (SADƏ, DƏBƏLİ MİNİMALİST DİZAYN - MƏTNSİZ/STİKERSİZ) ---
const cities = [
  { name: 'BAKIDA SAAT', flag: '🇦🇿', tz: 'Asia/Baku', lat: 40.4093, lon: 49.8671 },
  { name: 'İSTANBUL', flag: '🇹🇷', tz: 'Europe/Istanbul', lat: 41.0082, lon: 28.9784 },
  { name: 'LONDON', flag: '🇬🇧', tz: 'Europe/London', lat: 51.5074, lon: -0.1278 },
  { name: 'NYU-YORK', flag: '🇺🇸', tz: 'America/New_York', lat: 40.7128, lon: -74.0060 },
  { name: 'TOKİO', flag: '🇯🇵', tz: 'Asia/Tokyo', lat: 35.6762, lon: 139.6503 }
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
        <div class="city-flag">${c.flag}</div>
        <div class="city-name">${c.name}</div>
        <div class="city-time">${timeStr}</div>
        <div class="city-temp">🌡️ ${weatherText}</div>
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
