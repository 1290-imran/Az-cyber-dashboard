```javascript
/* =========================================================
   NEXUS // AZ
   SYSTEM v4.1
   Main JavaScript
========================================================= */

"use strict";


/* =========================================================
   CONFIG
========================================================= */

const CONFIG = {

    AI_WORKER_URL:
        "https://nexus-ai.imranvelizade98.workers.dev/",

    SEARCH_URL:
        "https://www.google.com/search?q="

};


/* =========================================================
   GLOBAL STATE
========================================================= */

let currentCategory = null;
let conversationHistory = [];

const $ = (selector) =>
    document.querySelector(selector);


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initLoader();
    initClock();
    initCategories();
    initModal();
    initSearch();
    initAI();
    initKeyboard();

});


/* =========================================================
   LOADER
========================================================= */

function initLoader() {

    const loader = $("#loader");

    if (!loader) return;

    setTimeout(() => {

        loader.classList.add("hidden");

    }, 900);

}


/* =========================================================
   CLOCK
========================================================= */

function initClock() {

    const clock = $("#clock");
    const date = $("#date");

    if (!clock) return;

    function updateClock() {

        const now = new Date();

        clock.textContent =
            now.toLocaleTimeString(
                "az-AZ",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit"
                }
            );

        if (date) {

            date.textContent =
                now.toLocaleDateString(
                    "az-AZ",
                    {
                        weekday: "long",
                        day: "2-digit",
                        month: "long",
                        year: "numeric"
                    }
                );

        }

    }

    updateClock();

    setInterval(updateClock, 1000);

}


/* =========================================================
   CATEGORIES
========================================================= */

const categories = [

    {
        id: "internet",
        icon: "◉",
        title: "İnternet",
        description: "Axtarış, sürət və bağlantı alətləri"
    },

    {
        id: "office",
        icon: "▣",
        title: "Ofis",
        description: "Word, Excel və sənəd alətləri"
    },

    {
        id: "world",
        icon: "◎",
        title: "Dünya",
        description: "Saat qurşaqları və dünya məlumatları"
    },

    {
        id: "media",
        icon: "▶",
        title: "Media",
        description: "Musiqi və multimedia alətləri"
    },

    {
        id: "security",
        icon: "◇",
        title: "Təhlükəsizlik",
        description: "Şəbəkə və təhlükəsizlik alətləri"
    },

    {
        id: "developer",
        icon: "</>",
        title: "Developer",
        description: "Developer və kodlaşdırma alətləri"
    },

    {
        id: "tools",
        icon: "✣",
        title: "Alətlər",
        description: "Gündəlik faydalı alətlər"
    },

    {
        id: "ai",
        icon: "✦",
        title: "AI",
        description: "Süni intellekt alətləri"
    }

];


function initCategories() {

    const container =
        $("#categories");

    if (!container) return;

    container.innerHTML = "";

    categories.forEach(category => {

        const card =
            document.createElement("button");

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
                    ${category.title}
                </strong>

                <span>
                    ${category.description}
                </span>

            </div>

            <b class="category-arrow">
                →
            </b>

        `;

        card.addEventListener(
            "click",
            () => selectCategory(category.id)
        );

        container.appendChild(card);

    });


    // İlk kateqoriya
    selectCategory("internet");

}


/* =========================================================
   MODULE DATA
========================================================= */

