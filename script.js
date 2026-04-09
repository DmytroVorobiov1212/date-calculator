const dateInput = document.getElementById('date');
const daysSelect = document.getElementById('days');
const calcBtn = document.getElementById('calcBtn');
const resetBtn = document.getElementById('resetBtn');
const resultValue = document.getElementById('resultValue');

const today = new Date();
const maxYear = today.getFullYear();
const maxMonth = String(today.getMonth() + 1).padStart(2, '0');
const maxDay = String(today.getDate()).padStart(2, '0');

dateInput.max = `${maxYear}-${maxMonth}-${maxDay}`;

function formatDate(date) {
    return date.toLocaleDateString('cs-CZ');
}

function calculateDate() {
    if (!dateInput.value) {
        resultValue.textContent = 'Nejprve vyber datum výroby.';
        return;
    }

    const selectedDate = new Date(`${dateInput.value}T00:00:00`);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    if (selectedDate > currentDate) {
        resultValue.textContent = 'Datum výroby nesmí být v budoucnosti.';
        return;
    }

    const days = Number(daysSelect.value);
    const selectedOptionText = daysSelect.options[daysSelect.selectedIndex].text;

    selectedDate.setDate(selectedDate.getDate() + days);

    resultValue.textContent = `Nejpozději ${formatDate(selectedDate)} (${selectedOptionText})`;
}

function resetForm() {
    dateInput.value = '';
    daysSelect.selectedIndex = 0;
    resultValue.textContent = 'Výsledek se zobrazí zde';
    dateInput.focus();
}

calcBtn.addEventListener('click', calculateDate);
resetBtn.addEventListener('click', resetForm);

dateInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculateDate();
    }
});

daysSelect.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        calculateDate();
    }
});