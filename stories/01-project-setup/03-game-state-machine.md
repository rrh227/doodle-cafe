---
title: Implement Game State Machine
status: done
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
- [x] Clicking "Start" transitions to game screen
- [x] Game screen shows the builder layout
- [x] A temporary "End Game" button transitions to game over
- [x] "Play Again" returns to title screen
- [x] State transitions are clean (no flicker)
- [x] Console logs state changes