const modules = {

    internet: [

        {
            icon: "⌕",
            title: "Google",
            description: "İnternetdə qlobal axtarış",
            action: () => openExternal(
                "https://www.google.com"
            )
        },

        {
            icon: "◉",
            title: "Sürət testi",
            description: "İnternet bağlantı sürətini yoxla",
            action: () => openExternal(
                "https://www.speedtest.net"
            )
        },

        {
            icon: "◌",
            title: "IP ünvanım",
            description: "İctimai IP ünvanını öyrən",
            action: () => openExternal(
                "https://whatismyipaddress.com"
            )
        },

        {
            icon: "⌁",
            title: "DNS yoxlama",
            description: "DNS məlumatlarını yoxla",
            action: () => openExternal(
                "https://www.dnsleaktest.com"
            )
        }

    ],


    office: [

        {
            icon: "W",
            title: "Word",
            description: "Brauzerdə sənəd yarat və redaktə et",
            action: () => openWord()
        },

        {
            icon: "X",
            title: "Excel",
            description: "Cədvəl yarat və XLSX faylı çıxart",
            action: () => openExcel()
        },

        {
            icon: "▤",
            title: "PDF",
            description: "PDF sənədləri ilə işləmək",
            action: () => openExternal(
                "https://www.ilovepdf.com"
            )
        }

    ],


    world: [

        {
            icon: "🇦🇿",
            title: "Bakı",
            description: "Azərbaycan — Bakı",
            timezone: "Asia/Baku"
        },

        {
            icon: "🇹🇷",
            title: "Ankara",
            description: "Türkiyə — Ankara",
            timezone: "Europe/Istanbul"
        },

        {
            icon: "🇬🇧",
            title: "London",
            description: "Böyük Britaniya — London",
            timezone: "Europe/London"
        },

        {
            icon: "🇺🇸",
            title: "Vaşinqton",
            description: "ABŞ — Vaşinqton",
            timezone: "America/New_York"
        },

        {
            icon: "🇩🇪",
            title: "Berlin",
            description: "Almaniya — Berlin",
            timezone: "Europe/Berlin"
        },

        {
            icon: "🇯🇵",
            title: "Tokio",
            description: "Yaponiya — Tokio",
            timezone: "Asia/Tokyo"
        },

        {
            icon: "🇦🇪",
            title: "Əbu-Dabi",
            description: "BƏƏ — Əbu-Dabi",
            timezone: "Asia/Dubai"
        },

        {
            icon: "🇷🇺",
            title: "Moskva",
            description: "Rusiya — Moskva",
            timezone: "Europe/Moscow"
        },

        {
            icon: "🇫🇷",
            title: "Paris",
            description: "Fransa — Paris",
            timezone: "Europe/Paris"
        }

    ],


    media: [

        {
            icon: "♫",
            title: "YouTube Music",
            description: "Musiqi dinlə",
            action: () => openExternal(
                "https://music.youtube.com"
            )
        },

        {
            icon: "▶",
            title: "YouTube",
            description: "Video və musiqi",
            action: () => openExternal(
                "https://www.youtube.com"
            )
        }

    ],


    security: [

        {
            icon: "◆",
            title: "VirusTotal",
            description: "Fayl və link təhlükəsizliyini yoxla",
            action: () => openExternal(
                "https://www.virustotal.com"
            )
        },

        {
            icon: "◇",
            title: "Have I Been Pwned",
            description: "E-poçt məlumat sızmasını yoxla",
            action: () => openExternal(
                "https://haveibeenpwned.com"
            )
        }

    ],


    developer: [

        {
            icon: "⌘",
            title: "GitHub",
            description: "Kod və layihələr",
            action: () => openExternal(
                "https://github.com"
            )
        },

        {
            icon: "</>",
            title: "JSON Formatter",
            description: "JSON məlumatlarını formatla",
            action: () => openExternal(
                "https://jsonformatter.org"
            )
        }

    ],


    tools: [

        {
            icon: "＋",
            title: "Kalkulyator",
            description: "iOS üslubunda kalkulyator",
            action: () => openCalculator()
        },

        {
            icon: "◷",
            title: "Dünya saatları",
            description: "Şəhərlərin yerli vaxtını göstər",
            action: () => openWorldClock()
        }

    ],


    ai: [

        {
            icon: "✦",
            title: "NEXUS AI",
            description: "Süni intellekt köməkçisi",
            action: () => openAI()
        },

        {
            icon: "◈",
            title: "ChatGPT",
            description: "OpenAI ChatGPT",
            action: () => openExternal(
                "https://chatgpt.com"
            )
        }

    ]

};


/* =========================================================
   SELECT CATEGORY
========================================================= */

