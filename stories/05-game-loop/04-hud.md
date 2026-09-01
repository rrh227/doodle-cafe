---
title: Build HUD
status: done
story: 05-game-loop
depends_on: [03-order-flow]
---

# Build HUD

## Objective
Display score, reputation, order count, and topping counter in the top bar.

## Requirements
- Top bar displays:
  - Score: running total with count-up animation
  - Reputation: visual meter (green/yellow/red based on value)
  - Order #: current order number
  - Topping counter: "X/8 toppings" (updates as toppings are placed/removed)
- Reputation meter color shifts: green (4-5), yellow (2.5-3.9), red (<2.5)
- Score animates when points are awarded
- All values reset on new game
- HUD doesn't obstruct the workspace or panels

## Acceptance Criteria
- [ ] All HUD elements visible during gameplay
- [ ] Score updates with animation on point award
- [ ] Reputation meter reflects current value with color coding
- [ ] Order counter increments each order
- [ ] Topping counter updates in real-time as toppings are placed/removed
- [ ] HUD resets on new game
