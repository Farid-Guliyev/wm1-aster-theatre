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

## 26 October 2026 - navigation and cart

- Added the seven required map controls, with zoom limits, bounded movement and a full-map reset.
- Replaced sideways scrolling with a map frame that fits the venue on resize. Keyboard focus brings offscreen seats into view when zoomed.
- Added explicit ADD TO CART, disabled adding for unavailable or already selected seats, and guarded the handler against duplicates.
- Added ticket removal, individual prices, an integer-pence total and synchronized in-cart seat styles.
- Saved cart IDs using localStorage and restored valid selections on reload. Unknown, duplicate and unavailable saved IDs are ignored.
- Added warnings for damaged or blocked storage and cart synchronization between open tabs.
- Passed 25 browser checks covering the existing seat data and inspection, cart actions, persistence, navigation, keyboard use, five screen widths and emulated touch. Reviewed desktop and phone screenshots.

## 6 November 2026 - integration and final quality

- Re-read and checked both assignment documents against the implementation and submission evidence.
- Added pointer-centred mouse-wheel zoom and left-button dragging. Kept all seven required buttons and prevented a drag from inspecting a seat.
- Added a movement threshold, pointer capture and release/cancel handling. Corrected Safari drag handling after a direct browser check and prevented text selection while panning.
- Removed the in-progress banner and development plan from the booking page; kept development notes in the documentation.
- Passed 33 Chrome checks, including all available seats in one cart, storage edge cases, mouse and keyboard navigation, five viewport widths and touch emulation.
- Reviewed desktop and phone screenshots and carried out a manual Safari smoke check. Firefox and physical-device testing are not claimed.
- Confirmed public repository access and documented the weekly commit shortfall.
- Prepared a requirement checklist and a timed recording guide. The separate report draft must identify this final source commit and still needs the public video link.

## Remaining submission work

- Record the personally narrated demonstration and upload it to OneDrive.
- Confirm automatic subtitles have generated and the video link is publicly accessible.
- Add the video URL to the report, verify the exact final source hash and screenshot, and submit all three required components.
- Discuss the incomplete weekly commit evidence with the instructor.

## Submission reminders

The brief requires genuine development across four weeks, with at least three meaningful commits each week. Work started late, and the deadline is 8 November 2026. Clarify the late-start requirement with the instructor. Keep the real dates and commit only genuine changes.

The final submission needs a public repository, a personally narrated 4-6 minute demonstration on OneDrive with generated automatic subtitles, and a 1-2 page PDF report identifying the exact final commit. Source completion alone does not complete those submission steps.
