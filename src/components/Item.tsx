type TProps = {
  depth: number;
  onClick: (e: React.MouseEvent) => void;
  title: string;
};

export const Item = (props: TProps) => {
  const { title, depth, onClick } = props;
  return (
    <div
      style={{ paddingLeft: depth * 20, fontSize: "40px" }}
      onClick={onClick}
    >
      {title}
    </div>
  );
};
