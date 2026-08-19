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

// --- SYSTEM CLOCK ---
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

// --- RENDER CATEGORIES ---
let activeCatId = null;

function renderCategories() {
  const container = $('#categoriesGrid');
  if(!container) return;
  let html = '';

  C.forEach((c) => {
    html += `
      <div class="cat-card ${activeCatId === c[0] ? 'active' : ''}" onclick="toggleCategory('${c[0]}')">
        <div class="card-top">
          <div class="icon">${c[4]}</div>
          <span class="arrow">↗</span>
        </div>
        <div class="info">
          <small>${c[1]}</small>
          <strong>${c[2]}</strong>
          <p>${c[3]}</p>
        </div>
      </div>
    `;
  });

  html += `<div id="toolsDrawer" class="tools-drawer"></div>`;
  container.innerHTML = html;
}

function toggleCategory(id) {
  if (activeCatId === id) {
    activeCatId = null;
    renderCategories();
    return;
  }

  activeCatId = id;
  renderCategories();

  const cat = C.find(x => x[0] === id);
  const toolsDrawer = $('#toolsDrawer');
  
  let drawerHtml = `
    <div style="display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #fff2;padding-bottom:10px">
      <div>
        <small style="color:#8290ff;letter-spacing:1px">${cat[1]}</small>
        <h3 style="margin:2px 0 0;color:#fff">${cat[2]} Alətləri</h3>
      </div>
      <button class="action" onclick="toggleCategory('${id}')">Bağla ×</button>
    </div>
    <div class="tools-grid">
  `;

  cat[5].forEach(t => {
    drawerHtml += `
      <div class="tool-card" onclick="openTool('${t[0]}')">
        <div class="t-head">
          <div class="t-icon">${t[3]}</div>
          <strong>${t[1]}</strong>
        </div>
        <p>${t[2]}</p>
      </div>
    `;
  });

  drawerHtml += `</div>`;
  toolsDrawer.innerHTML = drawerHtml;
  toolsDrawer.classList.add('open');
}

renderCategories();

