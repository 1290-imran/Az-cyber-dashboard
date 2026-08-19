/* =========================================================
   NEXUS // AZ
   SYSTEM v4.2
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

    AI_WORKER_URL:
        "https://nexus-ai.imranvelizade98.workers.dev/",

    SEARCH_URL:
        "https://www.google.com/search?q=",

    SPEEDTEST_URL:
        "https://www.speedtest.net/",

    IP_URL:
        "https://whatismyipaddress.com/",

    DNS_URL:
        "https://www.dnsleaktest.com/"

};


/* =========================================================
   STATE
========================================================= */

let currentCategory = null;

let conversationHistory = [];

let calculatorExpression = "";

let excelRows = 8;

let excelColumns = 8;


/* =========================================================
   HELPERS
========================================================= */

const $ = selector =>
    document.querySelector(selector);


const $$ = selector =>
    document.querySelectorAll(selector);


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initLoader();

        initClock();

        initCategories();

        initModal();

        initSearch();

        initAI();

        initKeyboard();

        initHeroAI();

    }
);


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

    const loader =
        $("#loader");

    if (!loader) return;

    window.setTimeout(
        () => {

            loader.classList.add(
                "hidden"
            );

        },
        900
    );

}


/* =========================================================
   LOCAL CLOCK
========================================================= */

