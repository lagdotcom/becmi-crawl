import { BECMINode } from "../types";
import { MenuOption } from "./EngineMenuBuilder";

export interface EngineEvents {
  listItem: { value: string };
  menu: { options: MenuOption[] };
  next: { node: BECMINode };
  paragraph: { value: string };
  text: { value: string };
}
export type EngineEventName = keyof EngineEvents;
export type EngineEventHandler<E extends EngineEventName> = (
  info: EngineEvents[E],
) => void;
