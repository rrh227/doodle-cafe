# Doodle Cafe — Game Concept Document

## Elevator Pitch

A cozy, single-player browser game where you run a cafe as a barista-decorator. Customers walk in with creative requests ("Make me something that feels like a rainy afternoon") and you choose a base drink or food, color its sections, and decorate it with toppings to match the prompt. The closer your creation matches the order's hidden ideal, the higher you score. Serve enough satisfied customers to keep your cafe open — mess up too many orders and it's game over.

---

## Core Loop

```
Customer enters → Reads their order prompt → Player picks base item →
Colors sections → Drags toppings onto item → Submits creation →
Deterministic score calculated → Customer reacts → Next customer (or game over)
```

### Step-by-step:

1. **Customer Arrives** — An NPC slides up to the counter with a speech bubble containing their order. A patience meter begins slowly draining.
2. **Read the Prompt** — The order is open-ended with increasing abstraction (e.g., "I'd like something warm that reminds me of autumn").
3. **Choose Base Item** — Player selects from 2-3 base options (e.g., latte, cupcake, toast). The base choice affects score — some bases match the prompt better.
4. **Color Sections** — Each base item has defined regions (cup, lid, frosting, bread, etc.) that the player colors by selecting from a palette.
5. **Decorate** — Player drags toppings/decorations from a large catalog (50+) onto the item. Position them freely on the base.
6. **Submit** — Player hits "Serve". The game evaluates the creation against the prompt's hidden scoring tags.
7. **Judgment** — A deterministic score is calculated based on how well the base, colors, and toppings match the prompt's ideal.
8. **Next Customer** — The next order appears. Difficulty increases via prompt abstraction.
9. **Game Over** — Triggered when the player's reputation drops below threshold.

---

## Scoring & Judgment

### Deterministic Scoring System

Each prompt has hidden scoring data:

```
{
  prompt: "Something warm that feels like a cozy autumn day",
  idealBase: { latte: 1.0, cocoa: 0.8, cupcake: 0.4 },
  idealColors: { brown: 0.9, orange: 0.8, red: 0.6, cream: 0.5 },
  idealToppings: { cinnamon: 1.0, whipped_cream: 0.8, caramel_drizzle: 0.9, maple_leaf: 1.0, nutmeg: 0.7 },
  bonusCombos: [["cinnamon", "caramel_drizzle"], ["maple_leaf", "whipped_cream"]]
}
```

### Score Calculation

1. **Base Score** (0-20 points): Weight from `idealBase` × 20
2. **Color Score** (0-30 points): Average weight of chosen section colors × 30
3. **Topping Score** (0-40 points): Sum of topping weights (capped at 40). Each topping placed either adds its weight or 0 if not in the ideal list.
4. **Combo Bonus** (0-10 points): Bonus for placing specific topping combinations together.

**Total: 0-100 points per order**

### Star Rating Mapping

| Points | Stars | Reaction |
|--------|-------|----------|
| 80-100 | 5 | Ecstatic — "This is EXACTLY what I wanted!" |
| 60-79 | 4 | Happy — "Ooh, nice!" |
| 40-59 | 3 | Neutral — "It's fine, I guess." |
| 20-39 | 2 | Disappointed — "Hmm, not quite..." |
| 0-19 | 1 | Angry — "This isn't what I asked for!" |

### Patience Meter

- Soft timer: a visible meter that drains over ~60-90 seconds.
- If it runs out, the customer leaves automatically (scored as 0 points / 1 star).
- Remaining patience at submission time grants a small bonus multiplier (encourages confidence over perfectionism).

### Reputation System (Game Over Condition)

- Player has a "Cafe Rating" displayed as a meter.
- It's a weighted rolling average of the last ~10 orders.
- If the rating drops below 2.0 stars, the cafe "closes" — game over.
- One bad order won't end the run, but a streak of bad ones will.

---

## Base Items

### Available Bases (at launch)

Each base has distinct colorable sections:

| Base | Sections | Best For |
|------|----------|----------|
| Latte | cup, foam, liquid, sleeve | Warm drinks, cozy prompts |
| Iced Drink | glass, liquid, ice, straw | Cold/refreshing prompts |
| Cupcake | wrapper, cake, frosting, topper | Sweet/celebration prompts |
| Toast | bread, spread, toppings | Savory/breakfast prompts |
| Smoothie Bowl | bowl, base, surface | Healthy/colorful prompts |

Per order, 2-3 bases are offered (randomized based on what fits the prompt tier).

---

## Toppings & Decorations

### Categories (50+ total items)

**Fruits (10+)**
Cherry, strawberry, blueberry, banana slice, orange slice, kiwi, raspberry, lemon wedge, apple slice, mango chunk

**Sauces & Drizzles (8+)**
Chocolate drizzle, caramel drizzle, strawberry sauce, honey, maple syrup, matcha drizzle, condensed milk, vanilla glaze

**Dry Toppings (10+)**
Sprinkles, chocolate chips, cinnamon, nutmeg, cocoa powder, granola, crushed cookies, coconut flakes, crushed nuts, candy pieces

**Cream & Foam (6+)**
Whipped cream, cream dollop, foam art, marshmallow, ice cream scoop, meringue

**Decorative (10+)**
Maple leaf, flower, umbrella, cookie stick, wafer, candy cane, mint leaf, edible glitter, star decoration, heart decoration

**Savory (6+)**
Avocado, egg, bacon, cheese, herbs, tomato

### Topping Properties

Each topping has metadata for scoring:
```
{
  id: "cinnamon",
  name: "Cinnamon",
  category: "dry_toppings",
  tags: ["warm", "autumn", "spicy", "cozy", "brown"],
  svg: "cinnamon.svg"
}
```

