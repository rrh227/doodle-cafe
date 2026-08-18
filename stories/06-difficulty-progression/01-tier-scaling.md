---
title: Implement Difficulty Tier Scaling
status: todo
story: 06-difficulty-progression
depends_on: [03-game-loop/01-prompt-bank, 05-scoring-system/01-reputation-system]
---

# Implement Difficulty Tier Scaling

## Objective
As the player serves more orders, prompts become progressively more abstract and challenging. The tier boundaries define when difficulty shifts.

## Requirements
- Tier assignment based on order number:
  - Orders 1-5: Tier 1 only
  - Orders 6-10: 70% Tier 2, 30% Tier 1
  - Orders 11-15: 70% Tier 2, 30% Tier 3
  - Orders 16-25: 60% Tier 3, 40% Tier 2
  - Orders 26+: 50% Tier 4, 30% Tier 3, 20% Tier 2
- Weighted random selection within the tier distribution
- Never serve Tier 1 after order 10 (too easy, feels stale)
- Tier 4 never appears before order 20 (player needs warm-up)
- Display a subtle visual cue when tier increases (e.g., brief "Difficulty Up!" flash after order 5, 15, 25)

## Acceptance Criteria
- [ ] Orders 1-5 are always Tier 1 (simple, concrete)
- [ ] By order 15, most prompts are Tier 2-3 complexity
- [ ] Order 26+ regularly includes Tier 4 (abstract, challenging)
- [ ] Distribution is randomized but follows the weighted probabilities
- [ ] No Tier 1 prompts appear after order 10
- [ ] No Tier 4 prompts appear before order 20
- [ ] Visual indicator when difficulty shifts to a new tier
