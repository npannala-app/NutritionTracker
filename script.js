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
    return `log-${new Date().toISOString().split('T')[0]}`;
  }

  function resetIfNewDay() {
    const lastDate = localStorage.getItem('lastDate');
    const today = new Date().toISOString().split('T')[0];
    if (lastDate !== today) {
      localStorage.setItem(getTodayKey(), JSON.stringify([]));
      localStorage.setItem('lastDate', today);
    }
  }

  function safeParse(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.warn('Failed to parse localStorage key', key, err);
      return [];
    }
  }

  function loadLog() {
    resetIfNewDay();
    const key = getTodayKey();
    const entries = safeParse(key);
    logList.innerHTML = '';
    const totals = { calories: 0, protein: 0, sugar: 0, water: 0 };

    if (entries.length === 0) {
      const li = document.createElement('li');
      li.classList.add('slideUp');
      li.textContent = 'No entries yet — add your first log!';
      li.style.opacity = '0.7';
      logList.appendChild(li);
    } else {
      entries.forEach(entry => {
        totals.calories += Number(entry.calories) || 0;
        totals.protein += Number(entry.protein) || 0;
        totals.sugar += Number(entry.sugar) || 0;
        totals.water += Number(entry.water) || 0;

        const li = document.createElement('li');
        li.classList.add('slideUp');
        const time = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        li.textContent = `🍽️ ${entry.calories} cal, ${entry.protein}g protein, ${entry.sugar}g sugar, ${entry.water}oz water — ${time}`;
        logList.appendChild(li);
      });
    }

    updateCircles(totals);
  }

  function updateCircles(totals) {
    // r = 40 as in your SVG circle, so circumference = 2πr
    const r = 40;
    const circumference = 2 * Math.PI * r;
    const dash = circumference.toFixed(2);

    for (const metric in goals) {
      const value = Number(totals[metric]) || 0;
      const percent = Math.min(value / goals[metric], 1);
      const circle = document.getElementById(`${metric}Circle`);
      if (!circle) continue;

      // stroke-dashoffset should be (1 - percent) * circumference
      const offset = ((1 - percent) * circumference).toFixed(2);

      circle.innerHTML = `
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="${r}" stroke="#3a3a3c" stroke-width="10" fill="none" />
          <circle cx="50" cy="50" r="${r}" stroke="#0a84ff" stroke-width="10" fill="none"
            stroke-dasharray="${dash}" stroke-dashoffset="${offset}"
            stroke-linecap="round" transform="rotate(-90 50 50)" />
          <text x="50" y="55">${Math.round(percent * 100)}%</text>
        </svg>
      `;
    }
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const entry = {
      calories: Number(document.getElementById('calories').value) || 0,
      protein: Number(document.getElementById('protein').value) || 0,
      sugar: Number(document.getElementById('sugar').value) || 0,
      water: Number(document.getElementById('water').value) || 0,
      timestamp: new Date().toISOString()
    };

    const key = getTodayKey();
    const entries = safeParse(key);
    entries.push(entry);
    localStorage.setItem(key, JSON.stringify(entries));
    localStorage.setItem('lastDate', new Date().toISOString().split('T')[0]);

    form.reset();
    loadLog();
  });

  // --- IMPORTANT: call the loader (fixed) ---
  loadLog();
});
