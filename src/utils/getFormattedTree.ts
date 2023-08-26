import { TreeFormattedNode, TreeResponse } from "../components/Tree";

export const getFormattedTree = (
  rawTree: TreeResponse,
  rootIds: number[] = [],
  parentId: number | null = null,
  map: Record<number, TreeFormattedNode> = {}
) => {
  for (const rawTreeNode of rawTree) {
    const { id, title } = rawTreeNode;
    const children = rawTreeNode.children.map((child) => child.id);
    const formattedTreeNode = {
      id,
      title,
      children,
      parentId,
      isVisible: true,
    };
    if (formattedTreeNode.parentId === null) {
      rootIds.push(formattedTreeNode.id);
    }
    map[id] = formattedTreeNode;
    if (children.length === 0) {
      continue;
    }
    getFormattedTree(rawTreeNode.children, rootIds, id, map);
  }
  return { rootIds, map };
};
