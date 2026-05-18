// Particles
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 15 + 10) + 's';
    p.style.animationDelay = (Math.random() * 15) + 's';
    p.style.opacity = Math.random() * 0.5;
    const colors = ['#00d4ff', '#00ff88', '#a855f7', '#fbbf24', '#ff6b35'];
    p.style.background = colors[Math.floor(Math.random() * colors.length)];
    container.appendChild(p);
  }
}
createParticles();

// Section Navigation
function showSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
  const sec = document.getElementById(id);
  if(sec) sec.classList.add('active');
  const sourceEvent = window.event;
  if(sourceEvent && sourceEvent.target) sourceEvent.target.classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
  // Animate skill bars
  setTimeout(() => {
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = w; }, 50);
    });
  }, 100);
}

// OSI Model
const osiData = {
  7: {
    title: 'Layer 7 — Application Layer',
    desc: 'ชั้นที่ใกล้ User มากที่สุด ให้บริการ Network Services แก่ Application โดยตรง เช่น Web Browser, Email Client ไม่ใช่ Application ตัวเอง แต่เป็น Interface ระหว่าง Application กับ Network',
    protocols: ['HTTP/HTTPS', 'FTP/SFTP', 'SMTP/IMAP/POP3', 'DNS', 'SNMP', 'Telnet/SSH', 'NTP'],
    extra: '📌 ตัวอย่าง: เมื่อคุณเปิด Browser พิมพ์ google.com — Application Layer สร้าง HTTP Request',
    color: '#ff6b6b'
  },
  6: {
    title: 'Layer 6 — Presentation Layer',
    desc: 'แปลงรูปแบบข้อมูลให้ Application เข้าใจได้ ทำ Encryption/Decryption และ Data Compression สามารถเข้าใจได้ว่า Layer นี้เป็น "นักแปลภาษา" ของ OSI',
    protocols: ['SSL/TLS', 'JPEG/PNG/GIF', 'ASCII/Unicode', 'MPEG', 'Encryption formats'],
    extra: '📌 ตัวอย่าง: HTTPS ใช้ TLS ที่ Layer นี้ในการเข้ารหัสข้อมูลก่อนส่ง',
    color: '#ff9f43'
  },
  5: {
    title: 'Layer 5 — Session Layer',
    desc: 'สร้าง จัดการ และยุติ Session ระหว่าง Applications บนเครื่องต่างๆ ควบคุม Dialog (Full-duplex/Half-duplex) และทำ Checkpointing เพื่อ Recovery',
    protocols: ['NetBIOS', 'RPC', 'SQL', 'NFS', 'SMB', 'PPTP'],
    extra: '📌 ตัวอย่าง: เมื่อดาวน์โหลดไฟล์แล้วหลุด Session Layer ช่วยให้ resume ได้',
    color: '#feca57'
  },
  4: {
    title: 'Layer 4 — Transport Layer',
    desc: 'รับผิดชอบการส่งข้อมูล End-to-End ระหว่าง Process ทำ Segmentation/Reassembly Flow Control และ Error Recovery เลือกใช้ TCP หรือ UDP ตามความต้องการ',
    protocols: ['TCP', 'UDP', 'SCTP', 'Port Numbers (0-65535)'],
    extra: '📌 Well-known Ports: HTTP=80, HTTPS=443, SSH=22, FTP=21, DNS=53, SMTP=25',
    color: '#48dbfb'
  },
  3: {
    title: 'Layer 3 — Network Layer',
    desc: 'รับผิดชอบ Logical Addressing (IP) และ Routing — หาเส้นทางที่ดีที่สุดในการส่ง Packet ข้ามเครือข่าย อุปกรณ์หลักคือ Router',
    protocols: ['IPv4/IPv6', 'ICMP', 'OSPF', 'BGP', 'EIGRP', 'ARP', 'IPSec'],
    extra: '📌 Router ทำงานที่ Layer 3 — อ่าน IP Header และตัดสินใจส่ง Packet ไป Interface ไหน',
    color: '#00d4ff'
  },
  2: {
    title: 'Layer 2 — Data Link Layer',
    desc: 'ส่งข้อมูลระหว่างอุปกรณ์ใน Network เดียวกัน (Same Segment) ใช้ MAC Address ในการระบุ อุปกรณ์ แบ่งเป็น LLC (Logical Link Control) และ MAC (Media Access Control)',
    protocols: ['Ethernet (802.3)', 'Wi-Fi (802.11)', 'PPP', 'VLAN (802.1Q)', 'STP (802.1D)', 'ARP'],
    extra: '📌 Switch ทำงานที่ Layer 2 — เรียนรู้ MAC Address และ Forward Frame ไปยัง Port ที่ถูกต้อง',
    color: '#00ff88'
  },
  1: {
    title: 'Layer 1 — Physical Layer',
    desc: 'ส่งข้อมูลในรูปแบบ Binary (0 และ 1) ผ่านสื่อกลาง กำหนด Electrical/Optical Signals, Cable Types, Connector Types, Encoding Schemes และ Data Rates',
    protocols: ['Ethernet Cables (Cat5e/6/6A)', 'Fiber Optic', 'Coaxial', 'USB', 'DSL', 'RS-232'],
    extra: '📌 Hub ทำงานที่ Layer 1 — รับสัญญาณและกระจาย (Broadcast) ออกทุก Port',
    color: '#a855f7'
  }
};

function showOSI(layer) {
  const data = osiData[layer];
  document.getElementById('osiDetailTitle').textContent = data.title;
  document.getElementById('osiDetailTitle').style.color = data.color;
  document.getElementById('osiDetailDesc').textContent = data.desc;

  const protoDiv = document.getElementById('osiDetailProtocols');
  protoDiv.innerHTML = '<div class="tag-list">' +
    data.protocols.map(p => `<span class="tag" style="color:${data.color}">${p}</span>`).join('') +
    '</div>';

  document.getElementById('osiDetailExtra').innerHTML = `<div class="highlight-box" style="margin-top:12px;">${data.extra}</div>`;
  document.getElementById('osiDetail').classList.add('active');

  // Highlight selected layer
  for (let i = 1; i <= 7; i++) {
    document.getElementById('osi' + i)?.classList.remove('active');
  }
  document.getElementById('osi' + layer).classList.add('active');
}

// TCP Handshake Animation
let handshakeTimer = null;
function runHandshake() {
  resetHandshake();
  const packet = document.getElementById('movingPacket');
  const steps = ['step1', 'step2', 'step3'];
  const packets = [
    { text: 'SYN', color: '#00d4ff', dir: 'forward' },
    { text: 'SYN-ACK', color: '#00ff88', dir: 'backward' },
    { text: 'ACK', color: '#fbbf24', dir: 'forward' },
  ];

  let i = 0;
  function nextStep() {
    if (i >= 3) return;
    document.getElementById(steps[i]).classList.add('active');
    packet.textContent = packets[i].text;
    packet.style.background = packets[i].color;
    packet.style.opacity = '1';
    if (packets[i].dir === 'forward') {
      packet.style.left = '0px';
      setTimeout(() => { packet.style.left = 'calc(100% - 60px)'; }, 50);
    } else {
      packet.style.left = 'calc(100% - 60px)';
      setTimeout(() => { packet.style.left = '0px'; }, 50);
    }
    i++;
    if (i < 3) handshakeTimer = setTimeout(nextStep, 1800);
  }
  nextStep();
}

function resetHandshake() {
  if (handshakeTimer) clearTimeout(handshakeTimer);
  const packet = document.getElementById('movingPacket');
  if(packet){packet.style.opacity = '0'; packet.style.left = '0';}
  ['step1','step2','step3'].forEach(s => {const el=document.getElementById(s);if(el)el.classList.remove('active');});
}

// Subnet Calculator
function calcSubnet() {
  try {
  const ipStr = document.getElementById('ipInput').value;
  const cidr = parseInt(document.getElementById('cidrInput').value);
  if (!ipStr || isNaN(cidr) || cidr < 0 || cidr > 32) return;

  const parts = ipStr.split('.').map(Number);
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) return;

  const ipNum = parts[0]*16777216 + parts[1]*65536 + parts[2]*256 + parts[3];
  const maskNum = cidr === 0 ? 0 : (0xFFFFFFFF << (32 - cidr)) >>> 0;
  const netNum = (ipNum & maskNum) >>> 0;
  const broadNum = (netNum | (~maskNum >>> 0)) >>> 0;
  const firstNum = netNum + 1;
  const lastNum = broadNum - 1;
  const totalHosts = Math.pow(2, 32 - cidr) - 2;
  const wildcardNum = (~maskNum) >>> 0;

  function numToIp(n) {
    return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].join('.');
  }

  document.getElementById('netAddr').textContent = numToIp(netNum);
  document.getElementById('subnetMask').textContent = numToIp(maskNum);
  document.getElementById('wildcardMask').textContent = numToIp(wildcardNum);
  document.getElementById('broadcast').textContent = numToIp(broadNum);
  document.getElementById('firstHost').textContent = cidr < 31 ? numToIp(firstNum) : 'N/A';
  document.getElementById('lastHost').textContent = cidr < 31 ? numToIp(lastNum) : 'N/A';
  document.getElementById('totalHosts').textContent = cidr < 31 ? totalHosts.toLocaleString() : (cidr === 31 ? '2' : '1');

  const firstOctet = parts[0];
  let ipClass = 'Class A (1-126)';
  if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'Class B (128-191)';
  else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'Class C (192-223)';
  else if (firstOctet >= 224) ipClass = 'Class D/E';
  document.getElementById('ipClass').textContent = ipClass;

  // Binary
  function numToBin(n) {
    return [(n>>>24)&255,(n>>>16)&255,(n>>>8)&255,n&255].map(b => b.toString(2).padStart(8,'0')).join('.');
  }
  const binIp = numToBin(netNum);
  const binMask = numToBin(maskNum);
  const networkBits = binIp.replace(/\./g,'').slice(0, cidr).split('').map(b => `<span style="color:var(--accent)">${b}</span>`).join('');
  const hostBits = binIp.replace(/\./g,'').slice(cidr).split('').map(b => `<span style="color:var(--accent3)">${b}</span>`).join('');

  document.getElementById('binaryDisplay').innerHTML =
    `<span style="color:var(--text-muted);">Network: </span>${[...networkBits+hostBits].join('')}<br>` +
    `<span style="color:var(--text-muted);">Mask:    </span><span style="color:var(--accent2);">${binMask}</span>`;
  document.getElementById('binaryViz').style.display = 'block';

  // CIDR Cheatsheet
  const cheatData = [[8,'16M'],[16,'65K'],[24,'254'],[25,'126'],[26,'62'],[27,'30'],[28,'14'],[29,'6'],[30,'2']];
  const cheatRoot = document.getElementById('cidrCheat');
  const cheatHost = cheatRoot ? cheatRoot.parentElement : null;
  if (cheatHost) {
    cheatHost.innerHTML = `<div id="cidrCheat" style="display:contents;">${cheatData.map(([c,h]) =>
      `<div style="background:${cidr===c?'rgba(0,212,255,0.1)':'var(--surface2)'};border:1px solid ${cidr===c?'var(--accent)':'var(--border)'};border-radius:4px;padding:10px 14px;font-family:'JetBrains Mono',monospace;font-size:12px;color:${cidr===c?'var(--accent)':'var(--text-dim)'}">
        /${c} — ${h} hosts</div>`
    ).join('')}</div>`;
  }
  } catch (error) {
    console.warn('Subnet calculator skipped:', error);
  }
}
calcSubnet();

// Routing Protocol Tabs
function showProto(proto) {
  ['ospf','bgp','eigrp'].forEach(p => {
    document.getElementById('proto'+p.charAt(0).toUpperCase()+p.slice(1)).style.display = 'none';
    document.getElementById('btn'+p.charAt(0).toUpperCase()+p.slice(1)).style.borderColor = 'var(--text-muted)';
    document.getElementById('btn'+p.charAt(0).toUpperCase()+p.slice(1)).style.color = 'var(--text-muted)';
  });
  document.getElementById('proto'+proto.charAt(0).toUpperCase()+proto.slice(1)).style.display = 'block';
  const colors = {ospf:'var(--accent)',bgp:'var(--accent4)',eigrp:'var(--accent3)'};
  document.getElementById('btn'+proto.charAt(0).toUpperCase()+proto.slice(1)).style.borderColor = colors[proto];
  document.getElementById('btn'+proto.charAt(0).toUpperCase()+proto.slice(1)).style.color = colors[proto];
}

// Accordion
function toggleAccordion(el) {
  el.classList.toggle('open');
}

// NAT highlight
function highlightNat(el) {
  document.querySelectorAll('.nat-step').forEach(s => s.classList.remove('active'));
  el.classList.add('active');
}

// Cloud Tabs
function showCloud(provider) {
  ['Aws','Azure','Gcp'].forEach(p => {
    document.getElementById('cloud'+p).style.display = 'none';
  });
  document.getElementById('cloud'+provider.charAt(0).toUpperCase()+provider.slice(1)).style.display = 'block';
  document.querySelectorAll('.cloud-tab').forEach(t => {
    t.classList.toggle('active', t.textContent.trim().toLowerCase() === provider);
  });
}

// Terminal Demo
function termDemo(cmd, output) {
  const cmdEl = document.getElementById('terminalCmd');
  const outEl = document.getElementById('terminalOutput');
  outEl.textContent = '';
  cmdEl.textContent = '';
  let i = 0;
  function type() {
    if (i < cmd.length) {
      cmdEl.textContent += cmd[i++];
      setTimeout(type, 50);
    } else {
      setTimeout(() => { outEl.textContent = output; }, 200);
    }
  }
  type();
}

// Live Metrics Simulation
function updateMetrics() {
  const latency = (Math.random() * 3 + 1).toFixed(1);
  const bw = Math.floor(Math.random() * 200 + 700);
  const loss = (Math.random() * 0.05).toFixed(3);
  const temp = Math.floor(Math.random() * 8 + 38);
  const uptime = (Math.random() * 1 + 98).toFixed(1);

  const m2 = document.getElementById('m2');
  const m3 = document.getElementById('m3');
  const m4 = document.getElementById('m4');
  const m5 = document.getElementById('m5');
  const m1 = document.getElementById('m1');
  if (m2) m2.textContent = latency + 'ms';
  if (m3) m3.textContent = bw;
  if (m4) m4.textContent = loss + '%';
  if (m5) m5.textContent = temp + '°C';
  if (m1) m1.textContent = uptime + '%';
}
setInterval(updateMetrics, 2000);

// Bandwidth Graph
const bwData = [];
function updateGraph() {
  const canvas = document.getElementById('graphCanvas');
  if (!canvas || canvas.offsetWidth === 0) return;
  const w = canvas.offsetWidth;
  const h = 160;
  bwData.push(Math.random() * 600 + 300);
  if (bwData.length > 60) bwData.shift();

  const svg = document.getElementById('bwGraph');
  if (!svg) return;
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

  const pts = bwData.map((v, i) => {
    const x = (i / (bwData.length - 1)) * w;
    const y = h - ((v / 1000) * (h - 30)) - 10;
    return `${x},${y}`;
  });

  if (pts.length < 2) return;
  const lineD = 'M' + pts.join('L');
  const areaD = 'M0,' + h + ' L' + pts.join('L') + ' L' + w + ',' + h + ' Z';

  const line = document.getElementById('bwLine');
  const area = document.getElementById('bwArea');
  if (line) line.setAttribute('d', lineD);
  if (area) area.setAttribute('d', areaD);
}
for (let i = 0; i < 30; i++) bwData.push(Math.random() * 600 + 300);
setInterval(updateGraph, 500);
updateGraph();

// ─────────────────────────────────────────────
// QUIZ ENGINE
// ─────────────────────────────────────────────
const quizData = [
  { q:"OSI Layer ใดที่รับผิดชอบ Logical Addressing (IP Address)?", options:["Layer 2 — Data Link","Layer 3 — Network","Layer 4 — Transport","Layer 1 — Physical"], ans:1, exp:"Layer 3 (Network) ใช้ IP Address ระบุ Host และ Router ทำการ Forward Packet ที่ชั้นนี้" },
  { q:"TCP 3-Way Handshake มีขั้นตอนอะไรบ้าง?", options:["SYN → ACK → FIN","SYN → SYN-ACK → ACK","ACK → SYN → DATA","HELLO → OFFER → ACK"], ans:1, exp:"SYN (Client เริ่ม) → SYN-ACK (Server ตอบรับ) → ACK (Client ยืนยัน) — หลังจากนี้จึงส่ง Data ได้" },
  { q:"Subnet /26 มีกี่ Usable Host?", options:["30","62","126","254"], ans:1, exp:"/26 = 64 IP ทั้งหมด, -2 (Network+Broadcast) = 62 Usable Hosts" },
  { q:"Protocol ใดใช้ใน SD-WAN สำหรับ ISP Routing?", options:["OSPF","EIGRP","BGP","RIP"], ans:2, exp:"BGP (Border Gateway Protocol) คือ Protocol ที่ ISP ใช้แลกเปลี่ยน Routing Information ระหว่าง AS" },
  { q:"Ansible ใช้ Protocol ใดเชื่อมต่อ Network Device?", options:["SNMP","Telnet","SSH / NETCONF","FTP"], ans:2, exp:"Ansible เชื่อม Network Device ผ่าน SSH (network_cli) หรือ NETCONF โดยไม่ต้องติดตั้ง Agent" },
  { q:"Zero Trust หมายความว่าอะไร?", options:["Trust ทุกคนใน Network","Never Trust Always Verify","Trust แค่ Admin","ปิด Firewall ทั้งหมด"], ans:1, exp:"Zero Trust = 'Never Trust, Always Verify' — ทุก Request ต้องผ่าน Authentication ไม่ว่าจะอยู่ที่ไหน" },
  { q:"Spine-Leaf Architecture แก้ปัญหาอะไรของ 3-Tier?", options:["Cost ถูกกว่า","Latency ไม่สม่ำเสมอ","ใช้ Port น้อยกว่า","ไม่ต้องการ Routing"], ans:1, exp:"Traditional 3-Tier มี Latency ไม่เท่ากันตาม Path ที่ต่างกัน Spine-Leaf ทุก Leaf ต่อ Spine ทำให้ Latency สม่ำเสมอ" },
  { q:"VXLAN ใช้ VNI กี่ bit — รองรับกี่ Segment?", options:["12-bit, 4096","16-bit, 65536","24-bit, ~16ล้าน","32-bit, ~4พันล้าน"], ans:2, exp:"VXLAN ใช้ 24-bit VNI (VXLAN Network Identifier) รองรับได้มากกว่า 16 ล้าน Segment เทียบ VLAN แค่ 4094" },
  { q:"OSPF ใช้ Algorithm อะไรคำนวณ Shortest Path?", options:["Bellman-Ford","Dijkstra (SPF)","DUAL","Distance Vector"], ans:1, exp:"OSPF ใช้ Dijkstra's SPF (Shortest Path First) Algorithm — ทุก Router มี Map (LSDB) เหมือนกันและคำนวณ Path เอง" },
  { q:"NetFlow ใช้ทำอะไร?", options:["Config Backup","ดู Traffic Flow ระหว่าง Host","Encrypt Traffic","Block Malicious IP"], ans:1, exp:"NetFlow เก็บข้อมูล Flow (ใครคุยกับใคร, Port, Protocol, Bytes) ช่วย Capacity Planning และตรวจ Anomaly" },
  { q:"EtherChannel รวมหลาย Link เพื่ออะไร?", options:["เพิ่ม Security","เพิ่ม Bandwidth + Redundancy","ลด Latency เท่านั้น","ทำ VLAN Trunk"], ans:1, exp:"EtherChannel (LACP/PAgP) รวม Physical Link หลายเส้นเป็นหนึ่ง Logical Link — ได้ทั้ง Bandwidth รวมและ Redundancy" },
  { q:"DHCP DORA ย่อมาจากอะไร?", options:["Discover-Offer-Request-Ack","Deploy-Offer-Route-Assign","Detect-Open-Reserve-Ack","Discover-Open-Request-Assign"], ans:0, exp:"DORA = Discover (Client หา Server) → Offer (Server เสนอ IP) → Request (Client ขอใช้) → Acknowledge (Server ยืนยัน)" },
  { q:"ความแตกต่าง IDS vs IPS คืออะไร?", options:["IDS Block, IPS แจ้งเตือน","IPS Block, IDS แค่ตรวจจับแจ้งเตือน","ทั้งคู่เหมือนกัน","IDS ใช้ Cloud, IPS ใช้ On-premise"], ans:1, exp:"IDS = Intrusion Detection System (Passive — ตรวจจับแล้ว Alert) / IPS = Intrusion Prevention System (Inline — Block ได้จริง)" },
  { q:"Python Library ใดใช้ SSH เข้า Network Device ได้ง่ายที่สุด?", options:["Flask","Netmiko","Pandas","SQLAlchemy"], ans:1, exp:"Netmiko เป็น Library ที่ออกแบบมาเฉพาะสำหรับ SSH เข้า Network Device รองรับ Cisco, Juniper, Arista, MikroTik ฯลฯ" },
  { q:"BGP Administrative Distance สำหรับ eBGP คือเท่าไหร่?", options:["110","90","20","200"], ans:2, exp:"eBGP AD = 20, iBGP AD = 200, OSPF = 110, EIGRP Internal = 90 — AD ต่ำกว่า = ถูก Prefer กว่า" },
];

let currentQ = 0, score = 0, quizActive = false, answered = false;

function initQuiz() {
  currentQ = 0; score = 0; quizActive = true; answered = false;
  renderQuestion();
  document.getElementById('quizSection').style.display='block';
  document.getElementById('quizStart').style.display='none';
  window.scrollTo({top:0,behavior:'smooth'});
}

function renderQuestion() {
  if (currentQ >= quizData.length) { showQuizResult(); return; }
  const q = quizData[currentQ];
  answered = false;
  document.getElementById('quizProgress').textContent = `${currentQ+1} / ${quizData.length}`;
  document.getElementById('quizProgressBar').style.width = ((currentQ/quizData.length)*100)+'%';
  document.getElementById('quizScore').textContent = 'Score: '+score;
  document.getElementById('quizQuestion').textContent = q.q;
  document.getElementById('quizOptions').innerHTML = q.options.map((opt,i)=>
    `<button class="quiz-option" onclick="selectAnswer(${i})" id="qopt${i}">${String.fromCharCode(65+i)}. ${opt}</button>`
  ).join('');
  document.getElementById('quizExplanation').style.display='none';
  document.getElementById('quizNext').style.display='none';
}

function selectAnswer(idx) {
  if (answered) return;
  answered = true;
  const q = quizData[currentQ];
  const opts = document.querySelectorAll('.quiz-option');
  opts.forEach((o,i)=>{
    o.disabled=true;
    if (i===q.ans) o.classList.add('correct');
    else if (i===idx) o.classList.add('wrong');
  });
  if (idx===q.ans) score++;
  document.getElementById('quizExplanation').innerHTML='💡 '+q.exp;
  document.getElementById('quizExplanation').style.display='block';
  document.getElementById('quizNext').style.display='inline-flex';
}

function nextQuestion() {
  currentQ++;
  renderQuestion();
}

function showQuizResult() {
  const pct = Math.round((score/quizData.length)*100);
  let grade='', color='';
  if(pct>=90){grade='🏆 เยี่ยมมาก! Expert Level';color='var(--accent2)';}
  else if(pct>=70){grade='✅ ดีมาก! Intermediate';color='var(--accent)';}
  else if(pct>=50){grade='📚 พอใช้ ควรทบทวน';color='var(--accent5)';}
  else{grade='🔄 ต้องเรียนใหม่';color='var(--accent3)';}

  document.getElementById('quizSection').innerHTML=`
    <div style="text-align:center;padding:40px;">
      <div style="font-size:64px;margin-bottom:16px;">🎯</div>
      <div style="font-family:'Space Mono',monospace;font-size:32px;color:${color};margin-bottom:8px;">${pct}%</div>
      <div style="font-family:'Space Mono',monospace;font-size:16px;color:${color};margin-bottom:16px;">${grade}</div>
      <div style="color:var(--text-dim);font-size:14px;margin-bottom:24px;">ตอบถูก ${score} / ${quizData.length} ข้อ</div>
      <button class="btn btn-green" onclick="location.reload()">⟳ ทำใหม่</button>
    </div>`;
}

// ---- extracted script block ----

// ─── Extend nav tabs dynamically ───
(function() {
  const nav = document.querySelector('.nav-tabs');
  const extraTabs = [
    ['ext-etherchannel', '+ EtherChannel'],
    ['ext-nac',          '+ NAC/802.1X'],
    ['ext-bgpadv',       '+ BGP Advanced'],
    ['ext-dmvpn',        '+ DMVPN'],
    ['ext-vxlan',        '+ VXLAN/EVPN'],
    ['ext-nornir',       '+ Nornir'],
    ['ext-docker',       '+ Docker Net'],
    ['ext-quiz',         '🎯 Quiz'],
    ['ext-career',       '💼 Career'],
  ];
  extraTabs.forEach(([id, label]) => {
    const btn = document.createElement('button');
    btn.className = 'nav-tab';
    btn.textContent = label;
    btn.onclick = function() {
      document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      btn.classList.add('active');
      window.scrollTo({top: 0, behavior:'smooth'});
    };
    nav.appendChild(btn);
  });

  // Set quiz count text
  const el = document.getElementById('quizTotalInfo');
  if (el) el.textContent = quizData.length + ' ข้อ ครอบคลุมทุกหัวข้อ';

  // Render BGP path selection as HTML (was template literal in static HTML)
  const bgpGrid = document.querySelector('#ext-bgpadv .two-col');
  // Already rendered inline above via JS template literals below
})();

// Render BGP selection list via JS since template literal is in JS block
(function() {
  const container = document.querySelector('#ext-bgpadv .vlan-diagram > div:nth-child(3)');
  if (!container) return;
  const items = [
    ['1','Weight (Cisco)','สูงกว่า = ดีกว่า, Local เท่านั้น'],
    ['2','Local Preference','สูงกว่า = ดีกว่า, ใช้ใน iBGP'],
    ['3','Locally Originated','Prefer Route ที่ Originate เอง'],
    ['4','AS-PATH Length','สั้นกว่า = ดีกว่า (Hop น้อย)'],
    ['5','Origin','IGP > EGP > Incomplete'],
    ['6','MED','ต่ำกว่า = ดีกว่า เปรียบ AS เดียวกัน'],
    ['7','eBGP vs iBGP','Prefer eBGP over iBGP'],
    ['8','IGP Metric','ต่ำกว่า = ดีกว่า ไปยัง Next-hop'],
  ];
  const grid = document.createElement('div');
  grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:10px;';
  items.forEach(([n,title,desc]) => {
    grid.innerHTML += `<div style="background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:12px;display:flex;gap:12px;align-items:flex-start;">
      <div style="background:var(--accent4);color:var(--bg);width:24px;height:24px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:11px;font-weight:700;flex-shrink:0;">${n}</div>
      <div>
        <div style="font-family:'Space Mono',monospace;font-size:12px;color:var(--text);margin-bottom:3px;">${title}</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-muted);">${desc}</div>
      </div></div>`;
  });
  if (container) container.appendChild(grid);
})();

// Render Career timeline via JS
(function() {
  const container = document.querySelector('#ext-career .vlan-diagram > div:last-child');
  if (!container) return;
  const careers = [
    {yr:'0-1 ปี', title:'Network Support / Junior NOC', skills:['CCNA', 'Basic Routing', 'Troubleshooting'], sal:'25,000 – 35,000', color:'var(--text-muted)'},
    {yr:'1-3 ปี', title:'Network Engineer', skills:['OSPF/BGP', 'Firewall', 'VLAN/STP'], sal:'40,000 – 65,000', color:'var(--accent2)'},
    {yr:'3-5 ปี', title:'Senior Network Engineer', skills:['CCNP', 'SD-WAN', 'Automation'], sal:'65,000 – 100,000', color:'var(--accent)'},
    {yr:'5-8 ปี', title:'Network Architect / DevNet', skills:['CCIE', 'Python', 'Cloud'], sal:'100,000 – 150,000', color:'var(--accent5)'},
    {yr:'8+ ปี', title:'Principal / Cloud Architect', skills:['Multi-cloud', 'Zero Trust', 'Leadership'], sal:'150,000+', color:'var(--accent3)'},
  ];
  const wrapper = document.createElement('div');
  wrapper.style.cssText = 'position:relative;padding:20px 0 0;';
  const line = document.createElement('div');
  line.style.cssText = 'position:absolute;left:140px;top:0;bottom:0;width:2px;background:linear-gradient(180deg,var(--accent),var(--accent4));opacity:0.3;';
  wrapper.appendChild(line);
  careers.forEach(({yr,title,skills,sal,color}) => {
    wrapper.innerHTML += `<div style="display:flex;gap:24px;margin-bottom:28px;align-items:flex-start;">
      <div style="width:120px;text-align:right;font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted);padding-top:14px;flex-shrink:0;">${yr}</div>
      <div style="width:16px;height:16px;border-radius:50%;background:${color};flex-shrink:0;margin-top:12px;box-shadow:0 0 10px ${color};"></div>
      <div style="background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:16px 20px;flex:1;">
        <div style="font-family:'Space Mono',monospace;font-size:14px;color:${color};margin-bottom:8px;">${title}</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;">${skills.map(s=>`<span style="display:inline-flex;align-items:center;gap:4px;padding:3px 10px;background:var(--surface2);border:1px solid ${color};border-radius:20px;font-family:'JetBrains Mono',monospace;font-size:10px;color:${color};opacity:0.85;">${s}</span>`).join('')}</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--accent2);">💰 ${sal} บาท/เดือน</div>
      </div></div>`;
  });
  if (container) container.appendChild(wrapper);
})();

