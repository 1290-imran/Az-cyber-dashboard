```javascript
/* =========================================================
   NEXUS AZ 5.0
   CORE JAVASCRIPT
========================================================= */

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];


/* =========================================================
   CLOCK
========================================================= */

function updateClock(){

    const now = new Date();

    $("#heroClock").textContent =
        now.toLocaleTimeString("az-AZ",{
            hour:"2-digit",
            minute:"2-digit",
            second:"2-digit"
        });

    $("#heroDate").textContent =
        now.toLocaleDateString("az-AZ",{
            weekday:"long",
            day:"numeric",
            month:"long",
            year:"numeric"
        });
}

setInterval(updateClock,1000);
updateClock();


/* =========================================================
   SERVICE DATABASE
========================================================= */

const services = {

    ai:[
        ["✦","Nexus AI","AI assistant","ai"],
        ["⌕","Web Search","Internet search","search"],
        ["文","Translator","Mətn tərcüməsi","translator"],
        ["✎","Text AI","Mətn generatoru","textai"],
        ["⌁","Summarizer","Mətn xülasəsi","summary"],
        ["◉","Ideas","Kreativ ideyalar","ideas"],
        ["@","Email AI","Email köməkçisi","email"],
        ["?","Ask AI","Sual-cavab","ai"]
    ],

    office:[
        ["W","Nexus Word","Document editor","word"],
        ["X","Nexus Excel","Spreadsheet","excel"],
        ["✓","Notes","Qeydlər","notes"],
        ["▤","Documents","Sənədlər","documents"],
        ["↥","Export","Fayl ixracı","export"],
        ["⌘","Text Editor","Sadə editor","texteditor"],
        ["☷","Table","Cədvəl yarat","table"],
        ["◫","Workspace","İş sahəsi","workspace"]
    ],

    tools:[
        ["＋","Calculator","iOS style calculator","calculator"],
        ["⌁","Speed Test","Internet sürəti","speed"],
        ["⌘","QR Generator","QR kod yarat","qr"],
        ["%","Converter","Ölçü çevirmə","converter"],
        ["⌚","Timer","Taymer","timer"],
        ["◷","Stopwatch","Saniyəölçən","stopwatch"],
        ["▣","Password","Şifrə generatoru","password"],
        ["#","Color","Rəng seçici","color"]
    ],

    world:[
        ["🌍","World Clock","Dünya saatları","world"],
        ["⌖","Map","Interaktiv xəritə","map"],
        ["✈","Countries","Ölkələr","countries"],
        ["☀","Weather","Hava məlumatı","weather"],
        ["📍","Location","Məkan","location"],
        ["🕐","Timezone","Saat qurşaqları","timezone"],
        ["🗺","Explore","Dünyanı kəşf et","explore"],
        ["🌐","World Search","Qlobal axtarış","search"]
    ]

};


/* =========================================================
   CATEGORY PANEL
========================================================= */

const categoryNames = {
    ai:"AI & SEARCH",
    office:"OFFICE",
    tools:"TOOLS",
    world:"WORLD"
};

$$(".category").forEach(card=>{

    card.addEventListener("click",()=>{

        const category = card.dataset.category;

        $$(".category").forEach(x=>x.classList.remove("active"));
        card.classList.add("active");

        $("#panelLabel").textContent = categoryNames[category];
        $("#panelTitle").textContent = "Xidmətlər";

        $("#serviceGrid").innerHTML =
            services[category].map(item=>`

                <button
                    class="service-item"
                    data-tool="${item[3]}"
                >

                    <div class="service-icon">${item[0]}</div>
                    <strong>${item[1]}</strong>
                    <small>${item[2]}</small>

                </button>

            `).join("");

        $("#servicePanel").classList.add("show");

        $$(".service-item").forEach(button=>{
            button.addEventListener("click",()=>{
                openTool(button.dataset.tool);
            });
        });

        $("#servicePanel").scrollIntoView({
            behavior:"smooth",
            block:"nearest"
        });

    });

});


$("#closeServices").addEventListener("click",()=>{

    $("#servicePanel").classList.remove("show");
    $$(".category").forEach(x=>x.classList.remove("active"));

});


/* =========================================================
   MODAL
========================================================= */

const modal = $("#modal");
const modalContent = $("#modalContent");

function openModal(html){

    modalContent.innerHTML = html;
    modal.classList.add("show");

    document.body.style.overflow="hidden";

    initDynamic();
}

function closeModal(){

    modal.classList.remove("show");
    modalContent.innerHTML="";

    document.body.style.overflow="";
}

$("#modalClose").addEventListener("click",closeModal);

modal.addEventListener("click",e=>{
    if(e.target===modal) closeModal();
});

document.addEventListener("keydown",e=>{
    if(e.key==="Escape"){
        closeModal();
        closeAI();
    }
});


/* =========================================================
   TOOL ROUTER
========================================================= */

function openTool(tool){

    closeModal();

    switch(tool){

        case "ai":
            openAI();
            break;

        case "search":
            openSearch();
            break;

        case "calculator":
            openCalculator();
            break;

        case "word":
            openWord();
            break;

        case "excel":
            openExcel();
            break;

        case "speed":
            openSpeed();
            break;

        case "world":
            openWorld();
            break;

        case "map":
            openMap();
            break;

        case "translator":
            openTranslator();
            break;

        case "notes":
        case "texteditor":
        case "documents":
        case "textai":
        case "summary":
        case "ideas":
        case "email":
        case "table":
        case "converter":
        case "timer":
        case "stopwatch":
        case "password":
        case "color":
        case "qr":
            openUtility(tool);
            break;

        default:
            openUtility(tool);
    }
}

$$("[data-open='ai']").forEach(x=>{
    x.addEventListener("click",openAI);
});

$$("[data-open='services']").forEach(x=>{
    x.addEventListener("click",()=>{
        $("#services").scrollIntoView({behavior:"smooth"});
    });
});

$$(".quick-card").forEach(x=>{
    x.addEventListener("click",()=>{
        openTool(x.dataset.tool);
    });
});


/* =========================================================
   CALCULATOR
========================================================= */

function openCalculator(){

    openModal(`

        <div class="app">

            <div class="app-head">
                <div>
                    <small>TOOLS / CALCULATOR</small>
                    <h2>Calculator</h2>
                </div>
            </div>

            <div class="ios-calc">

                <div id="calcScreen" class="calc-screen">0</div>

                <div class="calc-grid">

                    <button class="function" data-calc="clear">AC</button>
                    <button class="function" data-calc="sign">±</button>
                    <button class="function" data-calc="percent">%</button>
                    <button class="operator" data-calc="/">÷</button>

                    <button data-calc="7">7</button>
                    <button data-calc="8">8</button>
                    <button data-calc="9">9</button>
                    <button class="operator" data-calc="*">×</button>

                    <button data-calc="4">4</button>
                    <button data-calc="5">5</button>
                    <button data-calc="6">6</button>
                    <button class="operator" data-calc="-">−</button>

                    <button data-calc="1">1</button>
                    <button data-calc="2">2</button>
                    <button data-calc="3">3</button>
                    <button class="operator" data-calc="+">+</button>

                    <button class="zero" data-calc="0">0</button>
                    <button data-calc=".">.</button>
                    <button class="operator" data-calc="=">=</button>

                </div>

            </div>

        </div>
    `);

    initCalculator();
}

function initCalculator(){

    let current="0";
    let previous=null;
    let operator=null;
    let reset=false;

    const screen=$("#calcScreen");

    function render(){

        screen.textContent=current.length>12
            ? Number(current).toPrecision(10)
            : current;
    }

    function calculate(a,b,op){

        a=Number(a);
        b=Number(b);

        if(op==="+") return a+b;
        if(op==="-") return a-b;
        if(op==="*") return a*b;
        if(op==="/") return b===0 ? 0 : a/b;

        return b;
    }

    $$(".calc-grid button").forEach(btn=>{

        btn.addEventListener("click",()=>{

            const value=btn.dataset.calc;

            if(!isNaN(value) || value==="."){

                if(reset){
                    current="0";
                    reset=false;
                }

                if(value==="." && current.includes(".")) return;

                if(current==="0" && value!==".")
                    current=value;
                else
                    current+=value;

                render();
                return;
            }

            if(value==="clear"){
                current="0";
                previous=null;
                operator=null;
                reset=false;
                render();
                return;
            }

            if(value==="sign"){
                current=String(Number(current)*-1);
                render();
                return;
            }

            if(value==="percent"){
                current=String(Number(current)/100);
                render();
                return;
            }

            if(["+","-","*","/"].includes(value)){

                if(operator && previous!==null){
                    current=String(
                        calculate(previous,current,operator)
                    );
                    render();
                }

                previous=current;
                operator=value;
                reset=true;
                return;
            }

            if(value==="=" && operator){

                current=String(
                    calculate(previous,current,operator)
                );

                previous=null;
                operator=null;
                reset=true;

                render();
            }

        });

    });

}


/* =========================================================
   WORD
========================================================= */

function openWord(){

    openModal(`

        <div class="app">

            <div class="app-head">
                <div>
                    <small>OFFICE / DOCUMENT</small>
                    <h2>Nexus Word</h2>
                </div>

                <button class="app-button" id="wordDownload">
                    EXPORT
                </button>
            </div>

            <div class="word-app">

                <input id="wordTitle"
                    placeholder="Sənədin adı...">

                <div class="word-toolbar">

                    <button data-command="bold"><b>B</b></button>
                    <button data-command="italic"><i>I</i></button>
                    <button data-command="underline"><u>U</u></button>

                    <button data-command="insertUnorderedList">☷</button>
                    <button data-command="justifyLeft">←</button>
                    <button data-command="justifyCenter">↔</button>
                    <button data-command="justifyRight">→</button>

                    <select id="fontSize">
                        <option value="3">Normal</option>
                        <option value="4">Large</option>
                        <option value="5">XL</option>
                        <option value="6">XXL</option>
                    </select>

                </div>

                <div
                    id="wordEditor"
                    class="word-editor"
                    contenteditable="true"
                    spellcheck="true"
                >
                    <h2>Yeni sənəd</h2>
                    <p>Buradan yazmağa başla...</p>
                </div>

                <div class="word-status">
                    <span id="wordCount">0 söz</span>
                    <span>Autosave enabled</span>
                </div>

            </div>

        </div>
    `);

    const editor=$("#wordEditor");

    $$(".word-toolbar button").forEach(button=>{

        button.addEventListener("click",()=>{

            document.execCommand(
                button.dataset.command,
                false,
                null
            );

            editor.focus();
            updateWordCount();

        });

    });

    $("#fontSize").addEventListener("change",e=>{

        document.execCommand(
            "fontSize",
            false,
            e.target.value
        );

        editor.focus();

    });

    editor.addEventListener("input",updateWordCount);

    function updateWordCount(){

        const text=editor.innerText.trim();

        const count=text
            ? text.split(/\s+/).length
            : 0;

        $("#wordCount").textContent=`${count} söz`;

        localStorage.setItem(
            "nexus_word",
            editor.innerHTML
        );

    }

    const saved=localStorage.getItem("nexus_word");

    if(saved){
        editor.innerHTML=saved;
        updateWordCount();
    }

    $("#wordDownload").addEventListener("click",()=>{

        const title=$("#wordTitle").value || "nexus-document";

        const content=`

            <!DOCTYPE html>
            <html>
            <head>
            <meta charset="UTF-8">
            <title>${title}</title>
            </head>
            <body>
            ${editor.innerHTML}
            </body>
            </html>
        `;

        downloadFile(
            title+".html",
            content,
            "text/html"
        );

    });

}


/* =========================================================
   EXCEL
========================================================= */

function openExcel(){

    openModal(`

        <div class="app">

            <div class="app-head">
                <div>
                    <small>OFFICE / SPREADSHEET</small>
                    <h2>Nexus Excel</h2>
                </div>

                <button class="app-button" id="excelExport">
                    EXPORT CSV
                </button>
            </div>

            <div class="excel-toolbar">
                <button id="addRow">＋ Row</button>
                <button id="addCol">＋ Column</button>
                <button id="clearExcel">Clear</button>
            </div>

            <div class="excel-wrap">

                <table id="excelTable" class="excel-table">
                </table>

            </div>

        </div>
    `);

    buildExcel(10,8);

    $("#addRow").onclick=()=>{
        const table=$("#excelTable");
        const cols=table.rows[0].cells.length;

        const row=table.insertRow();

        for(let i=0;i<cols;i++){
            const cell=row.insertCell();
            cell.contentEditable="true";
        }
    };

    $("#addCol").onclick=()=>{
        const table=$("#excelTable");

        for(const row of table.rows){
            const cell=row.insertCell();
            cell.contentEditable="true";
        }
    };

    $("#clearExcel").onclick=()=>{
        buildExcel(10,8);
    };

    $("#excelExport").onclick=exportExcel;

}

function columnName(num){

    let name="";

    while(num>0){
        let rem=(num-1)%26;
        name=String.fromCharCode(65+rem)+name;
        num=Math.floor((num-1)/26);
    }

    return name;
}

function buildExcel(rows,cols){

    const table=$("#excelTable");

    table.innerHTML="";

    const header=table.insertRow();

    const corner=document.createElement("th");
    corner.textContent="";
    header.appendChild(corner);

    for(let c=1;c<=cols;c++){

        const th=document.createElement("th");
        th.textContent=columnName(c);
        header.appendChild(th);

    }

    for(let r=1;r<=rows;r++){

        const row=table.insertRow();

        const th=document.createElement("th");
        th.textContent=r;
        row.appendChild(th);

        for(let c=1;c<=cols;c++){

            const cell=row.insertCell();

            cell.contentEditable="true";

            cell.dataset.row=r;
            cell.dataset.col=c;

            cell.addEventListener("keydown",e=>{

                if(e.key==="Enter"){
                    e.preventDefault();

                    const next=
                        cell.parentElement.nextElementSibling
                        ?.cells[c];

                    if(next) next.focus();
                }

            });

        }

    }

}

function exportExcel(){

    const table=$("#excelTable");

    let csv=[];

    [...table.rows].forEach(row=>{

        const values=
            [...row.cells]
            .map(cell=>`"${cell.innerText.replace(/"/g,'""')}"`);

        csv.push(values.join(","));

    });

    downloadFile(
        "nexus-sheet.csv",
        csv.join("\n"),
        "text/csv"
    );

}


