// All audio is synthesized with WebAudio — no audio files, tiny footprint,
// and nothing plays until the user's first gesture (autoplay-safe since
// the AudioContext is only created inside a click handler).
const btnMute = document.getElementById('btn-mute');

let ctx = null;
let muted = localStorage.getItem('doodlecafe-muted') === 'true';

export function initSounds() {
  renderMuteButton();
  btnMute.addEventListener('click', () => {
    muted = !muted;
    localStorage.setItem('doodlecafe-muted', String(muted));
    renderMuteButton();
    if (muted) {
      haltMusic();
    } else {
      playPop();
      if (musicWanted) startMusic();
    }
  });
}

function renderMuteButton() {
  btnMute.textContent = muted ? '🔇 Sound off' : '🔔 Sound on';
}

function getCtx() {
  if (muted) return null;
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function tone(freq, { type = 'sine', duration = 0.15, volume = 0.15, delay = 0, slide = 0 }) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + delay;
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slide) osc.frequency.exponentialRampToValueAtTime(Math.max(30, freq + slide), t0 + duration);
  gain.gain.setValueAtTime(volume, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.02);
}

function noise({ duration = 0.2, volume = 0.1, delay = 0, filterFrom = 800, filterTo = 400, q = 1 }) {
  const ac = getCtx();
  if (!ac) return;
  const t0 = ac.currentTime + delay;
  const len = Math.ceil(ac.sampleRate * duration);
  const buffer = ac.createBuffer(1, len, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;

  const src = ac.createBufferSource();
  src.buffer = buffer;
  const filter = ac.createBiquadFilter();
  filter.type = 'bandpass';
  filter.Q.value = q;
  filter.frequency.setValueAtTime(filterFrom, t0);
  filter.frequency.exponentialRampToValueAtTime(filterTo, t0 + duration);
  const gain = ac.createGain();
  gain.gain.setValueAtTime(volume, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  src.connect(filter).connect(gain).connect(ac.destination);
  src.start(t0);
}

/* === Sound Effects === */

export function playPop() {
  tone(420, { type: 'triangle', duration: 0.09, volume: 0.18, slide: 260 });
}

// Wooden door swinging open, then the shop bell jingling above it.
export function playDoorOpen() {
  noise({ duration: 0.35, volume: 0.09, filterFrom: 240, filterTo: 900, q: 2.5 });
  tone(1318, { duration: 0.28, volume: 0.1, delay: 0.18 });
  tone(1760, { duration: 0.32, volume: 0.08, delay: 0.24 });
  tone(1318, { duration: 0.45, volume: 0.07, delay: 0.38 });
  tone(2093, { duration: 0.5, volume: 0.05, delay: 0.42 });
}

// Warm "thunk" of setting a plate/cup on the counter.
export function playBaseSelect() {
  tone(196, { type: 'triangle', duration: 0.12, volume: 0.2, slide: -40 });
  tone(392, { type: 'triangle', duration: 0.18, volume: 0.12, delay: 0.05 });
}

// Soft watery "sploosh" of a paint dab.
export function playPaint() {
  noise({ duration: 0.14, volume: 0.07, filterFrom: 1400, filterTo: 500, q: 1.5 });
  tone(620, { type: 'sine', duration: 0.14, volume: 0.1, slide: -240 });
}

export function playServeBell() {
  tone(1568, { duration: 0.4, volume: 0.12 });
  tone(2093, { duration: 0.5, volume: 0.08, delay: 0.02 });
}

export function playGoodScore() {
  tone(523, { duration: 0.12, volume: 0.14 });
  tone(659, { duration: 0.12, volume: 0.14, delay: 0.1 });
  tone(784, { duration: 0.25, volume: 0.14, delay: 0.2 });
}

export function playBadScore() {
  tone(220, { type: 'sawtooth', duration: 0.25, volume: 0.08, slide: -60 });
  tone(160, { type: 'sawtooth', duration: 0.35, volume: 0.08, delay: 0.22, slide: -50 });
}

export function playDoorBell() {
  tone(988, { duration: 0.18, volume: 0.1 });
  tone(784, { duration: 0.3, volume: 0.1, delay: 0.12 });
}

/* === Background Music ===
   A gentle lo-fi loop: ii-V-I-ish jazz chords, soft triangle plucks
   over a round sine bass. Tempo eases between BPM_CALM and BPM_TENSE
   as the customer's patience drains — a nudge, never frantic. */

const BPM_CALM = 72;
const BPM_TENSE = 90;
const STEPS_PER_BAR = 8; // eighth notes
const LOOKAHEAD_S = 0.25;
const TICK_MS = 90;

// [bass, chord tones] per bar: Cmaj7 → Am7 → Fmaj7 → G7
const BARS = [
  [130.81, [261.63, 329.63, 392.0, 493.88]],
  [110.0,  [220.0, 261.63, 329.63, 392.0]],
  [87.31,  [174.61, 220.0, 261.63, 329.63]],
  [98.0,   [196.0, 246.94, 293.66, 349.23]],
];

// step → [chordToneIndex, velocity]; null = rest
const PLUCK_PATTERN = [
  [0, 0.9], null, [1, 0.8], [2, 0.5],
  [3, 0.8], null, [1, 0.7], [2, 0.4],
];

let musicWanted = false;
let music = null; // { step, nextNoteTime, bpm, targetBpm, intervalId }

export function startMusic() {
  musicWanted = true;
  const ac = getCtx();
  if (!ac || music) return;
  music = {
    step: 0,
    nextNoteTime: ac.currentTime + 0.1,
    bpm: BPM_CALM,
    targetBpm: BPM_CALM,
    intervalId: setInterval(musicTick, TICK_MS),
  };
}

export function stopMusic() {
  musicWanted = false;
  haltMusic();
}

function haltMusic() {
  if (!music) return;
  clearInterval(music.intervalId);
  music = null;
}

// fraction: patience remaining 0..1. Only the bottom half raises the tempo.
export function setMusicUrgency(fraction) {
  if (!music) return;
  const urgency = Math.min(1, Math.max(0, (0.5 - fraction) / 0.5));
  music.targetBpm = BPM_CALM + (BPM_TENSE - BPM_CALM) * urgency;
}

export function calmMusic() {
  if (music) music.targetBpm = BPM_CALM;
}

function musicTick() {
  const ac = getCtx();
  if (!ac || !music) return;

  music.bpm += (music.targetBpm - music.bpm) * 0.06;
  const stepDur = 60 / music.bpm / 2; // eighth note

  while (music.nextNoteTime < ac.currentTime + LOOKAHEAD_S) {
    scheduleStep(ac, music.step, music.nextNoteTime, stepDur);
    music.nextNoteTime += stepDur;
    music.step = (music.step + 1) % (STEPS_PER_BAR * BARS.length);
  }
}

function scheduleStep(ac, step, time, stepDur) {
  const bar = BARS[Math.floor(step / STEPS_PER_BAR)];
  const stepInBar = step % STEPS_PER_BAR;
  const [bassFreq, chord] = bar;

  if (stepInBar === 0) {
    musicNote(ac, bassFreq, time, stepDur * 3.5, 0.075, 'sine');
  } else if (stepInBar === 4) {
    musicNote(ac, bassFreq * 1.5, time, stepDur * 2, 0.045, 'sine');
  }

  const pluck = PLUCK_PATTERN[stepInBar];
  if (pluck) {
    const [idx, vel] = pluck;
    musicNote(ac, chord[idx], time, stepDur * 1.8, 0.038 * vel, 'triangle');
  }
}

function musicNote(ac, freq, t0, duration, volume, type) {
  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.linearRampToValueAtTime(volume, t0 + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.connect(gain).connect(ac.destination);
  osc.start(t0);
  osc.stop(t0 + duration + 0.05);
}
