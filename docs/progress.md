# Progress

## 17 October 2026 - layout and venue data

- Read the project brief and submission instructions.
- Chose a theatre layout with 288 seats and three prices.
- Defined row names, seat counts and fixed unavailable seat IDs.
- Added the page structure, a layout sketch and responsive CSS.
- Used JavaScript to display prices and the total seat count.

A separate functional prototype was explored during planning. This repository starts with the simpler layout and data model so the implementation can be developed and understood step by step. The prototype is not the submitted version.

## 20 October 2026 - seat generation and inspection

- Added `createSeats()` to expand the section and row data into 288 seat records.
- Replaced the sketch on the page with individual seat buttons and row labels.
- Kept stable seat IDs in the form section-row-number and gaps for the two aisles.
- Added inspection details for section, row, seat number, category, price and availability.
- Added styles for available, inspected and unavailable seats. Selecting another seat clears the previous inspection outline.
- Kept inspection separate from ticket selection. Cart actions are still pending.
- Added arrow-key navigation, descriptive button labels, sideways map scrolling and a link to the details panel.
- Checked the generated IDs and prices, inspection behavior, unavailable seats, keyboard and touch interaction, and five browser widths.

## Next working session

- Add Zoom In, Zoom Out, the four direction buttons and Reset/Center View.
- Add the explicit ADD TO CART action, an in-cart state and duplicate prevention.
- Add cart removal and total-price calculation, keeping the map synchronized.
- Store and restore cart IDs using localStorage.

## Submission reminders

The brief requires genuine development across four weeks, with at least three meaningful commits each week. Work started late, and the deadline is 8 November 2026. Clarify the late-start requirement with the instructor. Keep the real dates and commit only genuine changes.

The final submission needs a public repository, a personally narrated 4-6 minute demonstration on OneDrive with generated automatic subtitles, and a 1-2 page PDF report identifying the exact final commit. None of those final-version claims should be made for this starting version.