function initClock() {

    const clock =
        $("#clock");

    const date =
        $("#date");

    if (!clock) return;


    function updateClock() {

        const now =
            new Date();


        clock.textContent =
            new Intl.DateTimeFormat(
                "az-AZ",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            ).format(now);


        if (date) {

            date.textContent =
                new Intl.DateTimeFormat(
                    "az-AZ",
                    {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                ).format(now);

        }

    }


    updateClock();


    window.setInterval(
        updateClock,
        1000
    );

}


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [

    {
        id: "internet",
        icon: "◉",
        title: "İnternet",
        description:
            "Axtarış, sürət və bağlantı alətləri"
    },

    {
        id: "office",
        icon: "▣",
        title: "Ofis",
        description:
            "Word, Excel və sənəd alətləri"
    },

    {
        id: "world",
        icon: "◎",
        title: "Dünya",
        description:
            "Paytaxtlar, saatlar və dünya məlumatları"
    },

    {
        id: "media",
        icon: "▶",
        title: "Media",
        description:
            "Video, musiqi və multimedia"
    },

    {
        id: "security",
        icon: "◇",
        title: "Təhlükəsizlik",
        description:
            "Təhlükəsizlik və yoxlama alətləri"
    },

    {
        id: "developer",
        icon: "</>",
        title: "Developer",
        description:
            "Kodlaşdırma və developer alətləri"
    },

    {
        id: "tools",
        icon: "✣",
        title: "Alətlər",
        description:
            "Gündəlik faydalı alətlər"
    },

    {
        id: "ai",
        icon: "✦",
        title: "AI",
        description:
            "Süni intellekt alətləri"
    }

];


/* =========================================================
   INIT CATEGORIES
========================================================= */

function initCategories() {

    const container =
        $("#categories");

    if (!container) return;


    container.innerHTML = "";


    categories.forEach(
        category => {

            const card =
                document.createElement(
                    "button"
                );


            card.type =
                "button";


            card.className =
                "category-card";


            card.dataset.category =
                category.id;


            card.innerHTML = `

                <div class="category-icon">
                    ${category.icon}
                </div>

                <div class="category-info">

                    <strong>
                        ${escapeHTML(category.title)}
                    </strong>

                    <span>
                        ${escapeHTML(category.description)}
                    </span>

                </div>

                <b class="category-arrow">
                    →
                </b>

            `;


            card.addEventListener(
                "click",
                () => {

                    selectCategory(
                        category.id
                    );

                }
            );


            container.appendChild(
                card
            );

        }
    );


    /*
       İlk kateqoriya.
       Burada səhifə aşağı sürüşdürülmür.
    */

    selectCategory(
        "internet",
        false
    );

}


/* =========================================================
   MODULE DATA
========================================================= */

const modules = {


    /* =====================================================
       INTERNET
    ===================================================== */

    internet: [

        {
            icon: "⌕",
            title: "Google",
            description:
                "İnternetdə qlobal axtarış",
            action:
                () => openExternal(
                    "https://www.google.com/"
                )
        },

        {
            icon: "⚡",
            title: "Speed Test",
            description:
                "İnternet sürətini real olaraq yoxla",
            action:
                () => openExternal(
                    CONFIG.SPEEDTEST_URL
                )
        },

        {
            icon: "◉",
            title: "IP ünvanım",
            description:
                "İctimai IP ünvanını yoxla",
            action:
                () => openExternal(
                    CONFIG.IP_URL
                )
        },

        {
            icon: "⌁",
            title: "DNS Leak Test",
            description:
                "DNS sızmasını yoxla",
            action:
                () => openExternal(
                    CONFIG.DNS_URL
                )
        },

        {
            icon: "◎",
            title: "Google Maps",
            description:
                "Xəritədə axtarış və naviqasiya",
            action:
                () => openExternal(
                    "https://maps.google.com/"
                )
        },

        {
            icon: "✉",
            title: "Gmail",
            description:
                "Google e-poçt xidməti",
            action:
                () => openExternal(
                    "https://mail.google.com/"
                )
        },

        {
            icon: "☁",
            title: "Google Drive",
            description:
                "Bulud fayllarına giriş",
            action:
                () => openExternal(
                    "https://drive.google.com/"
                )
        },

        {
            icon: "◫",
            title: "Google Translate",
            description:
                "Mətn və dil tərcüməsi",
            action:
                () => openExternal(
                    "https://translate.google.com/"
                )
        }

    ],


    /* =====================================================
       OFFICE
    ===================================================== */

    office: [

        {
            icon: "W",
            title: "NEXUS Word",
            description:
                "Müasir brauzer sənəd redaktoru",
            action:
                () => openWord()
        },

        {
            icon: "X",
            title: "NEXUS Excel",
            description:
                "Cədvəl, formula və XLSX",
            action:
                () => openExcel()
        },

        {
            icon: "PDF",
            title: "PDF Tools",
            description:
                "PDF sənədləri ilə işləmək",
            action:
                () => openExternal(
                    "https://www.ilovepdf.com/"
                )
        },

        {
            icon: "G",
            title: "Google Docs",
            description:
                "Onlayn sənəd redaktoru",
            action:
                () => openExternal(
                    "https://docs.google.com/"
                )
        },

        {
            icon: "S",
            title: "Google Sheets",
            description:
                "Onlayn elektron cədvəl",
            action:
                () => openExternal(
                    "https://sheets.google.com/"
                )
        },

        {
            icon: "P",
            title: "Google Slides",
            description:
                "Onlayn təqdimat hazırlama",
            action:
                () => openExternal(
                    "https://slides.google.com/"
                )
        },

        {
            icon: "C",
            title: "Canva",
            description:
                "Dizayn və təqdimat",
            action:
                () => openExternal(
                    "https://www.canva.com/"
                )
        },

        {
            icon: "D",
            title: "Dropbox",
            description:
                "Fayl saxlama və paylaşma",
            action:
                () => openExternal(
                    "https://www.dropbox.com/"
                )
        }

    ],


    /* =====================================================
       WORLD
    ===================================================== */

    world: [

        {
            icon: "🇦🇿",
            title: "Bakı",
            description:
                "Azərbaycan • Paytaxt Bakı",
            timezone:
                "Asia/Baku"
        },

        {
            icon: "🇹🇷",
            title: "Ankara",
            description:
                "Türkiyə • Paytaxt Ankara",
            timezone:
                "Europe/Istanbul"
        },

        {
            icon: "🇬🇧",
            title: "London",
            description:
                "Böyük Britaniya • Paytaxt London",
            timezone:
                "Europe/London"
        },

        {
            icon: "🇺🇸",
            title: "Vaşinqton",
            description:
                "ABŞ • Paytaxt Vaşinqton",
            timezone:
                "America/New_York"
        },

        {
            icon: "🇩🇪",
            title: "Berlin",
            description:
                "Almaniya • Paytaxt Berlin",
            timezone:
                "Europe/Berlin"
        },

        {
            icon: "🇫🇷",
            title: "Paris",
            description:
                "Fransa • Paytaxt Paris",
            timezone:
                "Europe/Paris"
        },

        {
            icon: "🇯🇵",
            title: "Tokio",
            description:
                "Yaponiya • Paytaxt Tokio",
            timezone:
                "Asia/Tokyo"
        },

        {
            icon: "🇷🇺",
            title: "Moskva",
            description:
                "Rusiya • Paytaxt Moskva",
            timezone:
                "Europe/Moscow"
        }

    ],


    /* =====================================================
       MEDIA
    ===================================================== */

    media: [

        {
            icon: "▶",
            title: "YouTube",
            description:
                "Video və musiqi platforması",
            action:
                () => openExternal(
                    "https://www.youtube.com/"
                )
        },

        {
            icon: "♫",
            title: "YouTube Music",
            description:
                "Musiqi dinlə",
            action:
                () => openExternal(
                    "https://music.youtube.com/"
                )
        },

        {
            icon: "◉",
            title: "Spotify",
            description:
                "Musiqi və podkast",
            action:
                () => openExternal(
                    "https://open.spotify.com/"
                )
        },

        {
            icon: "N",
            title: "Netflix",
            description:
                "Film və serial platforması",
            action:
                () => openExternal(
                    "https://www.netflix.com/"
                )
        },

        {
            icon: "T",
            title: "TikTok",
            description:
                "Qısa videolar",
            action:
                () => openExternal(
                    "https://www.tiktok.com/"
                )
        },

        {
            icon: "M",
            title: "SoundCloud",
            description:
                "Musiqi və audio",
            action:
                () => openExternal(
                    "https://soundcloud.com/"
                )
        },

        {
            icon: "V",
            title: "VLC",
            description:
                "Multimedia player",
            action:
                () => openExternal(
                    "https://www.videolan.org/vlc/"
                )
        },

        {
            icon: "P",
            title: "Pinterest",
            description:
                "Vizual ideyalar",
            action:
                () => openExternal(
                    "https://www.pinterest.com/"
                )
        }

    ],


    /* =====================================================
       SECURITY
    ===================================================== */

    security: [

        {
            icon: "◆",
            title: "VirusTotal",
            description:
                "Fayl və link təhlükəsizliyini yoxla",
            action:
                () => openExternal(
                    "https://www.virustotal.com/"
                )
        },

        {
            icon: "◇",
            title: "Have I Been Pwned",
            description:
                "E-poçt məlumat sızmasını yoxla",
            action:
                () => openExternal(
                    "https://haveibeenpwned.com/"
                )
        },

        {
            icon: "⌁",
            title: "DNS Leak",
            description:
                "DNS təhlükəsizliyini yoxla",
            action:
                () => openExternal(
                    "https://www.dnsleaktest.com/"
                )
        },

        {
            icon: "◎",
            title: "SSL Labs",
            description:
                "SSL/TLS təhlükəsizlik analizi",
            action:
                () => openExternal(
                    "https://www.ssllabs.com/ssltest/"
                )
        },

        {
            icon: "IP",
            title: "IP Reputation",
            description:
                "IP reputasiyasını yoxla",
            action:
                () => openExternal(
                    "https://www.abuseipdb.com/"
                )
        },

        {
            icon: "🔐",
            title: "Password Check",
            description:
                "Parol təhlükəsizliyi haqqında məlumat",
            action:
                () => openExternal(
                    "https://password.kaspersky.com/"
                )
        },

        {
            icon: "🛡",
            title: "Cloudflare",
            description:
                "İnternet təhlükəsizliyi",
            action:
                () => openExternal(
                    "https://www.cloudflare.com/"
                )
        },

        {
            icon: "🔎",
            title: "URL Scan",
            description:
                "Şübhəli URL-ləri analiz et",
            action:
                () => openExternal(
                    "https://urlscan.io/"
                )
        }

    ],


    /* =====================================================
       DEVELOPER
    ===================================================== */

    developer: [

        {
            icon: "⌘",
            title: "GitHub",
            description:
                "Kod və layihələr",
            action:
                () => openExternal(
                    "https://github.com/"
                )
        },

        {
            icon: "</>",
            title: "JSON Formatter",
            description:
                "JSON formatla və yoxla",
            action:
                () => openExternal(
                    "https://jsonformatter.org/"
                )
        },

        {
            icon: "{}",
            title: "JSON Editor",
            description:
                "JSON məlumatlarını redaktə et",
            action:
                () => openExternal(
                    "https://jsoneditoronline.org/"
                )
        },

        {
            icon: "API",
            title: "Postman",
            description:
                "API test və development",
            action:
                () => openExternal(
                    "https://www.postman.com/"
                )
        },

        {
            icon: "N",
            title: "npm",
            description:
                "JavaScript paketləri",
            action:
                () => openExternal(
                    "https://www.npmjs.com/"
                )
        },

        {
            icon: "C",
            title: "CodePen",
            description:
                "Frontend kodlarını sına",
            action:
                () => openExternal(
                    "https://codepen.io/"
                )
        },

        {
            icon: "MD",
            title: "Markdown",
            description:
                "Markdown editor",
            action:
                () => openExternal(
                    "https://stackedit.io/"
                )
        },

        {
            icon: "⚙",
            title: "Regex",
            description:
                "Regular expression test",
            action:
                () => openExternal(
                    "https://regex101.com/"
                )
        }

    ],


    /* =====================================================
       TOOLS
    ===================================================== */

    tools: [

        {
            icon: "＋",
            title: "Kalkulyator",
            description:
                "iOS üslubunda professional kalkulyator",
            action:
                () => openCalculator()
        },

        {
            icon: "◷",
            title: "Dünya saatları",
            description:
                "Paytaxtların canlı vaxtı",
            action:
                () => openWorldClock()
        },

        {
            icon: "%",
            title: "Faiz kalkulyatoru",
            description:
                "Faiz hesablamaları",
            action:
                () => openPercentageCalculator()
        },

        {
            icon: "⌁",
            title: "QR Code",
            description:
                "QR kod yarat",
            action:
                () => openQRGenerator()
        },

        {
            icon: "↔",
            title: "Unit Converter",
            description:
                "Ölçü vahidlərini çevir",
            action:
                () => openExternal(
                    "https://www.unitconverters.net/"
                )
        },

        {
            icon: "📅",
            title: "Calendar",
            description:
                "Google Calendar",
            action:
                () => openExternal(
                    "https://calendar.google.com/"
                )
        },

        {
            icon: "📝",
            title: "Notepad",
            description:
                "Sürətli qeydlər",
            action:
                () => openNotepad()
        },

        {
            icon: "🔗",
            title: "URL Shortener",
            description:
                "Linkləri qısalt",
            action:
                () => openExternal(
                    "https://tinyurl.com/"
                )
        }

    ],


    /* =====================================================
       AI
    ===================================================== */

    ai: [

        {
            icon: "✦",
            title: "NEXUS AI",
            description:
                "Sənin şəxsi AI köməkçin",
            action:
                () => openAI()
        },

        {
            icon: "G",
            title: "Gemini",
            description:
                "Google AI",
            action:
                () => openExternal(
                    "https://gemini.google.com/"
                )
        },

        {
            icon: "C",
            title: "Claude",
            description:
                "AI assistant",
            action:
                () => openExternal(
                    "https://claude.ai/"
                )
        },

        {
            icon: "P",
            title: "Perplexity",
            description:
                "AI axtarış sistemi",
            action:
                () => openExternal(
                    "https://www.perplexity.ai/"
                )
        },

        {
            icon: "H",
            title: "Hugging Face",
            description:
                "AI modelləri və alətlər",
            action:
                () => openExternal(
                    "https://huggingface.co/"
                )
        },

        {
            icon: "O",
            title: "OpenAI",
            description:
                "AI texnologiyaları",
            action:
                () => openExternal(
                    "https://openai.com/"
                )
        },

        {
            icon: "A",
            title: "AI Studio",
            description:
                "AI development",
            action:
                () => openExternal(
                    "https://aistudio.google.com/"
                )
        },

        {
            icon: "✧",
            title: "NEXUS Chat",
            description:
                "NEXUS AI ilə söhbətə başla",
            action:
                () => openAI()
        }

    ]

};


/* =========================================================
   SELECT CATEGORY
========================================================= */

function selectCategory(
    id,
    shouldFocus = true
) {

    currentCategory =
        id;


    const container =
        $("#categoryServices");


    if (!container) {

        console.error(
            "categoryServices tapılmadı."
        );

        return;

    }


    const category =
        categories.find(
            item =>
                item.id === id
        );


    const selected =
        modules[id] || [];


    /*
       Aktiv kateqoriya
    */

    $$(".category-card")
        .forEach(card => {

            card.classList.toggle(
                "active",
                card.dataset.category === id
            );

        });


    /*
       Əvvəlki animasiyanı sıfırla
    */

    container.classList.remove(
        "category-services-visible"
    );


    /*
       Yeni xidmət paneli
    */

    container.innerHTML = `

        <div class="category-services-header">

            <div>

                <span>
                    XİDMƏTLƏR
                </span>

                <h3>
                    ${escapeHTML(
                        category?.title ||
                        "Kateqoriya"
                    )}
                </h3>

            </div>

            <div class="category-services-count">
                ${selected.length} ALƏT
            </div>

        </div>

        <div class="module-grid">

            ${selected.map(
                (item, index) =>
                    createModuleCard(
                        item,
                        index
                    )
            ).join("")}

        </div>

    `;


    /*
       Event-ləri bağla
    */

    container
        .querySelectorAll(
            ".module-card"
        )
        .forEach(
            (card, index) => {

                card.addEventListener(
                    "click",
                    () => {

                        const item =
                            selected[index];

                        if (!item) return;


                        if (
                            typeof item.action ===
                            "function"
                        ) {

                            item.action();

                            return;

                        }


                        if (
                            item.timezone
                        ) {

                            showTimezone(
                                item
                            );

                        }

                    }
                );

            }
        );


    /*
       Animasiya
    */

    requestAnimationFrame(
        () => {

            container.classList.add(
                "category-services-visible"
            );

        }
    );


    /*
       QƏTİYYƏN scrollIntoView yoxdur.

       Kateqoriyaya basanda səhifə aşağı
       atılmayacaq.
    */

}


/* =========================================================
   CREATE MODULE CARD
========================================================= */

function createModuleCard(
    item,
    index
) {

    return `

        <button
            type="button"
            class="module-card"
            style="animation-delay:${index * 45}ms"
        >

            <div class="module-icon">

                ${escapeHTML(
                    item.icon || "•"
                )}

            </div>

            <div class="module-info">

                <strong>
                    ${escapeHTML(
                        item.title
                    )}
                </strong>

                <span>
                    ${escapeHTML(
                        item.description
                    )}
                </span>

            </div>

            <b class="module-arrow">
                →
            </b>

        </button>

    `;

}


/* =========================================================
   MODAL
========================================================= */

function initModal() {

    const modal =
        $("#modal");

    const close =
        $("#closeModal");

    if (!modal) return;


    close?.addEventListener(
        "click",
        closeModal
    );


    modal.addEventListener(
        "click",
        event => {

            if (
                event.target === modal
            ) {

                closeModal();

            }

        }
    );

}


function openModal(
    content
) {

    const modal =
        $("#modal");

    const contentBox =
        $("#modalContent");

    if (
        !modal ||
        !contentBox
    ) return;


    contentBox.innerHTML =
        content;


    modal.classList.add(
        "open"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );


    document.body.classList.add(
        "modal-open"
    );

}


function closeModal() {

    const modal =
        $("#modal");

    if (!modal) return;


    modal.classList.remove(
        "open"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   WORD EDITOR
========================================================= */

function openWord() {

    openModal(`

        <div class="tool-window word-tool">

            <div class="tool-header">

                <div>

                    <small>
                        NEXUS OFFICE
                    </small>

                    <strong>
                        Word
                    </strong>

                </div>

                <div class="tool-actions">

                    <button
                        type="button"
                        onclick="wordCommand('bold')"
                    >
                        <b>B</b>
                    </button>

                    <button
                        type="button"
                        onclick="wordCommand('italic')"
                    >
                        <i>I</i>
                    </button>

                    <button
                        type="button"
                        onclick="wordCommand('underline')"
                    >
                        <u>U</u>
                    </button>

                    <button
                        type="button"
                        onclick="wordCommand('justifyLeft')"
                    >
                        ☰
                    </button>

                    <button
                        type="button"
                        onclick="wordCommand('justifyCenter')"
                    >
                        ≡
                    </button>

                    <button
                        type="button"
                        onclick="wordCommand('justifyRight')"
                    >
                        ≣
                    </button>

                    <button
                        type="button"
                        class="primary-tool-button"
                        onclick="downloadWord()"
                    >
                        DOCX YÜKLƏ
                    </button>

                </div>

            </div>


            <div class="word-ribbon">

                <label>
                    Şrift ölçüsü

                    <select
                        id="wordFontSize"
                        onchange="wordFontSize(this.value)"
                    >

                        <option value="14">
                            14
                        </option>

                        <option value="16">
                            16
                        </option>

                        <option value="18">
                            18
                        </option>

                        <option value="20">
                            20
                        </option>

                        <option value="24">
                            24
                        </option>

                        <option value="28">
                            28
                        </option>

                        <option value="32">
                            32
                        </option>

                    </select>

                </label>


                <label>

                    Format

                    <select
                        onchange="wordFormat(this.value)"
                    >

                        <option value="p">
                            Normal
                        </option>

                        <option value="h1">
                            Başlıq 1
                        </option>

                        <option value="h2">
                            Başlıq 2
                        </option>

                        <option value="blockquote">
                            Sitat
                        </option>

                    </select>

                </label>


                <button
                    type="button"
                    onclick="wordCommand('insertUnorderedList')"
                >
                    • Siyahı
                </button>

                <button
                    type="button"
                    onclick="wordCommand('insertOrderedList')"
                >
                    1. Siyahı
                </button>

            </div>


            <input
                id="wordTitle"
                class="word-title"
                value="Yeni sənəd"
                placeholder="Sənədin adı"
            >


            <div
                id="wordEditor"
                class="word-editor"
                contenteditable="true"
                spellcheck="true"
            >

                <h1>
                    Yeni sənəd
                </h1>

                <p>
                    Burada yazmağa başlayın...
                </p>

            </div>


            <div class="word-status">

                <span>
                    NEXUS Word
                </span>

                <span>
                    Sənəd redaktəyə hazırdır
                </span>

            </div>

        </div>

    `);


    const editor =
        $("#wordEditor");


    editor?.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "nexus_word_draft",
                editor.innerHTML
            );

        }
    );


    const saved =
        localStorage.getItem(
            "nexus_word_draft"
        );


    if (
        saved &&
        editor
    ) {

        editor.innerHTML =
            saved;

    }

}


