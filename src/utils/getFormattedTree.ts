import { TreeFormattedNode, TreeResponse } from "../hooks/useTree";

export const getFormattedTree = (
  rawTree: TreeResponse,
  rootIds: number[] = [],
  parentId: number | null = null,
  map: Record<number, TreeFormattedNode> = {
    [-1000]: {
      id: -1000,
      title: "root",
      children: [],
      parentId: null,
      isExpanded: true,
    },
  }
) => {
  for (const rawTreeNode of rawTree) {
    const { id, title } = rawTreeNode;
    const children = rawTreeNode.children.map((child) => child.id);
    const formattedTreeNode = {
      id,
      title,
      children,
      parentId,
      isExpanded: true,
    };
    if (formattedTreeNode.parentId === null) {
      rootIds.push(formattedTreeNode.id);
      map[-1000].children.push(formattedTreeNode.id);
      formattedTreeNode.parentId = -1000;
    }
    map[id] = formattedTreeNode;
    if (children.length === 0) {
      continue;
    }
    getFormattedTree(rawTreeNode.children, rootIds, id, map);
  }
  return { rootIds, map };
};
