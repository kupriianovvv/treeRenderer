import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Item } from "./Item";
import { CSS } from "@dnd-kit/utilities";
import { TreeFormatted, useTreeStore } from "../store";

type TProps = {
  depth: number;
  onClick: (e: React.MouseEvent) => void;
  title: string;
  id: number;
  overId: number | null;
  activeId: number | null;
};

function isDroppableNeeded(
  treeFormatted: TreeFormatted,
  activeId: number | null,
  overId: number | null
) {
  if (activeId === overId) {
    return false;
  }
  if (activeId === null || overId === null) return false;
  const overItem = treeFormatted.map[overId];
  const overItemParent = treeFormatted.map[overItem.parentId];
  let dummyItem = overItemParent;
  while (dummyItem) {
    if (dummyItem.id === activeId) {
      return false;
    }
    dummyItem = treeFormatted.map[dummyItem.parentId];
  }
  return true;
}

export const SortableItem = (props: TProps) => {
  const { title, depth, onClick, id, overId, activeId } = props;
  const tree = useTreeStore((store) => store.tree);

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
          style={{
            height: "25%",
            background:
              isOverUpper && isDroppableNeeded(tree, activeId, overId)
                ? "blue"
                : "",
          }}
        ></div>
      )}
      <div
        ref={setCenterDroppableNodeRef}
        style={{
          height: overId === id ? "50%" : "100%",
          background:
            isOverCenter && isDroppableNeeded(tree, activeId, overId)
              ? "red"
              : "",
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
          style={{
            height: "25%",
            background:
              isOverLower && isDroppableNeeded(tree, activeId, overId)
                ? "green"
                : "",
          }}
          hidden={overId !== id}
        ></div>
      )}
    </div>
  );
};
