---
title: Build Customer System
status: done
story: 05-game-loop
depends_on: [01-prompt-bank]
---

# Build Customer System

## Objective
Create the customer NPCs that arrive with orders, display prompts, and react to scores.

## Requirements
- `client/js/customers.js` — manages customer lifecycle
- Customer entrance animation (slides in from side)
- Speech bubble displays the prompt text
- Patience meter: visible bar that drains over time
  - Tier 1: 90 seconds, Tier 2: 80s, Tier 3: 75s, Tier 4: 70s
- Customer has 4-8 visual variations (CSS art)
- Patience meter pauses during score display
- If patience runs out: customer leaves, auto-scores 0 points / 1 star
- Customer reacts after scoring:
  - 5★: ecstatic face, hearts
  - 4★: happy smile
  - 3★: neutral shrug
  - 2★: disappointed frown
  - 1★: angry, storms out
- Customer exits after reaction

## Acceptance Criteria
- [ ] Customer appears with prompt when order starts
- [ ] Speech bubble is readable and clearly displays the prompt
- [ ] Patience meter drains at correct rate per tier
- [ ] Customer has visual variety (at least 4 looks)
- [ ] Timeout auto-triggers 1★ score
- [ ] 5 distinct reaction animations match star ratings
- [ ] Customer exits after reaction display
