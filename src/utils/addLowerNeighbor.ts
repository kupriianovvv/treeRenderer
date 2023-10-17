import { TreeFormatted } from "../store";
export const addLowerNeighbor = (
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

  let dummyItem = overItemParent;
  while (dummyItem) {
    if (dummyItem.id === activeId) {
      return;
    }
    dummyItem = treeFormatted.map[dummyItem.parentId];
  }

  activeItemParent.children = activeItemParent.children.filter(
    (childId) => childId !== activeId
  );

  const overItemIndex = overItemParent.children.findIndex(
    (childId) => childId === overId
  );

  activeItem.parentId = overItemParent.id;
  overItemParent.children.splice(overItemIndex + 1, 0, activeId);
};
