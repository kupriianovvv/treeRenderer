import { TreeFormatted } from "../entities/TreeFormatted";
import { TreeResponse } from "../entities/TreeResponse";
import { getFormattedTree } from "../utils/getFormattedTree";

const fetchTree = async () => {
  const res = await fetch("http://localhost:8080/tree");
  if (!res.ok) throw new Error("WTF");
  const treeResponse: TreeResponse = await res.json();
  const treeFormatted: TreeFormatted = getFormattedTree(treeResponse);
  return treeFormatted;
};

const fetchChildrenByParentId = async (parentId: number) => {
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
};

export { fetchTree, fetchChildrenByParentId };
