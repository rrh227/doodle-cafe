---
title: Order Prompt Generator
status: done
story: 04-scoring-engine
depends_on: [03-topping-system/01-topping-catalog-data]
---

# Order Prompt Generator

## Objective
Generate randomized customer orders as natural-language prompts with underlying tag requirements for deterministic scoring.

## Requirements
- `client/js/orders.js` — generates order prompts
- Each order specifies: required base, desired tags, and a speech-bubble prompt string
- Orders pick a random base from available bases
- Orders pick 2-4 desired tags that map to toppings
- Prompt text is a natural-sounding customer request built from templates
- Difficulty scales with order number (more tags, pickier requests)

## Acceptance Criteria
- [x] Orders generate with a base requirement and tag list
- [x] Prompt text reads naturally in the speech bubble
- [x] Orders vary meaningfully between rounds
- [x] Difficulty increases over successive orders
