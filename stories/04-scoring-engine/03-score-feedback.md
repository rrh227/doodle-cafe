---
title: Implement Score Feedback Display
status: todo
story: 04-scoring-engine
depends_on: [01-scoring-system]
---

# Implement Score Feedback Display

## Objective
After submission, show the player their score breakdown so they understand what matched and what didn't.

## Requirements
- After "Serve" is clicked, show a results overlay:
  - Star rating (large, prominent)
  - Score breakdown: base (X/20), colors (X/30), toppings (X/40), combo (X/10)
  - Highlight which toppings scored (green check) and which didn't (no mark)
  - Combo bonus shown if earned
  - Brief text feedback matching the star rating
- Results display for 3-4 seconds (or until player clicks "Next")
- "Next Order" button advances to the next customer
- If game over condition is met, go to game over screen instead

## Acceptance Criteria
- [ ] Score breakdown is shown after each order
- [ ] Each component (base, color, toppings, combo) shows points earned
- [ ] Matched toppings are visually indicated
- [ ] Star rating is prominent and clear
- [ ] Text feedback matches the rating (encouraging for high, gentle for low)
- [ ] "Next Order" button advances the game
- [ ] Game over triggers correctly from this screen when reputation is too low
