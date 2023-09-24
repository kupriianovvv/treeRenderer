import { Item } from "./Item";
import { rawTree } from "../utils/const";
import { useTree } from "../hooks/useTree";
import { SortableItem } from "./SortableItem";
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

export const Tree = () => {
  const { renderData, onToggleElements } = useTree(rawTree);

  const onDragStart = (e) => {
    console.log("start");
  };

  const onDragEnd = (e) => {
    console.log("end");
  };

  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10,
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  return (
    <DndContext sensors={sensors}>
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
