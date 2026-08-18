---
title: Deploy to Vercel
status: todo
story: 08-deployment
depends_on: [04-ai-integration/01-openai-endpoint]
---

# Deploy to Vercel

## Objective
Get the game live on the internet with a working backend, accessible via a public URL.

## Requirements
- Vercel project configured and linked to the git repo
- `vercel.json` routes:
  - `/api/*` → serverless functions in `api/` directory
  - `/*` → static files from `client/` (or Vite build output in `dist/`)
- Environment variable `OPENAI_API_KEY` set in Vercel project settings
- Production build step: `npm run build` (Vite builds client to `dist/`)
- Verify all routes work in production:
  - Root `/` serves the game
  - `POST /api/judge` works with the API key from environment
  - `GET /api/health` returns OK
- Custom domain setup (optional — Vercel provides a `.vercel.app` subdomain free)
- Ensure rate limiting works in serverless context

## Acceptance Criteria
- [ ] Game is accessible at a public URL
- [ ] Frontend loads correctly (no 404s for assets)
- [ ] `/api/judge` endpoint works in production (returns scores)
- [ ] API key is not exposed in client-side code or network requests
- [ ] Rate limiting functions correctly on Vercel
- [ ] No CORS errors in production
- [ ] Build + deploy completes in under 2 minutes
