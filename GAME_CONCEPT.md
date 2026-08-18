# Doodle Cafe — Game Concept Document

## Elevator Pitch

A cozy, single-player browser game where you run a cafe as an artist-barista. Customers walk in with creative requests ("Draw me a latte that looks like my cat would approve of it") and you sketch their order on a small canvas. An AI judges how well your drawing matches the prompt. Serve enough satisfied customers to keep your cafe open — mess up too many orders and it's game over.

---

## Core Loop

```
Customer enters → Reads their order prompt → Player draws on canvas → Submit drawing →
AI evaluates match → Customer reacts → Score awarded → Next customer (or game over)
```

### Step-by-step:

1. **Customer Arrives** — An NPC slides up to the counter with a speech bubble containing their order. A patience meter begins slowly draining.
2. **Read the Prompt** — The order is literal but open-ended (e.g., "I'd like a cupcake that reminds me of the ocean"). The player must interpret what visual elements would satisfy this.
3. **Draw** — Using a minimal toolset (brush, eraser, fill, ~8 colors), the player sketches on a small fixed-size canvas.
4. **Submit** — Player hits a "Serve" button. The drawing is sent to an image recognition AI for evaluation.
5. **Judgment** — The AI scores how well the drawing matches the prompt. The score maps to a customer reaction (delighted, satisfied, disappointed, angry).
6. **Scoring** — Points are awarded based on the AI's confidence score and remaining patience meter time.
7. **Next Customer** — The next order appears. Difficulty gradually increases via prompt complexity.
8. **Game Over** — Triggered when the player's cumulative "reputation" (rolling average score) drops below a threshold.

---

## Scoring & Judgment

### AI Evaluation

The drawing + prompt are sent to an image recognition/multimodal AI (e.g., a vision model API). The system prompt asks the AI to rate 1-5 on:

- **Relevance** — Does the drawing contain elements related to the prompt?
- **Creativity** — Did the player interpret the prompt in an interesting way?
- **Effort** — Is this a genuine attempt (not blank/scribble)?

The three scores average into a final rating (1-5 stars).

### Customer Reactions

| Stars | Reaction | Points | Effect |
|-------|----------|--------|--------|
| 5 | Ecstatic — leaves a big tip | 100 | Reputation boost |
| 4 | Happy — satisfied customer | 75 | Slight reputation boost |
| 3 | Neutral — "It's fine, I guess" | 40 | No reputation change |
| 2 | Disappointed — frowns | 15 | Reputation drops |
| 1 | Angry — storms out | 0 | Major reputation hit |

### Patience Meter

- Soft timer: a visible meter that drains over ~60-90 seconds.
- If it runs out, the customer leaves automatically (scored as 1 star).
- Remaining patience at submission time grants a small bonus multiplier (encourages confidence over perfectionism).
- The meter does NOT speed up with difficulty — only prompt complexity increases.

### Reputation System (Game Over Condition)

- Player has a "Cafe Rating" displayed as a meter (think: Yelp stars).
- It's a weighted rolling average of the last ~10 orders.
- If the rating drops below 2.0 stars, the cafe "closes" — game over.
- This is more forgiving than a single-failure model: one bad drawing won't end the run, but a streak of bad ones will.

---

## Prompt Design & Difficulty Scaling

### Prompt Structure

All prompts follow the pattern: **[Object/Food] + [Creative Constraint/Modifier]**

### Difficulty Tiers

**Tier 1 — Warm Up (Orders 1-5)**
Simple, concrete requests with obvious visual answers.
- "Draw me a sunny-side-up egg"
- "I'd like a chocolate chip cookie"
- "Can I get a cup of coffee with a heart in it?"

**Tier 2 — Getting Creative (Orders 6-15)**
Concrete objects with an imaginative twist.
- "A cupcake that reminds me of the ocean"
- "A sandwich fit for a knight"
- "Latte art that looks like a tiny forest"

**Tier 3 — Abstract Thinking (Orders 16-25)**
Requests that require more interpretation.
- "Something sweet that captures the feeling of a snow day"
- "A pastry that looks like it belongs in a dream"
- "If jazz were a dessert, what would it look like?"

