const workspaceContentEl = document.getElementById('workspace-content');
const toppingCounterEl = document.getElementById('topping-counter');

let placedToppings = [];

export function getPlacedToppings() {
  return placedToppings.map(p => ({ id: p.id, x: p.x, y: p.y }));
}

export function resetBuilder() {
  const overlay = workspaceContentEl.querySelector('.topping-overlay');
  if (overlay) overlay.innerHTML = '';
  placedToppings = [];
  updateCounter();
}

function updateCounter() {
  toppingCounterEl.textContent = `${placedToppings.length} topping${placedToppings.length !== 1 ? 's' : ''}`;
}

export function startDragFromCatalog(topping, e) {
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
  el.className = 'placed-topping';
  el.style.left = (x - 30) + 'px';
  el.style.top = (y - 30) + 'px';
  el.draggable = false;

  const entry = { id: topping.id, x, y, el };
  placedToppings.push(entry);
  updateCounter();

  el.addEventListener('mousedown', (e) => {
    if (e.button !== 0) return;
    e.preventDefault();
    startRepositionDrag(entry, e);
  });

  el.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    removeTopping(entry);
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
