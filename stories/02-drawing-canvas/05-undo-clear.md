---
title: Implement Undo/Redo and Clear Canvas
status: todo
story: 02-drawing-canvas
depends_on: [02-brush-tool]
---

# Implement Undo/Redo and Clear Canvas

## Objective
Allow players to undo mistakes and clear the canvas entirely. Essential for a drawing game where experimentation is encouraged.

## Requirements

### Undo/Redo
- Save canvas state (as ImageData) after each completed stroke (pointerup) or fill action
- History stack: max 10 states (to limit memory usage)
- Undo: restore the previous canvas state from history
- Redo: restore the next state if available (redo stack clears when a new action is taken)
- Keyboard shortcuts: Ctrl+Z (undo), Ctrl+Y or Ctrl+Shift+Z (redo)
- UI buttons for undo/redo with disabled state when unavailable

### Clear Canvas
- "Clear" button resets canvas to white
- Clearing pushes current state to undo history (so clear is undoable)
- Confirmation not needed (undo handles accidental clears)

## Acceptance Criteria
- [ ] Drawing a stroke, then clicking Undo removes that stroke
- [ ] Undo can be repeated up to 10 times (full history)
- [ ] Redo restores an undone action
- [ ] Redo stack clears when a new stroke is drawn after undo
- [ ] Ctrl+Z and Ctrl+Y keyboard shortcuts work
- [ ] Clear button resets to white canvas
- [ ] Clear can be undone
- [ ] Undo/Redo buttons show disabled state when stack is empty
- [ ] Memory usage stays reasonable (10 states × 400×400 canvas = ~6MB max)
