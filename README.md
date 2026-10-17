# Aster Theatre - WM1 project

Farid Guliyev

An interactive ticket-selection website for Web & Mobile I. I chose a theatre with 288 seats, split into Orchestra, Dress Circle and Balcony.

## Current stage

**Layout and venue data - 17 October 2026.** This is an incomplete starting version, not the final submission.

What is included:

- Basic HTML and responsive CSS layout.
- A venue layout sketch with three sections and two aisles.
- A JavaScript data model for the rows, prices and unavailable seats.
- A section table and seat count generated from the data.

Seat buttons, inspection, navigation, cart and localStorage are not implemented in this version yet.

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
- `venue.js`: venue data.
- `script.js`: displays the section table and seat totals.
- `assets/venue-plan.svg`: layout sketch.
- `docs/progress.md`: actual progress and next steps.

## Next steps

1. Generate individual seat buttons from the data.
2. Add inspection details and the four seat states.
3. Add the required navigation buttons and a synchronized cart.
4. Save and restore tickets with localStorage.
5. Test responsiveness and edge cases, and consider mouse navigation.
6. Record the demonstration and finish the PDF report.

The assignment deadline is 8 November 2026. Commits should record actual work when it happens; they should not be backdated or made only to increase the count.
