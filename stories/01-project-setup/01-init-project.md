---
title: Initialize Project Structure
status: done
story: 01-project-setup
depends_on: []
---

# Initialize Project Structure

## Objective
Set up the project directory structure, package.json, and Vite dev server.

## Requirements
- Initialize npm project with `package.json`
- Install dev dependency: `vite`
- Create the directory structure as defined in TECHNICAL_PLAN.md
- Configure Vite to serve `client/` as the root
- Add npm scripts: `dev`, `build`, `preview`
- Create a minimal `client/index.html`

## Acceptance Criteria
- [x] `npm install` succeeds with no errors
- [x] `npm run dev` starts Vite and serves the page at localhost
- [x] Browser shows a page with "Doodle Cafe" in the title
- [x] All directories from the project structure exist
- [x] `.gitignore` includes `node_modules/`, `dist/`