/* =========================================================
   WORD COMMANDS
========================================================= */

function wordCommand(
    command
) {

    document.execCommand(
        command,
        false,
        null
    );

    $("#wordEditor")?.focus();

}


function wordFontSize(
    size
) {

    document.execCommand(
        "fontSize",
        false,
        "7"
    );


    const fonts =
        $("#wordEditor")
            ?.querySelectorAll(
                'font[size="7"]'
            );


    fonts?.forEach(
        font => {

            font.removeAttribute(
                "size"
            );

            font.style.fontSize =
                `${size}px`;

        }
    );

}


function wordFormat(
    format
) {

    document.execCommand(
        "formatBlock",
        false,
        format
    );

    $("#wordEditor")?.focus();

}


/* =========================================================
   DOWNLOAD WORD
========================================================= */

async function downloadWord() {

    const editor =
        $("#wordEditor");

    const titleInput =
        $("#wordTitle");


    if (!editor) {

        return;

    }


    const title =
        (
            titleInput?.value ||
            "NEXUS Sənəd"
        )
            .trim()
            .replace(
                /[\\/:*?"<>|]/g,
                "_"
            );


    /*
       DOCX kitabxanası
    */

    if (
        typeof docx ===
        "undefined"
    ) {

        alert(
            "DOCX mühərriki yüklənmədi."
        );

        return;

    }


    try {

        const {
            Document,
            Packer,
            Paragraph,
            TextRun,
            HeadingLevel
        } = docx;


        const text =
            editor.innerText
                .replace(
                    /\r/g,
                    ""
                );


        const paragraphs =
            text
                .split("\n")
                .map(
                    line =>
                        new Paragraph({

                            children: [

                                new TextRun({
                                    text: line
                                })

                            ]

                        })
                );


        const document =
            new Document({

                sections: [

                    {

                        children:
                            paragraphs

                    }

                ]

            });


        const blob =
            await Packer.toBlob(
                document
            );


        downloadBlob(
            blob,
            `${title || "NEXUS-Sened"}.docx`
        );


    } catch (error) {

        console.error(
            "WORD ERROR:",
            error
        );


        alert(
            "DOCX yaradılarkən xəta baş verdi."
        );

    }

}


/* =========================================================
   EXCEL
========================================================= */

function openExcel() {

    excelRows = 8;

    excelColumns = 8;


    openModal(`

        <div class="tool-window excel-tool">

            <div class="tool-header">

                <div>

                    <small>
                        NEXUS OFFICE
                    </small>

                    <strong>
                        Excel
                    </strong>

                </div>


                <div class="tool-actions">

                    <button
                        type="button"
                        onclick="addExcelRow()"
                    >
                        + SƏTİR
                    </button>

                    <button
                        type="button"
                        onclick="addExcelColumn()"
                    >
                        + SÜTUN
                    </button>

                    <button
                        type="button"
                        class="primary-tool-button"
                        onclick="downloadExcel()"
                    >
                        XLSX YÜKLƏ
                    </button>

                </div>

            </div>


            <div class="excel-formula-bar">

                <div class="excel-name-box">
                    A1
                </div>

                <div class="excel-fx">
                    fx
                </div>

                <input
                    id="excelFormula"
                    placeholder="Formula və ya dəyər..."
                >

            </div>


            <div class="excel-scroll">

                <table
                    id="excelTable"
                    class="excel-table"
                ></table>

            </div>


            <div class="excel-status">

                <span>
                    NEXUS Excel
                </span>

                <span>
                    XLSX
                </span>

            </div>

        </div>

    `);


    buildExcelTable();


    const formula =
        $("#excelFormula");


    formula?.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                applyExcelFormula();

            }

        }
    );

}


