import { getToppingsData } from './toppings.js';

export function scoreOrder(order, selectedBaseId, placedToppings, sectionColors) {
  const toppingsData = getToppingsData();
  const toppingLookup = Object.fromEntries(toppingsData.map(t => [t.id, t]));

  let points = 0;
  const breakdown = [];

  // 1. Base match
  if (selectedBaseId === order.baseId) {
    points += 50;
    breakdown.push({ label: 'Correct base', points: 50 });
  } else if (selectedBaseId) {
    points += 10;
    breakdown.push({ label: 'Wrong base', points: 10 });
  } else {
    breakdown.push({ label: 'No base selected', points: 0 });
  }

  // 2. Tag matching — collect all tags from placed toppings
  const placedTags = new Set();
  for (const placed of placedToppings) {
    const data = toppingLookup[placed.id];
    if (data) {
      for (const tag of data.tags) {
        placedTags.add(tag);
      }
    }
  }

  let matchedTags = 0;
  for (const tag of order.desiredTags) {
    if (placedTags.has(tag)) {
      matchedTags++;
    }
  }

  const tagPoints = matchedTags * 30;
  points += tagPoints;
  breakdown.push({ label: `Tags matched (${matchedTags}/${order.desiredTags.length})`, points: tagPoints });

  // 3. Category variety bonus
  const categories = new Set();
  for (const placed of placedToppings) {
    const data = toppingLookup[placed.id];
    if (data) categories.add(data.category);
  }
  const varietyPoints = Math.min(categories.size, 4) * 10;
  points += varietyPoints;
  breakdown.push({ label: `Variety (${categories.size} categories)`, points: varietyPoints });

  // 4. Topping count bonus (rewarding decoration effort)
  const effortPoints = Math.min(placedToppings.length, 6) * 5;
  points += effortPoints;
  breakdown.push({ label: `Toppings placed (${placedToppings.length})`, points: effortPoints });

  // 5. Coloring bonus
  const coloredSections = Object.keys(sectionColors).length;
  const colorPoints = Math.min(coloredSections, 4) * 10;
  points += colorPoints;
  breakdown.push({ label: `Sections colored (${coloredSections})`, points: colorPoints });

  // Star rating: max possible ~250 (50 base + 120 tags + 40 variety + 30 effort + 40 color)
  const maxPoints = 50 + (order.desiredTags.length * 30) + 40 + 30 + 40;
  const ratio = points / maxPoints;
  let stars;
  if (ratio >= 0.9) stars = 5;
  else if (ratio >= 0.7) stars = 4;
  else if (ratio >= 0.5) stars = 3;
  else if (ratio >= 0.3) stars = 2;
  else stars = 1;

  return { points, stars, breakdown, matchedTags, totalTags: order.desiredTags.length };
}

const REACTIONS = {
  5: [
    "Absolutely perfect! You're a genius!",
    "WOW! This is exactly what I wanted!",
    "This is a masterpiece! Five stars!",
  ],
  4: [
    "Ooh, this looks great! Really nice work!",
    "Love it! Almost exactly what I imagined!",
    "So pretty! I'm impressed!",
  ],
  3: [
    "Hey, not bad! I like it!",
    "This is decent! Thanks!",
    "Pretty good, I can work with this!",
  ],
  2: [
    "Hmm, it's okay I guess...",
    "Not quite what I had in mind...",
    "Could be better, but thanks anyway.",
  ],
  1: [
    "Um... this isn't really what I asked for.",
    "I don't think you understood my order...",
    "Well... at least you tried?",
  ],
};

export function getReaction(stars) {
  const options = REACTIONS[stars];
  return options[Math.floor(Math.random() * options.length)];
}
