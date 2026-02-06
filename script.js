const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const buttons = document.getElementById("buttons");
const counterText = document.getElementById("counterText");
const confettiBtn = document.getElementById("confettiBtn");
const heartBtn = document.getElementById("heartBtn");
const heartsLayer = document.querySelector(".hearts");

let noCount = 0;

function updateCounter() {
  counterText.textContent = noCount ? `No attempts: ${noCount} 😅` : "";
}

/* Premium sparkles */
function popSparkles(amount = 28) {
  const card = document.getElementById("card");
  const rect = card.getBoundingClientRect();

  for (let i = 0; i < amount; i++) {
    const dot = document.createElement("div");
    dot.className = "spark";
    const x = Math.random() * (rect.width - 10);
    dot.style.left = `${x}px`;
    dot.style.top = `-8px`;

    const colors = ["#ff4d8d", "#ffd1e3", "#ffcc66", "#78ddff", "#c58bff"];
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];

    const size = 6 + Math.random() * 10;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;

    dot.style.animationDuration = `${650 + Math.random() * 850}ms`;

    card.appendChild(dot);
    setTimeout(() => dot.remove(), 1600);
  }
}

/* Floating hearts automation */
function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  const emojis = ["💗", "💖", "💘", "💕", "💞"];
  heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  heart.style.left = `${Math.random() * 100}vw`;
  heart.style.bottom = `-20px`;

  const duration = 6 + Math.random() * 5; // 6-11s
  heart.style.animationDuration = `${duration}s`;

  const size = 14 + Math.random() * 18;
  heart.style.fontSize = `${size}px`;

  heartsLayer.appendChild(heart);
  setTimeout(() => heart.remove(), duration * 1000);
}

/* Start gentle heart animation in the background */
let heartInterval = setInterval(spawnHeart, 850);

/* Make "No" button dodge */
function moveNoButton() {
  noCount++;
  updateCounter();

  const containerRect = buttons.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, containerRect.width - btnRect.width);
  const maxY = 120;

  const x = Math.random() * maxX;
  const y = (Math.random() * maxY) - 40;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;

  // tiny shake for fun
  noBtn.style.filter = "brightness(0.98)";
  setTimeout(() => (noBtn.style.filter = ""), 120);
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  buttons.classList.add("hidden");
  counterText.textContent = "";
  result.classList.remove("hidden");

  // “automation” feel: sparkle burst + faster hearts for a moment
  popSparkles(45);

  clearInterval(heartInterval);
  heartInterval = setInterval(spawnHeart, 350);
  setTimeout(() => {
    clearInterval(heartInterval);
    heartInterval = setInterval(spawnHeart, 850);
  }, 4500);
});

confettiBtn.addEventListener("click", () => popSparkles(32));

heartBtn.addEventListener("click", () => {
  for (let i = 0; i < 14; i++) setTimeout(spawnHeart, i * 90);
});

updateCounter();
