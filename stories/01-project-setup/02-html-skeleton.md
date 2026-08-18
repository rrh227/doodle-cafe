---
title: Create HTML/CSS Game Shell
status: done
story: 01-project-setup
depends_on: [01-init-project]
---

# Create HTML/CSS Game Shell

## Objective
Build the base HTML layout and CSS that will contain all game screens. This establishes the visual container without any game logic.

## Requirements
- `index.html` with semantic structure: game container, canvas area, UI overlay areas
- Layout divs for: title screen, game screen (canvas + HUD), game over screen
- Only the title screen visible initially (others hidden via CSS)
- CSS establishes the cafe color palette: cream (#FFF8F0), soft brown (#8B6914), pastel pink (#FFB6C1), sage green (#9DC183)
- Fixed-width game container: centered, 800px wide (desktop only)
- Canvas placeholder div (actual canvas created in JS later)
- HUD areas: top bar (score, reputation meter), customer speech bubble area, tool palette area
- Basic font loaded (Google Fonts — something hand-drawn like "Patrick Hand" or "Caveat")
- Minimum supported viewport: 1024×768

## Acceptance Criteria
- [x] Page loads with a centered game container on cafe-colored background
- [x] Title screen shows game name and a "Start" button (non-functional yet)
- [x] Three screen sections exist in DOM (title, game, gameover) — only title visible
- [x] Layout is centered and looks correct at 1024px+ viewport widths
- [x] Custom font is loaded and applied
- [x] No JavaScript logic — this is pure structure and styling
