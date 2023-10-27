import { TreeFormatted, TreeFormattedNode } from "../entities/TreeFormatted";
import { TreeResponse } from "../entities/TreeResponse";
import { getFormattedTree } from "../utils/getFormattedTree";

class TreeCRUDService {
  async fetchTree() {
    try {
      const res = await fetch("http://localhost:8080/tree");
      if (!res.ok) throw new Error("WTF");
      const treeResponse: TreeResponse = await res.json();
      const treeFormatted: TreeFormatted = getFormattedTree(treeResponse);
      return treeFormatted;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async fetchChildrenByParentId(parentId: number) {
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
      return children;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

const treeCRUDService = new TreeCRUDService();

export { treeCRUDService };
