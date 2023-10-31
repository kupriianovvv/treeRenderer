import { TreeFormattedNodeMap } from "../entities/TreeFormatted";

const isLoadingNeeded = (
  parentId: number | undefined,
  map: TreeFormattedNodeMap
) => {
  const isRootElement = parentId === undefined;
  if (isRootElement) return true;
  const isChildrenLoaded = map[parentId].isChildrenLoaded;
  return !isChildrenLoaded;
};

export { isLoadingNeeded };
