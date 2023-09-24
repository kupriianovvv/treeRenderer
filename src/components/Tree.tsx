import { Item } from "./Item";
import { rawTree } from "../utils/const";
import { useTree } from "../hooks/useTree";
import { SortableItem } from "./SortableItem";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useState } from "react";

export const Tree = () => {
  const { renderData, onToggleElements } = useTree(rawTree);
  const [activeId, setActiveId] = useState<number | null>(null);

  const onDragStart = (e: DragStartEvent) => {
    setActiveId(+e.active.id);
  };

  const onDragEnd = (e) => {
    setActiveId(null);
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
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {renderData.renderTree.map((item) => (
        <SortableItem
          onClick={() => onToggleElements(item.id)}
          key={item.id}
          depth={item.depth}
          title={item.title}
          id={item.id}
        />
      ))}
      <DragOverlay dropAnimation={null}>
        {activeId ? <Item id={activeId} title="tasdsda" /> : null}
      </DragOverlay>
    </DndContext>
  );
};
