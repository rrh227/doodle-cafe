---
title: Create Base Item SVGs
status: todo
story: 02-base-items
depends_on: [01-project-setup/02-html-skeleton]
---

# Create Base Item SVGs

## Objective
Design and create the SVG illustrations for all base food/drink items. Each SVG must have named sections that can be individually colored.

## Requirements
- 5 base items as SVG files in `client/assets/bases/`:
  - `latte.svg` — sections: cup, foam, liquid, sleeve
  - `iced_drink.svg` — sections: glass, liquid, ice, straw
  - `cupcake.svg` — sections: wrapper, cake, frosting, topper
  - `toast.svg` — sections: bread, spread, toppings_area
  - `smoothie_bowl.svg` — sections: bowl, base_fill, surface
- Each section is a `<g>` or `<path>` with a unique `id` attribute (e.g., `id="cup"`)
- Consistent art style: hand-drawn, slightly wobbly lines, ~300×300px viewBox
- Default fill colors set (natural colors: brown cup, white foam, etc.)
- Sections have visible stroke boundaries so players know where to click
- `client/data/bases.json` — metadata for each base: id, name, sections list, default colors

## Acceptance Criteria
- [ ] 5 SVG files exist in `client/assets/bases/`
- [ ] Each SVG has clearly named sections with unique IDs
- [ ] SVGs render correctly in the browser at various sizes
- [ ] Sections can be targeted individually via JS (`getElementById`)
- [ ] Art style is consistent across all 5 items (stroke width, line style)
- [ ] `bases.json` lists all bases with their section metadata
- [ ] Default colors look natural (brown cup, white frosting, etc.)
