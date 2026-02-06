const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const result = document.getElementById("result");
const buttons = document.getElementById("buttons");
const counterText = document.getElementById("counterText");
const confettiBtn = document.getElementById("confettiBtn");

let noCount = 0;

function updateCounter() {
  if (noCount === 0) counterText.textContent = "";
  else counterText.textContent = `No attempts: ${noCount} 😅`;
}

function popConfetti(amount = 25) {
  const card = document.getElementById("card");
  const rect = card.getBoundingClientRect();

  for (let i = 0; i < amount; i++) {
    const dot = document.createElement("div");
    dot.className = "confetti";

    // random position near the top
    const x = Math.random() * (rect.width - 10);
    dot.style.left = `${x}px`;
    dot.style.top = `-8px`;

    // random color
    const colors = ["#ff4d88", "#ffd1e1", "#ffcc00", "#66d9ff", "#b56bff"];
    dot.style.background = colors[Math.floor(Math.random() * colors.length)];

    // random size
    const size = 6 + Math.random() * 10;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;

    // random fall duration
    dot.style.animationDuration = `${700 + Math.random() * 700}ms`;

    card.appendChild(dot);
    setTimeout(() => dot.remove(), 1600);
  }
}

// Make the "No" button dodge the cursor/taps
function moveNoButton() {
  noCount++;
  updateCounter();

  const containerRect = buttons.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = containerRect.width - btnRect.width;
  const maxY = 120; // keep it near the buttons area

  const x = Math.random() * Math.max(0, maxX);
  const y = (Math.random() * maxY) - 40;

  noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

noBtn.addEventListener("mouseenter", moveNoButton);
noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  // Hide buttons, show result
  buttons.classList.add("hidden");
  result.classList.remove("hidden");
  popConfetti(40);
});

confettiBtn.addEventListener("click", () => popConfetti(30));

updateCounter();
