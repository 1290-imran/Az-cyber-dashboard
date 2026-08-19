/* =========================================================
   NEXUS // AZ 4.1
   MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector) =>
    document.querySelector(selector);

const $$ = (selector) =>
    document.querySelectorAll(selector);


/* =========================================================
   DATA
========================================================= */

const categories = [

    {
        id: "network",
        name: "Şəbəkə",
        desc: "İnternet və bağlantı",
        icon: "⌁"
    },

    {
        id: "security",
        name: "Təhlükəsizlik",
        desc: "Məxfilik və qoruma",
        icon: "◈"
    },

    {
        id: "developer",
        name: "Developer",
        desc: "Kod və proqramlaşdırma",
        icon: "</>"
    },

    {
        id: "world",
        name: "Dünya",
        desc: "Ölkələr və saatlar",
        icon: "◎"
    },

    {
        id: "office",
        name: "Office",
        desc: "Word və Excel",
        icon: "▦"
    },

    {
        id: "media",
        name: "Media",
        desc: "Musiqi və fayllar",
        icon: "▶"
    },

    {
        id: "tools",
        name: "Alətlər",
        desc: "Gündəlik alətlər",
        icon: "⌘"
    },

    {
        id: "ai",
        name: "Süni intellekt",
        desc: "NEXUS AI",
        icon: "✦"
    }

];


/* =========================================================
   TOOLS
========================================================= */

const tools = [

    /* NETWORK */

    {
        id: "speed",
        category: "network",
        name: "Speed Test",
        desc: "İnternet bağlantının sürətini yoxla.",
        icon: "↯"
    },

    {
        id: "ip",
        category: "network",
        name: "IP məlumatı",
        desc: "İctimai IP ünvanını və bağlantı məlumatlarını göstər.",
        icon: "IP"
    },

    {
        id: "dns",
        category: "network",
        name: "DNS yoxlayıcı",
        desc: "DNS bağlantısını və cavab müddətini yoxla.",
        icon: "DNS"
    },

    {
        id: "ping",
        category: "network",
        name: "Ping",
        desc: "Şəbəkə cavab müddətini ölç.",
        icon: "≈"
    },

    {
        id: "browser",
        category: "network",
        name: "Brauzer məlumatı",
        desc: "Cihaz və brauzer məlumatlarını göstər.",
        icon: "WEB"
    },

    {
        id: "connection",
        category: "network",
        name: "Bağlantı statusu",
        desc: "İnternet bağlantısının hazırkı vəziyyətini yoxla.",
        icon: "ON"
    },


    /* SECURITY */

    {
        id: "password",
        category: "security",
        name: "Şifrə generatoru",
        desc: "Güclü və təsadüfi şifrələr yarat.",
        icon: "KEY"
    },

    {
        id: "password-check",
        category: "security",
        name: "Şifrə yoxlayıcı",
        desc: "Şifrənin təhlükəsizlik səviyyəsini yoxla.",
        icon: "✓"
    },

    {
        id: "uuid",
        category: "security",
        name: "UUID generator",
        desc: "Unikal UUID kodları yarat.",
        icon: "ID"
    },

    {
        id: "hash",
        category: "security",
        name: "Hash generator",
        desc: "Mətn üçün SHA-256 hash yarat.",
        icon: "#"
    },

    {
        id: "base64",
        category: "security",
        name: "Base64",
        desc: "Base64 kodlaşdırma və açma.",
        icon: "64"
    },


    /* DEVELOPER */

    {
        id: "json",
        category: "developer",
        name: "JSON Formatter",
        desc: "JSON məlumatlarını formatla və yoxla.",
        icon: "{}"
    },

    {
        id: "html",
        category: "developer",
        name: "HTML Formatter",
        desc: "HTML kodunu daha oxunaqlı vəziyyətə gətir.",
        icon: "</>"
    },

    {
        id: "css",
        category: "developer",
        name: "CSS Formatter",
        desc: "CSS kodunu formatla.",
        icon: "#{}"
    },

    {
        id: "js",
        category: "developer",
        name: "JavaScript",
        desc: "JavaScript kodunu yoxla və sına.",
        icon: "JS"
    },

    {
        id: "timestamp",
        category: "developer",
        name: "Timestamp",
        desc: "Unix timestamp çeviricisi.",
        icon: "T"
    },

    {
        id: "color",
        category: "developer",
        name: "Color Picker",
        desc: "Rəng seç və HEX/RGB kodunu əldə et.",
        icon: "RGB"
    },


    /* WORLD */

    {
        id: "world-clock",
        category: "world",
        name: "Dünya saatları",
        desc: "Paytaxtların yerli vaxtını göstər.",
        icon: "◷"
    },

    {
        id: "countries",
        category: "world",
        name: "Ölkələr",
        desc: "Ölkələr haqqında əsas məlumatlara bax.",
        icon: "🌍"
    },

    {
        id: "currency",
        category: "world",
        name: "Valyuta",
        desc: "Valyutalar arasında çevirmə apar.",
        icon: "$"
    },

    {
        id: "timezone",
        category: "world",
        name: "Timezone",
        desc: "Saat qurşaqlarını müqayisə et.",
        icon: "TZ"
    },


    /* OFFICE */

    {
        id: "word",
        category: "office",
        name: "NEXUS Word",
        desc: "Mətn yaz, formatla və DOCX faylı yarat.",
        icon: "W"
    },

    {
        id: "excel",
        category: "office",
        name: "NEXUS Excel",
        desc: "Cədvəl yarat, məlumat daxil et və XLSX çıxar.",
        icon: "X"
    },

    {
        id: "calculator",
        category: "office",
        name: "Kalkulyator",
        desc: "iOS üslubunda tam ekran kalkulyator.",
        icon: "÷"
    },

    {
        id: "percentage",
        category: "office",
        name: "Faiz hesablayıcı",
        desc: "Faizləri sürətli şəkildə hesabla.",
        icon: "%"
    },


    /* MEDIA */

    {
        id: "audio",
        category: "media",
        name: "Media Player",
        desc: "Öz musiqi və audio fayllarını burada dinlə.",
        icon: "♫"
    },

    {
        id: "image",
        category: "media",
        name: "Şəkil görüntüləyici",
        desc: "Şəkillərə bax və ölçülərini yoxla.",
        icon: "IMG"
    },

    {
        id: "file-info",
        category: "media",
        name: "Fayl məlumatı",
        desc: "Faylın ölçüsünü və tipini öyrən.",
        icon: "FILE"
    },


    /* TOOLS */

    {
        id: "notes",
        category: "tools",
        name: "Qeydlər",
        desc: "Sürətli qeydlər yaz və yadda saxla.",
        icon: "N"
    },

    {
        id: "timer",
        category: "tools",
        name: "Timer",
        desc: "Geri sayım taymeri.",
        icon: "◴"
    },

    {
        id: "stopwatch",
        category: "tools",
        name: "Saniyəölçən",
        desc: "Dəqiq vaxt ölç.",
        icon: "◉"
    },

    {
        id: "qr",
        category: "tools",
        name: "QR Generator",
        desc: "Mətn və linklərdən QR kod yarat.",
        icon: "QR"
    },


    /* AI */

    {
        id: "ai",
        category: "ai",
        name: "NEXUS AI",
        desc: "Süni intellekt köməkçisi.",
        icon: "✦"
    }

];


