document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('macroForm');
  const logList = document.querySelector('#logList ul');

  const goals = { calories: 1600, protein: 150, sugar: 10, water: 102 };

  function getTodayKey() {
    return 'log-' + new Date().toISOString().split('T')[0];
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

  function clearChildren(node) {
    while (node.firstChild) node.removeChild(node.firstChild);
  }

  function loadLog() {
    resetIfNewDay();
    const key = getTodayKey();
    const entries = safeParse(key);
    clearChildren(logList);

    const totals = { calories: 0, protein: 0, sugar: 0, water: 0 };

    if (entries.length === 0) {
      const li = document.createElement('li');
      li.className = 'slideUp';
      li.textContent = 'No entries yet - add your first log!';
      li.style.opacity = '0.85';
      logList.appendChild(li);
    } else {
      entries.forEach(function (entry) {
        totals.calories += Number(entry.calories) || 0;
        totals.protein += Number(entry.protein) || 0;
        totals.sugar += Number(entry.sugar) || 0;
        totals.water += Number(entry.water) || 0;

        const li = document.createElement('li');
        li.className = 'slideUp';
        var time = '';
        try {
          time = new Date(entry.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } catch (e) {
          time = new Date(entry.timestamp).toLocaleTimeString();
        }
        li.textContent =
          '🍽️ ' +
          (entry.calories || 0) +
          ' cal, ' +
          (entry.protein || 0) +
          'g protein, ' +
          (entry.sugar || 0) +
          'g sugar, ' +
          (entry.water || 0) +
          'oz water - ' +
          time;
        logList.appendChild(li);
      });
    }

    updateCircles(totals);
  }

  function updateCircles(totals) {
    var r = 40;
    var circumference = 2 * Math.PI * r;
    var dash = circumference.toFixed(2);
    var xmlns = 'http://www.w3.org/2000/svg';

    Object.keys(goals).forEach(function (metric) {
      var value = Number(totals[metric]) || 0;
      var percent = Math.min(value / goals[metric], 1);
      var container = document.getElementById(metric + 'Circle');
      if (!container) return;

      clearChildren(container);

      var svg = document.createElementNS(xmlns, 'svg');
      svg.setAttribute('viewBox', '0 0 100 100');
      svg.setAttribute('aria-hidden', 'true');

      var bg = document.createElementNS(xmlns, 'circle');
      bg.setAttribute('cx', '50');
      bg.setAttribute('cy', '50');
      bg.setAttribute('r', String(r));
      bg.setAttribute('stroke', '#3a3a3c');
      bg.setAttribute('stroke-width', '10');
      bg.setAttribute('fill', 'none');
      svg.appendChild(bg);

      var prog = document.createElementNS(xmlns, 'circle');
      prog.setAttribute('cx', '50');
      prog.setAttribute('cy', '50');
      prog.setAttribute('r', String(r));
      prog.setAttribute('stroke', '#0a84ff');
      prog.setAttribute('stroke-width', '10');
      prog.setAttribute('fill', 'none');
      prog.setAttribute('stroke-dasharray', dash);
      var offset = ((1 - percent) * circumference).toFixed(2);
      prog.setAttribute('stroke-dashoffset', offset);
      prog.setAttribute('stroke-linecap', 'round');
      prog.setAttribute('transform', 'rotate(-90 50 50)');
      svg.appendChild(prog);

      var text = document.createElementNS(xmlns, 'text');
      text.setAttribute('x', '50');
      text.setAttribute('y', '55');
      text.setAttribute('text-anchor', 'middle');
      text.setAttribute('dominant-baseline', 'middle');
      text.textContent = Math.round(percent * 100) + '%';
      svg.appendChild(text);

      container.appendChild(svg);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var entry = {
      calories: Number(document.getElementById('calories').value) || 0,
      protein: Number(document.getElementById('protein').value) || 0,
      sugar: Number(document.getElementById('sugar').value) || 0,
      water: Number(document.getElementById('water').value) || 0,
      timestamp: new Date().toISOString()
    };

    var key = getTodayKey();
    var entries = safeParse(key);
    entries.push(entry);
    localStorage.setItem(key, JSON.stringify(entries));
    localStorage.setItem('lastDate', new Date().toISOString().split('T')[0]);

    form.reset();
    loadLog();
  });

  // initial load
  loadLog();
});
