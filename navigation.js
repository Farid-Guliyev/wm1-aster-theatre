const mapViewport = document.getElementById("map-viewport");
const map = document.querySelector(".venue-map");
let fitScale = 1;
let zoom = 1;
let mapX = 0;
let mapY = 0;

function clamp(value, minimum, maximum) {
  return Math.max(minimum, Math.min(maximum, value));
}

function mapScale() {
  return fitScale * zoom;
}

// Leave a small margin for movement, but never allow the map to disappear.
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

function changeZoom(amount) {
  const oldScale = mapScale();
  zoom = clamp(zoom + amount, 1, 4);
  const ratio = mapScale() / oldScale;
  const centreX = mapViewport.clientWidth / 2;
  const centreY = mapViewport.clientHeight / 2;
  mapX = centreX - (centreX - mapX) * ratio;
  mapY = centreY - (centreY - mapY) * ratio;
  drawMap();
}

function moveMap(x, y) {
  mapX += x;
  mapY += y;
  drawMap();
}

// Keyboard focus can reach a seat outside the current view. Bring it back inside.
function keepSeatVisible(button) {
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
  // Focusing a clipped element can make the browser scroll an overflow:hidden box.
  mapViewport.scrollLeft = 0;
  mapViewport.scrollTop = 0;
  drawMap();
}

document.getElementById("zoom-in").addEventListener("click", () => changeZoom(0.25));
document.getElementById("zoom-out").addEventListener("click", () => changeZoom(-0.25));
document.getElementById("move-up").addEventListener("click", () => moveMap(0, -60));
document.getElementById("move-down").addEventListener("click", () => moveMap(0, 60));
document.getElementById("move-left").addEventListener("click", () => moveMap(-60, 0));
document.getElementById("move-right").addEventListener("click", () => moveMap(60, 0));
document.getElementById("reset-view").addEventListener("click", resetView);

// Fit the complete venue again when the viewport changes, including phone rotation.
new ResizeObserver(resetView).observe(mapViewport);
resetView();
