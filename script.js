const form = document.getElementById('macroForm');
const logList = document.querySelector('#logList ul');

const goals = {
  calories: 1600,
  protein: 150,
  sugar: 10,
  water: 102
};

function getTodayKey() {
  return `log-${new Date().toISOString().split('T')[0]}`;
}

function loadLog() {
  const key = getTodayKey();
  const entries = JSON.parse(localStorage.getItem(key)) || [];
  logList.innerHTML = '';
  const totals = { calories: 0, protein: 0, sugar: 0, water: 0 };

  entries.forEach(entry => {
    totals.calories += entry.calories;
    totals.protein += entry.protein;
    totals.sugar += entry.sugar;
    totals.water += entry.water;

    const li = document.createElement('li');
    li.textContent = `🍽️ ${entry.calories} cal, ${entry.protein}g protein, ${entry.sugar}g sugar, ${entry.water}oz water`;
    logList.appendChild(li);
  });

  updateCircles(totals);
}

function updateCircles(totals) {
  for (const metric in goals) {
    const percent = Math.min(totals[metric] / goals[metric], 1);
    const circle = document.getElementById(`${metric}Circle`);
    circle.innerHTML = `
      <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" stroke="#3a3a3c" stroke-width="10" fill="none" />
        <circle cx="50" cy="50" r="40" stroke="#0a84ff" stroke-width="10" fill="none"
          stroke-dasharray="251" stroke-dashoffset="${251 - percent * 251}" />
        <text x="50" y="50">${Math.round(percent * 100)}%</text>
      </svg>
    `;
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const entry = {
    calories: +document.getElementById('calories').value,
    protein: +document.getElementById('protein').value,
    sugar: +document.getElementById('sugar').value,
    water: +document.getElementById('water').value,
    timestamp: new Date().toISOString()
  };

  const key = getTodayKey();
  const entries = JSON.parse(localStorage.getItem(key)) || [];
  entries.push(entry);
  localStorage.setItem(key, JSON.stringify(entries));

  form.reset();
  loadLog();
});

loadLog();
