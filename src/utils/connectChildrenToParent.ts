import {
  TreeFormattedNode,
  TreeFormattedNodeMap,
} from "../entities/TreeFormatted";
import { TreeResponse } from "../entities/TreeResponse";
const connectChildrenToParent = (
  map: TreeFormattedNodeMap,
  parentId: number,
  children: TreeResponse
) => {
  const parentItem = map[parentId];
  parentItem.children = children.map((child) => child.id);
  parentItem.isExpanded = true;
  parentItem.isChildrenLoaded = true;
  for (const child of children) {
    const childFormatted: TreeFormattedNode = {
      id: child.id,
      title: child.title,
      children: [],
      parentId: parentId,
      isExpanded: false,
      isChildrenLoaded: false,
    };
    map[childFormatted.id] = childFormatted;
  }
};

export { connectChildrenToParent };
