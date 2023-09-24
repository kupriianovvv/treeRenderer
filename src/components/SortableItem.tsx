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
  const { setNodeRef: setDroppableNodeRef } = useDroppable({
    id: id,
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
    <div ref={setDroppableNodeRef}>
      <div ref={setDraggableNodeRef} {...attributes} {...listeners}>
        <Item depth={depth} onClick={onClick} title={title} id={id}></Item>
      </div>
    </div>
  );
};
