import { TreeFormatted } from "../components/Tree";

export const getSubtreeIds = (
  tree: TreeFormatted,
  parentId: number,
  subtreeIds: number[] = []
) => {
  const parentItem = tree.map[parentId];

  for (const childrenId of parentItem.children) {
    subtreeIds.push(childrenId);
    getSubtreeIds(tree, childrenId, subtreeIds);
  }
  return subtreeIds;
};