Tags are what the scoring system matches against prompt ideals.

---

## Prompt Design & Difficulty Scaling

### Difficulty Tiers

**Tier 1 — Obvious (Orders 1-5)**
Prompts with clear, literal answers. Many toppings score well.
- "Make me a chocolate latte with whipped cream"
- "I'd like a fruity cupcake"
- "A classic breakfast toast with eggs"

**Tier 2 — Themed (Orders 6-15)**
Prompts with a clear theme but multiple valid interpretations.
- "Something that reminds me of a beach vacation"
- "A drink fit for a princess"
- "Make it look like a garden"

**Tier 3 — Abstract (Orders 16-25)**
Prompts requiring creative interpretation. Fewer high-scoring combinations.
- "Something that captures the feeling of a rainy afternoon"
- "If jazz were a food, what would it look like?"
- "A dessert that belongs in a fairy tale"

**Tier 4 — Cryptic (Orders 26+)**
Highly abstract with very narrow ideal combos. Rewards lateral thinking.
- "The opposite of summer in a cup"
- "Make me something that sounds quiet"
- "A snack that tastes like nostalgia looks"

### Scaling Philosophy
- Tier 1: 10+ toppings score well → easy to get 4-5 stars
- Tier 2: 6-8 toppings score well → need to think thematically
- Tier 3: 3-5 toppings score well → must interpret creatively
- Tier 4: 2-3 toppings score high → puzzle-like, real challenge

---

## Interaction Design

### Drag and Drop
- Toppings displayed in a scrollable catalog panel (organized by category)
- Player drags a topping SVG from the catalog onto the base item
- Topping snaps to the item and can be repositioned
- Player can remove placed toppings by dragging them off the item (or clicking X)
- Multiple of the same topping can be placed (e.g., many sprinkles)
- Max ~8 toppings per item (prevents clutter, forces choices)

### Section Coloring
- Click a section of the base item to select it
- Color palette appears (same 10 colors as before)
- Selected section fills with the chosen color
- Sections have a subtle outline to indicate they're clickable
- Default color is the item's natural color (brown cup, white foam, etc.)

---

## Visual Style & Theme

### Setting: "The Doodle Cafe"
- A cozy, hand-drawn cafe environment
- Warm color palette: cream, soft brown, pastel pink, sage green
- Characters are simple, expressive doodle-style NPCs
- UI elements look like they're sketched on napkins or chalkboards

### Art Style for Items & Toppings
- Hand-drawn SVG illustrations with slightly wobbly lines
- Consistent stroke width and style across all items
- Warm, slightly desaturated colors (not harsh/neon)
- Each topping is a standalone SVG that looks good at various sizes

### Customer Characters
- Variety of simple doodle-people with distinct silhouettes
- Each has a brief idle animation (tapping foot, looking around)
- Reactions are exaggerated and clear (big smile, steam-from-ears angry)
- No deep backstories — they're one-off customers in endless mode

---

## Game Flow

```
[Title Screen]
    |
    v
[New Game] → [Brief Tutorial: "Welcome to your first day!"]
    |
    v
[Main Game Loop]
    |→ Customer enters with order
    |→ Player picks base item (2-3 choices)
    |→ Player colors sections
    |→ Player drags toppings onto item
    |→ Player hits "Serve"
    |→ Score calculated deterministically
    |→ Customer reacts
    |→ Repeat (difficulty scales with order count)
    |
    v
[Game Over Screen]
    |→ Final score
    |→ Orders served count
    |→ Best order rating
    |→ [Play Again] button
```

### Session Length
- Target: 5-15 minutes per run
- Early game over (bad player): ~3 minutes
- Skilled player run: 15-20 minutes before prompts become very cryptic

---

## Platform & Technical

- **Desktop only** — designed for mouse input on a computer screen
- **No backend required** — fully client-side, works offline
- **Pure static site** — can be hosted anywhere (Vercel, GitHub Pages, any CDN)
- **No API keys needed** — deterministic scoring, no external services
- Minimum viewport: 1024×768

---

## Key Design Decisions & Tradeoffs

### Deterministic vs. AI Scoring
- **Pro**: Works offline, no API costs, instant feedback, predictable/fair, no internet required
- **Con**: Less "magic" than AI — players may learn optimal combos over time
- **Mitigation**: Large prompt bank (100+) with varied ideals means memorization is impractical

### Decoration vs. Freehand Drawing
- **Pro**: More accessible (no drawing skill needed), faster per order, clearer scoring criteria
- **Con**: Less creative freedom, content-heavy (need 50+ topping SVGs)
- **Mitigation**: Large topping variety + positioning + color choices = enormous combinatorial space

### No Meta-Progression
- No accounts, no unlocks, no save files
- Pure arcade score-chasing
- Every run starts equal

---

## Success Metrics (What Makes This Fun?)

1. **Puzzle satisfaction** — Players feel clever when they decode an abstract prompt
2. **Creative expression** — Choosing toppings and colors feels personal
3. **Accessibility** — Anyone can drag and drop, no art skill needed
4. **"One more round"** — Short sessions + escalating difficulty = addictive loop
5. **Shareability** — "I scored 3,200!" + funny creations are naturally shareable

---

## Open Questions

- [ ] Should there be a "gallery" of your creations from a run?
- [ ] Should the score breakdown be shown (which toppings scored, which didn't)?
- [ ] Should there be a practice/sandbox mode with no scoring?
- [ ] Accessibility: how to handle colorblind players with limited palette?
- [ ] Should placed toppings be resizable or fixed size?
