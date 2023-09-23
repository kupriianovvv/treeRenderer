import { useState, useMemo } from "react";
import { getFormattedTree } from "../utils/getFormattedTree";
import { getRenderTree } from "../utils/getRenderTree";
import { Item } from "./Item";

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
  isVisible: boolean;
  parentId: number;
};

export type TreeFormatted = {
  rootIds: number[];
  map: Record<number, TreeFormattedNode>;
};

export type TreeRenderNode = {
  id: number;
  title: string;
  children: number[];
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
      {
        id: 6,
        title: "x",
        children: [
          {
            id: 10,
            title: "gg",
            children: [{ id: 11, title: "dd", children: [] }],
          },
        ],
      },
      { id: 7, title: "y", children: [] },
    ],
  },
];
export const Tree = () => {
  const [tree, setTree] = useState<TreeFormatted>(getFormattedTree(rawTree));

  const onToggleElements = (id: number) => {
    setTree((prevTree) => {
      const newTree = { ...prevTree, map: { ...prevTree.map } };
      newTree.map[id].isVisible = !newTree.map[id].isVisible;
      console.log(newTree);
      return newTree;
    });
  };

  const renderData = useMemo(
    () => ({
      renderTree: getRenderTree(tree.map, tree.rootIds),
      onToggleElements,
      tree,
    }),
    [tree]
  );

  console.log(renderData.renderTree);

  return renderData.renderTree.map((item) => (
    <Item
      onClick={() => onToggleElements(item.id)}
      key={item.id}
      depth={item.depth}
      title={item.title}
    />
  ));
};
