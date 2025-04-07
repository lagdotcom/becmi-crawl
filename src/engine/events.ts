export interface EngineEvents {
  error: { value: string };
  listItem: { value: string };
  paragraph: { value: string };
  choices: { value: string[] };
}
export type EngineEventName = keyof EngineEvents;
export type EngineEventHandler<E extends EngineEventName> = (
  info: EngineEvents[E],
) => void;
