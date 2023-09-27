import { createContext, useContext, useState, ReactNode } from "react";
import { TreeFormatted, TreeResponse } from "../hooks/useTree";
import { getFormattedTree } from "../utils/getFormattedTree";
import { rawTree } from "../utils/const";

export type FormattedTreeContext = {
  tree: TreeFormatted;
  setTree: React.Dispatch<React.SetStateAction<TreeFormatted>>;
};

export const useFormattedTreeContext = (rawTree: TreeResponse) => {
  const [tree, setTree] = useState<TreeFormatted>(getFormattedTree(rawTree));

  return { tree, setTree };
};

export const FormattedTreeContext = createContext<FormattedTreeContext | null>(
  null
);

export const FormattedTreeContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { tree, setTree } = useFormattedTreeContext(rawTree);
  return (
    <FormattedTreeContext.Provider value={{ tree, setTree }}>
      {children}
    </FormattedTreeContext.Provider>
  );
};

export const useFormattedTree = () => {
  const formattedTreeContext = useContext(FormattedTreeContext);
  if (!formattedTreeContext) {
    throw new Error("WTF");
  }
  const { tree, setTree } = formattedTreeContext;
  return { tree, setTree };
};
