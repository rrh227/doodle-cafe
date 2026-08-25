---
title: Implement Section Coloring
status: todo
story: 02-base-items
depends_on: [02-base-selection-ui]
---

# Implement Section Coloring

## Objective
Allow players to color individual sections of the selected base item by clicking a section then choosing a color.

## Requirements
- Clicking a section of the base SVG selects it (visual highlight: dashed border or glow)
- Color palette (10 colors) displayed in the bottom bar
- Clicking a color fills the selected section with that color
- Sections show a subtle hover effect to indicate they're interactive
- Color changes are immediate and visible
- Player can recolor a section any number of times before submitting
- Track which colors are applied to which sections (for scoring)
- Colors available:
  - Black (#000000), White (#FFFFFF), Brown (#8B4513), Tan (#D2B48C)
  - Pink (#FFB6C1), Red (#DC143C), Orange (#FF8C00), Yellow (#FFD700)
  - Green (#228B22), Blue (#4169E1)

## Acceptance Criteria
- [ ] Clicking a section selects it with a visual indicator
- [ ] Clicking a color fills the selected section
- [ ] Hovering over sections shows they're clickable (cursor change, subtle highlight)
- [ ] Multiple sections can be colored in any order
- [ ] Section colors persist until player changes them or order resets
- [ ] All 10 colors are accessible as clickable swatches
- [ ] Player's color choices are tracked for scoring
