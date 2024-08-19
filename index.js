const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

function generateCalendar(year, month) {
    const calendarBody = document.getElementById('calendar-body');
    const monthYear = document.getElementById('month-year');

    // Clear the calendar body
    calendarBody.innerHTML = '';

    // Set the month and year
    monthYear.textContent = `${monthNames[month]} ${year}`;

    // Get the first day of the month and the number of days in the month
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create the calendar grid
    let date = 1;
    for (let i = 0; i < 6; i++) { // 6 weeks (rows)
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) { // 7 days (columns)
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                cell.classList.add('empty');
            } else if (date > daysInMonth) {
                cell.classList.add('empty');
            } else {
                cell.textContent = date;
                date++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

function changeMonth(offset) {
    currentMonth += offset;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }

    generateCalendar(currentYear, currentMonth);
}

function changeYear(offset) {
    currentYear += offset;
    generateCalendar(currentYear, currentMonth);
}

document.getElementById('prev-month').addEventListener('click', () => changeMonth(-1));
document.getElementById('next-month').addEventListener('click', () => changeMonth(1));
document.getElementById('prev-year').addEventListener('click', () => changeYear(-1));
document.getElementById('next-year').addEventListener('click', () => changeYear(1));

document.addEventListener('DOMContentLoaded', () => generateCalendar(currentYear, currentMonth));
