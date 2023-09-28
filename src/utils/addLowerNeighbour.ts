import { TreeFormatted } from "../hooks/useTree";

export const addLowerNeightbour = (
  treeFormatted: TreeFormatted,
  activeId: number,
  overId: number
) => {
  const activeItem = treeFormatted.map[activeId];
  const oldParentId = activeItem.parentId;
  const oldParentItem = treeFormatted.map[oldParentId];
  const overItem = treeFormatted.map[overId];
  const overItemParent = treeFormatted.map[overItem.parentId];

  const index = overItemParent.children.findIndex(
    (child) => child === overItem.id
  );

  console.log(index);

  const copy = [...overItemParent.children];
  copy.splice(index + 1, 0, activeId);

  const newTreeFormatted = {
    ...treeFormatted,
    map: {
      ...treeFormatted.map,
      [activeId]: { ...activeItem, parentId: overItem.parentId },
      [oldParentId]: {
        ...oldParentItem,
        children: oldParentItem.children.filter((child) => child !== activeId),
      },
      [overItemParent.id]: {
        ...overItemParent,
        children: copy,
      },
    },
  };

  return newTreeFormatted;
};
