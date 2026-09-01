import { setState, onState } from './game.js';
import { loadBases, showBaseOptions, resetBase, getSelectedBase } from './bases.js';
import { initColorPalette, resetColoring, getSectionColors } from './coloring.js';
import { loadToppings, showToppingCatalog, hideToppingCatalog } from './toppings.js';
import { startDragFromCatalog, resetBuilder, getPlacedToppings } from './builder.js';
import { generateOrder, resetOrders } from './orders.js';
import { scoreOrder, getReaction } from './scoring.js';

const promptTextEl = document.getElementById('prompt-text');
const orderNumberEl = document.getElementById('order-number');
const scoreValueEl = document.getElementById('score-value');
const scoreOverlay = document.getElementById('score-overlay');
const scoreStarsEl = document.getElementById('score-stars');
const scoreReactionEl = document.getElementById('score-reaction');
const scoreBreakdownEl = document.getElementById('score-breakdown');
const scoreTotalEl = document.getElementById('score-total');
const btnServe = document.getElementById('btn-serve');
const btnNextOrder = document.getElementById('btn-next-order');
const reputationFillEl = document.getElementById('reputation-fill');
const reputationValueEl = document.getElementById('reputation-value');
const finalScoreEl = document.getElementById('final-score');
const finalOrdersEl = document.getElementById('final-orders');
const finalBestEl = document.getElementById('final-best');

let currentOrder = null;
let totalScore = 0;
let ordersServed = 0;
let bestRating = 0;
let reputation = 3.5;

document.getElementById('btn-start').addEventListener('click', () => {
  setState('playing');
});

document.getElementById('btn-end-game').addEventListener('click', () => {
  setState('gameover');
});

document.getElementById('btn-replay').addEventListener('click', () => {
  setState('menu');
});

btnServe.addEventListener('click', () => {
  if (!currentOrder) return;

  const base = getSelectedBase();
  const selectedBaseId = base ? base.id : null;
  const placed = getPlacedToppings();
  const colors = getSectionColors();

  const result = scoreOrder(currentOrder, selectedBaseId, placed, colors);
  const reaction = getReaction(result.stars);

  totalScore += result.points;
  ordersServed++;
  if (result.stars > bestRating) bestRating = result.stars;

  reputation = Math.max(0, Math.min(5,
    reputation + (result.stars - 3) * 0.3
  ));
  updateHUD();

  showScoreOverlay(result, reaction);
});

btnNextOrder.addEventListener('click', () => {
  hideScoreOverlay();

  if (reputation <= 0.5) {
    setState('gameover');
    return;
  }

  resetBase();
  resetColoring();
  resetBuilder();
  startNewOrder();
});

onState('playing', {
  onEnter() {
    totalScore = 0;
    ordersServed = 0;
    bestRating = 0;
    reputation = 3.5;
    resetOrders();
    updateHUD();
    showToppingCatalog(startDragFromCatalog);
    startNewOrder();
  },
  onExit() {
    hideScoreOverlay();
    resetBase();
    resetColoring();
    resetBuilder();
    hideToppingCatalog();
    currentOrder = null;

    finalScoreEl.textContent = totalScore;
    finalOrdersEl.textContent = ordersServed;
    finalBestEl.textContent = bestRating;
  },
});

function startNewOrder() {
  const bases = [
    { id: 'latte' }, { id: 'iced_drink' }, { id: 'cupcake' },
    { id: 'toast' }, { id: 'smoothie_bowl' },
  ];
  currentOrder = generateOrder(bases);
  promptTextEl.textContent = currentOrder.prompt;
  orderNumberEl.textContent = currentOrder.orderNumber;
  showBaseOptions();
}

function updateHUD() {
  scoreValueEl.textContent = totalScore;
  reputationValueEl.textContent = reputation.toFixed(1);
  reputationFillEl.style.width = `${(reputation / 5) * 100}%`;

  if (reputation >= 3) {
    reputationFillEl.style.backgroundColor = 'var(--sage)';
  } else if (reputation >= 1.5) {
    reputationFillEl.style.backgroundColor = '#FFD700';
  } else {
    reputationFillEl.style.backgroundColor = '#dc143c';
  }
}

function showScoreOverlay(result, reaction) {
  const filled = '★'.repeat(result.stars);
  const empty = '☆'.repeat(5 - result.stars);
  scoreStarsEl.textContent = filled + empty;

  scoreReactionEl.textContent = reaction;

  scoreBreakdownEl.innerHTML = '';
  for (const row of result.breakdown) {
    const div = document.createElement('div');
    div.className = 'breakdown-row';
    div.innerHTML = `<span>${row.label}</span><span class="pts">+${row.points}</span>`;
    scoreBreakdownEl.appendChild(div);
  }

  scoreTotalEl.textContent = `Total: ${result.points} points`;

  scoreOverlay.classList.remove('hidden');
  btnServe.disabled = true;
}

function hideScoreOverlay() {
  scoreOverlay.classList.add('hidden');
}

async function init() {
  await Promise.all([loadBases(), loadToppings()]);
  initColorPalette();
  setState('menu');
}

init();
