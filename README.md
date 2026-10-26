# Aster Theatre - WM1 project

Farid Guliyev

An interactive ticket-selection website for Web & Mobile I. I chose a theatre with 288 seats, split into Orchestra, Dress Circle and Balcony.

## Current stage

**Navigation and cart - 26 October 2026.** This is the third development stage. Final testing, the demonstration and the report are still to come.

What is included:

- A responsive HTML and CSS page with 288 seat buttons generated from the venue data.
- Seat details showing section, row, number, category, price and availability.
- Separate styles for available, inspected, in-cart and unavailable seats.
- Seven map controls: Zoom In, Zoom Out, Move Up, Move Down, Move Left, Move Right and Reset/Center View.
- Explicit ADD TO CART, duplicate prevention, removal, individual prices and a running total.
- Cart IDs saved in localStorage and restored on reload, including the in-cart map state.
- Keyboard navigation between seats and a link to the details panel on smaller screens.

Clicking a seat only inspects it. Use ADD TO CART in the details panel to select a ticket. Unavailable seats can be inspected, but cannot be added. This is a browser demonstration and does not reserve real tickets.

## Run

There are no dependencies or build steps. For consistent browser storage behavior, serve the project from its folder:

```sh
python3 -m http.server 8000
```

Then open `http://localhost:8000`. Keep using the same browser and address to restore the saved cart. Opening `index.html` directly also displays the page, but storage on file URLs depends on the browser.

## Venue plan

| Section | Rows | Seats | Price |
| --- | --- | --- | --- |
| Orchestra | A-D | 96 | GBP 85 |
| Dress Circle | E-H | 96 | GBP 60 |
| Balcony | J-M | 96 | GBP 35 |

Each row contains 24 seats. Aisles are after seats 8 and 16. The data marks 26 seats unavailable. Prices are stored in pence. Row I is skipped to avoid confusion with the number 1.

## Files

- `index.html`: page layout, controls and cart panel.
- `style.css`: responsive layout and seat states.
- `venue.js`: venue data and `createSeats()`, which makes the individual seat records.
- `script.js`: map generation, inspection, keyboard focus, cart and saved selections.
- `navigation.js`: map zoom, movement, limits and centering.
- `assets/venue-plan.svg`: original layout sketch, kept as a design reference.
- `docs/progress.md`: actual progress and next steps.
- `docs/testing.md`: checks for the current stage.

## Using the map and cart

The map starts with the complete venue fitted inside its frame. Zoom In enlarges it in 25% steps, up to 400% of the fitted view. The direction buttons move the map; movement is limited so the venue stays reachable. Reset/Center View shows the complete venue again. Resizing the window or rotating a phone also refits the map.

Click a seat to inspect it, then use ADD TO CART. Added seats show a tick. The inspection outline stays separate from the cart state, so inspecting another seat does not remove any tickets. Use Remove beside a ticket to return it to the available state and update the total.

With a keyboard, Tab into the seats, use the arrow keys to move, and press Enter or Space to inspect. Arrow keys move focus without changing the inspected seat. Focused seats are brought into view when zoomed. Use the "View seat details" link below the map to reach the details panel.

Only seat IDs and a format version are saved under `wm1-aster-theatre-cart`. Prices and availability come from the current venue data. Restoration ignores duplicate, unknown and unavailable IDs. A damaged saved value or blocked browser storage produces a visible warning. The cart can still be used during that visit if saving is blocked. Open tabs using the same address also receive cart updates.

## Next steps

1. Complete the final browser, device and responsiveness review.
2. Consider optional mouse-wheel zoom and dragging.
3. Record the demonstration and finish the PDF report with the final commit reference.

The assignment deadline is 8 November 2026. Commits should record actual work when it happens; they should not be backdated or made only to increase the count.
