import { memo, useCallback, useEffect, useReducer, useState } from "react";

import { MenuOption } from "../../engine/EngineMenuBuilder";
import { useEngineEvent, useLibrary } from "../../hooks/LibraryProvider";
import { selectCharacterIds, selectModuleById } from "../../state/selectors";
import { useAppSelector } from "../../state/store";
import { BECMINode, ModuleId } from "../../types";
import displayReducer, { DisplayItem } from "./displayReducer";
import styles from "./GameDisplay.module.scss";

interface GameDisplayProps {
  moduleId: ModuleId;
}

const LogItem = memo(function LogItem({ item }: { item: DisplayItem }) {
  switch (item.type) {
    case "ul":
      return (
        <ul>
          {item.items.map((ti, i) => (
            <li key={i} style={ti.style}>
              {ti.value}
            </li>
          ))}
        </ul>
      );

    case "texts":
      return (
        <p className={styles.texts}>
          {item.items.map((ti, i) => (
            <span key={i} style={ti.style}>
              {ti.value}
            </span>
          ))}
        </p>
      );

    case "paragraph":
      return <p style={item.style}>{item.value}</p>;
  }
});

export default function GameDisplay({ moduleId }: GameDisplayProps) {
  const lib = useLibrary();
  const module = useAppSelector((state) => selectModuleById(state, moduleId));
  const allChars = useAppSelector(selectCharacterIds);

  const [nextNode, setNextNode] = useState<BECMINode>();
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>();
  const [display, df] = useReducer(displayReducer, []);

  useEngineEvent(
    "listItem",
    ({ value, style }) => df({ type: "item", value, style }),
    [df],
  );
  useEngineEvent(
    "paragraph",
    ({ value, style }) => df({ type: "paragraph", value, style }),
    [df],
  );
  useEngineEvent(
    "text",
    ({ value, style }) => df({ type: "text", value, style }),
    [df],
  );
  useEngineEvent("menu", ({ options }) => setMenuOptions(options), [
    setMenuOptions,
  ]);

  useEngineEvent("next", ({ node }) => setNextNode(node));

  const goto = useCallback(
    (node: BECMINode) => {
      setMenuOptions(undefined);
      setNextNode(undefined);
      lib.engine.goto(node);
    },
    [lib.engine],
  );

  const onClickNext = useCallback(() => {
    if (nextNode) goto(nextNode);
  }, [goto, nextNode]);

  useEffect(() => {
    lib.begin(moduleId, allChars);
  }, [allChars, moduleId, lib]);

  return (
    <div>
      <h1>{module.name}</h1>
      <div className={styles.log}>
        {display.map((item, i) => (
          <LogItem key={i} item={item} />
        ))}
      </div>
      {menuOptions && (
        <ul>
          {menuOptions.map(({ value, node }, i) => (
            <li key={i}>
              <button onClick={() => goto(node)}>{value}</button>
            </li>
          ))}
        </ul>
      )}
      {nextNode && <button onClick={onClickNext}>Next</button>}
    </div>
  );
}
