---
title: Apply Cafe Visual Theme
status: done
story: 07-visual-polish
depends_on: [05-game-loop/04-hud]
---

# Apply Cafe Visual Theme

## Objective
Transform functional UI into something that feels like a cozy cafe.

## Requirements
- Workspace frame: styled as a plate or serving tray
- Topping catalog: styled as a recipe card or ingredient shelf
- Serve button: large cafe bell or "order up" style
- HUD: chalkboard-style elements
- Speech bubbles: hand-drawn wobbly borders
- Base selection: menu-card styling
- Color palette: colored pencils or paint tubes aesthetic
- Consistent cafe color palette and Patrick Hand font throughout

## Acceptance Criteria
- [x] All UI elements feel cohesive with cafe theme
- [x] Workspace area looks like a serving surface
- [x] Buttons have themed styling
- [x] Font is consistent throughout
- [x] Color palette is warm and inviting
- [x] UI is readable and accessible (good contrast)

> Note (2026-09-02): Palette referenced from Coffee Talk / Pokemon Cafe
> ReMix / Cat Cafe Manager / Lemon Cake — warm cream paper with polka-dot
> texture, espresso line-work (#4A3429), dusty rose / honey / sage / butter
> accents. Workspace framed as a wooden serving tray, topping grid as a
> shelf with wood dividers, HUD as a chalkboard strip, score card as a
> receipt, speech bubble + buttons + palette get wobbly hand-drawn border
> radii. The 10 paint swatches were retinted to warmer desaturated hexes;
> `prompts.json` idealColors and all 66 topping + 5 base SVGs were remapped
> to the same hexes (closest palette pair is RGB distance 43, outside the
> 40 full-credit radius, so scoring is unaffected).
