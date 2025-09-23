const form = document.getElementById('macroForm');
const logList = document.getElementById('logList');
const totalCaloriesDisplay = document.getElementById('totalCalories');

function getTodayKey() {
  const today = new Date().toISOString().split('T')[0];
  return `log-${today}`;
}

function loadLog() {
  const key = getTodayKey();
  const entries = JSON.parse(localStorage.getItem(key)) || [];
  logList.innerHTML = '';
  let totalCalories = 0;

  entries.forEach(entry => {
    totalCalories += entry.calories;
    const li = document.createElement('li');
    li.textContent = `🍽️ ${entry.calories} cal, ${entry.protein}g protein, ${entry.addedSugar}g added sugar`;
    logList.appendChild(li);
  });

  totalCaloriesDisplay.textContent = `Total Calories: ${totalCalories}`;
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const entry = {
    calories: +document.getElementById('calories').value,
    protein: +document.getElementById('protein').value,
    addedSugar: +document.getElementById('addedSugar').value,
    naturalSugar: +document.getElementById('naturalSugar').value
  };

  const key = getTodayKey();
  const entries = JSON.parse(localStorage.getItem(key)) || [];
  entries.push(entry);
  localStorage.setItem(key, JSON.stringify(entries));

  form.reset();
  loadLog();
});

loadLog();
