/* =========================================================
   NEXUS // AZ 4.1
   MAIN APPLICATION
========================================================= */


/* =========================================================
   HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [

    {
        id: "network",
        icon: "⌁",
        title: "Network",
        description: "Şəbəkə və internet"
    },

    {
        id: "security",
        icon: "◇",
        title: "Security",
        description: "Təhlükəsizlik"
    },

    {
        id: "developer",
        icon: "</>",
        title: "Developer",
        description: "Kod və terminal"
    },

    {
        id: "world",
        icon: "◎",
        title: "World",
        description: "Xəritə və saatlar"
    },

    {
        id: "office",
        icon: "▦",
        title: "Office",
        description: "Word, Excel və iş"
    },

    {
        id: "media",
        icon: "♫",
        title: "Media",
        description: "Audio və media"
    },

    {
        id: "system",
        icon: "◈",
        title: "System",
        description: "Sistem alətləri"
    },

    {
        id: "utility",
        icon: "⌗",
        title: "Utility",
        description: "Gündəlik alətlər"
    }

];


/* =========================================================
   TOOLS
========================================================= */

const tools = {

    network: [

        {
            id: "speed",
            icon: "◉",
            title: "Speed Test",
            description: "İnternet bağlantısının sürətini yoxla."
        },

        {
            id: "ip",
            icon: "⌁",
            title: "IP & DNS",
            description: "Public IP və DNS məlumatlarını göstər."
        },

        {
            id: "ping",
            icon: "≈",
            title: "Ping",
            description: "Bağlantı gecikməsini ölç."
        }

    ],


    security: [

        {
            id: "password",
            icon: "◇",
            title: "Şifrə generatoru",
            description: "Güclü təsadüfi parol yarat."
        },

        {
            id: "url",
            icon: "↗",
            title: "URL Analyzer",
            description: "URL strukturunu analiz et."
        },

        {
            id: "headers",
            icon: "▣",
            title: "Security Headers",
            description: "Saytın təhlükəsizlik header-lərini yoxla."
        }

    ],


    developer: [

        {
            id: "terminal",
            icon: "_",
            title: "NEXUS Terminal",
            description: "Təhlükəsiz developer terminalı."
        },

        {
            id: "json",
            icon: "{}",
            title: "JSON Formatter",
            description: "JSON məlumatını formatla."
        },

        {
            id: "base64",
            icon: "⇄",
            title: "Base64",
            description: "Base64 encode və decode."
        }

    ],


    world: [

        {
            id: "map",
            icon: "◎",
            title: "Live World",
            description: "Dünya xəritəsi və naviqasiya."
        },

        {
            id: "clocks",
            icon: "◷",
            title: "Dünya saatları",
            description: "Paytaxtlar üzrə canlı vaxt."
        },

        {
            id: "timezone",
            icon: "⌚",
            title: "Time Zone",
            description: "Saat qurşaqları və UTC."
        }

    ],


    office: [

        {
            id: "word",
            icon: "W",
            title: "NEXUS Word",
            description: "Sənəd yarat, redaktə et və DOCX saxla."
        },

        {
            id: "excel",
            icon: "X",
            title: "NEXUS Excel",
            description: "XLSX faylları ilə işləyin."
        },

        {
            id: "calculator",
            icon: "×",
            title: "Calculator",
            description: "iOS üslubunda kalkulyator."
        },

        {
            id: "qr",
            icon: "⌗",
            title: "QR Generator",
            description: "Mətn və linkdən QR yarat."
        }

    ],


    media: [

        {
            id: "player",
            icon: "♫",
            title: "Music Player",
            description: "Audio fayllarını real player-də səsləndir."
        },

        {
            id: "youtube",
            icon: "▶",
            title: "YouTube",
            description: "YouTube-da axtarış et."
        }

    ],


    system: [

        {
            id: "device",
            icon: "▣",
            title: "Device Info",
            description: "Cihaz və brauzer məlumatları."
        },

        {
            id: "storage",
            icon: "◫",
            title: "Storage",
            description: "Brauzer yaddaş məlumatları."
        }

    ],


    utility: [

        {
            id: "search",
            icon: "⌕",
            title: "Global Search",
            description: "Google üzərindən internetdə axtar."
        },

        {
            id: "notes",
            icon: "✎",
            title: "Quick Notes",
            description: "Qeydlərini avtomatik saxla."
        },

        {
            id: "timer",
            icon: "◷",
            title: "Timer",
            description: "Countdown taymeri."
        }

    ]

};


/* =========================================================
   RENDER CATEGORIES
========================================================= */

