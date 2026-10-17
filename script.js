// Show the chosen sections and prices using the venue data.
const sectionList = document.getElementById("section-list");
let totalSeats = 0;

for (const section of venue.sections) {
  const row = document.createElement("tr");
  const sectionCell = document.createElement("td");
  const rowsCell = document.createElement("td");
  const priceCell = document.createElement("td");

  sectionCell.textContent = section.name;
  rowsCell.textContent = section.rows[0] + "-" + section.rows[section.rows.length - 1];
  priceCell.textContent = "£" + (section.price / 100).toFixed(2);

  row.append(sectionCell, rowsCell, priceCell);
  sectionList.appendChild(row);
  totalSeats += section.rows.length * venue.seatsPerRow;
}

const availableSeats = totalSeats - venue.unavailableSeats.length;
document.getElementById("seat-summary").textContent =
  totalSeats + " seats in total. " + venue.unavailableSeats.length +
  " seats are marked unavailable, leaving " + availableSeats + " available.";
