---
title: Author Full Prompt Bank (100+ prompts)
status: done
story: 06-content-creation
depends_on: [05-game-loop/01-prompt-bank]
---

# Author Full Prompt Bank (100+ prompts)

## Objective
Write all 100+ prompts with carefully tuned scoring weights. This is the core content that determines if the game is fun.

## Requirements
- 25+ prompts per tier (100+ total)
- Each prompt tested for:
  - Is the text clear/fun to read?
  - Are the ideal toppings logical for the theme?
  - Can a thoughtful player score 4-5★ on Tier 1-2?
  - Are Tier 3-4 prompts challenging but fair?
  - Do combo bonuses reward creative pairings?
- Diverse themes: seasons, emotions, places, abstract concepts, specific foods
- No repeated themes within the same tier
- Balanced base distribution (each base appears roughly equally as an "ideal")

## Acceptance Criteria
- [ ] 100+ prompts in `prompts.json`
- [ ] Every prompt has been manually reviewed for fairness
- [ ] Tier 1 prompts: any player can get 3-4★ on first try
- [ ] Tier 4 prompts: only creative/lateral thinkers get 4-5★
- [ ] All referenced topping/base IDs are valid
- [ ] Theme diversity (no more than 3 prompts about the same concept)
- [ ] Base recommendations are balanced across all 5 items
