---
title: Build HUD (Score, Reputation, Order Count)
status: todo
story: 03-game-loop
depends_on: [03-order-flow]
---

# Build HUD (Score, Reputation, Order Count)

## Objective
Create the heads-up display showing the player's current score, reputation rating, and order progress.

## Requirements
- `client/js/ui.js` — manages all DOM-based UI updates
- Top bar displays:
  - **Score**: Running total points (large number, updates with animation)
  - **Reputation**: Visual meter (styled as stars or a bar) showing current cafe rating (1.0-5.0)
  - **Order #**: Current order number in the run
- Score updates with a brief count-up animation when points are awarded
- Reputation meter updates smoothly (CSS transition) after each order
- Reputation changes color: green (4-5), yellow (2.5-3.9), red (below 2.5)
- All HUD elements are visible during gameplay but don't obstruct the canvas or prompt

## Acceptance Criteria
- [ ] Score displays and updates when points are awarded
- [ ] Score has a visible count-up animation (not instant jump)
- [ ] Reputation meter shows current rating visually
- [ ] Reputation color reflects danger level (green/yellow/red)
- [ ] Order counter shows correct number
- [ ] HUD doesn't overlap canvas or customer speech bubble
- [ ] HUD elements reset when a new game starts
