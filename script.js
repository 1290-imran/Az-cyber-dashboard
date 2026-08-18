/* =========================================
   NEXUS // AZ — SYSTEM CORE
========================================= */


/* =========================================
   SAAT
========================================= */

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString("az-AZ", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
    });

    const shortTime = now.toLocaleTimeString("az-AZ", {
        hour: "2-digit",
        minute: "2-digit"
    });

    const clock = document.getElementById("clock");
    const heroTime = document.getElementById("heroTime");

    if (clock) {
        clock.textContent = time;
    }

    if (heroTime) {
        heroTime.textContent = shortTime;
    }
}

setInterval(updateClock, 1000);
updateClock();



/* =========================================
   KATEQORİYA SİSTEMİ
========================================= */

const categoryNames = {

    network: {
        label: "01 / ŞƏBƏKƏ",
        title: "Şəbəkə Mərkəzi"
    },

    security: {
        label: "02 / TƏHLÜKƏSİZLİK",
        title: "Təhlükəsizlik Mərkəzi"
    },

    developer: {
        label: "03 / TƏRTİBATÇI",
        title: "Tərtibatçı Mərkəzi"
    },

    world: {
        label: "04 / DÜNYA",
        title: "Dünya Mərkəzi"
    },

    media: {
        label: "05 / MEDİA",
        title: "Media Mərkəzi"
    },

    ai: {
        label: "06 / İNTELLEKT",
        title: "NEXUS Süni İntellekt"
    },

    office: {
        label: "07 / OFİS",
        title: "Ofis Alətləri"
    },

    system: {
        label: "08 / SİSTEM",
        title: "Sistem Monitoru"
    }

};


function openCategory(category) {

    const overlay =
        document.getElementById("categoryOverlay");

    const label =
        document.getElementById("moduleLabel");

    const title =
        document.getElementById("moduleTitle");


    if (!overlay) return;


    /* bütün modulları bağla */

    document
        .querySelectorAll(".module-content")
        .forEach(module => {

            module.classList.remove("active");

        });


    /* seçilən modul */

    const selected =
        document.getElementById(
            "module-" + category
        );


    if (selected) {

        selected.classList.add("active");

    }


    /* başlıq */

    if (categoryNames[category]) {

        label.textContent =
            categoryNames[category].label;

        title.textContent =
            categoryNames[category].title;

    }


    overlay.classList.add("active");

    document.body.style.overflow = "hidden";
}


function closeCategory() {

    const overlay =
        document.getElementById("categoryOverlay");

    if (!overlay) return;

    overlay.classList.remove("active");

    document.body.style.overflow = "";

}


/* overlay-in boş hissəsinə klik */

document.addEventListener("click", function(event) {

    const overlay =
        document.getElementById("categoryOverlay");

    if (
        overlay &&
        event.target === overlay
    ) {

        closeCategory();

    }

});


/* ESC ilə bağlama */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeCategory();

        closeTerminal();

    }

});



/* =========================================
   IP
========================================= */

async function getIP() {

    const ipElements = [
        document.getElementById("ip")
    ];

    ipElements.forEach(element => {

        if (element) {
            element.textContent =
                "Yoxlanılır...";
        }

    });


    try {

        const response =
            await fetch(
                "https://api.ipify.org?format=json"
            );

        const data =
            await response.json();


        ipElements.forEach(element => {

            if (element) {
                element.textContent =
                    data.ip;
            }

        });

    }

    catch (error) {

        ipElements.forEach(element => {

            if (element) {
                element.textContent =
                    "Müəyyən edilmədi";
            }

        });

    }

}

getIP();



/* =========================================
   GECİKMƏ
========================================= */

async function measureLatency() {

    const latencyElement =
        document.getElementById("latency");

    if (!latencyElement) return;


    const start = performance.now();


    try {

        await fetch(
            "https://www.google.com/generate_204",
            {
                mode: "no-cors",
                cache: "no-store"
            }
        );


        const result =
            Math.round(
                performance.now() - start
            );


        latencyElement.textContent =
            result + " ms";

    }

    catch {

        latencyElement.textContent =
            "-- ms";

    }

}

measureLatency();

setInterval(
    measureLatency,
    15000
);



/* =========================================
   TERMINAL
========================================= */

function openTerminal() {

    const terminal =
        document.getElementById(
            "terminalWindow"
        );

    if (!terminal) return;

    closeCategory();

    terminal.classList.add("active");

    setTimeout(() => {

        const input =
            document.getElementById(
                "terminalInput"
            );

        if (input) {
            input.focus();
        }

    }, 350);

}


