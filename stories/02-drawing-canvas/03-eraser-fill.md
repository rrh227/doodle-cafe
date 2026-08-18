---
title: Implement Eraser and Fill Tools
status: todo
story: 02-drawing-canvas
depends_on: [02-brush-tool]
---

# Implement Eraser and Fill Tools

## Objective
Add eraser (draws in white) and flood fill (bucket) tools to the canvas toolkit.

## Requirements

### Eraser
- Functions identically to brush but draws in white (canvas background color)
- Same three size options as brush
- Cursor changes to indicate eraser mode (or visual indicator on tool palette)

### Fill Tool
- Flood fill algorithm: fills a contiguous region of same-color pixels with the selected color
- Tolerance: slight tolerance (±10 RGB values) to handle anti-aliased edges
- Performance: must not freeze the browser on a 400x400 canvas (use efficient scanline or queue-based fill)
- Fills from the exact pixel the user clicks

### Tool Switching
- Only one tool active at a time (brush, eraser, or fill)
- Current tool is visually indicated in the UI
- Tool can be switched mid-drawing without losing canvas state

## Acceptance Criteria
- [ ] Eraser removes drawn content (draws white) in a stroke
- [ ] Fill tool floods a closed region with the selected color
- [ ] Fill tool handles anti-aliased edges without leaving halos
- [ ] Fill on a large empty area completes in under 200ms
- [ ] Tool palette shows which tool is currently active
- [ ] Switching tools mid-drawing works cleanly
