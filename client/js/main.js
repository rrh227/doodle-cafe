import { setState, onState } from './game.js';
import { loadBases, showBaseOptions, resetBase } from './bases.js';
import { initColorPalette, resetColoring } from './coloring.js';
import { loadToppings, showToppingCatalog, hideToppingCatalog } from './toppings.js';
import { startDragFromCatalog, resetBuilder } from './builder.js';

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
    showToppingCatalog(startDragFromCatalog);
  },
  onExit() {
    resetBase();
    resetColoring();
    resetBuilder();
    hideToppingCatalog();
  },
});

async function init() {
  await Promise.all([loadBases(), loadToppings()]);
  initColorPalette();
  setState('menu');
}

init();