function selectCategory(id) {

    currentCategory = id;

    const grid =
        $("#moduleGrid");

    const hint =
        $("#moduleHint");

    if (!grid) return;

    grid.innerHTML = "";

    const selected =
        modules[id] || [];

    const category =
        categories.find(
            item => item.id === id
        );

    if (hint) {

        hint.textContent =
            category
                ? category.title.toUpperCase()
                : "";

    }


    selected.forEach((item, index) => {

        const card =
            document.createElement("button");

        card.className =
            "module-card";

        card.style.animationDelay =
            `${index * 0.05}s`;

        card.innerHTML = `

            <div class="module-icon">
                ${item.icon}
            </div>

            <div class="module-info">

                <strong>
                    ${item.title}
                </strong>

                <span>
                    ${item.description}
                </span>

            </div>

            <b class="module-arrow">
                →
            </b>

        `;


        card.addEventListener(
            "click",
            () => {

                if (item.action) {

                    item.action();

                } else if (item.timezone) {

                    showTimezone(item);

                }

            }
        );


        grid.appendChild(card);

    });


    document
        .querySelectorAll(".category-card")
        .forEach(card => {

            card.classList.toggle(
                "active",
                card.dataset.category === id
            );

        });

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


    if (close) {

        close.addEventListener(
            "click",
            closeModal
        );

    }


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


function openModal(content) {

    const modal =
        $("#modal");

    const contentBox =
        $("#modalContent");

    if (!modal || !contentBox) return;

    contentBox.innerHTML =
        content;

    modal.classList.add("open");

}


function closeModal() {

    const modal =
        $("#modal");

    if (!modal) return;

    modal.classList.remove("open");

}


/* =========================================================
   WORD
========================================================= */

function openWord() {

    openModal(`

        <div class="tool-window word-tool">

            <div class="tool-header">

                <strong>
                    Word
                </strong>

                <button
                    onclick="downloadWord()"
                >
                    Yüklə
                </button>

            </div>

            <input
                id="wordTitle"
                class="word-title"
                placeholder="Sənədin adı"
            >

            <textarea
                id="wordEditor"
                class="word-editor"
                placeholder="Sənədinizi burada yazın..."
            ></textarea>

        </div>

    `);

}


async function downloadWord() {

    const title =
        $("#wordTitle")?.value ||
        "NEXUS Sənəd";

    const text =
        $("#wordEditor")?.value ||
        "";


    if (
        typeof docx === "undefined"
    ) {

        alert(
            "Word modulu yüklənməyib."
        );

        return;

    }


    try {

        const {
            Document,
            Packer,
            Paragraph
        } = docx;


        const document =
            new Document({

                sections: [

                    {

                        children:
                            text
                                .split("\n")
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
                document
            );


        downloadBlob(
            blob,
            `${title}.docx`
        );

    } catch (error) {

        console.error(error);

        alert(
            "Word faylı yaradılarkən xəta baş verdi."
        );

    }

}


/* =========================================================
   EXCEL
========================================================= */

function openExcel() {

    openModal(`

        <div class="tool-window excel-tool">

            <div class="tool-header">

                <strong>
                    Excel
                </strong>

                <button
                    onclick="downloadExcel()"
                >
                    XLSX yüklə
                </button>

            </div>

            <div class="excel-toolbar">

                <button onclick="addExcelRow()">
                    + Sətir
                </button>

                <button onclick="addExcelColumn()">
                    + Sütun
                </button>

            </div>

            <table
                id="excelTable"
                class="excel-table"
            >

                <tbody>

                    <tr>

                        <td contenteditable="true">
                            A1
                        </td>

                        <td contenteditable="true">
                            B1
                        </td>

                        <td contenteditable="true">
                            C1
                        </td>

                    </tr>

                    <tr>

                        <td contenteditable="true">
                            A2
                        </td>

                        <td contenteditable="true">
                            B2
                        </td>

                        <td contenteditable="true">
                            C2
                        </td>

                    </tr>

                    <tr>

                        <td contenteditable="true">
                            A3
                        </td>

                        <td contenteditable="true">
                            B3
                        </td>

                        <td contenteditable="true">
                            C3
                        </td>

                    </tr>

                </tbody>

            </table>

        </div>

    `);

}


function addExcelRow() {

    const table =
        $("#excelTable");

    if (!table) return;

    const columns =
        table.rows[0]?.cells.length || 3;

    const row =
        table.insertRow();

    for (
        let i = 0;
        i < columns;
        i++
    ) {

        const cell =
            row.insertCell();

        cell.contentEditable =
            "true";

        cell.textContent =
            "";

    }

}


function addExcelColumn() {

    const table =
        $("#excelTable");

    if (!table) return;

    Array
        .from(table.rows)
        .forEach(row => {

            const cell =
                row.insertCell();

            cell.contentEditable =
                "true";

        });

}


function downloadExcel() {

    if (
        typeof XLSX === "undefined"
    ) {

        alert(
            "Excel modulu yüklənməyib."
        );

        return;

    }


    const table =
        $("#excelTable");

    if (!table) return;


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
        "NEXUS.xlsx"
    );

}


/* =========================================================
   CALCULATOR
========================================================= */

function openCalculator() {

    openModal(`

        <div class="calculator">

            <div
                id="calcDisplay"
                class="calc-display"
            >
                0
            </div>

            <div class="calc-buttons">

                <button onclick="calcClear()">
                    AC
                </button>

                <button onclick="calcDelete()">
                    ⌫
                </button>

                <button onclick="calcInput('%')">
                    %
                </button>

                <button onclick="calcInput('/')">
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

                <button onclick="calcInput('*')">
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

                <button onclick="calcInput('-')">
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

                <button onclick="calcInput('+')">
                    +
                </button>


                <button
                    class="zero"
                    onclick="calcInput('0')"
                >
                    0
                </button>

                <button onclick="calcInput('.')">
                    .
                </button>

                <button
                    onclick="calcEquals()"
                >
                    =
                </button>

            </div>

        </div>

    `);

}


let calculatorExpression = "";


function calcInput(value) {

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


function calcEquals() {

    try {

        let expression =
            calculatorExpression
                .replace(
                    /%/g,
                    "/100"
                );


        // Sadə təhlükəsiz riyazi ifadələr
        if (
            !/^[0-9+\-*/().\s]+$/
                .test(expression)
        ) {

            throw new Error();

        }


        const result =
            Function(
                `"use strict"; return (${expression})`
            )();


        calculatorExpression =
            String(result);

        updateCalcDisplay();

    } catch {

        calculatorExpression =
            "";

        const display =
            $("#calcDisplay");

        if (display) {

            display.textContent =
                "Xəta";

        }

    }

}


function updateCalcDisplay() {

    const display =
        $("#calcDisplay");

    if (!display) return;

    display.textContent =
        calculatorExpression ||
        "0";

}


/* =========================================================
   WORLD CLOCK
========================================================= */

function showTimezone(item) {

    openModal(`

        <div class="world-clock-modal">

            <div class="country-big-icon">
                ${item.icon}
            </div>

            <h2>
                ${item.title}
            </h2>

            <p>
                ${item.description}
            </p>

            <div
                class="world-clock-time"
                data-timezone="${item.timezone}"
            >
                --
            </div>

            <small>
                Yerli vaxt
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

            <h2>
                Dünya saatları
            </h2>

            <div class="world-clock-grid">

                ${cities.map(city => `

                    <div
                        class="world-clock-card"
                        data-timezone="${city.timezone}"
                    >

                        <div>
                            ${city.icon}
                        </div>

                        <strong>
                            ${city.title}
                        </strong>

                        <span>
                            ${city.description}
                        </span>

                        <b>
                            --
                        </b>

                    </div>

                `).join("")}

            </div>

        </div>

    `);


    updateWorldClock();

}


function updateWorldClock() {

    document
        .querySelectorAll(
            "[data-timezone]"
        )
        .forEach(element => {

            const timezone =
                element.dataset.timezone;

            const time =
                new Intl.DateTimeFormat(
                    "az-AZ",
                    {
                        timeZone: timezone,
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit"
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
                    element.querySelector("b");

                if (clock) {

                    clock.textContent =
                        time;

                }

            } else {

                element.textContent =
                    time;

            }

        });

}


setInterval(
    updateWorldClock,
    1000
);


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

        if (!query) return;

        window.open(
            CONFIG.SEARCH_URL +
            encodeURIComponent(query),
            "_blank"
        );

    }


    if (button) {

        button.addEventListener(
            "click",
            search
        );

    }


    input.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter"
            ) {

                search();

            }

        }
    );

}


