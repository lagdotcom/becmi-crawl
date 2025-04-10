export interface TaggedText {
  text: string;
  tags: string[];
}

export interface EngineEvents {
  error: { value: string };
  listItem: { value: TaggedText };
  paragraph: { value: TaggedText };
  choices: { values: TaggedText[] };
}
export type EngineEventName = keyof EngineEvents;
export type EngineEventHandler<E extends EngineEventName> = (
  info: EngineEvents[E],
) => void;
