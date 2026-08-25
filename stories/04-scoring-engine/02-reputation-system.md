---
title: Implement Reputation & Game Over
status: todo
story: 04-scoring-engine
depends_on: [01-scoring-system]
---

# Implement Reputation & Game Over

## Objective
Build the reputation system that tracks performance over time and triggers game over when it drops too low.

## Requirements
- Reputation = weighted rolling average of last 10 star ratings
- Starting reputation: 3.5
- Game over threshold: below 2.0 stars
- Grace period: no game over check before order #5
- More recent orders weigh slightly more
- Points system:
  - 5★ = 100 points, 4★ = 75, 3★ = 40, 2★ = 15, 1★ = 0
  - Patience bonus: 75-100% remaining = 1.5x, 50-74% = 1.25x, below 50% = 1.0x
  - Streak bonus: 3+ consecutive 4-5★ = +25 per order in streak
- Running total score displayed in HUD
- Game over screen shows: final score, orders served, best rating

## Acceptance Criteria
- [ ] Reputation starts at 3.5, updates after each order
- [ ] Game over triggers when reputation < 2.0 (after order 5)
- [ ] Points calculation includes patience and streak bonuses
- [ ] Streak resets on 3★ or below
- [ ] High scores stored in localStorage (top 10)
- [ ] Game over screen displays all final stats
- [ ] "Play Again" resets everything cleanly