function renderCategories() {

    const container = $("#categories");

    if (!container) return;

    container.innerHTML = categories.map((category, index) => {

        return `
            <button
                class="cat ${index === 0 ? "active" : ""}"
                data-category="${category.id}"
            >

                <div class="cat-icon">
                    ${category.icon}
                </div>

                <b>
                    ${category.title}
                </b>

                <small>
                    ${category.description}
                </small>

            </button>
        `;

    }).join("");


    $$(".cat").forEach(button => {

        button.addEventListener("click", () => {

            $$(".cat").forEach(item => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            renderTools(
                button.dataset.category
            );

        });

    });

}


/* =========================================================
   RENDER TOOLS
========================================================= */

function renderTools(category) {

    const container = $("#moduleGrid");

    if (!container) return;

    const selectedCategory =
        categories.find(
            item => item.id === category
        );


    $("#moduleHint").textContent =
        selectedCategory
            ? selectedCategory.title.toUpperCase()
            : "MODULE";


    const categoryTools =
        tools[category] || [];


    container.innerHTML =
        categoryTools.map(tool => {

            return `
                <article class="tool">

                    <div class="tool-icon">
                        ${tool.icon}
                    </div>

                    <h3>
                        ${tool.title}
                    </h3>

                    <p>
                        ${tool.description}
                    </p>

                    <button
                        onclick="openTool('${tool.id}')"
                    >
                        AÇ →
                    </button>

                </article>
            `;

        }).join("");

}


/* =========================================================
   MODAL
========================================================= */

function openModal() {

    $("#modal").classList.add("show");

}


function closeModal() {

    $("#modal").classList.remove("show");

}


$("#closeModal")?.addEventListener(
    "click",
    closeModal
);


$("#modal")?.addEventListener(
    "click",
    event => {

        if (
            event.target.id === "modal"
        ) {

            closeModal();

        }

    }
);


/* =========================================================
   OPEN TOOL
========================================================= */

function openTool(type) {

    openModal();

    const content =
        $("#modalContent");


    if (!content) return;


    switch (type) {

        case "calculator":
            calculator(content);
            break;

        case "word":
            word(content);
            break;

        case "excel":
            excel(content);
            break;

        case "speed":
            speedTest(content);
            break;

        case "clocks":
            worldClocks(content);
            break;

        case "map":
            worldMap(content);
            break;

        case "player":
            musicPlayer(content);
            break;

        case "password":
            passwordGenerator(content);
            break;

        case "qr":
            qrGenerator(content);
            break;

        case "json":
            jsonFormatter(content);
            break;

        case "base64":
            base64Tool(content);
            break;

        case "terminal":
            terminal(content);
            break;

        case "ip":
            ipTool(content);
            break;

        case "ping":
            pingTool(content);
            break;

        case "url":
            urlAnalyzer(content);
            break;

        case "headers":
            securityHeaders(content);
            break;

        case "search":
            globalSearchTool(content);
            break;

        case "notes":
            notesTool(content);
            break;

        case "timer":
            timerTool(content);
            break;

        case "device":
            deviceInfo(content);
            break;

        case "storage":
            storageInfo(content);
            break;

        case "youtube":
            youtubeTool(content);
            break;

        default:

            content.innerHTML = `
                <div class="modal-inner">

                    <h2>
                        ${type}
                    </h2>

                    <p>
                        Bu modul hazırlanır.
                    </p>

                </div>
            `;

    }

}


/* =========================================================
   GLOBAL SEARCH
========================================================= */

function performGoogleSearch(query) {

    query = query.trim();

    if (!query) return;

    window.open(
        "https://www.google.com/search?q=" +
        encodeURIComponent(query),
        "_blank",
        "noopener,noreferrer"
    );

}


$("#searchBtn")?.addEventListener(
    "click",
    () => {

        performGoogleSearch(
            $("#globalSearch").value
        );

    }
);


$("#globalSearch")?.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {

            performGoogleSearch(
                event.target.value
            );

        }

    }
);


/* =========================================================
   CLOCK
========================================================= */

