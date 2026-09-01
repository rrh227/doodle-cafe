---
title: Create Topping SVGs — Dry, Cream, Decorative, Savory (32+ items)
status: done
story: 06-content-creation
depends_on: [03-topping-system/01-topping-catalog-data]
---

# Create Topping SVGs — Dry, Cream, Decorative, Savory (32+ items)

## Objective
Create SVG illustrations for all remaining topping categories.

## Items to Create

### Dry Toppings (10)
sprinkles, chocolate_chips, cinnamon, nutmeg, cocoa_powder, granola, crushed_cookies, coconut_flakes, crushed_nuts, candy_pieces

### Cream & Foam (6)
whipped_cream, cream_dollop, foam_art, marshmallow, ice_cream_scoop, meringue

### Decorative (10)
maple_leaf, flower, umbrella, cookie_stick, wafer, candy_cane, mint_leaf, edible_glitter, star_decoration, heart_decoration

### Savory (6)
avocado, egg, bacon, cheese, herbs, tomato

## Requirements
- Same style as batch 1: hand-drawn, ~80×80px, consistent strokes
- Transparent background
- Recognizable at thumbnail size

## Acceptance Criteria
- [x] All SVG files created in `client/assets/toppings/`
- [x] Consistent with batch 1 art style
- [x] Each item identifiable at 40px
- [x] Files under 5KB each

> Note (2026-09-01): The shipped roster (66 toppings in `toppings.json`,
> 66 SVGs on disk) diverged from this list — it adds an "abstract" category
> (star, moon, cloud, music_note, etc.) and renames several items
> (`egg_slice` for egg, `bacon_bits` for bacon). Every topping in
> `toppings.json` has a matching SVG.
