let currentDate = new Date();

// 🔴 TORNA GLOBAL (events.js consegue acessar)
window.selectedDates = [];
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

  // 🟢 FILTRO SEGURO (não quebra)
  const filter = typeof getActiveProjectFilter === "function"
    ? getActiveProjectFilter()
    : "all";

  const todayStr = new Date().toISOString().split("T")[0];

  for (let d = 1; d <= days; d++) {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

    const cell = document.createElement("div");
    cell.className = "calendar-day";

    if (date === todayStr) cell.classList.add("today");
    if (window.selectedDates.includes(date)) cell.classList.add("selected");

    cell.innerHTML = `<strong>${d}</strong><div class="dots"></div>`;
    const dots = cell.querySelector(".dots");

    events
      .filter(e =>
        e.date === date &&
        (filter === "all" || e.title === filter)
      )
      .forEach(e => {
        const dot = document.createElement("span");
        dot.className = "event-dot";
        dot.style.background = e.color;
        dots.appendChild(dot);
      });

    // 🟢 CLIQUE ÚNICO FUNCIONA NO MOBILE
    cell.onclick = () => {
      toggleDate(date);
      showDayEvents(date);
    };

    calendarGrid.appendChild(cell);
  }
}

function toggleDate(date) {
  if (window.selectedDates.includes(date)) {
    window.selectedDates = window.selectedDates.filter(d => d !== date);
  } else {
    window.selectedDates.push(date);
  }
  renderCalendar();
}

document.getElementById("prevMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  window.selectedDates = [];
  renderCalendar();
};

document.getElementById("nextMonth").onclick = () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  window.selectedDates = [];
  renderCalendar();
};

document.getElementById("todayBtn").onclick = () => {
  currentDate = new Date();
  window.selectedDates = [];
  renderCalendar();
};

renderCalendar();
