# Doodle Cafe — Technical Plan

## Technology Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Frontend | Vanilla HTML5 Canvas + DOM/CSS | No framework overhead; canvas for drawing, DOM for UI. Simple, fast, zero build step possible. |
| Build Tool | Vite | Fast dev server, hot reload, simple config, handles TypeScript if needed |
| Language | JavaScript (ES modules) | Lower barrier than TypeScript, modern module syntax |
| Backend | Node.js + Express | Proxies OpenAI calls, hides API key, serves static frontend |
| AI Judging | OpenAI Vision API (GPT-4o) | Multimodal evaluation of drawings against prompts |
| Storage | localStorage | High scores, settings — no database needed |
| Deployment | Vercel | Free tier, serverless functions for Express routes, static hosting for frontend |
| Styling | CSS (no framework) | Game UI is custom enough that Tailwind/Bootstrap would fight it |

## Architecture Overview

```
┌─────────────────────────────────────────────┐
│                  Browser                      │
│                                              │
│  ┌──────────┐  ┌──────────┐  ┌───────────┐ │
│  │  Canvas   │  │  Game     │  │  UI Layer │ │
│  │  Drawing  │  │  Engine   │  │  (DOM)    │ │
│  │  Module   │  │  (State)  │  │           │ │
│  └──────────┘  └──────────┘  └───────────┘ │
│        │              │              │        │
│        └──────────────┼──────────────┘        │
│                       │                       │
│              [Submit Drawing]                  │
│                       │                       │
└───────────────────────┼───────────────────────┘
                        │ POST /api/judge
                        ▼
┌───────────────────────────────────────────────┐
│              Vercel Serverless Function         │
│                                                │
│  Express app:                                  │
│  - Receives canvas image (base64)              │
│  - Sends to OpenAI Vision API with prompt      │
│  - Returns structured score (1-5, feedback)    │
│  - Rate limiting                               │
└───────────────────────────────────────────────┘
                        │
                        ▼
┌───────────────────────────────────────────────┐
│              OpenAI API                         │
│  - GPT-4o vision                               │
│  - System prompt: "Rate this drawing..."       │
│  - Returns JSON: {relevance, creativity,       │
│    effort, overall, feedback}                  │
└───────────────────────────────────────────────┘
```

## Project Structure

```
galileo-game-jam/
├── client/                    # Frontend (served as static files)
│   ├── index.html
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── main.js           # Entry point, game initialization
│   │   ├── canvas.js         # Drawing tools (brush, eraser, fill, colors)
│   │   ├── game.js           # Game state machine (menu, playing, gameover)
│   │   ├── customers.js      # Customer spawning, patience timer, reactions
│   │   ├── prompts.js        # Prompt bank + tier selection logic
│   │   ├── scoring.js        # Score calculation, reputation tracking
│   │   ├── ui.js             # DOM manipulation for HUD, menus, overlays
│   │   └── api.js            # Fetch calls to backend /api/judge
│   └── assets/
│       └── sounds/           # SFX (stretch goal)
├── api/                       # Vercel serverless functions
│   └── judge.js              # POST endpoint — proxies to OpenAI
├── package.json
├── vite.config.js
├── vercel.json
├── .env.example              # OPENAI_API_KEY placeholder
├── GAME_CONCEPT.md
├── TECHNICAL_PLAN.md
└── stories/                   # Task tracking (see below)
```

## Visual Assets Approach

**No external image assets required.** All visuals are generated with code:

| Element | Technique |
|---------|-----------|
| Customer characters | CSS art (divs + border-radius + pseudo-elements) or inline SVG |
| Facial expressions | CSS class swaps on character elements (`.happy`, `.angry`, etc.) |
| UI elements (buttons, meters) | Styled HTML elements with CSS |
| Speech bubbles | CSS with `::after` pseudo-element for the tail |
| Canvas frame | CSS borders, box-shadow, subtle gradients |
| Animations | CSS `@keyframes` and transitions |
| Icons (tools, undo) | Inline SVG or Unicode symbols |
| Background/environment | CSS gradients and patterns |

**Why no image files:**
- Zero asset pipeline — no Photoshop, Figma, or sprite sheets
- Instant iteration — tweak colors/shapes in CSS, see changes live
- Tiny bundle size — no images to download
- Consistent style — everything matches because it's all CSS
- The "hand-drawn doodle" aesthetic is achieved through wobbly borders (SVG filters), the hand-drawn font, and intentionally imperfect shapes

**No Three.js, no game engine.** This is a 2D desktop game. HTML5 Canvas handles the drawing surface; the DOM handles everything else. Adding a game engine or 3D library would introduce complexity without benefit.

## Key Dependencies

```json
{
  "dependencies": {
    "express": "^4.18.0",
    "openai": "^4.0.0",
    "express-rate-limit": "^7.0.0"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

That's it. Intentionally minimal — no UI framework, no ORM, no state management library.

---

## Constraints & Considerations

### 1. API Cost & Rate Limiting

- **Cost**: GPT-4o vision is ~$0.01-0.03 per image evaluation depending on resolution.
- **Mitigation**: Resize canvas to 512x512 before sending (reduces token cost). Add server-side rate limiting (e.g., max 10 requests/minute per IP).
- **Budget math**: 100 plays/day × 15 orders/play = 1,500 API calls = ~$15-45/day at full usage.

### 2. API Latency

- OpenAI vision calls take 2-5 seconds typically.
- **Mitigation**: Show a "brewing your order..." animation during the wait. The patience meter pauses during evaluation. Design the UX so the wait feels intentional, not broken.

### 3. Offline Play

- The game requires internet for AI judging — there is no meaningful offline mode.
- **Mitigation for local/downloaded play**: Player can run the Express server locally with their own API key. Document this clearly in README.

### 4. API Key Security

- Never expose the OpenAI key in client-side code.
- The Express backend (Vercel serverless function) holds the key server-side.
- For local play: player sets their own key in a `.env` file.

### 5. Canvas-to-Image Quality

- HTML5 Canvas exports to PNG/base64 natively via `canvas.toDataURL()`.
- Send at 512x512 resolution — balances quality vs. API cost.
- White background ensures drawings are visible against the canvas.

### 6. AI Scoring Consistency

- LLMs can be inconsistent in scoring across similar drawings.
- **Mitigation**: Use a structured system prompt that forces JSON output with specific rubric. Include few-shot examples in the prompt. Temperature set to 0 for determinism.

### 7. Browser Compatibility

- HTML5 Canvas is supported in all modern browsers (Chrome, Firefox, Safari, Edge).
- Desktop only — no mobile/tablet support required.
- Mouse input only (no touch event handling needed).
- No IE11 support needed.

### 8. Vercel Serverless Limits

- Free tier: 100GB bandwidth, 100 hours serverless execution/month.
- Function timeout: 10 seconds (sufficient for OpenAI call).
- If traffic exceeds free tier, upgrade or add caching layer.

### 9. Drawing Input

- Mouse events only (`mousedown`, `mousemove`, `mouseup`).
- No touch/pen/stylus support needed (desktop only).
- Target resolution: assume minimum 1024px viewport width.

---

## Phases

### Phase 1: Foundation (Stories 01-02)
Project setup, drawing canvas with tools, basic game state machine.

### Phase 2: Core Game Loop (Stories 03-04)
Customer system, prompt delivery, submission flow, AI integration.

### Phase 3: Scoring & Progression (Stories 05-06)
Score calculation, reputation system, game over condition, difficulty scaling.

### Phase 4: Polish & Deploy (Stories 07-08)
Visual polish, animations, sound, deployment to Vercel, local play documentation.
