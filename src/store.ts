import { create } from "zustand";
import { getFormattedTree } from "./utils/getFormattedTree";
import { rawTree } from "./utils/const";
import { immer } from "zustand/middleware/immer";
import { handleDrag } from "./services/DragAndDropService";
import { TreeFormatted, TreeFormattedNode } from "./entities/TreeFormatted";
import { fetchTree } from "./services/TreeCRUDService";

type TreeStore = {
  tree: TreeFormatted;
  fetchTree: (id?: number) => void;
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
    fetchTree: async (parentId?: number) => {
      const map = get().tree.map;
      if (parentId !== undefined && map[parentId].isChildrenLoaded) {
        return;
      }
      try {
        const rawTree = await fetchTree(parentId);
        if (parentId === undefined) {
          return set({ tree: getFormattedTree(rawTree) });
        }
        set(({ tree: { map } }) => {
          const parentItem = map[parentId];
          parentItem.children = rawTree.map((child) => child.id);
          parentItem.isExpanded = true;
          parentItem.isChildrenLoaded = true;
          for (const child of rawTree) {
            const childFormatted: TreeFormattedNode = {
              id: child.id,
              title: child.title,
              children: [],
              parentId: parentId,
              isExpanded: false,
              isChildrenLoaded: false,
            };
            map[childFormatted.id] = childFormatted;
          }
        });
      } catch (err) {
        console.error(err);
      }
    },
    onToggleElement: (id: number) =>
      set(({ tree: { map }, fetchTree }) => {
        map[id].isExpanded = !map[id].isExpanded;
        if (map[id].isExpanded) {
          fetchTree(id);
        }
      }),
    handleDrag: async (
      activeId: number,
      overId: number,
      position: "upper" | "center" | "lower"
    ) => {
      if (position === "center") {
        await get().fetchTree(overId);
      }
      set(({ tree }) => handleDrag(tree, activeId, overId, position));
    },
  }))
);

export { useTreeStore };
