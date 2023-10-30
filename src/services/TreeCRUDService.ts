import { TreeFormatted } from "../entities/TreeFormatted";
import { TreeResponse } from "../entities/TreeResponse";
import { getFormattedTree } from "../utils/getFormattedTree";

const fetchTree = async (parentId?: number): Promise<TreeResponse> => {
  const parentIdParam = parentId === undefined ? "" : `${parentId}`;
  const res = await fetch(`http://localhost:8080/tree/${parentIdParam}`);
  if (!res.ok) throw new Error("WTF");
  return res.json();
};

export { fetchTree };
