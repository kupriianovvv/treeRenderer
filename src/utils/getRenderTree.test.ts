import { describe, expect, test } from "vitest";
import { getRenderTree } from "./getRenderTree";

describe("getRenderTree", () => {
  test("getRenderTree", () => {
    const treeFormattedNodeMap = {
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
        parentId: -1000,
        isExpanded: true,
        isChildrenLoaded: true,
      },
    };

    expect(getRenderTree(treeFormattedNodeMap)).toStrictEqual([
      {
        id: 1,
        title: "a",
        children: [],
        depth: 1,
        isExpanded: false,
      },
      {
        id: 2,
        title: "b",
        children: [],
        depth: 1,
        isExpanded: false,
      },
      {
        id: 3,
        title: "c",
        children: [],
        depth: 1,
        isExpanded: false,
      },
    ]);
  });
});
