// Each section has 4 rows, with 24 seats in each row.
// Seat numbers run from 1 to 24, with aisles after seats 8 and 16.
// Prices are stored in pence to make total calculations exact.
const venue = {
  name: "Aster Theatre",
  currency: "GBP",
  seatsPerRow: 24,
  sections: [
    {
      id: "orchestra",
      name: "Orchestra",
      rows: ["A", "B", "C", "D"],
      category: "Premium",
      price: 8500,
      color: "#d6ae6e"
    },
    {
      id: "circle",
      name: "Dress Circle",
      rows: ["E", "F", "G", "H"],
      category: "Classic",
      price: 6000,
      color: "#83ae9b"
    },
    {
      id: "balcony",
      name: "Balcony",
      rows: ["J", "K", "L", "M"],
      category: "Value",
      price: 3500,
      color: "#a8add0"
    }
  ],
  // Format: section-row-seat. These stay the same when the page reloads.
  unavailableSeats: [
    "orchestra-A-4", "orchestra-A-5", "orchestra-A-17",
    "orchestra-B-11", "orchestra-B-12", "orchestra-C-2",
    "orchestra-C-19", "orchestra-D-7", "orchestra-D-8", "orchestra-D-23",
    "circle-E-9", "circle-E-10", "circle-F-3", "circle-F-21",
    "circle-G-14", "circle-G-15", "circle-H-5", "circle-H-24",
    "balcony-J-6", "balcony-J-7", "balcony-K-16", "balcony-K-17",
    "balcony-L-1", "balcony-L-12", "balcony-M-20", "balcony-M-21"
  ]
};

// Turn the section and row data into individual seat records.
function createSeats() {
  const seats = [];

  for (const section of venue.sections) {
    for (const row of section.rows) {
      for (let number = 1; number <= venue.seatsPerRow; number++) {
        const id = section.id + "-" + row + "-" + number;
        seats.push({
          id: id,
          sectionId: section.id,
          sectionName: section.name,
          row: row,
          number: number,
          category: section.category,
          price: section.price,
          unavailable: venue.unavailableSeats.includes(id)
        });
      }
    }
  }

  return seats;
}
