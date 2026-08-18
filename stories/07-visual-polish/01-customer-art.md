---
title: Design Customer Characters
status: todo
story: 07-visual-polish
depends_on: [03-game-loop/02-customer-system]
---

# Design Customer Characters

## Objective
Create a set of simple, charming customer characters that give the cafe personality. These replace any placeholder styling from earlier tasks.

## Requirements
- 8 distinct customer designs (mix of diverse silhouettes)
- Built with CSS/SVG (no external image assets needed — keeps it lightweight)
- Each customer has: body shape, color, a distinguishing feature (hat, glasses, scarf, etc.)
- Simple face with changeable expression (used for reactions)
- Idle animation: subtle bobbing or swaying (CSS animation, 2-3 second loop)
- Entrance/exit animation: slide from right, exit to left
- Cohesive with the "doodle cafe" aesthetic — sketchy, hand-drawn feel
- No external image files — all characters are pure code (CSS shapes + pseudo-elements, or inline SVG)

## Acceptance Criteria
- [ ] 8 visually distinct characters exist
- [ ] Characters are built with CSS/SVG (no raster image assets)
- [ ] Each has an idle animation
- [ ] Expressions change based on score (at least: happy, neutral, angry)
- [ ] Entrance and exit animations are smooth
- [ ] Characters look cohesive as a set (same art style)
