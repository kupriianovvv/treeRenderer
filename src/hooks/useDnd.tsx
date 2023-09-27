import { FormattedTreeContext } from "../contexts/FormattedTreeContext";
import { addActiveElemInChildrenToOverElemNonRootSameLevel } from "../utils/addActiveElemInChildrenToOverElemNonRootSameLevel";

export const useDnd = ({ tree, setTree }: FormattedTreeContext) => {
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
