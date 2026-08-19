/* =========================================================
   NEXUS // AZ — v4.0
   MAIN APPLICATION
========================================================= */

"use strict";


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function showToast(message) {

    const toast = $("#toast");

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}


/* =========================================================
   CLOCK
========================================================= */

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString("az-AZ", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const date = now.toLocaleDateString("az-AZ", {
        weekday: "long",
        day: "2-digit",
        month: "long"
    });

    const clock = $("#clock");
    const dateElement = $("#date");
    const quickClock = $("#quickClock");

    if (clock) clock.textContent = time;

    if (dateElement) {
        dateElement.textContent =
            date.charAt(0).toUpperCase() + date.slice(1);
    }

    if (quickClock) {
        quickClock.textContent = time.slice(0, 5);
    }
}

updateClock();

setInterval(updateClock, 1000);


/* =========================================================
   CATEGORY DATA
========================================================= */

const categories = {

    network: {

        number: "01 / NETWORK",

        title: "Şəbəkə Mərkəzi",

        description:
            "Şəbəkə bağlantısı, IP, DNS və internet diaqnostikası.",

        services: [

            {
                icon: "IP",
                title: "Mənim IP ünvanım",
                description: "İctimai IP ünvanınızı göstər.",
                action: "ip"
            },

            {
                icon: "DNS",
                title: "DNS yoxlayıcı",
                description: "DNS server məlumatlarını yoxla.",
                action: "dns"
            },

            {
                icon: "NET",
                title: "Bağlantı testi",
                description: "İnternet bağlantısının vəziyyətini yoxla.",
                action: "connection"
            },

            {
                icon: "URL",
                title: "URL analizatoru",
                description: "Sayt ünvanının strukturunu analiz et.",
                action: "url"
            },

            {
                icon: "PING",
                title: "Ping testi",
                description: "Brauzer üzərindən bağlantı testi.",
                action: "ping"
            },

            {
                icon: "QR",
                title: "Wi-Fi QR",
                description: "Wi-Fi məlumatlarından QR kod yarat.",
                action: "wifi"
            }

        ]

    },


    security: {

        number: "02 / SECURITY",

        title: "Təhlükəsizlik",

        description:
            "Gündəlik istifadə üçün təhlükəsizlik və məlumat qoruma alətləri.",

        services: [

            {
                icon: "KEY",
                title: "Şifrə generatoru",
                description: "Güclü təsadüfi şifrə yarat.",
                action: "password"
            },

            {
                icon: "HASH",
                title: "Hash generator",
                description: "Mətn üçün SHA-256 hash hesabla.",
                action: "hash"
            },

            {
                icon: "B64",
                title: "Base64",
                description: "Mətni Base64 formatına çevir.",
                action: "base64"
            },

            {
                icon: "PASS",
                title: "Şifrə gücü",
                description: "Şifrənin təxmini gücünü yoxla.",
                action: "strength"
            }

        ]

    },


    developer: {

        number: "03 / DEVELOPER",

        title: "Developer",

        description:
            "Kod yazanlar üçün gündəlik texniki alətlər.",

        services: [

            {
                icon: "</>",
                title: "JSON formatter",
                description: "JSON məlumatını formatla və yoxla.",
                action: "json"
            },

            {
                icon: "{}",
                title: "Code Pad",
                description: "Brauzerdə rahat kod yaz.",
                action: "code"
            },

            {
                icon: "REG",
                title: "Regex tester",
                description: "Regular expression nümunələrini yoxla.",
                action: "regex"
            },

            {
                icon: "URL",
                title: "URL encoder",
                description: "URL mətnini encode/decode et.",
                action: "urlencode"
            },

            {
                icon: "CMD",
                title: "NEXUS Terminal",
                description: "Brauzer əsaslı təhlükəsiz terminal simulyatoru.",
                action: "terminal"
            },

            {
                icon: "TIME",
                title: "Unix timestamp",
                description: "Timestamp məlumatını çevir.",
                action: "timestamp"
            }

        ]

    },


    world: {

        number: "04 / WORLD",

        title: "World Center",

        description:
            "Dünya xəritəsi, saatlar və naviqasiya üçün sürətli giriş.",

        services: [

            {
                icon: "MAP",
                title: "Live World Map",
                description: "İnteraktiv dünya xəritəsini aç.",
                action: "map"
            },

            {
                icon: "NAV",
                title: "Naviqator",
                description: "Google Maps üzərindən marşrut axtar.",
                action: "navigator"
            },

            {
                icon: "TIME",
                title: "Dünya saatları",
                description: "Müxtəlif şəhərlərin yerli vaxtına bax.",
                action: "worldclock"
            },

            {
                icon: "LOC",
                title: "Mənim mövqeyim",
                description: "Brauzerin icazəsi ilə mövqeyini müəyyən et.",
                action: "location"
            }

        ]

    },


    media: {

        number: "05 / MEDIA",

        title: "Media",

        description:
            "Musiqi və media üçün sadə, müasir alətlər.",

        services: [

            {
                icon: "♫",
                title: "NEXUS Music",
                description: "Seçilmiş Azərbaycan və türk musiqi siyahısı.",
                action: "music"
            },

            {
                icon: "VOL",
                title: "Audio",
                description: "Brauzerdə audio fayl aç.",
                action: "audio"
            },

            {
                icon: "YT",
                title: "Video axtarışı",
                description: "YouTube üzərindən sürətli axtarış.",
                action: "youtube"
            }

        ]

    },


    office: {

        number: "06 / OFFICE",

        title: "NEXUS Office",

        description:
            "İş və gündəlik ofis istifadəsi üçün praktik alətlər.",

        services: [

            {
                icon: "CAL",
                title: "Kalkulyator",
                description: "Sürətli hesablamalar apar.",
                action: "calculator"
            },

            {
                icon: "QR",
                title: "QR kod generatoru",
                description: "Link və ya mətn üçün QR kod yarat.",
                action: "qr"
            },

            {
                icon: "DOC",
                title: "Mətn redaktoru",
                description: "Sadə sənəd və qeyd hazırlamaq üçün.",
                action: "notes"
            },

            {
                icon: "CV",
                title: "Söz sayı",
                description: "Mətnin söz və simvol sayını hesabla.",
                action: "wordcount"
            },

            {
                icon: "%",
                title: "Faiz kalkulyatoru",
                description: "Faizləri sürətli hesabla.",
                action: "percent"
            },

            {
                icon: "DATE",
                title: "Tarix hesablayıcı",
                description: "İki tarix arasındakı müddəti hesabla.",
                action: "datediff"
            }

        ]

    },


    system: {

        number: "07 / SYSTEM",

        title: "System",

        description:
            "Cihaz, brauzer və ekran haqqında məlumatlar.",

        services: [

            {
                icon: "CPU",
                title: "Cihaz məlumatları",
                description: "Brauzer və cihaz haqqında məlumat.",
                action: "device"
            },

            {
                icon: "SCR",
                title: "Ekran məlumatları",
                description: "Ekran ölçüsünü və piksel məlumatlarını göstər.",
                action: "screen"
            },

            {
                icon: "BROW",
                title: "Brauzer məlumatları",
                description: "İstifadə olunan brauzer məlumatlarını göstər.",
                action: "browser"
            },

            {
                icon: "STOR",
                title: "Local Storage",
                description: "Brauzerin lokal yaddaş vəziyyətini göstər.",
                action: "storage"
            }

        ]

    }

};


