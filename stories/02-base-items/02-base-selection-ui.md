---
title: Build Base Item Selection UI
status: todo
story: 02-base-items
depends_on: [01-base-item-svgs]
---

# Build Base Item Selection UI

## Objective
When a new order starts, display 2-3 base item options for the player to choose from. Selection places the item in the central workspace.

## Requirements
- `client/js/bases.js` — manages base item data and selection logic
- Left panel shows 2-3 base item thumbnails (SVG previews) when an order starts
- Player clicks a base to select it
- Selected base appears full-size in the center workspace area
- Unselected bases dim or hide after selection
- Player can change their base choice before submitting (click a different base)
- Which bases are offered per order depends on prompt data (configured per prompt)
- Base selection resets between orders

## Acceptance Criteria
- [ ] 2-3 base options displayed as clickable thumbnails
- [ ] Clicking a base places it in the workspace at full size
- [ ] Selected base is visually highlighted in the panel
- [ ] Player can switch base choice before submitting
- [ ] Workspace clears and resets between orders
- [ ] Base SVG renders with all sections visible and clickable
