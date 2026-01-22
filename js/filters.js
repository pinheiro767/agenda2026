function getActiveProjectFilter() {
  return document.getElementById("projectFilter").value;
}

function updateProjectFilter() {
  const select = document.getElementById("projectFilter");
  const events = getEvents();

  const projects = [...new Set(events.map(e => e.title))];

  select.innerHTML = `<option value="all">Todos os projetos</option>`;
  projects.forEach(p => {
    select.innerHTML += `<option value="${p}">${p}</option>`;
  });
}

document.getElementById("projectFilter").onchange = renderCalendar;

updateProjectFilter();
