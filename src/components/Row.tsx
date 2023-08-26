import { memo, useContext } from "react";
import { areEqual } from "react-window";
import { TreeContext } from "./Tree";
export const Row = memo(({ data: renderData, index, style }: any) => {
  const { renderTree, onToggleElement } = renderData;
  const tree = useContext(TreeContext);
  const item = renderTree[index];

  const padding = `${item.depth * 10}px`;
  const isVisible = item.isVisible;

  const styles = { ...style, paddingLeft: padding };

  const onToggle = () => {
    onToggleElement(tree, item.id);
  };

  return (
    <div hidden={!isVisible} style={styles} onClick={onToggle}>
      {item.title}
    </div>
  );
}, areEqual);