/* =========================================================
   RENDER CATEGORIES
========================================================= */

function renderCategories() {

    const container =
        $("#categories");

    if (!container) return;

    container.innerHTML =
        categories.map(cat => `

            <button
                class="cat"
                data-category="${cat.id}"
            >

                <span class="cat-icon">
                    ${cat.icon}
                </span>

                <b>
                    ${cat.name}
                </b>

                <small>
                    ${cat.desc}
                </small>

            </button>

        `).join("");


    $$(".cat").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                $$(".cat").forEach(item =>
                    item.classList.remove("active")
                );

                button.classList.add("active");

                renderTools(
                    button.dataset.category
                );

                setTimeout(() => {

                    const section =
                        $("#modules");

                    if (!section) return;

                    const top =
                        section.getBoundingClientRect().top
                        + window.scrollY
                        - 18;

                    window.scrollTo({

                        top,
                        behavior: "smooth"

                    });

                }, 80);

            }
        );

    });

}


/* =========================================================
   RENDER TOOLS
========================================================= */

function renderTools(category) {

    const grid =
        $("#moduleGrid");

    const hint =
        $("#moduleHint");

    if (!grid) return;


    const categoryData =
        categories.find(
            item => item.id === category
        );


    if (hint) {

        hint.textContent =
            categoryData
                ? categoryData.name.toUpperCase()
                : category.toUpperCase();

    }


    const selected =
        tools.filter(
            tool => tool.category === category
        );


    grid.innerHTML =
        selected.map(tool => `

            <article
                class="tool"
                data-tool="${tool.id}"
            >

                <div class="tool-icon">
                    ${tool.icon}
                </div>

                <h3>
                    ${tool.name}
                </h3>

                <p>
                    ${tool.desc}
                </p>

                <button
                    onclick="openTool('${tool.id}')"
                >
                    AÇ
                </button>

            </article>

        `).join("");

}


/* =========================================================
   OPEN TOOL
========================================================= */

function openTool(id) {

    if (id === "ai") {

        openAI();

        return;

    }


    const tool =
        tools.find(
            item => item.id === id
        );

    if (!tool) return;


    const modal =
        $("#modal");

    const content =
        $("#modalContent");


    content.innerHTML = `

        <div class="modal-inner">

            <div class="tool-icon">
                ${tool.icon}
            </div>

            <h2>
                ${tool.name}
            </h2>

            <p>
                ${tool.desc}
            </p>

            <div id="toolArea"></div>

        </div>

    `;


    modal.classList.add("show");


    loadTool(
        id,
        $("#toolArea")
    );

}


/* =========================================================
   TOOL LOADER
========================================================= */

function loadTool(id, area) {

    switch (id) {

        case "speed":
            speedTest(area);
            break;

        case "ip":
            ipTool(area);
            break;

        case "dns":
            dnsTool(area);
            break;

        case "ping":
            pingTool(area);
            break;

        case "browser":
            browserTool(area);
            break;

        case "connection":
            connectionTool(area);
            break;

        case "password":
            passwordTool(area);
            break;

        case "password-check":
            passwordCheck(area);
            break;

        case "uuid":
            uuidTool(area);
            break;

        case "hash":
            hashTool(area);
            break;

        case "base64":
            base64Tool(area);
            break;

        case "json":
            jsonTool(area);
            break;

        case "html":
            formatterTool(area, "HTML");
            break;

        case "css":
            formatterTool(area, "CSS");
            break;

        case "js":
            javascriptTool(area);
            break;

        case "timestamp":
            timestampTool(area);
            break;

        case "color":
            colorTool(area);
            break;

        case "world-clock":
            worldClockTool(area);
            break;

        case "countries":
            countriesTool(area);
            break;

        case "currency":
            currencyTool(area);
            break;

        case "timezone":
            timezoneTool(area);
            break;

        case "word":
            wordTool(area);
            break;

        case "excel":
            excelTool(area);
            break;

        case "calculator":
            calculatorTool(area);
            break;

        case "percentage":
            percentageTool(area);
            break;

        case "audio":
            audioTool(area);
            break;

        case "image":
            imageTool(area);
            break;

        case "file-info":
            fileInfoTool(area);
            break;

        case "notes":
            notesTool(area);
            break;

        case "timer":
            timerTool(area);
            break;

        case "stopwatch":
            stopwatchTool(area);
            break;

        case "qr":
            qrTool(area);
            break;

    }

}


