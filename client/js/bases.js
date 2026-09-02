import { bindSections } from './coloring.js';

let basesData = [];
let selectedBaseId = null;
let availableBases = [];

const baseOptionsEl = document.getElementById('base-options');
const workspaceContentEl = document.getElementById('workspace-content');
const workspacePlaceholderEl = document.getElementById('workspace-placeholder');
const btnServe = document.getElementById('btn-serve');

export async function loadBases() {
  const res = await fetch('./data/bases.json');
  basesData = await res.json();
}

export function showBaseOptions(baseIds) {
  selectedBaseId = null;
  availableBases = baseIds
    ? basesData.filter(b => baseIds.includes(b.id))
    : basesData.slice(0, 3);

  baseOptionsEl.innerHTML = '';
  workspaceContentEl.innerHTML = '';
  workspaceContentEl.appendChild(workspacePlaceholderEl);
  workspacePlaceholderEl.style.display = '';
  btnServe.disabled = true;

  for (const base of availableBases) {
    const btn = document.createElement('button');
    btn.className = 'base-option';
    btn.dataset.baseId = base.id;
    btn.title = base.name;

    const img = document.createElement('img');
    img.src = base.file;
    img.alt = base.name;
    img.style.width = '90%';
    img.style.height = '90%';
    img.style.objectFit = 'contain';
    btn.appendChild(img);

    btn.addEventListener('click', () => selectBase(base.id));
    baseOptionsEl.appendChild(btn);
  }
}

export function selectBase(baseId) {
  const base = basesData.find(b => b.id === baseId);
  if (!base) return;

  selectedBaseId = baseId;

  const options = baseOptionsEl.querySelectorAll('.base-option');
  for (const opt of options) {
    opt.classList.toggle('selected', opt.dataset.baseId === baseId);
  }

  workspacePlaceholderEl.style.display = 'none';
  const existing = workspaceContentEl.querySelector('.workspace-svg');
  if (existing) existing.remove();
  const existingOverlay = workspaceContentEl.querySelector('.topping-overlay');
  if (existingOverlay) existingOverlay.remove();

  const obj = document.createElement('object');
  obj.type = 'image/svg+xml';
  obj.data = base.file;
  obj.className = 'workspace-svg';
  obj.style.width = '100%';
  obj.style.height = '100%';
  obj.addEventListener('load', () => {
    bindSections();
  });
  workspaceContentEl.appendChild(obj);

  const overlay = document.createElement('div');
  overlay.className = 'topping-overlay';
  workspaceContentEl.appendChild(overlay);

  btnServe.disabled = false;
}

export function getSelectedBase() {
  if (!selectedBaseId) return null;
  return basesData.find(b => b.id === selectedBaseId);
}

export function getWorkspaceSvgDoc() {
  const obj = workspaceContentEl.querySelector('.workspace-svg');
  if (!obj) return null;
  return obj.contentDocument;
}

export function resetBase() {
  selectedBaseId = null;
  baseOptionsEl.innerHTML = '';
  workspaceContentEl.innerHTML = '';
  workspaceContentEl.appendChild(workspacePlaceholderEl);
  workspacePlaceholderEl.style.display = '';
  btnServe.disabled = true;
  document.getElementById('topping-counter').textContent = '0/8 topping types';
}
