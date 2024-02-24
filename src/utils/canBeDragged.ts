import { TreeFormattedNode, TreeFormattedNodeMap } from "../entities/TreeFormatted";

export function isChildren(dummyItem: TreeFormattedNode, activeId: number, map: TreeFormattedNodeMap) {
    while (dummyItem) {
        if (dummyItem.id === activeId) {
          return true;
        }
        dummyItem = map[dummyItem.parentId];
    }
    return false;

}