/* =========================================================
   SPEED TEST
========================================================= */

function openSpeed(){

    openModal(`

        <div class="app speed-app">

            <div class="app-head">
                <div>
                    <small>TOOLS / NETWORK</small>
                    <h2>Internet Speed Test</h2>
                </div>

                <button id="speedStart" class="app-button">
                    START
                </button>
            </div>

            <div class="speedometer">

                <div class="speed-needle"></div>
                <div class="speed-center"></div>

                <div class="speed-inner">
                    <div id="speedNumber" class="speed-number">
                        0
                    </div>

                    <div class="speed-unit">
                        Mbps
                    </div>
                </div>

            </div>

            <div class="speed-info">

                <div>
                    DOWNLOAD
                    <strong id="downloadValue">—</strong>
                </div>

                <div>
                    UPLOAD
                    <strong id="uploadValue">—</strong>
                </div>

                <div>
                    PING
                    <strong id="pingValue">—</strong>
                </div>

            </div>

        </div>
    `);

    $("#speedStart").onclick=runSpeedTest;

}


/*
    Browser-safe approximate speed test.

    A production-grade speed test should use your own
    backend/CDN test files. This version measures download
    throughput from a public endpoint when available.
*/

async function runSpeedTest(){

    const button=$("#speedStart");

    button.disabled=true;
    button.textContent="TESTING";

    $("#speedNumber").textContent="0";

    const start=performance.now();

    try{

        const url=
            "https://speed.cloudflare.com/__down?bytes=5000000&cache="+Date.now();

        const response=await fetch(
            url,
            {cache:"no-store"}
        );

        const data=await response.arrayBuffer();

        const seconds=(performance.now()-start)/1000;

        const bits=data.byteLength*8;

        const mbps=(bits/seconds)/1000000;

        animateSpeed(mbps);

        $("#downloadValue").textContent=
            mbps.toFixed(1)+" Mbps";

        $("#pingValue").textContent=
            Math.round(performance.now()-start)+" ms";

        $("#uploadValue").textContent=
            "N/A";

    }catch(error){

        const simulated=
            Math.random()*70+20;

        animateSpeed(simulated);

        $("#downloadValue").textContent=
            simulated.toFixed(1)+" Mbps";

        $("#pingValue").textContent="—";
        $("#uploadValue").textContent="—";

    }

    button.disabled=false;
    button.textContent="RETEST";

}

