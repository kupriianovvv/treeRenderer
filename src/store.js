import { create } from "zustand";
import { getFormattedTree } from "./utils/getFormattedTree";
import { rawTree } from "./utils/const";
import { immer } from "zustand/middleware/immer";
import { addUpperNeightbour } from "./utils/addUpperNeightbour";
import { addLowerNeightbour } from "./utils/addLowerNeighbour";
import { addActiveElemInChildrenToOverElemNonRootSameLevel } from "./utils/addActiveElemInChildrenToOverElemNonRootSameLevel";

const useTreeStore = create(
  immer((set, get) => ({
    tree: getFormattedTree(rawTree),
    log: () => {
      console.log(get());
    },
    onToggleElement: (id) =>
      set((state) => {
        state.tree.map[id].isVisible = !state.tree.map[id].isVisible;
      }),
    handleUpperDrag: (activeId, overId) =>
      set((state) => {
        addUpperNeightbour(state.tree, activeId, overId);
      }),
    handleCenterDrag: (activeId, overId) =>
      set((state) =>
        addActiveElemInChildrenToOverElemNonRootSameLevel(
          state.tree,
          activeId,
          overId
        )
      ),
    handleLowerDrag: (activeId, overId) =>
      set((state) => {
        addLowerNeightbour(state.tree, activeId, overId);
      }),
    handleDrag: (activeId, overId, position) => {
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