/* =========================================================
   BUILD EXCEL TABLE
========================================================= */

function buildExcelTable() {

    const table =
        $("#excelTable");

    if (!table) return;


    let html = `
        <thead>
            <tr>
                <th class="corner">
                    #
                </th>
    `;


    for (
        let column = 0;
        column < excelColumns;
        column++
    ) {

        html += `
            <th>
                ${excelColumnName(column)}
            </th>
        `;

    }


    html += `
            </tr>
        </thead>
        <tbody>
    `;


    for (
        let row = 0;
        row < excelRows;
        row++
    ) {

        html += `
            <tr>

                <th class="row-number">
                    ${row + 1}
                </th>
        `;


        for (
            let column = 0;
            column < excelColumns;
            column++
        ) {

            html += `

                <td
                    contenteditable="true"
                    data-row="${row}"
                    data-col="${column}"
                    data-cell="${excelColumnName(column)}${row + 1}"
                ></td>

            `;

        }


        html += `
            </tr>
        `;

    }


    html += `
        </tbody>
    `;


    table.innerHTML =
        html;


    /*
       Hüceyrə seçimi
    */

    table
        .querySelectorAll(
            "td[data-cell]"
        )
        .forEach(
            cell => {

                cell.addEventListener(
                    "focus",
                    () => {

                        updateExcelFormulaBar(
                            cell
                        );

                    }
                );


                cell.addEventListener(
                    "input",
                    () => {

                        updateExcelFormulaBar(
                            cell
                        );

                    }
                );


                cell.addEventListener(
                    "keydown",
                    event => {

                        if (
                            event.key ===
                            "Enter"
                        ) {

                            event.preventDefault();

                            const row =
                                Number(
                                    cell.dataset.row
                                );

                            const col =
                                Number(
                                    cell.dataset.col
                                );


                            const next =
                                table.querySelector(
                                    `td[data-row="${row + 1}"][data-col="${col}"]`
                                );


                            if (next) {

                                next.focus();

                            }

                        }

                    }
                );

            }
        );

}


