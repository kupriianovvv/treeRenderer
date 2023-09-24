import { TreeFormatted } from "../hooks/useTree";

export function addActiveElemInChildrenToOverElemNonRootSameLevel(
  treeFormatted: TreeFormatted,
  activeId: number,
  overId: number
) {
  const activeItem = treeFormatted.map[activeId];
  const oldParentItem = treeFormatted.map[activeItem.parentId];
  const overItem = treeFormatted.map[overId];

  const newTreeFormatted = {
    ...treeFormatted,
    map: {
      ...treeFormatted.map,
      [activeId]: { ...activeItem, parentId: overId },
      [overId]: { ...overItem, children: overItem.children.concat(activeId) },
      [activeItem.parentId]: {
        ...oldParentItem,
        children: oldParentItem.children.filter(
          (childId) => childId !== activeId
        ),
      },
    },
  };

  return newTreeFormatted;
}