// ---- extracted script block ----

// ── Register new tabs ────────────────────────────────────────
(function(){
  const nav=document.querySelector('.nav-tabs');
  [['ext-encap','📦 Encap'],['ext-trouble','🔧 Troubleshoot'],['ext-wireshark','🦈 Wireshark'],
   ['ext-ipv6','🌐 IPv6'],['ext-cicd','🔄 CI/CD'],['ext-ipam','📋 IPAM'],
   ['ext-incident','🚨 Incident'],['ext-mikrotik','📡 MikroTik'],['ext-telemetry','📡 gNMI'],
   ['ext-flashcard','🃏 Flashcard'],['ext-clisearch','🔍 CLI Search'],['ext-progress','✅ Progress']]
  .forEach(([id,label])=>{
    const b=document.createElement('button');
    b.className='nav-tab'; b.textContent=label;
    b.onclick=function(){
      document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      b.classList.add('active');
      window.scrollTo({top:0,behavior:'smooth'});
    };
    nav.appendChild(b);
  });
})();

// ── PACKET ENCAPSULATION ─────────────────────────────────────
const ED=[
  {layer:'L7 Application',pdu:'Data',color:'#ff6b6b',
   content:'HTTP Request: GET /index.html HTTP/1.1\nHost: www.example.com',
   detail:'Application Layer สร้าง HTTP Request — Data จริงๆ ที่ต้องการส่ง'},
  {layer:'L4 Transport (TCP)',pdu:'Segment',color:'#fbbf24',
   content:'[TCP Hdr: Src:52341 Dst:80 Seq:1000 Flags:SYN] + HTTP Data',
   detail:'Transport เพิ่ม TCP Header — Src/Dst Port, Seq/Ack, Flags ทำ Reliability'},
  {layer:'L3 Network (IP)',pdu:'Packet',color:'#00d4ff',
   content:'[IP Hdr: Src:192.168.1.10 Dst:93.184.216.34 TTL:64] + TCP+HTTP',
   detail:'Network เพิ่ม IP Header — Src/Dst IP ใช้ Route ข้ามเครือข่าย TTL ลดลงทุก Hop'},
  {layer:'L2 Data Link (Ethernet)',pdu:'Frame',color:'#00ff88',
   content:'[ETH: DstMAC:00:11:22 SrcMAC:AA:BB:CC Type:0x0800] + IP+TCP+HTTP + [FCS]',
   detail:'Data Link เพิ่ม Ethernet Header+FCS — MAC Address ใน Local Segment เท่านั้น'},
  {layer:'L1 Physical',pdu:'Bits',color:'#a855f7',
   content:'101100010101010100110101010101... → Electrical/Optical/Radio Signal',
   detail:'Physical แปลง Frame เป็น Binary Bits ส่งเป็น Electrical/Fiber/Wi-Fi Signal'},
];
function buildEncapLayers(){
  document.getElementById('encapLayers').innerHTML=ED.map((d,i)=>
    `<div class="encap-layer" style="color:${d.color};border-color:${d.color}30;opacity:.4;" id="el${i}" onclick="showED(${i})">
      <div class="encap-label">${d.layer}</div>
      <div class="encap-pdu">${d.pdu}</div>
      <div class="encap-data" id="ed${i}">Click Animate</div>
    </div>`).join('');
}
buildEncapLayers();
let eTimer=null;
function runEncap(){resetEncap();let i=0;function s(){if(i>=ED.length)return;const el=document.getElementById('el'+i);el.style.opacity='1';el.style.boxShadow=`0 0 20px ${ED[i].color}`;document.getElementById('ed'+i).textContent=ED[i].content;showED(i);i++;if(i<ED.length)eTimer=setTimeout(s,1100);}s();}
function runDecap(){resetEncap();ED.forEach((_,i)=>{document.getElementById('el'+i).style.opacity='1';document.getElementById('ed'+i).textContent=ED[i].content;});let i=ED.length-1;function s(){if(i<0)return;const el=document.getElementById('el'+i);el.style.boxShadow=`0 0 20px ${ED[i].color}`;showED(i);setTimeout(()=>{el.style.boxShadow='';},700);i--;if(i>=0)eTimer=setTimeout(s,900);}s();}
function resetEncap(){if(eTimer)clearTimeout(eTimer);ED.forEach((_,i)=>{const el=document.getElementById('el'+i);if(el){el.style.opacity='.4';el.style.boxShadow='';}const d=document.getElementById('ed'+i);if(d)d.textContent='Click Animate';});document.getElementById('encapDetail').classList.remove('active');}
function showED(i){const d=ED[i];const el=document.getElementById('encapDetail');el.innerHTML=`<h3 style="color:${d.color};">${d.layer} — ${d.pdu}</h3><p>${d.detail}</p>`;el.classList.add('active');}