function closeTerminal() {

    const terminal =
        document.getElementById(
            "terminalWindow"
        );

    if (!terminal) return;

    terminal.classList.remove("active");

}



/* =========================================
   TERMİNAL ƏMRLƏRİ
========================================= */

function terminalCommand(event) {

    if (event.key !== "Enter") {
        return;
    }


    const input =
        document.getElementById(
            "terminalInput"
        );

    const output =
        document.getElementById(
            "terminalOutput"
        );


    if (!input || !output) return;


    const command =
        input.value.trim().toLowerCase();


    if (!command) return;


    /* istifadəçi əmri */

    const commandLine =
        document.createElement("div");

    commandLine.innerHTML =
        `<span style="color:#7c9cff">
        nexus@az:~$
        </span> ${escapeHTML(command)}`;

    output.appendChild(commandLine);


    /* cavab */

    const response =
        document.createElement("div");


    switch (command) {

        case "help":

            response.innerHTML = `
                <br>
                <div style="color:#54e6a8">
                Mövcud əmrlər:
                </div>

                <div>help — əmrləri göstər</div>
                <div>ip — ictimai IP-ni göstər</div>
                <div>time — cari vaxtı göstər</div>
                <div>status — sistem vəziyyəti</div>
                <div>clear — terminalı təmizlə</div>
                <div>about — NEXUS haqqında</div>
            `;

            break;


        case "ip":

            const ip =
                document.getElementById(
                    "ip"
                )?.textContent
                || "Müəyyən edilmədi";

            response.innerHTML =
                `İctimai IP: ${escapeHTML(ip)}`;

            break;


        case "time":

            response.textContent =
                "Cari vaxt: " +
                new Date().toLocaleTimeString(
                    "az-AZ"
                );

            break;


        case "status":

            response.innerHTML = `
                <div style="color:#54e6a8">
                    ŞƏBƏKƏ ............... ONLAYN
                </div>

                <div style="color:#54e6a8">
                    TƏHLÜKƏSİZLİK ........ AKTİV
                </div>

                <div style="color:#54e6a8">
                    SİSTEM ............... STABİL
                </div>
            `;

            break;


        case "about":

            response.innerHTML = `
                <div>
                    NEXUS // AZ
                </div>

                <div>
                    Rəqəmsal İdarəetmə Mərkəzi
                </div>

                <div>
                    Versiya: 3.0
                </div>
            `;

            break;


        case "clear":

            output.innerHTML = "";

            input.value = "";

            return;


        default:

            response.innerHTML =
                `Əmr tapılmadı: <b>${escapeHTML(command)}</b>
                <br>
                Mövcud əmrlər üçün <b>help</b> yazın.`;

    }


    output.appendChild(response);


    output.scrollTop =
        output.scrollHeight;


    input.value = "";

}



/* =========================================
   TƏHLÜKƏSİZ MƏTN
========================================= */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}



/* =========================================
   ONLINE / OFFLINE
========================================= */

function updateNetworkStatus() {

    const connection =
        document.querySelector(
            ".connection span"
        );

    if (!connection) return;


    if (navigator.onLine) {

        connection.textContent =
            "SİSTEM ONLAYNDIR";

    }

    else {

        connection.textContent =
            "İNTERNET YOXDUR";

    }

}


window.addEventListener(
    "online",
    updateNetworkStatus
);

window.addEventListener(
    "offline",
    updateNetworkStatus
);

updateNetworkStatus();



/* =========================================
   KATEQORİYA KARTLARINA KLİKLƏR
========================================= */

document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            function() {

                this.blur();

            }
        );

    });



/* =========================================
   MODUL AÇILANDA SCROLL
========================================= */

document
    .querySelectorAll(".category-card")
    .forEach(card => {

        card.addEventListener(
            "click",
            function() {

                window.setTimeout(() => {

                    const panel =
                        document.querySelector(
                            ".module-panel"
                        );

                    if (panel) {
                        panel.scrollTop = 0;
                    }

                }, 50);

            }
        );

    });



/* =========================================
   STARTUP
========================================= */

console.log(
    "%c NEXUS // AZ ",
    "color:#7c9cff;font-size:20px;font-weight:bold"
);

console.log(
    "%cRəqəmsal İdarəetmə Mərkəzi v3.0",
    "color:#8b93a5;font-size:12px"
);
