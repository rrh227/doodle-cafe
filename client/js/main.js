import { setState, onState } from './game.js';
import { loadBases, showBaseOptions, resetBase, getSelectedBase } from './bases.js';
import { initColorPalette, resetColoring, getSectionColors } from './coloring.js';
import { loadToppings, showToppingCatalog, hideToppingCatalog } from './toppings.js';
import { startDragFromCatalog, resetBuilder, getPlacedToppings, setWorkspaceLocked } from './builder.js';
import { loadPrompts, resetOrders, nextOrder } from './orders.js';
import { scoreOrder, getReaction } from './scoring.js';
import {
  spawnCustomer, showReaction, exitCustomer,
  startPatience, pausePatience, stopPatience, getPatienceFraction, resetCustomers,
} from './customers.js';
import {
  initSounds, playServeBell, playGoodScore, playBadScore, playDoorBell,
  playDoorOpen, startMusic, stopMusic, calmMusic,
} from './sounds.js';

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
const speechBubbleEl = document.getElementById('speech-bubble');
const hudScoreEl = document.getElementById('hud-score');
const streakIndicatorEl = document.getElementById('streak-indicator');

// Balance-tested via simulation (500 runs/archetype): from a fresh 3.5 start,
// four 1-star or eight 2-star orders end the run. 4-star (+0.10) no longer
// fully offsets a 3-star (-0.15), so mid-skill runs wind down (median ~55
// orders) instead of lasting forever. Novice runs average ~6 orders.
const REPUTATION_START = 3.5;
const STAR_REP_DELTA = { 5: 0.25, 4: 0.1, 3: -0.15, 2: -0.2, 1: -0.4 };
const GAME_OVER_THRESHOLD = 2.0;

let currentOrder = null;
let currentTier = 0;
let totalScore = 0;
let displayedScore = 0;
let ordersServed = 0;
let bestRating = 0;
let reputation = REPUTATION_START;
let scoreAnimId = null;
let streak = 0;

document.getElementById('btn-start').addEventListener('click', () => {
  playDoorOpen();
  setState('playing');
});

document.getElementById('btn-end-game').addEventListener('click', () => {
  setState('gameover');
});

document.getElementById('btn-replay').addEventListener('click', () => {
  setState('menu');
});

btnServe.addEventListener('click', () => serveOrder(false));

btnNextOrder.addEventListener('click', () => {
  hideScoreOverlay();
  exitCustomer();

  if (reputation < GAME_OVER_THRESHOLD) {
    setState('gameover');
    return;
  }

  resetWorkspace();
  startNewOrder();
});

onState('playing', {
  onEnter() {
    totalScore = 0;
    displayedScore = 0;
    ordersServed = 0;
    bestRating = 0;
    streak = 0;
    updateStreakIndicator();
    reputation = REPUTATION_START;
    resetOrders();
    updateHUD();
    showToppingCatalog(startDragFromCatalog);
    startMusic();
    startNewOrder();
  },
  onExit() {
    stopMusic();
    hideScoreOverlay();
    resetWorkspace();
    hideToppingCatalog();
    resetCustomers();
    currentOrder = null;
    currentTier = 0;

    finalScoreEl.textContent = totalScore;
    finalOrdersEl.textContent = ordersServed;
    finalBestEl.textContent = bestRating;
  },
});

function startNewOrder() {
  currentOrder = nextOrder();
  const prompt = currentOrder.prompt;

  promptTextEl.textContent = prompt.text;
  orderNumberEl.textContent = currentOrder.orderNumber;

  if (currentOrder.tier > currentTier && currentTier > 0) {
    speechBubbleEl.classList.remove('tier-up');
    void speechBubbleEl.offsetWidth;
    speechBubbleEl.classList.add('tier-up');
  }
  currentTier = Math.max(currentTier, currentOrder.tier);

  spawnCustomer();
  playDoorBell();
  startPatience(currentOrder.patienceSeconds, () => serveOrder(true));
  showBaseOptions(prompt.offeredBases);
}

