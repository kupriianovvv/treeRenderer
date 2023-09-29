import { TreeFormatted } from "../hooks/useTree";
// найти activeItem
// найти overItem
// найти parent активного элемента
// удалить из его чилдренов активный элемент
// указываем в parentId активного элемента overId
// в overItem в чилдрены добавляем активный элементы
export function addActiveElemInChildrenToOverElemNonRootSameLevel(
  treeFormatted: TreeFormatted,
  activeId: number,
  overId: number
) {
  const activeItem = treeFormatted.map[activeId];
  const overItem = treeFormatted.map[overId];

  const activeItemParent = treeFormatted.map[activeItem.parentId];
  activeItemParent.children = activeItemParent.children.filter(
    (childId) => childId !== activeId
  );

  overItem.children.push(activeId);
  activeItem.parentId = overId;
}