/* =========================================================
   EXCEL COLUMN NAME
========================================================= */

function excelColumnName(
    number
) {

    let name = "";

    let n =
        number + 1;


    while (n > 0) {

        const remainder =
            (n - 1) % 26;


        name =
            String.fromCharCode(
                65 + remainder
            ) +
            name;


        n =
            Math.floor(
                (n - 1) / 26
            );

    }


    return name;

}


/* =========================================================
   EXCEL ROW
========================================================= */

function addExcelRow() {

    excelRows++;

    buildExcelTable();

}


/* =========================================================
   EXCEL COLUMN
========================================================= */

function addExcelColumn() {

    excelColumns++;

    buildExcelTable();

}


/* =========================================================
   EXCEL FORMULA BAR
========================================================= */

function updateExcelFormulaBar(
    cell
) {

    const formula =
        $("#excelFormula");

    if (!formula) return;


    formula.value =
        cell.textContent.trim();


    formula.dataset.cell =
        cell.dataset.cell;

}


function applyExcelFormula() {

    const formula =
        $("#excelFormula");

    const table =
        $("#excelTable");


    if (
        !formula ||
        !table
    ) return;


    const cellName =
        formula.dataset.cell;


    if (!cellName) return;


    const cell =
        table.querySelector(
            `td[data-cell="${cellName}"]`
        );


    if (!cell) return;


    cell.textContent =
        formula.value;


    formula.value =
        "";

}


/* =========================================================
   DOWNLOAD EXCEL
========================================================= */

function downloadExcel() {

    if (
        typeof XLSX ===
        "undefined"
    ) {

        alert(
            "Excel mühərriki yüklənmədi."
        );

        return;

    }


    const table =
        $("#excelTable");


    if (!table) return;


    try {

        const workbook =
            XLSX.utils.book_new();


        const worksheet =
            XLSX.utils.table_to_sheet(
                table
            );


        XLSX.utils.book_append_sheet(
            workbook,
            worksheet,
            "NEXUS"
        );


        XLSX.writeFile(
            workbook,
            "NEXUS-Excel.xlsx"
        );


    } catch (error) {

        console.error(
            "EXCEL ERROR:",
            error
        );


        alert(
            "Excel faylı yaradılarkən xəta baş verdi."
        );

    }

}


/* =========================================================
   IOS STYLE CALCULATOR
========================================================= */

function openCalculator() {

    calculatorExpression =
        "";


    openModal(`

        <div class="calculator ios-calculator">

            <div class="calculator-top">

                <small>
                    NEXUS CALCULATOR
                </small>

                <div
                    id="calcDisplay"
                    class="calc-display"
                >
                    0
                </div>

            </div>


            <div class="calc-buttons">

                <button
                    class="calc-function"
                    onclick="calcClear()"
                >
                    AC
                </button>

                <button
                    class="calc-function"
                    onclick="calcToggleSign()"
                >
                    +/−
                </button>

                <button
                    class="calc-function"
                    onclick="calcPercent()"
                >
                    %
                </button>

                <button
                    class="calc-operator"
                    onclick="calcInput('/')"
                >
                    ÷
                </button>


                <button
                    onclick="calcInput('7')"
                >
                    7
                </button>

                <button
                    onclick="calcInput('8')"
                >
                    8
                </button>

                <button
                    onclick="calcInput('9')"
                >
                    9
                </button>

                <button
                    class="calc-operator"
                    onclick="calcInput('*')"
                >
                    ×
                </button>


                <button
                    onclick="calcInput('4')"
                >
                    4
                </button>

                <button
                    onclick="calcInput('5')"
                >
                    5
                </button>

                <button
                    onclick="calcInput('6')"
                >
                    6
                </button>

                <button
                    class="calc-operator"
                    onclick="calcInput('-')"
                >
                    −
                </button>


                <button
                    onclick="calcInput('1')"
                >
                    1
                </button>

                <button
                    onclick="calcInput('2')"
                >
                    2
                </button>

                <button
                    onclick="calcInput('3')"
                >
                    3
                </button>

                <button
                    class="calc-operator"
                    onclick="calcInput('+')"
                >
                    +
                </button>


                <button
                    class="zero"
                    onclick="calcInput('0')"
                >
                    0
                </button>

                <button
                    onclick="calcInput('.')"
                >
                    .
                </button>

                <button
                    class="calc-equals"
                    onclick="calcEquals()"
                >
                    =
                </button>

            </div>

        </div>

    `);

}


