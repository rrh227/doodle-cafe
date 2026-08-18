---
title: Document Local Play Setup
status: todo
story: 08-deployment
depends_on: [01-vercel-deploy]
---

# Document Local Play Setup

## Objective
Write clear instructions so someone can download the game and run it locally with their own OpenAI API key.

## Requirements
- README.md with:
  - What the game is (1-2 sentences)
  - Prerequisites: Node.js 18+, an OpenAI API key
  - Setup steps: clone, npm install, copy .env.example → .env, add API key, npm run dev
  - How to play (brief)
  - Link to the hosted version
- `.env.example` clearly documented
- `npm run dev` starts both Vite (frontend) and Express (API) in development mode
- Ensure the local dev experience works without Vercel CLI
- Test from scratch: clone fresh, follow README, verify game works

## Acceptance Criteria
- [ ] README exists with clear setup instructions
- [ ] A new user can go from clone → playing in under 5 minutes
- [ ] `npm run dev` starts the full game locally
- [ ] `.env.example` makes it clear what key is needed
- [ ] No undocumented steps or assumptions
- [ ] Tested from a fresh clone (nothing works "by accident" from dev state)
