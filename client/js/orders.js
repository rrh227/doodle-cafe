let promptBank = [];
let usedPromptIds = new Set();
let orderNumber = 0;

const TIER_PATIENCE = { 1: 90, 2: 80, 3: 75, 4: 70 };

export async function loadPrompts() {
  const res = await fetch('./data/prompts.json');
  promptBank = await res.json();
}

export function resetOrders() {
  orderNumber = 0;
  usedPromptIds = new Set();
}

export function nextOrder() {
  orderNumber++;
  const tier = pickTier(orderNumber);
  const prompt = pickPrompt(tier);
  usedPromptIds.add(prompt.id);

  return {
    orderNumber,
    tier: prompt.tier,
    prompt,
    patienceSeconds: getPatienceSeconds(prompt.tier, orderNumber),
  };
}

function getPatienceSeconds(tier, order) {
  const base = TIER_PATIENCE[tier] || 80;
  return order > 30 ? base - 10 : base;
}

function pickTier(order) {
  if (order <= 5) return 1;
  if (order <= 10) return weightedPick([[2, 0.7], [1, 0.3]]);
  if (order <= 15) return weightedPick([[2, 0.7], [3, 0.3]]);
  if (order <= 25) return weightedPick([[3, 0.6], [2, 0.4]]);
  return weightedPick([[4, 0.5], [3, 0.3], [2, 0.2]]);
}

function weightedPick(pairs) {
  let roll = Math.random();
  for (const [value, weight] of pairs) {
    roll -= weight;
    if (roll <= 0) return value;
  }
  return pairs[pairs.length - 1][0];
}

function pickPrompt(tier) {
  let pool = promptBank.filter(p => p.tier === tier && !usedPromptIds.has(p.id));

  if (pool.length === 0) {
    pool = promptBank.filter(p => !usedPromptIds.has(p.id));
  }
  if (pool.length === 0) {
    // Entire bank exhausted this run — allow repeats within the tier.
    usedPromptIds.clear();
    pool = promptBank.filter(p => p.tier === tier);
  }

  return pool[Math.floor(Math.random() * pool.length)];
}
