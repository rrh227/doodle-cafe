---
title: Build Central Workspace Area
status: todo
story: 02-base-items
depends_on: [02-base-selection-ui]
---

# Build Central Workspace Area

## Objective
Create the central area where the selected base item is displayed and decorated. This is the main interaction surface.

## Requirements
- Workspace is a fixed-size area (400×400px) in the center of the game screen
- Displays the selected base item SVG scaled to fit
- Acts as the drop target for toppings (story 03)
- Has a visible boundary (frame/border) styled like a cafe counter or plate
- Shows a placeholder state when no base is selected ("Choose a base item!")
- Placed toppings layer on top of the base SVG (z-index stacking)
- "Serve" button below the workspace (enabled only after base is selected)
- Workspace resets between orders (clears toppings, resets base)

## Acceptance Criteria
- [ ] Workspace area is 400×400px, centered, with a styled border
- [ ] Base item SVG renders inside at appropriate scale
- [ ] Placeholder message shows when no base is selected
- [ ] Serve button exists and is disabled until a base is chosen
- [ ] Workspace can hold layered elements (base + toppings on top)
- [ ] Workspace resets cleanly between orders
