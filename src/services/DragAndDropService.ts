import { TreeFormatted } from "../entities/TreeFormatted";

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

  const overItemParent = treeFormatted.map[overItem.parentId];
  let dummyItem = overItemParent;
  while (dummyItem) {
    if (dummyItem.id === activeId) {
      return;
    }
    dummyItem = treeFormatted.map[dummyItem.parentId];
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

export { handleDrag };
