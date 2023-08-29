import { memo } from "react";
import { areEqual } from "react-window";
export const Row = memo(({ data: renderData, index, style }: any) => {
  const { renderTree, onToggleElements } = renderData;

  const item = renderTree[index];

  const padding = `${item.depth * 10}px`;

  const styles = { ...style, paddingLeft: padding };

  const onToggle = () => {
    onToggleElements(item.id);
  };

  return (
    <div style={styles} onClick={onToggle}>
      {item.title}
    </div>
  );
}, areEqual);
