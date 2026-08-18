---
title: Implement Game State Machine
status: done
story: 01-project-setup
depends_on: [02-html-skeleton]
---

# Implement Game State Machine

## Objective
Create the core state machine that controls which screen is visible and manages transitions between game states.

## Requirements
- `client/js/game.js` — exports a game state manager
- States: `menu`, `playing`, `gameover`
- `setState(newState)` function that hides/shows the correct screen div
- Transition hooks: `onEnter` and `onExit` for each state (called during transitions)
- "Start" button on title screen calls `setState('playing')`
- For now, `playing` state just shows the game screen div (canvas area visible)
- `gameover` state shows the game over screen with a "Play Again" button → returns to `menu`
- `client/js/main.js` initializes the state machine on page load, starts in `menu` state

## Acceptance Criteria
- [x] Clicking "Start" transitions from title screen to game screen
- [x] Game screen shows (with placeholder content for now)
- [x] A temporary "End Game" button (for testing) transitions to game over screen
- [x] "Play Again" on game over screen returns to title screen
- [x] State transitions are clean (no flicker, correct elements shown/hidden)
- [x] Console logs state transitions for debugging (e.g., "State: menu → playing")
