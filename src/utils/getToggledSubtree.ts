import { TreeFormatted } from "../components/Tree";

export const getToggledSubtree = (
  tree: TreeFormatted,
  subtreeIds: number[]
) => {
  const newTree = {
    ...tree,
    rootIds: [...tree.rootIds],
    map: { ...tree.map },
  };
  for (const id of subtreeIds) {
    const item = newTree.map[id];
    item.isVisible = !item.isVisible;
  }
  return newTree;
};
