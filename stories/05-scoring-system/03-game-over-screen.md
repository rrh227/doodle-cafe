---
title: Build Game Over Screen
status: todo
story: 05-scoring-system
depends_on: [01-reputation-system, 02-points-calculation]
---

# Build Game Over Screen

## Objective
Create the end-of-run screen that shows the player their results and invites them to play again.

## Requirements
- Triggered when reputation drops below 2.0 (after order #5+)
- Displays:
  - "Cafe Closed!" or similar themed message
  - Final score (total points)
  - Orders served count
  - Best order rating in the run (highest individual star score)
  - A short recap: "Your customers averaged X stars"
- "Play Again" button → resets everything and returns to title screen
- High score tracking: compare to localStorage best score
  - If new high score: celebratory message ("New Record!")
  - Store top 5 scores in localStorage with date
- Simple animation/transition into game over state (not abrupt cut)

## Acceptance Criteria
- [ ] Game over screen shows when reputation drops below threshold
- [ ] Final score, orders served, and best rating are displayed correctly
- [ ] "Play Again" fully resets the game and returns to title
- [ ] High scores are persisted in localStorage
- [ ] New high score is celebrated with visual feedback
- [ ] Top 5 scores are stored with timestamps
- [ ] Screen transition is smooth (fade, slide, or similar)