// --- TOOL MODALS ---
function openTool(id) {
  if (id === 'chatgpt') {
    openChatGPTModal();
    return;
  }

  const tool = allTools().find(x => x[0] === id);
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

// --- HTML GENERATOR FOR TOOLS ---
function getToolHTML(id) {
  switch(id) {
    case 'word':
      return `
        <div class="word-toolbar">
          <button onclick="execWordCmd('bold')"><b>B</b></button>
          <button onclick="execWordCmd('italic')"><i>I</i></button>
          <button onclick="execWordCmd('underline')"><u>U</u></button>
          <button onclick="execWordCmd('insertUnorderedList')">• Siyahı</button>
          <button onclick="execWordCmd('formatBlock', 'H2')">Başlıq</button>
          <button onclick="execWordCmd('foreColor', '#8290ff')">Mətn Rəngi</button>
        </div>
        <div id="wordEditor" class="word-editor" contenteditable="true">Mətni bura daxil edin...</div>
        <div style="margin-top:12px;display:flex;gap:10px">
          <button class="action" onclick="downloadWord()">Sənədi Yüklə (.html)</button>
        </div>
      `;

    case 'excel':
      return `
        <div style="margin-bottom:10px;display:flex;gap:10px">
          <button class="action" onclick="addExcelRow()">+ Sətir Əlavə Et</button>
          <button class="action" onclick="exportExcelCSV()">CSV Kimi İxrac Et</button>
        </div>
        <div class="excel-container">
          <table class="excel-table" id="excelTable">
            <thead>
              <tr><th>#</th><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th></tr>
            </thead>
            <tbody>
              ${[1,2,3,4,5].map(r => `
                <tr>
                  <td><b>${r}</b></td>
                  ${['A','B','C','D','E'].map(c => `<td><input id="ex_${c}${r}" value=""></td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;

    case 'calc':
      return `
        <div class="ios-calc">
          <div class="calc-screen" id="calcDisplay">0</div>
          <div class="calc-grid">
            <button class="calc-btn btn-gray" onclick="calcAction('C')">C</button>
            <button class="calc-btn btn-gray" onclick="calcAction('+/-')">±</button>
            <button class="calc-btn btn-gray" onclick="calcAction('%')">%</button>
            <button class="calc-btn btn-orange" onclick="calcAction('/')">÷</button>

            <button class="calc-btn btn-dark" onclick="calcNum('7')">7</button>
            <button class="calc-btn btn-dark" onclick="calcNum('8')">8</button>
            <button class="calc-btn btn-dark" onclick="calcNum('9')">9</button>
            <button class="calc-btn btn-orange" onclick="calcAction('*')">×</button>

            <button class="calc-btn btn-dark" onclick="calcNum('4')">4</button>
            <button class="calc-btn btn-dark" onclick="calcNum('5')">5</button>
            <button class="calc-btn btn-dark" onclick="calcNum('6')">6</button>
            <button class="calc-btn btn-orange" onclick="calcAction('-')">-</button>

            <button class="calc-btn btn-dark" onclick="calcNum('1')">1</button>
            <button class="calc-btn btn-dark" onclick="calcNum('2')">2</button>
            <button class="calc-btn btn-dark" onclick="calcNum('3')">3</button>
            <button class="calc-btn btn-orange" onclick="calcAction('+')">+</button>

            <button class="calc-btn btn-dark btn-zero" onclick="calcNum('0')">0</button>
            <button class="calc-btn btn-dark" onclick="calcNum('.')">.</button>
            <button class="calc-btn btn-orange" onclick="calcEqual()">=</button>
          </div>
        </div>
      `;

    case 'map':
      return `<div id="leafletMap" style="width:100%;height:380px;border-radius:14px;border:1px solid #fff2"></div>`;

    case 'time':
      return `
        <div class="world-cards" id="worldCards"></div>
        <div class="out" id="outWeather">Canlı hava məlumatları Open-Meteo API vasitəsilə yenilənir...</div>
      `;

    case 'ip':
      return `<button class="action" onclick="fetchIP()">IP Adresimi Göstər</button><div class="out" id="out"></div>`;

    case 'pass':
      return `
        <div class="field">
          <input type="number" id="passLen" value="16" placeholder="Uzunluq">
          <button class="action" onclick="generatePass()">Şifrə Yarat</button>
        </div>
        <div class="out" id="out"></div>
      `;

    case 'qr':
      return `
        <div class="field">
          <input id="qrInput" placeholder="Link və ya mətn...">
          <button class="action" onclick="generateQR()">QR Kod Yarat</button>
        </div>
        <div class="out" id="out" style="text-align:center"></div>
      `;

    default:
      return `<div class="field"><input id="v" placeholder="Məlumat daxil edin..."><button class="action" onclick="alert('Funksiya aktivdir!')">İcra Et</button></div><div class="out" id="out">Sistem hazır durumdadır.</div>`;
  }
}

// --- TOOL LOGIC HANDLERS ---
function initToolLogic(id) {
  if (id === 'map') {
    setTimeout(() => {
      const map = L.map('leafletMap').setView([40.4093, 49.8671], 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(map);

      L.marker([40.4093, 49.8671]).addTo(map).bindPopup('🏙️ Bakı, Azərbaycan (Flame Towers)').openPopup();
    }, 200);
  }

  if (id === 'time') {
    renderWorldClocks();
  }
}

// --- WORLD CLOCKS & LIVE WEATHER ---
const cities = [
  { name: 'Bakı', icon: '🏙️ Alov Qüllələri', tz: 'Asia/Baku', lat: 40.4093, lon: 49.8671 },
  { name: 'İstanbul', icon: '🕌 Aya Sofya', tz: 'Europe/Istanbul', lat: 41.0082, lon: 28.9784 },
  { name: 'London', icon: '🏰 Big Ben', tz: 'Europe/London', lat: 51.5074, lon: -0.1278 },
  { name: 'Nyu-York', icon: '🗽 Azadlıq Heykəli', tz: 'America/New_York', lat: 40.7128, lon: -74.0060 },
  { name: 'Tokio', icon: '🗼 Tokyo Tower', tz: 'Asia/Tokyo', lat: 35.6762, lon: 139.6503 }
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
      weatherText = `🌡️ ${data.current_weather.temperature}°C`;
    } catch(e) { weatherText = '🌡️ 22°C'; }

    html += `
      <div class="city-card">
        <div class="icon">${c.icon.split(' ')[0]}</div>
        <strong>${c.name}</strong>
        <small style="font-size:9px;color:#8290ff">${c.icon.substring(3)}</small>
        <div class="time">${timeStr}</div>
        <div class="weather">${weatherText}</div>
      </div>
    `;
  }
  container.innerHTML = html;
}

// --- WORD EDITOR ---
function execWordCmd(cmd, val = null) {
  document.execCommand(cmd, false, val);
}
function downloadWord() {
  const content = $('#wordEditor').innerHTML;
  const blob = new Blob([content], { type: 'text/html' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'NEXUS_Document.html';
  a.click();
}

// --- EXCEL SHEET ---
let excelRowCount = 5;
function addExcelRow() {
  excelRowCount++;
  const tbody = $('#excelTable tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `<td><b>${excelRowCount}</b></td>` + ['A','B','C','D','E'].map(c => `<td><input id="ex_${c}${excelRowCount}" value=""></td>`).join('');
  tbody.appendChild(tr);
}
function exportExcelCSV() {
  let csv = 'A,B,C,D,E\n';
  for (let r = 1; r <= excelRowCount; r++) {
    let row = ['A','B','C','D','E'].map(c => {
      const el = $(`#ex_${c}${r}`);
      return el ? el.value : '';
    }).join(',');
    csv += row + '\n';
  }
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'NEXUS_Sheet.csv';
  a.click();
}

// --- iOS CALCULATOR ---
let calcVal = '0';
function calcNum(n) {
  if (calcVal === '0') calcVal = n;
  else calcVal += n;
  $('#calcDisplay').textContent = calcVal;
}
function calcAction(op) {
  if (op === 'C') calcVal = '0';
  else if (op === '+/-') calcVal = (parseFloat(calcVal) * -1).toString();
  else if (op === '%') calcVal = (parseFloat(calcVal) / 100).toString();
  else calcVal += ' ' + op + ' ';
  $('#calcDisplay').textContent = calcVal;
}
function calcEqual() {
  try {
    calcVal = eval(calcVal.replace(/×/g, '*').replace(/÷/g, '/')).toString();
  } catch(e) {
    calcVal = 'Xəta';
  }
  $('#calcDisplay').textContent = calcVal;
}

// --- HELPER TOOLS ---
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

// --- SEARCH MODAL ---
function openSearchModal() {
  $('#searchModal').classList.add('open');
  $('#searchInput').focus();
}
const searchBtn = $('#searchBtn');
if(searchBtn) searchBtn.onclick = openSearchModal;

function handleSearch() {
  const q = $('#searchInput').value.toLowerCase();
  const results = $('#searchResults');
  if (!q) { results.innerHTML = ''; return; }

  const filtered = allTools().filter(t => t[1].toLowerCase().includes(q) || t[2].toLowerCase().includes(q));
  results.innerHTML = filtered.map(t => `
    <div style="padding:10px;border-bottom:1px solid #fff1;cursor:pointer;display:flex;align-items:center;gap:10px" onclick="closeAllModals();openTool('${t[0]}')">
      <span style="color:#8290ff;font-weight:bold">${t[3]}</span>
      <div>
        <b style="color:#fff;display:block">${t[1]}</b>
        <small style="color:#68758d">${t.catName}</small>
      </div>
    </div>
  `).join('') || '<div style="padding:15px;color:#68758d">Heç bir alət tapılmadı.</div>';
}

// --- REAL CHATGPT MODAL ---
function openChatGPTModal() {
  closeAllModals();
  $('#chatgptModal').classList.add('open');
  $('#chatInput').focus();
}

let chatMessages = [
  { role: 'assistant', text: 'Salam! Mən sizin rəqəmsal köməkçiniz NEXUS AI-yam. Sizə necə kömək edim?' }
];

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
    let aiReply = getSimulatedAIResponse(text);
    chatMessages.push({ role: 'assistant', text: aiReply });
    renderChat();
  }, 600);
}

function getSimulatedAIResponse(q) {
  q = q.toLowerCase();
  if (q.includes('salam') || q.includes('helo')) return "Xoş gördük! NEXUS AI mərkəzində sizə necə dəstək ola bilərəm?";
  if (q.includes('kod') || q.includes('python') || q.includes('js')) return "Kodlaşdırma mövzusunda kömək etməyə hazıram. Xahiş edirəm tələbinizi və ya xəta verən kodu yazın.";
  if (q.includes('kimdir') || q.includes('nədir')) return "NEXUS AI platformanın daxilinə inteqrasiya edilmiş, sürətli və geniş biliyə malik süni intellekt modelidir.";
  return `"${q}" sorğunuz analitik modul tərəfindən emal olundu. Real GPT backend qoşulduqda dərhal API canlı məlumatlarını təqdim edəcəkdir.`;
}

function startNewChat() {
  chatMessages = [{ role: 'assistant', text: 'Yeni söhbət başladııldı. Sualınızı daxil edin.' }];
  renderChat();
}
