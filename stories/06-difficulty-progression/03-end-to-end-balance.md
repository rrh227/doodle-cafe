---
title: End-to-End Balance Testing
status: todo
story: 06-difficulty-progression
depends_on: [01-tier-scaling, 02-patience-scaling, 05-scoring-system/02-points-calculation]
---

# End-to-End Balance Testing

## Objective
Play through the full game multiple times and tune the numbers until the difficulty curve feels right. A skilled player should last 15-20 minutes; a casual player 5-10 minutes.

## Requirements
- Play at least 5 full runs and log results
- Tune these knobs until the game feels right:
  - Reputation threshold (currently 2.0 — is this too harsh? Too lenient?)
  - Reputation rolling window (currently 10 — should it be 8? 12?)
  - Starting reputation (currently 3.5)
  - Grace period (currently 5 orders)
  - Points multipliers
  - Patience durations
- Document the final tuned values
- Verify: a player who scores all 3-stars should survive ~15 orders before game over
- Verify: a player who alternates 5 and 1 stars should survive longer than someone with all 2s
- Verify: the game cannot run indefinitely (Tier 4 prompts + reduced patience should eventually end any run)

## Acceptance Criteria
- [ ] 5+ full playthroughs completed with results logged
- [ ] Average skilled run lasts 15-20 orders
- [ ] Casual run lasts 5-10 orders
- [ ] Consistent 3-star player survives ~15 orders
- [ ] Game eventually ends even for good players (Tier 4 difficulty ceiling)
- [ ] All tuning values documented with rationale
- [ ] No single bad score causes immediate game over (outside of very low reputation edge case)