/* =========================================================
   NETWORK
========================================================= */

function speedTest(area) {

    area.innerHTML = `

        <div class="speed">

            <div class="speed-ring">
                <span id="speedNumber">
                    0
                </span>
            </div>

            <div class="speed-value">
                Mbps
            </div>

            <button
                class="action"
                id="startSpeed"
            >
                TESTƏ BAŞLA
            </button>

        </div>

    `;


    $("#startSpeed").onclick =
        async function () {

            const number =
                $("#speedNumber");

            number.textContent =
                "...";


            const start =
                performance.now();


            try {

                const response =
                    await fetch(
                        "https://speed.cloudflare.com/__down?bytes=1000000",
                        {
                            cache: "no-store"
                        }
                    );


                const data =
                    await response.arrayBuffer();


                const seconds =
                    (performance.now() - start)
                    / 1000;


                const mbps =
                    (
                        data.byteLength
                        * 8
                        / seconds
                        / 1000000
                    ).toFixed(1);


                number.textContent =
                    mbps;

            }

            catch {

                number.textContent =
                    "X";

            }

        };

}


function ipTool(area) {

    area.innerHTML = `

        <button
            class="action"
            onclick="getIP()"
        >
            IP-Mİ ÖYRƏN
        </button>

        <pre id="ipResult">
Hazırdır...
        </pre>

    `;

}


async function getIP() {

    const result =
        $("#ipResult");

    try {

        const response =
            await fetch(
                "https://api.ipify.org?format=json"
            );

        const data =
            await response.json();

        result.textContent =
            `Public IP: ${data.ip}`;

    }

    catch {

        result.textContent =
            "IP məlumatını almaq mümkün olmadı.";

    }

}


function dnsTool(area) {

    area.innerHTML = `

        <input
            id="dnsHost"
            class="field"
            placeholder="məsələn: google.com"
        >

        <button
            class="action"
            onclick="checkDNS()"
        >
            YOXLAMA
        </button>

        <pre id="dnsResult"></pre>

    `;

}


async function checkDNS() {

    const host =
        $("#dnsHost").value.trim();

    if (!host) return;

    const start =
        performance.now();


    try {

        await fetch(
            `https://dns.google/resolve?name=${encodeURIComponent(host)}`,
            {
                mode: "cors"
            }
        );


        const time =
            Math.round(
                performance.now() - start
            );


        $("#dnsResult").textContent =
            `${host}\nDNS cavabı: ${time} ms`;

    }

    catch {

        $("#dnsResult").textContent =
            "DNS sorğusu uğursuz oldu.";

    }

}


function pingTool(area) {

    area.innerHTML = `

        <input
            id="pingHost"
            class="field"
            value="https://www.google.com"
        >

        <button
            class="action"
            onclick="runPing()"
        >
            PING
        </button>

        <pre id="pingResult"></pre>

    `;

}


async function runPing() {

    const host =
        $("#pingHost").value;

    const start =
        performance.now();


    try {

        await fetch(
            host,
            {
                mode: "no-cors",
                cache: "no-store"
            }
        );


        const ms =
            Math.round(
                performance.now() - start
            );


        $("#pingResult").textContent =
            `Cavab müddəti: ${ms} ms`;

    }

    catch {

        $("#pingResult").textContent =
            "Ping ölçülmədi.";

    }

}


function browserTool(area) {

    area.innerHTML = `

        <pre>
Platform:
${navigator.platform}

Brauzer:
${navigator.userAgent}

Dil:
${navigator.language}

Ekran:
${screen.width} × ${screen.height}

Online:
${navigator.onLine ? "Bəli" : "Xeyr"}

CPU nüvələri:
${navigator.hardwareConcurrency || "Naməlum"}

RAM:
${navigator.deviceMemory || "Naməlum"} GB
        </pre>

    `;

}


function connectionTool(area) {

    const connection =
        navigator.connection ||
        navigator.mozConnection ||
        navigator.webkitConnection;


    area.innerHTML = `

        <pre>
Online: ${navigator.onLine ? "BƏLİ" : "XEYR"}

Bağlantı tipi:
${
    connection
        ? connection.effectiveType
        : "Naməlum"
}

Downlink:
${
    connection
        ? connection.downlink + " Mbps"
        : "Naməlum"
}
        </pre>

    `;

}


/* =========================================================
   SECURITY
========================================================= */

function passwordTool(area) {

    area.innerHTML = `

        <input
            id="passwordLength"
            class="field"
            type="number"
            min="6"
            max="100"
            value="18"
        >

        <button
            class="action"
            onclick="generatePassword()"
        >
            ŞİFRƏ YARAT
        </button>

        <pre id="passwordResult"></pre>

    `;

}


function generatePassword() {

    const length =
        Math.min(
            100,
            Math.max(
                6,
                Number(
                    $("#passwordLength").value
                )
            )
        );


    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";


    let password = "";


    for (
        let i = 0;
        i < length;
        i++
    ) {

        password +=
            chars[
                Math.floor(
                    Math.random()
                    * chars.length
                )
            ];

    }


    $("#passwordResult").textContent =
        password;

}


