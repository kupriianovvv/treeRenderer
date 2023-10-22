import { create } from "zustand";
import { getFormattedTree } from "./utils/getFormattedTree";
import { rawTree } from "./utils/const";
import { immer } from "zustand/middleware/immer";
import { addUpperNeighbor } from "./utils/addUpperNeighbor";
import { addLowerNeighbor } from "./utils/addLowerNeighbor";
import { addMiddleNeighbor } from "./utils/addMiddleNeighbor";

export type TreeFormattedNode = {
  id: number;
  title: string;
  children: number[];
  isExpanded: boolean;
  parentId: number;
};

export type TreeFormatted = {
  rootIds: number[];
  map: Record<number, TreeFormattedNode>;
};

type Actions = {
  onToggleElement: (id: number) => void;
  handleUpperDrag: (activeId: number, overId: number) => void;
  handleCenterDrag: (activeId: number, overId: number) => void;
  handleLowerDrag: (activeId: number, overId: number) => void;
  handleDrag: (
    activeId: number,
    overId: number,
    position: "upper" | "center" | "lower"
  ) => void;
};

const useTreeStore = create()(
  immer((set, get) => ({
    tree: getFormattedTree(rawTree),
    fetchTree: async () => {
      try {
        const res = await fetch("http://localhost:8080/tree");
        const json = await res.json();
        if (!res.ok) throw new Error("WTF");
        set({ tree: getFormattedTree(json) });
      } catch (err) {
        console.log(err);
      }
    },
    fetchChildren: async (parentId) => {
      const state = get();
      const parentItem = state.tree.map[parentId];
      if (parentItem.isChildrenLoaded) return state;
      try {
        const res = await fetch(`http://localhost:8080/tree/${parentId}`);
        const json = await res.json();
        if (!res.ok) throw new Error("WTF");
        set((state) => {
          state.tree.map[parentId].children = json.map((json) => json.id);
          state.tree.map[parentId].isExpanded = true;
          state.tree.map[parentId].isChildrenLoaded = true;
          for (const child of json) {
            state.tree.map[child.id] = child;
            child.parentId = parentId;
            child.isExpanded = false;
            child.isChildrenLoaded = false;
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    log: () => {
      console.log(get());
    },
    onToggleElement: (id: number) =>
      set((state) => {
        state.tree.map[id].isExpanded = !state.tree.map[id].isExpanded;
        if (state.tree.map[id].isExpanded) {
          get().fetchChildren(id);
        }
      }),
    handleUpperDrag: (activeId: number, overId: number) =>
      set((state) => {
        addUpperNeighbor(state.tree, activeId, overId);
      }),
    handleCenterDrag: (activeId: number, overId: number) =>
      set((state) => addMiddleNeighbor(state.tree, activeId, overId)),
    handleLowerDrag: (activeId: number, overId: number) =>
      set((state) => {
        addLowerNeighbor(state.tree, activeId, overId);
      }),
    handleDrag: (
      activeId: number,
      overId: number,
      position: "upper" | "center" | "lower"
    ) => {
      if (position === "upper") {
        get().handleUpperDrag(activeId, overId);
      } else if (position === "center") {
        get().handleCenterDrag(activeId, overId);
      } else if (position === "lower") {
        get().handleLowerDrag(activeId, overId);
      } else {
        throw new Error("WTF");
      }
    },
  }))
);

export { useTreeStore };
