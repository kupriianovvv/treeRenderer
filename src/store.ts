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

const useTreeStore = create<{ tree: TreeFormatted } & Actions>()(
  immer((set, get) => ({
    tree: getFormattedTree(rawTree),
    log: () => {
      console.log(get());
    },
    onToggleElement: (id: number) =>
      set((state) => {
        state.tree.map[id].isExpanded = !state.tree.map[id].isExpanded;
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
