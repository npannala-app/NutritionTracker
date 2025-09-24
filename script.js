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
      li.textContent = `🍽️ ${entry.calories} cal, ${entry.protein}g protein, ${entry.sugar}g sugar, ${entry.water}oz water`;
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
    localStorage.setItem(key, JSON.stringify(entries));
    localStorage.setItem('lastDate', new Date().toISOString().split('T')[0]);

    form.reset();
    loadLog();
 [A](https://github.com/lzh-yi/Web-Fork-/tree/024b3e55587afdf9f05a677613a75f24e3d1803e/03-CSS%E8%BF%9B%E9%98%B6%2F04-%E5%A6%82%E4%BD%95%E8%AE%A9%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD%EF%BC%9F.md?copilot_analytics_metadata=eyJldmVudEluZm9fbWVzc2FnZUlkIjoicHpMY1RMaGdFWGlLWGp6eDRQNjNoIiwiZXZlbnRJbmZvX2NsaWNrU291cmNlIjoiY2l0YXRpb25MaW5rIiwiZXZlbnRJbmZvX2NsaWNrRGVzdGluYXRpb24iOiJodHRwczpcL1wvZ2l0aHViLmNvbVwvbHpoLXlpXC9XZWItRm9yay1cL3RyZWVcLzAyNGIzZTU1NTg3YWZkZjlmMDVhNjc3NjEzYTc1ZjI0ZTNkMTgwM2VcLzAzLUNTUyVFOCVCRiU5QiVFOSU5OCVCNiUyRjA0LSVFNSVBNiU4MiVFNCVCRCU5NSVFOCVBRSVBOSVFNCVCOCU4MCVFNCVCOCVBQSVFNSU4NSU4MyVFNyVCNCVBMCVFNiVCMCVCNCVFNSVCOSVCMyVFNSU5RSU4MiVFNyU5QiVCNCVFNSVCMSU4NSVFNCVCOCVBRCVFRiVCQyU5Ri5tZCIsImV2ZW50SW5mb19jb252ZXJzYXRpb25JZCI6IlF4NEsyNmVKeUpkdGNpRFdWc2V2eiJ9&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1)
loadLog();
