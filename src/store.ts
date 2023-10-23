import { create } from "zustand";
import { getFormattedTree } from "./utils/getFormattedTree";
import { rawTree } from "./utils/const";
import { immer } from "zustand/middleware/immer";
import { addUpperNeighbor } from "./utils/addUpperNeighbor";
import { addLowerNeighbor } from "./utils/addLowerNeighbor";
import { addMiddleNeighbor } from "./utils/addMiddleNeighbor";

export type TreeResponseNode = {
  id: number;
  title: string;
  children: TreeResponseNode[];
};
export type TreeResponse = TreeResponseNode[];

export type TreeFormattedNode = {
  id: number;
  title: string;
  children: number[];
  isExpanded: boolean;
  parentId: number;
  isChildrenLoaded: boolean;
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

type TreeStore = {
  tree: TreeFormatted;
  fetchTree: () => void;
  fetchChildrenByParentId: (parentId: number) => void;
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

const useTreeStore = create<TreeStore>()(
  immer((set, get) => ({
    tree: getFormattedTree(rawTree),
    fetchTree: async () => {
      try {
        const res = await fetch("http://localhost:8080/tree");
        if (!res.ok) throw new Error("WTF");
        const tree: TreeResponse = await res.json();
        set({ tree: getFormattedTree(tree) });
      } catch (err) {
        console.error(err);
      }
    },
    fetchChildrenByParentId: async (parentId: number) => {
      const parentItem = get().tree.map[parentId];
      if (parentItem.isChildrenLoaded) return;
      try {
        const res = await fetch(`http://localhost:8080/tree/${parentId}`);
        const children: {
          id: number;
          title: string;
          children: [];
          parentId: number;
          isExpanded: false;
          isChildrenLoaded: false;
        }[] = await res.json();
        if (!res.ok) throw new Error("WTF");
        set(({ tree: { map } }) => {
          map[parentId].children = children.map((child) => child.id);
          map[parentId].isExpanded = true;
          map[parentId].isChildrenLoaded = true;
          for (const child of children) {
            child.parentId = parentId;
            child.isExpanded = false;
            child.isChildrenLoaded = false;
            map[child.id] = child;
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
    onToggleElement: (id: number) =>
      set(({ tree: { map }, fetchChildrenByParentId }) => {
        map[id].isExpanded = !map[id].isExpanded;
        if (map[id].isExpanded) {
          fetchChildrenByParentId(id);
        }
      }),
    handleUpperDrag: (activeId: number, overId: number) =>
      set(({ tree }) => {
        addUpperNeighbor(tree, activeId, overId);
      }),
    handleCenterDrag: (activeId: number, overId: number) =>
      set(({ tree }) => addMiddleNeighbor(tree, activeId, overId)),
    handleLowerDrag: (activeId: number, overId: number) =>
      set(({ tree }) => {
        addLowerNeighbor(tree, activeId, overId);
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
