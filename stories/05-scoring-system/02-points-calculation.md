---
title: Implement Points Calculation
status: todo
story: 05-scoring-system
depends_on: [01-reputation-system]
---

# Implement Points Calculation

## Objective
Calculate the points awarded per order based on star rating and patience bonus. Points are the "fun" score players chase; reputation is the survival mechanic.

## Requirements
- Base points per star rating:
  - 5 stars: 100 points
  - 4 stars: 75 points
  - 3 stars: 40 points
  - 2 stars: 15 points
  - 1 star: 0 points
- Patience bonus multiplier: based on remaining patience when submitted
  - 75-100% remaining: 1.5x multiplier
  - 50-74% remaining: 1.25x multiplier
  - 25-49% remaining: 1.0x (no bonus)
  - 0-24% remaining: 1.0x (no bonus)
  - Timed out (0%): automatic 0 points
- Streak bonus: 3+ consecutive 4-5 star ratings → +25 bonus per order in streak
- Final points = floor(base × patience_multiplier) + streak_bonus
- Running total displayed in HUD

## Acceptance Criteria
- [ ] 5 stars with full patience = 150 points (100 × 1.5)
- [ ] 3 stars with half patience = 50 points (40 × 1.25)
- [ ] 1 star = always 0 regardless of patience
- [ ] Streak bonus activates after 3 consecutive good orders
- [ ] Streak resets on a 3-star or below rating
- [ ] Running total is mathematically correct across a full game
- [ ] Points display matches the calculation
