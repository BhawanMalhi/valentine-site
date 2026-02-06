const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const counterText = document.getElementById("counterText");

const page1 = document.getElementById("page1");
const page2 = document.getElementById("page2");

const backBtn = document.getElementById("backBtn");
const sparkBtn = document.getElementById("sparkBtn");
const heartBtn = document.getElementById("heartBtn");

const reasonsBtn = document.getElementById("reasonsBtn");
const reasonsBody = document.getElementById("reasonsBody");
const chev1 = document.getElementById("chev1");

const giftBtn = document.getElementById("giftBtn");
const giftBody = document.getElementById("giftBody");
const chev2 = document.getElementById("chev2");

const confirmGiftBtn = document.getElementById("confirmGiftBtn");
const giftForm = document.getElementById("giftForm");
const giftResult = document.getElementById("giftResult");
const giftText = document.getElementById("giftText");

const heartsLayer = document.querySelector(".hearts");
const bgEl = document.querySelector(".photo-bg");
const playZone = document.getElementById("playZone");

let noCount = 0;

/* ---------- Background slideshow (couple1 -> couple14) ---------- */
const bgPhotos = Array.from({ length: 14 }, (_, i) => `couple${i + 1}.jpeg`);
let bgIndex = 0;

function setBackground(i) {
  bgEl.style.backgroundImage = `url("${bgPhotos[i]}")`;
}
setBackground(bgIndex);

setInterval(() => {
  bgIndex = (bgIndex + 1) % bgPhotos.length;
  setBackground(bgIndex);
}, 1800);

/* ---------- Hearts automation ---------- */
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  const emojis = ["💗", "💖", "💘", "💕", "💞"];
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.bottom = `-20px`;

  const duration = 6 + Math.random() * 5;
  heart.style.animationDuration = `${duration}s`;

  const size = 14 + Math.random() * 18;
  heart.style.fontSize = `${size}px`;

  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}
let heartInterval = setInterval(spawnHeart, 950);

/* ---------- Sparkles ---------- */
function popSparkles(amount = 28) {
  const card = document.getElementById("card");
  const rect = card.getBoundingClientRect();

  for (let i = 0; i < amount; i++) {
    const dot = document.createElement("div");
    dot.className = "spark";
    const x = Math.random() * (rect.width - 10);
    dot.style.left = `${x}px`;
    dot.style.top = `-8px`;

    const colors = ["#ff2f7a", "#ffd1e3", "#ffcc66", "#78ddff", "#c58bff"];
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];

    const size = 6 + Math.random() * 10;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;

    dot.style.animationDuration = `${650 + Math.random() * 850}ms`;

    card.appendChild(dot);
    setTimeout(() => dot.remove(), 1600);
  }
}

/* ---------- No button dodges forever (inside playZone) ---------- */
function updateCounter() {
  counterText.textContent = noCount ? `No attempts: ${noCount} 😅` : "";
}

function moveNoButton() {
  noCount++;
  updateCounter();

  const area = playZone.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();
  const padding = 12;

  const maxX = area.width - btn.width - padding * 2;
  const maxY = area.height - btn.height - padding * 2;

  const x = padding + Math.random() * Math.max(0, maxX);
  const y = padding + Math.random() * Math.max(0, maxY);

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  noBtn.animate(
    [
      { transform: "translate(-50%, -50%) rotate(0deg)" },
      { transform: "translate(-50%, -50%) rotate(3deg)" },
      { transform: "translate(-50%, -50%) rotate(-3deg)" },
      { transform: "translate(-50%, -50%) rotate(0deg)" }
    ],
    { duration: 160 }
  );
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", (e) => { e.preventDefault(); moveNoButton(); });
noBtn.addEventListener("touchstart", (e) => { e.preventDefault(); moveNoButton(); });

updateCounter();

/* ---------- Page switch (YES must work) ---------- */
yesBtn.addEventListener("click", () => {
  page1.classList.add("hidden");
  page2.classList.remove("hidden");
  popSparkles(50);

  clearInterval(heartInterval);
  heartInterval = setInterval(spawnHeart, 300);
  setTimeout(() => {
    clearInterval(heartInterval);
    heartInterval = setInterval(spawnHeart, 950);
  }, 4200);
});

/* ---------- Back ---------- */
backBtn.addEventListener("click", () => {
  page2.classList.add("hidden");
  page1.classList.remove("hidden");

  noBtn.style.left = "68%";
  noBtn.style.top = "58%";
  noBtn.style.transform = "translate(-50%, -50%)";
});

/* ---------- Accordions ---------- */
function toggleAccordion(btn, body, chev) {
  const open = !body.classList.contains("hidden");
  body.classList.toggle("hidden");
  btn.setAttribute("aria-expanded", String(!open));
  chev.textContent = open ? "▾" : "▴";
}
reasonsBtn.addEventListener("click", () => toggleAccordion(reasonsBtn, reasonsBody, chev1));
giftBtn.addEventListener("click", () => toggleAccordion(giftBtn, giftBody, chev2));

/* ---------- Gift selection ---------- */
confirmGiftBtn.addEventListener("click", () => {
  const chosen = giftForm.querySelector('input[name="gift"]:checked');
  giftResult.classList.remove("hidden");
  giftText.textContent = chosen ? `You chose: ${chosen.value}` : "Pick one gift option first 😄";
  popSparkles(18);
});

/* ---------- Extra buttons ---------- */
sparkBtn.addEventListener("click", () => popSparkles(28));
heartBtn.addEventListener("click", () => {
  for (let i = 0; i < 14; i++) setTimeout(spawnHeart, i * 90);
});