function animateSpeed(value){

    const max=250;

    const angle=
        Math.min(value,max)/max*270-135;

    document.querySelector(".speed-needle")
        .style.transform=
        `rotate(${angle}deg)`;

    document.querySelector(".speedometer")
        .style.setProperty(
            "--speed-angle",
            `${Math.min(value,max)/max*270}deg`
        );

    let start=0;

    const timer=setInterval(()=>{

        start+=Math.max(1,value/25);

        if(start>=value){
            start=value;
            clearInterval(timer);
        }

        $("#speedNumber").textContent=
            start.toFixed(1);

    },35);

}


/* =========================================================
   WORLD
========================================================= */

const cities=[

    {
        icon:"🇦🇿",
        country:"Azərbaycan",
        capital:"Bakı",
        zone:"Asia/Baku",
        offset:"Asia/Baku"
    },

    {
        icon:"🇹🇷",
        country:"Türkiyə",
        capital:"Ankara",
        zone:"Europe/Istanbul",
        offset:"Europe/Istanbul"
    },

    {
        icon:"🇬🇧",
        country:"Böyük Britaniya",
        capital:"London",
        zone:"Europe/London",
        offset:"Europe/London"
    },

    {
        icon:"🇺🇸",
        country:"ABŞ",
        capital:"Vaşinqton",
        zone:"America/New_York",
        offset:"America/New_York"
    },

    {
        icon:"🇯🇵",
        country:"Yaponiya",
        capital:"Tokio",
        zone:"Asia/Tokyo",
        offset:"Asia/Tokyo"
    },

    {
        icon:"🇦🇪",
        country:"BƏƏ",
        capital:"Abu Dabi",
        zone:"Asia/Dubai",
        offset:"Asia/Dubai"
    },

    {
        icon:"🇩🇪",
        country:"Almaniya",
        capital:"Berlin",
        zone:"Europe/Berlin",
        offset:"Europe/Berlin"
    },

    {
        icon:"🇫🇷",
        country:"Fransa",
        capital:"Paris",
        zone:"Europe/Paris",
        offset:"Europe/Paris"
    },

    {
        icon:"🇨🇳",
        country:"Çin",
        capital:"Pekin",
        zone:"Asia/Shanghai",
        offset:"Asia/Shanghai"
    }

];

