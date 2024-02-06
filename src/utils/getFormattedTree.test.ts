import { describe, expect, test } from "vitest";
import { virtualNodeId } from "./const";
import { getFormattedTree } from "./getFormattedTree";

describe("getFormattedTree", () => {
  test("getFormattedTree", () => {
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

    const formattedTree = getFormattedTree(rawTree);

    expect(formattedTree).toStrictEqual({
      rootIds: [1, 2, 3],
      map: {
        "1": {
          id: 1,
          title: "a",
          children: [],
          parentId: -1000,
          isExpanded: false,
          isChildrenLoaded: false,
        },
        "2": {
          id: 2,
          title: "b",
          children: [],
          parentId: -1000,
          isExpanded: false,
          isChildrenLoaded: false,
        },
        "3": {
          id: 3,
          title: "c",
          children: [],
          parentId: -1000,
          isExpanded: false,
          isChildrenLoaded: false,
        },
        "-1000": {
          id: -1000,
          title: "root",
          children: [1, 2, 3],
          parentId: null,
          isExpanded: true,
        },
      },
    });
  });
});
