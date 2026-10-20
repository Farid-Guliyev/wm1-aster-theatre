# Aster Theatre - WM1 project

Farid Guliyev

An interactive ticket-selection website for Web & Mobile I. I chose a theatre with 288 seats, split into Orchestra, Dress Circle and Balcony.

## Current stage

**Seat generation and inspection - 20 October 2026.** This is the second development stage, not the final submission.

What is included:

- Basic HTML and responsive CSS layout.
- A venue map with 288 individual seat buttons, generated from the data.
- A JavaScript data model for the rows, prices and unavailable seats.
- A section table and seat count generated from the data.
- Seat details showing section, row, number, category, price and availability.
- Different styles for available, inspected and unavailable seats.
- Keyboard navigation between seats and sideways scrolling on small screens.

Clicking a seat only inspects it. It does not add a ticket. Unavailable seats can be inspected so their status is clear.

Map navigation buttons, cart actions, the in-cart state and localStorage are planned for the next stage.

## Run

Open `index.html` in a browser. There are no dependencies or build steps.

For a local server, run this from the project folder:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Venue plan

| Section | Rows | Seats | Price |
| --- | --- | --- | --- |
| Orchestra | A-D | 96 | GBP 85 |
| Dress Circle | E-H | 96 | GBP 60 |
| Balcony | J-M | 96 | GBP 35 |

Each row contains 24 seats. Aisles are after seats 8 and 16. The data marks 26 seats unavailable. Prices are stored in pence. Row I is skipped to avoid confusion with the number 1.

## Files

- `index.html`: page layout.
- `style.css`: page styling and small-screen layout.
- `venue.js`: venue data and `createSeats()`, which makes the individual seat records.
- `script.js`: generates the map and prices, handles inspection and keyboard focus.
- `assets/venue-plan.svg`: original layout sketch, kept as a design reference.
- `docs/progress.md`: actual progress and next steps.
- `docs/testing.md`: checks for the current stage.

## Inspect a seat

Click any seat to see its details. Only one seat is outlined as inspected at a time. Unavailable seats show a cross and an explanation in the details panel.

With a keyboard, Tab into the seats, use the arrow keys to move, and press Enter or Space to inspect. Arrow keys move focus without changing the inspected seat. On a narrow screen, scroll the map sideways and use the "View seat details" link below it.

## Next steps

1. Add the required zoom, direction and reset controls.
2. Add explicit ADD TO CART, duplicate prevention, removal and totals.
3. Keep the in-cart map state synchronized with the cart.
4. Save and restore tickets with localStorage.
5. Complete responsiveness and edge-case testing, and consider mouse navigation.
6. Record the demonstration and finish the PDF report.

The assignment deadline is 8 November 2026. Commits should record actual work when it happens; they should not be backdated or made only to increase the count.
