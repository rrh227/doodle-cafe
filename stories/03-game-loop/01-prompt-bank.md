---
title: Create Prompt Bank
status: todo
story: 03-game-loop
depends_on: [01-project-setup/03-game-state-machine]
---

# Create Prompt Bank

## Objective
Build the database of customer order prompts organized by difficulty tier. This is the content that drives the entire game.

## Requirements
- `client/js/prompts.js` — exports prompt data and selection logic
- Four tiers of prompts (as defined in GAME_CONCEPT.md):
  - Tier 1 (Warm Up): 15+ simple, concrete prompts
  - Tier 2 (Getting Creative): 20+ concrete-with-a-twist prompts
  - Tier 3 (Abstract Thinking): 20+ interpretation-heavy prompts
  - Tier 4 (Wild Cards): 15+ highly abstract prompts
- Each prompt is an object: `{ text, tier, id }`
- Selection function: `getNextPrompt(orderNumber)` — maps order count to tier, picks random unused prompt
- Tracks used prompts within a session (no repeats per run)
- Resets used tracking when a new game starts

## Acceptance Criteria
- [ ] At least 70 total prompts across all tiers
- [ ] `getNextPrompt(1)` returns a Tier 1 prompt
- [ ] `getNextPrompt(10)` returns a Tier 2 prompt
- [ ] `getNextPrompt(20)` returns a Tier 3 prompt
- [ ] `getNextPrompt(30)` returns a Tier 4 prompt
- [ ] No prompt repeats within a single game session
- [ ] Prompts are randomized (different order each run)
- [ ] Used prompt tracking resets on new game
