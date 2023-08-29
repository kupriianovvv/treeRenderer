import { useState, useMemo } from "react";
import { getFormattedTree } from "../utils/getFormattedTree";
import { getRenderTree } from "../utils/getRenderTree";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { Row } from "./Row";
import { getSubtreeIds } from "../utils/getSubtreeIds";
import { getToggledSubtree } from "../utils/getToggledSubtree";

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

  return (
    <AutoSizer>
      {({ height, width }) => {
        return (
          <List
            className="List"
            height={height * 0.8}
            itemCount={renderData.renderTree.length}
            itemSize={40}
            itemData={renderData}
            width={width * 0.8}
          >
            {Row}
          </List>
        );
      }}
    </AutoSizer>
  );
};
