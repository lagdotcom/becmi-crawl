import { useCallback, useEffect, useReducer, useState } from "react";

import { MenuOption } from "../../engine/EngineMenuBuilder";
import { useEngineEvent, useLibrary } from "../../hooks/LibraryProvider";
import { selectCharacterIds, selectModuleById } from "../../state/selectors";
import { useAppSelector } from "../../state/store";
import { BECMINode, ModuleId } from "../../types";
import displayReducer from "./displayReducer";

interface GameDisplayProps {
  moduleId: ModuleId;
}

export default function GameDisplay({ moduleId }: GameDisplayProps) {
  const lib = useLibrary();
  const module = useAppSelector((state) => selectModuleById(state, moduleId));
  const allChars = useAppSelector(selectCharacterIds);

  const [nextNode, setNextNode] = useState<BECMINode>();
  const [menuOptions, setMenuOptions] = useState<MenuOption[]>();
  const [display, df] = useReducer(displayReducer, []);

  useEngineEvent("listItem", ({ value }) => df({ type: "item", value }), [df]);
  useEngineEvent("paragraph", ({ value }) => df({ type: "paragraph", value }), [
    df,
  ]);
  useEngineEvent("text", ({ value }) => df({ type: "text", value }), [df]);
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
      {display.map((item, i) =>
        item.type === "ul" ? (
          <ul key={i}>
            {item.items.map((li, j) => (
              <li key={j}>{li}</li>
            ))}
          </ul>
        ) : (
          <p key={i}>{item.value}</p>
        ),
      )}
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
