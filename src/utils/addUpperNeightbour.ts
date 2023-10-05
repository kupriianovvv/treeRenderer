import { TreeFormatted } from "../hooks/useTree";
export const addUpperNeightbour = (
  treeFormatted: TreeFormatted,
  activeId: number,
  overId: number
) => {
  if (activeId === overId) {
    return;
  }
  const activeItem = treeFormatted.map[activeId];
  const overItem = treeFormatted.map[overId];

  const activeItemParent = treeFormatted.map[activeItem.parentId];
  const overItemParent = treeFormatted.map[overItem.parentId];

  activeItemParent.children = activeItemParent.children.filter(
    (childId) => childId !== activeId
  );

  const overItemIndex = overItemParent.children.findIndex(
    (childId) => childId === overId
  );

  activeItem.parentId = overItemParent.id;
  overItemParent.children.splice(overItemIndex, 0, activeId);

  activeItem.isVisible = false;
};