function passwordCheck(area) {

    area.innerHTML = `

        <input
            id="checkPassword"
            class="field"
            type="password"
            placeholder="Şifrənizi yazın"
            oninput="checkPasswordStrength()"
        >

        <pre id="strengthResult"></pre>

    `;

}


function checkPasswordStrength() {

    const password =
        $("#checkPassword").value;

    let score = 0;


    if (password.length >= 8)
        score++;

    if (password.length >= 12)
        score++;

    if (/[A-Z]/.test(password))
        score++;

    if (/[0-9]/.test(password))
        score++;

    if (/[^A-Za-z0-9]/.test(password))
        score++;


    const labels = [
        "ÇOX ZƏİF",
        "ZƏİF",
        "ORTA",
        "YAXŞI",
        "GÜCLÜ",
        "ÇOX GÜCLÜ"
    ];


    $("#strengthResult").textContent =
        labels[score];

}


function uuidTool(area) {

    area.innerHTML = `

        <button
            class="action"
            onclick="createUUID()"
        >
            UUID YARAT
        </button>

        <pre id="uuidResult"></pre>

    `;

}


function createUUID() {

    const uuid =
        crypto.randomUUID
            ? crypto.randomUUID()
            : fallbackUUID();


    $("#uuidResult").textContent =
        uuid;

}


function fallbackUUID() {

    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
        .replace(
            /[xy]/g,
            function (c) {

                const r =
                    Math.random() * 16 | 0;

                const v =
                    c === "x"
                        ? r
                        : (r & 0x3 | 0x8);

                return v.toString(16);

            }
        );

}


async function hashTool(area) {

    area.innerHTML = `

        <textarea
            id="hashText"
            class="field"
            rows="6"
            placeholder="Mətn..."
        ></textarea>

        <button
            class="action"
            onclick="createHash()"
        >
            SHA-256
        </button>

        <pre id="hashResult"></pre>

    `;

}


async function createHash() {

    const text =
        $("#hashText").value;

    const buffer =
        await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(text)
        );


    const hash =
        Array.from(
            new Uint8Array(buffer)
        )
        .map(
            b =>
                b.toString(16).padStart(2, "0")
        )
        .join("");


    $("#hashResult").textContent =
        hash;

}


function base64Tool(area) {

    area.innerHTML = `

        <textarea
            id="base64Text"
            class="field"
            rows="6"
            placeholder="Mətn..."
        ></textarea>

        <div class="office-actions">

            <button onclick="encodeBase64()">
                ENCODE
            </button>

            <button onclick="decodeBase64()">
                DECODE
            </button>

        </div>

        <pre id="base64Result"></pre>

    `;

}


function encodeBase64() {

    const value =
        $("#base64Text").value;

    $("#base64Result").textContent =
        btoa(
            unescape(
                encodeURIComponent(value)
            )
        );

}


function decodeBase64() {

    try {

        $("#base64Result").textContent =
            decodeURIComponent(
                escape(
                    atob(
                        $("#base64Text").value
                    )
                )
            );

    }

    catch {

        $("#base64Result").textContent =
            "Yanlış Base64 məlumatı.";

    }

}


/* =========================================================
   DEVELOPER
========================================================= */

function jsonTool(area) {

    area.innerHTML = `

        <textarea
            id="jsonInput"
            class="field"
            rows="12"
            placeholder='{"ad":"NEXUS"}'
        ></textarea>

        <button
            class="action"
            onclick="formatJSON()"
        >
            FORMAT
        </button>

        <pre id="jsonResult"></pre>

    `;

}


function formatJSON() {

    try {

        const object =
            JSON.parse(
                $("#jsonInput").value
            );


        $("#jsonResult").textContent =
            JSON.stringify(
                object,
                null,
                4
            );

    }

    catch {

        $("#jsonResult").textContent =
            "JSON xətası.";

    }

}


function formatterTool(area, type) {

    area.innerHTML = `

        <textarea
            id="formatInput"
            class="field"
            rows="15"
            placeholder="${type} kodunu yaz..."
        ></textarea>

        <button
            class="action"
            onclick="formatGeneric('${type}')"
        >
            FORMAT
        </button>

        <pre id="formatResult"></pre>

    `;

}


function formatGeneric(type) {

    const value =
        $("#formatInput").value;


    $("#formatResult").textContent =
        value
            .replace(
                />\s*</g,
                ">\n<"
            )
            .replace(
                /;\s*/g,
                ";\n"
            );

}


function javascriptTool(area) {

    area.innerHTML = `

        <textarea
            id="jsInput"
            class="field"
            rows="13"
            placeholder="console.log('NEXUS');"
        ></textarea>

        <button
            class="action"
            onclick="runJS()"
        >
            İŞLƏT
        </button>

        <pre id="jsResult"></pre>

    `;

}


function runJS() {

    const code =
        $("#jsInput").value;


    try {

        const result =
            Function(
                `"use strict"; return (${code})`
            )();


        $("#jsResult").textContent =
            String(result);

    }

    catch (error) {

        $("#jsResult").textContent =
            error.message;

    }

}


function timestampTool(area) {

    area.innerHTML = `

        <button
            class="action"
            onclick="currentTimestamp()"
        >
            İNDİKİ TIMESTAMP
        </button>

        <pre id="timestampResult"></pre>

    `;

}


function currentTimestamp() {

    const now =
        Math.floor(
            Date.now() / 1000
        );


    $("#timestampResult").textContent =
        now;

}


function colorTool(area) {

    area.innerHTML = `

        <input
            id="colorInput"
            type="color"
            value="#8fa7ff"
            style="
                width:100%;
                height:100px;
                border:0;
                background:transparent;
            "
        >

        <pre id="colorResult">
#8FA7FF
        </pre>

    `;


    $("#colorInput").addEventListener(
        "input",
        event => {

            $("#colorResult").textContent =
                event.target.value.toUpperCase();

        }
    );

}


