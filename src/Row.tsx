import { memo, useMemo } from "react";
import { areEqual } from "react-window";
export const Row = memo(({ data, index, style }: any) => {
  const { renderTree, paddings } = data;

  const item = renderTree[index];
  const padding = paddings[index];

  const styles = useMemo(() => ({ ...style, paddingLeft: padding }), [padding]);

  return <div style={styles}>{item.title}</div>;
}, areEqual);
