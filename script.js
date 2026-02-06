const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const buttons = document.getElementById("buttons");
const counterText = document.getElementById("counterText");
const confettiBtn = document.getElementById("confettiBtn");
const heartBtn = document.getElementById("heartBtn");
const heartsLayer = document.querySelector(".hearts");
// Background slideshow (your 3 photos)
const bgEl = document.querySelector(".photo-bg");
const bgPhotos = ["couple1.jpeg", "couple2.jpeg", "couple3.jpeg"];


const backBtn = document.getElementById("backBtn");
const slideImg = document.getElementById("slideImg");
const dotsEl = document.getElementById("dots");

const slides = ["couple1.jpeg", "couple2.jpeg", "couple3.jpeg"];
let slideIndex = 0;
let slideTimer = null;

function renderDots(){
  dotsEl.innerHTML = "";
  slides.forEach((_, i) => {
    const d = document.createElement("div");
    d.className = "dot" + (i === slideIndex ? " active" : "");
    dotsEl.appendChild(d);
  });
}

function showSlide(i){
  slideIndex = i;
  slideImg.style.opacity = "0";
  setTimeout(() => {
    slideImg.src = slides[slideIndex];
    renderDots();
    slideImg.style.opacity = "1";
  }, 180);
}

function startSlideshow(){
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }, 1800); // 1.8 seconds (change to 1500 or 2000 if you want)
}
function stopSlideshow(){
  if (slideTimer) clearInterval(slideTimer);
  slideTimer = null;
}


let bgIndex = 0;

function setBackground(i) {
  bgEl.style.opacity = "0.35";
  setTimeout(() => {
    bgEl.style.backgroundImage = `url("${bgPhotos[i]}")`;
    bgEl.style.opacity = "0.55";
  }, 200);
}

// start
setBackground(bgIndex);

// change every 4 seconds
setInterval(() => {
  bgIndex = (bgIndex + 1) % bgPhotos.length;
  setBackground(bgIndex);
}, 4000);


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

function moveNoButton() {
  noCount++;
  updateCounter();

  // Move inside the buttons container so it never disappears off-screen
  const area = buttons.getBoundingClientRect();
  const btn = noBtn.getBoundingClientRect();

  const padding = 8;

  const maxX = area.width - btn.width - padding * 2;
  const maxY = area.height - btn.height - padding * 2;

  const x = padding + Math.random() * Math.max(0, maxX);
  const y = padding + Math.random() * Math.max(0, maxY);

  // Because .no is position:absolute, we set left/top directly
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;

  // Small “wiggle” feedback
  noBtn.animate(
    [{ transform: "translate(-50%, -50%) rotate(0deg)" },
     { transform: "translate(-50%, -50%) rotate(3deg)" },
     { transform: "translate(-50%, -50%) rotate(-3deg)" },
     { transform: "translate(-50%, -50%) rotate(0deg)" }],
    { duration: 180 }
  );
}

// It dodges on hover AND on attempted click
noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  moveNoButton();
});
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
showSlide(0);
startSlideshow();
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
backBtn.addEventListener("click", () => {
  stopSlideshow();
  result.classList.add("hidden");
  buttons.classList.remove("hidden");
  // reset no button to center
  noBtn.style.left = "50%";
  noBtn.style.top = "50%";
  noBtn.style.transform = "translate(-50%, -50%)";
});

updateCounter();
