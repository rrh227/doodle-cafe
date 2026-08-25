---
title: Implement Deterministic Scoring Engine
status: todo
story: 04-scoring-engine
depends_on: [03-topping-system/04-drag-and-drop, 02-base-items/03-section-coloring]
---

# Implement Deterministic Scoring Engine

## Objective
Build the scoring system that evaluates the player's creation against the prompt's hidden ideal combination.

## Requirements
- `client/js/scoring.js` — exports `calculateScore(promptData, playerChoice)`
- Player choice contains: `{ base, sectionColors: {}, toppings: [] }`
- Score components:
  - **Base Score** (0-20): `prompt.idealBase[chosenBase] * 20`
  - **Color Score** (0-30): Average match weight of section colors × 30
  - **Topping Score** (0-40): Sum of matched topping weights (capped at 40)
  - **Combo Bonus** (0-10): Bonus for placing specific topping pairs
- Total score: 0-100, maps to 1-5 stars
- Star mapping: 80-100=5★, 60-79=4★, 40-59=3★, 20-39=2★, 0-19=1★
- Toppings not in the ideal list score 0 (no penalty, just no points)
- Duplicate toppings only count once for scoring
- Export `getStarRating(score)` helper

## Acceptance Criteria
- [ ] `calculateScore()` returns a number 0-100
- [ ] Base choice affects score (correct base = more points)
- [ ] Section colors matching ideal colors add to score
- [ ] Each ideal topping placed adds its weight to score
- [ ] Combo bonuses award extra points when pairs are present
- [ ] Non-ideal toppings score 0 (not negative)
- [ ] Duplicate toppings don't double-score
- [ ] Star rating maps correctly from point total
- [ ] Score is fully deterministic (same input = same output every time)