function serveOrder(timedOut) {
  if (!currentOrder) return;

  pausePatience();
  calmMusic();
  setWorkspaceLocked(true);
  btnServe.disabled = true;

  let result, reaction;
  if (timedOut) {
    result = { points: 0, stars: 1, breakdown: [{ label: 'Customer left!', points: 0 }] };
    reaction = "Forget it, I don't have all day!";
  } else {
    result = scoreOrder(
      currentOrder.prompt,
      getSelectedBase(),
      getPlacedToppings(),
      getSectionColors(),
      getPatienceFraction()
    );
    reaction = getReaction(result.stars);
  }

  stopPatience();

  totalScore += result.points;
  ordersServed++;
  if (result.stars > bestRating) bestRating = result.stars;

  streak = result.stars >= 4 ? streak + 1 : 0;
  updateStreakIndicator();
  if (result.points > 0) showScorePopup(result.points);

  reputation = Math.max(0, Math.min(5,
    reputation + STAR_REP_DELTA[result.stars]
  ));

  updateHUD();
  showReaction(result.stars);
  if (!timedOut) playServeBell();
  if (result.stars >= 4) playGoodScore();
  else if (result.stars <= 2) playBadScore();
  showScoreOverlay(result, reaction);
}

function resetWorkspace() {
  setWorkspaceLocked(false);
  resetBase();
  resetColoring();
  resetBuilder();
}

function updateHUD() {
  animateScoreTo(totalScore);

  reputationValueEl.textContent = reputation.toFixed(1);
  reputationFillEl.style.width = `${(reputation / 5) * 100}%`;

  if (reputation >= 4) {
    reputationFillEl.style.backgroundColor = 'var(--sage)';
  } else if (reputation >= 2.5) {
    reputationFillEl.style.backgroundColor = 'var(--honey)';
  } else {
    reputationFillEl.style.backgroundColor = 'var(--berry)';
  }
}

function updateStreakIndicator() {
  const glowing = streak >= 3;
  hudScoreEl.classList.toggle('streak-glow', glowing);
  streakIndicatorEl.classList.toggle('hidden', !glowing);
  if (glowing) streakIndicatorEl.textContent = `✦ ${streak} streak!`;
}

function showScorePopup(points) {
  const popup = document.createElement('span');
  popup.className = 'score-popup';
  popup.textContent = `+${points}`;
  hudScoreEl.appendChild(popup);
  popup.addEventListener('animationend', () => popup.remove(), { once: true });
}

function animateScoreTo(target) {
  if (scoreAnimId) cancelAnimationFrame(scoreAnimId);

  if (target <= displayedScore) {
    displayedScore = target;
    scoreValueEl.textContent = target;
    return;
  }

  const start = displayedScore;
  const startTime = performance.now();
  const duration = 600;

  const step = (now) => {
    const t = Math.min(1, (now - startTime) / duration);
    displayedScore = Math.round(start + (target - start) * t);
    scoreValueEl.textContent = displayedScore;
    if (t < 1) {
      scoreAnimId = requestAnimationFrame(step);
    } else {
      scoreAnimId = null;
    }
  };
  scoreAnimId = requestAnimationFrame(step);
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
    const sign = row.points < 0 ? '' : '+';
    div.className += row.points < 0 ? ' penalty' : '';
    div.innerHTML = `<span>${row.label}</span><span class="pts">${sign}${row.points}</span>`;
    scoreBreakdownEl.appendChild(div);
  }

  scoreTotalEl.textContent = `Total: ${result.points} points`;

  scoreOverlay.classList.remove('hidden');
}

function hideScoreOverlay() {
  scoreOverlay.classList.add('hidden');
}

async function init() {
  await Promise.all([loadBases(), loadToppings(), loadPrompts()]);
  initColorPalette();
  initSounds();
  setState('menu');
}

init();
