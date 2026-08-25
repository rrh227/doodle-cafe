---
title: Implement Color Palette
status: done
story: 02-drawing-canvas
depends_on: [02-brush-tool]
---

# Implement Color Palette

## Objective
Create the color selector UI that lets players choose from a fixed set of cafe-themed colors.

## Requirements
- 10 preset colors:
  - Black (#000000)
  - White (#FFFFFF)
  - Brown (#8B4513)
  - Tan (#D2B48C)
  - Pink (#FFB6C1)
  - Red (#DC143C)
  - Orange (#FF8C00)
  - Yellow (#FFD700)
  - Green (#228B22)
  - Blue (#4169E1)
- Colors displayed as clickable swatches in a row/grid below the canvas
- Selected color has a visible highlight/border
- Selected color applies to both brush and fill tool
- Eraser always uses white regardless of selected color
## Acceptance Criteria
- [x] All 10 colors render as swatches in the tool palette
- [x] Clicking a swatch changes the active drawing color
- [x] Active color has a clear visual indicator (border, scale, glow)
- [x] Drawing with brush uses the selected color
- [x] Fill tool uses the selected color
- [x] Eraser ignores color selection (always white)
