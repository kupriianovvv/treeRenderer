import { TreeFormattedNodeMap } from "../entities/TreeFormatted";
import { TreeRender } from "../entities/TreeRender";
import { virtualNodeId } from "./const";

export const getRenderTree = (itemsMap: TreeFormattedNodeMap) => {
  const getRenderTreeInner = (
    itemsMap: TreeFormattedNodeMap,
    itemsIds: number[],
    renderTree: TreeRender,
    depth: number
  ) => {
    for (const itemId of itemsIds) {
      const nodeFormatted = itemsMap[itemId];
      const { id, title, children, isExpanded } = nodeFormatted;

      const renderNode = { id, title, children, depth, isExpanded };
      renderTree.push(renderNode);

      if (renderNode.children.length !== 0 && renderNode.isExpanded) {
        getRenderTreeInner(
          itemsMap,
          renderNode.children,
          renderTree,
          depth + 1
        );
      }
    }
    return renderTree;
  };

  return getRenderTreeInner(itemsMap, itemsMap[virtualNodeId].children, [], 1);
};
