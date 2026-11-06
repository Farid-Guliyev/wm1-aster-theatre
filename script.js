const seats = createSeats();
const sectionList = document.getElementById("section-list");
const seatSections = document.getElementById("seat-sections");
const seatButtons = [];
const cartStorageKey = "wm1-aster-theatre-cart";
let cartIds = new Set();
let inspectedSeatId = null;
let focusedSeatIndex = 0;

function formatPrice(price) {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: venue.currency
  }).format(price / 100);
}

function showSectionPrices() {
  for (const section of venue.sections) {
    const row = document.createElement("tr");
    const sectionCell = document.createElement("td");
    const rowsCell = document.createElement("td");
    const priceCell = document.createElement("td");
    sectionCell.textContent = section.name;
    rowsCell.textContent = section.rows[0] + "-" + section.rows[section.rows.length - 1];
    priceCell.textContent = formatPrice(section.price);
    row.append(sectionCell, rowsCell, priceCell);
    sectionList.appendChild(row);
  }
}

function createRowLabel(row) {
  const label = document.createElement("span");
  label.className = "row-label";
  label.textContent = row;
  label.setAttribute("aria-hidden", "true");
  return label;
}

function generateVenue() {
  for (const section of venue.sections) {
    const sectionElement = document.createElement("section");
    sectionElement.className = "venue-section";
    sectionElement.style.setProperty("--seat-color", section.color);
    sectionElement.setAttribute("aria-labelledby", section.id + "-title");
    const heading = document.createElement("h3");
    heading.id = section.id + "-title";
    heading.textContent = section.name + " - " + formatPrice(section.price);
    sectionElement.appendChild(heading);

    for (const row of section.rows) {
      const rowElement = document.createElement("div");
      rowElement.className = "seat-row";
      rowElement.appendChild(createRowLabel(row));
      const rowSeats = seats.filter(seat => seat.sectionId === section.id && seat.row === row);
      for (const seat of rowSeats) {
        const button = document.createElement("button");
        const seatIndex = seatButtons.length;
        button.type = "button";
        button.id = "seat-" + seat.id;
        button.className = "seat";
        button.dataset.seatId = seat.id;
        button.tabIndex = seatIndex === 0 ? 0 : -1;
        if (seat.number === 9 || seat.number === 17) button.classList.add("aisle-before");
        button.addEventListener("click", () => inspectSeat(seat));
        button.addEventListener("keydown", event => moveSeatFocus(event, seatIndex));
        button.addEventListener("focus", () => {
          seatButtons[focusedSeatIndex].tabIndex = -1;
          focusedSeatIndex = seatIndex;
          button.tabIndex = 0;
          keepSeatVisible(button);
        });
        seatButtons.push(button);
        rowElement.appendChild(button);
      }
      rowElement.appendChild(createRowLabel(row));
      sectionElement.appendChild(rowElement);
    }
    seatSections.appendChild(sectionElement);
  }
}

function seatStatus(seat) {
  if (seat.unavailable) return "Unavailable";
  return cartIds.has(seat.id) ? "In cart" : "Available";
}

function updateSeatStates() {
  for (const seat of seats) {
    const button = document.getElementById("seat-" + seat.id);
    button.classList.toggle("unavailable", seat.unavailable);
    button.classList.toggle("in-cart", cartIds.has(seat.id));
    button.classList.toggle("inspecting", seat.id === inspectedSeatId);
    button.setAttribute("aria-pressed", String(seat.id === inspectedSeatId));
    button.textContent = seat.unavailable ? "×" : cartIds.has(seat.id) ? "✓" : seat.number;
    const label = seat.sectionName + ", row " + seat.row + ", seat " + seat.number +
      ", " + formatPrice(seat.price) + ", " + seatStatus(seat) + ". Inspect details.";
    button.setAttribute("aria-label", label);
    button.title = label;
  }
  const unavailableCount = seats.filter(seat => seat.unavailable).length;
  document.getElementById("seat-summary").textContent = seats.length + " seats in total. " +
    unavailableCount + " unavailable, " + cartIds.size + " in cart, " +
    (seats.length - unavailableCount - cartIds.size) + " available.";
}

// Seat clicks only show details.
function inspectSeat(seat) {
  inspectedSeatId = seat.id;
  updateSeatStates();
  showSeatDetails();
}

