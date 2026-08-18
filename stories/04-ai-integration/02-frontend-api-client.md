---
title: Build Frontend API Client
status: todo
story: 04-ai-integration
depends_on: [01-openai-endpoint, 03-game-loop/03-order-flow]
---

# Build Frontend API Client

## Objective
Create the client-side module that sends the player's drawing to the backend and handles the response.

## Requirements
- `client/js/api.js` — exports `submitDrawing(imageBase64, promptText)` → returns score object
- Uses `fetch()` to POST to `/api/judge`
- Sends image as base64 string (from `canvas.toDataURL()`)
- Handles loading state: returns a Promise that the game loop awaits
- Error handling:
  - Network error → retry once, then show "Connection lost" message and let player retry manually
  - 429 (rate limited) → show "Too fast! Wait a moment..." message
  - 500 (server error) → show "Oops, something went wrong" and auto-score as 3 stars (neutral, so one error doesn't ruin a run)
- Timeout: if no response in 15 seconds, treat as error
- Response validation: ensure returned object has expected fields

## Acceptance Criteria
- [ ] `submitDrawing()` sends the image and prompt to the backend
- [ ] Successful response returns the parsed score object to the caller
- [ ] Network errors show a user-friendly message (not a raw error)
- [ ] Rate limiting (429) shows an appropriate message
- [ ] Server errors default to a neutral 3-star score (game continues)
- [ ] 15-second timeout prevents infinite loading states
- [ ] Works with both local dev server and deployed Vercel URL