/* =========================================================
   CATEGORY OPEN
========================================================= */

function openCategory(categoryName) {

    const category = categories[categoryName];

    if (!category) return;

    $("#categoryNumber").textContent = category.number;
    $("#categoryTitle").textContent = category.title;
    $("#categoryDescription").textContent = category.description;

    const grid = $("#servicesGrid");

    grid.innerHTML = "";

    category.services.forEach(service => {

        const card = document.createElement("button");

        card.className = "service-card";

        card.innerHTML = `
            <div class="service-icon">
                ${escapeHTML(service.icon)}
            </div>

            <h3>
                ${escapeHTML(service.title)}
            </h3>

            <p>
                ${escapeHTML(service.description)}
            </p>
        `;

        card.addEventListener("click", () => {
            openTool(service.action, service.title, category.title);
        });

        grid.appendChild(card);

    });

    $("#categoryModal").classList.add("active");

    document.body.style.overflow = "hidden";
}


/* =========================================================
   CLOSE MODALS
========================================================= */

function closeModal(id) {

    const modal = $("#" + id);

    if (modal) {
        modal.classList.remove("active");
    }

    if (
        !document.querySelector(".modal-overlay.active") &&
        !$("#aiModal").classList.contains("active")
    ) {
        document.body.style.overflow = "";
    }
}

$$("[data-close]").forEach(button => {

    button.addEventListener("click", () => {
        closeModal(button.dataset.close);
    });

});


$$(".modal-overlay").forEach(overlay => {

    overlay.addEventListener("click", event => {

        if (event.target === overlay) {
            closeModal(overlay.id);
        }

    });

});


/* =========================================================
   CATEGORY BUTTONS
========================================================= */

$$(".category-card").forEach(button => {

    button.addEventListener("click", () => {

        openCategory(button.dataset.category);

    });

});


/* =========================================================
   TOOL OPEN
========================================================= */

function openTool(action, title, categoryTitle) {

    $("#toolCategory").textContent =
        categoryTitle.toUpperCase();

    $("#toolTitle").textContent = title;

    const content = $("#toolContent");

    content.innerHTML = "";

    renderTool(action, content);

    $("#categoryModal").classList.remove("active");

    $("#toolModal").classList.add("active");

}


/* =========================================================
   TOOL RENDERER
========================================================= */

