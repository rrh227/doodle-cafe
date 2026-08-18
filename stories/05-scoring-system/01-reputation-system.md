---
title: Implement Reputation System
status: todo
story: 05-scoring-system
depends_on: [03-game-loop/04-hud]
---

# Implement Reputation System

## Objective
Build the rolling reputation system that determines game over. This is the core progression mechanic — not a single failure, but a trend.

## Requirements
- `client/js/scoring.js` — manages score state and reputation calculation
- Reputation = weighted rolling average of last 10 orders' star ratings
- Starting reputation: 3.5 (gives buffer for early mistakes)
- Minimum to stay alive: 2.0 (below this → game over)
- Weighting: more recent orders count slightly more (e.g., weights: 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.93, 0.96, 0.98, 1.0 for positions 1-10)
- First game over check happens after order #5 (grace period)
- After each order: recalculate reputation, check threshold, trigger game over if below 2.0
- Reputation displayed as a number (e.g., "3.7") and/or visual star meter

## Acceptance Criteria
- [ ] Reputation starts at 3.5 on new game
- [ ] After each order, reputation recalculates based on last 10 (or fewer if <10 orders served)
- [ ] Reputation cannot trigger game over before order #5
- [ ] Reputation dropping below 2.0 after order #5 triggers game over state
- [ ] A string of 5-star ratings pushes reputation toward 5.0
- [ ] A string of 1-star ratings quickly drops reputation
- [ ] One bad score among many good ones causes a small dip, not a crash
