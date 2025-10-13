document.addEventListener("DOMContentLoaded", () => {
  const goals = { calories: 1600, protein: 150, sugar: 50, water: 102 };
  const colors = {
    calories: "#ff6961",
    protein: "#ffd166",
    sugar: "#6ec1e4",
    water: "#80ed99"
  };
  const totals = { calories: 0, protein: 0, sugar: 0, water: 0 };

  function drawCircle(canvas, percent, color) {
    if (!canvas) return;document.addEventListener("DOMContentLoaded", () => {
  const goals = { calories: 1600, protein: 150, sugar: 50, water: 102 };
  const colors = {
    calories: "#ff3b30",
    protein: "#ffd60a",
    sugar: "#0a84ff",
    water: "#30d158"
  };
  const totals = { calories: 0, protein: 0, sugar: 0, water: 0 };

  function drawCircle(canvas, percent, color) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const radius = size / 2 - 8;
    const center = size / 2;

    ctx.clearRect(0, 0, size, size);

    // Background circle
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 10;
    ctx.stroke();

    // Progress circle
    const end = (Math.min(percent, 100) / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(center, center, radius, -Math.PI / 2, end - Math.PI / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    // Percentage text
    ctx.fillStyle = "#ffffff";
    ctx.font = "600 18px 'SF Pro Display'";
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
      if (fraction) fraction.textContent = `${totals[key]} / ${goals[key]}`;
    });
  }

  document.getElementById("macroForm").addEventListener("submit", e => {
    e.preventDefault();
    const entry = {
      calories: +document.getElementById("calories").value || 0,
      protein: +document.getElementById("protein").value || 0,
      sugar: +document.getElementById("sugar").value || 0,
      water: +document.getElementById("water").value || 0
    };
    Object.keys(totals).forEach(k => totals[k] += entry[k]);

    const li = document.createElement("li");
    li.textContent = `${entry.calories} cal, ${entry.protein}g protein, ${entry.sugar}g sugar, ${entry.water}oz water`;
    document.getElementById("logList").appendChild(li);

    updateUI();
    e.target.reset();
  });

  updateUI();
});

    const ctx = canvas.getContext("2d");
    const size = canvas.width;
    const radius = size / 2 - 8;
    const center = size / 2;

    ctx.clearRect(0, 0, size, size);

    // Background circle
    ctx.beginPath();
    ctx.arc(center, center, radius, 0, 2 * Math.PI);
    ctx.strokeStyle = "#3a3a3c";
    ctx.lineWidth = 10;
    ctx.stroke();

    // Progress circle
    const end = (Math.min(percent, 100) / 100) * 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(center, center, radius, -Math.PI / 2, end - Math.PI / 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.lineCap = "round";
    ctx.stroke();

    // Percentage text
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 18px 'SF Pro Display'";
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
      if (fraction) {
        fraction.textContent = `${totals[key]} / ${goals[key]}`;
      }
    });
  }

  document.getElementById("macroForm").addEventListener("submit", e => {
    e.preventDefault();
    const entry = {
      calories: +document.getElementById("calories").value || 0,
      protein: +document.getElementById("protein").value || 0,
      sugar: +document.getElementById("sugar").value || 0,
      water: +document.getElementById("water").value || 0
    };
    Object.keys(totals).forEach(key => totals[key] += entry[key]);
    const li = document.createElement("li");
    li.textContent = `${entry.calories} cal, ${entry.protein}g protein, ${entry.sugar}g sugar, ${entry.water}oz water`;
    document.getElementById("logList").appendChild(li);
    updateUI();
    e.target.reset();
  });

  updateUI();
});