function showSeatDetails() {
  const seat = seats.find(item => item.id === inspectedSeatId);
  if (!seat) return;
  const inCart = cartIds.has(seat.id);
  document.getElementById("details-empty").hidden = true;
  document.getElementById("seat-details").hidden = false;
  document.getElementById("details-link").hidden = false;
  document.getElementById("detail-section").textContent = seat.sectionName;
  document.getElementById("detail-row").textContent = seat.row;
  document.getElementById("detail-number").textContent = seat.number;
  document.getElementById("detail-category").textContent = seat.category;
  document.getElementById("detail-price").textContent = formatPrice(seat.price);
  document.getElementById("detail-status").textContent = seatStatus(seat);
  const addButton = document.getElementById("add-to-cart");
  addButton.disabled = seat.unavailable || inCart;
  addButton.textContent = seat.unavailable ? "UNAVAILABLE" : inCart ? "ALREADY IN CART" : "ADD TO CART";
  const message = seat.unavailable ? "This seat is unavailable." :
    inCart ? "Already in your cart. Use Remove to take it out." :
    "Press ADD TO CART to add this seat.";
  document.getElementById("detail-message").textContent = message;
  document.getElementById("inspection-summary").textContent =
    seat.sectionName + ", row " + seat.row + ", seat " + seat.number + " - " +
    formatPrice(seat.price) + ". " + message;
}

function storageWarning(message) {
  const warning = document.getElementById("storage-warning");
  warning.textContent = message;
  warning.hidden = !message;
  document.getElementById("save-note").hidden = Boolean(message);
}

function loadCart() {
  cartIds = new Set();
  try {
    const saved = localStorage.getItem(cartStorageKey);
    if (saved !== null) {
      const data = JSON.parse(saved);
      if (!data || data.version !== 1 || !Array.isArray(data.seatIds)) {
        throw new Error("Invalid saved cart");
      }
      // Check saved seats against the venue data.
      for (const id of data.seatIds) {
        if (seats.some(seat => seat.id === id && !seat.unavailable)) cartIds.add(id);
      }
    }
    storageWarning("");
  } catch (error) {
    storageWarning("Could not load the saved cart. Please choose your seats again.");
  }
}

function saveCart() {
  try {
    localStorage.setItem(cartStorageKey, JSON.stringify({ version: 1, seatIds: [...cartIds] }));
    storageWarning("");
  } catch (error) {
    storageWarning("The cart could not be saved. It may be lost after a reload.");
  }
}

function renderCart() {
  const list = document.getElementById("cart-items");
  list.replaceChildren();
  let total = 0;
  for (const id of cartIds) {
    const seat = seats.find(item => item.id === id);
    total += seat.price;
    const item = document.createElement("li");
    item.dataset.cartSeat = id;
    const details = document.createElement("div");
    const name = document.createElement("strong");
    name.textContent = seat.sectionName + " " + seat.row + seat.number;
    const price = document.createElement("span");
    price.textContent = formatPrice(seat.price);
    details.append(name, price);
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.setAttribute("aria-label", "Remove " + seat.sectionName + " " + seat.row + seat.number);
    remove.addEventListener("click", () => removeTicket(id));
    item.append(details, remove);
    list.appendChild(item);
  }
  document.getElementById("cart-count").textContent = cartIds.size;
  document.getElementById("cart-total").textContent = formatPrice(total);
  document.getElementById("cart-message").hidden = cartIds.size > 0;
}

function refreshSelection() {
  updateSeatStates();
  showSeatDetails();
  renderCart();
}

function addTicket() {
  const seat = seats.find(item => item.id === inspectedSeatId);
  if (!seat || seat.unavailable || cartIds.has(seat.id)) return;
  cartIds.add(seat.id);
  saveCart();
  refreshSelection();
  document.getElementById("cart-feedback").textContent = seat.sectionName + " " + seat.row + seat.number + " added to cart.";
}

function removeTicket(id) {
  const seat = seats.find(item => item.id === id);
  if (!cartIds.delete(id)) return;
  saveCart();
  refreshSelection();
  document.getElementById("cart-feedback").textContent = seat.sectionName + " " + seat.row + seat.number + " removed from cart.";
  // Keep keyboard focus in the cart.
  const nextRemove = document.querySelector("#cart-items button");
  (nextRemove || document.getElementById("cart-title")).focus({ preventScroll: true });
}

// Arrow keys move between seats.
function moveSeatFocus(event, index) {
  const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -venue.seatsPerRow, ArrowDown: venue.seatsPerRow };
  if (!(event.key in offsets)) return;
  event.preventDefault();
  const nextIndex = Math.max(0, Math.min(seatButtons.length - 1, index + offsets[event.key]));
  seatButtons[nextIndex].focus({ preventScroll: true });
}

document.getElementById("add-to-cart").addEventListener("click", addTicket);
window.addEventListener("storage", event => {
  if (event.key !== cartStorageKey && event.key !== null) return;
  loadCart();
  refreshSelection();
  document.getElementById("cart-feedback").textContent = "Cart updated from another tab.";
});
showSectionPrices();
generateVenue();
loadCart();
refreshSelection();
