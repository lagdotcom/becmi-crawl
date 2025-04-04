import { BECMINode, Styling } from "../types";
import { MenuOption } from "./EngineMenuBuilder";

export interface EngineEvents {
  listItem: { value: string; style?: Styling };
  menu: { options: MenuOption[] };
  next: { node: BECMINode };
  paragraph: { value: string; style?: Styling };
  text: { value: string; style?: Styling };
}
export type EngineEventName = keyof EngineEvents;
export type EngineEventHandler<E extends EngineEventName> = (
  info: EngineEvents[E],
) => void;
