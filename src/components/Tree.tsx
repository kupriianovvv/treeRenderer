import { useState, useMemo } from "react";
import { Rows } from "./Rows";
import { getFormattedTree } from "../utils/getFormattedTree";
import { getRenderTree } from "../utils/getRenderTree";

export type TreeResponseNode = {
  id: number;
  title: string;
  children: TreeResponseNode[];
};
export type TreeResponse = TreeResponseNode[];

export type TreeFormattedNode = {
  id: number;
  title: string;
  children: number[];
};

export type TreeFormatted = {
  rootIds: number[];
  map: Record<number, TreeFormattedNode>;
};

export type TreeRenderNode = {
  id?: number;
  title?: string;
  children?: number[];
  depth: number;
};

export type TreeRender = TreeRenderNode[];

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
  const [tree, setTree] = useState<TreeFormatted>(getFormattedTree(rawTree));
  const renderTree = getRenderTree(tree.map, tree.rootIds);

  const itemData = useMemo(
    () => ({
      renderTree
    }),
    [tree]
  );

  return <Rows itemData={itemData} />;
};
