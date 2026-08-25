# Doodle Cafe — Technical Plan

## Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | Vanilla JS + DOM/CSS/SVG | No framework needed; DOM for UI, SVG for items/toppings |
| Build Tool | Vite | Fast dev server, hot reload, handles asset imports |
| Language | JavaScript (ES modules) | Lower barrier than TypeScript, modern module syntax |
| Storage | localStorage | High scores, settings — no database needed |
| Deployment | Any static host (Vercel, GitHub Pages, Netlify) | No backend — pure static files |
| Styling | CSS (no framework) | Game UI is custom enough that Tailwind/Bootstrap would fight it |
| Assets | Inline SVG illustrations | Hand-drawn style toppings and base items |

**No backend. No API keys. No external services.** The game is fully self-contained in the browser.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                       Browser                            │
│                                                         │
│  ┌───────────┐  ┌───────────┐  ┌────────────────────┐ │
│  │  Game      │  │  Item      │  │  Scoring Engine    │ │
│  │  State     │  │  Builder   │  │  (deterministic)   │ │
│  │  Machine   │  │  (drag &   │  │                    │ │
│  │            │  │   drop)    │  │  prompt.idealBase  │ │
│  └───────────┘  └───────────┘  │  prompt.idealColors │ │
│        │              │         │  prompt.idealToppings│ │
│        │              │         └────────────────────┘ │
│        │              │                │               │
│  ┌───────────┐  ┌───────────┐        │               │
│  │  Customer  │  │  Topping   │        │               │
│  │  System    │  │  Catalog   │        │               │
│  │  (prompts, │  │  (50+ SVG  │        │               │
│  │   timer)   │  │   items)   │        │               │
│  └───────────┘  └───────────┘        │               │
│        │              │                │               │
│        └──────────────┼────────────────┘               │
│                       │                                 │
│              [Submit / "Serve"]                         │
│                       │                                 │
│              Score calculated locally                   │
│              Customer reacts                            │
│              Next order or game over                    │
└─────────────────────────────────────────────────────────┘
```

## Project Structure

```
galileo-game-jam/
├── client/
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js           # Entry point, game initialization
│   │   ├── game.js           # Game state machine (menu, playing, gameover)
│   │   ├── customers.js      # Customer spawning, patience timer, reactions
│   │   ├── prompts.js        # Prompt bank + tier selection + scoring data
│   │   ├── scoring.js        # Deterministic score calculation engine
│   │   ├── builder.js        # Item builder: base selection, coloring, topping placement
│   │   ├── toppings.js       # Topping catalog data + drag-and-drop logic
│   │   ├── bases.js          # Base item definitions + section data
│   │   └── ui.js             # DOM manipulation for HUD, menus, overlays
│   ├── assets/
│   │   ├── bases/            # SVG files for base items (latte, cupcake, etc.)
│   │   ├── toppings/         # SVG files for decorations (50+)
│   │   └── sounds/           # SFX (stretch goal)
│   └── data/
│       ├── prompts.json      # Full prompt bank with scoring weights
│       ├── toppings.json     # Topping metadata (id, name, tags, category)
│       └── bases.json        # Base item metadata (sections, default colors)
├── package.json
├── vite.config.js
├── GAME_CONCEPT.md
├── TECHNICAL_PLAN.md
└── stories/                   # Task tracking
```

## Key Dependencies

```json
{
  "devDependencies": {
    "vite": "^8.0.0"
  }
}
```

**That's it.** Zero production dependencies. The game is vanilla JS with Vite for development convenience only.

---

## Core Systems

### 1. Item Builder (builder.js)

The central gameplay surface. Replaces the drawing canvas.

- **Base Selection**: Show 2-3 base item options as clickable SVGs. Player picks one.
- **Section Coloring**: Base SVG has named regions (paths/groups with IDs). Clicking a section selects it, then clicking a color fills that section.
- **Topping Placement**: Drag-and-drop from the catalog onto the base item. Toppings are positioned freely within the item bounds. Max 8 toppings.
- **Removal**: Drag a placed topping off the item, or click its X button.

### 2. Topping Catalog (toppings.js)

- Scrollable panel showing all available toppings, organized by category tabs
- Each topping is a draggable SVG thumbnail
- Search/filter by category (fruits, sauces, dry, cream, decorative, savory)
- Shows topping name on hover

### 3. Scoring Engine (scoring.js)

Fully deterministic, no randomness:

```javascript
function calculateScore(prompt, playerChoice) {
  const baseScore = (prompt.idealBase[playerChoice.base] || 0) * 20;
  const colorScore = calculateColorScore(prompt.idealColors, playerChoice.sectionColors) * 30;
  const toppingScore = calculateToppingScore(prompt.idealToppings, playerChoice.toppings) * 40;
  const comboBonus = calculateCombos(prompt.bonusCombos, playerChoice.toppings) * 10;
  return Math.min(100, baseScore + colorScore + toppingScore + comboBonus);
}
```

### 4. Prompt System (prompts.js)

Each prompt contains both the display text and hidden scoring data:

```javascript
{
  id: "autumn-warm",
  text: "Something warm that feels like a cozy autumn day",
  tier: 2,
  idealBase: { latte: 1.0, cocoa: 0.8, cupcake: 0.4, iced_drink: 0.1 },
  idealColors: { "#8B4513": 0.9, "#FF8C00": 0.8, "#DC143C": 0.6, "#D2B48C": 0.5 },
  idealToppings: { cinnamon: 1.0, maple_leaf: 1.0, caramel_drizzle: 0.9, whipped_cream: 0.8, nutmeg: 0.7 },
  bonusCombos: [["cinnamon", "caramel_drizzle"], ["maple_leaf", "whipped_cream"]]
}
```

---

## Constraints & Considerations

### 1. SVG Asset Creation (Biggest Effort)

- 50+ topping SVGs + 5 base item SVGs = significant art content
- **Mitigation**: Consistent simple style (hand-drawn, monoline, ~100×100px). Can batch-create with a consistent template.
- SVGs are small files (~1-5KB each). Total asset budget: <500KB.

### 2. Drag and Drop Performance

- Must feel responsive with 50+ items in the catalog
- **Mitigation**: Virtualize the catalog (only render visible items) if performance issues arise. Use CSS `will-change` on dragged elements. Keep SVGs simple.

### 3. Section Coloring in SVG

- Base item SVGs must have clearly named groups/paths for each section
- **Mitigation**: Design SVGs with `id` attributes on each colorable section. Use `fill` attribute changes for coloring.
- Each section needs a clear visual boundary (stroke) so players know where to click.

### 4. Scoring Balance

- Deterministic scoring means players could theoretically "solve" prompts
- **Mitigation**: 100+ prompts with varied ideals. Tier 3-4 prompts have many partial-credit toppings so "solving" requires lateral thinking.
- Weighted scoring means players get partial credit — not binary right/wrong.

### 5. Topping Positioning

- Free-form drag and drop means toppings can overlap or be placed oddly
- **Mitigation**: Toppings snap to within the base item bounds. Overlap is fine (it's decorating). Score is based on what's placed, not where.

### 6. Content Authoring

- 100+ prompts with hand-tuned scoring weights is labor-intensive
- **Mitigation**: Build a simple scoring data format. Weight values are 0-1 floats. Author prompts in JSON.

### 7. Browser Compatibility

- SVG manipulation supported in all modern browsers
- Drag and Drop API has quirks — use mouse events (mousedown/move/up) for custom drag behavior
- Desktop only, mouse only
- No IE11 support needed

### 8. Offline / Local Play

- Game works entirely offline once loaded (no API calls)
- Can be downloaded and opened locally (Vite builds to static `dist/`)
- Can be hosted on any static file server

---

## Phases

### Phase 1: Foundation
Project setup, game state machine, base item system with section coloring.

### Phase 2: Topping System
Topping catalog UI, drag-and-drop placement, topping data model.

### Phase 3: Scoring & Game Loop
Prompt bank, deterministic scoring engine, customer system, patience timer.

### Phase 4: Content & Polish
Full prompt bank (100+), all SVG assets, visual polish, deployment.
