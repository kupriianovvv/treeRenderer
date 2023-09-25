import { TreeFormatted } from "../hooks/useTree";

export function addActiveElemInChildrenToOverElemNonRootSameLevel(
  treeFormatted: TreeFormatted,
  activeId: number,
  overId: number
) {
  const activeItem = treeFormatted.map[activeId];
  const oldParentId = activeItem.parentId;
  const oldParentItem = treeFormatted.map[oldParentId];
  const overItem = treeFormatted.map[overId];

  const newTreeFormatted = {
    ...treeFormatted,
    map: {
      ...treeFormatted.map,
      [activeId]: { ...activeItem, parentId: overId },
      [overId]: { ...overItem, children: overItem.children.concat(activeId) },
    },
  };

  if (oldParentId) {
    newTreeFormatted.map[oldParentId] = {
      ...oldParentItem,
      children: oldParentItem.children.filter(
        (childId) => childId !== activeId
      ),
    };
  }

  if (newTreeFormatted.rootIds.includes(activeId)) {
    newTreeFormatted.rootIds = newTreeFormatted.rootIds.filter(
      (id) => id !== activeId
    );
  }

  return newTreeFormatted;
}
