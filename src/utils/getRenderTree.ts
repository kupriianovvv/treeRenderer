import { TreeFormattedNodeMap } from "../entities/TreeFormatted";
import { TreeRender } from "../entities/TreeRender";
import { virtualNodeId } from "./const";

export const getRenderTree = (itemsMap: TreeFormattedNodeMap) => {
  const getRenderTreeInner = ({
    itemsMap,
    itemsIds,
    renderTree,
    depth,
  }: {
    itemsMap: TreeFormattedNodeMap;
    renderTree?: TreeRender;
    depth?: number;
    itemsIds?: number[];
  }) => {
    if (itemsIds === undefined) {
      itemsIds = itemsMap[virtualNodeId].children;
    }
    if (depth === undefined) {
      depth = 1;
    }
    if (renderTree === undefined) {
      renderTree = [];
    }

    for (const itemId of itemsIds) {
      const nodeFormatted = itemsMap[itemId];
      const { id, title, children, isExpanded } = nodeFormatted;

      const renderNode = { id, title, children, depth, isExpanded };
      renderTree.push(renderNode);

      if (renderNode.children.length !== 0 && renderNode.isExpanded) {
        getRenderTreeInner({
          itemsMap,
          renderTree,
          itemsIds: renderNode.children,
          depth: depth + 1,
        });
      }
    }
    return renderTree;
  };

  return getRenderTreeInner({ itemsMap });
};
