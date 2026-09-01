---
title: Implement Full Order Flow
status: done
story: 05-game-loop
depends_on: [02-customer-system, 04-scoring-engine/03-score-feedback]
---

# Implement Full Order Flow

## Objective
Wire together the complete sequence: customer arrives → player decorates → submit → score → next order.

## Requirements
- On game start:
  1. Reset all state (score, reputation, order count)
  2. Spawn first customer with Tier 1 prompt
  3. Show base choices, enable decoration workspace
- "Serve" button flow:
  1. Disable workspace (no more changes)
  2. Pause patience meter
  3. Calculate score from player's creation
  4. Show customer reaction
  5. Display score breakdown
  6. "Next Order" advances to next customer
- Between orders:
  - Workspace resets (base deselected, toppings cleared, colors reset)
  - New customer arrives with new prompt
  - New base options offered
  - Order counter increments
- Prompt selection: random from appropriate tier, no repeats per run

## Acceptance Criteria
- [ ] Starting a new game resets everything and spawns first customer
- [ ] Serve button triggers full scoring flow
- [ ] Workspace is disabled after submission
- [ ] Score and reaction are displayed
- [ ] "Next Order" advances cleanly to a new customer/prompt
- [ ] Workspace fully resets between orders
- [ ] Order counter increments correctly
- [ ] Prompts don't repeat within a single run
- [ ] Timeout triggers auto-fail correctly
