import { TreeFormatted } from "../hooks/useTree";

export const addUpperNeightbour = (
  treeFormatted: TreeFormatted,
  activeId: number,
  overId: number
) => {
  const activeItem = treeFormatted.map[activeId];
  const oldParentId = activeItem.parentId;
  const oldParentItem = treeFormatted.map[oldParentId];
  const overItem = treeFormatted.map[overId];
  const overItemParent = treeFormatted.map[overItem.parentId];

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
        children: overItemParent.children.concat(activeId),
      },
    },
  };

  return newTreeFormatted;
};
