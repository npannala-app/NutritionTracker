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
  localStorage.setItem(key, JSON.stringify(entries));
  localStorage.setItem('lastDate', new Date().toISOString().split('T')[0]);

  [A](https://github.com/lzh-yi/Web-Fork-/tree/024b3e55587afdf9f05a677613a75f24e3d1803e/03-CSS%E8%BF%9B%E9%98%B6%2F04-%E5%A6%82%E4%BD%95%E8%AE%A9%E4%B8%80%E4%B8%AA%E5%85%83%E7%B4%A0%E6%B0%B4%E5%B9%B3%E5%9E%82%E7%9B%B4%E5%B1%85%E4%B8%AD%EF%BC%9F.md?copilot_analytics_metadata=eyJldmVudEluZm9fY2xpY2tEZXN0aW5hdGlvbiI6Imh0dHBzOlwvXC9naXRodWIuY29tXC9semgteWlcL1dlYi1Gb3JrLVwvdHJlZVwvMDI0YjNlNTU1ODdhZmRmOWYwNWE2Nzc2MTNhNzVmMjRlM2QxODAzZVwvMDMtQ1NTJUU4JUJGJTlCJUU5JTk4JUI2JTJGMDQtJUU1JUE2JTgyJUU0JUJEJTk1JUU4JUFFJUE5JUU0JUI4JTgwJUU0JUI4JUFBJUU1JTg1JTgzJUU3JUI0JUEwJUU2JUIwJUI0JUU1JUI5JUIzJUU1JTlFJTgyJUU3JTlCJUI0JUU1JUIxJTg1JUU0JUI4JUFEJUVGJUJDJTlGLm1kIiwiZXZlbnRJbmZvX21lc3NhZ2VJZCI6IjJha1JRcGpEOHRHemVnMXd6UDhMOCIsImV2ZW50SW5mb19jbGlja1NvdXJjZSI6ImNpdGF0aW9uTGluayIsImV2ZW50SW5mb19jb252ZXJzYXRpb25JZCI6IlF4NEsyNmVKeUpkdGNpRFdWc2V2eiJ9&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1) [B](https://github.com/lucasm/headly/tree/d0191952b9687d31441e48afc89496a7db8a7b0e/components%2FPageLayout.js?copilot_analytics_metadata=eyJldmVudEluZm9fY2xpY2tTb3VyY2UiOiJjaXRhdGlvbkxpbmsiLCJldmVudEluZm9fY2xpY2tEZXN0aW5hdGlvbiI6Imh0dHBzOlwvXC9naXRodWIuY29tXC9sdWNhc21cL2hlYWRseVwvdHJlZVwvZDAxOTE5NTJiOTY4N2QzMTQ0MWU0OGFmYzg5NDk2YTdkYjhhN2IwZVwvY29tcG9uZW50cyUyRlBhZ2VMYXlvdXQuanMiLCJldmVudEluZm9fY29udmVyc2F0aW9uSWQiOiJReDRLMjZlSnlKZHRjaURXVnNldnoiLCJldmVudEluZm9fbWVzc2FnZUlkIjoiMmFrUlFwakQ4dEd6ZWcxd3pQOEw4In0%3D&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1) [C](https://github.com/oatmeal3000/oatmeal3000.github.io/tree/b8155d037572b86e9440d8cf366199ba15cef1a5/FundreamGames%2F20150103_laserpuzzle%2Findex.php?copilot_analytics_metadata=eyJldmVudEluZm9fbWVzc2FnZUlkIjoiMmFrUlFwakQ4dEd6ZWcxd3pQOEw4IiwiZXZlbnRJbmZvX2NsaWNrRGVzdGluYXRpb24iOiJodHRwczpcL1wvZ2l0aHViLmNvbVwvb2F0bWVhbDMwMDBcL29hdG1lYWwzMDAwLmdpdGh1Yi5pb1wvdHJlZVwvYjgxNTVkMDM3NTcyYjg2ZTk0NDBkOGNmMzY2MTk5YmExNWNlZjFhNVwvRnVuZHJlYW1HYW1lcyUyRjIwMTUwMTAzX2xhc2VycHV6emxlJTJGaW5kZXgucGhwIiwiZXZlbnRJbmZvX2NsaWNrU291cmNlIjoiY2l0YXRpb25MaW5rIiwiZXZlbnRJbmZvX2NvbnZlcnNhdGlvbklkIjoiUXg0SzI2ZUp5SmR0Y2lEV1ZzZXZ6In0%3D&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1) [D](https://github.com/code-geeker/script.quasar.kickass-mc/tree/02d1dfc49cf2314f3d03b4a03e6e389d7d272ec0/test.py?copilot_analytics_metadata=eyJldmVudEluZm9fY2xpY2tTb3VyY2UiOiJjaXRhdGlvbkxpbmsiLCJldmVudEluZm9fY29udmVyc2F0aW9uSWQiOiJReDRLMjZlSnlKZHRjaURXVnNldnoiLCJldmVudEluZm9fY2xpY2tEZXN0aW5hdGlvbiI6Imh0dHBzOlwvXC9naXRodWIuY29tXC9jb2RlLWdlZWtlclwvc2NyaXB0LnF1YXNhci5raWNrYXNzLW1jXC90cmVlXC8wMmQxZGZjNDljZjIzMTRmM2QwM2I0YTAzZTZlMzg5ZDdkMjcyZWMwXC90ZXN0LnB5IiwiZXZlbnRJbmZvX21lc3NhZ2VJZCI6IjJha1JRcGpEOHRHemVnMXd6UDhMOCJ9&citationMarker=9F742443-6C92-4C44-BF58-8F5A7C53B6F1)