/* =========================================================
   AI
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


function openAI() {

    if (
        document.querySelector(
            ".ai-interface"
        )
    ) {

        return;

    }


    const interfaceElement =
        document.createElement("div");

    interfaceElement.className =
        "ai-interface";


    interfaceElement.innerHTML = `

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


                <button
                    class="ai-close"
                    id="aiClose"
                >
                    ×
                </button>

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

                        <button>
                            Mənə bir şey öyrət
                        </button>

                        <button>
                            Azərbaycan haqqında danış
                        </button>

                        <button>
                            Kompüter problemlərini həll et
                        </button>

                        <button>
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
                    ></textarea>

                    <button
                        id="aiSend"
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
        interfaceElement
    );


    document.body.style.overflow =
        "hidden";


    $("#aiClose")
        ?.addEventListener(
            "click",
            closeAI
        );


    $("#aiSend")
        ?.addEventListener(
            "click",
            sendAI
        );


    $("#aiInput")
        ?.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" &&
                    !event.shiftKey
                ) {

                    event.preventDefault();

                    sendAI();

                }

            }
        );


    document
        .querySelectorAll(
            ".ai-suggestions button"
        )
        .forEach(button => {

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

        });

}


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
   SEND AI MESSAGE
========================================================= */

async function sendAI() {

    const input =
        $("#aiInput");

    const chat =
        $("#aiChat");

    if (!input || !chat) return;


    const message =
        input.value.trim();


    if (!message) return;


    addAIMessage(
        "user",
        message
    );


    input.value =
        "";


    conversationHistory.push({

        role: "user",

        content: message

    });


    const loading =
        document.createElement("div");

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


    try {

        const response =
            await fetch(
                CONFIG.AI_WORKER_URL,
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        message: message,

                        history:
                            conversationHistory

                    })

                }
            );


        const data =
            await response.json();


        loading.remove();


        if (!response.ok) {

            throw new Error(
                data.error ||
                "AI server xətası."
            );

        }


        const answer =
            data.answer ||
            "Cavab alınmadı.";


        conversationHistory.push({

            role: "assistant",

            content: answer

        });


        addAIMessage(
            "assistant",
            answer
        );


    } catch (error) {

        console.error(
            "NEXUS AI:",
            error
        );


        loading.remove();


        addAIMessage(
            "assistant",
            "Bağlantı zamanı xəta baş verdi. Bir az sonra yenidən cəhd et."
        );

    }


    scrollAI();

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


    const message =
        document.createElement("div");


    message.className =
        role === "user"
            ? "ai-message user"
            : "ai-message assistant";


    if (
        role === "user"
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

}


