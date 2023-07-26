function getGridSize(gridId) {
  const columns = Math.floor(document.getElementById(gridId).offsetWidth / 14);
  const rows = Math.floor(document.getElementById(gridId).offsetHeight / 14);

  return { columns, rows };
}

// Replace random colors to match scheme
const colors = [
  "#b2f2ac",
  "#fea3a4",
  "#a3b9fe",
  "#a8f19f",
  "#beb3f5",
  "#f2dc81",
  "#caa9e8",
  "#97eceb",
  "#ecae97",
  "#f3c57b",
  "#878787",
  "#87b8dd",
  "#87dd92",
  "#a2eaba",
  "#a2ead9"
];
function randomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function handleStagger(event, gridId) {
  const { columns, rows } = getGridSize(gridId);
  const el = event.target.id;
  anime({
    targets: `#${gridId} .color-coord`,
    backgroundColor: randomColor(),
    delay: anime.stagger(30, { grid: [columns, rows], from: el })
  });
}

function renderGrid(gridId) {
  const { columns, rows } = getGridSize(gridId);
  const total = rows * columns;
  const gridContainer = document.getElementById(gridId);

  let gridHTML = "";
  for (let i = 0; i < total; i++) {
    gridHTML += `<div class="color-coord" id="${i}" onclick="handleStagger(event, '${gridId}')"></div>`;
  }

  gridContainer.innerHTML = gridHTML;
}

function initializeGrid(gridId) {
  renderGrid(gridId);
  window.addEventListener("resize", () => renderGrid(gridId));
}

// Initialize both grids when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeGrid("color-grid_cdj");
  initializeGrid("color-grid_peace");
});
