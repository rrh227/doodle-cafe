---
title: Add Sound Effects (Stretch Goal)
status: done
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
- [x] Topping placement has audio feedback
- [x] Score reactions have distinct sounds
- [x] Mute button works, preference persists in localStorage
- [x] No sound before first user interaction
- [x] Game is fully playable without sound

> Note (2026-09-02): implemented in `client/js/sounds.js` with synthesized
> WebAudio tones instead of audio files (zero download weight, no assets
> under 100KB to manage). SFX: topping pop, serve bell, 3-note good-score
> chime, sawtooth bad-score womp, customer door bell. Mute toggle lives in
> the HUD, defaults to muted, persists via `doodlecafe-muted` localStorage
> key. AudioContext is created lazily on first unmuted playback, which
> satisfies autoplay policy. Background music skipped (stretch of a
> stretch; would need an asset).
