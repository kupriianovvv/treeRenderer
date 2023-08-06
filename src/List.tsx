import { useState } from "react";

const rawTree = [
  { id: 1, title: "a", children: [{ id: 4, title: "d", children: [] }] },
  { id: 2, title: "b", children: [] },
  {
    id: 3,
    title: "c",
    children: [
      { id: 5, title: "z", children: [] },
      { id: 6, title: "x", children: [] },
      { id: 7, title: "y", children: [] },
    ],
  },
];

const getFormattedTree = (
  rawTree,
  formattedTree = [],
  parentId = null,
  depth = 1
) => {
  for (const rawTreeNode of rawTree) {
    const { id, title } = rawTreeNode;
    const childrenIds = rawTreeNode.children.reduce((childrenIds, child) => {
      childrenIds.push(child.id);
      return childrenIds;
    }, []);
    const formattedTreeNode = {
      id,
      title,
      childrenIds,
      parentId,
      depth,
      opened: true,
    };
    formattedTree.push(formattedTreeNode);
    if (childrenIds.length === 0) {
      continue;
    }
    getFormattedTree(rawTreeNode.children, formattedTree, id, depth + 1);
  }
  return formattedTree;
};

export const List = () => {
  const [tree, setTree] = useState(getFormattedTree(rawTree));

  return (
    <ul>
      {tree.map((treeNode) => (
        <li style={{ marginLeft: (treeNode.depth - 1) * 10 }} key={treeNode.id}>
          {treeNode.title}
        </li>
      ))}
    </ul>
  );
};