function renderTool(action, container) {

    switch (action) {

        case "ip":

            container.innerHTML = `
                <div class="tool-result" id="ipResult">
                    IP məlumatı yoxlanılır...
                </div>
            `;

            fetchIP();

            break;


        case "dns":

            container.innerHTML = `
                <div class="tool-field">
                    <input
                        class="tool-input"
                        id="dnsInput"
                        placeholder="example.com"
                    >

                    <button
                        class="tool-action"
                        onclick="checkDNS()"
                    >
                        Yoxla
                    </button>
                </div>

                <div
                    class="tool-result"
                    id="dnsResult"
                >
                    Domen daxil edin.
                </div>
            `;

            break;


        case "connection":

            container.innerHTML = `
                <div class="tool-result">
                    Brauzer bağlantısı:
                    ${navigator.onLine ? "ONLAYN ✓" : "OFFLAYN ✕"}

                    <br><br>

                    Platforma:
                    ${escapeHTML(navigator.platform)}

                    <br><br>

                    Dil:
                    ${escapeHTML(navigator.language)}
                </div>
            `;

            break;


        case "url":

            container.innerHTML = `
                <div class="tool-field">

                    <input
                        class="tool-input"
                        id="urlToolInput"
                        placeholder="https://example.com/path?test=1"
                    >

                    <button
                        class="tool-action"
                        onclick="analyzeURLTool()"
                    >
                        Analiz et
                    </button>

                </div>

                <div
                    class="tool-result"
                    id="urlToolResult"
                >
                    Gözləyir...
                </div>
            `;

            break;


        case "ping":

            container.innerHTML = `
                <div class="tool-field">

                    <input
                        class="tool-input"
                        id="pingInput"
                        placeholder="https://example.com"
                        value="https://example.com"
                    >

                    <button
                        class="tool-action"
                        onclick="runPing()"
                    >
                        Test et
                    </button>

                </div>

                <div
                    class="tool-result"
                    id="pingResult"
                >
                    Hazır.
                </div>
            `;

            break;


        case "wifi":

            container.innerHTML = `
                <div class="tool-field">

                    <input
                        class="tool-input"
                        id="wifiName"
                        placeholder="Wi-Fi adı"
                    >

                    <input
                        class="tool-input"
                        id="wifiPassword"
                        placeholder="Wi-Fi şifrəsi"
                        type="password"
                    >

                    <button
                        class="tool-action"
                        onclick="generateWiFiQR()"
                    >
                        QR yarat
                    </button>

                </div>

                <div
                    class="tool-result"
                    id="wifiResult"
                >
                    QR burada görünəcək.
                </div>
            `;

            break;


        case "password":

            container.innerHTML = `
                <div class="tool-field">

                    <input
                        class="tool-input"
                        id="passwordLength"
                        type="number"
                        value="18"
                        min="6"
                        max="64"
                    >

                    <button
                        class="tool-action"
                        onclick="generateSecurePassword()"
                    >
                        Yarat
                    </button>

                </div>

                <div
                    class="tool-result"
                    id="passwordResult"
                >
                    —
                </div>
            `;

            break;


        case "hash":

            container.innerHTML = `
                <textarea
                    class="tool-textarea"
                    id="hashInput"
                    placeholder="Hash hesablamaq üçün mətn..."
                ></textarea>

                <button
                    class="tool-action"
                    onclick="generateHash()"
                >
                    SHA-256 hesabla
                </button>

                <div
                    class="tool-result"
                    id="hashResult"
                >
                    —
                </div>
            `;

            break;


        case "base64":

            container.innerHTML = `
                <textarea
                    class="tool-textarea"
                    id="base64Input"
                    placeholder="Mətn..."
                ></textarea>

                <div class="tool-field">

                    <button
                        class="tool-action"
                        onclick="encodeBase64()"
                    >
                        Encode
                    </button>

                    <button
                        class="tool-action"
                        onclick="decodeBase64()"
                    >
                        Decode
                    </button>

                </div>

                <div
                    class="tool-result"
                    id="base64Result"
                >
                    —
                </div>
            `;

            break;


        case "strength":

            container.innerHTML = `
                <input
                    class="tool-input"
                    id="strengthInput"
                    type="password"
                    placeholder="Şifrəni yaz..."
                    oninput="checkPasswordStrength()"
                >

                <div
                    class="tool-result"
                    id="strengthResult"
                >
                    Şifrə daxil edin.
                </div>
            `;

            break;


        case "json":

            container.innerHTML = `
                <textarea
                    class="tool-textarea"
                    id="jsonInput"
                    placeholder='{"name":"NEXUS","version":4}'
                ></textarea>

                <button
                    class="tool-action"
                    onclick="formatJSON()"
                >
                    Formatla
                </button>

                <div
                    class="tool-result"
                    id="jsonResult"
                >
                    —
                </div>
            `;

            break;


        case "code":

            container.innerHTML = `
                <textarea
                    class="tool-textarea"
                    id="codePad"
                    placeholder="// Kodunu burada yaza bilərsən..."
                    style="min-height:300px;font-family:monospace;"
                ></textarea>

                <button
                    class="tool-action"
                    onclick="copyCode()"
                >
                    Kopyala
                </button>
            `;

            break;


        case "regex":

            container.innerHTML = `
                <input
                    class="tool-input"
                    id="regexPattern"
                    placeholder="Regex nümunəsi"
                >

                <textarea
                    class="tool-textarea"
                    id="regexText"
                    placeholder="Test ediləcək mətn..."
                ></textarea>

                <button
                    class="tool-action"
                    onclick="testRegex()"
                >
                    Test et
                </button>

                <div
                    class="tool-result"
                    id="regexResult"
                >
                    —
                </div>
            `;

            break;


        case "urlencode":

            container.innerHTML = `
                <textarea
                    class="tool-textarea"
                    id="urlEncodeInput"
                    placeholder="Mətn və ya URL..."
                ></textarea>

                <div class="tool-field">

                    <button
                        class="tool-action"
                        onclick="encodeURL()"
                    >
                        Encode
                    </button>

                    <button
                        class="tool-action"
                        onclick="decodeURL()"
                    >
                        Decode
                    </button>

                </div>

                <div
                    class="tool-result"
                    id="urlEncodeResult"
                >
                    —
                </div>
            `;

            break;


        case "terminal":

            container.innerHTML = `
                <div
                    class="tool-result"
                    id="terminalOutput"
                    style="min-height:250px;background:#05070c;"
                >
                    NEXUS Terminal v4.0<br>
                    Type "help" for commands.<br><br>
                    nexus@az:~$
                    <input
                        id="terminalInput"
                        style="
                            background:transparent;
                            border:0;
                            outline:0;
                            color:#8df2d1;
                            width:70%;
                            font-family:monospace;
                        "
                        autocomplete="off"
                    >
                </div>
            `;

            $("#terminalInput").addEventListener(
                "keydown",
                terminalCommand
            );

            break;


        case "timestamp":

            container.innerHTML = `
                <div class="tool-field">

                    <button
                        class="tool-action"
                        onclick="currentTimestamp()"
                    >
                        İndiki timestamp
                    </button>

                    <input
                        class="tool-input"
                        id="timestampInput"
                        placeholder="Unix timestamp"
                    >

                    <button
                        class="tool-action"
                        onclick="convertTimestamp()"
                    >
                        Çevir
                    </button>

                </div>

                <div
                    class="tool-result"
                    id="timestampResult"
                >
                    —
                </div>
            `;

            break;


        case "map":

            container.innerHTML = `
                <div
                    style="
                        border-radius:14px;
                        overflow:hidden;
                        border:1px solid rgba(255,255,255,.08);
                    "
                >
                    <iframe
                        src="https://www.openstreetmap.org/export/embed.html"
                        style="
                            width:100%;
                            height:450px;
                            border:0;
                        "
                    ></iframe>
                </div>
            `;

            break;


        case "navigator":

            container.innerHTML = `
                <input
                    class="tool-input"
                    id="navigationInput"
                    placeholder="Hara getmək istəyirsən?"
                >

                <button
                    class="tool-action"
                    onclick="navigateToPlace()"
                    style="margin-top:10px;"
                >
                    Naviqasiyanı aç
                </button>
            `;

            break;


        case "worldclock":

            renderWorldClock(container);

            break;


        case "location":

            container.innerHTML = `
                <button
                    class="tool-action"
                    onclick="getLocation()"
                >
                    Mövqeyimi müəyyən et
                </button>

                <div
                    class="tool-result"
                    id="locationResult"
                    style="margin-top:12px;"
                >
                    İcazə gözlənilir.
                </div>
            `;

            break;


        case "music":

            container.innerHTML = `
                <div class="tool-result">

                    <strong>NEXUS Music</strong>

                    <br><br>

                    🎵 Azərbaycan Pop<br>
                    🎤 Azərbaycan Rap<br>
                    🎧 Türk Pop<br>
                    🔥 Türk Rap<br><br>

                    <small>
                        Qeyd: müəllif hüquqları səbəbilə
                        musiqi faylları bu frontend-ə yerləşdirilmir.
                    </small>

                </div>

                <div class="tool-field">

                    <button
                        class="tool-action"
                        onclick="searchMusic('Azərbaycan pop')"
                    >
                        Azərbaycan Pop
                    </button>

                    <button
                        class="tool-action"
                        onclick="searchMusic('Türk pop')"
                    >
                        Türk Pop
                    </button>

                    <button
                        class="tool-action"
                        onclick="searchMusic('Azərbaycan rap')"
                    >
                        Azərbaycan Rap
                    </button>

                    <button
                        class="tool-action"
                        onclick="searchMusic('Türk rap')"
                    >
                        Türk Rap
                    </button>

                </div>
            `;

            break;


        case "audio":

            container.innerHTML = `
                <input
                    type="file"
                    id="audioFile"
                    accept="audio/*"
                    class="tool-input"
                >

                <audio
                    id="audioPlayer"
                    controls
                    style="width:100%;margin-top:15px;"
                ></audio>
            `;

            $("#audioFile").addEventListener("change", event => {

                const file = event.target.files[0];

                if (!file) return;

                $("#audioPlayer").src =
                    URL.createObjectURL(file);

            });

            break;


        case "youtube":

            container.innerHTML = `
                <input
                    class="tool-input"
                    id="youtubeInput"
                    placeholder="Musiqi, video və ya mövzu..."
                >

                <button
                    class="tool-action"
                    onclick="youtubeSearch()"
                    style="margin-top:10px;"
                >
                    YouTube-da axtar
                </button>
            `;

            break;


        case "calculator":

            renderCalculator(container);

            break;


        case "qr":

            container.innerHTML = `
                <input
                    class="tool-input"
                    id="qrInput"
                    placeholder="Link və ya mətn..."
                >

                <button
                    class="tool-action"
                    onclick="generateQRReal()"
                    style="margin-top:10px;"
                >
                    QR yarat
                </button>

                <div
                    id="qrResult"
                    style="margin-top:20px;text-align:center;"
                ></div>
            `;

            break;


        case "notes":

            container.innerHTML = `
                <textarea
                    class="tool-textarea"
                    id="notesInput"
                    placeholder="Qeydlərini yaz..."
                    style="min-height:350px;"
                ></textarea>

                <button
                    class="tool-action"
                    onclick="downloadNotes()"
                >
                    TXT kimi saxla
                </button>
            `;

            break;


        case "wordcount":

            container.innerHTML = `
                <textarea
                    class="tool-textarea"
                    id="wordInput"
                    placeholder="Mətni buraya yaz..."
                    oninput="countWords()"
                ></textarea>

                <div
                    class="tool-result"
                    id="wordResult"
                >
                    0 söz · 0 simvol
                </div>
            `;

            break;


        case "percent":

            container.innerHTML = `
                <div class="tool-field">

                    <input
                        class="tool-input"
                        id="percentNumber"
                        type="number"
                        placeholder="Məbləğ"
                    >

                    <input
                        class="tool-input"
                        id="percentValue"
                        type="number"
                        placeholder="Faiz"
                    >

                    <button
                        class="tool-action"
                        onclick="calculatePercent()"
                    >
                        Hesabla
                    </button>

                </div>

                <div
                    class="tool-result"
                    id="percentResult"
                >
                    —
                </div>
            `;

            break;


        case "datediff":

            container.innerHTML = `
                <div class="tool-field">

                    <input
                        class="tool-input"
                        id="dateOne"
                        type="date"
                    >

                    <input
                        class="tool-input"
                        id="dateTwo"
                        type="date"
                    >

                    <button
                        class="tool-action"
                        onclick="calculateDateDifference()"
                    >
                        Hesabla
                    </button>

                </div>

                <div
                    class="tool-result"
                    id="dateResult"
                >
                    —
                </div>
            `;

            break;


        case "device":

            container.innerHTML = `
                <div class="tool-result">
                    ${getDeviceInfo()}
                </div>
            `;

            break;


        case "screen":

            container.innerHTML = `
                <div class="tool-result">
                    Ekran:
                    ${screen.width} × ${screen.height}

                    <br><br>

                    Pəncərə:
                    ${window.innerWidth} × ${window.innerHeight}

                    <br><br>

                    Pixel Ratio:
                    ${window.devicePixelRatio}
                </div>
            `;

            break;


        case "browser":

            container.innerHTML = `
                <div class="tool-result">
                    ${escapeHTML(navigator.userAgent)}
                </div>
            `;

            break;


        case "storage":

            container.innerHTML = `
                <div class="tool-result">
                    Local Storage elementləri:
                    ${localStorage.length}

                    <br><br>

                    Session Storage elementləri:
                    ${sessionStorage.length}
                </div>
            `;

            break;

    }

}