function calcInput(
    value
) {

    /*
       Xəta vəziyyətindən çıx
    */

    if (
        calculatorExpression ===
        "ERROR"
    ) {

        calculatorExpression =
            "";

    }


    /*
       Operator təkrarlanmasının qarşısı
    */

    if (
        ["+", "-", "*", "/"]
            .includes(value)
    ) {

        if (
            !calculatorExpression
        ) {

            if (
                value !== "-"
            ) return;

        }


        if (
            /[+\-*/]$/.test(
                calculatorExpression
            )
        ) {

            calculatorExpression =
                calculatorExpression.slice(
                    0,
                    -1
                );

        }

    }


    /*
       Eyni expression-də iki decimal
    */

    if (
        value === "."
    ) {

        const parts =
            calculatorExpression.split(
                /[+\-*/]/
            );

        const last =
            parts[parts.length - 1];


        if (
            last.includes(".")
        ) return;

    }


    calculatorExpression +=
        value;


    updateCalcDisplay();

}


function calcClear() {

    calculatorExpression =
        "";

    updateCalcDisplay();

}


function calcDelete() {

    calculatorExpression =
        calculatorExpression.slice(
            0,
            -1
        );

    updateCalcDisplay();

}


function calcPercent() {

    const match =
        calculatorExpression.match(
            /(\d+(?:\.\d+)?)$/
        );


    if (!match) return;


    const number =
        Number(
            match[1]
        );


    calculatorExpression =
        calculatorExpression.slice(
            0,
            -match[1].length
        ) +
        String(
            number / 100
        );


    updateCalcDisplay();

}


function calcToggleSign() {

    if (
        !calculatorExpression
    ) return;


    const match =
        calculatorExpression.match(
            /(\d+(?:\.\d+)?)$/
        );


    if (!match) return;


    const number =
        match[1];


    const before =
        calculatorExpression.slice(
            0,
            -number.length
        );


    if (
        before.endsWith("-") &&
        (
            before.length === 1 ||
            /[+\-*/]$/.test(
                before.slice(
                    0,
                    -1
                )
            )
        )
    ) {

        calculatorExpression =
            before.slice(
                0,
                -1
            ) +
            number;

    } else {

        calculatorExpression =
            before +
            "-" +
            number;

    }


    updateCalcDisplay();

}


function calcEquals() {

    if (
        !calculatorExpression
    ) return;


    try {

        const expression =
            calculatorExpression;


        /*
           Yalnız riyazi simvollar
        */

        if (
            !/^[0-9+\-*/().\s]+$/
                .test(expression)
        ) {

            throw new Error();

        }


        const result =
            Function(
                `"use strict";return (${expression})`
            )();


        if (
            !Number.isFinite(
                result
            )
        ) {

            throw new Error();

        }


        calculatorExpression =
            String(
                Number(
                    result.toFixed(10)
                )
            );


        updateCalcDisplay();

    } catch {

        calculatorExpression =
            "ERROR";


        updateCalcDisplay();


        window.setTimeout(
            () => {

                calculatorExpression =
                    "";

                updateCalcDisplay();

            },
            900
        );

    }

}


function updateCalcDisplay() {

    const display =
        $("#calcDisplay");

    if (!display) return;


    if (
        calculatorExpression ===
        "ERROR"
    ) {

        display.textContent =
            "Error";

        return;

    }


    const expression =
        calculatorExpression ||
        "0";


    display.textContent =
        expression
            .replace(
                /\*/g,
                "×"
            )
            .replace(
                /\//g,
                "÷"
            );

}


/* =========================================================
   WORLD CLOCK
========================================================= */

function showTimezone(
    item
) {

    openModal(`

        <div class="world-clock-modal">

            <div class="country-big-icon">
                ${item.icon}
            </div>

            <small>
                PAYTAXT
            </small>

            <h2>
                ${escapeHTML(item.title)}
            </h2>

            <p>
                ${escapeHTML(item.description)}
            </p>

            <div
                class="world-clock-time"
                data-timezone="${escapeHTML(item.timezone)}"
            >
                --
            </div>

            <small>
                YERLİ VAXT
            </small>

        </div>

    `);


    updateWorldClock();

}


function openWorldClock() {

    const cities =
        modules.world;


    openModal(`

        <div class="world-clocks">

            <div class="world-clocks-heading">

                <small>
                    NEXUS WORLD
                </small>

                <h2>
                    Dünya saatları
                </h2>

                <p>
                    Paytaxtların canlı yerli vaxtı
                </p>

            </div>


            <div class="world-clock-grid">

                ${cities.map(
                    city => `

                    <div
                        class="world-clock-card"
                        data-timezone="${escapeHTML(city.timezone)}"
                    >

                        <div class="world-country-icon">
                            ${city.icon}
                        </div>

                        <strong>
                            ${escapeHTML(city.title)}
                        </strong>

                        <span>
                            ${escapeHTML(city.description)}
                        </span>

                        <b>
                            --
                        </b>

                    </div>

                `
                ).join("")}

            </div>

        </div>

    `);


    updateWorldClock();

}


