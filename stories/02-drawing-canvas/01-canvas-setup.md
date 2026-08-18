---
title: Create Drawing Canvas Element
status: todo
story: 02-drawing-canvas
depends_on: [01-project-setup/03-game-state-machine]
---

# Create Drawing Canvas Element

## Objective
Create the HTML5 Canvas element where players will draw, with proper sizing and coordinate handling.

## Requirements
- `client/js/canvas.js` — module that manages the drawing canvas
- Create a `<canvas>` element programmatically, sized 400x400px (logical) with proper DPI scaling for retina displays
- Canvas has a white background (filled on initialization)
- Canvas is centered within the game screen area
- Handle coordinate translation: mouse position → canvas-local coordinates (accounts for CSS scaling and page offset)
- Export functions: `initCanvas(container)`, `clearCanvas()`, `getCanvasDataURL()`
- `getCanvasDataURL()` returns the canvas as a base64 PNG, resized to 512x512 for API submission
- Canvas has a visible border/frame (styled to look like a napkin or sketchpad)

## Acceptance Criteria
- [ ] Canvas appears in the game screen when state transitions to `playing`
- [ ] Canvas is 400x400 with white background
- [ ] Drawing on canvas works (basic — just track mouse and draw, even without tool logic yet)
- [ ] `getCanvasDataURL()` returns a valid base64 PNG string
- [ ] Canvas looks sharp on retina displays (2x pixel ratio handling)
- [ ] Coordinate mapping is correct (drawing appears where the cursor is, not offset)
