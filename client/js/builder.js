import { playPop } from './sounds.js';

const workspaceContentEl = document.getElementById('workspace-content');
const toppingCounterEl = document.getElementById('topping-counter');

const MAX_TOPPING_TYPES = 8;
const MIN_SCALE = 0.5;
const MAX_SCALE = 2.2;
const SCALE_STEP = 1.1;
const ROTATE_STEP_DEG = 12;

let placedToppings = [];
let workspaceLocked = false;

export function getPlacedToppings() {
  return placedToppings.map(p => ({ id: p.id, x: p.x, y: p.y }));
}

export function setWorkspaceLocked(locked) {
  workspaceLocked = locked;
}

export function resetBuilder() {
  const overlay = workspaceContentEl.querySelector('.topping-overlay');
  if (overlay) overlay.innerHTML = '';
  placedToppings = [];
  workspaceLocked = false;
  updateCounter();
}

function placedTypeCount() {
  return new Set(placedToppings.map(p => p.id)).size;
}

function canPlaceType(id) {
  return placedToppings.some(p => p.id === id) || placedTypeCount() < MAX_TOPPING_TYPES;
}

function updateCounter() {
  const types = placedTypeCount();
  toppingCounterEl.textContent = `${types}/${MAX_TOPPING_TYPES} topping types`;
  toppingCounterEl.classList.toggle('at-limit', types >= MAX_TOPPING_TYPES);
}

export function startDragFromCatalog(topping, e) {
  if (workspaceLocked || !canPlaceType(topping.id)) return;
  blockWorkspacePointerEvents();

  const clone = document.createElement('img');
  clone.src = topping.svgFile;
  clone.className = 'drag-clone';
  positionClone(clone, e.clientX, e.clientY);
  document.body.appendChild(clone);

  const onMove = (ev) => positionClone(clone, ev.clientX, ev.clientY);

  const onUp = (ev) => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    clone.remove();
    restoreWorkspacePointerEvents();

    const rect = workspaceContentEl.getBoundingClientRect();
    if (isInsideRect(ev.clientX, ev.clientY, rect)) {
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      placeTopping(topping, x, y);
    }
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

function placeTopping(topping, x, y) {
  const overlay = workspaceContentEl.querySelector('.topping-overlay');
  if (!overlay) return;

  const el = document.createElement('img');
  el.src = topping.svgFile;
  el.className = 'placed-topping pop-in';
  el.style.left = (x - 30) + 'px';
  el.style.top = (y - 30) + 'px';
  el.draggable = false;
  el.addEventListener('animationend', () => el.classList.remove('pop-in'), { once: true });

  const entry = { id: topping.id, x, y, scale: 1, rotation: 0, el };
  placedToppings.push(entry);
  updateCounter();
  playPop();

  el.addEventListener('mousedown', (e) => {
    if (e.button !== 0 || workspaceLocked) return;
    e.preventDefault();
    startRepositionDrag(entry, e);
  });

  el.addEventListener('wheel', (e) => {
    if (workspaceLocked) return;
    e.preventDefault();
    const delta = e.deltaY !== 0 ? e.deltaY : e.deltaX;
    const dir = delta < 0 ? 1 : -1;
    if (e.shiftKey) {
      entry.rotation = (entry.rotation + dir * ROTATE_STEP_DEG + 360) % 360;
    } else {
      const next = dir > 0 ? entry.scale * SCALE_STEP : entry.scale / SCALE_STEP;
      entry.scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
    }
    applyTransform(entry);
  }, { passive: false });

  el.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (!workspaceLocked) removeTopping(entry);
  });

  overlay.appendChild(el);
}

function startRepositionDrag(entry, e) {
  const el = entry.el;
  const overlay = workspaceContentEl.querySelector('.topping-overlay');
  if (!overlay) return;

  el.classList.add('dragging');
  blockWorkspacePointerEvents();

  const startLeft = parseInt(el.style.left);
  const startTop = parseInt(el.style.top);
  const startX = e.clientX;
  const startY = e.clientY;

  const onMove = (ev) => {
    const dx = ev.clientX - startX;
    const dy = ev.clientY - startY;
    el.style.left = (startLeft + dx) + 'px';
    el.style.top = (startTop + dy) + 'px';
  };

  const onUp = (ev) => {
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
    el.classList.remove('dragging');
    restoreWorkspacePointerEvents();

    const rect = workspaceContentEl.getBoundingClientRect();
    if (!isInsideRect(ev.clientX, ev.clientY, rect)) {
      removeTopping(entry);
    } else {
      entry.x = parseInt(el.style.left) + 30;
      entry.y = parseInt(el.style.top) + 30;
    }
  };

  document.addEventListener('mousemove', onMove);
  document.addEventListener('mouseup', onUp);
}

function applyTransform(entry) {
  entry.el.style.transform = `rotate(${entry.rotation}deg) scale(${entry.scale})`;
}

function removeTopping(entry) {
  entry.el.remove();
  const idx = placedToppings.indexOf(entry);
  if (idx !== -1) placedToppings.splice(idx, 1);
  updateCounter();
}

function positionClone(clone, clientX, clientY) {
  clone.style.left = (clientX - 30) + 'px';
  clone.style.top = (clientY - 30) + 'px';
}

function isInsideRect(x, y, rect) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function blockWorkspacePointerEvents() {
  const obj = workspaceContentEl.querySelector('.workspace-svg');
  if (obj) obj.style.pointerEvents = 'none';
}

function restoreWorkspacePointerEvents() {
  const obj = workspaceContentEl.querySelector('.workspace-svg');
  if (obj) obj.style.pointerEvents = '';
}
