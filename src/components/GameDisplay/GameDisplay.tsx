import * as Drawer from "@accessible/drawer";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { Button } from "react-aria-components";

import { TaggedText } from "../../engine/events";
import { useEngineEvent, useLibrary } from "../../hooks/LibraryProvider";
import { selectCharacterIds, selectModuleById } from "../../state/selectors";
import { useAppSelector } from "../../state/store";
import { ModuleId } from "../../types";
import PartyDisplay from "../PartyDisplay/PartyDisplay";
import displayReducer from "./displayReducer";
import GameChoice from "./GameChoice";
import styles from "./GameDisplay.module.scss";
import LogItem from "./LogItem";

interface GameDisplayProps {
  moduleId: ModuleId;
}

export default function GameDisplay({ moduleId }: GameDisplayProps) {
  const lib = useLibrary();
  const module = useAppSelector((state) => selectModuleById(state, moduleId));
  const allChars = useAppSelector(selectCharacterIds);

  const mainRef = useRef<HTMLElement>(null);
  const [menuOptions, setMenuOptions] = useState<TaggedText[]>();
  const [display, df] = useReducer(displayReducer, []);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEngineEvent("error", ({ value }) => df({ type: "error", value }), [df]);
  useEngineEvent("listItem", ({ value }) => df({ type: "item", value }), [df]);
  useEngineEvent("paragraph", ({ value }) => df({ type: "paragraph", value }), [
    df,
  ]);
  useEngineEvent("choices", ({ values }) => setMenuOptions(values), [
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
      <header>
        <h1>{module.name}</h1>
        <Drawer.Drawer open={isDrawerOpen} onChange={setDrawerOpen}>
          <Drawer.Trigger>
            <Button>Party</Button>
          </Drawer.Trigger>
          <Drawer.Target placement="right">
            <div className={styles.drawer}>
              <Drawer.CloseButton>
                <Button>Close</Button>
              </Drawer.CloseButton>
              <PartyDisplay />
            </div>
          </Drawer.Target>
        </Drawer.Drawer>
      </header>
      <main ref={mainRef}>
        <div className={styles.log}>
          {display.map((item, i) => (
            <LogItem key={i} item={item} />
          ))}
        </div>
      </main>
      <footer>
        {menuOptions && (
          <ul className={styles.options}>
            {menuOptions.map((value, i) => (
              <GameChoice key={i} onPress={() => choose(i)} choice={value} />
            ))}
          </ul>
        )}
      </footer>
      {isDrawerOpen && (
        <div onClick={closeDrawer} className={styles.overlay}></div>
      )}
    </div>
  );
}
