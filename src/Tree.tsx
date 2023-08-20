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

  const getRenderSubtree = (
    renderTree: TreeRender,
    childrenIds: number[],
    depth: number
  ) => {
    for (const childId of childrenIds) {
      const { id, title, children } = tree.map[childId];
      const node = { id, title, children, depth };
      renderTree.push(node);
      if (node.children.length !== 0) {
        getRenderSubtree(renderTree, node.children, depth + 1);
      }
    }
  };

  const getRenderTree = (formattedTree: TreeFormatted) => {
    const renderTree: TreeRender = [];
    for (const rootId of formattedTree.rootIds) {
      const nodeFormatted = formattedTree.map[rootId];
      const { id, title, children } = nodeFormatted;
      const depth = 1;
      const renderNode = { id, title, children, depth };
      renderTree.push(renderNode);
      if (renderNode.children.length !== 0) {
        getRenderSubtree(renderTree, renderNode.children, renderNode.depth + 1);
      }
    }
    return renderTree;
  };
  const [tree, setTree] = useState<TreeFormatted>(getFormattedTree(rawTree));
  const renderTree = getRenderTree(tree);

  const itemData = useMemo(
    () => ({
      renderTree,
      paddings: renderTree.map((node) => `${node.depth * 15}px`),
    }),
    [tree]
  );

  return <Example itemData={itemData} />;
};
