let editingEventId = null;

const eventTitle = document.getElementById("eventTitle");
const eventType = document.getElementById("eventType");
const eventWith = document.getElementById("eventWith");
const eventLink = document.getElementById("eventLink");
const eventColor = document.getElementById("eventColor");
const dayTitle = document.getElementById("dayTitle");
const dayEvents = document.getElementById("dayEvents");

document.getElementById("saveEventBtn").onclick = () => {

  // 🔴 GARANTE QUE HÁ DATA SELECIONADA
  if (!window.selectedDates || window.selectedDates.length === 0) {
    alert("Selecione pelo menos um dia no calendário.");
    return;
  }

  const title = eventTitle.value.trim();
  if (!title) {
    alert("Informe o nome do projeto.");
    return;
  }

  let events = getEvents();

  if (editingEventId) {
    // ✏️ EDITAR EVENTO
    events = events.map(e =>
      e.id === editingEventId
        ? {
            ...e,
            title,
            type: eventType.value,
            withWho: eventWith.value,
            link: eventLink.value,
            color: eventColor.value
          }
        : e
    );
    editingEventId = null;

  } else {
    // ➕ CRIAR NOVOS EVENTOS
    window.selectedDates.forEach(date => {
      events.push({
        id: crypto.randomUUID(),
        title,
        type: eventType.value,
        withWho: eventWith.value,
        link: eventLink.value,
        color: eventColor.value,
        date
      });
    });
  }

  saveEvents(events);

  // 🔄 LIMPA ESTADO
  window.selectedDates = [];
  eventTitle.value = "";
  eventWith.value = "";
  eventLink.value = "";
  editingEventId = null;

  updateProjectFilter();
  renderCalendar();
  dayEvents.innerHTML = "";
  dayTitle.textContent = "Eventos do dia";

  alert("Evento salvo com sucesso!");
};

function showDayEvents(date) {
  activeDate = date;
  const events = getEvents().filter(e => e.date === date);

  dayTitle.textContent = `Eventos em ${new Date(date).toLocaleDateString("pt-BR")}`;
  dayEvents.innerHTML = "";

  if (events.length === 0) {
    dayEvents.innerHTML = "<p class='text-sm text-slate-500'>Nenhum evento neste dia.</p>";
    return;
  }

  events.forEach(e => {
    const div = document.createElement("div");
    div.className = "event-card";
    div.style.borderColor = e.color;

    div.innerHTML = `
      <strong>${e.title}</strong><br>
      ${e.type} ${e.withWho ? "• " + e.withWho : ""}<br>
      ${e.link ? `<a href="${e.link}" target="_blank">Abrir link</a>` : ""}
      <div class="event-actions">
        <span onclick="editEvent('${e.id}')">Editar</span> |
        <span onclick="deleteEvent('${e.id}')">Excluir</span>
      </div>
    `;

    dayEvents.appendChild(div);
  });
}

function editEvent(id) {
  const e = getEvents().find(ev => ev.id === id);
  if (!e) return;

  eventTitle.value = e.title;
  eventType.value = e.type;
  eventWith.value = e.withWho || "";
  eventLink.value = e.link || "";
  eventColor.value = e.color;

  window.selectedDates = [e.date];
  editingEventId = id;

  renderCalendar();
  showDayEvents(e.date);
}

function deleteEvent(id) {
  saveEvents(getEvents().filter(e => e.id !== id));
  updateProjectFilter();

  if (activeDate) showDayEvents(activeDate);
  renderCalendar();
}
