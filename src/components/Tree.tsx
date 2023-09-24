import { Item } from "./Item";
import { rawTree } from "../utils/const";
import { useTree } from "../hooks/useTree";
import { SortableItem } from "./SortableItem";
import { DndContext } from "@dnd-kit/core";

export const Tree = () => {
  const { renderData, onToggleElements } = useTree(rawTree);

  const onDragStart = (e) => {
    console.log("start");
  };

  const onDragEnd = (e) => {
    console.log("end");
  };

  return (
    <DndContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      {renderData.renderTree.map((item) => (
        <SortableItem
          onClick={() => onToggleElements(item.id)}
          key={item.id}
          depth={item.depth}
          title={item.title}
          id={item.id}
        />
      ))}
    </DndContext>
  );
};
