---
title: Implement Drag and Drop Placement
status: done
story: 03-topping-system
depends_on: [03-catalog-ui, 02-base-items/04-workspace-layout]
---

# Implement Drag and Drop Placement

## Objective
Allow players to drag toppings from the catalog and drop them onto the workspace to decorate their base item.

## Requirements
- `client/js/builder.js` — manages the decoration workspace state
- Drag: mousedown on a catalog topping creates a draggable clone that follows the cursor
- Drop: releasing over the workspace places the topping at that position
- Dropping outside the workspace cancels the placement (clone disappears)
- Placed toppings are positioned absolutely within the workspace
- Placed toppings can be repositioned (drag again within workspace)
- Remove: right-click a placed topping to remove it, or drag it out of workspace bounds
- Max 8 toppings per order — show a counter ("3/8 toppings") and disable dragging at max
- Track placed toppings with their IDs (for scoring)
- Multiple of the same topping can be placed

## Acceptance Criteria
- [x] Dragging from catalog creates a visual clone at cursor
- [x] Dropping on workspace places the topping at that position
- [x] Dropping outside workspace cancels the drag
- [x] Placed toppings can be repositioned within workspace
- [x] Right-click (or drag off) removes a placed topping
- [x] Max 8 toppings enforced with visible counter
- [x] Topping IDs are tracked for scoring
- [x] Multiple copies of the same topping can be placed
- [x] Drag feels smooth (no lag or jitter)