/* =========================================================
   IP
========================================================= */

async function fetchIP() {

    const result = $("#ipResult");

    if (!result) return;

    try {

        const response =
            await fetch("https://api.ipify.org?format=json");

        const data = await response.json();

        result.textContent =
            `İctimai IP ünvanınız: ${data.ip}`;

    } catch {

        result.textContent =
            "IP məlumatını əldə etmək mümkün olmadı.";

    }

}


/* =========================================================
   DNS
========================================================= */

async function checkDNS() {

    const domain =
        $("#dnsInput").value.trim();

    const result =
        $("#dnsResult");

    if (!domain) {
        result.textContent = "Domen daxil edin.";
        return;
    }

    try {

        const response =
            await fetch(
                `https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=A`
            );

        const data = await response.json();

        if (!data.Answer) {

            result.textContent =
                "A qeydiyyatı tapılmadı.";

            return;
        }

        result.textContent =
            data.Answer
                .map(item => item.data)
                .join("\n");

    } catch {

        result.textContent =
            "DNS sorğusu uğursuz oldu.";

    }

}


/* =========================================================
   URL ANALYZER
========================================================= */

function analyzeURLTool() {

    const input =
        $("#urlToolInput").value.trim();

    const result =
        $("#urlToolResult");

    try {

        const url = new URL(input);

        result.textContent =
`Protocol: ${url.protocol}
Host: ${url.host}
Hostname: ${url.hostname}
Port: ${url.port || "default"}
Path: ${url.pathname}
Query: ${url.search || "none"}
Hash: ${url.hash || "none"}`;

    } catch {

        result.textContent =
            "Düzgün URL daxil edin.";

    }

}


