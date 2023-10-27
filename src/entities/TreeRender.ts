type TreeRenderNode = {
  id: number;
  title: string;
  children: number[];
  depth: number;
};

type TreeRender = TreeRenderNode[];

export type { TreeRender };
