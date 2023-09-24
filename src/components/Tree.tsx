import { Item } from "./Item";
import { rawTree } from "../utils/const";
import { TreeResponse, useTree } from "../hooks/useTree";

export const Tree = () => {
  const { renderData, onToggleElements } = useTree(rawTree);

  return renderData.renderTree.map((item) => (
    <Item
      onClick={() => onToggleElements(item.id)}
      key={item.id}
      depth={item.depth}
      title={item.title}
    />
  ));
};
