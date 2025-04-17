import { memo } from "react";

import { DisplayItem } from "./displayReducer";
import styles from "./GameDisplay.module.scss";

const LogItem = memo(function LogItem({ item }: { item: DisplayItem }) {
  switch (item.type) {
    case "ul":
      return (
        <ul>
          {item.items.map((ti, i) => (
            <li key={i}>{ti.text}</li>
          ))}
        </ul>
      );

    case "paragraph":
      return <p>{item.text}</p>;

    case "error":
      return <p className={styles.error}>{item.text}</p>;
  }
});
export default LogItem;
