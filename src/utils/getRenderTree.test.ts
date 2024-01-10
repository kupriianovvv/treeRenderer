import { describe, expect, test } from "vitest";
import { getRenderTree } from "./getRenderTree";
import { virtualNodeId } from "./const";

describe("getRenderTree", () => {
  test("getRenderTree", () => {
    const treeFormattedNodeMap = {
      "1": {
        id: 1,
        title: "a",
        children: [],
        parentId: virtualNodeId,
        isExpanded: false,
        isChildrenLoaded: false,
      },
      "2": {
        id: 2,
        title: "b",
        children: [],
        parentId: virtualNodeId,
        isExpanded: false,
        isChildrenLoaded: false,
      },
      "3": {
        id: 3,
        title: "c",
        children: [],
        parentId: virtualNodeId,
        isExpanded: false,
        isChildrenLoaded: false,
      },
      [virtualNodeId]: {
        id: virtualNodeId,
        title: "root",
        children: [1, 2, 3],
        parentId: virtualNodeId,
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