/* =========================================================
   WORLD
========================================================= */

const capitals = [

    {
        city: "Bakı",
        country: "Azərbaycan",
        flag: "🇦🇿",
        timezone: "Asia/Baku"
    },

    {
        city: "Ankara",
        country: "Türkiyə",
        flag: "🇹🇷",
        timezone: "Europe/Istanbul"
    },

    {
        city: "London",
        country: "Böyük Britaniya",
        flag: "🇬🇧",
        timezone: "Europe/London"
    },

    {
        city: "Paris",
        country: "Fransa",
        flag: "🇫🇷",
        timezone: "Europe/Paris"
    },

    {
        city: "Berlin",
        country: "Almaniya",
        flag: "🇩🇪",
        timezone: "Europe/Berlin"
    },

    {
        city: "Moskva",
        country: "Rusiya",
        flag: "🇷🇺",
        timezone: "Europe/Moscow"
    },

    {
        city: "Vaşinqton",
        country: "ABŞ",
        flag: "🇺🇸",
        timezone: "America/New_York"
    },

    {
        city: "Pekin",
        country: "Çin",
        flag: "🇨🇳",
        timezone: "Asia/Shanghai"
    },

    {
        city: "Tokio",
        country: "Yaponiya",
        flag: "🇯🇵",
        timezone: "Asia/Tokyo"
    },

    {
        city: "Dubay",
        country: "BƏƏ",
        flag: "🇦🇪",
        timezone: "Asia/Dubai"
    },

    {
        city: "Seul",
        country: "Cənubi Koreya",
        flag: "🇰🇷",
        timezone: "Asia/Seoul"
    },

    {
        city: "Roma",
        country: "İtaliya",
        flag: "🇮🇹",
        timezone: "Europe/Rome"
    }

];


function worldClockTool(area) {

    area.innerHTML = `

        <div
            class="clocks"
            id="worldClocks"
        ></div>

    `;


    function updateClocks() {

        const container =
            $("#worldClocks");

        container.innerHTML =
            capitals.map(place => {

                const time =
                    new Intl.DateTimeFormat(
                        "az-AZ",
                        {
                            timeZone:
                                place.timezone,

                            hour:
                                "2-digit",

                            minute:
                                "2-digit",

                            second:
                                "2-digit"
                        }
                    ).format(
                        new Date()
                    );


                return `

                    <div class="clock-card">

                        <div class="flag">
                            ${place.flag}
                        </div>

                        <b>
                            ${place.city}
                        </b>

                        <small>
                            ${place.country}
                        </small>

                        <strong>
                            ${time}
                        </strong>

                    </div>

                `;

            }).join("");

    }


    updateClocks();

    setInterval(
        updateClocks,
        1000
    );

}


function countriesTool(area) {

    area.innerHTML = `

        <div class="clocks">

            ${capitals.map(c => `

                <div class="clock-card">

                    <div class="flag">
                        ${c.flag}
                    </div>

                    <b>
                        ${c.country}
                    </b>

                    <small>
                        Paytaxt
                    </small>

                    <strong>
                        ${c.city}
                    </strong>

                </div>

            `).join("")}

        </div>

    `;

}


function currencyTool(area) {

    area.innerHTML = `

        <input
            id="currencyAmount"
            class="field"
            type="number"
            value="100"
        >

        <select
            id="currencyFrom"
            class="field"
        >

            <option value="AZN">
                AZN
            </option>

            <option value="USD">
                USD
            </option>

            <option value="EUR">
                EUR
            </option>

            <option value="TRY">
                TRY
            </option>

        </select>

        <select
            id="currencyTo"
            class="field"
        >

            <option value="USD">
                USD
            </option>

            <option value="AZN">
                AZN
            </option>

            <option value="EUR">
                EUR
            </option>

            <option value="TRY">
                TRY
            </option>

        </select>

        <button
            class="action"
            onclick="convertCurrency()"
        >
            ÇEVİR
        </button>

        <pre id="currencyResult"></pre>

    `;

}


async function convertCurrency() {

    const amount =
        Number(
            $("#currencyAmount").value
        );


    const from =
        $("#currencyFrom").value;

    const to =
        $("#currencyTo").value;


    try {

        const response =
            await fetch(
                `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`
            );


        const data =
            await response.json();


        $("#currencyResult").textContent =
            `${amount} ${from} = ${data.rates[to]} ${to}`;

    }

    catch {

        $("#currencyResult").textContent =
            "Məzənnə məlumatı alınmadı.";

    }

}


function timezoneTool(area) {

    area.innerHTML = `

        <pre>
Bakı:
${new Date().toLocaleString(
    "az-AZ",
    {
        timeZone: "Asia/Baku"
    }
)}

London:
${new Date().toLocaleString(
    "az-AZ",
    {
        timeZone: "Europe/London"
    }
)}

New York:
${new Date().toLocaleString(
    "az-AZ",
    {
        timeZone: "America/New_York"
    }
)}
        </pre>

    `;

}


/* =========================================================
   WORD
========================================================= */

