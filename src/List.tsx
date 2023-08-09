import { useState } from "react";

window.rawTree = [
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

window.getFormattedTree = (rawTree, formattedTree = [], parentId = null) => {
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
    };
    formattedTree.push(formattedTreeNode);
    if (childrenIds.length === 0) {
      continue;
    }
    getFormattedTree(rawTreeNode.children, formattedTree, id);
  }
  return formattedTree;
};

window.getRenderTree = (formattedTree) => {
  const renderTree = [];
  for (const parentNode of formattedTree) {
    {
      if (!renderTree.includes(parentNode)) {
        renderTree.push(parentNode);
      }
    }
    if (parentNode.childrenIds.length === 0) {
      continue;
    }
    for (const childNode of formattedTree) {
      if (parentNode.childrenIds.includes(childNode.id)) {
        if (!renderTree.includes(childNode)) {
          renderTree.push(childNode);
        }
      }
    }
  }
  return renderTree;
};

export const List = () => {
  const [tree, setTree] = useState<any[]>(getFormattedTree(rawTree));

  const addChild = (childId, newParentId, oldParentId) => {
    setTree((prevTree) =>
      prevTree.map((treeNode) => {
        if (
          treeNode.id !== childId &&
          treeNode.id !== newParentId &&
          treeNode.id !== oldParentId
        ) {
          return treeNode;
        } else if (treeNode.id === childId) {
          return { ...treeNode, parentId: newParentId };
        } else if (treeNode.id === newParentId) {
          return { ...treeNode, childrenIds: [...childrenIds, childId] };
        } else if (treeNode.id === oldParentId) {
          return {
            ...treeNode,
            childrenIds: childrenIds.filter((id) => id !== childId),
          };
        }
      })
    );
  };

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
