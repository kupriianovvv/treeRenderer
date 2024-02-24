import { TreeFormatted } from "../entities/TreeFormatted";
import { isChildren } from "../utils/canBeDragged";

const handleDrag = (
  treeFormatted: TreeFormatted,
  activeId: number,
  overId: number,
  position: "upper" | "center" | "lower"
) => {
  if (position === "upper") {
    addUpperNeighbor(treeFormatted, activeId, overId);
  } else if (position === "center") {
    addMiddleNeighbor(treeFormatted, activeId, overId);
  } else if (position === "lower") {
    addLowerNeighbor(treeFormatted, activeId, overId);
  } else {
    throw new Error("WTF");
  }
};

const addUpperNeighbor = (
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

  if (isChildren(overItem, activeId, treeFormatted.map)) {
    return;
  }

  activeItemParent.children = activeItemParent.children.filter(
    (childId) => childId !== activeId
  );

  const overItemIndex = overItemParent.children.findIndex(
    (childId) => childId === overId
  );

  activeItem.parentId = overItemParent.id;
  overItemParent.children.splice(overItemIndex, 0, activeId);
};

const addMiddleNeighbor = (
  treeFormatted: TreeFormatted,
  activeId: number,
  overId: number
) => {
  if (activeId === overId) {
    return;
  }
  const activeItem = treeFormatted.map[activeId];
  const overItem = treeFormatted.map[overId];

  if (isChildren(overItem, activeId, treeFormatted.map)) {
    return
  }

  const activeItemParent = treeFormatted.map[activeItem.parentId];
  activeItemParent.children = activeItemParent.children.filter(
    (childId) => childId !== activeId
  );

  overItem.children.push(activeId);
  activeItem.parentId = overId;
};

const addLowerNeighbor = (
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

  if (isChildren(overItem, activeId, treeFormatted.map)) {
    return;
  }

  activeItemParent.children = activeItemParent.children.filter(
    (childId) => childId !== activeId
  );

  const overItemIndex = overItemParent.children.findIndex(
    (childId) => childId === overId
  );

  if (overItem.isExpanded) {
    activeItem.parentId = overItem.id;
    overItem.children.unshift(activeId)
    return;
  }

  activeItem.parentId = overItemParent.id;
  overItemParent.children.splice(overItemIndex + 1, 0, activeId);
};

export { handleDrag };
