import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Item } from "./Item";
import { CSS } from "@dnd-kit/utilities";

type TProps = {
  depth: number;
  onClick: (e: React.MouseEvent) => void;
  title: string;
  id: number;
  overId: number | null;
};

export const SortableItem = (props: TProps) => {
  const { title, depth, onClick, id, overId } = props;

  const { setNodeRef: setCenterDroppableNodeRef, isOver: isOverCenter } =
    useDroppable({
      id: `${id}-center`,
    });
  const { setNodeRef: setUpperDroppableNodeRef, isOver: isOverUpper } =
    useDroppable({
      id: `${id}-upper`,
    });
  const { setNodeRef: setLowerDroppableNodeRef, isOver: isOverLower } =
    useDroppable({
      id: `${id}-lower`,
    });

  const {
    attributes,
    listeners,
    setNodeRef: setDraggableNodeRef,
    transform,
  } = useDraggable({
    id: id,
  });

  return (
    <div
      ref={setDraggableNodeRef}
      {...attributes}
      {...listeners}
      style={{
        width: "300px",
        height: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
      }}
    >
      {overId === id && (
        <div
          ref={setUpperDroppableNodeRef}
          style={{ height: "25%", background: isOverUpper ? "blue" : "" }}
        ></div>
      )}
      <div
        ref={setCenterDroppableNodeRef}
        style={{
          height: overId === id ? "50%" : "100%",
          background: isOverCenter ? "red" : "",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Item depth={depth} onClick={onClick} title={title} id={id}></Item>
      </div>
      {overId === id && (
        <div
          ref={setLowerDroppableNodeRef}
          style={{ height: "25%", background: isOverLower ? "green" : "" }}
          hidden={overId !== id}
        ></div>
      )}
    </div>
  );
};
