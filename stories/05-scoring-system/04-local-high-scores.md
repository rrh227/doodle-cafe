---
title: Implement Local High Score Board
status: todo
story: 05-scoring-system
depends_on: [03-game-over-screen]
---

# Implement Local High Score Board

## Objective
Show a leaderboard of the player's best runs, stored in the browser's localStorage.

## Requirements
- Store top 10 scores in localStorage as JSON array
- Each entry: `{ score, ordersServed, date, bestRating }`
- Viewable from the title screen ("High Scores" button)
- Also shown on game over screen (with current run highlighted if it placed)
- Display as a simple list/table: rank, score, orders served, date
- Clear scores option (with confirmation)
- Graceful handling if localStorage is unavailable (show empty state, game still works)

## Acceptance Criteria
- [ ] Scores persist between browser sessions
- [ ] Top 10 displayed in ranked order (highest first)
- [ ] New entry is highlighted if current run placed
- [ ] Accessible from title screen
- [ ] "Clear Scores" works with a confirmation step
- [ ] Works gracefully if localStorage is disabled/full
- [ ] Date is formatted readably (e.g., "Aug 18, 2026")
