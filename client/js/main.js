import { setState, onState } from './game.js';
import { loadBases, showBaseOptions, resetBase } from './bases.js';
import { initColorPalette, resetColoring } from './coloring.js';

document.getElementById('btn-start').addEventListener('click', () => {
  setState('playing');
});

document.getElementById('btn-end-game').addEventListener('click', () => {
  setState('gameover');
});

document.getElementById('btn-replay').addEventListener('click', () => {
  setState('menu');
});

onState('playing', {
  onEnter() {
    showBaseOptions();
  },
  onExit() {
    resetBase();
    resetColoring();
  },
});

async function init() {
  await loadBases();
  initColorPalette();
  setState('menu');
}

init();
