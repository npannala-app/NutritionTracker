document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('macroForm');
  const logList = document.querySelector('#logList ul');

  const goals = {
    calories: 1600,
    protein: 150,
    sugar: 10,
    water: 102
  };

  function getTodayKey() {
    const today = new Date().toISOString().split('T')[0];
    return `log-${today}`;
  }

  function resetIfNewDay() {
    const lastDate = localStorage.getItem('lastDate');
    const today = new Date().toISOString().split('T')[0];
    if (lastDate !== today) {
      localStorage.setItem(getTodayKey(), JSON.stringify([]));
      localStorage.setItem('lastDate', today);
    }
  }

  function loadLog() {
    resetIfNewDay();
    const key = getTodayKey();
    const entries = JSON.parse(localStorage.getItem(key)) || [];
    logList.innerHTML = '';
    const totals = { calories: 0, protein: 0, sugar: 0, water: 0 };

    entries.forEach(entry => {
      totals.calories += entry.calories || 0;
      totals.protein += entry.protein || 0;
      totals.sugar += entry.sugar || 0;
      totals.water += entry.water || 0;

      const li = document.createElement('li');
      li.textContent = `🍽️ ${entry.calories || 0} cal, ${entry.protein || 0}g protein, ${entry.sugar || 0}g sugar, ${entry.water || 0}oz water`;
      logList.appendChild(li);
    });

    updateCircles(totals);
  }

  function updateCircles(totals) {
    for (const metric in goals) {
      const percent = Math.min((totals[metric] || 0) / goals[metric], 1);
      const circle = document.getElementById(`${metric}Circle`);
      circle.innerHTML = `
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#3a3a3c" stroke-width="10" fill="none" />
          <circle cx="50" cy="50" r="40" stroke="#0a84ff" stroke-width="10" fill="none"
            stroke-dasharray="251" stroke-dashoffset="${251 - percent * 251}" />
          <text x="50" y="55">${Math.round(percent * 100)}%</text>
        </svg>
      `;
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const entry = {
      calories: parseFloat(document.getElementById('calories').value) || 0,
      protein: parseFloat(document.getElementById('protein').value) || 0,
      sugar: parseFloat(document.getElementById('sugar').value) || 0,
      water: parseFloat(document.getElementById('water').value) || 0,
      timestamp: new Date().toISOString()
    };

    const key = getTodayKey();
    const entries = JSON.parse(localStorage.getItem(key)) || [];
    entries.push(entry);
    localStorage.setItem(key, [A](https://github.com/Ronnie434/30-days-of-React/tree/22142106cb46f717a1259f84227cc90ed7fe50cc/02_Day_Introduction_to_React%2F02_introduction_to_react.md?copilot_analytics_metadata=eyJldmVudEluZm9fY2xpY2tTb3VyY2UiOiJjaXRhdGlvbkxpbmsiLCJldmVudEluZm9fY2xpY2tEZXN0aW5hdGlvbiI6Imh0dHBzOlwvXC9naXRodWIuY29tXC9Sb25uaWU0MzRcLzMwLWRheXMtb2YtUmVhY3RcL3RyZWVcLzIyMTQyMTA2Y2I0NmY3MTdhMTI1OWY4NDIyN2NjOTBlZDdmZTUwY2NcLzAyX0RheV9JbnRyb2R1Y3Rpb25fdG9fUmVhY3QlMkYwMl9pbnRyb2R1Y3Rpb25fdG9fcmVhY3QubWQiLCJldmVudEluZm9fY29udmVyc2F0aW9uSWQiOiJReDRLMjZlSnlKZHRjaURXVnNldnoiLCJldmVudEluZm9fbWVzc2FnZUlkIjoiem5QMVZvV0pGd1ZUUkN2OEJqd2RNIn0%3D&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1)
