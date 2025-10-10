const goals = {
  calories: 1600,
  protein: 150,
  sugar: 50,
  water: 102
};

const colors = {
  calories: "#ff6b6b",
  protein: "#feca57",
  sugar: "#48dbfb",
  water: "#1dd1a1"
};

const totals = { calories: 0, protein: 0, sugar: 0, water: 0 };

function drawCircle(canvas, percent, color) {
  const ctx = canvas.getContext("2d");
  const size = canvas.width;
  const radius = size / 2 - 10;
  const center = size / 2;
  ctx.clearRect(0, 0, size, size);

  // Background circle
  ctx.beginPath();
  ctx.arc(center, center, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#2c2c2c";
  ctx.lineWidth = 12;
  ctx.stroke();

  // Progress arc
  const angle = (Math.min(percent, 100) / 100) * 2 * Math.PI;
  ctx.beginPath();
  ctx.arc(center, center, radius, -Math.PI / 2, angle - Math.PI / 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 12;
  ctx.lineCap = "round";
  ctx.stroke();

  // Text
  ctx.fillStyle = "white";
  ctx.font = "bold 20px Inter";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(`${Math.min(percent, 100).toFixed(0)}%`, center, center);
}

function updateUI() {
  Object.keys(totals).forEach(key => {
    const percent = (totals[key] / goals[key]) * 100;
    const canvas = document.querySelector(`#${key}-circle canvas`);
    const fraction = document.querySelector(`#${key}-fraction`);
    
    drawCircle(canvas, percent, colors[key]);
    
    fraction.style.transform = "scale(1.1)";
    fraction.textContent = `${totals[key]} / ${goals[key]}`;
    setTimeout(() => fraction.style.transform = "scale(1)", 300);
  });
}

document.getElementById("addEntry").addEventListener("click", () => {
  const entry = {
    calories: +document.getElementById("calories").value || 0,
    protein: +document.getElementById("protein").value || 0,
    sugar: +document.getElementById("sugar").value || 0,
    water: +document.getElementById("water").value || 0
  };

  Object.keys(totals).forEach(key => totals[key] += entry[key]);

  const logList = document.getElementById("logList");
  const li = document.createElement("li");
  li.textContent = `${entry.calories} cal, ${entry.protein}g protein, ${entry.sugar}g sugar, ${entry.water}oz water`;
  logList.appendChild(li);

  updateUI();
});

// Initialize UI on load
updateUI();
