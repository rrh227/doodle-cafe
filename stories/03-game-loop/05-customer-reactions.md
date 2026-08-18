---
title: Implement Customer Reactions
status: todo
story: 03-game-loop
depends_on: [03-order-flow]
---

# Implement Customer Reactions

## Objective
After the AI returns a score, the customer reacts visually before leaving. This is the payoff moment — the player sees the consequences of their drawing.

## Requirements
- Five reaction states mapped to star ratings (1-5):
  - 5 stars: Ecstatic — hearts/stars particle effect, big grin, "Amazing!" text
  - 4 stars: Happy — smile, thumbs up, "Nice!" text
  - 3 stars: Neutral — shrug, "It's okay..." text
  - 2 stars: Disappointed — frown, "Hmm..." text
  - 1 star: Angry — red face, storm cloud, "Terrible!" text
- Reaction displays for 2 seconds before customer exits
- Points awarded are shown briefly near the customer (+100, +75, etc.)
- Customer facial expression changes (can be simple emoji-like SVG or CSS art)
- Brief screen shake or flash on 1-star ratings (subtle "uh oh" feedback)

## Acceptance Criteria
- [ ] Each star rating produces a visually distinct reaction
- [ ] Reaction text is readable and appropriate to the rating
- [ ] Points earned are displayed briefly (floating number animation)
- [ ] Reactions last ~2 seconds before the customer exits
- [ ] 1-star reaction has an additional "danger" visual cue
- [ ] 5-star reaction has a celebration feel (particles, glow, or similar)
- [ ] Reactions are clearly visible in the game layout
