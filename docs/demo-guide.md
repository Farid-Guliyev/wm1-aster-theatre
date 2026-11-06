# Demonstration guide

Aim for 4-6 minutes. Record the working website and narrate it yourself, using your own words. Do not use slides. Keep the public repository on the same commit as the version shown in the recording.

## Before recording

- Start the page with `python3 -m http.server 8000` and open `http://localhost:8000`.
- Remove old cart items so the first inspection clearly starts with an empty cart.
- Have the browser, `venue.js`, `script.js` and the public repository ready.
- Check that the microphone records clearly and the seat labels are readable.

## Recording sequence

| Approximate time | What to show and explain |
| --- | --- |
| 0:00-0:30 | Show the complete venue. Identify it as a theatre with 288 seats, Orchestra at GBP 85, Dress Circle at GBP 60, and Balcony at GBP 35. Point out the aisles, row labels and four seat states. |
| 0:30-1:10 | Use Zoom In, Zoom Out, Move Up, Move Down, Move Left and Move Right. Zoom in enough to make movement obvious. Use Reset/Center View to show the whole venue again. |
| 1:10-1:40 | Click Orchestra A1. Show the details and GBP 85 price while the cart remains empty. Then press ADD TO CART and show its tick and cart entry. |
| 1:40-2:10 | Inspect and add Dress Circle F12. Show its different category and GBP 60 price; the total should become GBP 145. Inspect A1 again to show ALREADY IN CART and demonstrate that no duplicate is added. |
| 2:10-2:40 | Remove A1. Show its map seat returning to available and the total becoming GBP 60. Reload the page and show F12 still in the cart with the matching map tick. |
| 2:40-3:00 | Inspect Orchestra A4. Explain the unavailable state, cross and disabled add button. |
| 3:00-3:35 | Resize to a phone width or use the browser device view. Show the controls wrapping, zoom for readable seats, inspect a seat and use View seat details. |
| 3:35-4:25 | Show `venue.js`: sections, rows, 24 seats per row, integer-pence prices and unavailable IDs. Show `createSeats()` looping through sections, rows and seat numbers. In `script.js`, show `generateVenue()` creating buttons and `saveCart()` / `loadCart()` saving IDs and restoring valid seats. |
| 4:25-5:00 | Finish with the bonus: wheel over the map to zoom around the pointer, then hold the left mouse button and drag. Show that dragging does not inspect or add a seat, and that the required buttons still work. |

## Upload and verify

1. Upload the narrated screen recording to OneDrive.
2. Enable automatic subtitles and allow time for them to generate. Return later and confirm that the captions actually play.
3. Create the public video link required by the instructions. Check that it opens and plays without using your signed-in account. If the university account prevents public sharing, resolve this with the instructor.
4. Add that exact video URL to the report, remove its draft label, and check the PDF again.
5. Submit the public repository URL, public video URL and final 1-2 page PDF through the course submission system before the deadline.

The video must show the same source version identified by the final commit hash in the report. Do not claim the recording, upload, subtitles or final course submission are complete until they have been checked.
