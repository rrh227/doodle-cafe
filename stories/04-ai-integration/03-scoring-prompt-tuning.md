---
title: Tune AI Scoring System Prompt
status: todo
story: 04-ai-integration
depends_on: [01-openai-endpoint]
---

# Tune AI Scoring System Prompt

## Objective
Iterate on the system prompt to ensure AI scoring feels fair, fun, and consistent. The AI should be a generous-but-honest judge that rewards creative interpretation.

## Requirements
- Test the scoring endpoint with a variety of drawings:
  - A well-drawn match to the prompt → should score 4-5
  - A poorly drawn but conceptually correct attempt → should score 3-4 (rewards interpretation over skill)
  - A completely unrelated drawing → should score 1-2
  - A blank/scribble → should score 1
  - A creative/unexpected interpretation → should score 3-5 (reward lateral thinking)
- Adjust the system prompt until scoring feels fair across these cases
- Document the final system prompt in a constants file
- The AI feedback text should feel in-character (cafe customer, not a teacher grading homework)
- Scoring should lean generous — a 3 should be the "normal" score for a decent attempt

### Scoring Philosophy
- The game should feel like "can I make the AI understand my drawing?" not "can I draw well?"
- Abstract prompts should accept more interpretations as valid
- Effort should prevent blank submissions from scoring but not punish simple drawings

## Acceptance Criteria
- [ ] Test with 10+ sample drawings across quality levels
- [ ] Good-concept-bad-art scores at least 3 stars consistently
- [ ] Blank/scribble submissions reliably score 1 star
- [ ] Creative interpretations are rewarded (not penalized for being unexpected)
- [ ] Feedback text is short, friendly, and in-character
- [ ] Scoring is reasonably consistent (same drawing scored twice gets similar results)
- [ ] Final system prompt is documented and committed
