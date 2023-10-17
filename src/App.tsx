import { createRoot } from "react-dom/client";
import { Tree } from "./components/Tree";

const App = () => {
  return <Tree />;
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