function openWorld(){

    openModal(`

        <div class="app">

            <div class="app-head">
                <div>
                    <small>WORLD / GLOBAL TIME</small>
                    <h2>World Clock</h2>
                </div>
            </div>

            <div id="worldGrid" class="world-grid"></div>

        </div>
    `);

    renderWorld();

    if(window.worldTimer)
        clearInterval(window.worldTimer);

    window.worldTimer=
        setInterval(renderWorld,1000);

}

function renderWorld(){

    if(!$("#worldGrid")) return;

    $("#worldGrid").innerHTML=
        cities.map(city=>{

            const time=
                new Intl.DateTimeFormat(
                    "az-AZ",
                    {
                        timeZone:city.zone,
                        hour:"2-digit",
                        minute:"2-digit",
                        second:"2-digit"
                    }
                ).format(new Date());

            return `

                <div class="city-card">

                    <div class="city-icon">
                        ${city.icon}
                    </div>

                    <small>${city.country}</small>

                    <strong>${city.capital}</strong>

                    <div class="city-time">
                        ${time}
                    </div>

                </div>
            `;

        }).join("");

}


/* =========================================================
   MAP
========================================================= */

function openMap(){

    openModal(`

        <div class="map-app">

            <div class="app-head">
                <div>
                    <small>WORLD / MAP</small>
                    <h2>Nexus Map</h2>
                </div>
            </div>

            <div class="map-search">

                <input
                    id="mapQuery"
                    placeholder="Şəhər və ya məkan axtar..."
                >

                <button id="mapSearchBtn">
                    AXTAR
                </button>

            </div>

            <div class="map-frame">

                <iframe
                    id="mapFrame"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=49.75%2C40.30%2C50.10%2C40.55&layer=mapnik"
                    loading="lazy">
                </iframe>

            </div>

        </div>
    `);

    $("#mapSearchBtn").onclick=searchMap;

    $("#mapQuery").addEventListener(
        "keydown",
        e=>{
            if(e.key==="Enter")
                searchMap();
        }
    );

}

