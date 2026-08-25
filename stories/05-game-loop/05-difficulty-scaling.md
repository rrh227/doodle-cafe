---
title: Implement Difficulty Scaling
status: todo
story: 05-game-loop
depends_on: [03-order-flow]
---

# Implement Difficulty Scaling

## Objective
As the player serves more orders, prompts become more abstract with fewer high-scoring combinations.

## Requirements
- Tier assignment based on order number:
  - Orders 1-5: Tier 1 only
  - Orders 6-10: 70% Tier 2, 30% Tier 1
  - Orders 11-15: 70% Tier 2, 30% Tier 3
  - Orders 16-25: 60% Tier 3, 40% Tier 2
  - Orders 26+: 50% Tier 4, 30% Tier 3, 20% Tier 2
- Weighted random selection within tier distribution
- No Tier 1 after order 10
- No Tier 4 before order 20
- Late-game patience reduction: after order 30, all timers -10 seconds
- Subtle visual indicator when tier increases

## Acceptance Criteria
- [ ] Early orders are all Tier 1 (easy)
- [ ] By order 15, Tier 2-3 prompts dominate
- [ ] Order 26+ regularly includes Tier 4
- [ ] No premature hard prompts or late easy prompts
- [ ] Patience timers reduce after order 30
- [ ] Difficulty feels progressive (not sudden jumps)
