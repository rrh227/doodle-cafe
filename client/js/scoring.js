export function scoreOrder(prompt, selectedBaseId, placedToppings, sectionColors, patienceFraction = 0) {
  const breakdown = [];

  // 1. Base score (0-20)
  const baseWeight = selectedBaseId ? (prompt.idealBase[selectedBaseId] || 0) : 0;
  const basePoints = Math.round(baseWeight * 20);
  breakdown.push({ label: 'Base choice', points: basePoints });

  // 2. Color score (0-30) — average match weight of colored sections
  const chosenColors = Object.values(sectionColors);
  let colorPoints = 0;
  if (chosenColors.length > 0) {
    let totalWeight = 0;
    for (const color of chosenColors) {
      totalWeight += matchColorWeight(color, prompt.idealColors);
    }
    colorPoints = Math.round((totalWeight / chosenColors.length) * 30);
  }
  breakdown.push({ label: `Colors (${chosenColors.length} sections)`, points: colorPoints });

  // 3. Topping score (0-40) — each unique ideal topping adds weight × 10
  const placedIds = new Set(placedToppings.map(p => p.id));
  let toppingSum = 0;
  for (const id of placedIds) {
    toppingSum += (prompt.idealToppings[id] || 0) * 10;
  }
  const toppingPoints = Math.min(40, Math.round(toppingSum));
  breakdown.push({ label: `Toppings (${placedIds.size} kinds)`, points: toppingPoints });

  // 4. Combo bonus (0-10)
  let comboPoints = 0;
  let combosHit = 0;
  for (const [a, b] of prompt.bonusCombos || []) {
    if (placedIds.has(a) && placedIds.has(b)) {
      comboPoints += 5;
      combosHit++;
    }
  }
  comboPoints = Math.min(10, comboPoints);
  if (comboPoints > 0) {
    breakdown.push({ label: `Combo bonus (×${combosHit})`, points: comboPoints });
  }

  // Clutter penalty: off-theme topping types cost points, with a small
  // grace allowance so a couple of experimental picks aren't punished.
  const irrelevantCount = [...placedIds].filter(id => !(prompt.idealToppings[id] > 0)).length;
  const clutterPenalty = Math.max(0, irrelevantCount - 2) * 2;
  if (clutterPenalty > 0) {
    breakdown.push({ label: `Off-theme toppings (×${irrelevantCount - 2})`, points: -clutterPenalty });
  }

  let points = Math.max(0, basePoints + colorPoints + toppingPoints + comboPoints - clutterPenalty);

  // Patience bonus: up to +10% of earned points for serving quickly
  const patienceBonus = Math.round(points * 0.1 * patienceFraction);
  if (patienceBonus > 0) {
    breakdown.push({ label: 'Quick service', points: patienceBonus });
  }
  points = Math.min(100, points + patienceBonus);

  let stars;
  if (points >= 80) stars = 5;
  else if (points >= 60) stars = 4;
  else if (points >= 40) stars = 3;
  else if (points >= 20) stars = 2;
  else stars = 1;

  return { points, stars, breakdown };
}

function matchColorWeight(hex, idealColors) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 0;

  let best = 0;
  for (const [idealHex, weight] of Object.entries(idealColors)) {
    const ideal = hexToRgb(idealHex);
    if (!ideal) continue;
    const dist = Math.sqrt(
      (rgb.r - ideal.r) ** 2 + (rgb.g - ideal.g) ** 2 + (rgb.b - ideal.b) ** 2
    );
    // Full credit for close matches, partial credit up to a moderate distance
    if (dist <= 40) {
      best = Math.max(best, weight);
    } else if (dist <= 120) {
      best = Math.max(best, weight * (1 - (dist - 40) / 80) * 0.7);
    }
  }
  return best;
}

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

const REACTIONS = {
  5: [
    "This is EXACTLY what I wanted!",
    "Absolutely perfect! You're a genius!",
    "WOW! A masterpiece! Five stars!",
  ],
  4: [
    "Ooh, nice! Really lovely work!",
    "Love it! Almost exactly what I imagined!",
    "So pretty! I'm impressed!",
  ],
  3: [
    "It's fine, I guess.",
    "Hey, not bad! Thanks!",
    "Pretty decent, I can work with this.",
  ],
  2: [
    "Hmm, not quite...",
    "Not really what I had in mind...",
    "Could be better, but thanks anyway.",
  ],
  1: [
    "This isn't what I asked for!",
    "I don't think you understood my order...",
    "Well... at least you tried?",
  ],
};

export function getReaction(stars) {
  const options = REACTIONS[stars];
  return options[Math.floor(Math.random() * options.length)];
}
