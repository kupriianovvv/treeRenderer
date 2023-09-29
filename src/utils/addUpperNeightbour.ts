import { TreeFormatted } from "../hooks/useTree";
export const addUpperNeightbour = (
  treeFormatted: TreeFormatted,
  activeId: number,
  overId: number
) => {
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
  overItemParent.children.splice(overItemIndex, 0, activeId);
};
