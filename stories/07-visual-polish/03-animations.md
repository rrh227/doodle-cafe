---
title: Add Transition Animations & Juice
status: todo
story: 07-visual-polish
depends_on: [02-ui-theming]
---

# Add Transition Animations & Juice

## Objective
Add "game feel" through small animations, transitions, and feedback effects that make interactions satisfying.

## Requirements
- Screen transitions: fade or slide between menu/game/gameover (300ms)
- Score popup: points float up and fade when awarded (+75 text animation)
- Reputation change: meter fills/drains with eased animation (not instant snap)
- Streak indicator: visual flair when streak reaches 3+ (glow, sparkle)
- Customer entrance: bounce-in effect (slight overshoot spring animation)
- Serve button: press feedback (scale down on click, spring back)
- Tool selection: subtle highlight transition when switching tools
- Canvas clear: brief "wipe" animation (white sweeps across rather than instant clear)
- Game over trigger: brief dramatic pause, then screen dims before showing results
- All animations use CSS transitions/animations (no JS animation libraries needed)

## Acceptance Criteria
- [ ] Screen transitions feel smooth, not instant
- [ ] Score changes have visible animated feedback
- [ ] Streak bonus has celebratory visual cue
- [ ] Button presses feel responsive with feedback
- [ ] Animations don't block gameplay (none are longer than 500ms)
- [ ] Game over moment has appropriate dramatic weight
- [ ] All animations are CSS-based (no additional dependencies)
- [ ] Animations respect `prefers-reduced-motion` media query
