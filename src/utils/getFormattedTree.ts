import { TreeFormattedNode } from "./../store";
type TreeRenderNode = {
  id: number;
  title: string;
  children: number[];
  depth: number;
};

type TreeRender = TreeRenderNode[];

export type TreeResponseNode = {
  id: number;
  title: string;
  children: TreeResponseNode[];
};
export type TreeResponse = TreeResponseNode[];

export const getFormattedTree = (
  rawTree: TreeResponse,
  rootIds: number[] = [],
  //@ts-ignore
  parentId: number = null,
  map: Record<number, TreeFormattedNode> = {
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
