const customerSlot = document.getElementById('customer-slot');
const patienceFill = document.getElementById('patience-fill');

const VARIANT_COUNT = 6;

const MOODS = { 5: 'ecstatic', 4: 'happy', 3: 'neutral', 2: 'disappointed', 1: 'angry' };
const EMOTES = { 5: '♥ ♥', 4: '♪', 3: '…', 2: '?', 1: '✱!' };

let customerEl = null;
let timer = null;

export function spawnCustomer() {
  removeCurrentCustomer();

  const variant = 1 + Math.floor(Math.random() * VARIANT_COUNT);
  customerEl = document.createElement('div');
  customerEl.className = `customer variant-${variant}`;
  customerEl.dataset.mood = 'neutral';
  customerEl.innerHTML = `
    <div class="customer-emote"></div>
    <div class="customer-head">
      <div class="customer-hair"></div>
      <div class="customer-face">
        <span class="customer-eyes"></span>
        <span class="customer-mouth"></span>
      </div>
    </div>
    <div class="customer-body"></div>
  `;
  customerSlot.appendChild(customerEl);
}

export function showReaction(stars) {
  if (!customerEl) return;
  customerEl.dataset.mood = MOODS[stars] || 'neutral';
  const emote = customerEl.querySelector('.customer-emote');
  emote.textContent = EMOTES[stars] || '';
}

export function exitCustomer() {
  if (!customerEl) return;
  const el = customerEl;
  customerEl = null;
  const angry = el.dataset.mood === 'angry';
  el.classList.add(angry ? 'leaving-angry' : 'leaving');
  setTimeout(() => el.remove(), 600);
}

export function startPatience(seconds, onTimeout) {
  stopPatience();
  timer = {
    remainingMs: seconds * 1000,
    totalMs: seconds * 1000,
    lastTick: performance.now(),
    intervalId: null,
    onTimeout,
  };
  timer.intervalId = setInterval(tickPatience, 100);
  renderPatience();
}

function tickPatience() {
  if (!timer) return;
  const now = performance.now();
  timer.remainingMs -= now - timer.lastTick;
  timer.lastTick = now;
  renderPatience();

  if (timer.remainingMs <= 0) {
    const cb = timer.onTimeout;
    stopPatience();
    patienceFill.style.width = '0%';
    if (cb) cb();
  }
}

export function pausePatience() {
  if (timer && timer.intervalId) {
    clearInterval(timer.intervalId);
    timer.intervalId = null;
  }
}

export function getPatienceFraction() {
  if (!timer) return 0;
  return Math.max(0, timer.remainingMs / timer.totalMs);
}

export function stopPatience() {
  if (timer && timer.intervalId) clearInterval(timer.intervalId);
  timer = null;
}

function renderPatience() {
  const fraction = getPatienceFraction();
  patienceFill.style.width = `${fraction * 100}%`;
  if (fraction > 0.5) {
    patienceFill.style.backgroundColor = 'var(--sage)';
  } else if (fraction > 0.25) {
    patienceFill.style.backgroundColor = '#FFD700';
  } else {
    patienceFill.style.backgroundColor = '#dc143c';
  }
}

export function resetCustomers() {
  stopPatience();
  patienceFill.style.width = '100%';
  patienceFill.style.backgroundColor = 'var(--sage)';
  customerSlot.innerHTML = '';
  customerEl = null;
}

function removeCurrentCustomer() {
  if (customerEl) {
    customerEl.remove();
    customerEl = null;
  }
}
