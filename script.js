const prayerForm = document.getElementById('prayer-form');
const prayerInput = document.getElementById('prayer-input');
const prayerList = document.getElementById('prayer-list');

let prayers = JSON.parse(localStorage.getItem('prayers')) || [];

function renderPrayers() {
  prayerList.innerHTML = '';
  prayers.forEach((prayer, index) => {
    const li = document.createElement('li');
    li.textContent = prayer.text;

    const btn = document.createElement('button');
    btn.textContent = prayer.answered ? '✓ Answered' : 'Mark Answered';
    btn.style.background = prayer.answered ? '#28a745' : '#6c757d';
    btn.onclick = () => {
      prayers[index].answered = !prayers[index].answered;
      savePrayers();
    };

    li.appendChild(btn);
    prayerList.appendChild(li);
  });
}

function savePrayers() {
  localStorage.setItem('prayers', JSON.stringify(prayers));
  renderPrayers();
}

prayerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPrayer = {
    text: prayerInput.value,
    answered: false
  };
  prayers.push(newPrayer);
  prayerInput.value = '';
  savePrayers();
});

renderPrayers();