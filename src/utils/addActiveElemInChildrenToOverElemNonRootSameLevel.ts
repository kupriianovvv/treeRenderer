import { TreeFormatted } from "../hooks/useTree";
export function addActiveElemInChildrenToOverElemNonRootSameLevel(
  treeFormatted: TreeFormatted,
  activeId: number,
  overId: number
) {
  if (activeId === overId) {
    return;
  }
  const activeItem = treeFormatted.map[activeId];
  const overItem = treeFormatted.map[overId];

  const activeItemParent = treeFormatted.map[activeItem.parentId];
  activeItemParent.children = activeItemParent.children.filter(
    (childId) => childId !== activeId
  );

  overItem.children.push(activeId);
  activeItem.parentId = overId;
}