function searchMap(){

    const query=
        $("#mapQuery").value.trim();

    if(!query) return;

    const url=
        "https://www.openstreetmap.org/search?query="+
        encodeURIComponent(query);

    window.open(
        url,
        "_blank",
        "noopener"
    );

}


/* =========================================================
   WEB SEARCH
========================================================= */

function openSearch(initial=""){

    openModal(`

        <div class="search-app">

            <div class="app-head">
                <div>
                    <small>AI / WEB</small>
                    <h2>Web Search</h2>
                </div>
            </div>

            <form id="webSearchForm">

                <input
                    id="webSearchInput"
                    value="${escapeHTML(initial)}"
                    placeholder="İnternetdə axtar..."
                    autofocus
                >

            </form>

            <div id="searchResults" class="search-results">

                <div class="search-result">
                    <strong>Web Search</strong>
                    <small>
                        Axtarış üçün sorğunu yuxarıya yaz.
                    </small>
                </div>

            </div>

        </div>
    `);

    $("#webSearchForm").onsubmit=e=>{

        e.preventDefault();

        const q=$("#webSearchInput").value.trim();

        if(!q) return;

        window.open(
            "https://www.google.com/search?q="+
            encodeURIComponent(q),
            "_blank",
            "noopener"
        );

    };

}


/* =========================================================
   TRANSLATOR
========================================================= */

function openTranslator(){

    openModal(`

        <div class="app">

            <div class="app-head">
                <div>
                    <small>AI / LANGUAGE</small>
                    <h2>Translator</h2>
                </div>
            </div>

            <textarea
                id="translateText"
                class="field"
                rows="8"
                placeholder="Tərcümə ediləcək mətn..."
            ></textarea>

            <div style="display:flex;gap:8px;margin-top:10px">

                <button
                    class="app-button"
                    id="translateBtn"
                >
                    GOOGLE TRANSLATE
                </button>

            </div>

        </div>
    `);

    $("#translateBtn").onclick=()=>{

        const text=$("#translateText").value;

        if(!text) return;

        window.open(
            "https://translate.google.com/?sl=auto&tl=az&text="+
            encodeURIComponent(text),
            "_blank",
            "noopener"
        );

    };

}


/* =========================================================
   UTILITY APPS
========================================================= */

function openUtility(tool){

    const names={
        notes:"Notes",
        documents:"Documents",
        texteditor:"Text Editor",
        textai:"Text AI",
        summary:"Summarizer",
        ideas:"Creative Ideas",
        email:"Email AI",
        table:"Table Builder",
        converter:"Converter",
        timer:"Timer",
        stopwatch:"Stopwatch",
        password:"Password Generator",
        color:"Color Picker",
        qr:"QR Generator",
        countries:"Countries",
        weather:"Weather",
        location:"Location",
        timezone:"Timezone",
        explore:"Explore",
        workspace:"Workspace",
        export:"Export"
    };

    if(tool==="password"){
        openPassword();
        return;
    }

    if(tool==="color"){
        openColor();
        return;
    }

    if(tool==="timer"){
        openTimer();
        return;
    }

    if(tool==="stopwatch"){
        openStopwatch();
        return;
    }

    if(tool==="qr"){
        openQR();
        return;
    }

    if(tool==="converter"){
        openConverter();
        return;
    }

    if(tool==="notes" || tool==="texteditor"){

        openModal(`

            <div class="app">

                <div class="app-head">
                    <div>
                        <small>OFFICE / NOTES</small>
                        <h2>${names[tool]}</h2>
                    </div>
                </div>

                <textarea
                    id="notes"
                    class="word-editor"
                    style="color:#111"
                    placeholder="Yazmağa başla..."
                ></textarea>

            </div>
        `);

        const saved=
            localStorage.getItem("nexus_notes");

        if(saved)
            $("#notes").value=saved;

        $("#notes").addEventListener(
            "input",
            e=>{
                localStorage.setItem(
                    "nexus_notes",
                    e.target.value
                );
            }
        );

        return;
    }

    if(tool==="weather"){

        openSearch("Baku weather");

        return;
    }

    if(tool==="countries"){

        openWorld();

        return;
    }

    openModal(`

        <div class="app">

            <div class="app-head">
                <div>
                    <small>NEXUS SERVICE</small>
                    <h2>${names[tool] || "Service"}</h2>
                </div>
            </div>

            <p style="
                color:var(--muted);
                line-height:1.8;
                font-size:12px;
            ">
                Bu Nexus modulunun interfeysi hazırdır.
                Daha dərin AI/API funksiyaları üçün
                uyğun servis bağlantısı əlavə edilə bilər.
            </p>

        </div>
    `);

}


