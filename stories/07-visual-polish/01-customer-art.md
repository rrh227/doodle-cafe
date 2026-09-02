---
title: Design Customer Characters
status: done
story: 07-visual-polish
depends_on: [05-game-loop/02-customer-system]
---

# Design Customer Characters

## Objective
Create 8 distinct customer character designs using CSS/SVG. Simple, charming, expressive.

## Requirements
- 8 visually distinct characters (diverse silhouettes, colors, accessories)
- Built with CSS art or inline SVG (no image files)
- Each has a changeable facial expression (happy, neutral, angry, ecstatic, disappointed)
- Idle animation: subtle bobbing/swaying (CSS keyframes)
- Entrance/exit slide animations
- Cohesive with the "doodle cafe" aesthetic

## Acceptance Criteria
- [x] 8 visually distinct characters
- [x] Built with CSS/SVG (no raster images)
- [x] Expressions change based on score rating
- [x] Idle and entrance/exit animations work
- [x] Characters look cohesive as a set

> Note (2026-09-02): 8 CSS-art variants in styles.css — distinct hair,
> skin tones, outfits, and accessories (round glasses, beanie, flat cap,
> top-bun, curly hair). Bounce-in entrance (spring cubic-bezier), idle
> sway on an inner wrapper so it composes with enter/leave animations,
> angry storm-out. Moods driven by `data-mood` from scoring stars.
