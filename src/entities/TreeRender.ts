type TreeRenderNode = {
  id: number;
  title: string;
  children: number[];
  depth: number;
  isExpanded: boolean;
};

type TreeRender = TreeRenderNode[];

export type { TreeRender };
