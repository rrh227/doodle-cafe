---
title: Create Topping SVGs — Fruits & Sauces (18 items)
status: done
story: 06-content-creation
depends_on: [03-topping-system/01-topping-catalog-data]
---

# Create Topping SVGs — Fruits & Sauces (18 items)

## Objective
Create SVG illustrations for all fruit and sauce toppings.

## Items to Create

### Fruits (10)
cherry, strawberry, blueberry, banana_slice, orange_slice, kiwi, raspberry, lemon_wedge, apple_slice, mango_chunk

### Sauces (8)
chocolate_drizzle, caramel_drizzle, strawberry_sauce, honey, maple_syrup, matcha_drizzle, condensed_milk, vanilla_glaze

## Requirements
- Hand-drawn SVG style, ~80×80px viewBox
- Consistent stroke width (2-3px)
- Warm, slightly desaturated colors
- Transparent background
- Recognizable at 40px thumbnail size

## Acceptance Criteria
- [x] All SVG files created in `client/assets/toppings/`
- [x] Consistent art style across batch
- [x] Each item is identifiable at thumbnail size
- [x] Files are under 5KB each

> Note (2026-09-01): The final topping roster in `toppings.json` diverged
> slightly from this spec (e.g. `kiwi_slice` instead of `kiwi`,
> `berry_compote`/`peanut_butter` instead of `condensed_milk`/`vanilla_glaze`).
> All 18 fruit + sauce items in the shipped roster have SVGs.
