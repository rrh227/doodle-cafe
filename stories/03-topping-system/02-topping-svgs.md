---
title: Create Topping SVG Illustrations
status: todo
story: 03-topping-system
depends_on: [01-topping-catalog-data]
---

# Create Topping SVG Illustrations

## Objective
Create SVG illustrations for all 50+ toppings. Each is a small, standalone illustration in a consistent hand-drawn style.

## Requirements
- SVG files in `client/assets/toppings/` — one per topping (e.g., `cherry.svg`, `whipped_cream.svg`)
- Consistent style: hand-drawn, slightly wobbly outlines, warm colors
- Each SVG: ~80×80px viewBox, simple shapes, single-color or 2-3 color fills
- Must look good at both thumbnail size (40px in catalog) and placed size (60-80px on workspace)
- Transparent background (no bounding box fill)
- File names match the `svgFile` field in `toppings.json`
- Total asset budget: <500KB for all toppings combined

## Acceptance Criteria
- [ ] 50+ SVG files exist in `client/assets/toppings/`
- [ ] All files match their reference in `toppings.json`
- [ ] Consistent art style across all toppings
- [ ] SVGs render clearly at 40px (thumbnail) and 80px (placed)
- [ ] All SVGs have transparent backgrounds
- [ ] Total file size under 500KB
- [ ] Each SVG is recognizable (you can tell what it is at a glance)
