import { getSelectedBase, getWorkspaceSvgDoc } from './bases.js';

// Warm, slightly desaturated paint pots (Coffee Talk / Lemon Cake tones).
// Hexes must stay in sync with idealColors in prompts.json.
const COLORS = [
  '#4A3429', '#FFFDF7', '#8C5A3C', '#D8BC94', '#EFA9B8',
  '#C9506B', '#E58E4B', '#EAB94D', '#7BA05B', '#6C87D1',
];

const colorPaletteEl = document.getElementById('color-palette');

let selectedColor = null;
let selectedSectionId = null;
let sectionColors = {};

export function initColorPalette() {
  colorPaletteEl.innerHTML = '';

  for (const color of COLORS) {
    const swatch = document.createElement('button');
    swatch.className = 'color-swatch';
    swatch.style.backgroundColor = color;
    swatch.dataset.color = color;
    swatch.addEventListener('click', () => pickColor(color));
    colorPaletteEl.appendChild(swatch);
  }

  const picker = document.createElement('input');
  picker.type = 'color';
  picker.id = 'color-picker';
  picker.className = 'color-picker';
  picker.value = '#E58E4B';
  picker.addEventListener('input', () => {
    pickColor(picker.value);
    picker.classList.add('active');
  });
  colorPaletteEl.appendChild(picker);
}

function pickColor(color) {
  selectedColor = color;

  const swatches = colorPaletteEl.querySelectorAll('.color-swatch');
  for (const s of swatches) {
    s.classList.toggle('active', s.dataset.color === color);
  }

  const picker = document.getElementById('color-picker');
  if (picker && !COLORS.includes(color)) {
    picker.classList.add('active');
  } else if (picker) {
    picker.classList.remove('active');
  }
}

export function bindSections() {
  const base = getSelectedBase();
  const svgDoc = getWorkspaceSvgDoc();
  if (!base || !svgDoc) return;

  for (const section of base.sections) {
    const el = svgDoc.getElementById(section.id);
    if (!el) continue;

    el.style.cursor = 'pointer';
    el.addEventListener('mouseenter', () => {
      if (el.dataset.sectionSelected !== 'true') {
        el.style.filter = 'brightness(0.95)';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (el.dataset.sectionSelected !== 'true') {
        el.style.filter = '';
      }
    });
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      selectSection(section.id, svgDoc, base);
    });
  }
}

function selectSection(sectionId, svgDoc, base) {
  for (const section of base.sections) {
    const el = svgDoc.getElementById(section.id);
    if (!el) continue;
    el.style.filter = '';
    el.dataset.sectionSelected = 'false';
    const paths = el.querySelectorAll('path, rect, circle, ellipse');
    for (const p of paths) {
      p.style.strokeDasharray = '';
    }
  }

  selectedSectionId = sectionId;
  const el = svgDoc.getElementById(sectionId);
  if (!el) return;

  el.dataset.sectionSelected = 'true';
  el.style.filter = 'drop-shadow(0 0 3px #4169E1)';

  if (selectedColor) {
    applyColor(sectionId, selectedColor);
  }
}

function applyColor(sectionId, color) {
  const svgDoc = getWorkspaceSvgDoc();
  if (!svgDoc) return;

  const el = svgDoc.getElementById(sectionId);
  if (!el) return;

  const fills = el.querySelectorAll('path, rect, circle, ellipse');
  for (const shape of fills) {
    const currentFill = shape.getAttribute('fill');
    if (currentFill && currentFill !== 'none') {
      shape.setAttribute('fill', color);
    }
  }

  sectionColors[sectionId] = color;
}

export function getSectionColors() {
  return { ...sectionColors };
}

export function resetColoring() {
  selectedColor = null;
  selectedSectionId = null;
  sectionColors = {};

  const swatches = colorPaletteEl.querySelectorAll('.color-swatch');
  for (const s of swatches) {
    s.classList.remove('active');
  }
}
