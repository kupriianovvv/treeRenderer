import { Item } from "./Item";
import { rawTree } from "../utils/const";
import { useTree } from "../hooks/useTree";
import { SortableItem } from "./SortableItem";
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { useState } from "react";
import { useFormattedTree } from "../contexts/FormattedTreeContext";
import { useDnd } from "../hooks/useDnd";

export const Tree = () => {
  const { renderData, onToggleElements } = useTree();
  const { handleDrag } = useDnd();
  const [activeId, setActiveId] = useState<number | null>(null);
  const [overId, setOverId] = useState<number | null>(null);
  const [position, setPosition] = useState<"upper" | "center" | "lower" | null>(
    null
  );

  const onDragStart = (e: DragStartEvent) => {
    const { active } = e;
    setActiveId(+active.id);
  };

  const onDragOver = (e: DragOverEvent) => {
    const { over } = e;
    console.log(over);
    if (over !== null) {
      const [id, position] = over.id.split("-");
      setOverId(+id);
      setPosition(position);
    } else {
      setOverId(null);
      setPosition(null);
    }
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (activeId !== null && overId !== null && position !== null) {
      handleDrag(activeId, overId, position);
    }
    setActiveId(null);
    setOverId(null);
    setPosition(null);
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
      onDragOver={onDragOver}
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
