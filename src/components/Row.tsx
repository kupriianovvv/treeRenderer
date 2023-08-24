import { memo } from "react";
import { areEqual } from "react-window";
export const Row = memo(({ data, index, style }: any) => {
  const { renderTree } = data;

  const item = renderTree[index];
  const padding = `${item.depth * 10}px`

  const styles = { ...style, paddingLeft: padding };

  return <div style={styles}>{item.title}</div>;
}, areEqual);
