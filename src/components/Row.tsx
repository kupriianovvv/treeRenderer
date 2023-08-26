import { memo } from "react";
import { areEqual } from "react-window";
export const Row = memo(({ data: renderTree, index, style }: any) => {
  const item = renderTree[index];

  const padding = `${item.depth * 10}px`;
  const isVisible = item.isVisible;

  const styles = { ...style, paddingLeft: padding };

  return (
    <div hidden={!isVisible} style={styles}>
      {item.title}
    </div>
  );
}, areEqual);
