---
title: Create Prompt Bank with Scoring Data
status: todo
story: 05-game-loop
depends_on: [04-scoring-engine/01-scoring-system, 03-topping-system/01-topping-catalog-data]
---

# Create Prompt Bank with Scoring Data

## Objective
Write the full prompt bank — each prompt with display text, tier, and all hidden scoring weights. This is the content that drives the entire game.

## Requirements
- `client/data/prompts.json` — array of 100+ prompt definitions
- Each prompt: `{ id, text, tier, offeredBases[], idealBase{}, idealColors{}, idealToppings{}, bonusCombos[] }`
- Tier distribution: ~25 per tier (Tier 1-4)
- `offeredBases` — which 2-3 bases the player can choose from for this prompt
- `idealBase` — weight (0-1) for each offered base
- `idealColors` — hex colors with weights (0-1) that match the prompt's theme
- `idealToppings` — topping IDs with weights (0-1)
- `bonusCombos` — pairs of topping IDs that earn combo bonus
- Prompts should reference toppings that exist in `toppings.json`
- Tier 1: 10+ toppings score well (easy). Tier 4: 2-3 toppings score high (hard)

## Acceptance Criteria
- [ ] `prompts.json` exists with 100+ entries
- [ ] All 4 tiers have ~25 prompts each
- [ ] Every referenced topping ID exists in `toppings.json`
- [ ] Every referenced base exists in `bases.json`
- [ ] Tier 1 prompts are achievable by most players
- [ ] Tier 4 prompts require creative interpretation
- [ ] Scoring weights are balanced (high scores possible but not trivial)
- [ ] JSON is valid and parseable
