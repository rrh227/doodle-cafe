---
title: Scoring Algorithm
status: done
story: 04-scoring-engine
depends_on: [01-prompt-generator]
---

# Scoring Algorithm

## Objective
Score the player's creation against the customer's order using tag matching, base correctness, and coloring effort.

## Requirements
- `client/js/scoring.js` — pure function scoring logic
- Score components: base match, tag coverage, variety bonus, coloring bonus
- Returns a star rating (1-5) and point total
- Fully deterministic — same input always produces same score

## Acceptance Criteria
- [x] Correct base scores points; wrong base penalizes
- [x] Each matched tag contributes to score
- [x] Variety in topping categories gives a bonus
- [x] Coloring sections gives a bonus
- [x] Returns star rating 1-5 and numeric score
- [x] Deterministic — no randomness in scoring
