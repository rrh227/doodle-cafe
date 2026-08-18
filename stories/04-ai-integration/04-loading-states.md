---
title: Design Loading & Evaluation UX
status: todo
story: 04-ai-integration
depends_on: [02-frontend-api-client]
---

# Design Loading & Evaluation UX

## Objective
Make the 2-5 second API wait time feel intentional and fun, not broken. The loading state is a critical moment in the game's feel.

## Requirements
- After player hits "Serve":
  1. Canvas dims slightly (opacity reduction) — drawing is "locked in"
  2. A visual indicator appears: "Brewing your order..." or similar cafe-themed text
  3. Animated dots or a small animation plays (spinning cup, steam rising, etc.)
  4. Patience meter visibly pauses (stops draining)
- The loading state must handle variable wait times (2-10 seconds) without feeling stale
- If the wait exceeds 8 seconds, text changes to "Almost ready..." (reassures player it's still working)
- Transition from loading → result reveal should feel like an "unwrapping" moment
- On result: loading state clears, score appears with the customer reaction

## Acceptance Criteria
- [ ] Submitting a drawing immediately shows a loading state
- [ ] Canvas becomes non-interactive during loading
- [ ] Loading animation plays smoothly for 2-10 seconds without looking frozen
- [ ] Text updates at 8 seconds if still loading
- [ ] Patience meter visually pauses during loading
- [ ] Transition to result feels satisfying (not abrupt)
- [ ] Error states (timeout, server error) also clear the loading state cleanly
