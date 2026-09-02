// All SFX are synthesized with WebAudio — no audio files, tiny footprint,
// and nothing plays until the user's first gesture (autoplay-safe since
// the AudioContext is only created inside a click handler).
const btnMute = document.getElementById('btn-mute');

let ctx = null;
let muted = localStorage.getItem('doodlecafe-muted') !== 'false';

export function initSounds() {
  renderMuteButton();
  btnMute.addEventListener('click', () => {
    muted = !muted;
    localStorage.setItem('doodlecafe-muted', String(muted));
    renderMuteButton();
    if (!muted) playPop();
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

export function playPop() {
  tone(420, { type: 'triangle', duration: 0.09, volume: 0.18, slide: 260 });
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