function updateWorldClock() {

    $$
        (
            "[data-timezone]"
        )
        .forEach(
            element => {

                const timezone =
                    element.dataset.timezone;


                if (!timezone) return;


                try {

                    const time =
                        new Intl.DateTimeFormat(
                            "az-AZ",
                            {
                                timeZone:
                                    timezone,

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


                    if (
                        element.classList.contains(
                            "world-clock-card"
                        )
                    ) {

                        const clock =
                            element.querySelector(
                                "b"
                            );


                        if (clock) {

                            clock.textContent =
                                time;

                        }

                    } else {

                        element.textContent =
                            time;

                    }

                } catch {

                    element.textContent =
                        "--:--:--";

                }

            }
        );

}


window.setInterval(
    updateWorldClock,
    1000
);


/* =========================================================
   PERCENTAGE CALCULATOR
========================================================= */

function openPercentageCalculator() {

    openModal(`

        <div class="simple-tool">

            <small>
                NEXUS TOOLS
            </small>

            <h2>
                Faiz kalkulyatoru
            </h2>

            <label>
                Məbləğ

                <input
                    id="percentAmount"
                    type="number"
                    placeholder="100"
                >

            </label>

            <label>
                Faiz %

                <input
                    id="percentRate"
                    type="number"
                    placeholder="15"
                >

            </label>

            <button
                class="primary-tool-button"
                onclick="calculatePercentage()"
            >
                HESABLA
            </button>

            <div
                id="percentageResult"
                class="tool-result"
            >
                —
            </div>

        </div>

    `);

}


function calculatePercentage() {

    const amount =
        Number(
            $("#percentAmount")?.value
        );


    const rate =
        Number(
            $("#percentRate")?.value
        );


    const result =
        $("#percentageResult");


    if (
        !result ||
        !Number.isFinite(amount) ||
        !Number.isFinite(rate)
    ) return;


    result.textContent =
        `${amount * rate / 100}`;

}


/* =========================================================
   QR GENERATOR
========================================================= */

function openQRGenerator() {

    openModal(`

        <div class="simple-tool">

            <small>
                NEXUS TOOLS
            </small>

            <h2>
                QR Code
            </h2>

            <input
                id="qrText"
                placeholder="Mətn və ya link..."
            >

            <button
                class="primary-tool-button"
                onclick="generateQR()"
            >
                QR YARAT
            </button>

            <div
                id="qrResult"
                class="qr-result"
            ></div>

        </div>

    `);

}


function generateQR() {

    const text =
        $("#qrText")?.value.trim();


    const result =
        $("#qrResult");


    if (
        !text ||
        !result
    ) return;


    result.innerHTML = `

        <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(text)}"
            alt="QR Code"
        >

    `;

}


/* =========================================================
   NOTEPAD
========================================================= */

function openNotepad() {

    openModal(`

        <div class="simple-tool">

            <small>
                NEXUS TOOLS
            </small>

            <h2>
                Notepad
            </h2>

            <textarea
                id="nexusNotes"
                class="notes-editor"
                placeholder="Qeydlərinizi yazın..."
            ></textarea>

            <button
                class="primary-tool-button"
                onclick="saveNotes()"
            >
                YADDA SAXLA
            </button>

        </div>

    `);


    const notes =
        $("#nexusNotes");


    const saved =
        localStorage.getItem(
            "nexus_notes"
        );


    if (
        notes &&
        saved
    ) {

        notes.value =
            saved;

    }

}


function saveNotes() {

    const notes =
        $("#nexusNotes");


    if (!notes) return;


    localStorage.setItem(
        "nexus_notes",
        notes.value
    );


    alert(
        "Qeyd yadda saxlanıldı."
    );

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function initSearch() {

    const input =
        $("#globalSearch");

    const button =
        $("#searchBtn");


    if (!input) return;


    function search() {

        const query =
            input.value.trim();


        if (!query) {

            input.focus();

            return;

        }


        window.open(
            CONFIG.SEARCH_URL +
            encodeURIComponent(
                query
            ),
            "_blank",
            "noopener,noreferrer"
        );

    }


    button?.addEventListener(
        "click",
        search
    );


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Enter"
            ) {

                event.preventDefault();

                search();

            }

        }
    );

}


/* =========================================================
   HERO AI
========================================================= */

function initHeroAI() {

    const button =
        $("#heroAIButton");


    if (!button) return;


    button.addEventListener(
        "click",
        openAI
    );

}


/* =========================================================
   NEXUS AI FLOATING BUTTON
========================================================= */

function initAI() {

    const fab =
        $("#aiFab");


    if (!fab) return;


    fab.addEventListener(
        "click",
        openAI
    );

}


/* =========================================================
   OPEN AI
========================================================= */

function openAI() {

    /*
       Əgər artıq açıqdırsa,
       ikinci interface yaratma.
    */

    if (
        document.querySelector(
            ".ai-interface"
        )
    ) {

        return;

    }


    const ai =
        document.createElement(
            "div"
        );


    ai.className =
        "ai-interface";


    ai.innerHTML = `

        <div class="ai-interface-inner">


            <header class="ai-header">

                <div class="ai-brand">

                    <div class="ai-logo">
                        ✦
                    </div>

                    <div>

                        <strong>
                            NEXUS AI
                        </strong>

                        <span>
                            SƏNİN RƏQƏMSAL KÖMƏKÇİN
                        </span>

                    </div>

                </div>


                <div class="ai-header-actions">

                    <button
                        type="button"
                        class="ai-new-chat"
                        id="aiNewChat"
                    >
                        + Yeni söhbət
                    </button>

                    <button
                        type="button"
                        class="ai-close"
                        id="aiClose"
                        aria-label="Bağla"
                    >
                        ×
                    </button>

                </div>

            </header>


            <main
                class="ai-chat"
                id="aiChat"
            >

                <div class="ai-welcome">

                    <div class="ai-welcome-icon">
                        ✦
                    </div>

                    <h1>
                        Salam 👋
                    </h1>

                    <p>
                        Mən NEXUS AI-yəm.
                        Sənə nə barədə kömək edə bilərəm?
                    </p>


                    <div class="ai-suggestions">

                        <button
                            type="button"
                        >
                            Mənə bir şey öyrət
                        </button>

                        <button
                            type="button"
                        >
                            Azərbaycan haqqında danış
                        </button>

                        <button
                            type="button"
                        >
                            Kompüter problemimi həll et
                        </button>

                        <button
                            type="button"
                        >
                            Mənə maraqlı bir fakt de
                        </button>

                    </div>

                </div>

            </main>


            <div class="ai-input-area">

                <div class="ai-input-box">

                    <textarea
                        id="aiInput"
                        rows="1"
                        placeholder="NEXUS AI-dan bir şey soruş..."
                        autocomplete="off"
                    ></textarea>

                    <button
                        id="aiSend"
                        type="button"
                        aria-label="Göndər"
                    >
                        ↑
                    </button>

                </div>


                <small>
                    NEXUS AI səhv edə bilər.
                    Vacib məlumatları yoxlayın.
                </small>

            </div>


        </div>

    `;


    document.body.appendChild(
        ai
    );


    document.body.style.overflow =
        "hidden";


    /*
       Close
    */

    $("#aiClose")
        ?.addEventListener(
            "click",
            closeAI
        );


    /*
       New chat
    */

    $("#aiNewChat")
        ?.addEventListener(
            "click",
            newAIChat
        );


    /*
       Send
    */

    $("#aiSend")
        ?.addEventListener(
            "click",
            sendAI
        );


    /*
       Enter
    */

    $("#aiInput")
        ?.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendAI();

                }

            }
        );


    /*
       Suggestions
    */

    $$(".ai-suggestions button")
        .forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {

                        const input =
                            $("#aiInput");


                        if (!input) return;


                        input.value =
                            button.textContent.trim();


                        input.focus();

                    }
                );

            }
        );


    /*
       Focus
    */

    window.setTimeout(
        () => {

            $("#aiInput")?.focus();

        },
        100
    );

}


/* =========================================================
   CLOSE AI
========================================================= */

function closeAI() {

    const ai =
        document.querySelector(
            ".ai-interface"
        );


    if (!ai) return;


    ai.remove();


    document.body.style.overflow =
        "";

}


/* =========================================================
   NEW AI CHAT
========================================================= */

