import { useMemo, useState } from "react";
import { getFormattedTree } from "../utils/getFormattedTree";
import { getRenderTree } from "../utils/getRenderTree";
import { addActiveElemInChildrenToOverElemNonRootSameLevel } from "../utils/addActiveElemInChildrenToOverElemNonRootSameLevel";

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

export const useTree = (rawTree: TreeResponse) => {
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

  const handleCenterDrag = (activeId: number, overId: number) => {
    setTree((prevTree) =>
      addActiveElemInChildrenToOverElemNonRootSameLevel(
        prevTree,
        activeId,
        overId
      )
    );
  };

  return {
    renderData,
    onToggleElements,
    handleCenterDrag,
  };
};
