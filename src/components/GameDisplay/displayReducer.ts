type DisplayItem =
  | { type: "paragraph"; value: string }
  | { type: "texts"; value: string }
  | { type: "ul"; items: string[] };

type DisplayState = DisplayItem[];

type DisplayAction =
  | { type: "paragraph"; value: string }
  | { type: "text"; value: string }
  | { type: "item"; value: string };

export default function displayReducer(
  items: DisplayState,
  { type, value }: DisplayAction,
): DisplayState {
  const top: DisplayItem | undefined = items[items.length - 1];
  const exceptTop = items.slice(0, -1);

  switch (type) {
    case "item":
      if (top?.type === "ul")
        return exceptTop.concat({ type: "ul", items: top.items.concat(value) });
      return items.concat({ type: "ul", items: [value] });

    case "paragraph":
      return items.concat({ type: "paragraph", value });

    case "text":
      if (top?.type === "texts")
        return exceptTop.concat({
          type: "texts",
          value: `${top.value} ${value}`,
        });
      return items.concat({ type: "texts", value });
  }
}
