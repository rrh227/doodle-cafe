---
title: Implement Order Flow (Prompt → Draw → Submit)
status: todo
story: 03-game-loop
depends_on: [02-customer-system, 02-drawing-canvas/01-canvas-setup]
---

# Implement Order Flow (Prompt → Draw → Submit)

## Objective
Wire together the full sequence from receiving an order to submitting a drawing. This is the core gameplay interaction.

## Requirements
- When game state enters `playing`:
  1. Reset game variables (score, order count, reputation)
  2. Spawn first customer with a Tier 1 prompt
  3. Canvas is cleared and ready for drawing
- "Serve" button below the canvas submits the current drawing
- On submit:
  1. Disable further drawing and the serve button
  2. Pause the patience meter
  3. Show a loading state ("Brewing your order...")
  4. Call the backend API with the canvas image + prompt text
  5. On response: display the score, show customer reaction, then transition to next order
- Between orders: brief pause (1-2 seconds), then canvas clears and next customer arrives
- Canvas auto-clears between orders (previous drawing is gone)
- Order counter visible in HUD (e.g., "Order #7")

## Acceptance Criteria
- [ ] Starting a new game spawns the first customer and enables drawing
- [ ] "Serve" button is clickable and triggers the submission flow
- [ ] Canvas is disabled after submission (can't draw during evaluation)
- [ ] Loading state is shown during API call
- [ ] After scoring, next customer arrives with a new prompt
- [ ] Canvas is cleared between orders
- [ ] Order counter increments correctly
- [ ] If patience runs out before submit, it auto-triggers a failure score
