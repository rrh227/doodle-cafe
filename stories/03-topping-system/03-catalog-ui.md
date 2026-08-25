---
title: Build Topping Catalog Panel
status: todo
story: 03-topping-system
depends_on: [02-topping-svgs]
---

# Build Topping Catalog Panel

## Objective
Create the right-side panel that displays all available toppings organized by category, ready to be dragged onto the workspace.

## Requirements
- `client/js/toppings.js` — loads topping data, renders catalog UI
- Right panel shows toppings as a grid of draggable thumbnails
- Category tabs/filters at the top: All, Fruits, Sauces, Dry, Cream, Decorative, Savory
- Panel is scrollable if toppings exceed visible area
- Each topping thumbnail: SVG at ~40px, shows name on hover (tooltip)
- Toppings are visually grabbable (cursor: grab)
- Panel width: ~200px, height fills the game area

## Acceptance Criteria
- [ ] All 50+ toppings render as thumbnails in the panel
- [ ] Category tabs filter the displayed toppings
- [ ] "All" tab shows every topping
- [ ] Hovering shows topping name
- [ ] Panel scrolls when content exceeds height
- [ ] Toppings show grab cursor on hover
- [ ] Panel renders without performance issues (50+ SVGs visible)
