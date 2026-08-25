import { setState, onState } from './game.js';
import { initCanvas, clearCanvas, resetHistory, setTool, setBrushSize, setColor, undo, redo, canUndo, canRedo, BRUSH_SIZES } from './canvas.js';

let canvasInitialized = false;

// Undo/Redo/Clear
const btnUndo = document.getElementById('btn-undo');
const btnRedo = document.getElementById('btn-redo');
const btnClear = document.getElementById('btn-clear');

function updateUndoRedoState() {
  btnUndo.disabled = !canUndo();
  btnRedo.disabled = !canRedo();
}

btnUndo.addEventListener('click', () => {
  undo();
  updateUndoRedoState();
});

btnRedo.addEventListener('click', () => {
  redo();
  updateUndoRedoState();
});

btnClear.addEventListener('click', () => {
  clearCanvas(true);
  updateUndoRedoState();
});

document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
      updateUndoRedoState();
    } else if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
      e.preventDefault();
      redo();
      updateUndoRedoState();
    }
  }
});

// Listen for canvas changes to update undo/redo button state
document.addEventListener('mouseup', () => {
  setTimeout(updateUndoRedoState, 0);
});

// Game state hooks
onState('playing', {
  onEnter() {
    if (!canvasInitialized) {
      const container = document.getElementById('canvas-placeholder');
      initCanvas(container);
      canvasInitialized = true;
    } else {
      resetHistory();
      clearCanvas();
    }
    updateUndoRedoState();
  },
  onExit() {},
});

// Tool buttons
document.querySelectorAll('.tool-btn[data-tool]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tool-btn[data-tool]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    setTool(btn.dataset.tool);
  });
});

// Size buttons
document.querySelectorAll('.size-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.size-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    setBrushSize(BRUSH_SIZES[btn.dataset.size]);
  });
});

// Color swatches
document.querySelectorAll('.color-swatch').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.color-swatch').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    setColor(btn.dataset.color);
  });
});

// Navigation buttons
document.getElementById('btn-start').addEventListener('click', () => {
  setState('playing');
});

document.getElementById('btn-end-game').addEventListener('click', () => {
  setState('gameover');
});

document.getElementById('btn-replay').addEventListener('click', () => {
  setState('menu');
});

setState('menu');
