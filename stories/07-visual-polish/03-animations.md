---
title: Add Animations & Game Feel
status: done
story: 07-visual-polish
depends_on: [02-ui-theming]
---

# Add Animations & Game Feel

## Objective
Add polish through animations and feedback effects.

## Requirements
- Screen transitions: fade/slide between menu/game/gameover
- Score popup: points float up when awarded
- Reputation meter: smooth fill/drain animation
- Streak indicator: glow/sparkle at 3+ streak
- Customer entrance: bounce-in spring effect
- Serve button: press feedback (scale)
- Topping placement: subtle pop when dropped
- Game over: dramatic pause, screen dims
- All CSS-based (no JS animation libraries)
- Respects `prefers-reduced-motion`

## Acceptance Criteria
- [x] Screen transitions are smooth
- [x] Score has animated feedback
- [x] Streak has celebratory cue
- [x] Buttons have press feedback
- [x] Topping drop has satisfying feedback
- [x] Game over has dramatic weight
- [x] Animations are CSS-based
- [x] Reduced motion preference respected

> Note (2026-09-02): screen fade-in on `.screen.active`; `+N` score popup
> floats up from the HUD score; rep meter fill/color transitions; streak
> glow + `✦ N streak!` label at 3+ consecutive 4-5★ orders; customer
> bounce-in spring; button scale press feedback; topping `pop-in` keyframe
> on drop; game over does a 1s dim-then-fade with staggered title/stats
> entrances; overlay dim animation; global `prefers-reduced-motion` kill
> switch at the bottom of styles.css. JS only toggles classes.
