---
title: End-to-End Balance Testing
status: todo
story: 06-content-creation
depends_on: [03-prompt-authoring, 05-game-loop/03-order-flow]
---

# End-to-End Balance Testing

## Objective
Play through the full game multiple times and tune scoring/difficulty until it feels right.

## Requirements
- Play 5+ full runs, document results
- Tune:
  - Score thresholds for star ratings (80/60/40/20)
  - Reputation threshold (2.0) and rolling window (10)
  - Patience timers per tier
  - Points multipliers
  - Starting reputation (3.5)
- Verify:
  - Average player lasts 10-15 orders
  - Skilled player lasts 20-30 orders
  - All-3★ player survives ~15 orders
  - Game eventually ends (Tier 4 is hard enough)
  - No single bad order causes immediate game over (after grace period)

## Acceptance Criteria
- [ ] 5+ playthroughs completed with results logged
- [ ] Difficulty curve feels smooth (not sudden)
- [ ] Scoring feels fair (logical choices are rewarded)
- [ ] Game length matches target (5-15 min for average, 15-20 for skilled)
- [ ] All tuning values documented with rationale
