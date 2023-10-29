import { create } from "zustand";
import { getFormattedTree } from "./utils/getFormattedTree";
import { rawTree } from "./utils/const";
import { immer } from "zustand/middleware/immer";
import { handleDrag } from "./services/DragAndDropService";
import { TreeFormatted } from "./entities/TreeFormatted";
import { TreeResponse } from "./entities/TreeResponse";
import { fetchTree, fetchChildrenByParentId } from "./services/TreeCRUDService";

type TreeStore = {
  tree: TreeFormatted;
  fetchTree: () => void;
  fetchChildrenByParentId: (parentId: number) => void;
  onToggleElement: (id: number) => void;
  handleDrag: (
    activeId: number,
    overId: number,
    position: "upper" | "center" | "lower"
  ) => void;
};

const useTreeStore = create<TreeStore>()(
  immer((set, get) => ({
    tree: getFormattedTree(rawTree),
    fetchTree: async () => {
      try {
        const formattedTree = await fetchTree();
        if (formattedTree === null) return;
        set({ tree: formattedTree });
      } catch (err) {
        console.error(err);
      }
    },
    fetchChildrenByParentId: async (parentId: number) => {
      const parentItem = get().tree.map[parentId];
      if (parentItem.isChildrenLoaded) return;
      try {
        const children = await fetchChildrenByParentId(parentId);
        if (children === null) return;
        set(({ tree: { map } }) => {
          const parentItem = map[parentId];
          parentItem.children = children.map((child) => child.id);
          parentItem.isExpanded = true;
          parentItem.isChildrenLoaded = true;
          for (const child of children) {
            child.parentId = parentId;
            child.isExpanded = false;
            child.isChildrenLoaded = false;
            map[child.id] = child;
          }
        });
      } catch (err) {
        console.error(err);
      }
    },
    onToggleElement: (id: number) =>
      set(({ tree: { map }, fetchChildrenByParentId }) => {
        map[id].isExpanded = !map[id].isExpanded;
        if (map[id].isExpanded) {
          fetchChildrenByParentId(id);
        }
      }),
    handleDrag: async (
      activeId: number,
      overId: number,
      position: "upper" | "center" | "lower"
    ) => {
      if (position === "center") {
        await get().fetchChildrenByParentId(overId);
      }
      set(({ tree }) => handleDrag(tree, activeId, overId, position));
    },
  }))
);

export { useTreeStore };
