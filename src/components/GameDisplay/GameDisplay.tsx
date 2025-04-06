import {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";

import { useEngineEvent, useLibrary } from "../../hooks/LibraryProvider";
import { selectCharacterIds, selectModuleById } from "../../state/selectors";
import { useAppSelector } from "../../state/store";
import { ModuleId } from "../../types";
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
            <li key={i}>{ti.value}</li>
          ))}
        </ul>
      );

    case "paragraph":
      return <p>{item.value}</p>;
  }
});

export default function GameDisplay({ moduleId }: GameDisplayProps) {
  const lib = useLibrary();
  const module = useAppSelector((state) => selectModuleById(state, moduleId));
  const allChars = useAppSelector(selectCharacterIds);

  const mainRef = useRef<HTMLElement>(null);
  const [menuOptions, setMenuOptions] = useState<string[]>();
  const [display, df] = useReducer(displayReducer, []);

  useEngineEvent("listItem", ({ value }) => df({ type: "item", value }), [df]);
  useEngineEvent("paragraph", ({ value }) => df({ type: "paragraph", value }), [
    df,
  ]);
  useEngineEvent("choices", ({ value }) => setMenuOptions(value), [
    setMenuOptions,
  ]);

  const choose = useCallback(
    (index: number) => {
      setMenuOptions(undefined);
      lib.engine.choose(index);
    },
    [lib.engine],
  );

  useEffect(() => {
    lib.begin(moduleId, allChars);
  }, [allChars, moduleId, lib]);

  useEffect(() => {
    if (mainRef.current)
      mainRef.current.scrollTop = mainRef.current.scrollHeight;
  }, [display, menuOptions]);

  return (
    <div className={styles.layout}>
      <h1>{module.name}</h1>
      <main ref={mainRef}>
        <div className={styles.log}>
          {display.map((item, i) => (
            <LogItem key={i} item={item} />
          ))}
        </div>
        {menuOptions && (
          <ul className={styles.options}>
            {menuOptions.map((value, i) => (
              <li key={i}>
                <button onClick={() => choose(i)}>{value}</button>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
