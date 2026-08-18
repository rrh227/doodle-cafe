---
title: Build OpenAI Vision Judging Endpoint
status: todo
story: 04-ai-integration
depends_on: [01-project-setup/04-backend-skeleton]
---

# Build OpenAI Vision Judging Endpoint

## Objective
Create the serverless API endpoint that receives a drawing + prompt, sends them to GPT-4o vision, and returns a structured score.

## Requirements
- `api/judge.js` — POST endpoint accepting `{ image: base64string, prompt: string }`
- Sends to OpenAI Chat Completions API with:
  - Model: `gpt-4o`
  - System prompt that defines the scoring rubric (see below)
  - User message with the image + the original customer prompt
  - `response_format: { type: "json_object" }` for structured output
  - `temperature: 0` for consistent scoring
- Expected response shape from OpenAI:
  ```json
  {
    "relevance": 4,
    "creativity": 3,
    "effort": 5,
    "overall": 4,
    "feedback": "I can clearly see a cupcake with ocean waves — creative!"
  }
  ```
- Validate OpenAI response format, return 500 if malformed
- Return the structured score to the frontend
- Handle errors gracefully: API timeout, invalid key, rate limit from OpenAI

### System Prompt for AI Judge
The system prompt should instruct the AI to:
- Act as a friendly cafe customer evaluating a hand-drawn sketch
- Rate on the three criteria (relevance, creativity, effort) from 1-5
- Provide an overall score (1-5)
- Give one sentence of feedback in character
- Be generous with effort (it's a simple drawing tool — don't expect masterpieces)
- Focus on whether the concept/idea matches the prompt, not artistic skill

## Acceptance Criteria
- [ ] POST `/api/judge` with a valid image + prompt returns a score object
- [ ] Response contains: relevance, creativity, effort, overall (all 1-5), feedback (string)
- [ ] Temperature is 0 for deterministic results
- [ ] Invalid requests return 400 with helpful error message
- [ ] OpenAI errors are caught and return 500 with generic error (no key leakage)
- [ ] Endpoint works locally and on Vercel
