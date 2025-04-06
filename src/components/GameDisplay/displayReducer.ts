import { Styling } from "../../types";

interface TextItem {
  value: string;
  style?: Styling;
}

export type DisplayItem =
  | ({ type: "paragraph" } & TextItem)
  | { type: "texts"; items: TextItem[] }
  | { type: "ul"; items: TextItem[] };

type DisplayState = DisplayItem[];

type DisplayAction =
  | { type: "paragraph"; value: string; style?: Styling }
  | { type: "text"; value: string; style?: Styling; newBlock?: boolean }
  | { type: "item"; value: string; style?: Styling };

export default function displayReducer(
  items: DisplayState,
  action: DisplayAction,
): DisplayState {
  const top: DisplayItem | undefined = items[items.length - 1];
  const exceptTop = items.slice(0, -1);
  const { type, value, style } = action;

  switch (type) {
    case "item":
      if (top?.type === "ul")
        return exceptTop.concat({
          type: "ul",
          items: top.items.concat({ value, style }),
        });
      return items.concat({ type: "ul", items: [{ value, style }] });

    case "paragraph":
      return items.concat({ type: "paragraph", value, style });

    case "text":
      if (!action.newBlock && top?.type === "texts")
        return exceptTop.concat({
          type: "texts",
          items: top.items.concat({ value, style }),
        });
      return items.concat({ type: "texts", items: [{ value, style }] });
  }
}
