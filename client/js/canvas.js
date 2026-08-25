let canvas = null;
let ctx = null;
let isDrawing = false;
let lastX = 0;
let lastY = 0;

const LOGICAL_SIZE = 400;
const EXPORT_SIZE = 512;
const MAX_HISTORY = 10;

let currentTool = 'brush';
let currentColor = '#000000';
let currentSize = 8;

let undoStack = [];
let redoStack = [];

export const BRUSH_SIZES = { small: 3, medium: 8, large: 16 };

export function initCanvas(container) {
  const dpr = window.devicePixelRatio || 1;

  canvas = document.createElement('canvas');
  canvas.width = LOGICAL_SIZE * dpr;
  canvas.height = LOGICAL_SIZE * dpr;
  canvas.style.width = `${LOGICAL_SIZE}px`;
  canvas.style.height = `${LOGICAL_SIZE}px`;
  canvas.id = 'drawing-canvas';

  ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  clearCanvas();
  saveState();

  container.innerHTML = '';
  container.appendChild(canvas);

  canvas.addEventListener('mousedown', handleMouseDown);
  canvas.addEventListener('mousemove', handleMouseMove);
  canvas.addEventListener('mouseup', handleMouseUp);
  canvas.addEventListener('mouseleave', handleMouseUp);
  canvas.addEventListener('selectstart', (e) => e.preventDefault());

  return canvas;
}

export function clearCanvas(addToHistory = false) {
  if (!ctx) return;
  if (addToHistory) saveState();
  const dpr = window.devicePixelRatio || 1;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}

export function resetHistory() {
  undoStack = [];
  redoStack = [];
}

function saveState() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  undoStack.push(imageData);
  if (undoStack.length > MAX_HISTORY) undoStack.shift();
  redoStack = [];
}

export function undo() {
  if (undoStack.length <= 1) return false;
  const current = undoStack.pop();
  redoStack.push(current);
  const prev = undoStack[undoStack.length - 1];
  ctx.putImageData(prev, 0, 0);
  return true;
}

export function redo() {
  if (redoStack.length === 0) return false;
  const next = redoStack.pop();
  undoStack.push(next);
  ctx.putImageData(next, 0, 0);
  return true;
}

export function canUndo() {
  return undoStack.length > 1;
}

export function canRedo() {
  return redoStack.length > 0;
}

export function getCanvasDataURL() {
  const exportCanvas = document.createElement('canvas');
  exportCanvas.width = EXPORT_SIZE;
  exportCanvas.height = EXPORT_SIZE;
  const exportCtx = exportCanvas.getContext('2d');
  exportCtx.drawImage(canvas, 0, 0, EXPORT_SIZE, EXPORT_SIZE);
  return exportCanvas.toDataURL('image/png');
}

export function setTool(tool) {
  currentTool = tool;
}

export function setColor(color) {
  currentColor = color;
}

export function setBrushSize(size) {
  currentSize = size;
}

export function getTool() {
  return currentTool;
}

export function getColor() {
  return currentColor;
}

export function getBrushSize() {
  return currentSize;
}

export function getContext() {
  return ctx;
}

export function getCanvas() {
  return canvas;
}

function getMousePos(e) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function getDrawColor() {
  if (currentTool === 'eraser') return '#FFFFFF';
  return currentColor;
}

function handleMouseDown(e) {
  e.preventDefault();
  const pos = getMousePos(e);

  if (currentTool === 'fill') {
    saveState();
    floodFill(Math.round(pos.x), Math.round(pos.y), currentColor);
    return;
  }

  isDrawing = true;
  lastX = pos.x;
  lastY = pos.y;

  // Draw a dot for single clicks
  ctx.fillStyle = getDrawColor();
  ctx.beginPath();
  ctx.arc(lastX, lastY, currentSize / 2, 0, Math.PI * 2);
  ctx.fill();
}

function handleMouseMove(e) {
  if (!isDrawing) return;
  e.preventDefault();
  const pos = getMousePos(e);

  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';
  ctx.lineWidth = currentSize;
  ctx.strokeStyle = getDrawColor();

  // Interpolate for smoothness using quadratic curve
  const midX = (lastX + pos.x) / 2;
  const midY = (lastY + pos.y) / 2;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.quadraticCurveTo(lastX, lastY, midX, midY);
  ctx.stroke();

  lastX = pos.x;
  lastY = pos.y;
}

function handleMouseUp(e) {
  if (!isDrawing) return;
  isDrawing = false;
  saveState();
}

const BOUNDARY_THRESHOLD = 220;

function floodFill(startX, startY, fillColor) {
  const dpr = window.devicePixelRatio || 1;
  const width = LOGICAL_SIZE * dpr;
  const height = LOGICAL_SIZE * dpr;
  const sx = Math.round(startX * dpr);
  const sy = Math.round(startY * dpr);

  const imageData = ctx.getImageData(0, 0, width, height);
  const data = imageData.data;

  const startIdx = (sy * width + sx) * 4;
  if (!isBackground(data, startIdx)) return;

  const fill = hexToRgb(fillColor);
  if (
    data[startIdx] === fill.r &&
    data[startIdx + 1] === fill.g &&
    data[startIdx + 2] === fill.b
  ) {
    return;
  }

  const visited = new Uint8Array(width * height);
  const stack = [sx, sy];

  while (stack.length > 0) {
    const y = stack.pop();
    const x = stack.pop();

    if (x < 0 || x >= width || y < 0 || y >= height) continue;

    const idx = y * width + x;
    if (visited[idx]) continue;
    visited[idx] = 1;

    const pi = idx * 4;
    if (!isBackground(data, pi)) continue;

    data[pi] = fill.r;
    data[pi + 1] = fill.g;
    data[pi + 2] = fill.b;
    data[pi + 3] = 255;

    stack.push(x + 1, y);
    stack.push(x - 1, y);
    stack.push(x, y + 1);
    stack.push(x, y - 1);
  }

  ctx.putImageData(imageData, 0, 0);
}

function isBackground(data, idx) {
  return (
    data[idx] >= BOUNDARY_THRESHOLD &&
    data[idx + 1] >= BOUNDARY_THRESHOLD &&
    data[idx + 2] >= BOUNDARY_THRESHOLD
  );
}

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
}
