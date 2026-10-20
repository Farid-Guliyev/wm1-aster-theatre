const seats = createSeats();
const sectionList = document.getElementById("section-list");
const seatSections = document.getElementById("seat-sections");
const seatButtons = [];
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

  const unavailableCount = seats.filter(seat => seat.unavailable).length;
  document.getElementById("seat-summary").textContent =
    seats.length + " seats in total. " + unavailableCount +
    " seats are marked unavailable, leaving " + (seats.length - unavailableCount) + " available.";
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
        button.textContent = seat.unavailable ? "×" : seat.number;
        button.setAttribute("aria-pressed", "false");

        const status = seat.unavailable ? "Unavailable" : "Available";
        const label = seat.sectionName + ", row " + seat.row + ", seat " + seat.number +
          ", " + formatPrice(seat.price) + ", " + status + ". Inspect details.";
        button.setAttribute("aria-label", label);
        button.title = label;

        if (seat.unavailable) button.classList.add("unavailable");
        if (seat.number === 9 || seat.number === 17) button.classList.add("aisle-before");

        button.addEventListener("click", () => inspectSeat(seat));
        button.addEventListener("keydown", event => moveSeatFocus(event, seatIndex));
        button.addEventListener("focus", () => {
          seatButtons[focusedSeatIndex].tabIndex = -1;
          focusedSeatIndex = seatIndex;
          button.tabIndex = 0;
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

// Inspection only changes the highlighted seat and the details panel.
function inspectSeat(seat) {
  if (inspectedSeatId !== null) {
    const previousButton = document.getElementById("seat-" + inspectedSeatId);
    previousButton.classList.remove("inspecting");
    previousButton.setAttribute("aria-pressed", "false");
  }

  inspectedSeatId = seat.id;
  const button = document.getElementById("seat-" + seat.id);
  button.classList.add("inspecting");
  button.setAttribute("aria-pressed", "true");

  document.getElementById("details-empty").hidden = true;
  document.getElementById("seat-details").hidden = false;
  document.getElementById("details-link").hidden = false;
  document.getElementById("detail-section").textContent = seat.sectionName;
  document.getElementById("detail-row").textContent = seat.row;
  document.getElementById("detail-number").textContent = seat.number;
  document.getElementById("detail-category").textContent = seat.category;
  document.getElementById("detail-price").textContent = formatPrice(seat.price);
  document.getElementById("detail-status").textContent = seat.unavailable ? "Unavailable" : "Available";

  const message = seat.unavailable ?
    "This seat is unavailable and cannot be added to the cart." :
    "This seat is available. Inspecting it has not added a ticket.";
  document.getElementById("detail-message").textContent = message;
  document.getElementById("inspection-summary").textContent =
    seat.sectionName + ", row " + seat.row + ", seat " + seat.number + " - " +
    formatPrice(seat.price) + ". " + message;
}

// One seat is in the Tab order; arrow keys move focus without inspecting.
function moveSeatFocus(event, index) {
  const offsets = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -venue.seatsPerRow,
    ArrowDown: venue.seatsPerRow
  };
  if (!(event.key in offsets)) return;

  event.preventDefault();
  const nextIndex = Math.max(0, Math.min(seatButtons.length - 1, index + offsets[event.key]));
  seatButtons[nextIndex].focus({ preventScroll: true });
  seatButtons[nextIndex].scrollIntoView({ block: "nearest", inline: "nearest" });
}

showSectionPrices();
generateVenue();
