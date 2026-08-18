---
title: Tune Patience Timer Per Tier
status: todo
story: 06-difficulty-progression
depends_on: [01-tier-scaling, 03-game-loop/02-customer-system]
---

# Tune Patience Timer Per Tier

## Objective
Harder prompts give more thinking time, but the overall pace should still create gentle pressure as the game progresses.

## Requirements
- Base patience per tier:
  - Tier 1: 90 seconds (generous — player is learning)
  - Tier 2: 80 seconds
  - Tier 3: 75 seconds
  - Tier 4: 70 seconds (hard prompts, but they need more thought time)
- Late-game modifier: after order 30, all timers reduce by 10 seconds (creates urgency at high scores)
- Patience meter visual speed should make draining feel natural at all durations
- Timer display: no numeric countdown shown (meter only — avoids anxiety). But the meter's color shifts as it drains (green → yellow → red at 25%)

## Acceptance Criteria
- [ ] Tier 1 customers wait 90 seconds before leaving
- [ ] Tier 4 customers wait 70 seconds
- [ ] After order 30, timers are 10 seconds shorter across the board
- [ ] Patience meter color transitions smoothly (green → yellow → red)
- [ ] No numeric countdown visible to the player
- [ ] Timer feels appropriately pressured but not panic-inducing
