# treeRenderer

A tree view with expand/collapse and full drag-and-drop reordering: drop an item **above** or **below** a node, or **onto** it to nest inside.

Demo: https://tree-renderer.vercel.app/

## What's inside

- **Normalized tree state** — the tree is stored as a flat `id -> node` map with `children: id[]` and `parentId`, instead of a nested structure. Moves and toggles are O(1) lookups plus local mutations, and no deep cloning is needed
- **Three drop positions per node** (upper / center / lower) implemented with [dnd-kit](https://dndkit.com/): each node exposes three drop zones, and the drop handler rewires `parentId`/`children` links accordingly
- **Zustand + Immer** for state: mutations are written imperatively but stay immutable
- Expand/collapse state lives on the node, so the visible tree is derived from the map on each render

## Run locally

```bash
pnpm install
pnpm dev
```
