interface TextItem {
  value: string;
}

export type DisplayItem =
  | ({ type: "error" } & TextItem)
  | ({ type: "paragraph" } & TextItem)
  | { type: "ul"; items: TextItem[] };

type DisplayState = DisplayItem[];

type DisplayAction =
  | { type: "error"; value: string }
  | { type: "paragraph"; value: string }
  | { type: "item"; value: string };

export default function displayReducer(
  items: DisplayState,
  action: DisplayAction,
): DisplayState {
  const top: DisplayItem | undefined = items[items.length - 1];
  const exceptTop = items.slice(0, -1);
  const { type, value } = action;

  switch (type) {
    case "item":
      if (top?.type === "ul")
        return exceptTop.concat({
          type: "ul",
          items: top.items.concat({ value }),
        });
      return items.concat({ type: "ul", items: [{ value }] });

    case "paragraph":
      return items.concat({ type: "paragraph", value });

    case "error":
      return items.concat({ type: "error", value });
  }
}
