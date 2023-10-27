import { TreeFormattedNodeMap } from "../entities/TreeFormatted";
import { TreeResponse } from "../entities/TreeResponse";

export const getFormattedTree = (
  rawTree: TreeResponse,
  rootIds: number[] = [],
  //@ts-ignore
  parentId: number = null,
  map: TreeFormattedNodeMap = {
    [-1000]: {
      id: -1000,
      title: "root",
      children: [],
      //@ts-ignore
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
      isExpanded: false,
      isChildrenLoaded: false,
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
