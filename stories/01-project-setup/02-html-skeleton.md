---
title: Create HTML/CSS Game Shell
status: todo
story: 01-project-setup
depends_on: [01-init-project]
---

# Create HTML/CSS Game Shell

## Objective
Build the base HTML layout and CSS for the new decoration-based game. Three screens (title, game, gameover) with layout for the item builder area.

## Requirements
- `index.html` with three screen sections: title, game, gameover
- Game screen layout:
  - Left panel: base item selection area (2-3 choices)
  - Center: the decoration workspace (where the chosen base item is displayed and decorated)
  - Right panel: topping catalog (scrollable, categorized)
  - Bottom bar: color palette for section coloring
  - Top bar: HUD (score, reputation, order count, patience meter)
  - Customer speech bubble above the workspace
- Title screen: game name, start button
- Game over screen: final score, orders served, play again button
- Fixed-width 1024px game container, centered
- Patrick Hand font from Google Fonts
- Cafe color palette CSS variables
- Only title screen visible initially

## Acceptance Criteria
- [ ] Page loads with centered game container
- [ ] Title screen shows with "Start" button
- [ ] Game screen has distinct left (bases), center (workspace), right (toppings) layout
- [ ] Game over screen has stats and replay button
- [ ] Three screens exist, only title visible on load
- [ ] Cafe color palette applied, custom font loaded
- [ ] No JavaScript logic — pure structure and styling
