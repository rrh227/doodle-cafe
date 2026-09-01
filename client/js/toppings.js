let toppingsData = [];
let activeCategory = 'all';

const toppingTabsEl = document.getElementById('topping-tabs');
const toppingGridEl = document.getElementById('topping-grid');

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'fruits', label: 'Fruits' },
  { id: 'sauces', label: 'Sauces' },
  { id: 'dry_toppings', label: 'Dry' },
  { id: 'cream', label: 'Cream' },
  { id: 'decorative', label: 'Deco' },
  { id: 'savory', label: 'Savory' },
  { id: 'abstract', label: 'Abstract' },
];

export async function loadToppings() {
  const res = await fetch('./data/toppings.json');
  toppingsData = await res.json();
}

export function showToppingCatalog(onStartDrag) {
  activeCategory = 'all';
  renderTabs(onStartDrag);
  renderGrid(onStartDrag);
}

export function hideToppingCatalog() {
  toppingTabsEl.innerHTML = '';
  toppingGridEl.innerHTML = '';
}

function renderTabs(onStartDrag) {
  toppingTabsEl.innerHTML = '';
  for (const cat of CATEGORIES) {
    const btn = document.createElement('button');
    btn.className = 'topping-tab';
    if (cat.id === activeCategory) btn.classList.add('active');
    btn.textContent = cat.label;
    btn.addEventListener('click', () => {
      activeCategory = cat.id;
      renderTabs(onStartDrag);
      renderGrid(onStartDrag);
    });
    toppingTabsEl.appendChild(btn);
  }
}

function renderGrid(onStartDrag) {
  toppingGridEl.innerHTML = '';
  const filtered = activeCategory === 'all'
    ? toppingsData
    : toppingsData.filter(t => t.category === activeCategory);

  for (const topping of filtered) {
    const cell = document.createElement('div');
    cell.className = 'topping-cell';
    cell.dataset.toppingId = topping.id;
    cell.title = topping.name;

    const img = document.createElement('img');
    img.src = topping.svgFile;
    img.alt = topping.name;
    img.draggable = false;
    cell.appendChild(img);

    cell.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      e.preventDefault();
      onStartDrag(topping, e);
    });

    toppingGridEl.appendChild(cell);
  }
}

export function getToppingsData() {
  return toppingsData;
}