**Tier 4 — Wild Cards (Orders 26+)**
Highly abstract, contradictory, or unusual prompts.
- "A cake that's both elegant and chaotic"
- "Draw me breakfast, but make it feel like nostalgia"
- "Something savory that looks like a lullaby sounds"

### Prompt Generation

- A large bank of handcrafted prompts per tier (50+ per tier minimum).
- Prompts are drawn randomly without replacement within a run.
- Optional: AI-generated prompts for infinite variety (using a text model to generate new prompts matching tier difficulty guidelines).

---

## Drawing Tools

Deliberately minimal — constraints breed creativity.

### Available Tools
- **Brush** — Single size (or 3 sizes: S/M/L)
- **Eraser** — Same sizes as brush
- **Fill Bucket** — Flood fill a region
- **Color Palette** — 8-12 preset colors (cafe-themed: browns, creams, pinks, greens, blues)
- **Undo/Redo** — Last 10 actions

### Canvas
- Fixed size: ~400x400px drawing area
- White background
- No layers, no stamps, no shapes — pure freehand

### Why Minimal?
- Levels the playing field (artistic skill matters less than interpretation)
- Faster to draw = more orders served
- The AI judges concept/relevance, not artistic quality
- Keeps the game accessible and lighthearted

---

## Visual Style & Theme

### Setting: "The Doodle Cafe"
- A cozy, hand-drawn cafe environment
- Warm color palette: cream, soft brown, pastel pink, sage green
- Characters are simple, expressive doodle-style NPCs
- UI elements look like they're sketched on napkins or chalkboards

### Customer Characters
- Variety of simple doodle-people with distinct silhouettes
- Each has a brief idle animation (tapping foot, looking around)
- Reactions are exaggerated and clear (big smile, steam-from-ears angry)
- No deep backstories — they're one-off customers in endless mode

### Audio Direction (Stretch Goal)
- Lo-fi cafe background music
- Pencil/marker sound effects while drawing
- Cheerful ding for good scores, sad trombone for bad ones
- Ambient cafe chatter

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
    |→ Player draws
    |→ AI judges
    |→ Score displayed with reaction
    |→ Repeat (difficulty scales with order count)
    |
    v
[Game Over Screen]
    |→ Final score
    |→ Orders served count
    |→ Best drawing (highest rated)
    |→ [Play Again] button
```

### Session Length
- Target: 5-15 minutes per run
- Early game over (bad player): ~3 minutes
- Skilled player run: 15-20 minutes before prompts become extremely abstract

---

## Key Design Decisions & Tradeoffs

### Requires Internet
The AI image recognition means the game needs an internet connection to function. This is the biggest tradeoff:
- **Pro**: Genuine creative evaluation, infinite replayability, no "gaming the system"
- **Con**: Can't play fully offline, API costs, latency between submit and judgment

**Mitigation options:**
- Cache a "fallback mode" with simpler keyword/tag-based scoring for offline play
- Batch API calls efficiently
- Show a fun "developing your order..." animation during API wait time

### No Meta-Progression
Pure arcade keeps it simple and sessionable:
- No accounts needed, no save files
- Shareable: "I scored 2,450 — beat that!"
- Lower development scope
- Every run starts equal

### Soft Timer vs. Hard Timer
The patience meter adds gentle urgency without punishing slow artists:
- Players who draw fast get a small bonus, not a massive advantage
- No one is "locked out" by being a slow drawer
- Creates natural tension without frustration

---

## Success Metrics (What Makes This Fun?)

1. **Creative expression** — Players feel clever when they nail an abstract prompt
2. **Surprise** — AI reactions feel fair but sometimes unexpected (emergent humor)
3. **Accessibility** — Anyone can play regardless of artistic skill
4. **"One more round"** — Short sessions + escalating difficulty = addictive loop
5. **Shareability** — Funny drawings + scores are naturally social-media friendly

---

## Platform

- **Desktop only** — designed for mouse input on a computer screen
- Minimum viewport: 1024×768
- No mobile/tablet support needed
- No touch input handling required

---

## Open Questions

- [ ] How to handle API rate limits during high-traffic play?
- [ ] Should there be a "gallery" of your drawings from a run?
- [ ] Should the AI provide written feedback ("I see a cat shape — nice!") or just a star rating?
- [ ] Accessibility: how to handle colorblind players with limited palette?
- [ ] Should there be a practice/sandbox mode with no scoring?