// ── TROUBLESHOOTING ──────────────────────────────────────────
const TD={
  ping:{title:'🔴 Ping ไม่ได้',steps:[
    {n:1,q:'Ping 127.0.0.1 ได้ไหม?',yes:'TCP/IP Stack OK → ต่อไป',no:'❌ TCP/IP Stack มีปัญหา — Reset/Reinstall NIC',cmd:'ping 127.0.0.1'},
    {n:2,q:'Ping Default Gateway ได้ไหม?',yes:'ออก LAN ได้ → ต่อไป',no:'❌ LAN ปัญหา — ตรวจ Cable, IP/Subnet, Switch Port',cmd:'ping 192.168.1.1\nipconfig /all'},
    {n:3,q:'Ping 8.8.8.8 ได้ไหม?',yes:'Internet ผ่าน IP ได้ → DNS ปัญหา',no:'❌ Routing/NAT ปัญหา — show ip route, NAT Rules',cmd:'ping 8.8.8.8\nshow ip route'},
    {n:4,q:'Ping google.com ได้ไหม?',yes:'✅ ทุกอย่างปกติ',no:'❌ DNS ปัญหา — nslookup, ตรวจ DNS Server',cmd:'nslookup google.com\ndig google.com'},
  ]},
  ospf:{title:'🟡 OSPF ไม่ขึ้น Neighbor',steps:[
    {n:1,q:'Interface UP/UP ไหม?',yes:'Interface OK → ต่อไป',no:'❌ no shutdown + ตรวจ Cable',cmd:'show ip interface brief'},
    {n:2,q:'Network Statement ถูกต้องไหม?',yes:'Network OK → ต่อไป',no:'❌ แก้ network statement หรือ ip ospf area',cmd:'show ip ospf interface\nshow run | section ospf'},
    {n:3,q:'Hello/Dead Timer ตรงกันไหม? (10/40)',yes:'Timer OK → ต่อไป',no:'❌ ปรับ ip ospf hello-interval ให้เท่ากัน',cmd:'show ip ospf interface Gi0/0'},
    {n:4,q:'Area Number เหมือนกันไหม?',yes:'Area OK → ต่อไป',no:'❌ Area ต้องเหมือนกันทั้งสองฝั่ง',cmd:'show ip ospf neighbor'},
    {n:5,q:'Authentication ตรงกันไหม?',yes:'✅ ลอง clear ip ospf process',no:'❌ ตรวจ key/password ให้ตรงกัน',cmd:'clear ip ospf process'},
  ]},
  bgp:{title:'🟠 BGP ไม่ Establish',steps:[
    {n:1,q:'TCP Port 179 ไม่ถูก Block?',yes:'Port OK → ต่อไป',no:'❌ ACL/Firewall Block TCP 179',cmd:'telnet 10.0.0.2 179\nshow ip bgp neighbors'},
    {n:2,q:'remote-as ถูกต้องไหม?',yes:'AS OK → ต่อไป',no:'❌ ตรวจ AS Number ของ Peer',cmd:'show ip bgp summary\nshow run | section bgp'},
    {n:3,q:'Neighbor IP Reachable (Ping)?',yes:'Reachable → ต่อไป',no:'❌ Routing ปัญหา — ตรวจ ip route',cmd:'ping 10.0.0.2\nshow ip route 10.0.0.2'},
    {n:4,q:'update-source ตั้งแล้ว (iBGP Loopback)?',yes:'✅ clear ip bgp * soft',no:'❌ neighbor X.X.X.X update-source Lo0',cmd:'clear ip bgp * soft'},
  ]},
  slow:{title:'🔵 Network ช้า',steps:[
    {n:1,q:'Bandwidth ใช้เกิน 80%?',yes:'❌ Bandwidth Saturation — ตรวจ Top Talkers, QoS',no:'BW ปกติ → ต่อไป',cmd:'show interface Gi0/0\nshow processes cpu sorted'},
    {n:2,q:'มี Interface Error/Drop?',yes:'❌ Physical ปัญหา — Cable, SFP, Duplex Mismatch',no:'Interface Clean → ต่อไป',cmd:'show int Gi0/0 | inc error|drop'},
    {n:3,q:'Latency สูงเกิน 100ms (LAN)?',yes:'❌ Routing/Congestion — traceroute',no:'Latency OK → ต่อไป',cmd:'ping 8.8.8.8 repeat 100\ntraceroute 8.8.8.8'},
    {n:4,q:'QoS Policy ถูกต้อง?',yes:'✅ Wireshark Capture เพื่อวิเคราะห์ลึก',no:'❌ ปรับ QoS — Voice ต้องมี Priority Queue',cmd:'show policy-map interface'},
  ]},
  vlan:{title:'🟣 VLAN ไม่ทำงาน',steps:[
    {n:1,q:'VLAN มีใน Database?',yes:'VLAN มี → ต่อไป',no:'❌ สร้าง VLAN: vlan 10',cmd:'show vlan brief'},
    {n:2,q:'Access Port กำหนด VLAN แล้ว?',yes:'Access OK → ต่อไป',no:'❌ switchport access vlan 10',cmd:'show interfaces Gi0/1 switchport'},
    {n:3,q:'Trunk Port Allow VLAN?',yes:'Trunk OK → ต่อไป',no:'❌ switchport trunk allowed vlan add 10',cmd:'show interfaces trunk'},
    {n:4,q:'VTP Mode ถูกต้อง?',yes:'✅ ลอง Ping ใน VLAN เดียวกัน',no:'❌ ใช้ VTP Transparent/Off ดีกว่า',cmd:'show vtp status'},
  ]},
};
function showTrouble(t){
  const d=TD[t];
  Object.keys(TD).forEach(k=>{const b=document.getElementById('tbtn'+k.charAt(0).toUpperCase()+k.slice(1));if(b){b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';}});
  const btn=document.getElementById('tbtn'+t.charAt(0).toUpperCase()+t.slice(1));
  if(btn){btn.style.borderColor='var(--accent)';btn.style.color='var(--accent)';}
  document.getElementById('troubleContent').innerHTML=`<div style="font-family:'Space Mono',monospace;font-size:14px;color:var(--accent);margin-bottom:16px;">${d.title}</div>`+
  d.steps.map(s=>`<div style="display:flex;gap:12px;margin-bottom:10px;align-items:flex-start;">
    <div style="background:var(--accent);color:var(--bg);width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:12px;font-weight:700;flex-shrink:0;margin-top:6px;">${s.n}</div>
    <div style="flex:1;background:var(--surface2);border:1px solid var(--border);border-radius:4px;padding:14px;">
      <div style="font-weight:600;margin-bottom:6px;">${s.q}</div>
      <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:8px;">
        <span style="color:var(--accent2);font-family:'JetBrains Mono',monospace;font-size:11px;">✓ YES: ${s.yes}</span>
        <span style="color:var(--accent3);font-family:'JetBrains Mono',monospace;font-size:11px;">✗ NO: ${s.no}</span>
      </div>
      <div style="background:#010d18;border:1px solid var(--border);border-radius:2px;padding:6px 10px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent5);">💻 ${s.cmd.replace(/\n/g,'<br>💻 ')}</div>
    </div></div>`).join('');
}
showTrouble('ping');

// ── WIRESHARK FILTERS ─────────────────────────────────────────
(function(){
  const F=[
    {f:'ip.addr == 192.168.1.10',d:'Filter Traffic จาก/ไปยัง IP นี้'},
    {f:'tcp.port == 443',d:'HTTPS Traffic ทั้งหมด'},
    {f:'http.request.method == "POST"',d:'HTTP POST Requests'},
    {f:'dns.qry.name contains "google"',d:'DNS Query ที่มี google'},
    {f:'tcp.flags.syn==1 && tcp.flags.ack==0',d:'SYN Packets (New Connections)'},
    {f:'tcp.analysis.retransmission',d:'TCP Retransmissions — Network ปัญหา'},
    {f:'icmp.type == 8',d:'ICMP Echo Request (Ping)'},
    {f:'arp',d:'ARP Traffic ทั้งหมด'},
    {f:'vlan.id == 10',d:'Traffic ใน VLAN 10'},
    {f:'ospf',d:'OSPF Hello/LSA Packets'},
    {f:'bgp',d:'BGP UPDATE/NOTIFICATION'},
    {f:'tls.handshake.type == 1',d:'TLS Client Hello'},
    {f:'frame.len > 1400',d:'Jumbo Frames'},
    {f:'tcp.window_size < 1024',d:'TCP Window ต่ำ (Congestion?)'},
    {f:'ip.ttl < 5',d:'TTL ใกล้หมด (Routing Loop?)'},
  ];
  const c=document.getElementById('wfFilters');
  if(c)c.innerHTML=F.map(w=>`<div class="wf-filter" onclick="(()=>{navigator.clipboard&&navigator.clipboard.writeText('${w.f.replace(/'/g,"\\'")}');this.style.background='rgba(0,255,136,.1)';setTimeout(()=>this.style.background='',700)}).call(this)"><code>${w.f}</code><div class="wf-desc">📋 ${w.d}</div></div>`).join('');
})();

// ── IPAM ─────────────────────────────────────────────────────
let ipamData=[
  {subnet:'192.168.1.0/24',name:'Management VLAN',site:'Bangkok DC',used:18,total:254},
  {subnet:'10.10.1.0/24',name:'Server Farm',site:'Bangkok DC',used:220,total:254},
  {subnet:'10.10.2.0/24',name:'IT Department',site:'Bangkok DC',used:30,total:254},
  {subnet:'172.16.0.0/12',name:'DR Site Internal',site:'BKK DR Site',used:200,total:1048574},
  {subnet:'10.20.0.0/22',name:'Cloud VPC',site:'Cloud AWS',used:80,total:1022},
];
function renderIPAM(){
  const c=document.getElementById('ipamRows');
  if(!c)return;
  c.innerHTML=ipamData.map((r,i)=>{
    const pct=Math.round((r.used/r.total)*100);
    const bc=pct>90?'var(--accent3)':pct>70?'var(--accent5)':'var(--accent2)';
    return `<div class="ipam-row">
      <div class="ipam-cell" style="color:var(--accent);font-weight:700;">${r.subnet}</div>
      <div class="ipam-cell"><div style="font-size:12px;">${r.name}</div><div style="font-size:9px;color:var(--text-muted);">${r.site}</div></div>
      <div class="ipam-cell"><div class="ipam-bar-wrap"><div class="ipam-bar" style="width:${pct}%;background:${bc};"></div></div><div style="font-size:9px;color:var(--text-muted);text-align:center;">${pct}%</div></div>
      <div class="ipam-cell" style="text-align:center;font-size:10px;">${r.used.toLocaleString()}/${r.total.toLocaleString()}</div>
      <div class="ipam-cell" style="text-align:center;"><button class="btn" style="padding:3px 8px;font-size:9px;border-color:var(--accent3);color:var(--accent3);" onclick="ipamDel(${i})">Del</button></div>
    </div>`;
  }).join('');
  const done=ipamData.filter(r=>r.used/r.total<0.7).length;
  const warn=ipamData.filter(r=>{const p=r.used/r.total;return p>=0.7&&p<0.9;}).length;
  const crit=ipamData.filter(r=>r.used/r.total>=0.9).length;
  const s=document.getElementById('ipamSummary');
  if(s)s.innerHTML=[{l:'Total',v:ipamData.length,c:'var(--accent)'},{l:'Healthy',v:done,c:'var(--accent2)'},{l:'Warning',v:warn,c:'var(--accent5)'},{l:'Critical',v:crit,c:'var(--accent3)'}]
    .map(x=>`<div class="result-box"><div class="result-label">${x.l}</div><div class="result-value" style="color:${x.c};">${x.v}</div></div>`).join('');
}
renderIPAM();
function ipamAdd(){
  const subnet=document.getElementById('ipamNewSubnet').value.trim();
  const name=document.getElementById('ipamNewName').value.trim();
  const site=document.getElementById('ipamNewSite').value;
  if(!subnet||!name){alert('กรุณากรอก Subnet และ Name');return;}
  if(!/^[\d.]+\/\d+$/.test(subnet)){alert('รูปแบบ Subnet ไม่ถูกต้อง เช่น 10.0.1.0/24');return;}
  const cidr=parseInt(subnet.split('/')[1]||24);
  const total=cidr>=31?2:Math.pow(2,32-cidr)-2;
  ipamData.push({subnet,name,site,used:0,total});
  document.getElementById('ipamNewSubnet').value='';
  document.getElementById('ipamNewName').value='';
  renderIPAM();
}
function ipamDel(i){ipamData.splice(i,1);renderIPAM();}

// ── INCIDENT RESPONSE ─────────────────────────────────────────
const ID2={
  ddos:{title:'🌊 DDoS Attack',color:'var(--accent3)',phases:[
    {p:'1. Detect',t:'0-5 min',steps:['ตรวจ Monitoring: Traffic spike ผิดปกติ','ดู NetFlow — Source IP/Port ซ้ำกันมาก','show interface — Bandwidth ใกล้เต็ม','Confirm DDoS vs Flash Crowd'],cmd:'show interface Gi0/0 | inc input\nshow ip cache flow | sort'},
    {p:'2. Contain',t:'5-30 min',steps:['แจ้ง ISP ขอ Upstream Black-hole','Null Route IP ต้นทางที่ชัดเจน','Rate Limiting บน Edge Router','เปิด Anti-DDoS Mitigation Mode'],cmd:'ip route 1.2.3.4/32 Null0'},
    {p:'3. Mitigate',t:'30 min+',steps:['Scrubbing Center — เบี่ยง Traffic','BGP Blackhole Community — แจ้ง ISP','Anycast — กระจาย Traffic หลาย PoP','เพิ่ม Capacity ชั่วคราว'],cmd:'set community 65535:666'},
    {p:'4. Post',t:'After',steps:['เก็บ Log และ Traffic Capture','Update ACL/Firewall','ทบทวน DDoS Plan','ทำ Incident Report'],cmd:'copy run flash:post-incident'},
  ]},
  ransomware:{title:'💀 Ransomware',color:'var(--accent4)',phases:[
    {p:'1. Isolate',t:'ทันที',steps:['ดึงสาย Ethernet ออกทันที','Disable Wi-Fi บน Host','อย่า Shutdown (สูญหาย Memory)','แจ้ง Security Team ทันที'],cmd:'# Switch: shutdown port\ninterface Gi1/0/X\n shutdown'},
    {p:'2. Assess',t:'0-2 ชม.',steps:['ตรวจ Lateral Movement — Connection Log','ตรวจ Shared Drive ที่อาจถูก Encrypt','ระบุ Ransomware Family','ตรวจ Backup ยังดีอยู่?'],cmd:'show ip arp | grep [MAC]\nshow ip flows [IP]'},
    {p:'3. Eradicate',t:'2-24 ชม.',steps:['Wipe & Reinstall — ห้าม Restore จาก Infected Backup','Change Credentials ทุก Account','Patch Vulnerability ที่ถูก Exploit','Block C2 IP ใน Firewall'],cmd:'ip access-list ext BLOCK_C2\n deny ip any host [C2-IP] log'},
    {p:'4. Recover',t:'24-72 ชม.',steps:['Restore จาก Clean Offline Backup','Test ก่อน Connect Production','Monitor อย่างใกล้ชิด 30 วัน','ทำ Lessons Learned'],cmd:''},
  ]},
  rogue:{title:'👾 Rogue Device',color:'var(--accent5)',phases:[
    {p:'1. Detect',t:'0-10 min',steps:['ดู ARP Table — IP/MAC ไม่รู้จัก','ตรวจ DHCP Leases — Host ใหม่','ดู Switch MAC Table — Port ไหน','SNMP Trap จาก 802.1X Failure'],cmd:'show arp\nshow ip dhcp binding\nshow mac address-table dynamic'},
    {p:'2. Identify',t:'10-30 min',steps:['Locate Port จาก MAC Address','ดู Physical Location','Fingerprint ด้วย nmap','ตัดสินว่า Employee หรือ Attacker?'],cmd:'show mac addr-table | inc [MAC]\nnmap -O [IP]'},
    {p:'3. Block',t:'ทันที',steps:['Shutdown Switch Port นั้น','802.1X Block อัตโนมัติ','Update Blacklist ใน NAC','แจ้ง Security Team'],cmd:'interface Gi1/0/XX\n shutdown\n desc BLOCKED-ROGUE'},
    {p:'4. Investigate',t:'หลัง Block',steps:['ตรวจ Log ว่าทำอะไรบ้าง','Capture Packet ที่เก็บไว้','ถ้า Internal Threat — แจ้ง HR/Legal','Update NAC Policy'],cmd:'show logging | include [MAC]'},
  ]},
  breach:{title:'🔓 Data Breach',color:'var(--accent2)',phases:[
    {p:'1. Contain',t:'0-1 ชม.',steps:['ตัด External Connection ของ System','Preserve Evidence — อย่า Alter Log','Change Credentials ทันที','Notify CISO/Legal ทันที'],cmd:'iptables -I OUTPUT -j DROP'},
    {p:'2. Investigate',t:'1-24 ชม.',steps:['Timeline — ถูก Breach เมื่อไหร่?','ข้อมูลอะไรถูก Access?','Attack Vector คืออะไร?','Scope — มี System อื่นอีก?'],cmd:'grep "unauthorized" /var/log/auth.log'},
    {p:'3. Notify',t:'72 ชม.',steps:['PDPA (ไทย): แจ้ง PDPC ภายใน 72 ชม.','GDPR (EU): แจ้ง Supervisory Authority','แจ้ง Customers ที่ได้รับผลกระทบ','Prepare Public Statement'],cmd:''},
    {p:'4. Remediate',t:'หลังจาก',steps:['Patch Vulnerability ที่ถูก Exploit','ใส่ MFA ทุก Critical System','Security Audit ทั้งหมด','Update Incident Response Plan'],cmd:''},
  ]},
};
function showIncident(t){
  const d=ID2[t];
  ['ddos','ransomware','rogue','breach'].forEach(k=>{const b=document.getElementById('ibtn'+k.charAt(0).toUpperCase()+k.slice(1));if(b){b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';}});
  const btn=document.getElementById('ibtn'+t.charAt(0).toUpperCase()+t.slice(1));
  if(btn){btn.style.borderColor=d.color;btn.style.color=d.color;}
  document.getElementById('incidentContent').innerHTML=`<div style="font-family:'Space Mono',monospace;font-size:15px;color:${d.color};margin-bottom:16px;">${d.title}</div>
  <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:12px;">
  ${d.phases.map(p=>`<div style="background:var(--surface2);border:1px solid ${d.color}30;border-left:3px solid ${d.color};border-radius:0 4px 4px 0;padding:14px;">
    <div style="font-family:'Space Mono',monospace;font-size:12px;color:${d.color};margin-bottom:3px;">${p.p}</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:9px;color:var(--text-muted);margin-bottom:10px;">⏱ ${p.t}</div>
    <ul style="list-style:none;display:flex;flex-direction:column;gap:5px;margin-bottom:10px;">
      ${p.steps.map(s=>`<li style="font-size:11px;color:var(--text-dim);display:flex;gap:6px;"><span style="color:${d.color};flex-shrink:0;">▸</span>${s}</li>`).join('')}
    </ul>
    ${p.cmd?`<div style="background:#010d18;border:1px solid var(--border);border-radius:2px;padding:7px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent5);">${p.cmd.replace(/\n/g,'<br>')}</div>`:''}
  </div>`).join('')}</div>`;
}
showIncident('ddos');

// ── FLASHCARDS ───────────────────────────────────────────────
const FD={
  ports:[
    {q:'HTTP',a:'Port 80',hint:'Cleartext Web'},
    {q:'HTTPS',a:'Port 443',hint:'TLS Encrypted Web'},
    {q:'SSH',a:'Port 22',hint:'Secure Shell — ใช้แทน Telnet'},
    {q:'Telnet',a:'Port 23',hint:'ไม่ปลอดภัย — ควรปิด'},
    {q:'FTP',a:'Port 21',hint:'Control (Data=20)'},
    {q:'SMTP',a:'Port 25',hint:'ส่ง Email'},
    {q:'DNS',a:'Port 53',hint:'UDP (Query) + TCP (Zone Transfer)'},
    {q:'DHCP',a:'Port 67/68',hint:'Server:67 Client:68'},
    {q:'SNMP',a:'Port 161',hint:'UDP (Trap=162)'},
    {q:'BGP',a:'Port 179',hint:'TCP — ต้อง Establish TCP ก่อน'},
    {q:'LDAP',a:'Port 389',hint:'Directory Services'},
    {q:'RDP',a:'Port 3389',hint:'Remote Desktop Windows'},
    {q:'NTP',a:'Port 123',hint:'UDP — Network Time Protocol'},
    {q:'OSPF',a:'Proto 89',hint:'IP Protocol 89 ไม่ใช้ TCP/UDP'},
    {q:'EIGRP',a:'Proto 88',hint:'IP Protocol 88 — Cisco'},
  ],
  ad:[
    {q:'Connected',a:'AD = 0',hint:'เชื่อมต่อโดยตรง'},
    {q:'Static Route',a:'AD = 1',hint:'Admin กำหนดเอง'},
    {q:'EIGRP Summary',a:'AD = 5',hint:''},
    {q:'eBGP',a:'AD = 20',hint:'External BGP'},
    {q:'EIGRP Internal',a:'AD = 90',hint:''},
    {q:'OSPF',a:'AD = 110',hint:'Open Standard'},
    {q:'IS-IS',a:'AD = 115',hint:''},
    {q:'RIP',a:'AD = 120',hint:'เก่า — Max 15 Hop'},
    {q:'EIGRP External',a:'AD = 170',hint:'Redistributed Routes'},
    {q:'iBGP',a:'AD = 200',hint:'Internal BGP'},
    {q:'Unknown',a:'AD = 255',hint:'ไม่ใช้ Route นี้เลย'},
  ],
  timers:[
    {q:'OSPF Hello (LAN)',a:'10 sec',hint:'Dead=40 sec'},
    {q:'OSPF Hello (WAN)',a:'30 sec',hint:'Dead=120 sec'},
    {q:'EIGRP Hello (LAN)',a:'5 sec',hint:'Hold=15 sec'},
    {q:'EIGRP Hello (WAN)',a:'60 sec',hint:'Hold=180 sec'},
    {q:'BGP Keepalive',a:'60 sec',hint:'Hold Time=180 sec'},
    {q:'STP Hello',a:'2 sec',hint:'ส่ง BPDU ทุก 2 วิ'},
    {q:'STP Forward Delay',a:'15 sec',hint:'Listening+Learning'},
    {q:'STP Max Age',a:'20 sec',hint:'ก่อน Recalculate'},
    {q:'RSTP Convergence',a:'1-2 sec',hint:'เร็วกว่า STP มาก'},
    {q:'ARP Cache Timeout',a:'4 ชั่วโมง',hint:'240 นาที (Cisco default)'},
  ],
  commands:[
    {q:'ดู Routing Table',a:'show ip route',hint:'Prefix, AD/Metric, Next-hop'},
    {q:'ดู OSPF Neighbor',a:'show ip ospf neighbor',hint:'State ต้องเป็น FULL'},
    {q:'ดู BGP Summary',a:'show ip bgp summary',hint:'State ต้องเป็นตัวเลข'},
    {q:'ดู Interface Stats',a:'show interface Gi0/0',hint:'Error, Drop, BW, DLY'},
    {q:'ดู CPU',a:'show processes cpu sorted',hint:'5s, 1min, 5min avg'},
    {q:'ดู ARP Table',a:'show ip arp',hint:'IP to MAC Mapping'},
    {q:'ดู MAC Table',a:'show mac address-table',hint:'MAC to Port (Switch)'},
    {q:'ดู VLAN',a:'show vlan brief',hint:'ID, Name, Ports'},
    {q:'ดู Trunk Ports',a:'show interfaces trunk',hint:'Allowed VLANs'},
    {q:'ดู EtherChannel',a:'show etherchannel summary',hint:'Po Members, Protocol'},
    {q:'Save Config',a:'copy run start',hint:'หรือ write memory (wr)'},
    {q:'ดู Log',a:'show logging',hint:'Syslog Buffer'},
    {q:'ดู NAT',a:'show ip nat translations',hint:'NAT Table ปัจจุบัน'},
    {q:'Debug OSPF Hello',a:'debug ip ospf hello',hint:'⚠️ ระวัง CPU Production'},
  ],
};
let flashDeck=[],flashIdx=0,flashFlipped=false;
function setFlashDeck(n){
  flashDeck=FD[n];flashIdx=0;flashFlipped=false;
  ['ports','ad','timers','commands'].forEach(k=>{const b=document.getElementById('fdbtn'+k.charAt(0).toUpperCase()+k.slice(1));if(b){b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';}});
  const b=document.getElementById('fdbtn'+n.charAt(0).toUpperCase()+n.slice(1));
  if(b){b.style.borderColor='var(--accent)';b.style.color='var(--accent)';}
  renderFlash();
}
function renderFlash(){
  const d=flashDeck[flashIdx];
  document.getElementById('flashQ').textContent=d.q;
  document.getElementById('flashA').textContent=d.a;
  document.getElementById('flashHint').textContent=d.hint;
  document.getElementById('flashCounter').textContent=(flashIdx+1)+'/'+flashDeck.length;
  document.getElementById('flashFront').style.display='block';
  document.getElementById('flashBack').style.display='none';
  flashFlipped=false;
  const dots=document.getElementById('flashDots');
  if(dots)dots.innerHTML=flashDeck.map((_,i)=>`<div style="width:8px;height:8px;border-radius:50%;background:${i===flashIdx?'var(--accent)':'var(--border)'};cursor:pointer;transition:background .2s;" onclick="flashIdx=${i};renderFlash()"></div>`).join('');
}
function flipFlash(){flashFlipped=!flashFlipped;document.getElementById('flashFront').style.display=flashFlipped?'none':'block';document.getElementById('flashBack').style.display=flashFlipped?'block':'none';}
function nextFlash(){flashIdx=(flashIdx+1)%flashDeck.length;renderFlash();}
function prevFlash(){flashIdx=(flashIdx-1+flashDeck.length)%flashDeck.length;renderFlash();}
setFlashDeck('ports');

// ── CLI SEARCH ───────────────────────────────────────────────
const CLIDB=[
  {v:'cisco',cmd:'show ip interface brief',desc:'ดู Interface Status + IP ทั้งหมด',tags:['interface','status','ip']},
  {v:'cisco',cmd:'show ip route',desc:'ดู Routing Table',tags:['route','routing']},
  {v:'cisco',cmd:'show ip ospf neighbor',desc:'ดู OSPF Neighbor State',tags:['ospf','neighbor']},
  {v:'cisco',cmd:'show ip bgp summary',desc:'ดู BGP Peer Status',tags:['bgp','summary']},
  {v:'cisco',cmd:'show ip eigrp neighbors',desc:'ดู EIGRP Neighbor Table',tags:['eigrp','neighbor']},
  {v:'cisco',cmd:'show vlan brief',desc:'ดู VLAN Database',tags:['vlan','switch']},
  {v:'cisco',cmd:'show interfaces trunk',desc:'ดู Trunk Ports + Allowed VLANs',tags:['trunk','vlan']},
  {v:'cisco',cmd:'show mac address-table',desc:'ดู MAC Address Table',tags:['mac','switch']},
  {v:'cisco',cmd:'show etherchannel summary',desc:'ดู EtherChannel/LAG Status',tags:['etherchannel','lag']},
  {v:'cisco',cmd:'show spanning-tree',desc:'ดู STP State ทุก VLAN',tags:['stp','spanning-tree']},
  {v:'cisco',cmd:'show ip nat translations',desc:'ดู NAT Translation Table',tags:['nat']},
  {v:'cisco',cmd:'show access-lists',desc:'ดู ACL Rules + Match Count',tags:['acl','access-list']},
  {v:'cisco',cmd:'show ip dhcp binding',desc:'ดู DHCP Leases',tags:['dhcp']},
  {v:'cisco',cmd:'show processes cpu sorted',desc:'ดู CPU Usage แยก Process',tags:['cpu','performance']},
  {v:'cisco',cmd:'show version',desc:'ดู IOS Version, Uptime, Hardware',tags:['version','uptime']},
  {v:'cisco',cmd:'show running-config',desc:'ดู Running Config',tags:['config']},
  {v:'cisco',cmd:'show logging',desc:'ดู Syslog Buffer',tags:['log','syslog']},
  {v:'cisco',cmd:'show ip ospf database',desc:'ดู OSPF LSDB',tags:['ospf','database','lsdb']},
  {v:'cisco',cmd:'show ip bgp',desc:'ดู BGP Table ทั้งหมด',tags:['bgp','table']},
  {v:'cisco',cmd:'clear ip ospf process',desc:'Restart OSPF Process',tags:['ospf','reset']},
  {v:'cisco',cmd:'clear ip bgp * soft',desc:'Soft Reset BGP Sessions',tags:['bgp','reset']},
  {v:'cisco',cmd:'debug ip ospf hello',desc:'Debug OSPF Hello (ระวัง CPU)',tags:['ospf','debug']},
  {v:'cisco',cmd:'show ip ospf interface',desc:'ดู OSPF Timer, Area, DR/BDR',tags:['ospf','interface']},
  {v:'cisco',cmd:'show lacp neighbor',desc:'ดู LACP Neighbor Detail',tags:['lacp','etherchannel']},
  {v:'cisco',cmd:'show ip route summary',desc:'สรุปจำนวน Route แต่ละ Protocol',tags:['route','summary']},
  {v:'junos',cmd:'show interfaces terse',desc:'ดู Interface Status ย่อ',tags:['interface','status']},
  {v:'junos',cmd:'show route',desc:'ดู Routing Table',tags:['route','routing']},
  {v:'junos',cmd:'show ospf neighbor',desc:'ดู OSPF Neighbor State',tags:['ospf','neighbor']},
  {v:'junos',cmd:'show bgp summary',desc:'ดู BGP Session Summary',tags:['bgp','summary']},
  {v:'junos',cmd:'show ethernet-switching table',desc:'ดู MAC Address Table',tags:['mac','switch']},
  {v:'junos',cmd:'show vlans',desc:'ดู VLAN Configuration',tags:['vlan']},
  {v:'junos',cmd:'show lacp interfaces',desc:'ดู LACP Status',tags:['lacp','lag']},
  {v:'junos',cmd:'show firewall',desc:'ดู Firewall Filter Stats',tags:['firewall','acl']},
  {v:'junos',cmd:'show system processes',desc:'ดู System Processes',tags:['cpu','process']},
  {v:'junos',cmd:'show version',desc:'ดู JunOS Version + Platform',tags:['version']},
  {v:'junos',cmd:'show log messages',desc:'ดู System Log',tags:['log','syslog']},
  {v:'junos',cmd:'show isis adjacency',desc:'ดู IS-IS Adjacency',tags:['isis','neighbor']},
  {v:'mikrotik',cmd:'/ip address print',desc:'ดู IP Addresses',tags:['interface','ip','address']},
  {v:'mikrotik',cmd:'/ip route print',desc:'ดู Routing Table',tags:['route','routing']},
  {v:'mikrotik',cmd:'/routing ospf neighbor print',desc:'ดู OSPF Neighbor',tags:['ospf','neighbor']},
  {v:'mikrotik',cmd:'/routing bgp peer print',desc:'ดู BGP Peer Status',tags:['bgp']},
  {v:'mikrotik',cmd:'/interface print',desc:'ดู Interfaces ทั้งหมด',tags:['interface']},
  {v:'mikrotik',cmd:'/interface bridge vlan print',desc:'ดู VLAN บน Bridge',tags:['vlan','bridge']},
  {v:'mikrotik',cmd:'/ip firewall filter print',desc:'ดู Firewall Rules',tags:['firewall','filter']},
  {v:'mikrotik',cmd:'/ip firewall nat print',desc:'ดู NAT Rules',tags:['nat']},
  {v:'mikrotik',cmd:'/ip dhcp-server lease print',desc:'ดู DHCP Leases',tags:['dhcp']},
  {v:'mikrotik',cmd:'/tool ping 8.8.8.8',desc:'Ping จาก MikroTik',tags:['ping','test']},
  {v:'mikrotik',cmd:'/tool traceroute 8.8.8.8',desc:'Traceroute จาก MikroTik',tags:['traceroute']},
  {v:'mikrotik',cmd:'/log print',desc:'ดู System Log',tags:['log']},
  {v:'mikrotik',cmd:'/system resource print',desc:'ดู CPU, RAM, Uptime',tags:['cpu','resource']},
  {v:'mikrotik',cmd:'/interface monitor-traffic ether1 once',desc:'Real-time Traffic บน Interface',tags:['traffic','bandwidth','monitor']},
  {v:'mikrotik',cmd:'/ip neighbor print',desc:'ดู CDP/LLDP Neighbors',tags:['neighbor','discovery']},
];
let cliVF='all';
function filterVendor(v){
  cliVF=v;
  ['all','cisco','junos','mikrotik'].forEach(k=>{const b=document.getElementById('cv-'+k);if(b){b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';}});
  const b=document.getElementById('cv-'+v);if(b){b.style.borderColor='var(--accent)';b.style.color='var(--accent)';}
  searchCLI(document.getElementById('cliSearchBox').value);
}
function searchCLI(q){
  const kw=q.toLowerCase().trim();
  const vc={'cisco':'var(--accent)','junos':'var(--accent2)','mikrotik':'var(--accent4)'};
  const vn={'cisco':'Cisco IOS','junos':'JunOS','mikrotik':'MikroTik'};
  const res=CLIDB.filter(r=>{
    if(cliVF!=='all'&&r.v!==cliVF)return false;
    if(!kw)return true;
    return r.cmd.toLowerCase().includes(kw)||r.desc.toLowerCase().includes(kw)||r.tags.some(t=>t.includes(kw));
  });
  const c=document.getElementById('cliResults');
  const cnt=document.getElementById('cliCount');
  if(c)c.innerHTML=res.slice(0,20).map(r=>`<div class="cli-result" onclick="navigator.clipboard&&navigator.clipboard.writeText('${r.cmd.replace(/'/g,"\\'")}').then(()=>{this.style.borderColor='var(--accent2)';setTimeout(()=>this.style.borderColor='',700)})">
    <div style="flex:1;"><div class="cli-cmd">${r.cmd}</div><div class="cli-desc">${r.desc}</div></div>
    <div class="cli-vendor-tag" style="color:${vc[r.v]};border-color:${vc[r.v]};">${vn[r.v]}</div>
  </div>`).join('')||'<div style="color:var(--text-muted);font-size:12px;padding:16px;font-family:JetBrains Mono,monospace;">ไม่พบ Command ที่ค้นหา</div>';
  if(cnt)cnt.textContent=`แสดง ${Math.min(res.length,20)} จาก ${res.length} commands`;
}
searchCLI('');

// ── PROGRESS TRACKER ──────────────────────────────────────────
const PT=[
  {id:'pt01',label:'OSI Model — 7 Layers',tag:'Fundamentals'},
  {id:'pt02',label:'TCP/IP + 3-Way Handshake',tag:'Fundamentals'},
  {id:'pt03',label:'Subnetting / CIDR',tag:'Fundamentals'},
  {id:'pt04',label:'VLAN + 802.1Q Trunk',tag:'Fundamentals'},
  {id:'pt05',label:'STP / RSTP / PVST+',tag:'Fundamentals'},
  {id:'pt06',label:'EtherChannel (LACP/PAgP)',tag:'Fundamentals'},
  {id:'pt07',label:'OSPF (Areas, DR/BDR, LSA)',tag:'Routing'},
  {id:'pt08',label:'BGP (eBGP/iBGP, Attributes)',tag:'Routing'},
  {id:'pt09',label:'EIGRP (DUAL, FD/RD)',tag:'Routing'},
  {id:'pt10',label:'NAT / PAT / Static NAT',tag:'Services'},
  {id:'pt11',label:'ACL Standard + Extended',tag:'Services'},
  {id:'pt12',label:'DHCP / DNS / QoS',tag:'Services'},
  {id:'pt13',label:'IPv6 (NDP/SLAAC/DHCPv6)',tag:'IPv6'},
  {id:'pt14',label:'Python + Netmiko/Napalm',tag:'Automation'},
  {id:'pt15',label:'Ansible Playbooks',tag:'Automation'},
  {id:'pt16',label:'Nornir Framework',tag:'Automation'},
  {id:'pt17',label:'REST API + JSON/YAML',tag:'Automation'},
  {id:'pt18',label:'Git + CI/CD Pipeline',tag:'Automation'},
  {id:'pt19',label:'Linux SSH + Bash Script',tag:'Linux'},
  {id:'pt20',label:'Linux grep/awk/systemctl',tag:'Linux'},
  {id:'pt21',label:'Cloud VPC + Security Group',tag:'Cloud'},
  {id:'pt22',label:'VPN + DMVPN',tag:'Cloud'},
  {id:'pt23',label:'Load Balancer (ALB/NLB)',tag:'Cloud'},
  {id:'pt24',label:'Firewall / NGFW / IPS/IDS',tag:'Security'},
  {id:'pt25',label:'Zero Trust + NAC + 802.1X',tag:'Security'},
  {id:'pt26',label:'Incident Response Playbook',tag:'Security'},
  {id:'pt27',label:'SD-WAN (Cisco/Fortinet)',tag:'Advanced'},
  {id:'pt28',label:'VXLAN + EVPN',tag:'Advanced'},
  {id:'pt29',label:'Spine-Leaf Architecture',tag:'Advanced'},
  {id:'pt30',label:'BGP Advanced (Route Policy)',tag:'Advanced'},
  {id:'pt31',label:'SNMP v3 + NetFlow',tag:'Monitoring'},
  {id:'pt32',label:'Zabbix / Grafana / Prometheus',tag:'Monitoring'},
  {id:'pt33',label:'Streaming Telemetry (gNMI)',tag:'Monitoring'},
  {id:'pt34',label:'Wireshark / tshark',tag:'Tools'},
  {id:'pt35',label:'MikroTik RouterOS',tag:'Tools'},
  {id:'pt36',label:'Packet Encapsulation (OSI)',tag:'Tools'},
];
const TC={'Fundamentals':'var(--accent)','Routing':'var(--accent2)','Services':'var(--accent5)','IPv6':'var(--accent4)','Automation':'var(--accent3)','Linux':'var(--text)','Cloud':'var(--accent)','Security':'var(--accent3)','Advanced':'var(--accent4)','Monitoring':'var(--accent2)','Tools':'var(--accent5)'};
function loadProg(){try{return JSON.parse(localStorage.getItem('np2')||'{}');}catch{return {};}}
function saveProg(d){try{localStorage.setItem('np2',JSON.stringify(d));}catch(e){console.warn('Storage unavailable',e);}}
function renderProg(){
  const d=loadProg();
  const c=document.getElementById('progItems');
  if(!c)return;
  c.innerHTML=PT.map(t=>`<div class="progress-item ${d[t.id]?'done-item':''}" onclick="toggleProg('${t.id}')">
    <div class="prog-check">${d[t.id]?'✓':''}</div>
    <div style="flex:1;font-size:13px;font-family:'Space Mono',monospace;">${t.label}</div>
    <div class="prog-tag" style="${d[t.id]?'border-color:'+TC[t.tag]+';color:'+TC[t.tag]:''}">${t.tag}</div>
  </div>`).join('');
  const done=Object.values(d).filter(Boolean).length;
  const pct=Math.round((done/PT.length)*100);
  const pe=document.getElementById('progPercent');
  const be=document.getElementById('progBar');
  if(pe)pe.textContent=pct+'%  ('+done+'/'+PT.length+' หัวข้อ)';
  if(be)be.style.width=pct+'%';
}
function toggleProg(id){const d=loadProg();d[id]=!d[id];saveProg(d);renderProg();}
function checkAllProg(){const d={};PT.forEach(t=>d[t.id]=true);saveProg(d);renderProg();}
function clearAllProg(){saveProg({});renderProg();}
renderProg();
<!-- ═══════════════════════════════════════════════════════════ -->

// ---- extracted script block ----

(function(){
  const nav=document.querySelector('.nav-tabs');
  [['ext-scenarios','🧪 Scenario Labs'],['ext-multivendor','🔀 Multi-vendor'],
   ['ext-hardening','🛡️ Hardening'],['ext-calc','🧮 Calculators'],
   ['ext-wireless','📶 Wireless'],['ext-interview','💼 Interview Q&A'],
   ['ext-pktpath','🛣️ Packet Sim'],['ext-homelab','🖥️ Home Lab'],
   ['ext-pyprojects','🐍 Python Projects'],['ext-timeline','📅 History'],
   ['ext-rfc','📄 RFC Index'],['ext-glossary','📖 Glossary'],
   ['ext-bfd','⚡ BFD'],['ext-mplsvpn','🔗 MPLS VPN']]
  .forEach(([id,label])=>{
    const b=document.createElement('button');
    b.className='nav-tab';b.textContent=label;
    b.onclick=function(){
      document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
      document.getElementById(id).classList.add('active');
      b.classList.add('active');
      window.scrollTo({top:0,behavior:'smooth'});
    };
    nav.appendChild(b);
  });
})();

// ── SCENARIO LABS ──────────────────────────────────────────
const SCENARIOS=[
  {title:'🏢 Enterprise Campus Network Design',level:'Intermediate',tags:['OSPF','VLAN','STP','EtherChannel'],
   req:'บริษัทมี 3 Building, 500 Users ต้องการ Network ที่ Redundant ทุก Layer, แยก VLAN ตาม Department, มี Internet ออก 2 เส้นเพื่อ Redundancy',
   steps:['1. Core Layer: 2x Core Switch ต่อกัน EtherChannel (LAG) VLAN Trunk ทุก VLAN','2. Distribution Layer: 2x Dist Switch ต่อ Core แบบ Dual-homed','3. Access Layer: Switch ต่อ PC ด้วย Access Port กำหนด VLAN ตาม Dept','4. Routing: OSPF Area 0 ระหว่าง Core, SVI เป็น Default Gateway แต่ละ VLAN','5. Internet: 2x Router ต่อ ISP ต่างกัน ทำ BGP + IP SLA Tracking', '6. NAT: PAT บน Edge Router แปลง Private → Public'],
   config:`! Core Switch — SVI + OSPF
vlan 10,20,30,99
interface Vlan10
 description IT_Department
 ip address 10.10.10.1 255.255.255.0
 ip ospf 1 area 0
!
interface Port-channel1
 switchport mode trunk
 switchport trunk allowed vlan 10,20,30,99`},
  {title:'🌐 ISP Multi-homing + BGP',level:'Advanced',tags:['BGP','NAT','IP SLA','Policy Routing'],
   req:'บริษัทต้องการต่อ Internet 2 ISP (Primary 1Gbps, Backup 500Mbps) ให้ Traffic ออก Primary ก่อน ถ้า Primary Down ให้ Failover อัตโนมัติภายใน 30 วิ',
   steps:['1. eBGP กับ ISP-A (AS 65100) และ ISP-B (AS 65200)','2. กำหนด Local Preference: ISP-A = 200, ISP-B = 100','3. IP SLA ตรวจสอบ ISP-A ทุก 10 วิ','4. Track Object เชื่อม IP SLA กับ BGP','5. ถ้า ISP-A Down → BGP ลบ Route → Traffic ไป ISP-B อัตโนมัติ'],
   config:`! BGP Multi-homing
router bgp 65001
 neighbor 203.0.113.1 remote-as 65100
 neighbor 198.51.100.1 remote-as 65200
!
route-map ISP-A-IN permit 10
 set local-preference 200
route-map ISP-B-IN permit 10
 set local-preference 100`},
  {title:'🔒 Site-to-Site VPN + DMVPN',level:'Advanced',tags:['IPSec','DMVPN','OSPF','GRE'],
   req:'HQ กับ 5 Branch ต้องการ Secure WAN ทุก Branch ต้องคุยกันได้โดยตรง (Spoke-to-Spoke) ไม่ต้องผ่าน HQ',
   steps:['1. HQ เป็น DMVPN Hub, Branch เป็น Spoke','2. mGRE Interface บน Hub, GRE บน Spoke','3. NHRP: Hub เป็น NHS, Spoke Register','4. IPSec Profile ครอบ Tunnel','5. OSPF Point-to-multipoint ใน Tunnel','6. Phase 2: Spoke-to-Spoke Dynamic ผ่าน NHRP Resolution'],
   config:`! HUB — DMVPN
interface Tunnel0
 ip address 10.100.0.1 255.255.255.0
 tunnel source Gi0/0
 tunnel mode gre multipoint
 ip nhrp network-id 100
 ip nhrp map multicast dynamic
 ip ospf network point-to-multipoint`},
];
function buildScenarios(){
  const c=document.getElementById('scenarioList');
  if(!c)return;
  c.innerHTML=SCENARIOS.map((s,i)=>`
    <div class="scenario-card" id="sc${i}" onclick="toggleScenario(${i})">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;">
        <div>
          <div style="font-family:'Space Mono',monospace;font-size:15px;color:var(--accent);margin-bottom:6px;">${s.title}</div>
          <div style="display:flex;gap:6px;flex-wrap:wrap;">${s.tags.map(t=>`<span style="font-family:'JetBrains Mono',monospace;font-size:10px;padding:2px 8px;border:1px solid var(--accent);border-radius:2px;color:var(--accent);">${t}</span>`).join('')}</div>
        </div>
        <span style="font-family:'JetBrains Mono',monospace;font-size:10px;padding:3px 10px;border-radius:2px;border:1px solid var(--accent5);color:var(--accent5);">${s.level}</span>
      </div>
      <div class="scenario-body">
        <div class="highlight-box" style="margin-bottom:16px;"><strong>📋 Requirements:</strong><br>${s.req}</div>
        <div style="font-family:'Space Mono',monospace;font-size:12px;color:var(--accent2);margin-bottom:10px;">🗺️ Solution Steps</div>
        <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px;">
          ${s.steps.map(st=>`<div style="display:flex;gap:10px;font-size:13px;color:var(--text-dim);"><span style="color:var(--accent);flex-shrink:0;">▸</span>${st}</div>`).join('')}
        </div>
        <div class="code-block" data-lang="cisco ios">${s.config}</div>
      </div>
    </div>`).join('');
}
buildScenarios();
function toggleScenario(i){document.getElementById('sc'+i).classList.toggle('open');}

// ── MULTI-VENDOR COMPARISON ──────────────────────────────────
const MV_TOPICS={
  'Show Routes':{cisco:'show ip route',junos:'show route',mikrotik:'/ip route print'},
  'Show Interfaces':{cisco:'show ip interface brief',junos:'show interfaces terse',mikrotik:'/interface print'},
  'OSPF Neighbors':{cisco:'show ip ospf neighbor',junos:'show ospf neighbor',mikrotik:'/routing ospf neighbor print'},
  'BGP Summary':{cisco:'show ip bgp summary',junos:'show bgp summary',mikrotik:'/routing bgp peer print'},
  'MAC Table':{cisco:'show mac address-table',junos:'show ethernet-switching table',mikrotik:'/interface bridge host print'},
  'VLAN Info':{cisco:'show vlan brief',junos:'show vlans',mikrotik:'/interface bridge vlan print'},
  'Firewall Rules':{cisco:'show access-lists',junos:'show firewall',mikrotik:'/ip firewall filter print'},
  'NAT Table':{cisco:'show ip nat translations',junos:'show security nat source',mikrotik:'/ip firewall nat print'},
  'CPU/Resources':{cisco:'show processes cpu sorted',junos:'show chassis routing-engine',mikrotik:'/system resource print'},
  'Save Config':{cisco:'copy running-config startup-config',junos:'commit and-quit',mikrotik:'/system backup save name=backup'},
  'Traceroute':{cisco:'traceroute 8.8.8.8',junos:'traceroute 8.8.8.8',mikrotik:'/tool traceroute 8.8.8.8'},
  'Restart Protocol':{cisco:'clear ip ospf process',junos:'restart routing',mikrotik:'/routing ospf instance set default disabled=yes'},
};
let mvSelected=Object.keys(MV_TOPICS)[0];
function buildMVButtons(){
  const c=document.getElementById('mvTopicBtns');
  if(!c)return;
  c.innerHTML=Object.keys(MV_TOPICS).map(t=>`<button class="btn" onclick="selectMV('${t}')" id="mvb-${t.replace(/ /g,'_')}" style="${t===mvSelected?'border-color:var(--accent);color:var(--accent);':''}">${t}</button>`).join('');
}
function selectMV(t){
  mvSelected=t;
  document.querySelectorAll('#mvTopicBtns .btn').forEach(b=>{b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';});
  const b=document.getElementById('mvb-'+t.replace(/ /g,'_'));
  if(b){b.style.borderColor='var(--accent)';b.style.color='var(--accent)';}
  renderMV();
}
function renderMV(){
  const d=MV_TOPICS[mvSelected];
  const vc={cisco:'var(--accent)',junos:'var(--accent2)',mikrotik:'var(--accent4)'};
  document.getElementById('mvContent').innerHTML=`
    <table class="diff-table">
      <tr><th style="color:${vc.cisco};">Cisco IOS</th><th style="color:${vc.junos};">JunOS</th><th style="color:${vc.mikrotik};">MikroTik RouterOS</th></tr>
      <tr>
        <td style="color:${vc.cisco};font-size:13px;">${d.cisco}</td>
        <td style="color:${vc.junos};font-size:13px;">${d.junos}</td>
        <td style="color:${vc.mikrotik};font-size:13px;">${d.mikrotik}</td>
      </tr>
    </table>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:16px;">
      ${['cisco','junos','mikrotik'].map(v=>`
        <div class="code-block" data-lang="${v}" style="margin:0;">
<span style="color:${vc[v]};">${d[v]}</span>
        </div>`).join('')}
    </div>`;
}
buildMVButtons();renderMV();

// ── SECURITY HARDENING ───────────────────────────────────────
const HARDEN_ITEMS=[
  {id:'h01',sev:'critical',label:'ปิด Telnet — ใช้ SSH แทน',cmd:'line vty 0 4\n transport input ssh\nip ssh version 2',fix:'Telnet ส่งข้อมูลแบบ Cleartext ถูก Sniff ได้'},
  {id:'h02',sev:'critical',label:'เปลี่ยน Default Password (admin/cisco)',cmd:'username admin privilege 15 secret StrongPass!2024',fix:'Default Password คือ Attack Vector อันดับ 1'},
  {id:'h03',sev:'critical',label:'เปิด SSH v2 และ ปิด v1',cmd:'ip ssh version 2\nip ssh time-out 60\nip ssh authentication-retries 3',fix:'SSH v1 มีช่องโหว่ MITM'},
  {id:'h04',sev:'critical',label:'กำหนด Enable Secret (ไม่ใช้ enable password)',cmd:'enable secret StrongSecret!2024\nno enable password',fix:'enable password เก็บแบบ MD5 อ่อนแอ'},
  {id:'h05',sev:'high',label:'จำกัด Access ด้วย ACL บน VTY',cmd:'access-list 10 permit 10.0.0.0 0.0.0.255\nline vty 0 4\n access-class 10 in',fix:'จำกัด SSH/Telnet เฉพาะ Management Network'},
  {id:'h06',sev:'high',label:'เปิด SNMP v3 — ปิด v1/v2c',cmd:'no snmp-server community public\nsnmp-server group MYGROUP v3 priv\nsnmp-server user MYUSER MYGROUP v3 auth sha AuthPass priv aes 128 PrivPass',fix:'SNMP v1/v2c ไม่มี Encryption'},
  {id:'h07',sev:'high',label:'เปิด Logging ไป Syslog Server',cmd:'logging host 10.0.0.100\nlogging trap informational\nlogging source-interface Loopback0',fix:'Log ทุก Event สำหรับ Audit'},
  {id:'h08',sev:'high',label:'ปิด HTTP Server — ใช้ HTTPS',cmd:'no ip http server\nip http secure-server\nip http access-class 10',fix:'HTTP ส่งข้อมูลแบบ Cleartext'},
  {id:'h09',sev:'high',label:'ตั้ง NTP พร้อม Authentication',cmd:'ntp server 10.0.0.200 prefer\nntp authenticate\nntp authentication-key 1 md5 NTPSecret',fix:'เวลาไม่ตรง Correlation Log และ Cert ผิดพลาด'},
  {id:'h10',sev:'high',label:'เปิด Port Security บน Access Ports',cmd:'switchport port-security maximum 2\nswitchport port-security violation restrict\nswitchport port-security',fix:'ป้องกัน MAC Flooding Attack'},
  {id:'h11',sev:'medium',label:'ปิด CDP/LLDP บน External Interface',cmd:'interface Gi0/0\n no cdp enable\n no lldp transmit\n no lldp receive',fix:'CDP/LLDP เปิดเผย Device Info ให้ Attacker'},
  {id:'h12',sev:'medium',label:'ปิด Unused Services',cmd:'no service pad\nno ip bootp server\nno ip source-route\nno ip finger',fix:'ลด Attack Surface'},
  {id:'h13',sev:'medium',label:'เปิด BPDU Guard บน Access Ports',cmd:'spanning-tree portfast bpduguard default\ninterface range Gi1/0/1-48\n spanning-tree portfast',fix:'ป้องกัน Rogue Switch เชื่อมต่อ'},
  {id:'h14',sev:'medium',label:'ตั้ง Banner Warning',cmd:'banner login $\nUNAUTHORIZED ACCESS PROHIBITED\nAll activity is monitored and logged.\n$',fix:'Legal Requirement สำหรับ Prosecution'},
  {id:'h15',sev:'medium',label:'เปิด AAA Authentication',cmd:'aaa new-model\naaa authentication login default group radius local\naaa authorization exec default group radius local',fix:'Centralized Auth ผ่าน RADIUS/TACACS+'},
];
let hardenFilter='all';
let hardenState={};
function renderHarden(){
  const items=HARDEN_ITEMS.filter(h=>hardenFilter==='all'||h.sev===hardenFilter);
  const c=document.getElementById('hardenItems');
  if(!c)return;
  c.innerHTML=items.map(h=>`
    <div class="harden-item ${hardenState[h.id]?'checked':''}" onclick="toggleHarden('${h.id}')">
      <div class="harden-check">${hardenState[h.id]?'✓':''}</div>
      <div style="flex:1;">
        <div style="font-size:13px;margin-bottom:4px;font-family:'Space Mono',monospace;">${h.label}</div>
        <div style="font-size:11px;color:var(--text-muted);margin-bottom:6px;">${h.fix}</div>
        <div style="background:#010d18;border:1px solid var(--border);border-radius:2px;padding:6px 10px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent5);">${h.cmd.replace(/\n/g,'<br>')}</div>
      </div>
      <div class="harden-sev" style="${{critical:'color:var(--accent3);border-color:var(--accent3);',high:'color:var(--accent5);border-color:var(--accent5);',medium:'color:var(--accent);border-color:var(--accent);'}[h.sev]}">${h.sev.toUpperCase()}</div>
    </div>`).join('');
  const done=Object.values(hardenState).filter(Boolean).length;
  const total=HARDEN_ITEMS.length;
  const s=document.getElementById('hardenScore');
  const b=document.getElementById('hardenBar');
  if(s)s.textContent=done+' / '+total;
  if(b)b.style.width=Math.round((done/total)*100)+'%';
}
function toggleHarden(id){hardenState[id]=!hardenState[id];renderHarden();}
function filterHarden(f){
  hardenFilter=f;
  ['all','critical','high','medium'].forEach(k=>{const b=document.getElementById('hf-'+k);if(b){b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';}});
  const b=document.getElementById('hf-'+f);if(b){b.style.borderColor='var(--accent)';b.style.color='var(--accent)';}
  renderHarden();
}
renderHarden();

// ── CALCULATORS ───────────────────────────────────────────────
function showCalc(t){
  ['bdp','qos','tcp','cable'].forEach(k=>{const b=document.getElementById('cbtn'+k.charAt(0).toUpperCase()+k.slice(1));if(b){b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';}});
  const b=document.getElementById('cbtn'+t.charAt(0).toUpperCase()+t.slice(1));if(b){b.style.borderColor='var(--accent)';b.style.color='var(--accent)';}
  const c=document.getElementById('calcContent');
  if(t==='bdp')c.innerHTML=`
    <div class="highlight-box">BDP (Bandwidth Delay Product) = Bandwidth × RTT — บอกว่า "pipe" มีข้อมูลได้กี่ Bytes ในขณะนั้น TCP Window ต้องใหญ่กว่า BDP ถึงจะ Full Throughput</div>
    <div class="calc-input-wrap" style="margin-top:16px;">
      <div class="calc-row"><span class="calc-label">Bandwidth (Mbps)</span><input type="number" class="mono-input" id="bdpBw" value="100" oninput="calcBDP()" style="width:120px;"></div>
      <div class="calc-row"><span class="calc-label">RTT (ms)</span><input type="number" class="mono-input" id="bdpRtt" value="50" oninput="calcBDP()" style="width:120px;"></div>
    </div>
    <div class="calc-result-grid" id="bdpResult"></div>`;
  if(t==='qos')c.innerHTML=`
    <div class="highlight-box">วางแผน QoS Bandwidth Allocation — Voice ต้องได้ก่อน Video ถัดไป Best Effort ที่เหลือ</div>
    <div class="calc-input-wrap" style="margin-top:16px;">
      <div class="calc-row"><span class="calc-label">Total Link (Mbps)</span><input type="number" class="mono-input" id="qosTotal" value="100" oninput="calcQoS()" style="width:120px;"></div>
      <div class="calc-row"><span class="calc-label">Voice calls</span><input type="number" class="mono-input" id="qosCalls" value="10" oninput="calcQoS()" style="width:120px;"><span style="font-size:12px;color:var(--text-muted);margin-left:8px;">× 90 kbps/call (G.711)</span></div>
      <div class="calc-row"><span class="calc-label">Video streams</span><input type="number" class="mono-input" id="qosVid" value="5" oninput="calcQoS()" style="width:120px;"><span style="font-size:12px;color:var(--text-muted);margin-left:8px;">× 2 Mbps/stream (HD)</span></div>
    </div>
    <div class="calc-result-grid" id="qosResult"></div>`;
  if(t==='tcp')c.innerHTML=`
    <div class="highlight-box">Max TCP Throughput = Window Size / RTT — ถ้า Window เล็กหรือ RTT สูง Throughput จะต่ำกว่า Link Speed มาก</div>
    <div class="calc-input-wrap" style="margin-top:16px;">
      <div class="calc-row"><span class="calc-label">TCP Window (KB)</span><input type="number" class="mono-input" id="tcpWin" value="64" oninput="calcTCP()" style="width:120px;"></div>
      <div class="calc-row"><span class="calc-label">RTT (ms)</span><input type="number" class="mono-input" id="tcpRtt" value="100" oninput="calcTCP()" style="width:120px;"></div>
      <div class="calc-row"><span class="calc-label">Link Speed (Mbps)</span><input type="number" class="mono-input" id="tcpLink" value="1000" oninput="calcTCP()" style="width:120px;"></div>
    </div>
    <div class="calc-result-grid" id="tcpResult"></div>`;
  if(t==='cable')c.innerHTML=`
    <div class="highlight-box">ระยะทางสูงสุดของ Cable แต่ละประเภทก่อน Signal ลดลงจนใช้ไม่ได้</div>
    <table class="proto-table"><tr><th>Cable Type</th><th>Max Distance</th><th>Speed</th><th>Notes</th></tr>
    <tr><td>Cat5e UTP</td><td style="color:var(--accent5);">100 m</td><td>1 Gbps</td><td>Office LAN ทั่วไป</td></tr>
    <tr><td>Cat6 UTP</td><td style="color:var(--accent5);">100 m</td><td>10 Gbps</td><td>10GbE ต้องไม่เกิน 55m</td></tr>
    <tr><td>Cat6A UTP</td><td style="color:var(--accent5);">100 m</td><td>10 Gbps</td><td>Full 10GbE ถึง 100m</td></tr>
    <tr><td>Single-mode Fiber</td><td style="color:var(--accent2);">40–80 km</td><td>100+ Gbps</td><td>WAN/Campus Backbone</td></tr>
    <tr><td>Multi-mode OM3</td><td style="color:var(--accent);">300 m</td><td>10 Gbps</td><td>Data Center</td></tr>
    <tr><td>Multi-mode OM4</td><td style="color:var(--accent);">400 m</td><td>10 Gbps</td><td>Data Center</td></tr>
    <tr><td>DAC (Direct Attach)</td><td style="color:var(--accent3);">1–7 m</td><td>10–100 Gbps</td><td>ToR Switch สั้นมาก</td></tr>
    </table>`;
  if(t==='bdp')calcBDP();
  if(t==='qos')calcQoS();
  if(t==='tcp')calcTCP();
}
function calcBDP(){
  const bw=parseFloat(document.getElementById('bdpBw')?.value)||100;
  const rtt=parseFloat(document.getElementById('bdpRtt')?.value)||50;
  const bdp=bw*1e6/8*(rtt/1000);
  const c=document.getElementById('bdpResult');
  if(c)c.innerHTML=[
    {l:'BDP (Bytes)',v:Math.round(bdp).toLocaleString(),c:'var(--accent)'},
    {l:'BDP (KB)',v:(bdp/1024).toFixed(1),c:'var(--accent2)'},
    {l:'TCP Window ต้องอย่างน้อย',v:Math.round(bdp/1024)+' KB',c:'var(--accent5)'},
    {l:'Max Throughput (ถ้า Window=64KB)',v:((64*1024*8)/(rtt/1000)/1e6).toFixed(1)+' Mbps',c:'var(--accent3)'},
  ].map(x=>`<div class="result-box"><div class="result-label">${x.l}</div><div class="result-value" style="color:${x.c};font-size:16px;">${x.v}</div></div>`).join('');
}
function calcQoS(){
  const total=parseFloat(document.getElementById('qosTotal')?.value)||100;
  const calls=parseFloat(document.getElementById('qosCalls')?.value)||10;
  const vids=parseFloat(document.getElementById('qosVid')?.value)||5;
  const voice=calls*0.09;const video=vids*2;const be=total-voice-video;
  const c=document.getElementById('qosResult');
  if(c)c.innerHTML=[
    {l:'Voice (EF)',v:voice.toFixed(1)+' Mbps',pct:Math.round(voice/total*100),c:'var(--accent3)'},
    {l:'Video (AF4)',v:video.toFixed(1)+' Mbps',pct:Math.round(video/total*100),c:'var(--accent5)'},
    {l:'Best Effort',v:Math.max(0,be).toFixed(1)+' Mbps',pct:Math.max(0,Math.round(be/total*100)),c:'var(--accent2)'},
    {l:'Total Used',v:(voice+video).toFixed(1)+'/'+total+' Mbps',pct:Math.min(100,Math.round((voice+video)/total*100)),c:be<0?'var(--accent3)':'var(--accent)'},
  ].map(x=>`<div class="result-box"><div class="result-label">${x.l}</div><div class="result-value" style="color:${x.c};font-size:15px;">${x.v}</div><div style="height:4px;background:var(--border);border-radius:2px;margin-top:8px;overflow:hidden;"><div style="width:${x.pct}%;height:100%;background:${x.c};border-radius:2px;transition:width .4s;"></div></div></div>`).join('');
}
function calcTCP(){
  const win=parseFloat(document.getElementById('tcpWin')?.value)||64;
  const rtt=parseFloat(document.getElementById('tcpRtt')?.value)||100;
  const link=parseFloat(document.getElementById('tcpLink')?.value)||1000;
  const maxTcp=(win*1024*8)/(rtt/1000)/1e6;
  const eff=Math.min(maxTcp,link);
  const c=document.getElementById('tcpResult');
  if(c)c.innerHTML=[
    {l:'Max TCP Throughput',v:maxTcp.toFixed(1)+' Mbps',c:'var(--accent)'},
    {l:'Actual (limited by link)',v:eff.toFixed(1)+' Mbps',c:'var(--accent2)'},
    {l:'Efficiency',v:Math.round(eff/link*100)+'%',c:eff/link>0.8?'var(--accent2)':'var(--accent3)'},
    {l:'Window ที่ต้องการ (Full)',v:Math.ceil(link*1e6/8*(rtt/1000)/1024)+' KB',c:'var(--accent5)'},
  ].map(x=>`<div class="result-box"><div class="result-label">${x.l}</div><div class="result-value" style="color:${x.c};font-size:15px;">${x.v}</div></div>`).join('');
}
showCalc('bdp');

// ── INTERVIEW Q&A ─────────────────────────────────────────────
const INTERVIEWS={
  junior:[
    {q:'OSI Model มีกี่ Layer อะไรบ้าง?',a:'7 Layers: Physical, Data Link, Network, Transport, Session, Presentation, Application (จำง่าย: "Please Do Not Throw Sausage Pizza Away") แต่ละ Layer มี PDU ต่างกัน: Bit, Frame, Packet, Segment, Data'},
    {q:'TCP กับ UDP ต่างกันอย่างไร เมื่อไหรใช้อะไร?',a:'TCP = Connection-oriented, Reliable, Flow Control ใช้กับ HTTP, FTP, SSH ที่ต้องการ Reliability / UDP = Connectionless, Fast, No Guarantee ใช้กับ DNS, VoIP, Gaming, Streaming ที่ต้องการ Speed มากกว่า Reliability'},
    {q:'Subnet /24 /25 /26 มีกี่ Host?',a:'/24 = 254 hosts, /25 = 126 hosts, /26 = 62 hosts / สูตร: 2^(32-prefix) - 2 / ควรจำ: /24=254, /25=126, /26=62, /27=30, /28=14, /29=6, /30=2'},
    {q:'VLAN คืออะไร ทำไมต้องใช้?',a:'VLAN แบ่ง Physical Switch เป็น Virtual Switch หลายตัว แยก Broadcast Domain เพื่อ Security (IT ไม่เห็น Finance), Performance (ลด Broadcast), Management (จัดกลุ่ม User ตาม Function ไม่ใช่ตาม Physical Location)'},
    {q:'Default Gateway คืออะไร?',a:'Router/Layer 3 Switch ที่เป็น "ประตูออก" จาก Local Network เมื่อ PC ต้องการส่ง Packet ไปยัง Subnet อื่นหรือ Internet จะส่งให้ Default Gateway ก่อนเสมอ'},
    {q:'NAT คืออะไร ทำไม IPv4 ต้องการ NAT?',a:'NAT แปลง Private IP เป็น Public IP เพราะ IPv4 Address มีแค่ 4.3 พันล้าน ไม่พอสำหรับทุก Device ในโลก NAT ทำให้ Device หลายตัวใช้ Public IP ร่วมกันได้ (PAT/Overload)'},
  ],
  senior:[
    {q:'อธิบาย OSPF DR/BDR Election และเหตุผลที่มี',a:'DR (Designated Router) และ BDR ถูกเลือกใน Broadcast Network (Ethernet) เพื่อลด OSPF Traffic จาก O(N²) เป็น O(N) Router ที่ไม่ใช่ DR/BDR (DROther) จะส่ง LSA ให้ DR เท่านั้น DR จะ Flood ไปทุกคน Election: Priority สูงสุดชนะ ถ้าเท่ากันดู Router-ID สูงสุด'},
    {q:'BGP Best Path Selection — ลำดับ Attribute?',a:'Weight (สูง=ดี, Cisco เท่านั้น) → Local Preference (สูง=ดี) → Locally Originated → AS-PATH (สั้น=ดี) → Origin (IGP>EGP>?) → MED (ต่ำ=ดี) → eBGP>iBGP → IGP Metric ต่ำ จำ: "We Love Oranges As Oranges Mean Pure Refreshment"'},
    {q:'ECMP คืออะไร Router ทำงานยังไงเมื่อมี 2 Route เท่ากัน?',a:'ECMP (Equal-Cost Multi-Path) คือการมี Multiple Path ที่ Cost เท่ากัน Router จะ Load Balance ระหว่าง Path โดยใช้ Hash (Src IP, Dst IP, Port) ทำให้ได้ Bandwidth รวม แต่ต้องระวัง TCP Session อาจกระจาย Packet ผิด Path ทำให้ Out-of-Order'},
    {q:'เมื่อ Network ช้า จะ Troubleshoot ยังไงเป็นขั้นตอน?',a:'1) ตรวจ BW Utilization (show interface) 2) ดู Error/Drop (CRC, Collision, Buffer) 3) Ping ตรวจ Latency/Loss 4) Traceroute หา Bottleneck 5) NetFlow ดู Top Talkers 6) Wireshark Capture ดู Retransmission/Window Size 7) ตรวจ QoS Policy'},
    {q:'อธิบาย STP Convergence เวลาจริงและวิธีเร่ง',a:'STP 802.1D ใช้เวลา 30-50 วิ (15s Listening + 15s Learning + Hello) แก้ด้วย: RSTP (802.1w) ลดเหลือ 1-2 วิ, PortFast บน Access Port (ข้าม Listening/Learning), BPDU Guard ป้องกัน Loop, UplinkFast/BackboneFast ใน STP เก่า'},
  ],
  arch:[
    {q:'ออกแบบ Data Center Network ให้รองรับ 10,000 VM — เลือก Architecture อะไร?',a:'Spine-Leaf ด้วย VXLAN/EVPN: Leaf รองรับ Server, Spine เป็น Backbone ทุก Leaf ต่อทุก Spine (Full Mesh) Latency สม่ำเสมอ, Scale ง่าย (เพิ่ม Leaf/Spine), VXLAN ขยาย L2 Domain ข้าม Rack, EVPN (MP-BGP) เป็น Control Plane แจก MAC/IP, Border Leaf ต่อ External Network'},
    {q:'SD-WAN vs Traditional MPLS — เมื่อไหรแนะนำแต่ละอย่าง?',a:'MPLS: ต้องการ Guaranteed SLA, Latency ต่ำมาก, ไม่ต้องการ Encryption overhead, Budget ไม่ใช่ปัญหา / SD-WAN: ลดต้นทุน MPLS 30-70%, รองรับหลาย WAN (MPLS+Internet+LTE), Application-aware Routing, Zero-touch Provisioning, เหมาะ Retail, Branch Office / แนะนำ Hybrid: MPLS สำหรับ Voice/Critical + Internet สำหรับ Bulk ควบคุมด้วย SD-WAN'},
    {q:'Zero Trust Implementation — เริ่มจากไหนในองค์กรขนาดใหญ่?',a:'1) Identity First: MFA ทุก User, SSO, PAM สำหรับ Admin 2) Device Trust: MDM, EDR, Posture Check 3) Network Micro-segmentation: แบ่ง VLAN/VRF ละเอียด, East-West Firewall 4) Application Layer: ZTNA แทน VPN, Access เฉพาะ App ที่จำเป็น 5) Visibility: SIEM, User Behavior Analytics 6) วัด Risk Score ต่อเนื่อง'},
    {q:'อธิบาย BGP Route Reflector vs Confederation ใช้เมื่อไหร่?',a:'Route Reflector: แก้ iBGP Full-mesh ง่าย RR ทำหน้าที่ Reflect Route ให้ Client ไม่ต้องแก้ Config Client เหมาะ AS ขนาดกลาง-ใหญ่ / Confederation: แบ่ง AS ใหญ่เป็น Sub-AS เล็กๆ ใช้ eBGP ภายใน แต่ดู External เป็น Single AS เดียว เหมาะ AS ขนาดใหญ่มากหรือต้องการ Policy ซับซ้อน'},
  ],
  devnet:[
    {q:'อธิบาย Idempotency ใน Network Automation คืออะไรสำคัญยังไง?',a:'Idempotent = รัน Script กี่ครั้งก็ได้ผลลัพธ์เหมือนกัน ไม่ทำให้ Config ซ้ำซ้อน ตัวอย่าง: Ansible state=present/absent เป็น Idempotent แต่ send_command("vlan 10") รันซ้ำก็ OK เพราะ Cisco IOS idempotent โดยธรรมชาติ / สำคัญเพราะ CI/CD อาจรัน Playbook ซ้ำหลายครั้ง'},
    {q:'จะ Test Network Automation Code ยังไงก่อน Deploy Production?',a:'1) Unit Test: Mock Device Response ด้วย unittest.mock หรือ responses library 2) Integration Test: รันกับ GNS3/EVE-NG Lab จำลอง 3) Dry-run: Ansible --check mode หรือ NAPALM dry_run=True 4) CI Pipeline: GitHub Actions รัน pytest ทุก commit 5) Staging Environment: ทดสอบบน Device จริงใน Non-prod ก่อน'},
    {q:'REST API vs NETCONF vs gNMI — ใช้อะไรกับงานไหน?',a:'REST API: ง่าย, JSON, ดีสำหรับ Dashboard, CRUD Operations, Cisco DNA Center / NETCONF: XML/YANG, Transactional, Rollback, เหมาะ Config Management ที่ต้องการ Reliability / gNMI: Streaming Real-time, Protobuf, เร็วมาก, เหมาะ Monitoring, Telemetry, High-frequency Data'},
    {q:'อธิบาย Git Branching Strategy สำหรับ Network Config',a:'Gitflow: main (Production), develop (Integration), feature/* (ทำงาน), hotfix/* (แก้ด่วน) / Network Config: feature branch สร้าง Config ใหม่ → PR Review → Test ใน Staging → Merge to main → CI/CD Deploy → Tag Release / ทุก commit ต้องผ่าน yamllint + ansible-lint + pytest ก่อน Merge'},
  ],
};
function showInterview(t){
  ['junior','senior','arch','devnet'].forEach(k=>{const b=document.getElementById('ibtn'+k.charAt(0).toUpperCase()+k.slice(1));if(b){b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';}});
  const colors={junior:'var(--accent2)',senior:'var(--accent5)',arch:'var(--accent3)',devnet:'var(--accent4)'};
  const b=document.getElementById('ibtn'+t.charAt(0).toUpperCase()+t.slice(1));
  if(b){b.style.borderColor=colors[t];b.style.color=colors[t];}
  document.getElementById('interviewContent').innerHTML=INTERVIEWS[t].map((qa,i)=>`
    <div class="interview-qa" id="iqa${t}${i}">
      <div class="interview-q" onclick="toggleIQA('${t}${i}')">
        <span>Q${i+1}: ${qa.q}</span>
        <span style="color:var(--accent);font-size:18px;transition:transform .2s;" id="iqaIcon${t}${i}">+</span>
      </div>
      <div class="interview-a">💡 <strong>คำตอบที่ดี:</strong><br><br>${qa.a}</div>
    </div>`).join('');
}
function toggleIQA(id){
  const el=document.getElementById('iqa'+id);
  const icon=document.getElementById('iqaIcon'+id);
  el.classList.toggle('open');
  if(icon)icon.textContent=el.classList.contains('open')?'−':'+';
}
showInterview('junior');

// ── PACKET PATH SIMULATOR ────────────────────────────────────
const PKT_SCENARIOS={
  lan:{title:'🏠 LAN to LAN (Same Subnet)',
    nodes:[{icon:'💻',label:'PC-A\n192.168.1.10',color:'var(--accent)'},{icon:'🔀',label:'Switch',color:'var(--text-muted)'},{icon:'💻',label:'PC-B\n192.168.1.20',color:'var(--accent2)'}],
    logs:[
      {step:'1. ARP Request',txt:'PC-A ส่ง ARP Broadcast "Who has 192.168.1.20?" ออกทุก Port บน Switch',src:'#00d4ff',hdr:'ETH: Src=AA:BB:CC Dst=FF:FF:FF:FF:FF:FF / ARP: Who has 192.168.1.20?'},
      {step:'2. ARP Reply',txt:'PC-B ตอบ "192.168.1.20 is at DD:EE:FF" แบบ Unicast กลับ PC-A',src:'#00ff88',hdr:'ETH: Src=DD:EE:FF Dst=AA:BB:CC / ARP: 192.168.1.20 is at DD:EE:FF'},
      {step:'3. Data Frame',txt:'PC-A ส่ง Data Frame ไปยัง PC-B โดยใช้ MAC ที่ได้จาก ARP',src:'#fbbf24',hdr:'ETH: Src=AA:BB:CC Dst=DD:EE:FF / IP: 192.168.1.10→192.168.1.20 / DATA'},
    ]},
  router:{title:'🌐 Cross Router (Different Subnet)',
    nodes:[{icon:'💻',label:'PC-A\n10.1.1.10',color:'var(--accent)'},{icon:'🌐',label:'Router\n10.1.1.1\n10.2.2.1',color:'var(--accent5)'},{icon:'💻',label:'PC-B\n10.2.2.20',color:'var(--accent2)'}],
    logs:[
      {step:'1. PC-A ส่งถึง Gateway',txt:'PC-A รู้ว่า 10.2.2.20 ไม่ใช่ Subnet เดียวกัน ส่งไปยัง Default Gateway (Router)',src:'#00d4ff',hdr:'ETH: Dst=Router-MAC / IP: Src=10.1.1.10 Dst=10.2.2.20 TTL=64'},
      {step:'2. Router รับและ Route',txt:'Router รับ Frame, ดู Destination IP, ค้น Routing Table พบ 10.2.2.0/24 บน Gi0/1, TTL-1',src:'#fbbf24',hdr:'Router: Routing Table Match → Gi0/1 / TTL: 64→63'},
      {step:'3. Router ส่งออก Gi0/1',txt:'Router สร้าง Frame ใหม่ด้วย MAC ของตัวเองและ MAC ของ PC-B (ARP ถ้าไม่มี)',src:'#00ff88',hdr:'ETH: Src=Router-Gi1-MAC Dst=PCB-MAC / IP: Src=10.1.1.10 Dst=10.2.2.20 TTL=63'},
    ]},
  nat:{title:'🔄 NAT / Internet',
    nodes:[{icon:'💻',label:'PC\n192.168.1.10',color:'var(--accent)'},{icon:'🌐',label:'NAT Router\n203.0.113.1',color:'var(--accent3)'},{icon:'🖥️',label:'Web Server\n8.8.8.8',color:'var(--accent2)'}],
    logs:[
      {step:'1. PC ส่ง Request',txt:'PC ส่ง Packet ออก Source IP = Private 192.168.1.10',src:'#00d4ff',hdr:'IP: Src=192.168.1.10:52341 Dst=8.8.8.8:80'},
      {step:'2. NAT Translation',txt:'Router แปลง Source IP/Port → Public IP+Port บันทึกใน NAT Table',src:'#ff6b35',hdr:'NAT Table: 192.168.1.10:52341 ↔ 203.0.113.1:12345'},
      {step:'3. Packet ออก Internet',txt:'Packet ออกไปด้วย Public IP ปลายทางไม่รู้ว่า Client จริงคือใคร',src:'#fbbf24',hdr:'IP: Src=203.0.113.1:12345 Dst=8.8.8.8:80'},
      {step:'4. Response + De-NAT',txt:'Reply กลับมา Router ดู NAT Table แปลงกลับส่งให้ PC',src:'#00ff88',hdr:'IP: Src=8.8.8.8:80 Dst=203.0.113.1:12345 → De-NAT → 192.168.1.10:52341'},
    ]},
  vpn:{title:'🔒 VPN Tunnel',
    nodes:[{icon:'💻',label:'Client\n192.168.1.10',color:'var(--accent)'},{icon:'🔒',label:'VPN GW\n203.0.113.1',color:'var(--accent4)'},{icon:'🖥️',label:'Server\n10.0.0.100',color:'var(--accent2)'}],
    logs:[
      {step:'1. Original Packet',txt:'Client สร้าง Packet ไปยัง Internal Server',src:'#00d4ff',hdr:'IP: Src=192.168.1.10 Dst=10.0.0.100 / DATA'},
      {step:'2. IPSec Encapsulation',txt:'VPN Client เพิ่ม ESP Header เข้ารหัส Payload ด้วย AES-256',src:'#a855f7',hdr:'[ESP Hdr] + [Encrypted: IP:192.168.1.10→10.0.0.100 + DATA]'},
      {step:'3. Tunnel Header',txt:'ห่อด้วย Outer IP Header (Public IP) ส่งออก Internet',src:'#fbbf24',hdr:'IP: Src=203.0.113.x Dst=203.0.113.1 / ESP / [Encrypted Inner Packet]'},
      {step:'4. VPN GW Decrypt',txt:'VPN Gateway รับ, ถอดรหัส ESP, พบ Destination 10.0.0.100 Route ไปยัง Internal Server',src:'#00ff88',hdr:'Decrypt → IP: Src=192.168.1.10 Dst=10.0.0.100 → Route to Internal'},
    ]},
};
let pktTimer=null;
function runPktSim(t){
  if(pktTimer)clearInterval(pktTimer);
  const sc=PKT_SCENARIOS[t];
  ['lan','router','nat','vpn'].forEach(k=>{const b=document.getElementById('psbtn'+k.charAt(0).toUpperCase()+k.slice(1));if(b){b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';}});
  const btn=document.getElementById('psbtn'+t.charAt(0).toUpperCase()+t.slice(1));
  if(btn){btn.style.borderColor='var(--accent)';btn.style.color='var(--accent)';}
  const diag=document.getElementById('pktSimDiagram');
  const nodeW=80;
  diag.innerHTML=`<div style="font-family:'Space Mono',monospace;font-size:13px;color:var(--accent);margin-bottom:16px;">${sc.title}</div>
    <div style="display:flex;align-items:center;gap:0;">
    ${sc.nodes.map((n,i)=>`
      <div class="packet-node" id="pn${i}">
        <div class="packet-circle" style="color:${n.color};border-color:${n.color};">${n.icon}</div>
        <div class="packet-label">${n.label.replace(/\n/g,'<br>')}</div>
      </div>
      ${i<sc.nodes.length-1?`<div class="packet-wire" id="pw${i}"><div class="moving-pkt" id="pkt${i}">▶</div></div>`:''}
    `).join('')}
    </div>`;
  const log=document.getElementById('pktSimLog');
  log.innerHTML='';
  let step=0;
  function nextStep(){
    if(step>=sc.logs.length){clearInterval(pktTimer);return;}
    const s=sc.logs[step];
    const wire=document.getElementById('pw'+(step%sc.nodes.length===0?0:Math.min(step,sc.nodes.length-2)));
    const pkt=document.getElementById('pkt'+(step%sc.nodes.length===0?0:Math.min(step,sc.nodes.length-2)));
    if(pkt){pkt.style.opacity='1';pkt.style.left='0';pkt.style.background=s.src;setTimeout(()=>{pkt.style.left='calc(100% - 30px)';},50);setTimeout(()=>{pkt.style.opacity='0';},1300);}
    const item=document.createElement('div');
    item.style.cssText='background:var(--surface2);border:1px solid var(--border);border-left:3px solid '+s.src+';border-radius:0 4px 4px 0;padding:12px 16px;animation:fadeIn .3s ease;';
    item.innerHTML=`<div style="font-family:'Space Mono',monospace;font-size:12px;color:${s.src};margin-bottom:4px;">${s.step}</div>
      <div style="font-size:12px;color:var(--text-dim);margin-bottom:6px;">${s.txt}</div>
      <div style="background:#010d18;border:1px solid var(--border);border-radius:2px;padding:5px 10px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent5);">${s.hdr}</div>`;
    log.appendChild(item);
    step++;
  }
  nextStep();
  pktTimer=setInterval(nextStep,1800);
}
runPktSim('lan');

// ── PYTHON PROJECTS ───────────────────────────────────────────
const PYPROJECTS=[
  {title:'📊 Network Dashboard',desc:'Web Dashboard แสดง Status ของ Device ทั้งหมดแบบ Real-time ดึงข้อมูลผ่าน SNMP และ REST API',tech:['Flask','Netmiko','SNMP','Chart.js'],
   code:`from flask import Flask, jsonify
from netmiko import ConnectHandler
app = Flask(__name__)

@app.route('/api/devices')
def get_devices():
    results = []
    for host in ['192.168.1.1','192.168.1.2']:
        with ConnectHandler(device_type='cisco_ios',
            host=host,username='admin',password='secret') as conn:
            out = conn.send_command('show ip interface brief',
                use_textfsm=True)
            results.append({'host':host,'interfaces':out})
    return jsonify(results)`},
  {title:'🔄 Config Differ & Backup',desc:'เปรียบเทียบ Config ก่อน-หลัง Change พร้อม Backup อัตโนมัติและ Alert เมื่อมีการเปลี่ยนแปลง',tech:['Nornir','Git','difflib','Slack API'],
   code:`from nornir import InitNornir
from nornir_netmiko.tasks import netmiko_send_command
import difflib, datetime

nr = InitNornir(config_file='config.yaml')

def backup_and_diff(task):
    new_cfg = task.run(task=netmiko_send_command,
        command_string='show running-config').result
    date = datetime.date.today()
    fname = f"backups/{task.host.name}_{date}.txt"
    try:
        old_cfg = open(fname.replace(str(date),'yesterday')).read()
        diff = list(difflib.unified_diff(
            old_cfg.splitlines(), new_cfg.splitlines()))
        if diff:
            print(f"CHANGE DETECTED: {task.host.name}")
    except: pass
    open(fname,'w').write(new_cfg)

nr.run(task=backup_and_diff)`},
  {title:'🏷️ Auto VLAN Provisioner',desc:'รับ Request จาก API แล้ว Provision VLAN บน Switch อัตโนมัติ รองรับ Multi-vendor',tech:['FastAPI','Ansible','Jinja2','PostgreSQL'],
   code:`from fastapi import FastAPI
from pydantic import BaseModel
import ansible_runner

app = FastAPI()

class VLANRequest(BaseModel):
    vlan_id: int
    name: str
    switches: list[str]

@app.post('/api/vlan/create')
def create_vlan(req: VLANRequest):
    r = ansible_runner.run(
        playbook='create_vlan.yml',
        extravars={
            'vlan_id': req.vlan_id,
            'vlan_name': req.name,
            'target_hosts': req.switches,
        }
    )
    return {'status': r.status, 'vlan_id': req.vlan_id}`},
];
function buildPyProjects(){
  const c=document.getElementById('pyProjectList');
  if(!c)return;
  c.innerHTML=PYPROJECTS.map(p=>`
    <div class="project-card">
      <div class="project-title">${p.title}</div>
      <div style="font-size:13px;color:var(--text-dim);margin-bottom:12px;line-height:1.6;">${p.desc}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;">
        ${p.tech.map(t=>`<span style="font-family:'JetBrains Mono',monospace;font-size:10px;padding:2px 8px;border:1px solid var(--accent2);border-radius:2px;color:var(--accent2);">${t}</span>`).join('')}
      </div>
      <div class="code-block" data-lang="python">${p.code.replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/from /g,'<span class="kw">from </span>').replace(/import /g,'<span class="kw">import </span>').replace(/@app\./g,'<span class="cls">@app.</span>').replace(/def /g,'<span class="kw">def </span>').replace(/class /g,'<span class="kw">class </span>').replace(/'([^']+)'/g,"<span class='str'>'$1'</span>")}</div>
    </div>`).join('');
}
buildPyProjects();

// ── TIMELINE ──────────────────────────────────────────────────
const TIMELINE=[
  {yr:'1969',name:'ARPANET',desc:'เครือข่ายแรกของโลก เชื่อม 4 มหาวิทยาลัยในสหรัฐ',color:'var(--text-muted)'},
  {yr:'1974',name:'TCP/IP',desc:'Cerf & Kahn สร้าง TCP/IP — กลายเป็น Foundation ของ Internet',color:'var(--accent)'},
  {yr:'1983',name:'DNS',desc:'Paul Mockapetris ออกแบบ DNS แทนไฟล์ HOSTS.TXT',color:'var(--accent2)'},
  {yr:'1985',name:'FTP / SMTP',desc:'Protocol สำหรับ File Transfer และ Email มาตรฐาน',color:'var(--accent5)'},
  {yr:'1988',name:'OSPF v1',desc:'Open Shortest Path First ตัวแรก (RFC 1131)',color:'var(--accent)'},
  {yr:'1989',name:'BGP-1',desc:'Border Gateway Protocol เวอร์ชันแรก (RFC 1105)',color:'var(--accent4)'},
  {yr:'1991',name:'HTTP / WWW',desc:'Tim Berners-Lee สร้าง HTTP และ World Wide Web',color:'var(--accent3)'},
  {yr:'1994',name:'IPv4 Crisis',desc:'IANA ประกาศ IPv4 Address จะหมดในอนาคต เริ่มออกแบบ IPv6',color:'var(--accent5)'},
  {yr:'1995',name:'BGP-4',desc:'BGP-4 (RFC 1771) เพิ่ม CIDR และ AS-PATH — ยังใช้ถึงปัจจุบัน',color:'var(--accent4)'},
  {yr:'1996',name:'EIGRP ออกสู่สาธารณะ',desc:'Cisco เปิด EIGRP ต่อมาเป็น Open Standard (2013)',color:'var(--accent)'},
  {yr:'1999',name:'Wi-Fi 802.11b / MPLS',desc:'Wireless LAN มาตรฐานแรก และ MPLS (RFC 3031)',color:'var(--accent2)'},
  {yr:'2003',name:'OSPF v2 / IS-IS',desc:'OSPF RFC 2328 ที่ใช้ปัจจุบัน และ IS-IS กว้างขวางขึ้น',color:'var(--accent)'},
  {yr:'2006',name:'IPv6 RFC ครบ',desc:'IPv6 RFC สำคัญครบ แต่การ Deploy ยังช้า',color:'var(--accent2)'},
  {yr:'2011',name:'IPv4 Exhausted',desc:'IANA แจก IPv4 Block สุดท้าย — IPv6 เร่งตัว',color:'var(--accent3)'},
  {yr:'2013',name:'SD-WAN เกิด',desc:'Viptela ก่อตั้ง SD-WAN แนวคิดใหม่ ต่อมา Cisco ซื้อ',color:'var(--accent5)'},
  {yr:'2019',name:'Wi-Fi 6 / HTTP/3',desc:'802.11ax และ HTTP/3 ที่ใช้ QUIC บน UDP',color:'var(--accent2)'},
  {yr:'2024',name:'Wi-Fi 7 / QUIC',desc:'802.11be ความเร็ว 46 Gbps, gRPC/gNMI Telemetry แพร่หลาย',color:'var(--accent)'},
];
function buildTimeline(){
  const c=document.getElementById('timelineContent');
  if(!c)return;
  c.innerHTML=`<div style="position:relative;padding-left:60px;">
    ${TIMELINE.map((t,i)=>`
      <div class="timeline-item" style="margin-bottom:18px;">
        ${i<TIMELINE.length-1?`<div class="timeline-line" style="left:29px;background:${t.color};opacity:.3;"></div>`:''}
        <div style="position:absolute;left:0;top:2px;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-muted);">${t.yr}</div>
        <div class="timeline-dot" style="background:${t.color};box-shadow:0 0 8px ${t.color};position:absolute;left:24px;top:3px;"></div>
        <div style="padding-left:16px;">
          <div style="font-family:'Space Mono',monospace;font-size:13px;color:${t.color};margin-bottom:2px;">${t.name}</div>
          <div style="font-size:12px;color:var(--text-dim);">${t.desc}</div>
        </div>
      </div>`).join('')}
  </div>`;
}
buildTimeline();

// ── RFC INDEX ─────────────────────────────────────────────────
const RFC_LIST=[
  {num:'RFC 791',title:'Internet Protocol (IPv4)',year:1981,desc:'กำหนด IPv4 Address, Header Format, Fragmentation'},
  {num:'RFC 793',title:'Transmission Control Protocol',year:1981,desc:'TCP — Reliable, Connection-oriented Transport'},
  {num:'RFC 768',title:'User Datagram Protocol',year:1980,desc:'UDP — Unreliable, Connectionless, Fast'},
  {num:'RFC 826',title:'ARP — Address Resolution Protocol',year:1982,desc:'แปลง IP เป็น MAC Address ใน Local Network'},
  {num:'RFC 1122',title:'Requirements for Internet Hosts',year:1989,desc:'Clarifications สำหรับ TCP/IP Implementation'},
  {num:'RFC 1918',title:'Private IP Address Space',year:1996,desc:'กำหนด 10.x, 172.16-31.x, 192.168.x.x เป็น Private'},
  {num:'RFC 2328',title:'OSPF Version 2',year:1998,desc:'OSPF สำหรับ IPv4 — ยังใช้ถึงปัจจุบัน'},
  {num:'RFC 4271',title:'BGP-4',year:2006,desc:'Border Gateway Protocol v4 — Update จาก RFC 1771'},
  {num:'RFC 3031',title:'MPLS Architecture',year:2001,desc:'Multi-Protocol Label Switching — ISP VPN'},
  {num:'RFC 4364',title:'BGP/MPLS L3 VPNs',year:2006,desc:'MPLS L3VPN ด้วย VRF, RD, RT'},
  {num:'RFC 2460',title:'IPv6 Specification',year:1998,desc:'IPv6 Header Format และ Addressing'},
  {num:'RFC 4291',title:'IPv6 Address Architecture',year:2006,desc:'ประเภท IPv6 Address — Unicast, Multicast, Anycast'},
  {num:'RFC 7938',title:'BGP in Data Centers',year:2016,desc:'ใช้ BGP ใน DC Fabric (Spine-Leaf)'},
  {num:'RFC 7432',title:'BGP MPLS-Based EVPN',year:2015,desc:'EVPN Control Plane สำหรับ VXLAN'},
  {num:'RFC 8200',title:'IPv6 (Updated)',year:2017,desc:'Update RFC 2460 — ยกเลิก RFC 2460 แทนด้วย RFC นี้'},
  {num:'RFC 5880',title:'BFD — Bidirectional Forwarding Detection',year:2010,desc:'Fast Failure Detection ใน Milliseconds'},
  {num:'RFC 9000',title:'QUIC Transport Protocol',year:2021,desc:'UDP-based Transport สำหรับ HTTP/3'},
  {num:'RFC 2131',title:'DHCP',year:1997,desc:'Dynamic Host Configuration Protocol — DORA Process'},
  {num:'RFC 1035',title:'DNS Implementation',year:1987,desc:'Domain Name System — Query/Response, Record Types'},
  {num:'RFC 2338',title:'VRRP',year:1998,desc:'Virtual Router Redundancy Protocol — Gateway Redundancy'},
];
function searchRFC(q){
  const kw=q.toLowerCase();
  const res=RFC_LIST.filter(r=>!kw||r.num.toLowerCase().includes(kw)||r.title.toLowerCase().includes(kw)||r.desc.toLowerCase().includes(kw));
  const c=document.getElementById('rfcList');
  if(c)c.innerHTML=res.map(r=>`
    <div class="rfc-item">
      <div class="rfc-num">${r.num}</div>
      <div>
        <div class="rfc-title">${r.title} <span style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-muted);">(${r.year})</span></div>
        <div class="rfc-desc">${r.desc}</div>
      </div>
    </div>`).join('')||'<div style="color:var(--text-muted);font-size:13px;padding:12px;">ไม่พบ RFC ที่ค้นหา</div>';
}
searchRFC('');

// ── GLOSSARY ──────────────────────────────────────────────────
const GLOSSARY=[
  {t:'ACL',d:'Access Control List — รายการ Rule ควบคุม Traffic'},
  {t:'AD',d:'Administrative Distance — ค่าความน่าเชื่อถือ Route'},
  {t:'ARP',d:'Address Resolution Protocol — แปลง IP→MAC'},
  {t:'AS',d:'Autonomous System — กลุ่มเครือข่ายภายใต้นโยบายเดียว'},
  {t:'BDP',d:'Bandwidth-Delay Product — ขนาด "ท่อ" Network'},
  {t:'BFD',d:'Bidirectional Forwarding Detection — ตรวจ Failure เร็ว'},
  {t:'BGP',d:'Border Gateway Protocol — Routing ระหว่าง AS/ISP'},
  {t:'BUM',d:'Broadcast Unknown Multicast — Traffic พิเศษใน VXLAN'},
  {t:'CDP',d:'Cisco Discovery Protocol — แลกข้อมูล Device กับ Neighbor'},
  {t:'CIDR',d:'Classless Inter-Domain Routing — Subnet Notation /xx'},
  {t:'CoS',d:'Class of Service — QoS Marking ใน Layer 2 (802.1p)'},
  {t:'CPE',d:'Customer Premises Equipment — อุปกรณ์ฝั่ง Customer'},
  {t:'DMVPN',d:'Dynamic Multipoint VPN — Hub-Spoke VPN แบบ Dynamic'},
  {t:'DR',d:'Designated Router — ตัวแทน OSPF ใน Broadcast Segment'},
  {t:'DSCP',d:'Differentiated Services Code Point — QoS Marking Layer 3'},
  {t:'DUAL',d:'Diffusing Update Algorithm — EIGRP Path Calculation'},
  {t:'eBGP',d:'External BGP — BGP ระหว่าง AS ต่างกัน'},
  {t:'ECMP',d:'Equal-Cost Multi-Path — Load Balance หลาย Route เท่ากัน'},
  {t:'EIGRP',d:'Enhanced IGRP — Cisco Hybrid Routing Protocol'},
  {t:'EVPN',d:'Ethernet VPN — Control Plane สำหรับ VXLAN ใช้ BGP'},
  {t:'FD',d:'Feasible Distance — ระยะทางรวมถึง Destination ใน EIGRP'},
  {t:'FIB',d:'Forwarding Information Base — ตาราง Forward Packet จริง'},
  {t:'FRR',d:'Fast Reroute / FRRouting — Backup Path / Open-source Router'},
  {t:'GRE',d:'Generic Routing Encapsulation — Tunnel Protocol Layer 3'},
  {t:'iBGP',d:'Internal BGP — BGP ภายใน AS เดียวกัน'},
  {t:'IETF',d:'Internet Engineering Task Force — องค์กรออก Internet Standards'},
  {t:'IGP',d:'Interior Gateway Protocol — OSPF, EIGRP, IS-IS'},
  {t:'IPAM',d:'IP Address Management — จัดการ IP Address Space'},
  {t:'IPSec',d:'IP Security — Suite Protocol เข้ารหัส Network Traffic'},
  {t:'IS-IS',d:'Intermediate System to IS — Link-State Protocol นิยมใน ISP'},
  {t:'LACP',d:'Link Aggregation Control Protocol — Standard EtherChannel'},
  {t:'LSDB',d:'Link State Database — แผนที่ Network ใน OSPF'},
  {t:'MED',d:'Multi-Exit Discriminator — BGP Attribute เปรียบ AS เดียวกัน'},
  {t:'MPLS',d:'Multi-Protocol Label Switching — Forward ด้วย Label'},
  {t:'MTU',d:'Maximum Transmission Unit — ขนาด Packet สูงสุด (1500B Ethernet)'},
  {t:'NAC',d:'Network Access Control — ควบคุม Device เชื่อมต่อ Network'},
  {t:'NAT',d:'Network Address Translation — แปลง Private→Public IP'},
  {t:'NDP',d:'Neighbor Discovery Protocol — IPv6 แทน ARP'},
  {t:'NHRP',d:'Next Hop Resolution Protocol — ใช้ใน DMVPN'},
  {t:'OSPF',d:'Open Shortest Path First — Link State IGP ใช้ Dijkstra'},
  {t:'PAT',d:'Port Address Translation — NAT Overload หลาย IP ร่วม Port'},
  {t:'PVST',d:'Per-VLAN Spanning Tree — Cisco STP แยกต่อ VLAN'},
  {t:'QoS',d:'Quality of Service — จัดลำดับความสำคัญ Traffic'},
  {t:'RADIUS',d:'Remote Authentication Dial-In User Service — AAA Protocol'},
  {t:'RD',d:'Route Distinguisher — ทำ VPN Route ใน BGP ไม่ซ้ำกัน'},
  {t:'RIB',d:'Routing Information Base — ตาราง Route ทั้งหมด'},
  {t:'RR',d:'Route Reflector — แก้ iBGP Full-mesh ปัญหา'},
  {t:'RT',d:'Route Target — ควบคุม Import/Export VPN Route'},
  {t:'SASE',d:'Secure Access Service Edge — Network Security บน Cloud'},
  {t:'SLAAC',d:'Stateless Address Autoconfiguration — IPv6 Auto-config'},
  {t:'SNMP',d:'Simple Network Management Protocol — Monitor Network Device'},
  {t:'STP',d:'Spanning Tree Protocol — ป้องกัน Layer 2 Loop'},
  {t:'TACACS+',d:'Terminal Access Controller — AAA Protocol ของ Cisco'},
  {t:'TCAM',d:'Ternary Content Addressable Memory — Hardware Route Lookup'},
  {t:'TLS',d:'Transport Layer Security — Encrypt Network Traffic'},
  {t:'TTL',d:'Time To Live — ลดทุก Hop ป้องกัน Routing Loop'},
  {t:'VNI',d:'VXLAN Network Identifier — 24-bit VLAN ID ใน VXLAN'},
  {t:'VPN',d:'Virtual Private Network — Encrypted Tunnel'},
  {t:'VRF',d:'Virtual Routing & Forwarding — แยก Routing Table'},
  {t:'VTEP',d:'VXLAN Tunnel Endpoint — ทำ Encap/Decap VXLAN'},
  {t:'VXLAN',d:'Virtual Extensible LAN — ขยาย VLAN ข้าม Layer 3'},
  {t:'WLC',d:'Wireless LAN Controller — จัดการ Access Point ส่วนกลาง'},
  {t:'ZTNA',d:'Zero Trust Network Access — Access เฉพาะ App แทน VPN'},
];
function searchGlossary(q){
  const kw=q.toLowerCase();
  const res=GLOSSARY.filter(g=>!kw||g.t.toLowerCase().includes(kw)||g.d.toLowerCase().includes(kw));
  const c=document.getElementById('glossaryGrid');
  const cnt=document.getElementById('glossaryCount');
  if(c)c.innerHTML=res.map(g=>`<div class="glossary-item"><div class="glossary-term">${g.t}</div><div class="glossary-def">${g.d}</div></div>`).join('');
  if(cnt)cnt.textContent=`แสดง ${res.length} จาก ${GLOSSARY.length} คำ`;
}
searchGlossary('');
<!-- ═══════════════════════════════════════════════════════════ -->

// ---- extracted script block ----

// ── Register new tabs ────────────────────────────────────────
(function(){
  const nav=document.querySelector('.nav-tabs');
  [['ext-topology','🗺️ Topology Builder'],['ext-qos','⚖️ QoS Deep Dive'],
   ['ext-maturity','📈 Automation Maturity'],['ext-ebpf','⚡ eBPF'],
   ['ext-k8snet','☸️ K8s Network'],['ext-observability','🔭 Observability'],
   ['ext-ipsla','💓 IP SLA'],['ext-hsrp','🔄 HSRP/VRRP/GLBP'],
   ['ext-runbook','📓 Runbook'],['ext-design','🏗️ Design Principles'],
   ['ext-isis','🔀 IS-IS'],['ext-pbr','🛤️ PBR'],
   ['ext-docs','📝 Documentation'],['ext-quic','⚡ QUIC/HTTP3']]
  .forEach(([id,label])=>{
    const b=document.createElement('button');b.className='nav-tab';b.textContent=label;
    b.onclick=function(){
      document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
      document.getElementById(id).classList.add('active');b.classList.add('active');
      window.scrollTo({top:0,behavior:'smooth'});
    };nav.appendChild(b);
  });
})();

// ── TOPOLOGY BUILDER ─────────────────────────────────────────
let topoNodes=[],topoLinks=[],topoSelected=null,toLinkMode=false,toLinkFirst=null,nodeCnt={};
const TOPO_TYPES={
  router:{icon:'🌐',color:'#00d4ff',label:'Router'},
  switch:{icon:'🔀',color:'#00ff88',label:'Switch'},
  pc:    {icon:'💻',color:'#a855f7',label:'PC'},
  fw:    {icon:'🛡️',color:'#ff6b35',label:'FW'},
  cloud: {icon:'☁️',color:'#fbbf24',label:'Cloud'},
};
function topoAddNode(type){
  const t=TOPO_TYPES[type];
  if(!nodeCnt[type])nodeCnt[type]=0;
  nodeCnt[type]++;
  const id='n'+Date.now();
  const canvas=document.getElementById('topoCanvas');
  const cx=80+Math.random()*(canvas.offsetWidth-160);
  const cy=40+Math.random()*(canvas.offsetHeight-80);
  topoNodes.push({id,type,label:t.label+'-'+nodeCnt[type],x:cx,y:cy,ip:'10.0.'+Object.keys(TOPO_TYPES).indexOf(type)+'.'+nodeCnt[type]});
  renderTopoNodes();
}
function renderTopoNodes(){
  const canvas=document.getElementById('topoCanvas');
  // Remove old nodes
  canvas.querySelectorAll('.topo-node').forEach(e=>e.remove());
  // Draw links in SVG
  const svg=document.getElementById('topoSvg');
  svg.innerHTML='';
  topoLinks.forEach(lk=>{
    const a=topoNodes.find(n=>n.id===lk.a);
    const b=topoNodes.find(n=>n.id===lk.b);
    if(!a||!b)return;
    const line=document.createElementNS('http://www.w3.org/2000/svg','line');
    line.setAttribute('x1',a.x+32);line.setAttribute('y1',a.y+32);
    line.setAttribute('x2',b.x+32);line.setAttribute('y2',b.y+32);
    line.setAttribute('stroke','#1a3a5c');line.setAttribute('stroke-width','2');
    svg.appendChild(line);
  });
  // Render nodes
  topoNodes.forEach(n=>{
    const t=TOPO_TYPES[n.type];
    const el=document.createElement('div');
    el.className='topo-node'+(n.id===topoSelected?' selected':'');
    el.id='tn'+n.id;
    el.style.left=(n.x)+'px';el.style.top=(n.y)+'px';
    el.innerHTML=`<div class="topo-icon" style="color:${t.color};border-color:${t.color};">${t.icon}</div><div class="topo-lbl">${n.label}<br><span style="color:${t.color};font-size:8px;">${n.ip}</span></div>`;
    // Drag
    let ox,oy,mx,my;
    el.addEventListener('mousedown',e=>{
      if(toLinkMode){handleLinkClick(n.id);return;}
      topoSelected=n.id;renderTopoNodes();
      ox=e.clientX-n.x;oy=e.clientY-n.y;
      function mm(e){const canvas=document.getElementById('topoCanvas');const rect=canvas.getBoundingClientRect();n.x=Math.max(0,Math.min(e.clientX-ox,rect.width-64));n.y=Math.max(0,Math.min(e.clientY-oy,rect.height-80));renderTopoNodes();}
      function mu(){document.removeEventListener('mousemove',mm);document.removeEventListener('mouseup',mu);}
      document.addEventListener('mousemove',mm);document.addEventListener('mouseup',mu);
      e.preventDefault();
    });
    canvas.appendChild(el);
  });
}
function toggleLinkMode(){
  toLinkMode=!toLinkMode;toLinkFirst=null;
  const b=document.getElementById('btnLink');
  b.classList.toggle('active',toLinkMode);
  b.textContent=toLinkMode?'✅ Linking...':'🔗 Link Mode';
}
function handleLinkClick(id){
  if(!toLinkFirst){toLinkFirst=id;return;}
  if(toLinkFirst===id){toLinkFirst=null;return;}
  if(!topoLinks.find(l=>(l.a===toLinkFirst&&l.b===id)||(l.a===id&&l.b===toLinkFirst)))
    topoLinks.push({a:toLinkFirst,b:id});
  toLinkFirst=null;renderTopoNodes();
}
function topoClear(){topoNodes=[];topoLinks=[];nodeCnt={};topoSelected=null;renderTopoNodes();document.getElementById('topoConfigOut').style.display='none';}
function topoGenConfig(){
  if(!topoNodes.length){alert('เพิ่ม Node ก่อน!');return;}
  let cfg='! ═══ Generated Cisco IOS Config ═══\n!\n';
  topoNodes.forEach(n=>{
    if(n.type==='router'){
      cfg+=`! ── ${n.label} ──\nhostname ${n.label}\n!\n`;
      const links=topoLinks.filter(l=>l.a===n.id||l.b===n.id);
      links.forEach((lk,i)=>{
        const peer=topoNodes.find(nd=>nd.id===(lk.a===n.id?lk.b:lk.a));
        cfg+=`interface GigabitEthernet0/${i}\n description Link-to-${peer?peer.label:'Unknown'}\n ip address ${n.ip.split('.')[0]}.${n.ip.split('.')[1]}.${i+1}.1 255.255.255.252\n no shutdown\n!\n`;
      });
      cfg+=`router ospf 1\n router-id ${n.ip}\n`;
      links.forEach((_,i)=>{cfg+=` network ${n.ip.split('.')[0]}.${n.ip.split('.')[1]}.${i+1}.0 0.0.0.3 area 0\n`;});
      cfg+='!\n';
    } else if(n.type==='switch'){
      cfg+=`! ── ${n.label} ──\nhostname ${n.label}\n!\nspanning-tree mode rapid-pvst\n!\nvlan 10\n name Management\n!\ninterface Vlan10\n ip address ${n.ip} 255.255.255.0\n no shutdown\n!\n`;
    }
  });
  cfg+='! ═══ End of Config ═══';
  document.getElementById('topoConfigCode').textContent=cfg;
  document.getElementById('topoConfigOut').style.display='block';
}

// ── DSCP TABLE ───────────────────────────────────────────────
const DSCP=[
  {val:46,name:'EF',class:'Expedited Forwarding',color:'var(--accent3)',use:'VoIP Voice — ต้องได้ก่อนทุกอย่าง',phb:'Priority Queue (LLQ)'},
  {val:34,name:'AF41',class:'Assured Forwarding 4',color:'var(--accent5)',use:'Video Conference High',phb:'CBWFQ Queue'},
  {val:36,name:'AF42',class:'Assured Forwarding 4',color:'var(--accent5)',use:'Video Conference Med',phb:'CBWFQ Queue'},
  {val:38,name:'AF43',class:'Assured Forwarding 4',color:'var(--accent5)',use:'Video Conference Low',phb:'CBWFQ Queue'},
  {val:26,name:'AF31',class:'Assured Forwarding 3',color:'var(--accent)',use:'Critical Business Apps',phb:'CBWFQ Queue'},
  {val:28,name:'AF32',class:'Assured Forwarding 3',color:'var(--accent)',use:'Critical Apps Med',phb:'CBWFQ Queue'},
  {val:18,name:'AF21',class:'Assured Forwarding 2',color:'var(--accent2)',use:'Transactional Data',phb:'CBWFQ Queue'},
  {val:10,name:'AF11',class:'Assured Forwarding 1',color:'var(--accent4)',use:'Bulk Data Transfer',phb:'CBWFQ Queue'},
  {val:0, name:'BE/DF',class:'Best Effort / Default',color:'var(--text-muted)',use:'Internet Browsing ทั่วไป',phb:'Default Queue WFQ'},
  {val:48,name:'CS6',class:'Class Selector 6',color:'var(--accent4)',use:'Routing Protocol (OSPF/BGP)',phb:'ตาม Vendor'},
  {val:56,name:'CS7',class:'Class Selector 7',color:'var(--accent4)',use:'Network Control',phb:'ตาม Vendor'},
  {val:8, name:'CS1',class:'Class Selector 1 (Scavenger)',color:'var(--border)',use:'P2P, ต่ำสุด',phb:'Scavenger Queue'},
];
function buildDSCP(){
  const c=document.getElementById('dscpGrid');
  if(!c)return;
  c.innerHTML=DSCP.map(d=>`<div class="dscp-box" style="color:${d.color};border-color:${d.color}30;" onclick="showDSCP(${d.val})">
    <div class="dscp-val">${d.val}</div>
    <div class="dscp-name">${d.name}</div>
  </div>`).join('');
}
buildDSCP();
function showDSCP(val){
  const d=DSCP.find(x=>x.val===val);
  if(!d)return;
  const el=document.getElementById('dscpDetail');
  el.innerHTML=`<h3 style="color:${d.color};">DSCP ${d.val} — ${d.name}</h3>
    <p><strong>Class:</strong> ${d.class}</p>
    <p><strong>Use Case:</strong> ${d.use}</p>
    <p><strong>PHB Queue:</strong> ${d.phb}</p>
    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-muted);">Binary: ${d.val.toString(2).padStart(6,'0')} (6-bit DSCP field ใน IP ToS/DS byte)</p>`;
  el.classList.add('active');
}

// ── AUTOMATION MATURITY ───────────────────────────────────────
const MATURITY=[
  {n:1,title:'Manual',color:'#3a6478',bg:'rgba(58,100,120,.2)',tools:'CLI only, SSH, Putty',desc:'ทุกอย่างทำมือ ไม่มี Automation ใดๆ ผิดพลาดง่าย เปลือง Time',time:'ชั่วโมง-วัน',skills:['CLI Cisco/Juniper','SSH','Basic Scripting'],actions:['ทุก Config ทำมือ','ไม่มี Backup อัตโนมัติ','Troubleshoot เดา']},
  {n:2,title:'Script-based',color:'var(--accent5)',bg:'rgba(251,191,36,.1)',tools:'Python, Bash, Expect',desc:'เขียน Script ทำงานซ้ำๆ Backup อัตโนมัติ ยังไม่มี Idempotency',time:'นาที-ชั่วโมง',skills:['Python Netmiko','Bash Script','Cron Job'],actions:['Auto Config Backup','Simple Ping Monitor','VLAN Add Script']},
  {n:3,title:'Ansible/Tool',color:'var(--accent)',bg:'rgba(0,212,255,.08)',tools:'Ansible, Nornir, Git',desc:'Idempotent Automation Version Control เริ่มมี Pipeline พื้นฐาน',time:'นาที',skills:['Ansible Playbook','Git','YAML/Jinja2'],actions:['Multi-device Deploy','Config Validation','Auto VLAN Provision']},
  {n:4,title:'CI/CD Pipeline',color:'var(--accent2)',bg:'rgba(0,255,136,.08)',tools:'GitHub Actions, pytest, NetBox',desc:'ทุก Change ผ่าน Test อัตโนมัติก่อน Deploy Infrastructure as Code',time:'วินาที-นาที',skills:['GitOps','pytest Network','IPAM Integration'],actions:['Auto Test → Deploy','Change Request Automation','Network as Code']},
  {n:5,title:'Intent-based',color:'var(--accent3)',bg:'rgba(255,107,53,.08)',tools:'Cisco DNA, OpenConfig, AI/ML',desc:'ระบุ Intent "ต้องการอะไร" ระบบ Figure Out "ทำยังไง" เองอัตโนมัติ',time:'Milliseconds',skills:['YANG/OpenConfig','ML Anomaly Detection','Policy Engine'],actions:['Self-healing Network','Predictive Maintenance','Zero-touch Provisioning']},
];
function buildMaturity(){
  const bar=document.getElementById('maturityBar');
  if(!bar)return;
  bar.innerHTML=MATURITY.map(m=>`<div class="maturity-level" style="background:${m.bg};color:${m.color};" onclick="showMaturity(${m.n-1})">
    <div class="ml-num">${m.n}</div>
    <div class="ml-title">${m.title}</div>
    <div class="ml-tools">${m.tools.split(',')[0]}</div>
  </div>`).join('');
}
buildMaturity();
function showMaturity(i){
  const m=MATURITY[i];
  const el=document.getElementById('maturityDetail');
  el.innerHTML=`<div style="background:var(--surface2);border:1px solid ${m.color}40;border-left:3px solid ${m.color};border-radius:0 4px 4px 0;padding:20px;">
    <div style="font-family:'Space Mono',monospace;font-size:15px;color:${m.color};margin-bottom:6px;">Level ${m.n}: ${m.title}</div>
    <div style="font-size:13px;color:var(--text-dim);margin-bottom:12px;line-height:1.7;">${m.desc}</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;flex-wrap:wrap;">
      <div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-muted);margin-bottom:8px;">SKILLS ที่ต้องมี</div>
        ${m.skills.map(s=>`<div style="font-size:12px;color:var(--text-dim);display:flex;gap:6px;margin-bottom:4px;"><span style="color:${m.color};">▸</span>${s}</div>`).join('')}
      </div>
      <div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-muted);margin-bottom:8px;">ทำอะไรได้</div>
        ${m.actions.map(a=>`<div style="font-size:12px;color:var(--text-dim);display:flex;gap:6px;margin-bottom:4px;"><span style="color:${m.color};">▸</span>${a}</div>`).join('')}
      </div>
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:${m.color};margin-top:12px;">⏱ Time to Deploy Change: ${m.time}</div>
  </div>`;
}
showMaturity(0);

// ── HSRP ANIMATION ────────────────────────────────────────────
let hsrpTimer=null;
function runHSRPSim(){
  resetHSRPSim();
  const log=document.getElementById('hsrpLog');
  const r1=document.getElementById('hsrpR1');
  const r2=document.getElementById('hsrpR2');
  const r1b=document.getElementById('hsrpR1Badge');
  const r2b=document.getElementById('hsrpR2Badge');
  const steps=[
    {t:0,msg:'✅ Normal: R1 เป็น ACTIVE (Priority 110), R2 เป็น STANDBY (Priority 100)',fn:()=>{}},
    {t:2000,msg:'⚠️ R1 WAN Interface DOWN — IP SLA ตรวจจับได้, Priority ลด 20 → Priority=90',fn:()=>{r1.style.boxShadow='0 0 20px var(--accent3)';r1.style.borderColor='var(--accent3)';r1b.textContent='FAILING';r1b.style.background='var(--accent5)';r1b.style.color='var(--bg)';}},
    {t:4000,msg:'🔄 R2 Priority 100 > R1 Priority 90 → R2 Preempt และกลายเป็น ACTIVE',fn:()=>{
      r1.style.color='var(--text-muted)';r1.style.borderColor='var(--border)';r1b.textContent='STANDBY';r1b.style.background='var(--border)';r1b.style.color='var(--text-muted)';
      r2.style.color='var(--accent2)';r2.style.borderColor='var(--accent2)';r2b.textContent='ACTIVE';r2b.style.background='var(--accent2)';r2b.style.color='var(--bg)';r2.style.boxShadow='0 0 20px var(--accent2)';
    }},
    {t:6000,msg:'💻 PC ยังคง Ping ได้ — Virtual IP 192.168.1.1 ยังคงตอบสนอง (Downtime < 3 วิ)',fn:()=>{}},
    {t:8000,msg:'✅ Failover สำเร็จ — R2 รับหน้าที่ Gateway แทน R1 อัตโนมัติ',fn:()=>{}},
  ];
  steps.forEach(s=>{hsrpTimer=setTimeout(()=>{log.innerHTML+='<div>'+s.msg+'</div>';s.fn();},s.t);});
}
function resetHSRPSim(){
  if(hsrpTimer)clearTimeout(hsrpTimer);
  const r1=document.getElementById('hsrpR1');const r2=document.getElementById('hsrpR2');
  const r1b=document.getElementById('hsrpR1Badge');const r2b=document.getElementById('hsrpR2Badge');
  if(!r1)return;
  r1.style.color='var(--accent2)';r1.style.borderColor='var(--accent2)';r1.style.boxShadow='';
  r1b.textContent='ACTIVE';r1b.style.background='var(--accent2)';r1b.style.color='var(--bg)';
  r2.style.color='var(--accent3)';r2.style.borderColor='var(--border)';r2.style.boxShadow='';
  r2b.textContent='STANDBY';r2b.style.background='var(--border)';r2b.style.color='var(--text-muted)';
  document.getElementById('hsrpLog').innerHTML='';
}

// ── RUNBOOK TEMPLATES ─────────────────────────────────────────
const RUNBOOKS={
  vlan:{title:'VLAN Change',color:'var(--accent)',steps:[
    {phase:'Pre-check',color:'var(--accent5)',items:['Backup Config: copy run flash:backup-'+new Date().toISOString().slice(0,10),'show vlan brief → Screenshot','แจ้ง Stakeholder ล่วงหน้า','ตรวจ Change Window ได้รับอนุมัติ']},
    {phase:'Execute',color:'var(--accent)',items:['vlan [ID]','name [NAME]','interface Gi[X/Y]  → switchport access vlan [ID]','Trunk: switchport trunk allowed vlan add [ID]']},
    {phase:'Post-check',color:'var(--accent2)',items:['show vlan id [ID] → Verify Active','Ping Test จาก Host ใหม่','show spanning-tree vlan [ID] → No Loop','บันทึกใน Change Log']},
    {phase:'Rollback',color:'var(--accent3)',items:['no vlan [ID] → ลบ VLAN','switchport access vlan [OLD_ID] → คืน Port เดิม','copy flash:backup running-config → Restore']},
  ]},
  bgp:{title:'BGP Peer Add',color:'var(--accent4)',steps:[
    {phase:'Pre-check',color:'var(--accent5)',items:['Confirm Peer AS Number และ IP','ตรวจ ACL/Firewall Allow TCP 179','Backup Config ทุก Router','ตรวจ Maintenance Window']},
    {phase:'Execute',color:'var(--accent4)',items:['neighbor [IP] remote-as [AS]','neighbor [IP] description [NAME]','neighbor [IP] password [KEY] (ถ้าต้องการ)','address-family ipv4: neighbor [IP] activate']},
    {phase:'Post-check',color:'var(--accent2)',items:['show ip bgp summary → State เป็นตัวเลข','show ip bgp neighbors [IP] → Established','ตรวจ Routes ที่รับมา: show ip bgp','Ping ข้าม BGP Peer']},
    {phase:'Rollback',color:'var(--accent3)',items:['no neighbor [IP] remote-as [AS]','clear ip bgp [IP] → Reset ถ้า Stuck']},
  ]},
  fw:{title:'Firewall Rule',color:'var(--accent3)',steps:[
    {phase:'Pre-check',color:'var(--accent5)',items:['ขอ Approval จาก Security Team','ระบุ Src/Dst IP, Port, Protocol ชัดเจน','ตรวจว่า Rule ไม่ขัดแย้ง Policy เดิม','Backup Firewall Config']},
    {phase:'Execute',color:'var(--accent3)',items:['เพิ่ม Rule ที่ตำแหน่งที่ถูกต้อง (Top-down)','ตั้ง Comment/Description บน Rule','Log Enable บน Rule ใหม่','Test จาก Source Host ก่อน Production']},
    {phase:'Post-check',color:'var(--accent2)',items:['Test Connection จาก Source → Destination','ตรวจ Log ว่า Match Rule ใหม่','ตรวจ Rule อื่นไม่ได้รับผลกระทบ','บันทึกใน Change Management']},
    {phase:'Rollback',color:'var(--accent3)',items:['ลบ Rule ที่เพิ่งเพิ่ม','copy backup running → Restore ถ้าจำเป็น']},
  ]},
};
function buildRunbookTabs(){
  const t=document.getElementById('runbookTabs');
  if(!t)return;
  t.innerHTML=Object.entries(RUNBOOKS).map(([k,v])=>`<button class="btn" onclick="showRunbook('${k}')" id="rbt-${k}" style="">${v.title}</button>`).join('');
}
buildRunbookTabs();
function showRunbook(k){
  const rb=RUNBOOKS[k];
  Object.keys(RUNBOOKS).forEach(x=>{const b=document.getElementById('rbt-'+x);if(b){b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';}});
  const b=document.getElementById('rbt-'+k);if(b){b.style.borderColor=rb.color;b.style.color=rb.color;}
  document.getElementById('runbookContent').innerHTML=`
    <div style="font-family:'Space Mono',monospace;font-size:15px;color:${rb.color};margin-bottom:16px;">📓 ${rb.title} Runbook</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(240px,1fr));gap:12px;">
    ${rb.steps.map((s,i)=>`<div style="background:var(--surface2);border:1px solid ${s.color}30;border-left:3px solid ${s.color};border-radius:0 4px 4px 0;padding:14px;">
      <div style="font-family:'Space Mono',monospace;font-size:12px;color:${s.color};margin-bottom:10px;">${['①','②','③','④'][i]} ${s.phase}</div>
      ${s.items.map(it=>`<div style="display:flex;gap:6px;margin-bottom:6px;"><span style="color:${s.color};flex-shrink:0;">▸</span><code style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-dim);">${it}</code></div>`).join('')}
    </div>`).join('')}
    </div>`;
}
showRunbook('vlan');

// ── NETWORK DESIGN PRINCIPLES ─────────────────────────────────
const DESIGNS=[
  {title:'3-Tier Architecture',icon:'🏢',color:'var(--accent5)',desc:'Core → Distribution → Access — แบบดั้งเดิมสำหรับ Enterprise ขนาดกลาง-ใหญ่',
   pros:['Scale ได้ดี ขยายทีละ Tier','Fault Domain แยกชัดเจน','คุ้นเคยกับ Engineer ส่วนใหญ่'],
   cons:['มี Over-subscription ระหว่าง Tier','Latency ไม่สม่ำเสมอ','Cost สูง (หลาย Layer)'],
   when:'Enterprise >500 Users, Multi-building Campus'},
  {title:'Collapsed Core',icon:'🏬',color:'var(--accent)',desc:'Core + Distribution รวมกัน — เหมาะ SMB หรือ Branch ขนาดเล็ก',
   pros:['ราคาถูกกว่า','ง่ายต่อการจัดการ','Latency ต่ำกว่า 3-Tier'],
   cons:['Scale ได้จำกัด','Fault Domain ใหญ่กว่า','ไม่เหมาะกับ Large DC'],
   when:'SMB <200 Users, Branch Office, Small DC'},
  {title:'Spine-Leaf',icon:'🌿',color:'var(--accent2)',desc:'ทุก Leaf ต่อทุก Spine — Data Center Architecture สมัยใหม่ Latency สม่ำเสมอ',
   pros:['Latency สม่ำเสมอทุก Path','Scale ง่าย (เพิ่ม Leaf/Spine)','High Bandwidth E-W Traffic'],
   cons:['Wiring ซับซ้อนขึ้น','Cost สูง','ต้องใช้ VXLAN/EVPN'],
   when:'Modern Data Center, Cloud DC, HPC Cluster'},
  {title:'Fat Tree / Clos',icon:'🌳',color:'var(--accent3)',desc:'Hyperscale DC Architecture (Google, Facebook, AWS) — Bandwidth ไม่ Oversubscribed',
   pros:['Full Bisection Bandwidth','Massive Scale (100K+ ports)','Commodity Switch ราคาถูก'],
   cons:['ซับซ้อนมาก','ต้องการ Software Defined Control','ใช้กับ Hyperscaler เท่านั้น'],
   when:'Hyperscale DC >10,000 Servers'},
];
function buildDesignCards(){
  const c=document.getElementById('designCards');
  if(!c)return;
  c.innerHTML=DESIGNS.map((d,i)=>`<div class="arch-card" style="color:${d.color};border-color:${d.color}30;" onclick="showDesign(${i})">
    <div style="font-size:28px;margin-bottom:8px;">${d.icon}</div>
    <div style="font-family:'Space Mono',monospace;font-size:14px;margin-bottom:6px;">${d.title}</div>
    <div style="font-size:12px;color:var(--text-dim);line-height:1.5;">${d.desc}</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;margin-top:10px;opacity:.7;">${d.when}</div>
  </div>`).join('');
}
buildDesignCards();
function showDesign(i){
  const d=DESIGNS[i];
  document.querySelectorAll('.arch-card').forEach((c,j)=>{c.classList.toggle('selected',j===i);c.style.boxShadow=j===i?`0 0 20px ${d.color}`:'';});
  const el=document.getElementById('designDetail');
  el.innerHTML=`<h3 style="color:${d.color};">${d.icon} ${d.title}</h3>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:12px;">
      <div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent2);margin-bottom:6px;">✅ ข้อดี</div>
        ${d.pros.map(p=>`<div style="font-size:12px;color:var(--text-dim);display:flex;gap:6px;margin-bottom:4px;"><span style="color:var(--accent2);">▸</span>${p}</div>`).join('')}
      </div>
      <div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent3);margin-bottom:6px;">⚠️ ข้อจำกัด</div>
        ${d.cons.map(p=>`<div style="font-size:12px;color:var(--text-dim);display:flex;gap:6px;margin-bottom:4px;"><span style="color:var(--accent3);">▸</span>${p}</div>`).join('')}
      </div>
    </div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:12px;color:${d.color};margin-top:12px;">📌 เหมาะกับ: ${d.when}</div>`;
  el.classList.add('active');
}
<!-- ═══════════════════════════════════════════════════════════ -->

// ---- extracted script block ----

// ── Register new tabs ────────────────────────────────────────
(function(){
  const nav=document.querySelector('.nav-tabs');
  [['ext-devsecops','🔐 DevSecOps'],['ext-perftest','⚡ Perf Test'],
   ['ext-multicast','📡 Multicast'],['ext-sp','🌍 SP Network'],
   ['ext-sr','🔢 Seg Routing'],['ext-pyats','🧪 pyATS/Genie'],
   ['ext-dr','🆘 DR Networking'],['ext-aiml','🤖 AI/ML'],
   ['ext-netbox','📦 NetBox'],['ext-quiz2','🎯 Quiz 50ข้อ']]
  .forEach(([id,label])=>{
    const b=document.createElement('button');b.className='nav-tab';b.textContent=label;
    b.onclick=function(){
      document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
      document.getElementById(id).classList.add('active');b.classList.add('active');
      window.scrollTo({top:0,behavior:'smooth'});
    };nav.appendChild(b);
  });
})();

// ── KEYBOARD SHORTCUT ─────────────────────────────────────────
document.addEventListener('keydown',e=>{if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();openSearch();}if(e.key==='Escape'){closeSearch();}});
function openSearch(){document.getElementById('globalSearchWrap').classList.add('open');setTimeout(()=>document.getElementById('globalSearchBox').focus(),50);}
function closeSearch(){document.getElementById('globalSearchWrap').classList.remove('open');document.getElementById('globalSearchBox').value='';document.getElementById('globalSearchResults').innerHTML='';}

// ── GLOBAL SEARCH ─────────────────────────────────────────────
const SEARCH_INDEX=[
  {tab:'fundamentals',label:'OSI Model',keywords:['osi','layer','physical','data link','network','transport','session','presentation','application','pdu','frame','packet','segment']},
  {tab:'fundamentals',label:'TCP/IP + 3-Way Handshake',keywords:['tcp','udp','handshake','syn','ack','connection','port','reliable']},
  {tab:'fundamentals',label:'Subnetting / CIDR',keywords:['subnet','cidr','mask','broadcast','host','network address','/24','/25','wildcard']},
  {tab:'fundamentals',label:'VLAN + 802.1Q Trunk',keywords:['vlan','trunk','access port','802.1q','tag','native vlan','switchport']},
  {tab:'fundamentals',label:'STP / RSTP',keywords:['stp','spanning tree','rstp','pvst','bpdu','root bridge','blocking','forwarding','portfast']},
  {tab:'fundamentals',label:'EtherChannel / LACP',keywords:['etherchannel','lacp','pagp','port-channel','lag','bonding','load balance']},
  {tab:'fundamentals',label:'OSPF Routing',keywords:['ospf','link state','dijkstra','lsdb','lsa','dr','bdr','area','hello','dead','cost','neighbor']},
  {tab:'fundamentals',label:'BGP Routing',keywords:['bgp','as path','local preference','med','community','ebgp','ibgp','route reflector','weight','best path']},
  {tab:'fundamentals',label:'EIGRP',keywords:['eigrp','dual','feasible distance','successor','reported distance','hello','hold']},
  {tab:'fundamentals',label:'NAT / PAT',keywords:['nat','pat','overload','private ip','public ip','translation','masquerade','inside','outside']},
  {tab:'fundamentals',label:'ACL',keywords:['acl','access list','permit','deny','standard','extended','wildcard','implicit deny']},
  {tab:'fundamentals',label:'DHCP / DNS / QoS',keywords:['dhcp','dora','discover','offer','request','ack','dns','a record','mx','cname','qos','dscp','ef','af']},
  {tab:'ext-ipv6',label:'IPv6',keywords:['ipv6','ndp','slaac','dhcpv6','link-local','fe80','2001','eui-64','neighbor discovery']},
  {tab:'automation',label:'Python + Netmiko',keywords:['python','netmiko','paramiko','napalm','nornir','ssh','automation','script']},
  {tab:'automation',label:'Ansible Playbooks',keywords:['ansible','playbook','inventory','task','role','yaml','jinja2','idempotent']},
  {tab:'ext-cicd',label:'CI/CD Pipeline',keywords:['cicd','github actions','pipeline','pytest','dry run','validate','deploy','git']},
  {tab:'linux',label:'Linux CLI',keywords:['linux','bash','ssh','grep','awk','systemctl','journalctl','cron','chmod','ip route']},
  {tab:'cloud',label:'Cloud AWS/Azure/GCP',keywords:['aws','azure','gcp','vpc','security group','load balancer','eks','aks','gke','s3']},
  {tab:'security',label:'Firewall / NGFW / Zero Trust',keywords:['firewall','ngfw','ips','ids','zero trust','nac','802.1x','radius','palo alto','fortinet']},
  {tab:'sdwan',label:'SD-WAN',keywords:['sdwan','sd-wan','viptela','velocloud','underlay','overlay','application aware']},
  {tab:'sdwan',label:'VXLAN + EVPN',keywords:['vxlan','evpn','vni','vtep','bum','overlay','spine leaf','data center']},
  {tab:'monitoring',label:'Monitoring / gNMI',keywords:['snmp','netflow','syslog','gnmi','grpc','yang','openconfig','prometheus','grafana','zabbix']},
  {tab:'ext-wireshark',label:'Wireshark',keywords:['wireshark','tshark','packet capture','filter','tcp stream','display filter']},
  {tab:'ext-mikrotik',label:'MikroTik RouterOS',keywords:['mikrotik','routeros','winbox','hotspot','queue','bridge']},
  {tab:'ext-hsrp',label:'HSRP / VRRP / GLBP',keywords:['hsrp','vrrp','glbp','standby','active','virtual ip','gateway redundancy','preempt']},
  {tab:'ext-qos',label:'QoS Deep Dive',keywords:['dscp','ef','af','llq','cbwfq','shaping','policing','priority queue','class map','policy map']},
  {tab:'ext-ebpf',label:'eBPF / XDP / Cilium',keywords:['ebpf','xdp','cilium','bpf','kernel','linux network','cloudflare']},
  {tab:'ext-k8snet',label:'Kubernetes Networking',keywords:['kubernetes','k8s','cni','ingress','nodeport','clusterip','networkpolicy','calico','flannel']},
  {tab:'ext-topology',label:'Topology Builder',keywords:['topology','diagram','design','draw','generator']},
  {tab:'ext-isis',label:'IS-IS Protocol',keywords:['isis','is-is','level 1','level 2','net address','nsap','isp routing']},
  {tab:'ext-pbr',label:'Policy Based Routing',keywords:['pbr','policy routing','route-map','set next-hop','match ip address']},
  {tab:'ext-ipsla',label:'IP SLA & Object Tracking',keywords:['ip sla','track','object tracking','icmp echo','udp jitter','failover']},
  {tab:'ext-bfd',label:'BFD',keywords:['bfd','bidirectional','fast failure','detection','millisecond']},
  {tab:'ext-mplsvpn',label:'MPLS L3VPN',keywords:['mpls','vpn','vrf','rd','rt','pe','ce','mp-bgp','vpnv4','label']},
  {tab:'ext-sr',label:'Segment Routing',keywords:['segment routing','sr-mpls','srv6','sid','source routing','traffic engineering','ti-lfa']},
  {tab:'ext-multicast',label:'Multicast',keywords:['multicast','pim','igmp','rendezvous','rp','spt','rpt','class d','224']},
  {tab:'ext-sp',label:'Service Provider / ISP',keywords:['isp','peering','transit','ixp','route server','mpls-te','rsvp','internet exchange']},
  {tab:'ext-devsecops',label:'NetDevSecOps',keywords:['vault','ansible vault','secret','compliance','batfish','security pipeline']},
  {tab:'ext-perftest',label:'Performance Benchmarking',keywords:['iperf3','rfc 2544','bert','throughput','benchmark','latency test']},
  {tab:'ext-pyats',label:'pyATS / Genie',keywords:['pyats','genie','cisco test','diff','before after','parse cli']},
  {tab:'ext-dr',label:'Disaster Recovery',keywords:['dr','disaster recovery','rto','rpo','active active','anycast','failover']},
  {tab:'ext-aiml',label:'AI/ML in Networking',keywords:['aiops','machine learning','anomaly detection','digital twin','thousandeyes','darktrace']},
  {tab:'ext-netbox',label:'NetBox',keywords:['netbox','ipam','dcim','pynetbox','webhook','source of truth','inventory']},
  {tab:'ext-scenarios',label:'Scenario Labs',keywords:['scenario','lab','enterprise','design','multi-homing']},
  {tab:'ext-interview',label:'Interview Q&A',keywords:['interview','question','answer','job','career','junior','senior','architect']},
  {tab:'ext-hardening',label:'Security Hardening',keywords:['hardening','ssh','snmp v3','aaa','radius','bpdu guard','banner','port security']},
  {tab:'ext-calc',label:'Network Calculators',keywords:['calculator','bdp','bandwidth delay product','qos bandwidth','tcp throughput']},
  {tab:'ext-wireless',label:'Wireless 802.11',keywords:['wifi','wireless','802.11','wpa3','ofdma','mu-mimo','wi-fi 6','channel','wlc']},
  {tab:'ext-homelab',label:'Home Lab GNS3/EVE-NG',keywords:['gns3','eve-ng','lab','frrouting','vyos','virtual router']},
  {tab:'ext-maturity',label:'Automation Maturity Model',keywords:['maturity','automation level','intent-based','manual','ansible','cicd']},
  {tab:'ext-design',label:'Network Design Principles',keywords:['3-tier','collapsed core','spine leaf','fat tree','clos','architecture']},
  {tab:'ext-rfc',label:'RFC Reference',keywords:['rfc','791','793','2328','4271','standard']},
  {tab:'ext-glossary',label:'Glossary',keywords:['glossary','acronym','term','definition','abbreviation']},
  {tab:'ext-quic',label:'QUIC / HTTP3',keywords:['quic','http3','udp transport','0-rtt','head of line','connection migration']},
  {tab:'ext-observability',label:'Observability',keywords:['observability','opentelemetry','tracing','jaeger','loki','metrics logs traces']},
];

function doGlobalSearch(q){
  const kw=q.toLowerCase().trim();
  if(!kw){document.getElementById('globalSearchResults').innerHTML='';return;}
  const hits=SEARCH_INDEX.filter(item=>item.keywords.some(k=>k.includes(kw))||item.label.toLowerCase().includes(kw));
  const c=document.getElementById('globalSearchResults');
  if(!hits.length){c.innerHTML='<div style="color:var(--text-muted);font-family:JetBrains Mono,monospace;font-size:12px;padding:16px;text-align:center;">ไม่พบผลลัพธ์</div>';return;}
  c.innerHTML=hits.slice(0,12).map(h=>{
    const matchKw=h.keywords.filter(k=>k.includes(kw)).slice(0,3);
    return `<div class="sr-item" onclick="gotoTab('${h.tab}');closeSearch()">
      <div class="sr-tab">Tab: ${h.tab.replace('ext-','')}</div>
      <div class="sr-title">${h.label.replace(new RegExp(kw,'gi'),m=>`<span class="sr-hl">${m}</span>`)}</div>
      <div class="sr-snippet">Keywords: ${matchKw.join(', ')}</div>
    </div>`;
  }).join('');
}

function gotoTab(tabId){
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
  document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
  const section=document.getElementById(tabId);
  if(section){section.classList.add('active');}
  else{
    const base=document.getElementById(tabId.replace('ext-',''));
    if(base)base.classList.add('active');
  }
  window.scrollTo({top:0,behavior:'smooth'});
}

// ── PERFORMANCE METRICS ───────────────────────────────────────
(function(){
  const c=document.getElementById('perfMetrics');
  if(!c)return;
  const metrics=[
    {label:'1 Gbps Link (Expected)',val:940,max:1000,color:'var(--accent2)'},
    {label:'10 Gbps Link (Expected)',val:9400,max:10000,color:'var(--accent)'},
    {label:'Latency LAN (Target)',val:95,max:100,color:'var(--accent5)',unit:'<1ms'},
    {label:'Packet Loss (Target)',val:99,max:100,color:'var(--accent2)',unit:'<0.1%'},
  ];
  c.innerHTML=metrics.map(m=>`
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-dim);margin-bottom:4px;">${m.label} <span style="color:${m.color}">${m.unit||m.val+' Mbps'}</span></div>
      <div class="perf-meter"><div class="perf-fill" style="width:${m.val/m.max*100}%;background:${m.color};">${Math.round(m.val/m.max*100)}%</div></div>
    </div>`).join('');
})();

// ── DR DETAIL ─────────────────────────────────────────────────
function showDR(t){
  const d={
    hot:{color:'var(--accent3)',title:'🔴 Hot Standby / Active-Active',
      points:['ทั้ง 2 DC ทำงานและรับ Traffic พร้อมกัน','BGP Anycast หรือ Global Load Balancer แจก Traffic','RTO < 1 นาที (อาจ Seamless ถ้าออกแบบดี)','Cost สูงสุด — ต้องมี Capacity เต็มทั้ง 2 Site','ใช้: Banking, E-commerce, Healthcare Critical']},
    warm:{color:'var(--accent5)',title:'🟡 Warm Standby / Active-Passive',
      points:['DR Site มี Infrastructure พร้อมแต่ไม่รับ Traffic ปกติ','BGP ถอน Route จาก DR ถ้า Primary ดี','Failover: เพิ่ม BGP Weight/Prepend ให้ DR','RTO 15-60 นาที','Cost กลาง — ใช้ Resources น้อยกว่า Hot']},
    cold:{color:'var(--text-muted)',title:'⚪ Cold Standby',
      points:['DR Site มีแค่ Hardware รอ ยังไม่ Config','ต้อง Config Network ใหม่เมื่อ Failover','RTO ชั่วโมงถึงวัน','Cost ต่ำสุด','เหมาะ: Non-critical System, Low Budget']},
  };
  const info=d[t];
  const el=document.getElementById('drDetail');
  el.innerHTML=`<h3 style="color:${info.color};">${info.title}</h3>${info.points.map(p=>`<p style="display:flex;gap:8px;margin-bottom:6px;"><span style="color:${info.color};flex-shrink:0;">▸</span>${p}</p>`).join('')}`;
  el.classList.add('active');
}

// ── EXTENDED QUIZ (50 ข้อ) ────────────────────────────────────
const Q2=[
  {q:'XDP ย่อมาจากอะไร และทำงานที่ Layer ใด?',o:['eXtended Data Processing — Layer 7','eXpress Data Path — ก่อน Network Stack (Layer ต่ำกว่า 1)','eXtra Data Packets — Layer 3','Extended DPI — Layer 4-7'],a:1,e:'XDP (eXpress Data Path) รันโปรแกรม eBPF ก่อนที่ Packet จะเข้า Linux Network Stack เร็วมาก ~100Gbps line rate'},
  {q:'Multicast Class D ใช้ IP Range ใด?',o:['192.168.0.0/16','172.16.0.0/12','224.0.0.0/4','240.0.0.0/4'],a:2,e:'Class D = 224.0.0.0 ถึง 239.255.255.255 (/4) ใช้สำหรับ Multicast Group Address'},
  {q:'QUIC ใช้ Transport Protocol ใดและ Port อะไร?',o:['TCP Port 80','TCP Port 443','UDP Port 443','SCTP Port 443'],a:2,e:'QUIC ใช้ UDP Port 443 (แทน TCP) จึงเร็วกว่า TCP+TLS — HTTP/3 ใช้ QUIC เป็น Transport'},
  {q:'Segment Routing แตกต่างจาก RSVP-TE อย่างไร?',o:['SR ช้ากว่า','SR เป็น Stateless Core ไม่ต้อง Maintain Per-flow State','SR ใช้ UDP แทน TCP','SR ทำงานที่ Layer 2 เท่านั้น'],a:1,e:'SR = Source กำหนด Path ใน Segment List, Router กลาง Forward ตาม Label โดยไม่ต้อง Maintain State ต่างจาก RSVP-TE ที่ทุก Router ต้อง Maintain RSVP State'},
  {q:'pyATS ใช้ทำอะไรในงาน Network Automation?',o:['Monitor Bandwidth เท่านั้น','Test Network State และ Compare Before/After Change','Encrypt Network Traffic','Replace Ansible ทั้งหมด'],a:1,e:'pyATS/Genie คือ Cisco Test Framework — Parse CLI Output เป็น Structured Data และ Compare State ก่อน-หลัง Change อัตโนมัติ'},
  {q:'PIM-SM ต้องการ Component ใดที่ไม่มีใน PIM-SSM?',o:['IGMP Snooping','Rendezvous Point (RP)','Multicast Group','Source Address'],a:1,e:'PIM-SM ต้องการ RP (Rendezvous Point) เป็น Meeting Point ระหว่าง Source และ Receiver แต่ PIM-SSM (Source Specific) ไม่ต้องการ RP'},
  {q:'Batfish ใช้ทำอะไรใน Network Automation?',o:['Backup Config อัตโนมัติ','วิเคราะห์ Config หา Bug/Vulnerability โดยไม่ต้อง Deploy','Monitor Bandwidth','Replace Firewall'],a:1,e:'Batfish เป็น Network Configuration Analysis Tool — ตรวจ ACL, Route, BGP Policy ใน Config โดยไม่ต้อง Deploy จริง เหมือน Static Analysis สำหรับ Network'},
  {q:'NetBox คือ Source of Truth สำหรับอะไร?',o:['Source Code Repository','IPAM + DCIM — IP Address, Device Inventory, Cable Management','Log Management','Firewall Policy'],a:1,e:'NetBox = Network Source of Truth สำหรับ IPAM (IP Address Management) และ DCIM (Data Center Infrastructure Management) — เก็บ IP, Device, Rack, Cable, Circuit'},
  {q:'DR ย่อมาจากอะไร RTO กับ RPO ต่างกันอย่างไร?',o:['Direct Routing — ทั้งคู่วัด Bandwidth','Disaster Recovery — RTO = เวลา Recovery, RPO = ข้อมูลที่ยอมสูญเสีย','Data Redundancy — RTO = ค่าใช้จ่าย, RPO = จำนวน Backup','Direct Replication — ทั้งคู่เหมือนกัน'],a:1,e:'DR = Disaster Recovery. RTO (Recovery Time Objective) = เวลาสูงสุดที่ยอมรับได้ที่ระบบ Down. RPO (Recovery Point Objective) = ข้อมูลที่ยอมสูญเสียได้ (เช่น Backup ล่าสุดเมื่อ 1 ชม.ที่แล้ว = RPO 1 ชม.)'},
  {q:'AIOps ในบริบท Networking คืออะไร?',o:['AI ที่เล่นเกม Network Simulation','การใช้ AI/ML ใน Network Operations เช่น Anomaly Detection, Predictive Maintenance','Software ที่แทน Network Engineer','Protocol ใหม่สำหรับ Cloud'],a:1,e:'AIOps = AI for IT Operations — ใช้ ML วิเคราะห์ Network Data เพื่อตรวจ Anomaly, ทำนาย Failure ก่อนเกิดจริง และ Auto-remediate ปัญหา'},
  {q:'IGMP ใช้ทำอะไรใน Multicast Network?',o:['Route Multicast ระหว่าง Router','Host แจ้ง Router ว่าต้องการรับ Multicast Group ใด','Encrypt Multicast Traffic','แทนที่ ARP ใน Multicast'],a:1,e:'IGMP (Internet Group Management Protocol) ใช้ระหว่าง Host และ Router ที่ต่อกัน Host ส่ง IGMP Membership Report เพื่อ Join Multicast Group และ Leave เมื่อต้องการออก'},
  {q:'iperf3 flag ใดใช้ทดสอบ UDP Jitter?',o:['-t (time)','-u -b 100M','-P 4','-R (reverse)'],a:1,e:'iperf3 -c [server] -u -b 100M — flag -u = UDP mode, -b = Target Bandwidth จะแสดง Jitter, Loss% และ Datagrams ที่ Lost'},
  {q:'SR-MPLS ใช้อะไรเป็น SID?',o:['IP Address','MPLS Label','MAC Address','UDP Port'],a:1,e:'SR-MPLS ใช้ MPLS Label เป็น Segment ID (SID) — Node SID มีค่า Global, Adjacency SID มีค่า Local เฉพาะ Router นั้น'},
  {q:'IXP ย่อมาจากอะไร และใช้ทำอะไร?',o:['Internet eXchange Point — ที่ ISP หลายรายมา Peer กัน','IP eXtended Protocol — Extension ของ TCP','Internal eXchange Prefix — Routing Table ภายใน','Internet eXpansion Plan — แผนขยาย Internet'],a:0,e:'IXP (Internet eXchange Point) คือ Infrastructure ที่ ISP/Network หลายรายมาเชื่อมต่อกันเพื่อ Peer ลด Traffic ที่ต้องส่งผ่าน Upstream ISP เช่น THIX ในไทย, AMS-IX ในยุโรป'},
  {q:'Ansible Vault ใช้ทำอะไร?',o:['Backup Config อัตโนมัติ','Encrypt Sensitive Data เช่น Password ใน YAML File','Monitor Network Device','Deploy Container'],a:1,e:'Ansible Vault เข้ารหัส (AES-256) ค่า Sensitive เช่น Password, API Key ใน Playbook/Variable Files — decrypt อัตโนมัติตอน Run ด้วย Vault Password'},
  {q:'OSPF Area 0 คือ Backbone Area ถ้าไม่มี Backbone Route ที่เป็น Native — ใช้อะไรแก้?',o:['เปลี่ยน Protocol เป็น IS-IS','Virtual Link เชื่อม Non-backbone Area ผ่าน Transit Area ไปถึง Area 0','เพิ่ม Static Route','ใช้ EIGRP แทน'],a:1,e:'Virtual Link ใน OSPF ทำให้ Non-backbone Area เชื่อมกับ Area 0 ผ่าน Transit Area ได้ — ใช้เมื่อ Area ไม่ได้ต่อ Area 0 โดยตรง'},
  {q:'BGP Confederation แก้ปัญหาอะไร?',o:['BGP Slow Convergence','iBGP Full-mesh ด้วยการแบ่ง AS ใหญ่เป็น Sub-AS','BGP Route Flapping','MTU Mismatch'],a:1,e:'BGP Confederation แบ่ง AS ใหญ่เป็น Sub-AS เล็กๆ ใช้ eBGP ภายใน แต่ External ยังเห็นเป็น Single AS — ลด iBGP Full-mesh เหมือน Route Reflector แต่แตกต่างด้าน Design'},
  {q:'Cilium CNI ต่างจาก Flannel อย่างไร?',o:['Cilium ทำงานที่ Layer 1, Flannel ที่ Layer 3','Cilium ใช้ eBPF แทน iptables มี L7 Policy ได้, Flannel เป็น Simple Overlay','Cilium ใช้ TCP, Flannel ใช้ UDP เท่านั้น','Cilium ฟรี, Flannel ต้องจ่าย'],a:1,e:'Cilium ใช้ eBPF แทน iptables ทำให้เร็วกว่า 3-5x และทำ L7 NetworkPolicy (HTTP Path, gRPC Method) ได้ Flannel เป็น Simple Overlay สำหรับ Dev/Test'},
  {q:'MPLS-TE Fast Reroute (FRR) ทำ Reroute ภายในกี่ Milliseconds?',o:['1000 ms','500 ms','50 ms','ขึ้นอยู่กับ BGP Convergence'],a:2,e:'MPLS-TE Fast Reroute (FRR) ทำ Local Repair ได้ภายใน 50ms เมื่อ Link หรือ Node Fail — เร็วกว่า Protocol Convergence ปกติมาก'},
  {q:'NetBox Webhook ใช้ทำอะไรใน Automation Workflow?',o:['Monitor Network Performance','ส่ง HTTP Request ไปยัง External System เมื่อ Data เปลี่ยนแปลงใน NetBox','Backup Database อัตโนมัติ','Replace SNMP Polling'],a:1,e:'NetBox Webhook ส่ง HTTP POST ไปยัง URL ที่กำหนดเมื่อ Object ถูก Create/Update/Delete — ใช้ Trigger Ansible Playbook หรือ CI/CD Pipeline อัตโนมัติ'},
  {q:'SR-MPLS Node SID กับ Adjacency SID ต่างกันอย่างไร?',o:['Node SID = Layer 2, Adjacency SID = Layer 3','Node SID = Global (ระบุ Router), Adjacency SID = Local (ระบุ Link ระหว่าง Router)','ไม่มีความต่าง','Node SID ใช้ IPv6, Adjacency SID ใช้ IPv4'],a:1,e:'Node SID มีค่า Global Unique ใน SR Domain ระบุ Router ทั้งตัว / Adjacency SID มีค่า Local เฉพาะ Router นั้น ระบุ Link ที่ต่อกับ Neighbor โดยตรง'},
  {q:'pynetbox ใช้ทำอะไร?',o:['Python Library สำหรับ Ping Devices','Python Client สำหรับ NetBox REST API','Replace Ansible','Monitor Bandwidth'],a:1,e:'pynetbox เป็น Python Library ที่ Wrap NetBox REST API ให้ใช้งานง่าย — CRUD IP Address, Devices, Prefixes ด้วย Python โดยตรง'},
  {q:'BGP Anycast ใช้ทำอะไรใน Disaster Recovery?',o:['Encrypt BGP Sessions','Advertise Prefix เดียวกันจากหลาย Location — Traffic ไปที่ใกล้ที่สุด','Replace OSPF ทั้งหมด','จัดการ VLAN Automatically'],a:1,e:'BGP Anycast = Advertise Same Prefix จากหลาย Site — BGP Route Algorithm จะส่ง Traffic ไปยัง Location ที่ Best Path ถ้า Site หนึ่ง Down ถอน BGP Route Traffic จะ Route ไป Site อื่นอัตโนมัติ'},
  {q:'eBPF สามารถรันโปรแกรมที่ Layer ใดของ Linux?',o:['User Space เท่านั้น','Kernel Space — ใน Linux Kernel โดยตรง','Hardware Layer','Application Layer เท่านั้น'],a:1,e:'eBPF รันโปรแกรมใน Linux Kernel โดยตรง ปลอดภัยผ่าน Verifier — ทำให้เร็วมากเพราะไม่ต้องผ่าน User Space/Kernel Space context switch'},
  {q:'RFC 2544 ใช้ทำอะไร?',o:['กำหนด IPv6 Standard','Benchmark Methodology สำหรับ Network Device — Throughput, Latency, Frame Loss, Back-to-back','กำหนด BGP Standard','กำหนด OSPF Area Standard'],a:1,e:'RFC 2544 กำหนด Benchmark Methodology สำหรับ Network Device Testing — วัด Throughput (Max Rate ไม่มี Loss), Latency, Frame Loss Rate, Back-to-Back Frames ใช้เปรียบ Performance ก่อน-หลัง Upgrade'},
  {q:'Service Provider ใช้ Community 65535:666 เพื่ออะไร?',o:['Mark VoIP Traffic','BGP Blackhole — ให้ Upstream Drop Traffic ไปยัง Prefix นั้น','Mark Video Traffic','Reset BGP Session'],a:1,e:'Community 65535:666 = RTBH (Remotely Triggered Black Hole) — แจ้ง Upstream ISP ให้ Drop Traffic ไปยัง Prefix ที่ถูก DDoS Attack ใช้ป้องกัน DDoS ที่ Upstream'},
];

let q2Idx=0,q2Score=0,q2Answered=false;
function initQuiz2(){
  q2Idx=0;q2Score=0;q2Answered=false;
  document.getElementById('quiz2Start').style.display='none';
  document.getElementById('quiz2Section').style.display='block';
  renderQ2();
}
function renderQ2(){
  if(q2Idx>=Q2.length){showQ2Result();return;}
  const q=Q2[q2Idx];
  q2Answered=false;
  document.getElementById('q2Progress').textContent=(q2Idx+1)+' / '+Q2.length;
  document.getElementById('q2Bar').style.width=(q2Idx/Q2.length*100)+'%';
  document.getElementById('q2Score').textContent='Score: '+q2Score;
  document.getElementById('q2Question').textContent=q.q;
  document.getElementById('q2Options').innerHTML=q.o.map((o,i)=>`<button class="quiz-option-new" onclick="selectQ2(${i})" id="q2opt${i}">${String.fromCharCode(65+i)}. ${o}</button>`).join('');
  document.getElementById('q2Explanation').style.display='none';
  document.getElementById('q2Next').style.display='none';
}
function selectQ2(i){
  if(q2Answered)return;
  q2Answered=true;
  const q=Q2[q2Idx];
  document.querySelectorAll('.quiz-option-new').forEach((o,j)=>{
    o.disabled=true;
    if(j===q.a)o.classList.add('correct');
    else if(j===i)o.classList.add('wrong');
  });
  if(i===q.a)q2Score++;
  document.getElementById('q2Explanation').innerHTML='💡 '+q.e;
  document.getElementById('q2Explanation').style.display='block';
  document.getElementById('q2Next').style.display='inline-flex';
}
function nextQ2(){q2Idx++;renderQ2();}
function showQ2Result(){
  const pct=Math.round(q2Score/Q2.length*100);
  let g='',c='';
  if(pct>=90){g='🏆 Expert Level';c='var(--accent2)';}
  else if(pct>=70){g='✅ Intermediate';c='var(--accent)';}
  else if(pct>=50){g='📚 ควรทบทวน';c='var(--accent5)';}
  else{g='🔄 เรียนใหม่';c='var(--accent3)';}
  document.getElementById('quiz2Section').innerHTML=`<div style="text-align:center;padding:40px;">
    <div style="font-size:56px;margin-bottom:16px;">🎯</div>
    <div style="font-family:'Space Mono',monospace;font-size:28px;color:${c};margin-bottom:6px;">${pct}%</div>
    <div style="font-family:'Space Mono',monospace;font-size:15px;color:${c};margin-bottom:12px;">${g}</div>
    <div style="color:var(--text-dim);font-size:14px;margin-bottom:24px;">ตอบถูก ${q2Score} / ${Q2.length} ข้อ</div>
    <button class="btn btn-green" onclick="q2Idx=0;q2Score=0;document.getElementById('quiz2Section').style.display='none';document.getElementById('quiz2Start').style.display='block';">⟳ ทำใหม่</button>
  </div>`;
}

// ---- extracted script block ----

// ── Register new tabs ─────────────────────────────────────────
(function(){
  const nav=document.querySelector('.nav-tabs');
  [['ext-ot','🏭 OT/IoT'],['ext-cost','💰 Cost Opt'],
   ['ext-compliance','📋 Compliance'],['ext-5g','📶 Private 5G'],
   ['ext-capacity','📈 Capacity'],['ext-netconf','📡 NETCONF/YANG']]
  .forEach(([id,label])=>{
    const b=document.createElement('button');b.className='nav-tab';b.textContent=label;
    b.onclick=function(){
      document.querySelectorAll('.section').forEach(s=>s.classList.remove('active'));
      document.querySelectorAll('.nav-tab').forEach(t=>t.classList.remove('active'));
      document.getElementById(id).classList.add('active');b.classList.add('active');
      window.scrollTo({top:0,behavior:'smooth'});
    };nav.appendChild(b);
  });
})();

// ── PURDUE MODEL ──────────────────────────────────────────────
const PURDUE=[
  {n:4,label:'Level 4 — Business Logistics',color:'var(--accent)',bg:'rgba(0,212,255,.08)',
   desc:'IT Network — ERP, MES, Email, Internet Access',
   items:['ERP Systems (SAP, Oracle)','Email & Collaboration','Historian Servers','Corporate IT Network']},
  {n:3,label:'Level 3 — Manufacturing Operations',color:'var(--accent2)',bg:'rgba(0,255,136,.08)',
   desc:'Manufacturing Execution System, Data Collection, Historian',
   items:['MES (Manufacturing Execution)','Data Historian (OSIsoft PI)','Remote Monitoring','Batch Management']},
  {n:2,label:'Level 2 — Supervisory Control',color:'var(--accent5)',bg:'rgba(251,191,36,.08)',
   desc:'SCADA, DCS, HMI — ควบคุม Process จาก Engineering Workstation',
   items:['SCADA Systems','DCS (Distributed Control System)','HMI Workstations','Engineering Stations']},
  {n:1,label:'Level 1 — Basic Control',color:'var(--accent3)',bg:'rgba(255,107,53,.08)',
   desc:'PLC, RTU, Controllers ที่ควบคุม Field Device โดยตรง',
   items:['PLCs (Programmable Logic Controllers)','RTUs (Remote Terminal Units)','Drive Systems','Safety Systems (SIS)']},
  {n:0,label:'Level 0 — Physical Process',color:'var(--accent4)',bg:'rgba(168,85,247,.08)',
   desc:'Sensors, Actuators, Valves, Motors — Physical World',
   items:['Sensors (Temp, Pressure, Flow)','Actuators & Valves','Motors & Pumps','Physical Process Equipment']},
];
function buildPurdue(){
  const c=document.getElementById('purdueChart');
  if(!c)return;
  c.innerHTML=PURDUE.map(p=>`
    <div class="purdue-level" style="color:${p.color};background:${p.bg};border:1px solid ${p.color}30;" onclick="showPurdue(${p.n})">
      <div style="width:30px;height:30px;border-radius:50%;background:${p.color};color:var(--bg);display:flex;align-items:center;justify-content:center;font-family:'Space Mono',monospace;font-size:13px;font-weight:700;flex-shrink:0;">${p.n}</div>
      <div style="flex:1;"><div style="font-family:'Space Mono',monospace;font-size:13px;">${p.label}</div><div style="font-size:11px;color:var(--text-muted);margin-top:2px;">${p.desc}</div></div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;opacity:.6;">▶</div>
    </div>`).join('');
}
buildPurdue();
function showPurdue(n){
  const p=PURDUE.find(x=>x.n===n);
  const el=document.getElementById('purdueDetail');
  el.innerHTML=`<h3 style="color:${p.color};">${p.label}</h3><p>${p.desc}</p>
    <div class="tag-list" style="margin-top:10px;">${p.items.map(i=>`<span class="tag" style="color:${p.color};">${i}</span>`).join('')}</div>`;
  el.classList.add('active');
}

// ── COST CALCULATOR ───────────────────────────────────────────
function calcCost(){
  const sites=parseInt(document.getElementById('costSites')?.value)||10;
  const mpls=parseInt(document.getElementById('costMpls')?.value)||25000;
  const inet=parseInt(document.getElementById('costInet')?.value)||3000;
  const sdwan=parseInt(document.getElementById('costSdwan')?.value)||2000;
  const equip=parseInt(document.getElementById('costEquip')?.value)||30000;

  const mplsMonthly=sites*mpls;
  const sdwanMonthly=sites*(inet+sdwan);
  const sdwanCapex=sites*equip;
  const sdwanYear1=sdwanMonthly*12+sdwanCapex;
  const mplsYear1=mplsMonthly*12;
  const saving=mplsYear1-sdwanYear1;
  const payback=saving>0?Math.ceil(sdwanCapex/(mplsMonthly-sdwanMonthly)):null;

  const c=document.getElementById('costResults');
  const fmt=n=>n.toLocaleString('th-TH');
  c.innerHTML=`
    <div style="display:flex;flex-direction:column;gap:10px;">
      <div class="result-box"><div class="result-label">MPLS ต่อเดือน</div><div class="result-value" style="color:var(--accent3);font-size:16px;">฿${fmt(mplsMonthly)}</div></div>
      <div class="result-box"><div class="result-label">SD-WAN ต่อเดือน</div><div class="result-value" style="color:var(--accent2);font-size:16px;">฿${fmt(sdwanMonthly)}</div></div>
      <div class="result-box"><div class="result-label">ประหยัดต่อปี (Year 2+)</div><div class="result-value" style="color:${saving>0?'var(--accent2)':'var(--accent3)'};font-size:16px;">฿${fmt((mplsMonthly-sdwanMonthly)*12)}</div></div>
      ${payback?`<div class="result-box"><div class="result-label">Payback Period</div><div class="result-value" style="color:var(--accent5);font-size:16px;">${payback} เดือน</div></div>`:''}
    </div>
    <div class="highlight-box green" style="margin-top:12px;font-size:12px;">
      💡 ${saving>0?`ประหยัดได้ ฿${fmt(Math.round((mplsMonthly-sdwanMonthly)*12))} ต่อปี (Year 2 เป็นต้นไป) หรือ ฿${fmt(Math.round((mplsMonthly-sdwanMonthly)*36-sdwanCapex))} ใน 3 ปี`:'SD-WAN ไม่คุ้มในกรณีนี้ ลอง Reduce License Cost'}
    </div>`;
}
calcCost();

// Cloud Egress
(function(){
  const c=document.getElementById('egressGrid');
  if(!c)return;
  const providers=[
    {name:'AWS',price:0.09,color:'var(--accent5)',note:'First 10TB/month'},
    {name:'Azure',price:0.087,color:'var(--accent)',note:'First 50GB free'},
    {name:'GCP',price:0.08,color:'var(--accent3)',note:'First 1TB free/month'},
  ];
  c.innerHTML=providers.map(p=>`
    <div class="result-box">
      <div class="result-label">${p.name} Egress</div>
      <div class="result-value" style="color:${p.color};">$${p.price}/GB</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">${p.note}</div>
      <div style="font-size:12px;color:${p.color};margin-top:6px;">100TB/month = $${(p.price*100*1024).toLocaleString()}</div>
    </div>`).join('');
})();

// ── COMPLIANCE ────────────────────────────────────────────────
const COMP_FRAMEWORKS={
  cis:{label:'CIS Benchmark',color:'var(--accent)',items:[
    {id:'1.1',name:'SSH Version 2 เท่านั้น',sev:'critical',cmd:'ip ssh version 2'},
    {id:'1.2',name:'ปิด Telnet ทุก VTY Line',sev:'critical',cmd:'line vty 0 4 → transport input ssh'},
    {id:'1.3',name:'Enable Secret (ไม่ใช่ Password)',sev:'critical',cmd:'enable secret [strong]'},
    {id:'2.1',name:'SNMP Community ไม่ใช่ public/private',sev:'high',cmd:'no snmp-server community public'},
    {id:'2.2',name:'SNMP v3 Auth+Priv',sev:'high',cmd:'snmp-server group G v3 priv'},
    {id:'3.1',name:'NTP Configured และ Authenticated',sev:'medium',cmd:'ntp server [ip] → ntp authenticate'},
    {id:'3.2',name:'Logging ไป External Syslog',sev:'medium',cmd:'logging host [syslog-server]'},
    {id:'4.1',name:'CDP/LLDP ปิดบน External Interface',sev:'medium',cmd:'no cdp enable (on ext interface)'},
    {id:'4.2',name:'IP Source Route Disabled',sev:'medium',cmd:'no ip source-route'},
    {id:'5.1',name:'AAA Authentication กำหนดแล้ว',sev:'high',cmd:'aaa new-model'},
    {id:'5.2',name:'Banner Login มีข้อความ Warning',sev:'low',cmd:'banner login $WARNING$'},
  ]},
  pci:{label:'PCI-DSS',color:'var(--accent3)',items:[
    {id:'1.1',name:'Firewall บน Network Boundary ทุกจุด',sev:'critical',cmd:'Verify Firewall between CDE and non-CDE'},
    {id:'1.2',name:'ห้ามมี Default Credentials',sev:'critical',cmd:'Change all default passwords'},
    {id:'1.3',name:'แยก Cardholder Data Environment (CDE)',sev:'critical',cmd:'VLAN/Segment isolation for CDE'},
    {id:'2.1',name:'Encrypt Transmission ของ Card Data',sev:'critical',cmd:'TLS 1.2+ only, no SSL/TLS 1.0/1.1'},
    {id:'2.2',name:'Log ทุก Access ไปยัง Network Resource',sev:'high',cmd:'logging host [SIEM] → all interfaces'},
    {id:'2.3',name:'Test Security System ทุกปี',sev:'medium',cmd:'Annual Penetration Test required'},
    {id:'3.1',name:'Unique ID ทุก User ที่ Access Network',sev:'high',cmd:'AAA with individual accounts, no shared'},
  ]},
  nist:{label:'NIST CSF',color:'var(--accent4)',items:[
    {id:'ID.1',name:'Asset Inventory ครบถ้วน (Identify)',sev:'high',cmd:'NetBox/CMDB มี Device ทุกตัว'},
    {id:'ID.2',name:'Risk Assessment ทำแล้ว',sev:'high',cmd:'Annual Risk Assessment documented'},
    {id:'PR.1',name:'Access Control — MFA สำหรับ Admin',sev:'critical',cmd:'AAA+MFA for all privileged access'},
    {id:'PR.2',name:'Data Security — Encrypt at Rest/Transit',sev:'high',cmd:'TLS/IPSec for all sensitive data'},
    {id:'DE.1',name:'Monitoring — SIEM ใช้งานอยู่',sev:'high',cmd:'SIEM collecting all network logs'},
    {id:'RS.1',name:'Incident Response Plan มีและ Test แล้ว',sev:'medium',cmd:'IR Plan tested annually'},
    {id:'RC.1',name:'Recovery Plan และ Backup ทดสอบแล้ว',sev:'medium',cmd:'DR/BCP tested, backups verified'},
  ]},
};
let compState={},compCurrent='cis';
function buildCompFramework(){
  const c=document.getElementById('compFrameworkBtns');
  if(!c)return;
  c.innerHTML=Object.entries(COMP_FRAMEWORKS).map(([k,v])=>`<button class="btn" onclick="selectComp('${k}')" id="cfb-${k}" style="${k==='cis'?'border-color:'+v.color+';color:'+v.color+';':''}">${v.label}</button>`).join('');
}
buildCompFramework();
function selectComp(k){
  compCurrent=k;
  Object.keys(COMP_FRAMEWORKS).forEach(x=>{const b=document.getElementById('cfb-'+x);if(b){b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';}});
  const v=COMP_FRAMEWORKS[k];const b=document.getElementById('cfb-'+k);if(b){b.style.borderColor=v.color;b.style.color=v.color;}
  renderComp();
}
function renderComp(){
  const fw=COMP_FRAMEWORKS[compCurrent];
  const c=document.getElementById('compItems');if(!c)return;
  c.innerHTML=fw.items.map(it=>{
    const st=compState[compCurrent+it.id];
    const cls=st===true?'pass':st===false?'fail':'';
    const sColor={critical:'var(--accent3)',high:'var(--accent5)',medium:'var(--accent)',low:'var(--text-muted)'}[it.sev];
    return `<div class="cis-item ${cls}" onclick="toggleComp('${it.id}')">
      <div class="cis-check">${st===true?'✓':st===false?'✗':''}</div>
      <div style="flex:1;">
        <div style="font-size:13px;font-family:'Space Mono',monospace;margin-bottom:4px;">[${it.id}] ${it.name}</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--accent5);">▸ ${it.cmd}</div>
      </div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;padding:2px 7px;border-radius:2px;border:1px solid ${sColor};color:${sColor};flex-shrink:0;">${it.sev.toUpperCase()}</div>
    </div>`;
  }).join('');
  updateCompScore();
}
function toggleComp(id){
  const key=compCurrent+id;
  compState[key]=compState[key]===true?false:compState[key]===false?undefined:true;
  renderComp();
}
function markAllComp(pass){
  const fw=COMP_FRAMEWORKS[compCurrent];
  fw.items.forEach(it=>{compState[compCurrent+it.id]=pass||undefined;});
  renderComp();
}
function updateCompScore(){
  const fw=COMP_FRAMEWORKS[compCurrent];
  const passed=fw.items.filter(it=>compState[compCurrent+it.id]===true).length;
  const s=document.getElementById('compScore');const b=document.getElementById('compBar');
  if(s)s.textContent=passed+'/'+fw.items.length;
  if(b)b.style.width=Math.round(passed/fw.items.length*100)+'%';
}
selectComp('cis');

// ── CAPACITY PLANNING ─────────────────────────────────────────
function calcCapacity(){
  const cur=parseFloat(document.getElementById('capCurrent')?.value)||400;
  const link=parseFloat(document.getElementById('capLink')?.value)||1000;
  const growth=parseFloat(document.getElementById('capGrowth')?.value)||20;
  const thresh=parseFloat(document.getElementById('capThreshold')?.value)||70;
  const years=5;
  const projections=[];
  let bw=cur;
  for(let y=0;y<=years;y++){
    const pct=Math.round(bw/link*100);
    projections.push({year:y===0?'Now':'Y+'+y,mbps:Math.round(bw),pct,status:pct>=95?'critical':pct>=thresh?'warning':'ok'});
    bw*=(1+growth/100);
  }
  const upgradeYear=projections.find(p=>p.pct>=thresh);
  const r=document.getElementById('capResults');
  if(r)r.innerHTML=`
    <div class="result-box" style="margin-bottom:8px;"><div class="result-label">Current Utilization</div><div class="result-value" style="color:${projections[0].pct>=thresh?'var(--accent3)':'var(--accent2)'};">${projections[0].pct}%</div></div>
    <div class="result-box"><div class="result-label">Upgrade Needed</div><div class="result-value" style="color:var(--accent5);">${upgradeYear?upgradeYear.year:'> '+years+' Years'}</div></div>`;
  const ch=document.getElementById('capChart');
  if(ch)ch.innerHTML=projections.map(p=>{
    const color=p.pct>=95?'var(--accent3)':p.pct>=thresh?'var(--accent5)':'var(--accent2)';
    return `<div>
      <div style="display:flex;justify-content:space-between;font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--text-dim);margin-bottom:3px;"><span>${p.year}</span><span style="color:${color};">${p.mbps} Mbps (${p.pct}%)</span></div>
      <div style="height:10px;background:var(--border);border-radius:5px;overflow:hidden;"><div style="width:${Math.min(p.pct,100)}%;height:100%;background:${color};border-radius:5px;transition:width .6s;"></div></div>
    </div>`;
  }).join('');
}
calcCapacity();

// ── QUIZ +25 QUESTIONS (append to Q2) ────────────────────────
const Q2_EXTRA=[
  {q:'Purdue Model Level 0 คืออะไร?',o:['ERP และ Business Systems','SCADA และ HMI Workstations','Sensors, Actuators, Physical Process Equipment','Corporate IT Network'],a:2,e:'Level 0 = Physical Process — Sensors (วัด Temp/Pressure), Actuators, Valves, Motors ที่ Control Physical World โดยตรง'},
  {q:'OT Security ต่างจาก IT Security ตรงไหน?',o:['OT ใช้ TCP/IP, IT ใช้ Protocol อื่น','OT ให้ Availability สำคัญที่สุด (AIC), IT ให้ Confidentiality ก่อน (CIA)','OT ไม่ต้องการ Firewall','OT และ IT เหมือนกันทุกอย่าง'],a:1,e:'IT ใช้ CIA Triad (Confidentiality > Integrity > Availability) แต่ OT ใช้ AIC เพราะ Plant หยุดไม่ได้ — Availability สำคัญที่สุด แม้ Security จะต้องลดลงบ้าง'},
  {q:'NETCONF ทำงานบน Port ใด และข้อดีเหนือ CLI คืออะไร?',o:['Port 22, เหมือน SSH','Port 830, มี Transactional Commit/Rollback และ YANG Validation','Port 443, ใช้ HTTPS','Port 161, ใช้ SNMP'],a:1,e:'NETCONF ใช้ TCP 830 ข้อดีเหนือ CLI คือ Transactional (Commit/Rollback), Lock ป้องกัน Concurrent Change, YANG Model Validation ก่อน Apply'},
  {q:'Private 5G URLLC Slice เหมาะกับ Use Case ใด?',o:['Video Streaming ความละเอียดสูง','IoT Sensor ปริมาณมาก','Robot Control ที่ต้องการ Latency < 1ms','WiFi Calling'],a:2,e:'URLLC (Ultra-Reliable Low-Latency Communications) ออกแบบสำหรับ Use Case ที่ต้องการ Latency ต่ำมาก < 1ms เช่น Industrial Robot, Autonomous Vehicle, Remote Surgery'},
  {q:'Cloud Egress Cost คืออะไร?',o:['ค่าเก็บข้อมูลใน Cloud','ค่า Bandwidth ที่ข้อมูลออกจาก Cloud ไปสู่ Internet หรือ On-premise','ค่า Compute Instance','ค่า Support'],a:1,e:'Cloud Egress = ค่าใช้จ่ายเมื่อข้อมูล "ออก" จาก Cloud (Inbound ฟรี แต่ Outbound มีค่าใช้จ่าย ~$0.08-0.09/GB) สำคัญมากในการวางแผน Multi-cloud Architecture'},
  {q:'Network Slicing ใน 5G คืออะไร?',o:['แบ่ง Physical Antenna เป็นหลายส่วน','สร้าง Virtual Network หลายตัวบน Infrastructure เดียว โดยแต่ละ Slice มี QoS แยกกัน','ตัด Bandwidth ลดครึ่ง','แบ่ง SIM Card'],a:1,e:'Network Slicing สร้าง Multiple Virtual Networks บน Physical 5G Infrastructure เดียว แต่ละ Slice มี QoS, Latency, Security แยกกัน เช่น eMBB สำหรับ Video, URLLC สำหรับ Robot'},
  {q:'MEC ใน 5G ย่อมาจากอะไร และประโยชน์คืออะไร?',o:['Mobile Edge Computing — ประมวลผลที่ Edge ลด Latency','Main External Connection — เชื่อมต่อหลัก','Managed Edge Control — ควบคุม Edge Device','Multiple Edge Channels — หลาย Channel'],a:0,e:'MEC (Multi-access Edge Computing) ประมวลผล Application ที่ Edge (ใกล้ Device) แทนที่จะส่งไป Cloud ทำให้ Latency < 5ms เหมาะสำหรับ Industrial Automation, Real-time Analytics'},
  {q:'YANG Model ใน NETCONF คืออะไร?',o:['Language สำหรับ Config Router แทน CLI','Data Modeling Language ที่กำหนดโครงสร้าง Config/State Data','Protocol สำหรับ SSH','Replacement ของ SNMP MIB ทั้งหมด'],a:1,e:'YANG = Yet Another Next Generation — Data Modeling Language ที่กำหนดว่า Config/State Data มีโครงสร้างอย่างไร ทำให้ NETCONF รู้ว่า Data ที่รับมา Valid หรือไม่'},
  {q:'CIS Benchmark สำหรับ Network คืออะไร?',o:['Certificate ของ Cisco','Best Practice Security Guidelines จาก Center for Internet Security สำหรับ Harden Network Device','Network Testing Standard','Cloud Security Standard'],a:1,e:'CIS (Center for Internet Security) Benchmark คือ Guideline ที่ Community ร่วมกันพัฒนาสำหรับ Harden IT/Network Device ครอบคลุม Router, Switch, Firewall ของทุก Vendor'},
  {q:'Bandwidth Utilization 70% ในทางปฏิบัติหมายความว่าอะไร?',o:['ระบบล้มเหลวทันที','ถึงเวลาวางแผน Upgrade — Burst Traffic อาจชน 100%','ยังเหลือ Capacity มาก','ต้อง Upgrade ทันทีไม่มีเวลา'],a:1,e:'70% Utilization = ควรเริ่มวางแผน Upgrade เพราะ Peak Traffic อาจชน 100% ได้ Lead time Order อุปกรณ์ = 3-6 เดือน 85% = Upgrade เร่งด่วน'},
  {q:'Modbus TCP ใช้ Port ใด และมีปัญหา Security ใด?',o:['Port 502, ไม่มี Authentication/Encryption','Port 4840, มี Certificate Auth','Port 20000, มี Encryption','Port 102, ใช้ TLS'],a:0,e:'Modbus TCP ใช้ Port 502 และไม่มี Authentication หรือ Encryption ใดๆ — ออกแบบตั้งแต่ปี 1979 ก่อน Security จะเป็น Priority จึงต้อง Protect ด้วย OT Firewall และ Network Segmentation'},
  {q:'Industrial DMZ มีไว้เพื่ออะไร?',o:['เพิ่ม Bandwidth ระหว่าง IT และ OT','Buffer Zone ระหว่าง IT และ OT Network ป้องกัน Direct Connection','แทนที่ Firewall','ทำให้ OT Device เข้า Internet ได้'],a:1,e:'Industrial DMZ (Demilitarized Zone) เป็น Zone กลางระหว่าง IT และ OT Network ไม่มี Direct Connection — Data แลกผ่าน Historian หรือ Data Diode เพื่อป้องกัน IT Threat ข้ามไป OT'},
  {q:'ncclient ใน Python ใช้ทำอะไร?',o:['Parse CLI Output','NETCONF Client Library สำหรับ Connect และ Manage Device ด้วย NETCONF/YANG','SNMP Polling Library','SSH Tunnel Manager'],a:1,e:'ncclient เป็น Python NETCONF Client ที่ Connect TCP 830, ส่ง XML RPC (get-config, edit-config, commit, lock) และรับ Response ใช้คู่กับ xmltodict สำหรับ Parse XML'},
  {q:'IEC 62443 ใช้สำหรับอะไร?',o:['Internet Security Standard','Industrial Automation & Control System Security Standard — กำหนด Zone/Conduit Model','WiFi Security Standard','Cloud Security Framework'],a:1,e:'IEC 62443 คือ International Standard สำหรับ Industrial Automation and Control System (IACS) Security ครอบคลุม Zone & Conduit Model, Security Level, Lifecycle Requirements'},
  {q:'Capacity Planning ควรเริ่มดำเนินการเมื่อ Utilization ถึงกี่ %?',o:['50% — ปลอดภัยสุด','70% — วางแผน Upgrade','90% — รอให้ชัดก่อน','100% — เมื่อใช้เต็มแล้ว'],a:1,e:'70% Utilization = เริ่มวางแผน Upgrade เพราะ Lead Time Order อุปกรณ์ Network = 3-6 เดือน ถ้ารอถึง 90% อาจไม่ทัน Peak Season'},
];

// Append Q2_EXTRA to Q2 array (Q2 defined in part6a)
if(typeof Q2!=='undefined'){Q2.push(...Q2_EXTRA);}

// ── FLASHCARD NEW DECKS ───────────────────────────────────────
if(typeof FD!=='undefined'){
  FD.ipv6addr=[
    {q:'IPv6 Link-Local Prefix',a:'fe80::/10',hint:'Auto-config ทุก Interface ไม่ Route ข้าม Segment'},
    {q:'IPv6 Loopback',a:'::1/128',hint:'เหมือน 127.0.0.1 ใน IPv4'},
    {q:'IPv6 Unique Local',a:'fc00::/7',hint:'เหมือน Private RFC1918'},
    {q:'IPv6 Global Unicast',a:'2000::/3',hint:'Routable บน Internet'},
    {q:'IPv6 Multicast All Nodes',a:'ff02::1',hint:'Broadcast แทนสำหรับ IPv6'},
    {q:'IPv6 Multicast All Routers',a:'ff02::2',hint:'ส่ง Router Solicitation'},
    {q:'IPv6 OSPF All DR',a:'ff02::6',hint:'OSPFv3 DR/BDR'},
    {q:'IPv6 Solicited-Node Multicast',a:'ff02::1:ff00:0/104',hint:'ใช้แทน ARP Broadcast'},
    {q:'SLAAC Router Advertisement',a:'ICMPv6 Type 134',hint:'Router ส่ง Prefix ให้ Host'},
    {q:'NDP Neighbor Solicitation',a:'ICMPv6 Type 135',hint:'แทน ARP Request'},
  ];
  FD.multicast=[
    {q:'PIM-SM ต้องการ Component ใดพิเศษ?',a:'RP (Rendezvous Point)',hint:'Meeting Point ระหว่าง Source และ Receiver'},
    {q:'Multicast Class D Range',a:'224.0.0.0 – 239.255.255.255',hint:'128M Multicast Groups'},
    {q:'OSPF Multicast Address',a:'224.0.0.5 (All OSPF) / 224.0.0.6 (DR/BDR)',hint:'OSPF Hello ส่งไปที่นี่'},
    {q:'EIGRP Multicast Address',a:'224.0.0.10',hint:'EIGRP Hello/Update'},
    {q:'PIM-SSM Range',a:'232.0.0.0/8',hint:'Source Specific Multicast ไม่ต้องการ RP'},
    {q:'IGMP Version ล่าสุด',a:'IGMPv3',hint:'รองรับ Source Filtering สำหรับ SSM'},
    {q:'IGMP Snooping คืออะไร',a:'Switch เรียนรู้ Multicast Group ไม่ Flood ทุก Port',hint:'ลด Multicast Flooding บน Layer 2'},
    {q:'PIM-DM ย่อมาจาก?',a:'Protocol Independent Multicast — Dense Mode',hint:'Flood & Prune เหมาะ LAN เล็กที่ Receiver หนาแน่น'},
  ];
  FD.srnetconf=[
    {q:'Segment Routing SID ย่อมาจาก?',a:'Segment Identifier',hint:'Label หรือ IPv6 Address ที่ระบุ Segment'},
    {q:'Node SID vs Adjacency SID',a:'Node = Global (Router), Adj = Local (Link)',hint:'Node ระบุ Router ทั้งตัว, Adj ระบุ Link ระหว่าง 2 Router'},
    {q:'SRv6 ใช้อะไรเป็น SID',a:'IPv6 Address (128-bit)',hint:'ต่างจาก SR-MPLS ที่ใช้ MPLS Label'},
    {q:'TI-LFA ย่อมาจาก?',a:'Topology Independent Loop-Free Alternate',hint:'Fast Reroute สำหรับ Segment Routing'},
    {q:'NETCONF Port',a:'TCP 830',hint:'RFC 6242 — SSH Transport สำหรับ NETCONF'},
    {q:'NETCONF Candidate Datastore',a:'ที่เก็บ Config ชั่วคราวก่อน Commit',hint:'edit-config → candidate → commit → running'},
    {q:'YANG Module Type หลัก 4 อย่าง',a:'module, container, list, leaf',hint:'module=File, container=Group, list=Array, leaf=Value'},
    {q:'ncclient Python ใช้ commit() เพื่ออะไร',a:'Apply Config จาก Candidate ไป Running Datastore',hint:'ถ้าไม่ Commit Config จะไม่ถูก Apply'},
  ];

  // Add new decks to UI
  const deckBtns=['ipv6addr','multicast','srnetconf'];
  const deckLabels={'ipv6addr':'IPv6 Addresses','multicast':'Multicast','srnetconf':'SR/NETCONF'};
  deckBtns.forEach(dk=>{
    const container=document.getElementById('fdbtnCommands')?.parentElement;
    if(container){
      const b=document.createElement('button');
      b.className='btn';
      b.id='fdbtn'+dk.charAt(0).toUpperCase()+dk.slice(1);
      b.textContent=deckLabels[dk];
      b.style.borderColor='var(--text-muted)';b.style.color='var(--text-muted)';
      b.onclick=function(){setFlashDeck(dk);};
      container.appendChild(b);
    }
  });
}

// ── CLI SEARCH +50 COMMANDS ───────────────────────────────────
if(typeof CLIDB!=='undefined'){
  const extra50=[
    // IS-IS
    {v:'cisco',cmd:'show isis neighbors',desc:'ดู IS-IS Adjacency State',tags:['isis','neighbor']},
    {v:'cisco',cmd:'show isis database',desc:'ดู IS-IS Link State Database',tags:['isis','lsdb','database']},
    {v:'cisco',cmd:'show isis topology',desc:'ดู IS-IS Topology Tree',tags:['isis','topology']},
    {v:'cisco',cmd:'show clns neighbors',desc:'ดู CLNS/IS-IS Layer 2 Neighbor',tags:['isis','clns']},
    // Multicast
    {v:'cisco',cmd:'show ip mroute',desc:'ดู Multicast Routing Table (S,G) และ (*,G)',tags:['multicast','mroute']},
    {v:'cisco',cmd:'show ip pim neighbor',desc:'ดู PIM Neighbor State',tags:['multicast','pim','neighbor']},
    {v:'cisco',cmd:'show ip igmp groups',desc:'ดู IGMP Group Membership',tags:['multicast','igmp','groups']},
    {v:'cisco',cmd:'show ip igmp interface',desc:'ดู IGMP Interface Status และ Version',tags:['multicast','igmp','interface']},
    {v:'cisco',cmd:'show ip pim rp mapping',desc:'ดู RP (Rendezvous Point) Mapping',tags:['multicast','pim','rp']},
    {v:'cisco',cmd:'debug ip pim',desc:'Debug PIM Messages (ระวัง Production)',tags:['multicast','pim','debug']},
    // MPLS/TE
    {v:'cisco',cmd:'show mpls ldp neighbor',desc:'ดู MPLS LDP Neighbor',tags:['mpls','ldp','neighbor']},
    {v:'cisco',cmd:'show mpls forwarding-table',desc:'ดู MPLS LFIB (Label Forwarding)',tags:['mpls','forwarding','lfib']},
    {v:'cisco',cmd:'show mpls traffic-eng tunnels',desc:'ดู MPLS-TE Tunnel Status',tags:['mpls','te','tunnel']},
    {v:'cisco',cmd:'show ip rsvp interface',desc:'ดู RSVP Interface และ Bandwidth Reserved',tags:['mpls','rsvp','interface']},
    {v:'cisco',cmd:'show mpls traffic-eng topology',desc:'ดู TE Topology Database',tags:['mpls','te','topology']},
    // Segment Routing
    {v:'cisco',cmd:'show segment-routing mpls connected-prefix-sid-map',desc:'ดู SR Prefix SID Mapping',tags:['sr','segment routing','sid']},
    {v:'cisco',cmd:'show isis segment-routing prefix-sid-map',desc:'ดู IS-IS SR Prefix SID',tags:['sr','isis','sid']},
    {v:'cisco',cmd:'show segment-routing traffic-eng policy',desc:'ดู SR Policy Status',tags:['sr','policy','te']},
    // BFD
    {v:'cisco',cmd:'show bfd neighbors',desc:'ดู BFD Session Summary',tags:['bfd','neighbor']},
    {v:'cisco',cmd:'show bfd neighbors details',desc:'ดู BFD Session Detail + Timers',tags:['bfd','details']},
    {v:'cisco',cmd:'show bfd neighbors interface Gi0/0',desc:'ดู BFD บน Specific Interface',tags:['bfd','interface']},
    // IPv6
    {v:'cisco',cmd:'show ipv6 interface brief',desc:'ดู IPv6 Interface Status',tags:['ipv6','interface']},
    {v:'cisco',cmd:'show ipv6 route',desc:'ดู IPv6 Routing Table',tags:['ipv6','route','routing']},
    {v:'cisco',cmd:'show ipv6 ospf neighbor',desc:'ดู OSPFv3 Neighbor',tags:['ipv6','ospf','neighbor']},
    {v:'cisco',cmd:'show ipv6 neighbors',desc:'ดู IPv6 Neighbor Cache (แทน ARP)',tags:['ipv6','ndp','neighbor','arp']},
    {v:'cisco',cmd:'show ipv6 bgp summary',desc:'ดู BGP IPv6 Peer Summary',tags:['ipv6','bgp','summary']},
    // IP SLA
    {v:'cisco',cmd:'show ip sla statistics',desc:'ดู IP SLA Result ล่าสุด',tags:['ipsla','sla','statistics']},
    {v:'cisco',cmd:'show ip sla configuration',desc:'ดู IP SLA Configuration',tags:['ipsla','sla','config']},
    {v:'cisco',cmd:'show track',desc:'ดู Object Tracking Status',tags:['track','object tracking','ipsla']},
    // Compliance/Security
    {v:'cisco',cmd:'show aaa servers',desc:'ดู AAA Server Status (RADIUS/TACACS+)',tags:['aaa','radius','tacacs','security']},
    {v:'cisco',cmd:'show tacacs',desc:'ดู TACACS+ Server Status',tags:['tacacs','aaa','security']},
    {v:'cisco',cmd:'show users',desc:'ดู Users ที่ Login อยู่ตอนนี้',tags:['users','login','security']},
    {v:'cisco',cmd:'show ntp status',desc:'ดู NTP Synchronization Status',tags:['ntp','time','sync']},
    {v:'cisco',cmd:'show ip ssh',desc:'ดู SSH Version และ Config',tags:['ssh','security','hardening']},
    // JunOS additions
    {v:'junos',cmd:'show isis adjacency',desc:'ดู IS-IS Adjacency State',tags:['isis','neighbor','adjacency']},
    {v:'junos',cmd:'show isis database',desc:'ดู IS-IS LSP Database',tags:['isis','database']},
    {v:'junos',cmd:'show multicast route',desc:'ดู Multicast Routing Table',tags:['multicast','route']},
    {v:'junos',cmd:'show pim neighbors',desc:'ดู PIM Neighbor',tags:['multicast','pim','neighbor']},
    {v:'junos',cmd:'show mpls lsp',desc:'ดู MPLS LSP (Label Switched Path)',tags:['mpls','lsp']},
    {v:'junos',cmd:'show bfd session',desc:'ดู BFD Session',tags:['bfd','session']},
    {v:'junos',cmd:'show ipv6 route',desc:'ดู IPv6 Routing Table',tags:['ipv6','route']},
    {v:'junos',cmd:'show ipv6 neighbors',desc:'ดู IPv6 NDP Neighbor Cache',tags:['ipv6','ndp','neighbor']},
    {v:'junos',cmd:'show route protocol bgp',desc:'ดู BGP Routes เท่านั้น',tags:['bgp','route']},
    {v:'junos',cmd:'show security policies',desc:'ดู Firewall Security Policies (SRX)',tags:['firewall','policy','security']},
    // MikroTik additions
    {v:'mikrotik',cmd:'/routing isis neighbor print',desc:'ดู IS-IS Neighbor',tags:['isis','neighbor']},
    {v:'mikrotik',cmd:'/routing multicast pim neighbor print',desc:'ดู PIM Neighbor',tags:['multicast','pim']},
    {v:'mikrotik',cmd:'/ipv6 address print',desc:'ดู IPv6 Addresses',tags:['ipv6','address']},
    {v:'mikrotik',cmd:'/ipv6 route print',desc:'ดู IPv6 Routing Table',tags:['ipv6','route']},
    {v:'mikrotik',cmd:'/ipv6 neighbor print',desc:'ดู NDP Neighbor Cache',tags:['ipv6','ndp','neighbor']},
    {v:'mikrotik',cmd:'/tool sniffer start interface=ether1',desc:'Start Packet Capture (Wireshark Alt)',tags:['capture','sniff','wireshark']},
    {v:'mikrotik',cmd:'/user print',desc:'ดู User Accounts ทั้งหมด',tags:['users','security','hardening']},
    {v:'mikrotik',cmd:'/certificate print',desc:'ดู SSL Certificates บน Device',tags:['certificate','ssl','security']},
    {v:'mikrotik',cmd:'/ip ipsec policy print',desc:'ดู IPSec Policy',tags:['ipsec','vpn','policy']},
    {v:'mikrotik',cmd:'/mpls ldp neighbor print',desc:'ดู MPLS LDP Neighbor',tags:['mpls','ldp']},
  ];
  CLIDB.push(...extra50);
  // Re-render CLI Search if visible
  if(typeof searchCLI==='function') searchCLI('');
}

// ── PROGRESS TRACKER +20 TOPICS ──────────────────────────────
if(typeof PT!=='undefined'){
  const newTopics=[
    {id:'pt37',label:'OT/IoT Networking + Purdue Model',tag:'OT/IoT'},
    {id:'pt38',label:'Industrial Protocols (Modbus, DNP3, IEC 61850)',tag:'OT/IoT'},
    {id:'pt39',label:'Network Cost Optimization + ROI',tag:'Business'},
    {id:'pt40',label:'Compliance & Audit (CIS/NIST/PCI-DSS)',tag:'Security'},
    {id:'pt41',label:'Private 5G / LTE + Network Slicing',tag:'Wireless'},
    {id:'pt42',label:'Capacity Planning Calculator',tag:'Planning'},
    {id:'pt43',label:'NETCONF / YANG + ncclient',tag:'Automation'},
    {id:'pt44',label:'NetDevSecOps + Vault/Ansible Vault',tag:'Automation'},
    {id:'pt45',label:'Batfish Config Compliance Check',tag:'Automation'},
    {id:'pt46',label:'Performance Benchmarking (iperf3)',tag:'Tools'},
    {id:'pt47',label:'Multicast PIM-SM/SSM + IGMP',tag:'Advanced'},
    {id:'pt48',label:'Service Provider / IXP / Peering',tag:'SP'},
    {id:'pt49',label:'Segment Routing SR-MPLS / SRv6',tag:'SP/DC'},
    {id:'pt50',label:'pyATS / Genie Before-After Diff',tag:'Automation'},
    {id:'pt51',label:'Disaster Recovery RTO/RPO Design',tag:'DR'},
    {id:'pt52',label:'AI/ML in Networking + AIOps',tag:'Future'},
    {id:'pt53',label:'NetBox IPAM+DCIM + API',tag:'Tools'},
    {id:'pt54',label:'IS-IS Protocol + Config',tag:'Routing'},
    {id:'pt55',label:'Policy Based Routing (PBR)',tag:'Routing'},
    {id:'pt56',label:'QUIC / HTTP3 + Network Impact',tag:'Protocol'},
  ];
  PT.push(...newTopics);
  const TC_extra={'OT/IoT':'var(--accent3)','Business':'var(--accent5)','Planning':'var(--accent5)','SP':'var(--accent4)','SP/DC':'var(--accent4)','DR':'var(--accent3)','Future':'var(--accent2)','Wireless':'var(--accent2)'};
  // Merge into TC
  if(typeof TC!=='undefined') Object.assign(TC,TC_extra);
  if(typeof renderProg==='function') renderProg();
}

// Update Search Index with new tabs
if(typeof SEARCH_INDEX!=='undefined'){
  SEARCH_INDEX.push(
    {tab:'ext-ot',label:'OT/IoT + Purdue Model',keywords:['ot','iot','purdue','modbus','dnp3','scada','plc','rtu','iec 62443','industrial']},
    {tab:'ext-cost',label:'Cost Optimization',keywords:['cost','mpls','sdwan','roi','egress','cloud cost','budget','optimize']},
    {tab:'ext-compliance',label:'Compliance CIS/NIST/PCI',keywords:['compliance','cis','nist','pci','audit','benchmark','standard']},
    {tab:'ext-5g',label:'Private 5G/LTE',keywords:['5g','lte','private','slicing','urllc','embb','mmtc','mec','gnb']},
    {tab:'ext-capacity',label:'Capacity Planning',keywords:['capacity','planning','growth','utilization','upgrade','bandwidth projection']},
    {tab:'ext-netconf',label:'NETCONF/YANG',keywords:['netconf','yang','ncclient','edit-config','commit','candidate','datastore','830']}
  );
}
