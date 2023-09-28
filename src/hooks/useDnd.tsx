import {
  useFormattedTree,
  useFormattedTreeContext,
} from "../contexts/FormattedTreeContext";
import { addActiveElemInChildrenToOverElemNonRootSameLevel } from "../utils/addActiveElemInChildrenToOverElemNonRootSameLevel";

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
  return {
    handleCenterDrag,
  };
};
