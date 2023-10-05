import { useMemo, useState } from "react";
import { getFormattedTree } from "../utils/getFormattedTree";
import { getRenderTree } from "../utils/getRenderTree";
import { addActiveElemInChildrenToOverElemNonRootSameLevel } from "../utils/addActiveElemInChildrenToOverElemNonRootSameLevel";
import {
  FormattedTreeContext,
  useFormattedTree,
} from "../contexts/FormattedTreeContext";

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

export const useTree = () => {
  const { tree, setTree } = useFormattedTree();
  const onToggleElements = (id: number) => {
    setTree((prevTree) => {
      prevTree.map[id].isVisible = !prevTree.map[id].isVisible;
    });
  };

  const renderData = useMemo(
    () => ({
      renderTree: getRenderTree(tree.map, tree.map[-1000].children),
      onToggleElements,
      tree,
    }),
    [tree]
  );

  return {
    renderData,
    onToggleElements,
  };
};
