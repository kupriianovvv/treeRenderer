import express from "express";
import cors from "cors";
import { current } from "immer";

const app = express();
const port = 8080;

const getRootNodes = (rawTree) => {
  const rootNodes = rawTree.reduce((rootNodes, currentNode) => {
    rootNodes.push({
      id: currentNode.id,
      title: currentNode.title,
      hasChildren: currentNode.children.length > 0,
      children: [],
    });
    return rootNodes;
  }, []);
  return rootNodes;
};

let childrenNodes;
const getChildrenNodes = (rawTree, id) => {
  for (const node of rawTree) {
    if (node.id === id) {
      childrenNodes = node.children.map((child) => ({
        ...child,
        children: [],
      }));
    }
    getChildrenNodes(node.children, id);
  }
  return childrenNodes;
};

const rawTree = [
  { id: 1, title: "a", children: [{ id: 4, title: "d", children: [] }] },
  { id: 2, title: "b", children: [] },
  {
    id: 3,
    title: "c",
    children: [
      { id: 5, title: "z", children: [] },
      {
        id: 6,
        title: "x",
        children: [
          {
            id: 10,
            title: "gg",
            children: [{ id: 11, title: "dd", children: [] }],
          },
        ],
      },
      { id: 7, title: "y", children: [] },
    ],
  },
];

app.use(cors());

app.get("/tree", (req, res) => {
  res.send(getRootNodes(rawTree));
});

app.get("/tree/:parentId", (req, res) => {
  const response = getChildrenNodes(rawTree, +req.params.parentId);
  res.send(response);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