function wordTool(area) {

    area.innerHTML = `

        <div class="word-app">

            <div class="word-toolbar">

                <button
                    onclick="document.execCommand('bold')"
                >
                    <b>B</b>
                </button>

                <button
                    onclick="document.execCommand('italic')"
                >
                    <i>I</i>
                </button>

                <button
                    onclick="document.execCommand('underline')"
                >
                    <u>U</u>
                </button>

                <select
                    onchange="changeFontSize(this.value)"
                >

                    <option value="3">
                        Normal
                    </option>

                    <option value="4">
                        Böyük
                    </option>

                    <option value="5">
                        Daha böyük
                    </option>

                    <option value="6">
                        Başlıq
                    </option>

                </select>

                <button
                    onclick="document.execCommand('justifyLeft')"
                >
                    Sol
                </button>

                <button
                    onclick="document.execCommand('justifyCenter')"
                >
                    Mərkəz
                </button>

                <button
                    onclick="document.execCommand('justifyRight')"
                >
                    Sağ
                </button>

            </div>


            <div
                id="wordPage"
                class="word-page"
                contenteditable="true"
            >

                <h1>NEXUS Word</h1>

                <p>
                    Burada sənədini yazmağa başla...
                </p>

            </div>

        </div>


        <div class="office-actions">

            <button onclick="downloadWord()">
                DOCX YÜKLƏ
            </button>

            <button onclick="window.print()">
                ÇAP ET
            </button>

        </div>

    `;

}


function changeFontSize(size) {

    document.execCommand(
        "fontSize",
        false,
        size
    );

}


async function downloadWord() {

    const text =
        $("#wordPage").innerText;


    if (
        typeof docx === "undefined"
    ) {

        alert(
            "DOCX sistemi hələ yüklənməyib."
        );

        return;

    }


    const {
        Document,
        Packer,
        Paragraph
    } = docx;


    const documentFile =
        new Document({

            sections: [

                {

                    children:
                        text.split("\n")
                            .map(
                                line =>
                                    new Paragraph({
                                        text: line
                                    })
                            )

                }

            ]

        });


    const blob =
        await Packer.toBlob(
            documentFile
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "NEXUS-sened.docx";


    link.click();


    URL.revokeObjectURL(url);

}


/* =========================================================
   EXCEL
========================================================= */

function excelTool(area) {

    area.innerHTML = `

        <div class="office-actions">

            <button
                onclick="addExcelRow()"
            >
                + SƏTİR
            </button>

            <button
                onclick="downloadExcel()"
            >
                XLSX YÜKLƏ
            </button>

        </div>


        <div class="sheet-wrap">

            <table id="excelTable">

                <thead>

                    <tr>

                        <th>A</th>
                        <th>B</th>
                        <th>C</th>
                        <th>D</th>
                        <th>E</th>

                    </tr>

                </thead>

                <tbody>

                    ${createExcelRows(8)}

                </tbody>

            </table>

        </div>

    `;

}


function createExcelRows(count) {

    let html = "";


    for (
        let r = 0;
        r < count;
        r++
    ) {

        html += `

            <tr>

                ${[1,2,3,4,5]
                    .map(
                        () =>
                            `<td contenteditable="true"></td>`
                    )
                    .join("")
                }

            </tr>

        `;

    }


    return html;

}


function addExcelRow() {

    $("#excelTable")
        .querySelector("tbody")
        .insertAdjacentHTML(
            "beforeend",
            createExcelRows(1)
        );

}


function downloadExcel() {

    if (
        typeof XLSX === "undefined"
    ) {

        alert(
            "Excel sistemi yüklənməyib."
        );

        return;

    }


    const table =
        $("#excelTable");


    const workbook =
        XLSX.utils.table_to_book(
            table
        );


    XLSX.writeFile(
        workbook,
        "NEXUS-Excel.xlsx"
    );

}


/* =========================================================
   CALCULATOR
========================================================= */

function calculatorTool(area) {

    area.innerHTML = `

        <div class="calc">

            <div
                class="calc-display"
                id="calcDisplay"
            >
                0
            </div>

            <div class="calc-grid">

                <button onclick="calcClear()">
                    AC
                </button>

                <button onclick="calcSign()">
                    +/−
                </button>

                <button onclick="calcPercent()">
                    %
                </button>

                <button
                    class="op"
                    onclick="calcInput('/')"
                >
                    ÷
                </button>


                <button onclick="calcInput('7')">
                    7
                </button>

                <button onclick="calcInput('8')">
                    8
                </button>

                <button onclick="calcInput('9')">
                    9
                </button>

                <button
                    class="op"
                    onclick="calcInput('*')"
                >
                    ×
                </button>


                <button onclick="calcInput('4')">
                    4
                </button>

                <button onclick="calcInput('5')">
                    5
                </button>

                <button onclick="calcInput('6')">
                    6
                </button>

                <button
                    class="op"
                    onclick="calcInput('-')"
                >
                    −
                </button>


                <button onclick="calcInput('1')">
                    1
                </button>

                <button onclick="calcInput('2')">
                    2
                </button>

                <button onclick="calcInput('3')">
                    3
                </button>

                <button
                    class="op"
                    onclick="calcInput('+')"
                >
                    +
                </button>


                <button
                    class="wide"
                    onclick="calcInput('0')"
                >
                    0
                </button>

                <button onclick="calcInput('.')">
                    .
                </button>

                <button
                    class="op"
                    onclick="calcEquals()"
                >
                    =
                </button>

            </div>

        </div>

    `;

}


let calcExpression = "";


function calcInput(value) {

    calcExpression += value;

    updateCalc();

}


function updateCalc() {

    $("#calcDisplay").textContent =
        calcExpression || "0";

}


function calcClear() {

    calcExpression = "";

    updateCalc();

}


function calcSign() {

    if (!calcExpression) return;

    calcExpression =
        calcExpression.startsWith("-")
            ? calcExpression.slice(1)
            : "-" + calcExpression;

    updateCalc();

}


function calcPercent() {

    const number =
        Number(calcExpression);

    if (
        Number.isFinite(number)
    ) {

        calcExpression =
            String(number / 100);

        updateCalc();

    }

}


function calcEquals() {

    try {

        if (
            !/^[0-9+\-*/().\s]+$/
                .test(calcExpression)
        ) {

            throw new Error();

        }


        const result =
            Function(
                `"use strict"; return (${calcExpression})`
            )();


        calcExpression =
            String(result);

        updateCalc();

    }

    catch {

        calcExpression = "";

        $("#calcDisplay")
            .textContent = "Error";

    }

}


/* =========================================================
   PERCENTAGE
========================================================= */

function percentageTool(area) {

    area.innerHTML = `

        <input
            id="percentNumber"
            class="field"
            type="number"
            placeholder="Məbləğ"
        >

        <input
            id="percentValue"
            class="field"
            type="number"
            placeholder="Faiz"
        >

        <button
            class="action"
            onclick="calculatePercent()"
        >
            HESABLA
        </button>

        <pre id="percentResult"></pre>

    `;

}


function calculatePercent() {

    const number =
        Number(
            $("#percentNumber").value
        );


    const percent =
        Number(
            $("#percentValue").value
        );


    $("#percentResult").textContent =
        `${percent}% = ${
            number * percent / 100
        }`;

}


/* =========================================================
   MEDIA
========================================================= */

function audioTool(area) {

    area.innerHTML = `

        <input
            id="audioFiles"
            class="field"
            type="file"
            accept="audio/*"
            multiple
        >

        <div
            id="audioList"
            style="margin-top:20px;"
        ></div>

    `;


    $("#audioFiles").addEventListener(
        "change",
        event => {

            const list =
                $("#audioList");


            list.innerHTML = "";


            Array.from(
                event.target.files
            )
            .forEach(
                file => {

                    const url =
                        URL.createObjectURL(file);


                    list.insertAdjacentHTML(
                        "beforeend",
                        `

                            <div
                                class="clock-card"
                                style="margin-bottom:10px;"
                            >

                                <b>
                                    ${file.name}
                                </b>

                                <audio
                                    controls
                                    style="
                                        width:100%;
                                        margin-top:10px;
                                    "
                                    src="${url}"
                                ></audio>

                            </div>

                        `
                    );

                }
            );

        }
    );

}


function imageTool(area) {

    area.innerHTML = `

        <input
            id="imageFile"
            class="field"
            type="file"
            accept="image/*"
        >

        <div
            id="imagePreview"
            style="margin-top:20px;"
        ></div>

    `;


    $("#imageFile").addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];

            if (!file) return;


            const url =
                URL.createObjectURL(file);


            $("#imagePreview").innerHTML = `

                <img
                    src="${url}"
                    style="
                        max-width:100%;
                        max-height:500px;
                        border-radius:15px;
                    "
                >

            `;

        }
    );

}


