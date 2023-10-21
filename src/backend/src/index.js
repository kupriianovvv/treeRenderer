import express from "express";
import cors from "cors";

const app = express();
const port = 8080;

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
  res.send(rawTree);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
