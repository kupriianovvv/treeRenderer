type TreeResponseNode = {
  id: number;
  title: string;
  children: TreeResponseNode[];
};
type TreeResponse = TreeResponseNode[];

export type { TreeResponse };