function fileInfoTool(area) {

    area.innerHTML = `

        <input
            id="fileInput"
            class="field"
            type="file"
        >

        <pre
            id="fileResult"
            style="margin-top:20px;"
        ></pre>

    `;


    $("#fileInput").addEventListener(
        "change",
        event => {

            const file =
                event.target.files[0];

            if (!file) return;


            $("#fileResult").textContent = `

Ad:
${file.name}

Tip:
${file.type || "Naməlum"}

Ölçü:
${(file.size / 1024).toFixed(2)} KB

Son dəyişiklik:
${new Date(
    file.lastModified
).toLocaleString("az-AZ")}

            `;

        }
    );

}


/* =========================================================
   TOOLS
========================================================= */

function notesTool(area) {

    area.innerHTML = `

        <textarea
            id="notesText"
            class="field"
            rows="15"
            placeholder="Qeydlərini yaz..."
        ></textarea>

        <button
            class="action"
            onclick="saveNotes()"
        >
            YADDA SAXLA
        </button>

    `;


    const saved =
        localStorage.getItem(
            "nexus-notes"
        );


    if (saved)
        $("#notesText").value =
            saved;

}


function saveNotes() {

    localStorage.setItem(
        "nexus-notes",
        $("#notesText").value
    );


    alert(
        "Qeyd yadda saxlanıldı."
    );

}


let timerInterval = null;


function timerTool(area) {

    area.innerHTML = `

        <input
            id="timerSeconds"
            class="field"
            type="number"
            value="60"
            min="1"
        >

        <div
            id="timerDisplay"
            style="
                margin-top:25px;
                font-size:45px;
                font-family:'Space Mono';
            "
        >
            01:00
        </div>

        <button
            class="action"
            onclick="startTimer()"
        >
            BAŞLA
        </button>

    `;

}


function startTimer() {

    clearInterval(
        timerInterval
    );


    let seconds =
        Number(
            $("#timerSeconds").value
        );


    timerInterval =
        setInterval(
            () => {

                seconds--;

                const minutes =
                    Math.floor(
                        seconds / 60
                    );

                const secs =
                    seconds % 60;


                $("#timerDisplay")
                    .textContent =
                    `${String(minutes).padStart(2,"0")}:${String(secs).padStart(2,"0")}`;


                if (
                    seconds <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );

                    alert(
                        "Vaxt bitdi!"
                    );

                }

            },
            1000
        );

}


let stopwatchInterval = null;
let stopwatchSeconds = 0;


function stopwatchTool(area) {

    area.innerHTML = `

        <div
            id="stopwatchDisplay"
            style="
                font-family:'Space Mono';
                font-size:45px;
                margin-top:20px;
            "
        >
            00:00:00
        </div>

        <div class="office-actions">

            <button onclick="startStopwatch()">
                BAŞLA
            </button>

            <button onclick="stopStopwatch()">
                DAYANDIR
            </button>

            <button onclick="resetStopwatch()">
                SIFIRLA
            </button>

        </div>

    `;

}


