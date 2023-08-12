import { useState } from "react";

window.rawTree = [
  { id: 1, title: "a", children: [{ id: 4, title: "d", children: [] }] },
  { id: 2, title: "b", children: [] },
  {
    id: 3,
    title: "c",
    children: [
      { id: 5, title: "z", children: [] },
      { id: 6, title: "x", children: [{ id: 10, title: "gg", children: [] }] },
      { id: 7, title: "y", children: [] },
    ],
  },
];

const myState = {
  root: [1, 2, 3],
  map: {
    5: { id: 5, title: "z", children: { id: 9 } },
  },
};

window.getFormattedTree = (
  rawTree,
  rootIds = [],
  parentId = null,
  map = {}
) => {
  for (const rawTreeNode of rawTree) {
    const { id, title, children } = rawTreeNode;
    const formattedTreeNode = {
      id,
      title,
      children,
      parentId,
    };
    if (formattedTreeNode.parentId === null) {
      rootIds.push(formattedTreeNode);
    }
    map[id] = formattedTreeNode;
    if (children.length === 0) {
      continue;
    }
    getFormattedTree(rawTreeNode.children, rootIds, id, map);
  }
  return { rootIds, map };
};

window.getRenderSubtree = (renderTree, subtree, depth) => {
  for (const node of subtree) {
    node.depth = depth;
    renderTree.push(node);
    if (node.children.length !== 0) {
      getRenderSubtree(renderTree, node.children, depth + 1);
    }
  }
};

window.getRenderTree = (formattedTree) => {
  const renderTree = [];
  for (const rootId of formattedTree.rootIds) {
    const node = formattedTree.map[rootId.id];
    node.depth = 1;
    renderTree.push(node);
    if (node.children.length !== 0) {
      window.getRenderSubtree(renderTree, node.children, node.depth + 1);
    }
  }
  return renderTree;
};

export const List = () => {
  const [tree, setTree] = useState<any[]>(getFormattedTree(rawTree));
  const renderTree = getRenderTree(tree);

  return (
    <ul>
      {renderTree.map((node) => {
        return (
          <li style={{ marginLeft: `${node.depth * 15}px` }} key={node.id}>
            {node.title}
          </li>
        );
      })}
    </ul>
  );
};
