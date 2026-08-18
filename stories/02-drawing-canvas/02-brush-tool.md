---
title: Implement Brush Tool
status: todo
story: 02-drawing-canvas
depends_on: [01-canvas-setup]
---

# Implement Brush Tool

## Objective
Implement the primary drawing tool — a freehand brush that draws smooth lines on the canvas.

## Requirements
- Use mouse events (`mousedown`, `mousemove`, `mouseup`) for drawing input
- Drawing state tracking: `isDrawing` flag, last position
- Smooth line rendering: use `lineTo()` with `lineJoin: 'round'` and `lineCap: 'round'`
- Three brush sizes: Small (3px), Medium (8px), Large (16px)
- Default to Medium on game start
- Line smoothing: interpolate between points to avoid jagged lines at fast movement speeds
- Prevent default browser behaviors during drawing (no text selection)
- Drawing only occurs within canvas bounds

## Acceptance Criteria
- [ ] Click-and-drag draws a smooth continuous line on the canvas
- [ ] Three size options work and visibly differ
- [ ] Lines are smooth (round caps/joins, no sharp corners at normal drawing speed)
- [ ] Drawing stops when mouse leaves canvas or mouse button is released
- [ ] No drawing occurs on single click without movement (or a single dot appears — either is fine)
