import { useState, useMemo, createContext } from "react";
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
      { id: 6, title: "x", children: [{ id: 10, title: "gg", children: [] }] },
      { id: 7, title: "y", children: [] },
    ],
  },
];
export const TreeContext = createContext<TreeFormatted | null>(null);
export const Tree = () => {
  const [tree, setTree] = useState<TreeFormatted>(getFormattedTree(rawTree));

  const onToggleElement = (tree: TreeFormatted, id: number) => {
    const subtreeIds = getSubtreeIds(tree, id);
    setTree((prevTree) => {
      const newTree = getToggledSubtree(prevTree, subtreeIds);
      return newTree;
    });
  };

  const renderData = useMemo(
    () => ({
      renderTree: getRenderTree(tree.map, tree.rootIds),
      onToggleElement,
      tree,
    }),
    [tree]
  );

  return (
    <TreeContext.Provider value={tree}>
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
    </TreeContext.Provider>
  );
};