/* =========================================================
   PING
========================================================= */

async function runPing() {

    const input =
        $("#pingInput").value.trim();

    const result =
        $("#pingResult");

    if (!input) return;

    const start = performance.now();

    try {

        await fetch(
            input,
            {
                mode: "no-cors",
                cache: "no-store"
            }
        );

        const latency =
            Math.round(performance.now() - start);

        result.textContent =
            `Sorğu tamamlandı. Təxmini brauzer gecikməsi: ${latency} ms`;

    } catch {

        result.textContent =
            "Sorğu göndərilə bilmədi. CORS və ya sayt məhdudiyyəti ola bilər.";

    }

}


/* =========================================================
   PASSWORD
========================================================= */

function generateSecurePassword() {

    const length =
        Math.min(
            64,
            Math.max(
                6,
                Number($("#passwordLength").value) || 18
            )
        );

    const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*_-+=";

    const array =
        new Uint32Array(length);

    crypto.getRandomValues(array);

    let password = "";

    for (let i = 0; i < length; i++) {

        password +=
            chars[array[i] % chars.length];

    }

    $("#passwordResult").textContent =
        password;

}


/* =========================================================
   HASH
========================================================= */

async function generateHash() {

    const text =
        $("#hashInput").value;

    const result =
        $("#hashResult");

    const bytes =
        new TextEncoder().encode(text);

    const hash =
        await crypto.subtle.digest(
            "SHA-256",
            bytes
        );

    const hashArray =
        Array.from(new Uint8Array(hash));

    result.textContent =
        hashArray
            .map(byte => byte.toString(16).padStart(2, "0"))
            .join("");

}


/* =========================================================
   BASE64
========================================================= */

function encodeBase64() {

    const text =
        $("#base64Input").value;

    try {

        $("#base64Result").textContent =
            btoa(
                unescape(
                    encodeURIComponent(text)
                )
            );

    } catch {

        $("#base64Result").textContent =
            "Encode xətası.";

    }

}


