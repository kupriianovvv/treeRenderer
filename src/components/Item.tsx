import { CSSProperties } from "react";

type ItemProps = {
  depth?: number;
  onClick?: (e: React.MouseEvent) => void;
  title: string;
  id: number;
  style?: CSSProperties;
};

export const Item = (props: ItemProps) => {
  const { title, depth = 0, onClick, id, style } = props;

  return (
    <div
      style={{ paddingLeft: depth * 20, fontSize: "40px", ...style }}
      onClick={onClick}
      id={id.toString()}
    >
      {title}
    </div>
  );
};
