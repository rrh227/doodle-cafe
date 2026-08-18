---
title: Add Sound Effects (Stretch Goal)
status: todo
story: 07-visual-polish
depends_on: [03-animations]
---

# Add Sound Effects (Stretch Goal)

## Objective
Add optional audio feedback to enhance the cafe atmosphere and gameplay satisfaction. This is a stretch goal — the game must be fully playable without sound.

## Requirements
- Sound manager: simple module that plays audio clips with volume control
- Mute toggle: button on screen to disable all sound (default: muted — respect user choice)
- Sound effects needed:
  - Drawing: soft pencil/marker scratch (looping while drawing)
  - Submit/Serve: bell ding
  - Good score (4-5 stars): cheerful chime
  - Bad score (1-2 stars): sad/comic trombone
  - Customer enter: door bell
  - Customer leave: footsteps
  - Game over: cafe door lock click
- Background music: optional lo-fi cafe ambient track (loops)
- Audio files: use small, royalty-free sounds (OGG or MP3, under 100KB each)
- Web Audio API or simple `<audio>` elements (whichever is simpler)
- Handle browser autoplay restrictions (don't play until first user interaction)

## Acceptance Criteria
- [ ] Drawing produces a quiet scratch sound
- [ ] Serve/submit plays a bell sound
- [ ] Score reactions have distinct audio cues
- [ ] Mute button works and persists preference in localStorage
- [ ] No sound plays before first user interaction (browser policy compliance)
- [ ] All audio files are small (<100KB each)
- [ ] Game is fully playable with sound muted (no audio-dependent gameplay)
- [ ] Audio doesn't introduce noticeable lag or memory issues
