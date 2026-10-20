# Seat inspection checks

Checked on 20 October 2026 in Chrome, including mobile/touch emulation. Sixteen browser checks passed. Desktop and phone-width screenshots were also reviewed.

## Checks to repeat

1. Open the page. There should be three sections, 12 rows and 288 seat buttons with unique IDs.
2. Check that 26 seats are unavailable and the summary shows 262 available seats.
3. Click Orchestra A1. The details should show Orchestra, row A, seat 1, Premium, GBP 85.00 and Available.
4. Click Dress Circle F12 and Balcony M24. Their categories and prices should be Classic / GBP 60.00 and Value / GBP 35.00.
5. Switch between seats and click the same seat again. Exactly one seat should keep the inspection outline.
6. Click Orchestra A4. It should remain grey with a cross, show Unavailable and explain that it cannot be added.
7. Check the cart text after inspecting several seats. It should still say no tickets have been added. Inspection should not write anything to localStorage.
8. Use Tab to reach a seat. Arrow keys should move focus, while Enter or Space should inspect. There should be one seat in the Tab order at a time.
9. Reload. The inspection should reset, but the seat IDs, counts and unavailable seats should stay the same.
10. Check widths of 320, 390, 768, 1024 and 1440 pixels. The page should not overflow horizontally. The map itself can scroll sideways so the last seat in each row remains reachable.
11. On a narrow screen, inspect a seat and use "View seat details" to reach the details panel.
12. Check for uncaught JavaScript errors.

Every generated button was also checked against its venue record for section, row, number, price and availability.

## Not covered yet

- Cart, persistence and map-navigation tests belong to the next stage.
- Safari, Firefox, real-device touch testing and the final responsive review remain for the final testing stage.
