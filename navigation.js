const mapViewport = document.getElementById("map-viewport");
const map = document.querySelector(".venue-map");
let fitScale = 1;
let zoom = 1;
let mapX = 0;
let mapY = 0;
let drag = null;
let ignoreDragClick = false;

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function mapScale() {
  return fitScale * zoom;
}

// Keep the map within reach.
function limitPosition(position, viewportSize, mapSize) {
  const margin = 24;
  if (mapSize <= viewportSize) {
    return clamp(position, -margin, viewportSize - mapSize + margin);
  }
  return clamp(position, viewportSize - mapSize - margin, margin);
}

function drawMap() {
  const scale = mapScale();
  mapX = limitPosition(mapX, mapViewport.clientWidth, map.offsetWidth * scale);
  mapY = limitPosition(mapY, mapViewport.clientHeight, map.offsetHeight * scale);
  map.style.transform = "translate(" + mapX + "px, " + mapY + "px) scale(" + scale + ")";
  document.getElementById("zoom-level").textContent = "Zoom: " + Math.round(zoom * 100) + "%";
  document.getElementById("zoom-in").disabled = zoom >= 4;
  document.getElementById("zoom-out").disabled = zoom <= 1;
}

function resetView() {
  fitScale = Math.min(mapViewport.clientWidth / map.offsetWidth,
    mapViewport.clientHeight / map.offsetHeight) * 0.94;
  zoom = 1;
  mapX = (mapViewport.clientWidth - map.offsetWidth * mapScale()) / 2;
  mapY = (mapViewport.clientHeight - map.offsetHeight * mapScale()) / 2;
  drawMap();
}

function changeZoom(amount, centreX = mapViewport.clientWidth / 2, centreY = mapViewport.clientHeight / 2) {
  const oldScale = mapScale();
  zoom = clamp(Math.round((zoom + amount) * 100) / 100, 1, 4);
  const ratio = mapScale() / oldScale;
  mapX = centreX - (centreX - mapX) * ratio;
  mapY = centreY - (centreY - mapY) * ratio;
  drawMap();
}

function moveMap(x, y) {
  mapX += x;
  mapY += y;
  drawMap();
}

// Keep the focused seat visible.
function keepSeatVisible(button) {
  mapViewport.scrollLeft = 0;
  mapViewport.scrollTop = 0;
  const viewport = mapViewport.getBoundingClientRect();
  const seat = button.getBoundingClientRect();
  const left = viewport.left + mapViewport.clientLeft + 8;
  const top = viewport.top + mapViewport.clientTop + 8;
  const right = viewport.left + mapViewport.clientLeft + mapViewport.clientWidth - 8;
  const bottom = viewport.top + mapViewport.clientTop + mapViewport.clientHeight - 8;
  if (seat.left < left) mapX += left - seat.left;
  else if (seat.right > right) mapX -= seat.right - right;
  if (seat.top < top) mapY += top - seat.top;
  else if (seat.bottom > bottom) mapY -= seat.bottom - bottom;
  drawMap();
}

document.getElementById("zoom-in").addEventListener("click", () => changeZoom(0.25));
document.getElementById("zoom-out").addEventListener("click", () => changeZoom(-0.25));
document.getElementById("move-up").addEventListener("click", () => moveMap(0, -60));
document.getElementById("move-down").addEventListener("click", () => moveMap(0, 60));
document.getElementById("move-left").addEventListener("click", () => moveMap(-60, 0));
document.getElementById("move-right").addEventListener("click", () => moveMap(60, 0));
document.getElementById("reset-view").addEventListener("click", resetView);

// Zoom at the mouse position.
mapViewport.addEventListener("wheel", event => {
  if (event.ctrlKey || event.metaKey || event.deltaY === 0) return;
  event.preventDefault();
  const bounds = mapViewport.getBoundingClientRect();
  changeZoom(event.deltaY < 0 ? 0.15 : -0.15,
    event.clientX - bounds.left - mapViewport.clientLeft,
    event.clientY - bounds.top - mapViewport.clientTop);
}, { passive: false });

mapViewport.addEventListener("pointerdown", event => {
  if (event.pointerType !== "mouse" || event.button !== 0 || !event.isPrimary) return;
  ignoreDragClick = false;
  drag = { id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
});

window.addEventListener("pointermove", event => {
  if (!drag || event.pointerId !== drag.id) return;
  const dx = event.clientX - drag.x;
  const dy = event.clientY - drag.y;
  // Small movements still count as a click.
  if (!drag.moved && Math.hypot(dx, dy) < 6) return;
  if (!drag.moved) {
    drag.moved = true;
    drag.mapX = mapX;
    drag.mapY = mapY;
    mapViewport.setPointerCapture(drag.id);
    mapViewport.classList.add("dragging");
  }
  mapX = drag.mapX + dx;
  mapY = drag.mapY + dy;
  drawMap();
});

function finishDrag() {
  if (!drag) return;
  const previous = drag;
  drag = null;
  ignoreDragClick = previous.moved;
  mapViewport.classList.remove("dragging");
  if (mapViewport.hasPointerCapture(previous.id)) mapViewport.releasePointerCapture(previous.id);
}

window.addEventListener("pointerup", event => {
  if (drag && event.pointerId === drag.id) finishDrag();
});
window.addEventListener("pointercancel", finishDrag);
window.addEventListener("blur", finishDrag);
mapViewport.addEventListener("lostpointercapture", finishDrag);
mapViewport.addEventListener("pointerleave", () => {
  if (drag && !drag.moved) finishDrag();
});
mapViewport.addEventListener("click", event => {
  if (!ignoreDragClick || event.detail === 0) return;
  ignoreDragClick = false;
  event.preventDefault();
  event.stopImmediatePropagation();
}, true);

// Fit the map after resizing.
new ResizeObserver(() => {
  finishDrag();
  resetView();
}).observe(mapViewport);
resetView();
