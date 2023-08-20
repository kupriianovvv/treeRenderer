import { TreeFormattedNode, TreeRender } from "../components/Tree";

export const getRenderTree = (
  itemsMap: Record<number, TreeFormattedNode>,
  itemsIds: number[],
  renderTree: TreeRender = [],
  depth = 1
) => {
  for (const itemId of itemsIds) {
    const nodeFormatted = itemsMap[itemId];
    const { id, title, children } = nodeFormatted;

    const renderNode = { id, title, children, depth };
    renderTree.push(renderNode);

    if (renderNode.children.length !== 0) {
      getRenderTree(itemsMap, renderNode.children, renderTree, depth + 1);
    }
  }
  return renderTree;
};
