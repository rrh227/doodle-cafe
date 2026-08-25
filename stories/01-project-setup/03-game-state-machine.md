---
title: Implement Game State Machine
status: todo
story: 01-project-setup
depends_on: [02-html-skeleton]
---

# Implement Game State Machine

## Objective
Create the state machine that controls screen visibility and transitions.

## Requirements
- `client/js/game.js` — exports a game state manager
- States: `menu`, `playing`, `gameover`
- `setState(newState)` hides/shows the correct screen
- Transition hooks: `onEnter` and `onExit` for each state
- "Start" button → `setState('playing')`
- "Play Again" → `setState('menu')`
- Console logs transitions for debugging

## Acceptance Criteria
- [ ] Clicking "Start" transitions to game screen
- [ ] Game screen shows the builder layout
- [ ] A temporary "End Game" button transitions to game over
- [ ] "Play Again" returns to title screen
- [ ] State transitions are clean (no flicker)
- [ ] Console logs state changes
