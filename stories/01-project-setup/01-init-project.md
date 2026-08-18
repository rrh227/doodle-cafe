---
title: Initialize Project Structure
status: done
story: 01-project-setup
depends_on: []
---

# Initialize Project Structure

## Objective
Set up the project directory structure, package.json, and Vite dev server so the game can be developed and previewed locally.

## Requirements
- Initialize npm project with `package.json`
- Install dependencies: `vite` (dev), `express`, `openai`, `express-rate-limit`
- Create the directory structure as defined in TECHNICAL_PLAN.md
- Configure Vite to serve `client/` as the root
- Add npm scripts: `dev` (vite dev server), `build` (production build), `preview`
- Create a minimal `client/index.html` that loads `client/js/main.js`
- Verify: running `npm run dev` opens a blank page with no errors in console

## Acceptance Criteria
- [x] `npm install` succeeds with no errors
- [x] `npm run dev` starts Vite and serves the page at localhost
- [x] Browser shows a blank page with "Doodle Cafe" in the title
- [x] All directories from the project structure exist
- [x] `.env.example` file exists with `OPENAI_API_KEY=your-key-here`
- [x] `.gitignore` includes `node_modules/`, `.env`, `dist/`
