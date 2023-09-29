import { createContext, useContext, useState, ReactNode } from "react";
import { TreeFormatted, TreeResponse } from "../hooks/useTree";
import { getFormattedTree } from "../utils/getFormattedTree";
import { rawTree } from "../utils/const";
import { useImmer } from "use-immer";
import { Updater } from "use-immer";

export type FormattedTreeContext = {
  tree: TreeFormatted;
  setTree: Updater<TreeFormatted>;
};

export const useFormattedTreeContext = (rawTree: TreeResponse) => {
  const [tree, setTree] = useImmer<TreeFormatted>(getFormattedTree(rawTree));

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
