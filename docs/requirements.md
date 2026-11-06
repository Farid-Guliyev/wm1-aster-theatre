# Requirement review - 6 November 2026

Reviewed against both supplied WM1 PDFs: Interactive Venue Ticketing System and Project Submission Instructions. The source implementation and final submission materials are separate checks.

## Application

| Requirement | Implementation / evidence |
| --- | --- |
| HTML, CSS and JavaScript front end | Buildless page; no backend or dependencies required to run. |
| Substantial venue with multiple zones and prices | Theatre with 288 seats, 12 rows, 3 sections, 3 prices and 2 aisles per row. |
| Generate repeated seats from JavaScript data | `venue.js` / `createSeats()` and `script.js` / `generateVenue()`. No copied seat markup. |
| Individual interactive seats | 288 native buttons, stable IDs and descriptive labels. |
| Inspect before adding | Seat click updates details only. ADD TO CART is a separate action. |
| Identifying details and price | Section, row, seat, category, price and status in the details panel. |
| Four seat states | Section colors for available, outline for inspected, dark tick for in cart, grey cross for unavailable. |
| Seven visible navigation controls | Zoom In/Out, Move Up/Down/Left/Right and Reset/Center View. |
| Sensible navigation limits | Zoom from 100% to 400% of the fitted view; bounded movement; reset fits the whole venue. |
| Cart items, prices, total and removal | Individual cart entries and integer-pence total; Remove updates the map and details. |
| Duplicate / unavailable prevention | Add button disabled and handler guards both cases. Restoration also filters invalid seats. |
| localStorage persistence | Versioned seat IDs saved and restored with matching map states. Warnings for damaged or blocked storage. |
| Responsive interface | Checked at 320, 390, 768, 1024 and 1440 pixels, plus keyboard and emulated touch. |
| Optional 10% mouse bonus | Wheel zoom around the pointer and left-button dragging, while all required buttons remain available. A drag does not inspect a seat. |
| Source cleanliness | Only application source, design asset and relevant documentation; no dependency folders, secrets or unrelated files. |

Detailed checks and coverage limits are recorded in `testing.md`.

## Submission evidence

| Requirement | Status |
| --- | --- |
| Public GitHub repository | Confirmed public at `https://github.com/Farid-Guliyev/wm1-aster-theatre`. |
| Complete runnable source | Included; run from the repository root with a static HTTP server. |
| Four weeks, 3 meaningful commits each week, minimum 12 | Not met. The first three dated milestones were 17 October, 20 October and 26 October. The fourth milestone is 6 November. The missing weekly history cannot be reconstructed by artificial commits. Ask the instructor how the late start will be assessed. |
| Descriptive messages and genuine dates | Retained. No backdating or empty commits. |
| Own narrated 4-6 minute screen demonstration | Still needs recording and verification; see `demo-guide.md` for the required sequence. |
| Public OneDrive video with generated automatic subtitles | Pending video upload, accessible link and successful subtitle generation. |
| 1-2 page PDF report | A separate report draft can be prepared from the tested final commit. It must not be submitted while the video URL is missing. |
| Report name / ID / title / venue image / repository URL | Farid Guliyev, 21464; Aster Theatre; screenshot of the final source version. |
| Report exact final hash | Obtain with `git rev-parse HEAD` after the final source commit. The report stays outside the source commit so it can identify that exact version. |
| Venue summary / implemented features / 3-5 sentence implementation note | Include in the report. |
| Bonus and limitations | Describe the tested mouse features; state browser/device verification limits and the incomplete progress evidence. |
| Repository, video and report match | Verify after recording. Any later source changes require a new final hash and a matching demonstration. |

## Before submitting on 8 November 2026

- Record and upload the demonstration; check the public link and generated subtitles.
- Insert the video URL into the report and export the final PDF with the exact source hash and venue screenshot.
- Recheck repository access without signing in.
- Submit all three components through the course system.
- Discuss the weekly commit shortfall with the instructor; do not describe it as satisfied.