function formatAIResponse(text) {

    return escapeHTML(text)

        .replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        )

        .replace(
            /`([^`]+)`/g,
            "<code>$1</code>"
        )

        .replace(
            /\n/g,
            "<br>"
        );

}


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

function escapeHTML(value) {

    return String(value)

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
   EXTERNAL LINKS
========================================================= */

function openExternal(url) {

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
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href =
        url;

    link.download =
        filename;

    document.body.appendChild(
        link
    );

    link.click();

    link.remove();

    URL.revokeObjectURL(
        url
    );

}


/* =========================================================
   SCROLL TO CATEGORIES
========================================================= */

function scrollToCategories() {

    const section =
        $("#categoriesSection");

    if (!section) return;

    section.scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}


/* =========================================================
   KEYBOARD
========================================================= */

function initKeyboard() {

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
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

window.selectCategory =
    selectCategory;

window.scrollToCategories =
    scrollToCategories;

window.closeModal =
    closeModal;

window.openWord =
    openWord;

window.downloadWord =
    downloadWord;

window.openExcel =
    openExcel;

window.downloadExcel =
    downloadExcel;

window.addExcelRow =
    addExcelRow;

window.addExcelColumn =
    addExcelColumn;

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

window.openWorldClock =
    openWorldClock;


/* =========================================================
   END
========================================================= */
```