function newAIChat() {

    conversationHistory =
        [];


    const chat =
        $("#aiChat");


    if (!chat) return;


    chat.innerHTML = `

        <div class="ai-welcome">

            <div class="ai-welcome-icon">
                ✦
            </div>

            <h1>
                Yeni söhbət
            </h1>

            <p>
                NEXUS AI ilə yeni söhbətə başlaya bilərsən.
            </p>

        </div>

    `;

}


/* =========================================================
   SEND AI
========================================================= */

async function sendAI() {

    const input =
        $("#aiInput");

    const chat =
        $("#aiChat");


    if (
        !input ||
        !chat
    ) return;


    const message =
        input.value.trim();


    if (!message) return;


    /*
       User message
    */

    addAIMessage(
        "user",
        message
    );


    input.value =
        "";


    conversationHistory.push({

        role:
            "user",

        content:
            message

    });


    /*
       Loading
    */

    const loading =
        document.createElement(
            "div"
        );


    loading.className =
        "ai-message assistant";


    loading.innerHTML = `

        <div class="ai-avatar">
            ✦
        </div>

        <div class="ai-message-content">

            <span class="ai-thinking">
                NEXUS AI yazır...
            </span>

        </div>

    `;


    chat.appendChild(
        loading
    );


    scrollAI();


    /*
       Disable button
    */

    const sendButton =
        $("#aiSend");


    if (sendButton) {

        sendButton.disabled =
            true;

    }


    try {

        const response =
            await fetch(
                CONFIG.AI_WORKER_URL,
                {

                    method:
                        "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Accept":
                            "application/json"

                    },

                    body:
                        JSON.stringify({

                            message:
                                message,

                            history:
                                conversationHistory

                        })

                }
            );


        /*
           JSON parse
        */

        let data;


        try {

            data =
                await response.json();

        } catch {

            data = {};

        }


        loading.remove();


        if (
            !response.ok
        ) {

            throw new Error(
                data?.error ||
                `Server xətası: ${response.status}`
            );

        }


        /*
           Worker müxtəlif adlarla
           cavab qaytara bilər.
        */

        const answer =
            data?.answer ??
            data?.response ??
            data?.message ??
            data?.content ??
            data?.result ??
            "";


        if (!answer) {

            throw new Error(
                "Worker cavab qaytarmadı."
            );

        }


        conversationHistory.push({

            role:
                "assistant",

            content:
                String(answer)

        });


        addAIMessage(
            "assistant",
            String(answer)
        );


    } catch (error) {

        console.error(
            "NEXUS AI ERROR:",
            error
        );


        loading.remove();


        addAIMessage(
            "assistant",
            `Bağlantı zamanı xəta baş verdi.\n\n${error.message || "Naməlum xəta."}`
        );

    } finally {

        if (sendButton) {

            sendButton.disabled =
                false;

        }

        scrollAI();

        input.focus();

    }

}


/* =========================================================
   AI MESSAGE
========================================================= */

function addAIMessage(
    role,
    text
) {

    const chat =
        $("#aiChat");


    if (!chat) return;


    /*
       Welcome screen-i ilk mesajda sil.
    */

    chat
        .querySelector(
            ".ai-welcome"
        )
        ?.remove();


    const message =
        document.createElement(
            "div"
        );


    message.className =
        role === "user"
            ? "ai-message user"
            : "ai-message assistant";


    if (
        role ===
        "user"
    ) {

        message.innerHTML = `

            <div class="ai-message-content">
                ${escapeHTML(text)}
            </div>

        `;

    } else {

        message.innerHTML = `

            <div class="ai-avatar">
                ✦
            </div>

            <div class="ai-message-content">
                ${formatAIResponse(text)}
            </div>

        `;

    }


    chat.appendChild(
        message
    );


    scrollAI();

}


/* =========================================================
   AI RESPONSE FORMAT
========================================================= */

function formatAIResponse(
    text
) {

    let safe =
        escapeHTML(text);


    /*
       Bold
    */

    safe =
        safe.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


    /*
       Inline code
    */

    safe =
        safe.replace(
            /`([^`]+)`/g,
            "<code>$1</code>"
        );


    /*
       Simple bullets
    */

    safe =
        safe.replace(
            /^[-•]\s(.+)$/gm,
            "• $1"
        );


    /*
       New lines
    */

    safe =
        safe.replace(
            /\n/g,
            "<br>"
        );


    return safe;

}


/* =========================================================
   AI SCROLL
========================================================= */

function scrollAI() {

    const chat =
        $("#aiChat");


    if (!chat) return;


    chat.scrollTop =
        chat.scrollHeight;

}


/* =========================================================
   SECURITY
========================================================= */

function escapeHTML(
    value
) {

    return String(
        value ?? ""
    )

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
   EXTERNAL
========================================================= */

function openExternal(
    url
) {

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   DOWNLOAD
========================================================= */

function downloadBlob(
    blob,
    filename
) {

    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        filename;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    window.setTimeout(
        () => {

            URL.revokeObjectURL(
                url
            );

        },
        1000
    );

}


/* =========================================================
   KEYBOARD
========================================================= */

function initKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key ===
                "Escape"
            ) {

                closeModal();

                closeAI();

            }

        }
    );

}


/* =========================================================
   GLOBAL FUNCTIONS
========================================================= */

window.openAI =
    openAI;

window.closeAI =
    closeAI;

window.sendAI =
    sendAI;

window.newAIChat =
    newAIChat;

window.selectCategory =
    selectCategory;

window.closeModal =
    closeModal;

window.openWord =
    openWord;

window.downloadWord =
    downloadWord;

window.wordCommand =
    wordCommand;

window.wordFontSize =
    wordFontSize;

window.wordFormat =
    wordFormat;

window.openExcel =
    openExcel;

window.downloadExcel =
    downloadExcel;

window.addExcelRow =
    addExcelRow;

window.addExcelColumn =
    addExcelColumn;

window.applyExcelFormula =
    applyExcelFormula;

window.openCalculator =
    openCalculator;

window.calcInput =
    calcInput;

window.calcClear =
    calcClear;

window.calcDelete =
    calcDelete;

window.calcEquals =
    calcEquals;

window.calcPercent =
    calcPercent;

window.calcToggleSign =
    calcToggleSign;

window.openWorldClock =
    openWorldClock;

window.openPercentageCalculator =
    openPercentageCalculator;

window.calculatePercentage =
    calculatePercentage;

window.openQRGenerator =
    openQRGenerator;

window.generateQR =
    generateQR;

window.openNotepad =
    openNotepad;

window.saveNotes =
    saveNotes;


/* =========================================================
   END NEXUS // AZ
========================================================= */
