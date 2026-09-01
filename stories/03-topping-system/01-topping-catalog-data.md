---
title: Create Topping Catalog Data
status: done
story: 03-topping-system
depends_on: [01-project-setup/01-init-project]
---

# Create Topping Catalog Data

## Objective
Define the full topping catalog as structured data. Each topping has metadata used for both display and scoring.

## Requirements
- `client/data/toppings.json` — array of 50+ topping definitions
- Each topping has: `id`, `name`, `category`, `tags[]`, `svgFile`
- Categories: fruits, sauces, dry_toppings, cream, decorative, savory
- Tags are scoring keywords (e.g., "warm", "autumn", "sweet", "tropical", "elegant")
- At least:
  - 10 fruits
  - 8 sauces/drizzles
  - 10 dry toppings
  - 6 cream/foam items
  - 10 decorative items
  - 6 savory items
- Tags should overlap across toppings (multiple items can be "warm" or "sweet")
- No topping should have more than 5 tags (keeps scoring focused)

## Acceptance Criteria
- [x] `toppings.json` exists with 50+ entries
- [x] Every entry has id, name, category, tags, svgFile fields
- [x] All 6 categories have adequate items
- [x] Tags are diverse and overlap meaningfully across items
- [x] JSON is valid and parseable
- [x] Tag vocabulary is documented (list of all available tags)

## Tag Vocabulary (31 tags)
antioxidant, artistic, autumn, berry, bright, citrus, classic, colorful, cool, creamy, crunchy, earthy, elegant, festive, floral, fresh, fun, green, luxurious, mild, natural, nutty, red, savory, spicy, summer, sweet, tart, tropical, warm, winter
