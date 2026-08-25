---
title: Document Local Play & README
status: todo
story: 08-deployment
depends_on: [01-static-deploy]
---

# Document Local Play & README

## Objective
Write clear instructions for downloading and playing locally + link to hosted version.

## Requirements
- README.md with:
  - What the game is (1-2 sentences)
  - Link to play online (hosted URL)
  - Local setup: clone, npm install, npm run dev
  - How to play (brief)
  - Credits/license
- No API keys needed (game is fully self-contained)
- Verify: fresh clone → npm install → npm run dev → playable

## Acceptance Criteria
- [ ] README exists with clear instructions
- [ ] New user can go from clone → playing in under 2 minutes
- [ ] Link to hosted version is included
- [ ] No undocumented steps
- [ ] Tested from fresh clone
