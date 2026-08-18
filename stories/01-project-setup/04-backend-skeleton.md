---
title: Set Up Express Backend & Vercel Config
status: todo
story: 01-project-setup
depends_on: [01-init-project]
---

# Set Up Express Backend & Vercel Config

## Objective
Create the Express server that will handle API routes, and configure it for both local development and Vercel deployment.

## Requirements
- `api/judge.js` — Vercel serverless function (Express-compatible handler)
- For local dev: a simple `server.js` at root that mounts the API routes and serves static files from `client/`
- `vercel.json` configuration that routes `/api/*` to serverless functions and everything else to `client/`
- A test endpoint: `GET /api/health` returns `{ status: "ok" }`
- Rate limiting middleware: max 10 requests per minute per IP on `/api/judge`
- CORS configured for local development
- `.env` loading via `dotenv` (or Vite's built-in env handling)
- Add npm script: `start` (runs the local Express server)

## Acceptance Criteria
- [ ] `npm start` runs Express server locally, serves the frontend
- [ ] `GET /api/health` returns 200 with JSON response
- [ ] Rate limiting is active (11th rapid request gets 429)
- [ ] `vercel.json` is valid and routes are configured
- [ ] API key is read from environment variable, not hardcoded
- [ ] Server logs incoming requests to `/api/*` for debugging
