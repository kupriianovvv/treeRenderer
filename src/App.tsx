import { createRoot } from "react-dom/client";
import { List } from "./List";


const App = () => {
  return <div>
    <List />
  </div>;
};

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(<App />);