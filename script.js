/* =========================================
   NEXUS // AZ — SYSTEM CORE
   ========================================= */

const $ = (id) => document.getElementById(id);


/* ---------- CLOCK ---------- */

function updateClock(){

    const now = new Date();

    const time = now.toLocaleTimeString("az-AZ", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const date = now.toLocaleDateString("az-AZ", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric"
    });

    if($("clock")) $("clock").textContent = time;
    if($("date")) $("date").textContent = date;
}

setInterval(updateClock,1000);
updateClock();


/* ---------- SCROLL ---------- */

function scrollTools(){

    const target = $("tools");

    if(target){
        target.scrollIntoView({
            behavior:"smooth"
        });
    }
}


/* ---------- PASSWORD ---------- */

function generatePassword(){

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}";

    let password = "";

    for(let i=0;i<20;i++){

        password += chars.charAt(
            Math.floor(Math.random()*chars.length)
        );

    }

    if($("password")){
        $("password").textContent = password;
    }
}


/* ---------- IP ---------- */

async function getIP(){

    try{

        const response =
            await fetch("https://api.ipify.org?format=json");

        const data =
            await response.json();

        if($("ip"))
            $("ip").textContent = data.ip;

        if($("ip2"))
            $("ip2").textContent = data.ip;

    }catch(error){

        if($("ip"))
            $("ip").textContent = "UNAVAILABLE";

        if($("ip2"))
            $("ip2").textContent = "UNAVAILABLE";
    }
}

getIP();


/* ---------- LATENCY ---------- */

async function checkLatency(){

    const start = performance.now();

    try{

        await fetch(
            "https://www.cloudflare.com/cdn-cgi/trace",
            {
                method:"HEAD",
                cache:"no-store"
            }
        );

        const latency =
            Math.round(performance.now()-start);

        if($("latency"))
            $("latency").textContent = latency + " ms";

    }catch{

        if($("latency"))
            $("latency").textContent = "-- ms";
    }
}

checkLatency();

setInterval(checkLatency,15000);


/* ---------- QR GENERATOR ---------- */

function generateQR(){

    const text =
        $("qrText")?.value.trim();

    if(!text){

        alert("Please enter text or URL.");

        return;
    }

    const qr =
        $("qr");

    if(!qr) return;

    const encoded =
        encodeURIComponent(text);

    qr.innerHTML = `
        <img
            src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encoded}"
            alt="QR Code"
            style="
                width:220px;
                height:220px;
                border-radius:12px;
                background:white;
                padding:10px;
            "
        >
    `;
}


/* ---------- URL ANALYZER ---------- */

function analyzeURL(){

    const input =
        $("urlInput")?.value.trim();

    const result =
        $("urlResult");

    if(!result) return;

    if(!input){

        result.textContent =
            "Enter a URL to analyze.";

        return;
    }

    try{

        const url =
            new URL(
                input.startsWith("http")
                ? input
                : "https://" + input
            );

        result.innerHTML = `
            <div class="generated-value">

                <strong>URL ANALYSIS</strong>

                <br><br>

                PROTOCOL:
                ${url.protocol}

                <br>

                HOST:
                ${url.hostname}

                <br>

                PATH:
                ${url.pathname || "/"}

                <br>

                PORT:
                ${url.port || "DEFAULT"}

                <br>

                SECURE:
                ${
                    url.protocol === "https:"
                    ? '<span class="green">YES</span>'
                    : '<span style="color:#ff7777">NO</span>'
                }

            </div>
        `;

    }catch{

        result.textContent =
            "Invalid URL.";
    }
}


/* =========================================
   TERMINAL
   ========================================= */

function openTerminal(){

    const terminal =
        $("terminalWindow");

    if(!terminal) return;

    terminal.classList.add("active");

    setTimeout(() => {

        $("terminalInput")?.focus();

    },100);
}


function closeTerminal(){

    const terminal =
        $("terminalWindow");

    if(terminal){

        terminal.classList.remove("active");

    }
}


function terminalCommand(event){

    if(event.key !== "Enter") return;

    const input =
        $("terminalInput");

    const output =
        $("terminalOutput");

    if(!input || !output) return;

    const command =
        input.value.trim().toLowerCase();

    if(!command) return;

    const line =
        document.createElement("div");

    line.innerHTML =
        `<span style="color:#9d7cff">nexus@az:~$</span> ${escapeHTML(command)}`;

    output.appendChild(line);

    let response = "";


    switch(command){

        case "help":

            response = `
                <div class="ok">AVAILABLE COMMANDS</div>
                <div>help — show commands</div>
                <div>clear — clear terminal</div>
                <div>status — system status</div>
                <div>network — network information</div>
                <div>time — current time</div>
                <div>whoami — identify system</div>
                <div>neofetch — NEXUS system info</div>
            `;

            break;


        case "clear":

            output.innerHTML = "";

            input.value = "";

            return;


        case "status":

            response = `
                <div class="ok">
                SYSTEM ........ ONLINE
                </div>

                <div class="ok">
                NETWORK ....... CONNECTED
                </div>

                <div class="ok">
                SECURITY ....... ACTIVE
                </div>

                <div class="ok">
                NEXUS CORE ..... RUNNING
                </div>
            `;

            break;


        case "network":

            response = `
                <div>
                NETWORK CENTER
                </div>

                <div>
                PUBLIC IP: ${$("ip")?.textContent || "UNKNOWN"}
                </div>

                <div>
                LATENCY: ${$("latency")?.textContent || "--"}
                </div>
            `;

            break;


        case "time":

            response =
                `<div>${new Date().toLocaleString()}</div>`;

            break;


        case "whoami":

            response =
                `<div>USER: NEXUS OPERATOR</div>`;

            break;


        case "neofetch":

            response = `
                <div style="color:#9d7cff">
                ███╗   ██╗███████╗██╗  ██╗
                ████╗  ██║██╔════╝╚██╗██╔╝
                ██╔██╗ ██║█████╗   ╚███╔╝
                ██║╚██╗██║██╔══╝   ██╔██╗
                ██║ ╚████║███████╗██╔╝ ██╗
                ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝
                </div>

                <div>
                NEXUS // AZ
                </div>

                <div>
                DIGITAL COMMAND CENTER
                </div>

                <div>
                VERSION: 3.0
                </div>

                <div>
                STATUS: ONLINE
                </div>
            `;

            break;


        case "sudo":

            response =
                `<div style="color:#ff7777">
                ACCESS DENIED — NICE TRY :)
                </div>`;

            break;


        default:

            response =
                `<div style="color:#777">
                Command not found.
                Type <b>help</b>.
                </div>`;
    }


    const responseElement =
        document.createElement("div");

    responseElement.innerHTML =
        response;

    output.appendChild(responseElement);

    output.scrollTop =
        output.scrollHeight;

    input.value = "";
}


