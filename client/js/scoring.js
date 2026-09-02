import { getToppingsData } from './toppings.js';

export function scoreOrder(prompt, selectedBase, placedToppings, sectionColors, patienceFraction = 0) {
  const breakdown = [];

  // 1. Base score (0-20)
  const baseWeight = selectedBase ? (prompt.idealBase[selectedBase.id] || 0) : 0;
  const basePoints = Math.round(baseWeight * 20);
  breakdown.push({ label: 'Base choice', points: basePoints });

  // 2. Color score (0-35) — theme coverage. Each prompt lists ideal theme
  // colors; the player earns each color's weight by using something close to
  // it anywhere on the plate. Full credit means covering the whole theme
  // palette, regardless of how many sections were painted. A mild power curve
  // (^1.3) still rewards full-palette plates most, but partial coverage now
  // pays fairly instead of being crushed by squaring.
  const chosenColors = Object.values(sectionColors);
  const themeEntries = Object.entries(prompt.idealColors);
  let colorPoints = 0;
  let themeColorsHit = 0;
  if (chosenColors.length > 0 && themeEntries.length > 0) {
    let earned = 0;
    let totalWeight = 0;
    for (const [idealHex, weight] of themeEntries) {
      totalWeight += weight;
      let bestQuality = 0;
      for (const color of chosenColors) {
        bestQuality = Math.max(bestQuality, colorMatchQuality(color, idealHex));
      }
      earned += weight * bestQuality;
      if (bestQuality > 0) themeColorsHit++;
    }
    const coverage = earned / totalWeight;
    colorPoints = Math.round(Math.pow(coverage, 1.3) * 35);
  }
  breakdown.push({ label: `Theme colors (${themeColorsHit}/${themeEntries.length} matched)`, points: colorPoints });

  // 3. Topping score (0-35) — theme fit over count. Every placed type gets a
  // theme affinity: its explicit idealToppings weight, or a derived partial
  // score when it shares a category or tags (color/flavor/mood, e.g. "red",
  // "creamy") with the prompt's ideal toppings. Fit (avg affinity of on-theme
  // types, 0-25) dominates; variety (distinct on-theme types, 0-10) is the
  // minor term. Off-theme toppings are neutral: they never subtract points or
  // dilute the fit average — creative extras are free.
  const placedIds = new Set(placedToppings.map(p => p.id));
  const affinities = new Map(
    [...placedIds].map(id => [id, themeAffinity(id, prompt)])
  );
  const onThemeAffinities = [...affinities.values()].filter(a => a >= 0.3);

  let fitPoints = 0;
  if (onThemeAffinities.length > 0) {
    const affinitySum = onThemeAffinities.reduce((sum, a) => sum + a, 0);
    fitPoints = Math.round((affinitySum / onThemeAffinities.length) * 25);
  }
  breakdown.push({ label: 'Topping theme fit', points: fitPoints });

  const onThemeCount = onThemeAffinities.length;
  const varietyPoints = Math.round(Math.min(4, onThemeCount) * 2.5);
  if (placedIds.size > 0) {
    breakdown.push({ label: `Topping variety (${onThemeCount} on-theme)`, points: varietyPoints });
  }
  const toppingPoints = fitPoints + varietyPoints;

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

  let points = Math.max(0, basePoints + colorPoints + toppingPoints + comboPoints);

  // Patience bonus: up to +10% of earned points for serving quickly
  const patienceBonus = Math.round(points * 0.1 * patienceFraction);
  if (patienceBonus > 0) {
    breakdown.push({ label: 'Quick service', points: patienceBonus });
  }
  points = Math.min(100, points + patienceBonus);

  // 4-star requires >=70 so a plate with zero coloring (max ~69 with the
  // 20+35+10 non-color axes) tops out at 3 stars.
  let stars;
  if (points >= 85) stars = 5;
  else if (points >= 70) stars = 4;
  else if (points >= 50) stars = 3;
  else if (points >= 20) stars = 2;
  else stars = 1;

  return { points, stars, breakdown };
}

// How well a topping fits the prompt's theme, 0-1. Explicitly ideal toppings
// use their listed weight. Anything else earns derived partial credit by
// resembling the ideal set: a single shared tag (color/flavor/mood word like
// "red" or "creamy") already counts well, and sharing a category adds more.
// This effectively widens each order's valid topping list — anything in the
// same palette, flavor family, or category as an ideal pick scores decently.
function themeAffinity(toppingId, prompt) {
  const explicit = prompt.idealToppings[toppingId];
  if (explicit > 0) return explicit;

  const catalog = getToppingsData();
  const topping = catalog.find(t => t.id === toppingId);
  if (!topping) return 0;

  const idealIds = Object.keys(prompt.idealToppings);
  let best = 0;
  for (const id of idealIds) {
    const ideal = catalog.find(t => t.id === id);
    if (!ideal) continue;

    const sharedTags = topping.tags.filter(tag => ideal.tags.includes(tag)).length;
    const sameCategory = topping.category === ideal.category ? 1 : 0;
    // One shared tag is already a solid signal; two maxes the tag term.
    const similarity = Math.min(1, sharedTags / 2) * 0.6 + sameCategory * 0.25;
    best = Math.max(best, similarity * (prompt.idealToppings[id] || 0));
  }
  return Math.min(best, 0.7);
}

// 1 for a close match, tapering partial credit up to a generous distance —
// being in the right color neighborhood is enough for most of the credit.
function colorMatchQuality(hex, idealHex) {
  const rgb = hexToRgb(hex);
  const ideal = hexToRgb(idealHex);
  if (!rgb || !ideal) return 0;

  const dist = Math.sqrt(
    (rgb.r - ideal.r) ** 2 + (rgb.g - ideal.g) ** 2 + (rgb.b - ideal.b) ** 2
  );
  if (dist <= 70) return 1;
  if (dist <= 180) return (1 - (dist - 70) / 110) * 0.85;
  return 0;
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
