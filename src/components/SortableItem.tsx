import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Item } from "./Item";
import { CSS } from "@dnd-kit/utilities";

type TProps = {
  depth: number;
  onClick: (e: React.MouseEvent) => void;
  title: string;
  id: number;
};

export const SortableItem = (props: TProps) => {
  const { title, depth, onClick, id } = props;

  const { setNodeRef: setCenterDroppableNodeRef } = useDroppable({
    id: `${id}-center`,
  });
  const { setNodeRef: setUpperDroppableNodeRef } = useDroppable({
    id: `${id}-upper`,
  });
  const { setNodeRef: setLowerDroppableNodeRef } = useDroppable({
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
      style={{ width: "300px", height: "80px" }}
    >
      <div ref={setUpperDroppableNodeRef} style={{ height: "25%" }}></div>
      <div ref={setCenterDroppableNodeRef} style={{ height: "50%" }}>
        <Item depth={depth} onClick={onClick} title={title} id={id}></Item>
      </div>
      <div ref={setLowerDroppableNodeRef} style={{ height: "25%" }}></div>
    </div>
  );
};