function startStopwatch() {

    clearInterval(
        stopwatchInterval
    );


    stopwatchInterval =
        setInterval(
            () => {

                stopwatchSeconds++;

                const h =
                    Math.floor(
                        stopwatchSeconds / 3600
                    );

                const m =
                    Math.floor(
                        (stopwatchSeconds % 3600)
                        / 60
                    );

                const s =
                    stopwatchSeconds % 60;


                $("#stopwatchDisplay")
                    .textContent =
                    `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;

            },
            1000
        );

}


function stopStopwatch() {

    clearInterval(
        stopwatchInterval
    );

}


function resetStopwatch() {

    stopStopwatch();

    stopwatchSeconds = 0;

    $("#stopwatchDisplay")
        .textContent =
        "00:00:00";

}


function qrTool(area) {

    area.innerHTML = `

        <input
            id="qrText"
            class="field"
            placeholder="Mətn və ya link..."
        >

        <button
            class="action"
            onclick="generateQR()"
        >
            QR YARAT
        </button>

        <div
            id="qrResult"
            style="
                margin-top:25px;
                text-align:center;
            "
        ></div>

    `;

}


function generateQR() {

    const text =
        $("#qrText").value.trim();


    if (!text) return;


    $("#qrResult").innerHTML = `

        <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(text)}"
            alt="QR Code"
            style="
                width:250px;
                max-width:100%;
                border-radius:15px;
            "
        >

    `;

}


/* =========================================================
   NEXUS AI
========================================================= */

function openAI() {

    const modal =
        $("#modal");

    const content =
        $("#modalContent");


    modal.classList.add("show");


    content.innerHTML = `

        <div class="chat">

            <div class="chat-head">

                <b>
                    ✦ NEXUS AI
                </b>

                <small>
                    Sənin rəqəmsal köməkçin
                </small>

            </div>


            <div
                class="chat-body"
                id="chatBody"
            >

                <div class="msg ai">

                    Salam! Mən NEXUS AI-yam.
                    Sənə nə ilə kömək edə bilərəm?

                </div>

            </div>


            <div class="chat-input">

                <textarea
                    id="chatInput"
                    rows="1"
                    placeholder="Mesajını yaz..."
                ></textarea>

                <button
                    onclick="sendAI()"
                >
                    GÖNDƏR
                </button>

            </div>

        </div>

    `;


    setTimeout(
        () =>
            $("#chatInput")
                ?.focus(),
        100
    );

}


function sendAI() {

    const input =
        $("#chatInput");

    const body =
        $("#chatBody");


    if (!input || !body)
        return;


    const message =
        input.value.trim();


    if (!message)
        return;


    body.insertAdjacentHTML(
        "beforeend",
        `
            <div class="msg user">
                ${escapeHTML(message)}
            </div>
        `
    );


    input.value = "";


    setTimeout(
        () => {

            body.insertAdjacentHTML(
                "beforeend",
                `
                    <div class="msg ai">

                        Mən hazırda NEXUS-un
                        frontend versiyasındayam.
                        Real ChatGPT cavabları üçün
                        təhlükəsiz server/API bağlantısı
                        əlavə etmək lazımdır.

                    </div>
                `
            );


            body.scrollTop =
                body.scrollHeight;

        },
        500
    );


    body.scrollTop =
        body.scrollHeight;

}


function escapeHTML(text) {

    return text
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function performSearch() {

    const input =
        $("#globalSearch");

    if (!input) return;


    const query =
        input.value.trim();


    if (!query)
        return;


    const url =
        "https://www.google.com/search?q="
        + encodeURIComponent(query);


    window.open(
        url,
        "_blank"
    );

}


$("#searchBtn")
    ?.addEventListener(
        "click",
        performSearch
    );


$("#globalSearch")
    ?.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                performSearch();

            }

        }
    );


/* =========================================================
   CLOSE MODAL
========================================================= */

$("#closeModal")
    ?.addEventListener(
        "click",
        () => {

            $("#modal")
                .classList.remove(
                    "show"
                );

        }
    );


$("#modal")
    ?.addEventListener(
        "click",
        event => {

            if (
                event.target === $("#modal")
            ) {

                $("#modal")
                    .classList.remove(
                        "show"
                    );

            }

        }
    );


/* =========================================================
   AI BUTTON
========================================================= */

$("#aiFab")
    ?.addEventListener(
        "click",
        openAI
    );


/* =========================================================
   HERO SCROLL
========================================================= */

function scrollToCategories() {

    const section =
        $("#categoriesSection");

    if (!section) return;


    const top =
        section.getBoundingClientRect().top
        + window.scrollY
        - 20;


    window.scrollTo({

        top,
        behavior: "smooth"

    });

}


/* =========================================================
   CLOCK
========================================================= */

function updateMainClock() {

    const now =
        new Date();


    const clock =
        $("#clock");

    const date =
        $("#date");


    if (clock) {

        clock.textContent =
            now.toLocaleTimeString(
                "az-AZ",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );

    }


    if (date) {

        date.textContent =
            now.toLocaleDateString(
                "az-AZ",
                {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric"
                }
            );

    }

}


updateMainClock();

setInterval(
    updateMainClock,
    1000
);


/* =========================================================
   INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        renderCategories();


        /* İlk açılışda Network göstərilir */

        const first =
            $(".cat[data-category='network']");


        if (first) {

            first.classList.add(
                "active"
            );

            renderTools(
                "network"
            );

        }

    }
);
