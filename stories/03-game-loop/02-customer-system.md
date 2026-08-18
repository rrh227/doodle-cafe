---
title: Build Customer System
status: todo
story: 03-game-loop
depends_on: [01-prompt-bank]
---

# Build Customer System

## Objective
Create the customer NPCs that arrive with orders. Each customer has a visual presence, delivers their prompt, and waits for the player's drawing.

## Requirements
- `client/js/customers.js` — manages customer lifecycle
- Customer data: simple character variations (different colors/shapes for variety — can be CSS-styled divs initially, sprites later)
- Customer entrance: slides in from the side when a new order begins
- Speech bubble: displays the prompt text above/beside the customer
- Patience meter: visible bar that slowly drains (60-90 seconds depending on tier)
  - Tier 1: 90 seconds
  - Tier 2: 75 seconds
  - Tier 3: 75 seconds
  - Tier 4: 60 seconds
- Patience meter pauses during AI evaluation (after submit)
- Customer idle state: subtle animation (CSS animation — bobbing, blinking, etc.)
- Customer exit: slides out after receiving score, with appropriate facial expression

## Acceptance Criteria
- [ ] Customer appears on screen when a new order starts
- [ ] Speech bubble displays the prompt text clearly
- [ ] Patience meter is visible and drains in real-time
- [ ] Meter drains at the correct rate per tier
- [ ] Customer has at least 4 visual variations (color/accessory differences)
- [ ] Customer exits the screen after the order is judged
- [ ] If patience runs out, customer leaves (triggers a 1-star score automatically)
