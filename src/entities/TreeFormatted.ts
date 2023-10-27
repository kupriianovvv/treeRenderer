type TreeFormattedNode = {
  id: number;
  title: string;
  children: number[];
  isExpanded: boolean;
  parentId: number;
  isChildrenLoaded: boolean;
};

type TreeFormattedNodeMap = Record<number, TreeFormattedNode>;

type TreeFormatted = {
  rootIds: number[];
  map: TreeFormattedNodeMap;
};

export type { TreeFormatted, TreeFormattedNodeMap, TreeFormattedNode };