function decodeBase64() {

    const text =
        $("#base64Input").value;

    try {

        $("#base64Result").textContent =
            decodeURIComponent(
                escape(
                    atob(text)
                )
            );

    } catch {

        $("#base64Result").textContent =
            "Düzgün Base64 məlumatı daxil edin.";

    }

}


/* =========================================================
   PASSWORD STRENGTH
========================================================= */

function checkPasswordStrength() {

    const password =
        $("#strengthInput").value;

    let score = 0;

    if (password.length >= 8) score++;

    if (password.length >= 12) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[a-z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    let text = "";

    if (score <= 2) {
        text = "Zəif";
    } else if (score <= 4) {
        text = "Orta";
    } else {
        text = "Güclü";
    }

    $("#strengthResult").textContent =
        `${text} — ${score}/6`;

}


/* =========================================================
   JSON
========================================================= */

function formatJSON() {

    const input =
        $("#jsonInput").value;

    try {

        const object =
            JSON.parse(input);

        $("#jsonResult").textContent =
            JSON.stringify(
                object,
                null,
                2
            );

    } catch (error) {

        $("#jsonResult").textContent =
            "JSON xətası: " + error.message;

    }

}


/* =========================================================
   CODE PAD
========================================================= */

async function copyCode() {

    const code =
        $("#codePad").value;

    await navigator.clipboard.writeText(code);

    showToast("Kod kopyalandı.");

}


/* =========================================================
   REGEX
========================================================= */

function testRegex() {

    const pattern =
        $("#regexPattern").value;

    const text =
        $("#regexText").value;

    try {

        const regex =
            new RegExp(pattern, "g");

        const matches =
            text.match(regex);

        $("#regexResult").textContent =
            matches
                ? `Tapıldı (${matches.length}):\n${matches.join("\n")}`
                : "Heç bir uyğunluq tapılmadı.";

    } catch {

        $("#regexResult").textContent =
            "Regex sintaksisində xəta var.";

    }

}


/* =========================================================
   URL ENCODE
========================================================= */

function encodeURL() {

    $("#urlEncodeResult").textContent =
        encodeURIComponent(
            $("#urlEncodeInput").value
        );

}


function decodeURL() {

    try {

        $("#urlEncodeResult").textContent =
            decodeURIComponent(
                $("#urlEncodeInput").value
            );

    } catch {

        $("#urlEncodeResult").textContent =
            "Decode xətası.";

    }

}


/* =========================================================
   TERMINAL
========================================================= */

function terminalCommand(event) {

    if (event.key !== "Enter") return;

    const input =
        event.target;

    const command =
        input.value.trim().toLowerCase();

    const output =
        $("#terminalOutput");

    const line =
        document.createElement("div");

    line.style.color = "#8df2d1";

    line.textContent =
        `nexus@az:~$ ${command}`;

    output.insertBefore(
        line,
        input.parentElement
    );

    let response = "";

    if (command === "help") {

        response =
`help      — əmrləri göstər
clear     — ekranı təmizlə
date      — tarix və saat
whoami    — istifadəçi məlumatı
status    — sistem statusu
about     — NEXUS haqqında`;

    } else if (command === "clear") {

        output.innerHTML = "";

        return;

    } else if (command === "date") {

        response =
            new Date().toLocaleString("az-AZ");

    } else if (command === "whoami") {

        response =
            "guest@nexus-az";

    } else if (command === "status") {

        response =
            "NETWORK: ONLINE\nSYSTEM: STABLE\nNEXUS: READY";

    } else if (command === "about") {

        response =
            "NEXUS // AZ — Digital Command Center v4.0";

    } else {

        response =
            `command not found: ${command}`;

    }

    const responseElement =
        document.createElement("div");

    responseElement.style.color =
        "#7d8aa3";

    responseElement.style.whiteSpace =
        "pre-wrap";

    responseElement.textContent =
        response;

    output.insertBefore(
        responseElement,
        input.parentElement
    );

    input.value = "";

}


/* =========================================================
   TIMESTAMP
========================================================= */

function currentTimestamp() {

    const timestamp =
        Math.floor(Date.now() / 1000);

    $("#timestampResult").textContent =
        timestamp;

}


function convertTimestamp() {

    const timestamp =
        Number(
            $("#timestampInput").value
        );

    if (!timestamp) return;

    const date =
        new Date(timestamp * 1000);

    $("#timestampResult").textContent =
        date.toLocaleString("az-AZ");

}


/* =========================================================
   WORLD CLOCK
========================================================= */

function renderWorldClock(container) {

    const cities = [

        ["Bakı", "Asia/Baku"],

        ["İstanbul", "Europe/Istanbul"],

        ["London", "Europe/London"],

        ["New York", "America/New_York"],

        ["Tokyo", "Asia/Tokyo"],

        ["Dubai", "Asia/Dubai"]

    ];

    container.innerHTML =
        cities.map(city => {

            const time =
                new Intl.DateTimeFormat(
                    "az-AZ",
                    {
                        timeZone: city[1],
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                ).format(new Date());

            return `
                <div
                    class="tool-result"
                    style="margin-bottom:8px;"
                >
                    ${city[0]}
                    <strong style="float:right;">
                        ${time}
                    </strong>
                </div>
            `;

        }).join("");

}


/* =========================================================
   NAVIGATION
========================================================= */

function navigateToPlace() {

    const place =
        $("#navigationInput").value.trim();

    if (!place) {

        showToast("Məkan daxil et.");

        return;
    }

    window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place)}`,
        "_blank"
    );

}


/* =========================================================
   LOCATION
========================================================= */

function getLocation() {

    const result =
        $("#locationResult");

    if (!navigator.geolocation) {

        result.textContent =
            "Brauzer geolokasiyanı dəstəkləmir.";

        return;
    }

    navigator.geolocation.getCurrentPosition(

        position => {

            const lat =
                position.coords.latitude;

            const lon =
                position.coords.longitude;

            result.innerHTML =
                `
                Latitude: ${lat}
                <br>
                Longitude: ${lon}
                <br><br>
                <a
                    href="https://www.google.com/maps?q=${lat},${lon}"
                    target="_blank"
                    style="color:#9da8ff;"
                >
                    Xəritədə aç →
                </a>
                `;

        },

        () => {

            result.textContent =
                "Mövqe icazəsi verilmədi.";

        }

    );

}


/* =========================================================
   MUSIC SEARCH
========================================================= */

function searchMusic(query) {

    window.open(
        `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`,
        "_blank"
    );

}


/* =========================================================
   YOUTUBE
========================================================= */

function youtubeSearch() {

    const query =
        $("#youtubeInput").value.trim();

    if (!query) return;

    searchMusic(query);

}


/* =========================================================
   QR
========================================================= */

function generateQRReal() {

    const text =
        $("#qrInput").value.trim();

    const result =
        $("#qrResult");

    if (!text) {

        result.textContent =
            "Mətn və ya link daxil et.";

        return;

    }

    const img =
        document.createElement("img");

    img.src =
        `https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(text)}`;

    img.alt = "QR kod";

    img.style.width = "240px";

    result.innerHTML = "";

    result.appendChild(img);

}


/* =========================================================
   WIFI QR
========================================================= */

function generateWiFiQR() {

    const ssid =
        $("#wifiName").value.trim();

    const password =
        $("#wifiPassword").value;

    if (!ssid) return;

    const data =
        `WIFI:T:WPA;S:${ssid};P:${password};;`;

    $("#wifiResult").innerHTML =
        `
        <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(data)}"
            style="width:240px;background:white;padding:8px;border-radius:8px;"
            alt="Wi-Fi QR"
        >
        `;

}


/* =========================================================
   CALCULATOR
========================================================= */

function renderCalculator(container) {

    container.innerHTML = `
        <input
            class="tool-input"
            id="calcInput"
            placeholder="Məsələn: (25*4)+100/2"
        >

        <button
            class="tool-action"
            onclick="calculateExpression()"
            style="margin-top:10px;"
        >
            Hesabla
        </button>

        <div
            class="tool-result"
            id="calcResult"
            style="margin-top:12px;"
        >
            —
        </div>
    `;

}


function calculateExpression() {

    const input =
        $("#calcInput").value.trim();

    const result =
        $("#calcResult");

    if (!input) return;

    /*
       Sadə riyazi ifadələr üçün.
       Hərf və təhlükəli simvollar bloklanır.
    */

    if (!/^[0-9+\-*/().%\s]+$/.test(input)) {

        result.textContent =
            "Yalnız riyazi simvollardan istifadə et.";

        return;

    }

    try {

        const answer =
            Function(
                `"use strict"; return (${input})`
            )();

        result.textContent =
            String(answer);

    } catch {

        result.textContent =
            "İfadə düzgün deyil.";

    }

}


/* =========================================================
   NOTES
========================================================= */

function downloadNotes() {

    const text =
        $("#notesInput").value;

    const blob =
        new Blob(
            [text],
            {
                type: "text/plain;charset=utf-8"
            }
        );

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download =
        "nexus-notes.txt";

    a.click();

    URL.revokeObjectURL(url);

}


/* =========================================================
   WORD COUNT
========================================================= */

function countWords() {

    const text =
        $("#wordInput").value;

    const words =
        text.trim()
            ? text.trim().split(/\s+/).length
            : 0;

    const chars =
        text.length;

    $("#wordResult").textContent =
        `${words} söz · ${chars} simvol`;

}


/* =========================================================
   PERCENT
========================================================= */

function calculatePercent() {

    const number =
        Number($("#percentNumber").value);

    const percent =
        Number($("#percentValue").value);

    if (
        Number.isNaN(number) ||
        Number.isNaN(percent)
    ) return;

    const result =
        number * percent / 100;

    $("#percentResult").textContent =
        `${percent}% = ${result}`;

}


/* =========================================================
   DATE DIFFERENCE
========================================================= */

function calculateDateDifference() {

    const one =
        new Date($("#dateOne").value);

    const two =
        new Date($("#dateTwo").value);

    if (
        Number.isNaN(one.getTime()) ||
        Number.isNaN(two.getTime())
    ) return;

    const difference =
        Math.abs(
            two - one
        );

    const days =
        Math.round(
            difference /
            (1000 * 60 * 60 * 24)
        );

    $("#dateResult").textContent =
        `${days} gün`;

}


/* =========================================================
   DEVICE
========================================================= */

function getDeviceInfo() {

    return `
