// filters.js

function getActiveProjectFilter() {
  const select = document.getElementById("projectFilter");
  return select ? select.value : "all";
}
