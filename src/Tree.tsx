import { useState, memo, useMemo } from "react";
import { FixedSizeList as List, areEqual } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { Row } from "./Row";
import { Example } from "./Example";

type TreeResponseNode = {
  id: number;
  title: string;
  children: TreeResponseNode[];
};
type TreeResponse = TreeResponseNode[];

type TreeFormattedNode = {
  id: number;
  title: string;
  children: number[];
};

type TreeFormatted = {
  rootIds: number[];
  map: Record<number, TreeFormattedNode>;
};

type TreeRenderNode = {
  id?: number;
  title?: string;
  children?: number[];
  depth: number;
};

type TreeRender = TreeRenderNode[];

const rawTree: TreeResponse = [
  { id: 1, title: "a", children: [{ id: 4, title: "d", children: [] }] },
  { id: 2, title: "b", children: [] },
  {
    id: 3,
    title: "c",
    children: [
      { id: 5, title: "z", children: [] },
      { id: 6, title: "x", children: [{ id: 10, title: "gg", children: [] }] },
      { id: 7, title: "y", children: [] },
    ],
  },
];

export const Tree = () => {
  const getFormattedTree = (
    rawTree: TreeResponse,
    rootIds: number[] = [],
    parentId: number | null = null,
    map: Record<number, TreeFormattedNode> = {} // Pick<TreeFormatted, "map">
  ) => {
    for (const rawTreeNode of rawTree) {
      const { id, title } = rawTreeNode;
      const children = rawTreeNode.children.map((child) => child.id);
      const formattedTreeNode = {
        id,
        title,
        children,
        parentId,
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

  const getRenderTree = (
    itemsMap: Record<number, TreeFormattedNode>,
    itemsIds: number[],
    renderTree: TreeRender = [],
    depth = 1
  ) => {
    for (const itemId of itemsIds) {
      const nodeFormatted = itemsMap[itemId];
      const { id, title, children } = nodeFormatted;

      const renderNode = { id, title, children, depth };
      renderTree.push(renderNode);

      if (renderNode.children.length !== 0) {
        getRenderTree(itemsMap, renderNode.children, renderTree, depth + 1);
      }
    }
    return renderTree;
  };
  const [tree, setTree] = useState<TreeFormatted>(getFormattedTree(rawTree));
  const renderTree = getRenderTree(tree.map, tree.rootIds);

  const itemData = useMemo(
    () => ({
      renderTree,
      paddings: renderTree.map((node) => `${node.depth * 15}px`),
    }),
    [tree]
  );

  return <Example itemData={itemData} />;
};
