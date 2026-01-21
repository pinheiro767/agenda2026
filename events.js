let editingEventId = null;

document.getElementById("saveEventBtn").onclick = () => {
  const title = eventTitle.value.trim();
  if (!title || selectedDates.length === 0) return;

  let events = getEvents();

  if (editingEventId) {
    events = events.map(e =>
      e.id === editingEventId
        ? { ...e, title, type:eventType.value, withWho:eventWith.value, link:eventLink.value, color:eventColor.value }
        : e
    );
    editingEventId = null;
  } else {
    selectedDates.forEach(date => {
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
  selectedDates = [];
  updateProjectFilter();
  renderCalendar();
};

function showDayEvents(date) {
  activeDate = date;
  const events = getEvents().filter(e => e.date === date);

  dayTitle.textContent = `Eventos em ${new Date(date).toLocaleDateString("pt-BR")}`;
  dayEvents.innerHTML = "";

  events.forEach(e => {
    const div = document.createElement("div");
    div.className = "event-card";
    div.style.borderColor = e.color;

    div.innerHTML = `
      <strong>${e.title}</strong><br>
      ${e.type} ${e.withWho ? "• "+e.withWho : ""}<br>
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
  eventWith.value = e.withWho;
  eventLink.value = e.link;
  eventColor.value = e.color;

  selectedDates = [e.date];
  editingEventId = id;
  renderCalendar();
}

function deleteEvent(id) {
  saveEvents(getEvents().filter(e => e.id !== id));
  updateProjectFilter();
  renderCalendar();
  dayEvents.innerHTML = "";
}
