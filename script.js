window.addEventListener("load",()=>{

setTimeout(()=>{

const loader=document.getElementById("loader");

loader.style.opacity="0";

setTimeout(()=>{
loader.style.display="none";
},1000);

},1600);

});


/* CLOCK */

function clock(){

const now=new Date();

document.getElementById("clock").textContent=
now.toLocaleTimeString("az-AZ",{
hour:"2-digit",
minute:"2-digit"
});

document.getElementById("date").textContent=
now.toLocaleDateString("az-AZ",{
weekday:"long",
day:"numeric",
month:"long"
});

}

clock();

setInterval(clock,1000);


/* IP */

async function getIP(){

const elements=[
document.getElementById("ip"),
document.getElementById("ip2")
];

elements.forEach(e=>e.textContent="Detecting...");

try{

const start=performance.now();

const response=
await fetch("https://api.ipify.org?format=json");

const data=await response.json();

const latency=Math.round(performance.now()-start);

elements.forEach(e=>e.textContent=data.ip);

document.getElementById("latency").textContent=
latency+" ms";

}
catch{

elements.forEach(e=>e.textContent="Unavailable");

document.getElementById("latency").textContent="-- ms";

}

}

getIP();


/* PASSWORD */

function generatePassword(){

const chars=
"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

let password="";

for(let i=0;i<20;i++){

password+=chars[
Math.floor(Math.random()*chars.length)
];

}

document.getElementById("password").textContent=password;

}


/* QR */

function generateQR(){

const text=
document.getElementById("qrText").value.trim();

const qr=document.getElementById("qr");

if(!text){

qr.innerHTML="";

return;

}

qr.innerHTML=`

<img
src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}"
alt="QR Code"
>

`;

}


/* URL ANALYZER */

function analyzeURL(){

const input=
document.getElementById("urlInput").value.trim();

const result=
document.getElementById("urlResult");

if(!input){

result.textContent="ENTER A URL";

return;

}

try{

const url=new URL(input);

result.innerHTML=`

PROTOCOL: <b>${url.protocol}</b><br>
HOST: <b>${url.hostname}</b><br>
PATH: <b>${url.pathname||"/"}</b>

`;

}

catch{

result.textContent="INVALID URL";

}

}


/* SCROLL */

function scrollTools(){

document
.getElementById("tools")
.scrollIntoView({
behavior:"smooth"
});

}


/* TERMINAL */

function openTerminal(){

document
.getElementById("terminalWindow")
.classList.add("open");

setTimeout(()=>{

document
.getElementById("terminalInput")
.focus();

},300);

}


function closeTerminal(){

document
.getElementById("terminalWindow")
.classList.remove("open");

}


function terminalCommand(event){

if(event.key!=="Enter") return;

const input=
document.getElementById("terminalInput");

const command=input.value
.trim()
.toLowerCase();

const output=
document.getElementById("terminalOutput");

const line=document.createElement("div");

line.innerHTML=
`<span style="color:#8067ff">
nexus@az:~$
</span> ${command}`;

output.appendChild(line);


const response=document.createElement("div");


if(command==="help"){

response.innerHTML=`
<br>
AVAILABLE COMMANDS<br>
<br>
<b>help</b> — show commands<br>
<b>clear</b> — clear terminal<br>
<b>about</b> — system information<br>
<b>status</b> — system status<br>
<b>time</b> — current time<br>
<b>hello</b> — say hello<br>
`;

}

else if(command==="clear"){

output.innerHTML="";

input.value="";

return;

}

else if(command==="about"){

response.textContent=
"NEXUS // AZ — DIGITAL COMMAND CENTER v2.0";

}

else if(command==="status"){

response.innerHTML=
`NETWORK: <b style="color:#66ffa2">ONLINE</b><br>
SYSTEM: <b style="color:#66ffa2">STABLE</b><br>
SECURITY: <b style="color:#66ffa2">ACTIVE</b>`;

}

else if(command==="time"){

response.textContent=
new Date().toLocaleTimeString("az-AZ");

}

else if(command==="hello"){

response.textContent=
"Hello, operator. Welcome to NEXUS.";

}

else if(command===""){

response.textContent="";

}

else{

response.textContent=
"Command not found. Type 'help'.";

}

output.appendChild(response);

input.value="";

output.scrollTop=output.scrollHeight;

}


/* CPU SIMULATION */

function updateCPU(){

const value=
Math.floor(Math.random()*35)+20;

document.getElementById("cpu").textContent=
value+"%";

}

updateCPU();

setInterval(updateCPU,1200);


/* LIVE STATUS */

setInterval(()=>{

const bars=
document.querySelectorAll(".bars span");

bars.forEach(bar=>{

bar.style.height=
(Math.random()*70+20)+"%";

});

},700);
