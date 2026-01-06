// Wait until the whole HTML document has been completely loaded
document.addEventListener('DOMContentLoaded', function () {

    // === Event Filtering Logic ===

    // Get all filter buttons (e.g. 'All', 'Sports', 'Academic', etc.)
    const filterItems = document.querySelectorAll('.switcher li');

    // Get all event blocks that can be shown/hidden
    const events = document.querySelectorAll('.events .all');

    // Loop through each filter button
    filterItems.forEach(item => {
        // When a filter is clicked
        item.addEventListener('click', function () {
            // Remove the "active" class from all filter buttons
            filterItems.forEach(i => i.classList.remove('active'));

            // Add "active" class to the clicked filter button
            this.classList.add('active');

            // Get the value of data-event (e.g. "all", "sports")
            const selectedEvent = this.getAttribute('data-event');

            // Loop through all events
            events.forEach(event => {
                // If "all" is selected, show all events
                if (selectedEvent === 'all') {
                    event.style.display = 'block';
                } else {
                    // Show only events matching the selected category
                    if (event.classList.contains(selectedEvent)) {
                        event.style.display = 'block';
                    } else {
                        event.style.display = 'none';
                    }
                }
            });
        });
    });

    // === Register Form Alert ===

    // Select the form with ID "registerForm"
    const registerForm = document.querySelector('form#registerForm');

    // If the form exists on the page
    if (registerForm) {
        // Add a listener for form submission
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop the default form submission
            alert('Thank you for registering!'); // Show success message
            this.submit(); // Submit the form manually (optional)
        });
    }

    // === Booking Form Alert ===

    // Select the form with ID "bookingForm"
    const bookingForm = document.querySelector('form#bookingForm');

    // If the form exists on the page
    if (bookingForm) {
        // Add a listener for form submission
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Stop the default form submission
            alert('Booking confirmed successfully!'); // Show confirmation message
            this.submit(); // Submit the form manually (optional)
        });
    }
});

// === Calendar Functionality ===

// Set current date to today's date
let currentDate = new Date();

// Get saved events from localStorage or use an empty object
let events = JSON.parse(localStorage.getItem('calendarEvents')) || {};

// Store the date user clicked on
let selectedDate = '';

// Renders the calendar grid for a given date
function renderCalendar(date) {
    // Get the container that holds all day squares
    const daysContainer = document.getElementById('days');

    // Get the label that shows the current month and year
    const monthYear = document.getElementById('monthYear');

    // Clear any existing day cells
    daysContainer.innerHTML = '';

    // Get the year and month from the passed-in date
    const year = date.getFullYear();
    const month = date.getMonth();

    // Get the day of the week the month starts on (0 = Sunday)
    const firstDay = new Date(year, month, 1).getDay();

    // Get the total number of days in the month
    const lastDate = new Date(year, month + 1, 0).getDate();

    // Display the name of the month and the year
    monthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

    // Add empty cells before the first day of the month (for alignment)
    for (let i = 0; i < firstDay; i++) {
        daysContainer.innerHTML += `<div></div>`;
    }

    // Add day cells for each day of the month
    for (let i = 1; i <= lastDate; i++) {
        // Format the full date as yyyy-mm-dd
        const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;

        // Create a div element for the day
        const dayDiv = document.createElement('div');
        dayDiv.textContent = i; // Set the number
        dayDiv.classList.add('day'); // Add a base class

        // If this day has a saved event, mark it visually
        if (events[fullDate]) {
            dayDiv.classList.add('has-event');
        }

        // When the day is clicked, show the event info
        dayDiv.addEventListener('click', () => showEventDetails(fullDate));

        // Add the day to the calendar
        daysContainer.appendChild(dayDiv);
    }

    // Highlight today's date if it's visible
    highlightToday();
}

// Show details about the selected event/date
function showEventDetails(date) {
    selectedDate = date; // Store the selected date

    // Show the date
    document.getElementById('eventDateDisplay').textContent = `Date: ${date}`;

    // Show the event description or "no event"
    document.getElementById('eventInfo').textContent = events[date] || 'No event for this date';

    // Fill the input with the current event if any
    document.getElementById('eventInput').value = events[date] || '';
}

// Save or update the event in localStorage
function saveEvent() {
    const input = document.getElementById('eventInput').value;

    if (input.trim()) {
        // Save the trimmed input under the selected date
        events[selectedDate] = input.trim();
        
    } else {
        // If input is empty, remove the event
        delete events[selectedDate];
    }

    // Save updated events to localStorage
    localStorage.setItem('calendarEvents', JSON.stringify(events));

    // Refresh the calendar and details view
    renderCalendar(currentDate);
    showEventDetails(selectedDate);
}

// Delete the selected event from calendar
function deleteEvent() {
    if (selectedDate && events[selectedDate]) {
        delete events[selectedDate]; // Remove it from the object
        localStorage.setItem('calendarEvents', JSON.stringify(events)); // Save changes
        renderCalendar(currentDate); // Refresh calendar
        showEventDetails(selectedDate); // Clear details
    }
}

// Go to the previous month
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1); // Go back one month
    renderCalendar(currentDate); // Refresh calendar
}

// Go to the next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1); // Go forward one month
    renderCalendar(currentDate); // Refresh calendar
}

// Highlight today's date on the calendar (if visible)
function highlightToday() {
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();

    // Get displayed month and year
    const [monthName, yearText] = document.getElementById('monthYear').textContent.split(' ');
    const monthIndex = new Date(`${monthName} 1, ${yearText}`).getMonth();

    // Loop through each day box
    document.querySelectorAll('.day').forEach(day => {
        // Check if this day is today
        if (
            parseInt(day.textContent) === todayDate &&
            monthIndex === todayMonth &&
            parseInt(yearText) === todayYear
        ) {
            day.classList.add('highlight-today'); // Add highlight class
        }
    });
}

// Render the calendar for the first time when page loads
renderCalendar(currentDate);


// نحدد كل عناصر <li> الموجودة داخل العنصر الذي يحتوي على الكلاس "switcher"
const switcherItems = document.querySelectorAll('.switcher li');

// نعمل حلقة تمر على كل عنصر <li>
switcherItems.forEach(item => {
  // نضيف حدث عند الضغط (click) على كل عنصر
  item.addEventListener('click', function () {
    // عند الضغط، نشيل الكلاس "active" من كل العناصر (عشان نمنع تكرار التحديد)
    switcherItems.forEach(li => li.classList.remove('active'));
    
    // نضيف الكلاس "active" للعنصر اللي تم الضغط عليه
    this.classList.add('active');
  });
});
