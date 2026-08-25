---
title: Add Sound Effects (Stretch Goal)
status: todo
story: 07-visual-polish
depends_on: [03-animations]
---

# Add Sound Effects (Stretch Goal)

## Objective
Optional audio feedback to enhance gameplay. Game must work without sound.

## Requirements
- Mute toggle (default: muted)
- Sound effects: topping place (pop), serve (bell), good score (chime), bad score (trombone), customer enter (door bell)
- Optional background lo-fi music
- Respect browser autoplay policy (no sound until first interaction)
- Small files (<100KB each)

## Acceptance Criteria
- [ ] Topping placement has audio feedback
- [ ] Score reactions have distinct sounds
- [ ] Mute button works, preference persists in localStorage
- [ ] No sound before first user interaction
- [ ] Game is fully playable without sound