function updateMainClock() {

    const now = new Date();

    const clock =
        $("#clock");

    const date =
        $("#date");


    if (clock) {

        clock.textContent =
            now.toLocaleTimeString(
                "az-AZ",
                {
                    hour12: false
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
   CALCULATOR
========================================================= */

let calculatorState = {

    value: "0",

    previous: null,

    operator: null,

    reset: false

};


function calculator(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                NEXUS Calculator
            </h2>

            <div class="calc">

                <div
                    id="calculatorDisplay"
                    class="calc-display"
                >
                    0
                </div>


                <div class="calc-grid">

                    <button onclick="calcPress('AC')">
                        AC
                    </button>

                    <button onclick="calcPress('±')">
                        ±
                    </button>

                    <button onclick="calcPress('%')">
                        %
                    </button>

                    <button
                        class="op"
                        onclick="calcPress('÷')"
                    >
                        ÷
                    </button>


                    <button onclick="calcPress('7')">
                        7
                    </button>

                    <button onclick="calcPress('8')">
                        8
                    </button>

                    <button onclick="calcPress('9')">
                        9
                    </button>

                    <button
                        class="op"
                        onclick="calcPress('×')"
                    >
                        ×
                    </button>


                    <button onclick="calcPress('4')">
                        4
                    </button>

                    <button onclick="calcPress('5')">
                        5
                    </button>

                    <button onclick="calcPress('6')">
                        6
                    </button>

                    <button
                        class="op"
                        onclick="calcPress('−')"
                    >
                        −
                    </button>


                    <button onclick="calcPress('1')">
                        1
                    </button>

                    <button onclick="calcPress('2')">
                        2
                    </button>

                    <button onclick="calcPress('3')">
                        3
                    </button>

                    <button
                        class="op"
                        onclick="calcPress('+')"
                    >
                        +
                    </button>


                    <button
                        class="wide"
                        onclick="calcPress('0')"
                    >
                        0
                    </button>

                    <button onclick="calcPress('.')">
                        .
                    </button>

                    <button
                        class="op"
                        onclick="calcPress('=')"
                    >
                        =
                    </button>

                </div>

            </div>

        </div>

    `;

}


function calcPress(value) {

    const display =
        $("#calculatorDisplay");

    if (!display) return;


    if (value === "AC") {

        calculatorState = {

            value: "0",

            previous: null,

            operator: null,

            reset: false

        };

        display.textContent = "0";

        return;

    }


    if (value === "±") {

        calculatorState.value =
            String(
                parseFloat(
                    calculatorState.value
                ) * -1
            );

        display.textContent =
            calculatorState.value;

        return;

    }


    if (value === "%") {

        calculatorState.value =
            String(
                parseFloat(
                    calculatorState.value
                ) / 100
            );

        display.textContent =
            calculatorState.value;

        return;

    }


    if (
        "0123456789.".includes(value)
    ) {

        if (
            calculatorState.reset ||
            calculatorState.value === "0"
        ) {

            calculatorState.value =
                value === "."
                    ? "0."
                    : value;

            calculatorState.reset =
                false;

        }

        else if (
            value !== "." ||
            !calculatorState.value.includes(".")
        ) {

            calculatorState.value += value;

        }


        display.textContent =
            calculatorState.value;

        return;

    }


    if (
        ["+","−","×","÷"].includes(value)
    ) {

        calculatorState.previous =
            parseFloat(
                calculatorState.value
            );

        calculatorState.operator =
            value;

        calculatorState.reset =
            true;

        return;

    }


    if (
        value === "=" &&
        calculatorState.operator
    ) {

        const a =
            calculatorState.previous;

        const b =
            parseFloat(
                calculatorState.value
            );

        let result;


        switch (
            calculatorState.operator
        ) {

            case "+":
                result = a + b;
                break;

            case "−":
                result = a - b;
                break;

            case "×":
                result = a * b;
                break;

            case "÷":
                result =
                    b === 0
                        ? "Error"
                        : a / b;
                break;

        }


        calculatorState.value =
            String(result);

        calculatorState.operator =
            null;

        calculatorState.previous =
            null;

        calculatorState.reset =
            true;

        display.textContent =
            calculatorState.value;

    }

}


/* =========================================================
   PASSWORD GENERATOR
========================================================= */

function passwordGenerator(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Təhlükəsiz şifrə generatoru
            </h2>

            <input
                id="generatedPassword"
                class="field"
                readonly
            >

            <div class="office-actions">

                <button
                    onclick="generatePassword()"
                >
                    Yarat
                </button>

                <button
                    onclick="copyPassword()"
                >
                    Kopyala
                </button>

            </div>

        </div>

    `;

    generatePassword();

}


function generatePassword() {

    const chars =
        "ABCDEFGHJKLMNPQRSTUVWXYZ" +
        "abcdefghijkmnopqrstuvwxyz" +
        "23456789!@#$%^&*";

    let password = "";

    for (
        let i = 0;
        i < 20;
        i++
    ) {

        password +=
            chars[
                Math.floor(
                    Math.random() *
                    chars.length
                )
            ];

    }


    const field =
        $("#generatedPassword");

    if (field) {

        field.value =
            password;

    }

}


function copyPassword() {

    const field =
        $("#generatedPassword");

    if (!field) return;

    navigator.clipboard.writeText(
        field.value
    );

}


/* =========================================================
   QR
========================================================= */

function qrGenerator(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                QR Generator
            </h2>

            <input
                id="qrInput"
                class="field"
                placeholder="Mətn və ya URL..."
            >

            <button
                class="action"
                onclick="generateQR()"
            >
                QR yarat
            </button>

            <div
                id="qrOutput"
                style="
                    margin-top:25px;
                    text-align:center;
                "
            ></div>

        </div>

    `;

}


function generateQR() {

    const value =
        $("#qrInput").value.trim();

    if (!value) return;


    $("#qrOutput").innerHTML = `

        <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(value)}"
            alt="QR Code"
            width="260"
            height="260"
        >

    `;

}


/* =========================================================
   SPEED TEST
========================================================= */

function speedTest(content) {

    content.innerHTML = `

        <div class="modal-inner speed">

            <h2>
                Internet Speed Test
            </h2>

            <p>
                Bağlantının download sürətini ölç.
            </p>


            <div class="speed-ring">

                <span id="speedValue">
                    0
                </span>

            </div>


            <div class="speed-value">

                Mbps

            </div>


            <button
                class="action"
                onclick="runSpeedTest()"
            >
                TESTƏ BAŞLA
            </button>


            <p id="speedStatus">
                Hazırdır.
            </p>

        </div>

    `;

}


async function runSpeedTest() {

    const value =
        $("#speedValue");

    const status =
        $("#speedStatus");

    if (!value || !status) return;


    status.textContent =
        "Download ölçülür...";


    value.textContent =
        "…";


    const bytes =
        5 * 1024 * 1024;


    const url =
        "https://speed.cloudflare.com/__down?bytes=" +
        bytes;


    const start =
        performance.now();


    try {

        const response =
            await fetch(
                url,
                {
                    cache: "no-store"
                }
            );


        await response.arrayBuffer();


        const seconds =
            (performance.now() - start)
            / 1000;


        const mbps =
            (
                bytes *
                8 /
                seconds /
                1000000
            );


        value.textContent =
            mbps.toFixed(1);


        status.textContent =
            "Download testi tamamlandı.";

    }

    catch (error) {

        value.textContent =
            "—";

        status.textContent =
            "Speed test mümkün olmadı. Şəbəkə məhdudiyyəti ola bilər.";

    }

}


/* =========================================================
   WORLD CLOCKS
========================================================= */

const worldCities = [

    ["🇦🇿", "Bakı", "Asia/Baku"],

    ["🇹🇷", "Ankara", "Europe/Istanbul"],

    ["🇬🇧", "London", "Europe/London"],

    ["🇺🇸", "Vaşinqton", "America/New_York"],

    ["🇩🇪", "Berlin", "Europe/Berlin"],

    ["🇫🇷", "Paris", "Europe/Paris"],

    ["🇯🇵", "Tokio", "Asia/Tokyo"],

    ["🇦🇪", "Abu-Dabi", "Asia/Dubai"],

    ["🇸🇦", "Ər-Riyad", "Asia/Riyadh"]

];


function worldClocks(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Dünya saatları
            </h2>

            <div class="clocks">

                ${worldCities.map(
                    (city, index) => {

                        return `

                            <div class="clock-card">

                                <div class="flag">
                                    ${city[0]}
                                </div>

                                <b>
                                    ${city[1]}
                                </b>

                                <strong
                                    id="worldClock${index}"
                                >
                                    --:--:--
                                </strong>

                                <small>
                                    ${city[2]}
                                </small>

                            </div>

                        `;

                    }
                ).join("")}

            </div>

        </div>

    `;


    updateWorldClocks();

}


function updateWorldClocks() {

    worldCities.forEach(
        (city, index) => {

            const element =
                $("#worldClock" + index);

            if (!element) return;


            element.textContent =
                new Intl.DateTimeFormat(
                    "az-AZ",
                    {
                        timeZone:
                            city[2],

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

        }
    );

}


setInterval(
    updateWorldClocks,
    1000
);


/* =========================================================
   WORLD MAP
========================================================= */

function worldMap(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Live World
            </h2>

            <div class="mapbox">

                <div>

                    <div
                        style="
                            font-size:70px;
                            margin-bottom:15px;
                        "
                    >
                        🌍
                    </div>

                    <p>
                        Dünya xəritəsi və
                        naviqasiya modulu.
                    </p>

                    <button
                        onclick="
                            window.open(
                                'https://www.openstreetmap.org',
                                '_blank'
                            )
                        "
                    >
                        Xəritəni aç →
                    </button>

                </div>

            </div>

        </div>

    `;

}


/* =========================================================
   MUSIC PLAYER
========================================================= */

function musicPlayer(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                NEXUS Music Player
            </h2>

            <p>
                Öz audio fayllarını seç.
                Player onları növbə ilə səsləndirəcək.
            </p>


            <input
                id="audioFiles"
                type="file"
                accept="audio/*"
                multiple
            >


            <div
                id="playlist"
                style="
                    margin-top:20px;
                    display:flex;
                    flex-direction:column;
                    gap:8px;
                "
            ></div>


            <audio
                id="audioPlayer"
                controls
                style="
                    width:100%;
                    margin-top:20px;
                "
            ></audio>

        </div>

    `;


    $("#audioFiles")
        ?.addEventListener(
            "change",
            event => {

                const files =
                    [
                        ...event.target.files
                    ];


                const playlist =
                    $("#playlist");


                playlist.innerHTML =
                    files.map(
                        (file, index) => {

                            return `

                                <button
                                    class="action"
                                    data-index="${index}"
                                >
                                    ${index + 1}.
                                    ${file.name}
                                </button>

                            `;

                        }
                    ).join("");


                $$("#playlist button")
                    .forEach(button => {

                        button.addEventListener(
                            "click",
                            () => {

                                const file =
                                    files[
                                        button.dataset.index
                                    ];


                                $("#audioPlayer").src =
                                    URL.createObjectURL(
                                        file
                                    );


                                $("#audioPlayer").play();

                            }
                        );

                    });

            }
        );

}


/* =========================================================
   WORD
========================================================= */

function word(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                NEXUS Word
            </h2>


            <div class="office-actions">

                <button
                    onclick="newWordDocument()"
                >
                    Yeni sənəd
                </button>

                <button
                    onclick="saveWordDocument()"
                >
                    DOCX saxla
                </button>

                <button
                    onclick="window.print()"
                >
                    Çap / PDF
                </button>

            </div>


            <div class="word-app">


                <div class="word-toolbar">


                    <select
                        onchange="
                            formatWord(
                                'fontName',
                                this.value
                            )
                        "
                    >

                        <option>
                            Arial
                        </option>

                        <option>
                            Calibri
                        </option>

                        <option>
                            Georgia
                        </option>

                        <option>
                            Times New Roman
                        </option>

                    </select>


                    <select
                        onchange="
                            formatWord(
                                'fontSize',
                                this.value
                            )
                        "
                    >

                        <option value="3">
                            12
                        </option>

                        <option value="4">
                            14
                        </option>

                        <option value="5">
                            18
                        </option>

                        <option value="6">
                            24
                        </option>

                    </select>


                    <button
                        onclick="
                            formatWord('bold')
                        "
                    >
                        <b>B</b>
                    </button>


                    <button
                        onclick="
                            formatWord('italic')
                        "
                    >
                        <i>I</i>
                    </button>


                    <button
                        onclick="
                            formatWord('underline')
                        "
                    >
                        <u>U</u>
                    </button>


                    <button
                        onclick="
                            formatWord('justifyLeft')
                        "
                    >
                        ⬅
                    </button>


                    <button
                        onclick="
                            formatWord('justifyCenter')
                        "
                    >
                        ↔
                    </button>


                    <button
                        onclick="
                            formatWord('justifyRight')
                        "
                    >
                        ➡
                    </button>


                    <button
                        onclick="
                            formatWord(
                                'insertUnorderedList'
                            )
                        "
                    >
                        • List
                    </button>


                    <button
                        onclick="
                            formatWord(
                                'insertOrderedList'
                            )
                        "
                    >
                        1. List
                    </button>


                    <button
                        onclick="
                            formatWord(
                                'createLink',
                                prompt(
                                    'Link URL'
                                )
                            )
                        "
                    >
                        🔗
                    </button>


                </div>


                <div
                    id="wordPage"
                    class="word-page"
                    contenteditable="true"
                >

                    <h1>
                        Sənəd başlığı
                    </h1>

                    <p>
                        Buradan yazmağa başla...
                    </p>

                </div>


            </div>

        </div>

    `;

}


function formatWord(command, value = null) {

    document.execCommand(
        command,
        false,
        value
    );


    $("#wordPage")?.focus();

}


function newWordDocument() {

    const page =
        $("#wordPage");

    if (!page) return;

    page.innerHTML =
        "<p></p>";

    page.focus();

}


async function saveWordDocument() {

    if (!window.docx) {

        alert(
            "DOCX sistemi yüklənmədi."
        );

        return;

    }


    const {
        Document,
        Packer,
        Paragraph,
        TextRun
    } = window.docx;


    const text =
        $("#wordPage")
            ?.innerText || "";


    const paragraphs =
        text.split("\n");


    const documentFile =
        new Document({

            sections: [

                {

                    children:
                        paragraphs.map(
                            line => {

                                return new Paragraph({

                                    children: [

                                        new TextRun(
                                            line
                                        )

                                    ]

                                });

                            }
                        )

                }

            ]

        });


    const blob =
        await Packer.toBlob(
            documentFile
        );


    downloadBlob(
        blob,
        "NEXUS-Sened.docx"
    );

}


/* =========================================================
   EXCEL
========================================================= */

let currentWorkbook = null;


function excel(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                NEXUS Excel
            </h2>


            <div class="office-actions">

                <input
                    id="excelFile"
                    type="file"
                    accept=".xlsx,.xls,.csv"
                >


                <button
                    onclick="addExcelRow()"
                >
                    Sətir əlavə et
                </button>


                <button
                    onclick="saveExcel()"
                >
                    XLSX saxla
                </button>

            </div>


            <div
                id="excelSheet"
                class="sheet-wrap"
            >

                <p>
                    Excel faylını seç.
                </p>

            </div>

        </div>

    `;


    $("#excelFile")
        ?.addEventListener(
            "change",
            loadExcel
        );

}


function loadExcel(event) {

    const file =
        event.target.files[0];

    if (!file) return;


    const reader =
        new FileReader();


    reader.onload =
        function(e) {

            currentWorkbook =
                XLSX.read(
                    e.target.result,
                    {
                        type: "array"
                    }
                );


            const firstSheet =
                currentWorkbook.Sheets[
                    currentWorkbook.SheetNames[0]
                ];


            renderExcel(
                firstSheet
            );

        };


    reader.readAsArrayBuffer(
        file
    );

}


function renderExcel(sheet) {

    const container =
        $("#excelSheet");

    if (!container) return;


    container.innerHTML =
        XLSX.utils.sheet_to_html(
            sheet
        );


    const table =
        container.querySelector(
            "table"
        );


    if (!table) return;


    table.querySelectorAll(
        "td"
    ).forEach(cell => {

        cell.contentEditable =
            "true";

    });

}


function addExcelRow() {

    const table =
        $("#excelSheet table");

    if (!table) {

        alert(
            "Əvvəl Excel faylı aç."
        );

        return;

    }


    const row =
        document.createElement(
            "tr"
        );


    for (
        let i = 0;
        i < 5;
        i++
    ) {

        const cell =
            document.createElement(
                "td"
            );


        cell.contentEditable =
            "true";


        cell.textContent =
            "";


        row.appendChild(
            cell
        );

    }


    table.appendChild(
        row
    );

}


function saveExcel() {

    const table =
        $("#excelSheet table");

    if (!table) {

        alert(
            "Əvvəl Excel faylı aç."
        );

        return;

    }


    const workbook =
        XLSX.utils.book_new();


    const sheet =
        XLSX.utils.table_to_sheet(
            table
        );


    XLSX.utils.book_append_sheet(
        workbook,
        sheet,
        "NEXUS"
    );


    XLSX.writeFile(
        workbook,
        "NEXUS-Excel.xlsx"
    );

}


/* =========================================================
   JSON FORMATTER
========================================================= */

function jsonFormatter(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                JSON Formatter
            </h2>


            <textarea
                id="jsonInput"
                class="field"
                rows="14"
                placeholder='{"name":"NEXUS"}'
            ></textarea>


            <button
                class="action"
                onclick="formatJSON()"
            >
                Formatla
            </button>

        </div>

    `;

}


function formatJSON() {

    const input =
        $("#jsonInput");

    try {

        input.value =
            JSON.stringify(
                JSON.parse(
                    input.value
                ),
                null,
                4
            );

    }

    catch {

        alert(
            "JSON düzgün deyil."
        );

    }

}


/* =========================================================
   BASE64
========================================================= */

function base64Tool(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Base64
            </h2>


            <textarea
                id="base64Input"
                class="field"
                rows="10"
            ></textarea>


            <div class="office-actions">

                <button
                    onclick="encodeBase64()"
                >
                    Encode
                </button>


                <button
                    onclick="decodeBase64()"
                >
                    Decode
                </button>

            </div>

        </div>

    `;

}


function encodeBase64() {

    const input =
        $("#base64Input");

    input.value =
        btoa(
            unescape(
                encodeURIComponent(
                    input.value
                )
            )
        );

}


function decodeBase64() {

    const input =
        $("#base64Input");

    try {

        input.value =
            decodeURIComponent(
                escape(
                    atob(
                        input.value
                    )
                )
            );

    }

    catch {

        alert(
            "Base64 düzgün deyil."
        );

    }

}


/* =========================================================
   TERMINAL
========================================================= */

function terminal(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                NEXUS Terminal
            </h2>


            <p>
                Brauzer təhlükəsizliyi səbəbilə
                kompüterin real CMD/Terminalına
                birbaşa çıxış verilmir.
            </p>


            <input
                id="terminalInput"
                class="field"
                placeholder="help"
            >


            <pre id="terminalOutput">
NEXUS OS 4.1

Type "help"
            </pre>

        </div>

    `;


    $("#terminalInput")
        ?.addEventListener(
            "keydown",
            event => {

                if (
                    event.key !== "Enter"
                ) return;


                const command =
                    event.target.value
                        .trim()
                        .toLowerCase();


                const output =
                    $("#terminalOutput");


                if (
                    command === "help"
                ) {

                    output.textContent +=
                        "\n\n> help\n" +
                        "date\n" +
                        "system\n" +
                        "about\n" +
                        "clear";

                }

                else if (
                    command === "date"
                ) {

                    output.textContent +=
                        "\n\n> date\n" +
                        new Date()
                            .toString();

                }

                else if (
                    command === "system"
                ) {

                    output.textContent +=
                        "\n\n> system\n" +
                        "NEXUS OS 4.1\n" +
                        "Browser environment";

                }

                else if (
                    command === "about"
                ) {

                    output.textContent +=
                        "\n\n> about\n" +
                        "NEXUS // AZ";

                }

                else if (
                    command === "clear"
                ) {

                    output.textContent =
                        "";

                }

                else {

                    output.textContent +=
                        "\n\n> " +
                        command +
                        "\nUnknown command.";

                }


                event.target.value =
                    "";

            }
        );

}


/* =========================================================
   IP
========================================================= */

async function ipTool(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                IP & DNS
            </h2>


            <p id="ipResult">
                Yoxlanılır...
            </p>

        </div>

    `;


    try {

        const response =
            await fetch(
                "https://api.ipify.org?format=json"
            );


        const data =
            await response.json();


        $("#ipResult").textContent =
            "Public IP: " +
            data.ip;

    }

    catch {

        $("#ipResult").textContent =
            "IP xidməti əlçatan deyil.";

    }

}


/* =========================================================
   PING
========================================================= */

async function pingTool(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Ping Test
            </h2>


            <button
                class="action"
                onclick="runPing()"
            >
                TEST
            </button>


            <p id="pingResult">
                Hazırdır.
            </p>

        </div>

    `;

}


async function runPing() {

    const result =
        $("#pingResult");


    const start =
        performance.now();


    try {

        await fetch(
            "https://www.google.com/generate_204",
            {
                mode: "no-cors",
                cache: "no-store"
            }
        );


        const latency =
            Math.round(
                performance.now() -
                start
            );


        result.textContent =
            latency +
            " ms";

    }

    catch {

        result.textContent =
            "Ping ölçülmədi.";

    }

}


/* =========================================================
   URL ANALYZER
========================================================= */

function urlAnalyzer(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                URL Analyzer
            </h2>


            <input
                id="urlInput"
                class="field"
                placeholder="https://example.com"
            >


            <button
                class="action"
                onclick="analyzeURL()"
            >
                Analiz et
            </button>


            <pre id="urlResult"></pre>

        </div>

    `;

}


function analyzeURL() {

    const value =
        $("#urlInput").value.trim();


    const output =
        $("#urlResult");


    try {

        const url =
            new URL(value);


        output.textContent =

`Protocol: ${url.protocol}

Host: ${url.host}

Path: ${url.pathname}

Port: ${url.port || "default"}

Search: ${url.search || "none"}`;

    }

    catch {

        output.textContent =
            "URL düzgün deyil.";

    }

}


/* =========================================================
   SECURITY HEADERS
========================================================= */

function securityHeaders(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Security Headers
            </h2>


            <input
                id="headerUrl"
                class="field"
                placeholder="https://example.com"
            >


            <button
                class="action"
                onclick="checkHeaders()"
            >
                Yoxla
            </button>


            <pre id="headerResult">
Nəticə gözlənilir...
            </pre>

        </div>

    `;

}


async function checkHeaders() {

    const result =
        $("#headerResult");


    const url =
        $("#headerUrl")
            .value
            .trim();


    if (!url) return;


    result.textContent =
        "Sorğu göndərilir...";


    try {

        const response =
            await fetch(
                url,
                {
                    method: "HEAD",
                    mode: "cors"
                }
            );


        const headers =
            response.headers;


        const wanted = [

            "content-security-policy",

            "strict-transport-security",

            "x-frame-options",

            "x-content-type-options",

            "referrer-policy"

        ];


        result.textContent =
            wanted.map(
                header => {

                    return (
                        header +
                        ": " +
                        (
                            headers.get(
                                header
                            ) || "yoxdur"
                        )
                    );

                }
            ).join("\n");

    }

    catch {

        result.textContent =
            "Sayt CORS səbəbilə yoxlanıla bilmədi.";

    }

}


/* =========================================================
   GLOBAL SEARCH MODULE
========================================================= */

function globalSearchTool(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Global Search
            </h2>


            <p>
                İnternetdə Google vasitəsilə axtar.
            </p>


            <input
                id="moduleSearch"
                class="field"
                placeholder="Nə axtarırsan?"
            >


            <button
                class="action"
                onclick="
                    performGoogleSearch(
                        document
                        .getElementById(
                            'moduleSearch'
                        )
                        .value
                    )
                "
            >
                Google-da axtar →
            </button>

        </div>

    `;

}


/* =========================================================
   NOTES
========================================================= */

function notesTool(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Quick Notes
            </h2>


            <textarea
                id="notesInput"
                class="field"
                rows="18"
                placeholder="Qeydini yaz..."
            ></textarea>

        </div>

    `;


    const notes =
        $("#notesInput");


    notes.value =
        localStorage.getItem(
            "nexus_notes"
        ) || "";


    notes.addEventListener(
        "input",
        () => {

            localStorage.setItem(
                "nexus_notes",
                notes.value
            );

        }
    );

}


/* =========================================================
   TIMER
========================================================= */

let timerInterval = null;


function timerTool(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Timer
            </h2>


            <input
                id="timerMinutes"
                class="field"
                type="number"
                min="1"
                value="5"
            >


            <div
                id="timerDisplay"
                class="speed-value"
            >
                05:00
            </div>


            <button
                class="action"
                onclick="startTimer()"
            >
                Başlat
            </button>


            <button
                class="action"
                onclick="stopTimer()"
            >
                Dayandır
            </button>

        </div>

    `;

}


function startTimer() {

    stopTimer();


    let seconds =
        parseInt(
            $("#timerMinutes").value
        ) * 60;


    updateTimerDisplay(
        seconds
    );


    timerInterval =
        setInterval(
            () => {

                seconds--;

                updateTimerDisplay(
                    seconds
                );


                if (
                    seconds <= 0
                ) {

                    stopTimer();

                    alert(
                        "Timer tamamlandı."
                    );

                }

            },
            1000
        );

}


function stopTimer() {

    if (timerInterval) {

        clearInterval(
            timerInterval
        );

        timerInterval =
            null;

    }

}


function updateTimerDisplay(
    seconds
) {

    const display =
        $("#timerDisplay");


    if (!display) return;


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        seconds % 60;


    display.textContent =
        String(minutes)
            .padStart(2,"0") +
        ":" +
        String(remaining)
            .padStart(2,"0");

}


/* =========================================================
   DEVICE INFO
========================================================= */

function deviceInfo(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Device Info
            </h2>


            <pre>
Browser:
${navigator.userAgent}

Language:
${navigator.language}

Screen:
${screen.width} × ${screen.height}

Online:
${navigator.onLine ? "YES" : "NO"}

Platform:
${navigator.platform}
            </pre>

        </div>

    `;

}


/* =========================================================
   STORAGE
========================================================= */

async function storageInfo(content) {

    let estimate =
        "Yoxlanılır...";


    if (
        navigator.storage &&
        navigator.storage.estimate
    ) {

        const data =
            await navigator
                .storage
                .estimate();


        const used =
            (
                data.usage /
                1024 /
                1024
            ).toFixed(2);


        const quota =
            (
                data.quota /
                1024 /
                1024
            ).toFixed(2);


        estimate =
            `İstifadə: ${used} MB
Limit: ${quota} MB`;

    }


    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                Storage
            </h2>


            <pre>
${estimate}
            </pre>

        </div>

    `;

}


/* =========================================================
   YOUTUBE
========================================================= */

function youtubeTool(content) {

    content.innerHTML = `

        <div class="modal-inner">

            <h2>
                YouTube
            </h2>


            <input
                id="youtubeSearch"
                class="field"
                placeholder="Mahnı, video və ya kanal..."
            >


            <button
                class="action"
                onclick="searchYouTube()"
            >
                YouTube-da axtar →
            </button>

        </div>

    `;

}


function searchYouTube() {

    const query =
        $("#youtubeSearch")
            .value
            .trim();


    if (!query) return;


    window.open(
        "https://www.youtube.com/results?search_query=" +
        encodeURIComponent(query),
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   AI INTERFACE
========================================================= */

function openAI() {

    openModal();


    const content =
        $("#modalContent");


    content.innerHTML = `

        <div class="chat">

            <div class="chat-head">

                <b>
                    ✦ NEXUS AI
                </b>

                <small>
                    AI Chat Interface
                </small>

            </div>


            <div
                id="chatBody"
                class="chat-body"
            >

                <div class="msg ai">

                    Salam! Mən NEXUS AI-yam.

                    Sualını yaz və söhbətə başlayaq.

                </div>

            </div>


            <div class="chat-input">

                <textarea
                    id="chatInput"
                    rows="2"
                    placeholder="Mesajını yaz..."
                ></textarea>


                <button
                    onclick="sendAIMessage()"
                >
                    Göndər
                </button>

            </div>

        </div>

    `;


    $("#chatInput")
        ?.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendAIMessage();

                }

            }
        );

}


$("#aiFab")
    ?.addEventListener(
        "click",
        openAI
    );


/* =========================================================
   AI MESSAGE
========================================================= */

async function sendAIMessage() {

    const input =
        $("#chatInput");


    const body =
        $("#chatBody");


    if (!input || !body) return;


    const message =
        input.value.trim();


    if (!message) return;


    const userMessage =
        document.createElement(
            "div"
        );


    userMessage.className =
        "msg user";


    userMessage.textContent =
        message;


    body.appendChild(
        userMessage
    );


    input.value =
        "";


    const aiMessage =
        document.createElement(
            "div"
        );


    aiMessage.className =
        "msg ai";


    aiMessage.textContent =
        "Cavab hazırlanır...";


    body.appendChild(
        aiMessage
    );


    body.scrollTop =
        body.scrollHeight;


    /*
       REAL AI BACKEND

       Burada API key saxlamırıq.

       Frontend:
           /api/chat

       Backend:
           OpenAI API

       qoşulmalıdır.
    */


    try {

        const response =
            await fetch(
                "/api/chat",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            message
                        })

                }
            );


        if (!response.ok) {

            throw new Error(
                "AI backend yoxdur."
            );

        }


        const data =
            await response.json();


        aiMessage.textContent =
            data.reply ||
            "AI cavab vermədi.";

    }

    catch {

        aiMessage.textContent =
            "NEXUS AI frontend hazırdır, amma real AI backend hələ qoşulmayıb. API açarını GitHub-da təhlükəyə atmamaq üçün onu frontendə yerləşdirmirik.";

    }


    body.scrollTop =
        body.scrollHeight;

}


/* =========================================================
   DOWNLOAD HELPER
========================================================= */

function downloadBlob(
    blob,
    filename
) {

    const link =
        document.createElement(
            "a"
        );


    link.href =
        URL.createObjectURL(
            blob
        );


    link.download =
        filename;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    setTimeout(
        () => {

            URL.revokeObjectURL(
                link.href
            );

        },
        1000
    );

}


/* =========================================================
   INITIALIZE
========================================================= */

renderCategories();

renderTools(
    "network"
);


/* =========================================================
   CONSOLE
========================================================= */

console.log(
    "%c NEXUS // AZ 4.1 ",
    "background:#10182d;color:#9db1ff;font-size:18px;padding:8px"
);

console.log(
    "System initialized."
);
