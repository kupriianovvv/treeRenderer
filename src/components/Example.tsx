import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { Row } from "./Row";

export const Example = (props: any) => (
  <div style={{ height: `100%` }}>
    <AutoSizer>
      {({ height, width }) => {
        return (
          <List
            className="List"
            height={height * 0.8}
            itemCount={props.itemData.renderTree.length}
            itemSize={40}
            itemData={props.itemData}
            width={width * 0.8}
          >
            {Row}
          </List>
        );
      }}
    </AutoSizer>
  </div>
);
