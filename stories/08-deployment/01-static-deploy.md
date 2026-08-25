---
title: Deploy as Static Site
status: todo
story: 08-deployment
depends_on: [06-content-creation/04-balance-testing]
---

# Deploy as Static Site

## Objective
Deploy the game to a public URL. Since there's no backend, any static host works.

## Requirements
- `npm run build` produces a complete `dist/` folder
- All assets (SVGs, JSON data) are included in the build
- Deploy to Vercel, GitHub Pages, or Netlify (pick one)
- Game loads correctly from the public URL
- No 404s for assets
- Verify all game functionality works in production

## Acceptance Criteria
- [ ] Game accessible at a public URL
- [ ] All SVG assets load correctly
- [ ] JSON data files load correctly
- [ ] Full gameplay works (select base, color, place toppings, score)
- [ ] Build + deploy under 2 minutes
- [ ] No console errors in production