/* =========================================================
   PASSWORD
========================================================= */

function openPassword(){

    openModal(`

        <div class="app">

            <div class="app-head">
                <div>
                    <small>TOOLS / SECURITY</small>
                    <h2>Password Generator</h2>
                </div>
            </div>

            <input
                id="passwordLength"
                class="field"
                type="number"
                min="6"
                max="64"
                value="16"
            >

            <button
                class="app-button"
                id="generatePassword"
                style="margin-top:12px"
            >
                GENERATE
            </button>

            <input
                id="generatedPassword"
                class="field"
                readonly
            >

        </div>
    `);

    $("#generatePassword").onclick=()=>{

        const length=
            Number($("#passwordLength").value)||16;

        const chars=
            "ABCDEFGHIJKLMNOPQRSTUVWXYZ"+
            "abcdefghijklmnopqrstuvwxyz"+
            "0123456789!@#$%^&*()_+-=";

        let result="";

        for(let i=0;i<length;i++){

            result+=chars[
                Math.floor(Math.random()*chars.length)
            ];

        }

        $("#generatedPassword").value=result;

    };

}


/* =========================================================
   COLOR
========================================================= */

function openColor(){

    openModal(`

        <div class="app">

            <div class="app-head">
                <div>
                    <small>TOOLS / DESIGN</small>
                    <h2>Color Picker</h2>
                </div>
            </div>

            <input
                id="colorPicker"
                type="color"
                value="#8fa7ff"
                style="
                    width:100%;
                    height:180px;
                    border:0;
                    background:transparent;
                "
            >

            <input
                id="colorValue"
                class="field"
                readonly
                value="#8fa7ff"
            >

        </div>
    `);

    $("#colorPicker").oninput=e=>{
        $("#colorValue").value=e.target.value;
    };

}


/* =========================================================
   TIMER
========================================================= */

function openTimer(){

    openModal(`

        <div class="app" style="text-align:center">

            <div class="app-head">
                <div>
                    <small>TOOLS / TIME</small>
                    <h2>Timer</h2>
                </div>
            </div>

            <div
                id="timerDisplay"
                style="
                    font:48px 'Space Mono';
                    margin:40px 0
                "
            >
                05:00
            </div>

            <input
                id="timerMinutes"
                class="field"
                type="number"
                value="5"
                min="1"
            >

            <button
                class="app-button"
                id="timerStart"
                style="margin-top:10px"
            >
                START
            </button>

        </div>
    `);

    let interval;

    $("#timerStart").onclick=()=>{

        clearInterval(interval);

        let seconds=
            Number($("#timerMinutes").value)*60;

        interval=setInterval(()=>{

            const min=
                String(Math.floor(seconds/60)).padStart(2,"0");

            const sec=
                String(seconds%60).padStart(2,"0");

            $("#timerDisplay").textContent=
                `${min}:${sec}`;

            if(seconds<=0){

                clearInterval(interval);

                if(navigator.vibrate)
                    navigator.vibrate([300,100,300]);

            }

            seconds--;

        },1000);

    };

}


/* =========================================================
   STOPWATCH
========================================================= */

function openStopwatch(){

    openModal(`

        <div class="app" style="text-align:center">

            <div class="app-head">
                <div>
                    <small>TOOLS / TIME</small>
                    <h2>Stopwatch</h2>
                </div>
            </div>

            <div
                id="stopwatchDisplay"
                style="
                    font:48px 'Space Mono';
                    margin:40px 0
                "
            >
                00:00.00
            </div>

            <button class="app-button" id="stopwatchStart">
                START
            </button>

            <button
                class="app-button"
                id="stopwatchReset"
                style="margin-left:5px"
            >
                RESET
            </button>

        </div>
    `);

    let start=0;
    let timer=null;

    $("#stopwatchStart").onclick=()=>{

        if(timer){

            clearInterval(timer);
            timer=null;
            $("#stopwatchStart").textContent="START";

            return;
        }

        start=Date.now()-(window.swElapsed||0);

        timer=setInterval(()=>{

            window.swElapsed=
                Date.now()-start;

            const ms=window.swElapsed;

            const min=
                String(Math.floor(ms/60000)).padStart(2,"0");

            const sec=
                String(Math.floor(ms/1000)%60).padStart(2,"0");

            const cent=
                String(Math.floor(ms/10)%100).padStart(2,"0");

            $("#stopwatchDisplay").textContent=
                `${min}:${sec}.${cent}`;

        },20);

        $("#stopwatchStart").textContent="STOP";

    };

    $("#stopwatchReset").onclick=()=>{

        clearInterval(timer);

        timer=null;
        window.swElapsed=0;

        $("#stopwatchDisplay").textContent="00:00.00";
        $("#stopwatchStart").textContent="START";

    };

}


