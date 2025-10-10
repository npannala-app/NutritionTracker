document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('macroForm');
  const logList = document.querySelector('#logList ul');

  const goals = {
    calories: 1600,
    protein: 150,
    sugar: 10,
    water: 102
  };

  const colors = {
    calories: '#ff4f70',
    protein: '#4fff9a',
    sugar: '#ffd84f',
    water: '#44d9ff'
  };

  function getTodayKey() {
    return `log-${new Date().toISOString().split('T')[0]}`;
  }

  function resetIfNewDay() {
    const today = new Date().toISOString().split('T')[0];
    if (localStorage.getItem('lastDate') !== today) {
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
      for (let k in totals) totals[k] += entry[k] || 0;
      const li = document.createElement('li');
      li.textContent = `🍎 ${entry.calories} cal, ${entry.protein}g protein, ${entry.sugar}g sugar, ${entry.water}oz water`;
      logList.appendChild(li);
    });

    updateCircles(totals);
  }

  function animateFraction(fractionElem, oldValue, newValue, goal) {
    let start = null;
    const duration = 800;
    const diff = newValue - oldValue;

    fractionElem.classList.add('animate');

    function step(timestamp) {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const current = oldValue + diff * progress;
      fractionElem.textContent = `${Math.round(current)} / ${goal}`;
      if (progress < 1) requestAnimationFrame(step);
      else setTimeout(() => fractionElem.classList.remove('animate'), 200);
    }

    requestAnimationFrame(step);
  }

  function updateCircles(totals) {
    for (const metric in goals) {
      const percent = Math.min((totals[metric] || 0) / goals[metric], 1);
      const circleDiv = document.getElementById(`${metric}Circle`);
      const fraction = document.getElementById(`${metric}Fraction`);
      const color = colors[metric];

      if (!circleDiv || !fraction) continue;

      circleDiv.innerHTML = `
        <svg viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="#2b2b2b" stroke-width="10" fill="none" />
          <circle class="glow" cx="50" cy="50" r="40" stroke="${color}" stroke-width="10" fill="none"
            stroke-dasharray="251" stroke-dashoffset="${251 - percent * 251}" />
          <text x="50" y="55" text-anchor="middle" fill="white" font-size="18">${Math.round(percent * 100)}%</text>
        </svg>
      `;

      const currentValue = parseFloat(fraction.textContent.split('/')[0]) || 0;
      animateFraction(fraction, currentValue, totals[metric], goals[metric]);
    }
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const entry = {
      calories: parseFloat(document.getElementById('calories').value) || 0,
      protein: parseFloat(document.getElementById('protein').value) || 0,
      sugar: parseFloat(document.getElementById('sugar').value) || 0,
      water: parseFloat(document.getElementById('water').value) || 0
    };

    const key = getTodayKey();
    const entries = JSON.parse(localStorage.getItem(key)) || [];
    entries.push(entry);
    localStorage.setItem(key, JSON.stringify(entries));
    localStorage.setItem('lastDate', new Date().toISOString().split('T')[0]);
    form.reset();
    loadLog();
  });

  loadLog();
});
