# Final application checks

Checked on 6 November 2026 in Chrome 155.0.8059.86: 33 browser checks passed after the final mouse-navigation fixes. This includes mobile/touch emulation, five viewport widths and a full-cart stress test. Desktop and phone screenshots were reviewed. Earlier milestones passed 16 checks on 20 October and 25 checks on 26 October.

Safari 26.6 was also checked directly for seat inspection, explicit adding, duplicate prevention, reload restoration, removal, unavailable-seat blocking, navigation buttons, wheel zoom and mouse dragging. This was a manual smoke check, not the full automated suite. Safari testing found a drag issue when pointer events reported a zero button mask. Drag tracking now follows the pointer from press to release/cancel, and a WebKit user-selection rule prevents text selection during panning. The corrected drag visibly moved the venue.

## Checks to repeat

1. Open the page with an empty saved cart. Check three sections, 12 rows, 288 unique seat buttons, 26 unavailable seats, 262 available seats and a zero total.
2. Inspect Orchestra A1, Dress Circle F12 and Balcony M24. Check their categories and prices: Premium / GBP 85.00, Classic / GBP 60.00 and Value / GBP 35.00. Inspection alone must not add tickets or write storage.
3. Inspect a different seat, then the same seat again. Only one seat should have the inspection outline.
4. Add Orchestra A1 using ADD TO CART. Check its tick, In cart status, disabled add button, cart entry and GBP 85.00 total. The available count should become 261.
5. Try adding the same seat again. There must still be one ticket. The click handler was also checked using a dispatched event on the disabled button.
6. Inspect Orchestra A4. It should stay grey with a cross, show Unavailable and disable adding. A dispatched click must not bypass this check.
7. Add Dress Circle F12 and Balcony M24. Check the three individual prices and GBP 180.00 total.
8. Reload. All three cart entries and their map ticks should return, while inspection resets.
9. Inspect Dress Circle F12 and remove it from the cart. Its status and add button should return to Available, and the total should become GBP 120.00. Reload to confirm the removal was saved.
10. Remove the remaining tickets. Check zero total, the empty-cart message, restored seat colors and keyboard focus on the cart heading after the last removal.
11. Check all seven map buttons. Zoom should stop at 100% and 400%, with the relevant button disabled. All four move buttons should move the map in their stated direction. Repeated movement must not lose the venue offscreen.
12. Use Reset/Center View. The complete map should fit again without changing the cart.
13. At maximum zoom, focus seats and move with the arrow keys. The focused seat should stay inside the map frame. Enter and Space should inspect, and only one seat should remain in the Tab order.
14. Check widths of 320, 390, 768, 1024 and 1440 pixels. The page must not overflow horizontally. Map controls should wrap, the complete map should fit after resizing, and the last seat and details link should work.
15. Save a cart containing duplicate IDs, an unknown ID, an unavailable ID and non-string values. Reload and confirm only valid available seats appear. Stored prices must not override venue prices.
16. Try malformed JSON, null, missing fields and an unsupported saved version. Check the warning, then add a valid ticket to replace the damaged cart.
17. Block storage access in an isolated browser context. Adding and removing should still work for the current visit, with a warning that saving failed.
18. Open the same address in two tabs. Adding or removing in one should update the other tab's cart and seat states.
19. With phone touch emulation, inspect a seat, follow the details link, add and remove a ticket, zoom and reset.
20. Check the browser console for uncaught errors. None occurred in these checks.

Every generated seat's identifying label, price and availability was also compared with its venue record. Each of the five viewport widths was checked separately.

## Additional final-stage checks

1. Wheel zoom stays anchored to the pointer and leaves inspection and cart contents unchanged.
2. Repeated wheel events stop at the zoom limits. Ctrl/Command wheel is left to browser zoom; the required buttons continue working after mouse navigation.
3. Wheel movement over the map zooms without scrolling the page; scrolling outside the map still moves the page.
4. Dragging from a seat pans without inspecting or adding it. An ordinary click immediately afterwards still inspects correctly.
5. Small mouse movements still count as a click; right-button gestures do not pan.
6. Releasing a drag outside the map ends it. Keyboard inspection continues to work afterwards.
7. Native Tab focus brings the active seat back into the zoomed map.
8. Add all 262 available seats, verify the calculated total, reload to restore them, then remove every ticket. The cart and map return to the empty state.

## Coverage limits

- Firefox was not tested. Downloading the additional automated browser engines was too slow to finish; no pass is claimed for them.
- Touch checks used emulation, not a physical phone or tablet.
- Browser storage must be enabled for persistence. Use the same origin and browser; different addresses or ports have separate carts. The visible warning covers blocked storage.
- The recorded video, OneDrive subtitles, public video access and final report remain separate submission checks in `requirements.md`.
