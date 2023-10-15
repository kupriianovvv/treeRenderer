import { TreeFormattedNode } from "./../store";

type TreeRenderNode = {
  id: number;
  title: string;
  children: number[];
  depth: number;
};

type TreeRender = TreeRenderNode[];

export const getRenderTree = (
  itemsMap: Record<number, TreeFormattedNode>,
  itemsIds: number[],
  renderTree: TreeRender = [],
  depth = 1
) => {
  for (const itemId of itemsIds) {
    const nodeFormatted = itemsMap[itemId];
    const { id, title, children, isExpanded } = nodeFormatted;

    const renderNode = { id, title, children, depth, isExpanded };
    renderTree.push(renderNode);

    if (renderNode.children.length !== 0 && renderNode.isExpanded) {
      getRenderTree(itemsMap, renderNode.children, renderTree, depth + 1);
    }
  }
  return renderTree;
};
