---
title: Desktop Browser Testing
status: todo
story: 08-deployment
depends_on: [01-vercel-deploy]
---

# Desktop Browser Testing

## Objective
Verify the game works correctly across all major desktop browsers.

## Requirements
- Test on:
  - Chrome (primary target)
  - Firefox
  - Safari
  - Edge
- Test at these viewport sizes:
  - 1024×768 (minimum supported)
  - 1440×900 (common laptop)
  - 1920×1080 (common desktop)
- Verify for each browser:
  - Canvas drawing works smoothly
  - Mouse coordinates map correctly to canvas
  - All CSS renders correctly (fonts, animations, gradients)
  - API calls succeed
  - localStorage persistence works
  - No console errors during normal gameplay
- Fix any cross-browser issues found

## Acceptance Criteria
- [ ] Game is fully playable on Chrome, Firefox, Safari, Edge
- [ ] Drawing feels smooth on all browsers (no jitter or lag)
- [ ] CSS renders consistently (no broken layouts or missing styles)
- [ ] Game works at 1024×768 minimum viewport
- [ ] No JavaScript errors in console during normal play
- [ ] Canvas exports correctly on all tested browsers
- [ ] Fonts load and display correctly everywhere