function escapeHTML(text){

    return text
        .replaceAll("&","&amp;")
        .replaceAll("<","&lt;")
        .replaceAll(">","&gt;")
        .replaceAll('"',"&quot;")
        .replaceAll("'","&#039;");
}


/* =========================================
   CALCULATOR
   ========================================= */

let calculatorValue = "";


function calcPress(value){

    if(value === "C"){

        calculatorValue = "";

    }else if(value === "="){

        try{

            calculatorValue =
                String(
                    Function(
                        `"use strict";return (${calculatorValue})`
                    )()
                );

        }catch{

            calculatorValue = "ERROR";
        }

    }else{

        calculatorValue += value;

    }

    if($("calcDisplay"))
        $("calcDisplay").value =
            calculatorValue;
}


/* =========================================
   CATEGORY SYSTEM
   ========================================= */

function openCategory(category){

    const overlay =
        $("categoryOverlay");

    if(!overlay) return;

    overlay.classList.add("active");

    showModule(category);
}


function closeCategory(){

    const overlay =
        $("categoryOverlay");

    if(overlay)
        overlay.classList.remove("active");
}


function showModule(category){

    document
        .querySelectorAll(".module-content")
        .forEach(module => {

            module.classList.remove("active");

        });


    const target =
        document.getElementById(
            "module-" + category
        );

    if(target)
        target.classList.add("active");
}


/* =========================================
   AI DEMO
   ========================================= */

function sendAI(){

    const input =
        $("aiInput");

    const messages =
        $("aiMessages");

    if(!input || !messages) return;

    const text =
        input.value.trim();

    if(!text) return;


    const userMessage =
        document.createElement("div");

    userMessage.className =
        "ai-message";

    userMessage.style.marginBottom =
        "16px";

    userMessage.innerHTML = `
        <span>YOU</span>
        <p>${escapeHTML(text)}</p>
    `;

    messages.appendChild(userMessage);


    const thinking =
        document.createElement("div");

    thinking.className =
        "ai-message";

    thinking.innerHTML = `
        <span>AI</span>
        <p>Processing request...</p>
    `;

    messages.appendChild(thinking);

    messages.scrollTop =
        messages.scrollHeight;

    input.value = "";


    setTimeout(() => {

        thinking.querySelector("p").textContent =
            aiLocalResponse(text);

        messages.scrollTop =
            messages.scrollHeight;

    },700);
}


function aiLocalResponse(text){

    const lower =
        text.toLowerCase();

    if(
        lower.includes("salam") ||
        lower.includes("hello")
    ){

        return "Salam. NEXUS AI hazırdır. Sualını ver.";

    }

    if(lower.includes("nexus")){

        return "NEXUS // AZ rəqəmsal command center sistemidir.";

    }

    if(
        lower.includes("ip") ||
        lower.includes("network")
    ){

        return "Network məlumatlarını Network Center modulundan yoxlaya bilərsən.";

    }

    if(lower.includes("github")){

        return "GitHub üzərində işləyən NEXUS sisteminin lokal AI interfeysindəsən.";

    }

    return "Sorğun qəbul edildi. Hazırda NEXUS AI demo rejimindədir. Tam AI cavab sistemi üçün təhlükəsiz API bağlantısı əlavə etmək mümkündür.";
}


/* =========================================
   SYSTEM MONITOR
   ========================================= */

function updateSystem(){

    const cpu =
        Math.floor(
            20 + Math.random()*55
        );

    if($("cpu"))
        $("cpu").textContent =
            cpu + "%";


    document
        .querySelectorAll(".bars span")
        .forEach(bar => {

            const height =
                15 + Math.random()*85;

            bar.style.height =
                height + "%";

        });
}

setInterval(updateSystem,1000);
updateSystem();


/* =========================================
   KEYBOARD SHORTCUT
   ========================================= */

document.addEventListener(
    "keydown",
    event => {

        if(
            event.ctrlKey &&
            event.key.toLowerCase() === "k"
        ){

            event.preventDefault();

            openTerminal();
        }


        if(event.key === "Escape"){

            closeTerminal();
            closeCategory();

        }

    }
);


/* =========================================
   OUTSIDE CLICK
   ========================================= */

document.addEventListener(
    "click",
    event => {

        const overlay =
            $("categoryOverlay");

        if(
            overlay &&
            event.target === overlay
        ){

            closeCategory();

        }

    }
);
