import { createRoot } from "react-dom/client";
import { Tree } from "./components/Tree";
import { FormattedTreeContextProvider } from "./contexts/FormattedTreeContext";

const App = () => {
  return (
    <FormattedTreeContextProvider>
      <Tree />
    </FormattedTreeContextProvider>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