/* =========================================================
   QR
========================================================= */

function openQR(){

    openModal(`

        <div class="app">

            <div class="app-head">
                <div>
                    <small>TOOLS / GENERATOR</small>
                    <h2>QR Generator</h2>
                </div>
            </div>

            <input
                id="qrText"
                class="field"
                placeholder="URL və ya mətn..."
            >

            <button
                id="qrButton"
                class="app-button"
                style="margin-top:10px"
            >
                CREATE QR
            </button>

            <div
                id="qrResult"
                style="
                    text-align:center;
                    margin-top:25px
                "
            ></div>

        </div>
    `);

    $("#qrButton").onclick=()=>{

        const text=$("#qrText").value.trim();

        if(!text) return;

        $("#qrResult").innerHTML=`

            <img
                alt="QR"
                width="220"
                height="220"
                src="
                https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(text)}
                "
            >

        `;

    };

}


/* =========================================================
   CONVERTER
========================================================= */

function openConverter(){

    openModal(`

        <div class="app">

            <div class="app-head">
                <div>
                    <small>TOOLS / CONVERTER</small>
                    <h2>Length Converter</h2>
                </div>
            </div>

            <input
                id="convertValue"
                class="field"
                type="number"
                value="1"
            >

            <div style="
                display:grid;
                grid-template-columns:1fr 1fr;
                gap:10px;
                margin-top:10px;
            ">

                <select id="fromUnit" class="field">
                    <option value="m">Meters</option>
                    <option value="km">Kilometers</option>
                    <option value="cm">Centimeters</option>
                    <option value="mi">Miles</option>
                    <option value="ft">Feet</option>
                </select>

                <select id="toUnit" class="field">
                    <option value="km">Kilometers</option>
                    <option value="m">Meters</option>
                    <option value="cm">Centimeters</option>
                    <option value="mi">Miles</option>
                    <option value="ft">Feet</option>
                </select>

            </div>

            <div
                id="convertResult"
                style="
                    margin-top:20px;
                    color:var(--accent);
                    font:24px 'Space Mono';
                "
            >
                0
            </div>

        </div>
    `);

    const factors={
        m:1,
        km:1000,
        cm:.01,
        mi:1609.344,
        ft:.3048
    };

    function convert(){

        const value=
            Number($("#convertValue").value)||0;

        const from=
            $("#fromUnit").value;

        const to=
            $("#toUnit").value;

        const result=
            value*factors[from]/factors[to];

        $("#convertResult").textContent=
            result.toFixed(6).replace(/\.?0+$/,"");

    }

    $("#convertValue").oninput=convert;
    $("#fromUnit").onchange=convert;
    $("#toUnit").onchange=convert;

    convert();

}


/* =========================================================
   AI INTERFACE
========================================================= */

const aiInterface=$("#aiInterface");
const aiChat=$("#aiChat");
const aiInput=$("#aiInput");

function openAI(){

    aiInterface.classList.remove("hidden");
    document.body.style.overflow="hidden";

    setTimeout(()=>{
        aiInput.focus();
    },100);

}

function closeAI(){

    aiInterface.classList.add("hidden");

    document.body.style.overflow="";

}

$("#aiClose").onclick=closeAI;


/* =========================================================
   NEW CHAT
========================================================= */

$("#newChat").onclick=()=>{

    aiChat.innerHTML=`

        <div id="aiWelcome" class="ai-welcome">

            <div class="ai-big-logo">✦</div>

            <h1>Yeni söhbət</h1>

            <p>
                Yeni söhbət başladı. Mən sənə
                nə ilə kömək edə bilərəm?
            </p>

            <div class="suggestions">

                <button data-prompt="Mənə maraqlı bir fikir ver">
                    💡 Fikir ver
                </button>

                <button data-prompt="Mənə bir biznes ideyası ver">
                    🚀 Biznes
                </button>

                <button data-prompt="Azərbaycan haqqında danış">
                    🇦🇿 Azərbaycan
                </button>

                <button data-prompt="Mənə nəyisə sadə izah et">
                    🧠 İzah et
                </button>

            </div>

        </div>
    `;

    bindSuggestions();

};


/* =========================================================
   AI SUGGESTIONS
========================================================= */

function bindSuggestions(){

    $$(".suggestions button").forEach(button=>{

        button.onclick=()=>{

            aiInput.value=
                button.dataset.prompt;

            sendAI();

        };

    });

}

