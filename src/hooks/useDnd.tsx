import {
  useFormattedTree,
  useFormattedTreeContext,
} from "../contexts/FormattedTreeContext";
import { addActiveElemInChildrenToOverElemNonRootSameLevel } from "../utils/addActiveElemInChildrenToOverElemNonRootSameLevel";
import { addUpperNeightbour } from "../utils/addUpperNeightbour";

export const useDnd = () => {
  const { tree, setTree } = useFormattedTree();
  const handleCenterDrag = (activeId: number, overId: number) => {
    setTree((prevTree) =>
      addActiveElemInChildrenToOverElemNonRootSameLevel(
        prevTree,
        activeId,
        overId
      )
    );
  };

  const handleUpperDrag = (activeId: number, overId: number) => {
    setTree((prevTree) => addUpperNeightbour(prevTree, activeId, overId));
  };

  const handleDrag = (
    activeId: number,
    overId: number,
    position: "upper" | "center" | "lower"
  ) => {
    if (position === "upper") {
      handleUpperDrag(activeId, overId);
    } else if (position === "center") {
      handleCenterDrag(activeId, overId);
    } else if (position === "lower") {
      //TODO
    } else {
      throw new Error("WTF");
    }
  };
  return {
    handleDrag,
  };
};
