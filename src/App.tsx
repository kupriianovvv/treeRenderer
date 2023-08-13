import { createRoot } from "react-dom/client";
import { Tree } from "./Tree";

const App = () => {
  return (
    <div>
      <Tree />
    </div>
  );
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
