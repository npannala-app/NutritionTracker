const macros = {
  calories: { current: 0, goal: 2000 },
  protein: { current: 0, goal: 150 },
  carbs: { current: 0, goal: 250 },
  fat: { current: 0, goal: 70 }
};

const macroContainer = document.getElementById("macro-container");

// Create circles + fraction text
Object.entries(macros).forEach(([key, { current, goal }]) => {
  const div = document.createElement("div");
  div.className = "macro-item";
  div.innerHTML = `
    <canvas id="${key}-circle" width="100" height="100"></canvas>
    <div class="macro-label">${key.toUpperCase()}</div>
    <div class="macro-fraction" id="${key}-fraction">${current} / ${goal}</div>
  `;
  macroContainer.appendChild(div);
});

function drawCircle(id, current, goal, color) {
  const canvas = document.getElementById(id);
  const ctx = canvas.getContext("2d");
  const percentage = Math.min(current / goal, 1);
  const radius = 40;
  const start = -Math.PI / 2;
  const end = start + percentage * 2 * Math.PI;

  // Clear
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Background circle
  ctx.beginPath();
  ctx.arc(50, 50, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#eee";
  ctx.lineWidth = 8;
  ctx.stroke();

  // Progress arc
  ctx.beginPath();
  ctx.arc(50, 50, radius, start, end);
  ctx.strokeStyle = color;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.stroke();
}

function updateDisplay() {
  const colors = { calories: "red", protein: "blue", carbs: "orange", fat: "green" };

  Object.entries(macros).forEach(([key, { current, goal }]) => {
    drawCircle(`${key}-circle`, current, goal, colors[key]);
    document.getElementById(`${key}-fraction`).textContent = `${current} / ${goal}`;
  });
}

document.getElementById("log-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const calories = parseInt(document.getElementById("calories").value) || 0;
  const protein = parseInt(document.getElementById("protein").value) || 0;
  const carbs = parseInt(document.getElementById("carbs").value) || 0;
  const fat = parseInt(document.getElementById("fat").value) || 0;

  macros.calories.current += calories;
  macros.protein.current += protein;
  macros.carbs.current += carbs;
  macros.fat.current += fat;

  updateDisplay();

  // Clear inputs
  e.target.reset();
});

updateDisplay();
