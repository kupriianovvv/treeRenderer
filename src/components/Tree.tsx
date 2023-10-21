import { Item } from "./Item";
import { rawTree } from "../utils/const";
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

import { useEffect, useState } from "react";
import { useTreeStore } from "../store";
import { getRenderTree } from "../utils/getRenderTree";

export const Tree = () => {
  const tree = useTreeStore((store) => store.tree);
  const onToggleElement = useTreeStore((store) => store.onToggleElement);
  const handleDrag = useTreeStore((store) => store.handleDrag);
  const fetchTree = useTreeStore((store) => store.fetchTree);
  const renderTree = getRenderTree(tree.map, tree.map[-1000].children);
  //const { handleDrag } = useDnd();
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
      const [id, position] = over.id.toString().split("-") as [
        string,
        "upper" | "center" | "lower"
      ];
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
      distance: 10,
    },
  });

  const sensors = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    fetchTree();
  }, []);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      {renderTree.map((item) => (
        <SortableItem
          onClick={() => onToggleElement(item.id)}
          key={item.id}
          depth={item.depth}
          title={item.title}
          id={item.id}
          overId={overId}
          activeId={activeId}
        />
      ))}
      <DragOverlay dropAnimation={null}>
        {activeId ? (
          <Item id={activeId} title={tree.map[activeId].title} />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};
