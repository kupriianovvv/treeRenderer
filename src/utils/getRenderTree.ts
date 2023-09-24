import { TreeFormattedNode, TreeRender } from "../hooks/useTree";

export const getRenderTree = (
  itemsMap: Record<number, TreeFormattedNode>,
  itemsIds: number[],
  renderTree: TreeRender = [],
  depth = 1
) => {
  for (const itemId of itemsIds) {
    const nodeFormatted = itemsMap[itemId];
    const { id, title, children, isVisible } = nodeFormatted;

    const renderNode = { id, title, children, depth, isVisible };
    renderTree.push(renderNode);

    if (renderNode.children.length !== 0 && renderNode.isVisible) {
      getRenderTree(itemsMap, renderNode.children, renderTree, depth + 1);
    }
  }
  return renderTree;
};