Platform: ${escapeHTML(navigator.platform)}

Dil: ${escapeHTML(navigator.language)}

Online:
${navigator.onLine ? "Bəli" : "Xeyr"}

CPU nüvələri:
${navigator.hardwareConcurrency || "Məlum deyil"}

RAM:
${navigator.deviceMemory
    ? navigator.deviceMemory + " GB"
    : "Məlum deyil"}

Touch:
${navigator.maxTouchPoints || 0}
    `;

}


/* =========================================================
   SEARCH
========================================================= */

function getAllServices() {

    const list = [];

    Object.entries(categories).forEach(
        ([categoryKey, category]) => {

            category.services.forEach(service => {

                list.push({
                    ...service,
                    categoryKey,
                    categoryTitle: category.title
                });

            });

        }
    );

    return list;

}


function openSearch() {

    $("#searchModal").classList.add("active");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

        $("#searchInput").focus();

    }, 50);

    renderSearchResults("");

}


function renderSearchResults(query) {

    const results =
        $("#searchResults");

    const normalized =
        query.trim().toLowerCase();

    const services =
        getAllServices();

    const filtered =
        normalized
            ? services.filter(service =>
                (
                    service.title +
                    " " +
                    service.description +
                    " " +
                    service.categoryTitle
                )
                .toLowerCase()
                .includes(normalized)
            )
            : services.slice(0, 8);

    if (!filtered.length) {

        results.innerHTML =
            `
            <div
                style="
                    padding:25px;
                    color:#68748b;
                    text-align:center;
                    font-size:11px;
                "
            >
                Heç nə tapılmadı.
            </div>
            `;

        return;
    }

    results.innerHTML =
        filtered.map(service => {

            return `
                <button
                    class="search-result"
                    data-action="${escapeHTML(service.action)}"
                    data-title="${escapeHTML(service.title)}"
                    data-category="${escapeHTML(service.categoryTitle)}"
                >

                    <div class="search-result-icon">
                        ${escapeHTML(service.icon)}
                    </div>

                    <div>

                        <strong>
                            ${escapeHTML(service.title)}
                        </strong>

                        <small>
                            ${escapeHTML(service.categoryTitle)}
                        </small>

                    </div>

                </button>
            `;

        }).join("");


    $$(".search-result").forEach(button => {

        button.addEventListener(
            "click",
            () => {

                closeModal("searchModal");

                openTool(
                    button.dataset.action,
                    button.dataset.title,
                    button.dataset.category
                );

            }
        );

    });

}


/* Search button */

$("#openSearch").addEventListener(
    "click",
    openSearch
);

$("#quickSearch").addEventListener(
    "click",
    openSearch
);


/* Search typing */

$("#searchInput").addEventListener(
    "input",
    event => {

        renderSearchResults(
            event.target.value
        );

    }
);


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            (event.ctrlKey || event.metaKey) &&
            event.key.toLowerCase() === "k"
        ) {

            event.preventDefault();

            openSearch();

        }

        if (event.key === "Escape") {

            $$(".modal-overlay.active").forEach(
                modal => modal.classList.remove("active")
            );

            $("#aiModal").classList.remove("active");

            document.body.style.overflow = "";

        }

    }
);


/* =========================================================
   NEXUS AI UI
========================================================= */

$("#openAI").addEventListener(
    "click",
    () => {

        $("#aiModal").classList.add("active");

        document.body.style.overflow =
            "hidden";

        setTimeout(
            () => $("#aiInput").focus(),
            100
        );

    }
);


/* =========================================================
   AI DEMO
========================================================= */

$("#aiForm").addEventListener(
    "submit",
    event => {

        event.preventDefault();

        const input =
            $("#aiInput");

        const message =
            input.value.trim();

        if (!message) return;

        addAIMessage(
            message,
            "user"
        );

        input.value = "";

        /*
          Hazırda frontend demo cavabıdır.
          Real AI üçün sonrakı mərhələdə
          təhlükəsiz backend/API bağlantısı əlavə olunacaq.
        */

        setTimeout(
            () => {

                addAIMessage(
                    getDemoAIResponse(message),
                    "bot"
                );

            },
            500
        );

    }
);


function addAIMessage(text, type) {

    const container =
        $("#aiMessages");

    const message =
        document.createElement("div");

    message.className =
        `ai-message ${type}`;

    message.innerHTML =
        `
        <small>
            ${type === "bot" ? "NEXUS AI" : "SƏN"}
        </small>

        <p>
            ${escapeHTML(text)}
        </p>
        `;

    container.appendChild(message);

    container.scrollTop =
        container.scrollHeight;

}


function getDemoAIResponse(message) {

    const text =
        message.toLowerCase();

    if (
        text.includes("salam") ||
        text.includes("hello")
    ) {

        return "Salam! NEXUS AI hazırdır. Mənə sualını ver.";

    }

    if (
        text.includes("nexus")
    ) {

        return "NEXUS // AZ rəqəmsal alətləri bir mərkəzdə birləşdirən dashboard sistemidir.";

    }

    if (
        text.includes("kömək") ||
        text.includes("yardım")
    ) {

        return "Əlbəttə. Sualını və ya etmək istədiyin işi yaz, birlikdə baxaq.";

    }

    return "Sualını qəbul etdim. Real AI backend bağlantısı aktivləşdirildikdə burada tam süni intellekt cavabı veriləcək.";

}


/* =========================================================
   ONLINE STATUS
========================================================= */

window.addEventListener(
    "online",
    () => showToast("İnternet bağlantısı bərpa edildi.")
);

window.addEventListener(
    "offline",
    () => showToast("İnternet bağlantısı kəsildi.")
);


/* =========================================================
   STARTUP
========================================================= */

console.log(
    "%c NEXUS // AZ v4.0 ",
    "background:#11172b;color:#9da8ff;padding:8px;border-radius:5px;"
);

console.log(
    "Digital Command Center initialized."
);
