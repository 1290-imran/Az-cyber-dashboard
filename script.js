// CLOCK

function updateClock() {

  const now = new Date();

  document.getElementById("clock").textContent =
    now.toLocaleTimeString("az-AZ");

  document.getElementById("date").textContent =
    now.toLocaleDateString("az-AZ", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
}

setInterval(updateClock, 1000);
updateClock();


// IP

async function getIP() {

  const ipElement = document.getElementById("ip");

  ipElement.textContent = "Detecting...";

  try {

    const response =
      await fetch("https://api.ipify.org?format=json");

    const data = await response.json();

    ipElement.textContent = data.ip;

  } catch {

    ipElement.textContent = "Unavailable";

  }
}

getIP();


// PASSWORD

function generatePassword() {

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

  let password = "";

  for (let i = 0; i < 18; i++) {

    password +=
      chars[Math.floor(Math.random() * chars.length)];

  }

  document.getElementById("password").textContent = password;
}


// QR

function generateQR() {

  const text =
    document.getElementById("qrText").value;

  if (!text) return;

  const qr =
    document.getElementById("qr");

  qr.innerHTML = `
    <img
      src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}"
      alt="QR Code"
    >
  `;
}


// URL ANALYZER

function analyzeURL() {

  const input =
    document.getElementById("urlInput").value;

  const result =
    document.getElementById("urlResult");

  if (!input) {

    result.textContent = "Enter a URL first.";

    return;

  }

  try {

    const url = new URL(input);

    result.innerHTML = `
      <div>PROTOCOL: <b>${url.protocol}</b></div>
      <div>HOST: <b>${url.hostname}</b></div>
      <div>PATH: <b>${url.pathname || "/"}</b></div>
    `;

  } catch {

    result.textContent = "Invalid URL.";

  }
}
