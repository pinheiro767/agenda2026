let currentDate = new Date();
let selectedDates = [];
let activeDate = null;

const calendarGrid = document.getElementById("calendarGrid");
const monthTitle = document.getElementById("monthTitle");

function renderCalendar() {
  calendarGrid.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  monthTitle.textContent = currentDate.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  const events = getEvents();
  const filter = getActiveProjectFilter();
  const todayStr = new Date().toISOString().split("T")[0];

  for (let d = 1; d <= days; d++) {
    const date = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const cell = document.createElement("div");
    cell.className = "calendar-day";

    if (date === todayStr) cell.classList.add("today");
    if (selectedDates.includes(date)) cell.classList.add("selected");

    cell.innerHTML = `<strong>${d}</strong><div></div>`;

    const dots = cell.querySelector("div");

    events.filter(e =>
      e.date === date &&
      (filter === "all" || e.title === filter)
    ).forEach(e => {
      const dot = document.createElement("span");
      dot.className = "event-dot";
      dot.style.background = e.color;
      dots.appendChild(dot);
    });

    cell.onclick = () => toggleDate(date);
    cell.ondblclick = () => showDayEvents(date);

    calendarGrid.appendChild(cell);
  }
}

function toggleDate(date) {
  if (selectedDates.includes(date)) {
    selectedDates = selectedDates.filter(d => d !== date);
  } else {
    selectedDates.push(date);
  }
  renderCalendar();
}

document.getElementById("prevMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  selectedDates = [];
  renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  selectedDates = [];
  renderCalendar();
};

document.getElementById("todayBtn").onclick = () => {
  currentDate = new Date();
  selectedDates = [];
  renderCalendar();
};

renderCalendar();