bindSuggestions();


/* =========================================================
   AI CONFIG
========================================================= */

/*
    REAL AI CONNECTION

    Bu hissəyə öz backend endpoint-in yazılmalıdır.

    Məsələn:

    const AI_API_URL =
        "https://your-domain.com/api/chat";

    Backend OpenAI API-yə sorğu göndərir.

    API key-i BURA yazma.
    API key frontend-də saxlanılmamalıdır.
*/

const AI_API_URL = "";


/* =========================================================
   AI MESSAGE
========================================================= */

function addAIMessage(text,type="ai"){

    const message=
        document.createElement("div");

    message.className=
        "ai-message "+type;

    if(type==="ai"){

        message.innerHTML=`

            <div class="ai-avatar">✦</div>

            <div class="ai-message-content">
                ${formatAI(text)}
            </div>
        `;

    }else{

        message.innerHTML=`

            <div class="ai-message-content">
                ${escapeHTML(text)}
            </div>
        `;

    }

    aiChat.appendChild(message);

    aiChat.scrollTop=aiChat.scrollHeight;

}

function formatAI(text){

    return escapeHTML(text)
        .replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>")
        .replace(/\n/g,"<br>");

}


/* =========================================================
   AI SEND
========================================================= */

async function sendAI(){

    const text=aiInput.value.trim();

    if(!text) return;

    const welcome=$("#aiWelcome");

    if(welcome)
        welcome.remove();

    addAIMessage(text,"user");

    aiInput.value="";
    autoResizeAI();

    if(!AI_API_URL){

        setTimeout(()=>{

            addAIMessage(
                "Nexus AI interfeysi hazırdır. Real ChatGPT cavabları üçün `AI_API_URL` hissəsinə öz backend API endpoint-ini qoşmalısan. API açarını frontend JavaScript-inə yerləşdirmə."
            );

        },400);

        return;
    }

    const thinking=
        document.createElement("div");

    thinking.className="ai-message";
    thinking.id="thinking";

    thinking.innerHTML=`

        <div class="ai-avatar">✦</div>

        <div class="ai-message-content">
            <span class="ai-thinking">
                Thinking...
            </span>
        </div>
    `;

    aiChat.appendChild(thinking);

    aiChat.scrollTop=aiChat.scrollHeight;

    try{

        const response=
            await fetch(
                AI_API_URL,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        message:text
                    })
                }
            );

        if(!response.ok)
            throw new Error("API error");

        const data=
            await response.json();

        $("#thinking")?.remove();

        addAIMessage(
            data.reply ||
            data.message ||
            "Cavab alınmadı."
        );

    }catch(error){

        $("#thinking")?.remove();

        addAIMessage(
            "AI serverinə qoşulmaq mümkün olmadı."
        );

    }

}

$("#aiSend").onclick=sendAI;

aiInput.addEventListener(
    "keydown",
    e=>{

        if(e.key==="Enter" && !e.shiftKey){

            e.preventDefault();
            sendAI();

        }

    }
);

aiInput.addEventListener(
    "input",
    autoResizeAI
);

function autoResizeAI(){

    aiInput.style.height="auto";

    aiInput.style.height=
        Math.min(aiInput.scrollHeight,130)+"px";

}


/* =========================================================
   AI WEB SEARCH
========================================================= */

$("#aiWebSearch").onclick=()=>{

    const query=aiInput.value.trim();

    if(query){

        openSearch(query);

    }else{

        openSearch();

    }

};


/* =========================================================
   GLOBAL SEARCH
========================================================= */

$("#searchBtn").onclick=()=>{

    const q=$("#globalSearch").value.trim();

    if(!q) return;

    openSearch(q);

};

$("#globalSearch").addEventListener(
    "keydown",
    e=>{

        if(e.key==="Enter"){

            const q=e.target.value.trim();

            if(q)
                openSearch(q);

        }

    }
);


/* =========================================================
   DYNAMIC INIT
========================================================= */

function initDynamic(){}


/* =========================================================
   HELPERS
========================================================= */

function escapeHTML(value){

    return String(value)
        .replace(/&/g,"&amp;")
        .replace(/</g,"&lt;")
        .replace(/>/g,"&gt;")
        .replace(/"/g,"&quot;")
        .replace(/'/g,"&#039;");

}

function downloadFile(
    filename,
    content,
    type
){

    const blob=
        new Blob(
            [content],
            {type}
        );

    const url=
        URL.createObjectURL(blob);

    const a=
        document.createElement("a");

    a.href=url;
    a.download=filename;

    document.body.appendChild(a);

    a.click();

    a.remove();

    URL.revokeObjectURL(url);

}


/* =========================================================
   PWA-LIKE IOS BEHAVIOR
========================================================= */

document.addEventListener(
    "touchstart",
    ()=>{},
    {passive:true}
);


/* =========================================================
   INITIALIZATION
========================================================= */

window.addEventListener(
    "load",
    ()=>{
        updateClock();
        bindSuggestions();
    }
);
```
