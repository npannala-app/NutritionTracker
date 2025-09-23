document.getElementById('macroForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const calories = +document.getElementById('calories').value;
  const protein = +document.getElementById('protein').value;
  const addedSugar = +document.getElementById('addedSugar').value;
  const naturalSugar = +document.getElementById('naturalSugar').value;

  let feedback = '';

  if (addedSugar > 10) feedback += '⚠️ Too much added sugar!\n';
  if (naturalSugar > 20) feedback += '⚠️ Too much natural sugar!\n';
  if (protein < 120) feedback += '⚠️ Protein too low!\n';
  if (calories < 1800) feedback += '⚠️ Calories may be too low for training!\n';

  document.getElementById('output').innerText =
    feedback || '✅ All macros within target!';
});
