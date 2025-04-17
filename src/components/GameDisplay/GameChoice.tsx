import { memo } from "react";
import { Button } from "react-aria-components";

import { TaggedText } from "../../engine/events";
import styles from "./GameDisplay.module.scss";

const TurnTaker = memo(function TurnTaker() {
  return (
    <span className={styles.turnTaker} title="this will take a turn">
      ⏳
    </span>
  );
});

export default function GameChoice({
  choice,
  onPress,
}: {
  choice: TaggedText;
  onPress: () => void;
}) {
  return (
    <li>
      <Button onPress={onPress}>
        {choice.text}
        {choice.tags.includes("turn") && <TurnTaker />}
      </Button>
    </li>
  );
}
