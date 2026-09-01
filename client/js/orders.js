import { getToppingsData } from './toppings.js';

const GREETINGS = [
  "Hi! I'd love",
  "Hey there! Can I get",
  "Ooh, I'm craving",
  "Could you make me",
  "I'd really like",
  "Today I want",
  "Surprise me with",
  "I'm in the mood for",
];

const TAG_DESCRIPTIONS = {
  sweet: 'something sweet',
  warm: 'warm vibes',
  cool: 'something cool',
  tropical: 'tropical flavors',
  berry: 'lots of berries',
  citrus: 'citrusy zing',
  crunchy: 'a nice crunch',
  creamy: 'creamy goodness',
  elegant: 'an elegant touch',
  classic: 'a classic feel',
  autumn: 'autumn vibes',
  summer: 'summer vibes',
  earthy: 'earthy tones',
  nutty: 'nutty flavors',
  fun: 'something fun',
  fresh: 'something fresh',
  artistic: 'artistic flair',
  colorful: 'lots of color',
  festive: 'a festive look',
  bright: 'bright colors',
  whimsical: 'whimsical decorations',
  dreamy: 'a dreamy vibe',
  cute: 'something cute',
  luxurious: 'a luxurious feel',
  savory: 'savory toppings',
  spicy: 'a little kick',
  floral: 'floral touches',
  tart: 'a tart twist',
  natural: 'natural ingredients',
  mild: 'mellow flavors',
  green: 'something green',
  red: 'something red',
  winter: 'cozy winter vibes',
};

const BASE_NAMES = {
  latte: 'a latte',
  iced_drink: 'an iced drink',
  cupcake: 'a cupcake',
  toast: 'some toast',
  smoothie_bowl: 'a smoothie bowl',
};

const ALL_TAGS = Object.keys(TAG_DESCRIPTIONS);

let orderNumber = 0;

export function resetOrders() {
  orderNumber = 0;
}

export function generateOrder(availableBases) {
  orderNumber++;
  const toppings = getToppingsData();

  const base = availableBases[Math.floor(Math.random() * availableBases.length)];

  const tagCount = Math.min(2 + Math.floor(orderNumber / 3), 4);
  const availableTags = getWeightedTags(toppings);
  const desiredTags = pickRandom(availableTags, tagCount);

  const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  const baseName = BASE_NAMES[base.id] || base.name.toLowerCase();
  const tagPhrases = desiredTags.map(t => TAG_DESCRIPTIONS[t] || t);
  const tagText = joinNatural(tagPhrases);

  const prompt = `${greeting} ${baseName} with ${tagText}!`;

  return {
    orderNumber,
    baseId: base.id,
    desiredTags,
    prompt,
  };
}

function getWeightedTags(toppings) {
  const tagCounts = {};
  for (const t of toppings) {
    for (const tag of t.tags) {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    }
  }
  return ALL_TAGS.filter(t => tagCounts[t] >= 2);
}

function pickRandom(arr, count) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function joinNatural(items) {
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
}
