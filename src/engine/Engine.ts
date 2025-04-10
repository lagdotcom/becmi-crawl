import { Story } from "inkjs";

import { bestiary } from "../bestiary";
import { selectParty } from "../state/selectors";
import { AppAction, AppStore } from "../state/store";
import isDefined from "../tools/isDefined";
import { ResourceURL } from "../types";
import EngineChar from "./Char";
import {
  EngineEventHandler,
  EngineEventName,
  EngineEvents,
  TaggedText,
} from "./events";
import Library from "./Library";
import { dataDict, Dict } from "./parsing";

type EngineListeners = {
  [E in EngineEventName]: Set<EngineEventHandler<E>>;
};

type InkCommandHandler = (e: Engine, args: Dict) => void;

const inkCommandHandlers: Partial<Record<string, InkCommandHandler>> = {
  TIME(e: Engine, args: Dict) {
    const turn = args.num("turn");
    if (!isDefined(turn)) return console.warn("@@TIME without turn");

    e.turnCount += turn;
    console.log(`it is now turn ${e.turnCount}`);
  },

  ENEMY(e: Engine, args: Dict) {
    const type = args.str("type");
    if (!isDefined(type)) return console.warn("@@ENEMY without type");
    const count = args.num("count");
    if (!isDefined(count)) return console.warn("@@ENEMY without count");

    const data = bestiary[type];
    if (!data) return console.warn(`unknown enemy type: ${type}`);

    // TODO
    console.log(data, {
      count,
      hp: args.numArray("hp"),
      mv: args.num("mv"),
      ml: args.num("ml"),
    });
  },
};

export default class Engine {
  listeners: EngineListeners;
  story!: Story;
  turnCount: number;

  constructor(private store: AppStore) {
    this.listeners = {
      error: new Set(),
      listItem: new Set(),
      paragraph: new Set(),
      choices: new Set(),
    };
    this.turnCount = NaN;
  }

  get party() {
    return selectParty(this.store.getState()).map(
      (data) => new EngineChar(data),
    );
  }

  dispatch(action: AppAction) {
    return this.store.dispatch(action);
  }

  async loadInk(url: ResourceURL) {
    const response = await fetch(url);
    const raw = await response.json();

    this.turnCount = 0;
    this.story = new Story(raw);
    return this.runStory();
  }

  private runStory() {
    while (this.story.canContinue) {
      const raw = this.story.Continue();
      if (this.story.currentDebugMetadata)
        console.log(this.story.currentDebugMetadata);

      if (!raw) continue;
      const str = this.runCommands(raw);

      if (!str.trim()) continue;
      if (str.startsWith("•"))
        this.listItem(str.slice(1).trim(), this.story.currentTags ?? []);
      else this.paragraph(str.trim(), this.story.currentTags ?? []);
    }

    this.choices(
      this.story.currentChoices.map((ch) => ({
        text: ch.text,
        tags: ch.tags ?? [],
      })),
    );
  }

  runCommands(line: string) {
    while (true) {
      const i = line.indexOf("@@");
      if (i === -1) return line;

      const j = line.indexOf("(", i);
      if (j === -1) throw new Error(`@@ without (: ${line}`);

      const k = line.indexOf(")", j);
      if (k === -1) throw new Error(`@@ without ): ${line}`);

      const command = line.slice(i + 2, j);
      const args = dataDict(line.slice(j + 1, k));
      this.runCommand(command, args);

      line = line.slice(0, i) + line.slice(k + 1);
    }
  }

  runCommand(command: string, args: Dict) {
    const handler = inkCommandHandlers[command];
    if (!handler)
      return this.error(`unhandled @@${command}(${args.toString()})`);

    handler(this, args);
  }

  choose(index: number) {
    this.story.ChooseChoiceIndex(index);
    return this.runStory();
  }

  on<E extends EngineEventName>(event: E, handler: EngineEventHandler<E>) {
    this.listeners[event].add(handler);
    return () => {
      this.listeners[event].delete(handler);
    };
  }

  fire<E extends EngineEventName>(event: E, info: EngineEvents[E]) {
    const handlers = this.listeners[event];

    if (handlers.size)
      for (const handler of handlers) (handler as EngineEventHandler<E>)(info);
    else console.warn(`[${event}] no handlers!`);

    return info;
  }

  dice(count: number, size: number, bonus = 0) {
    let total = 0;
    for (let i = 0; i < count; i++) total += Math.ceil(Math.random() * size);
    return total + bonus;
  }
  percentage(chance: number) {
    return Math.random() < chance / 100;
  }
  randomPick<const T>(items: T[]) {
    const index = Math.random() * items.length;
    return items[Math.floor(index)];
  }
  shuffle<const T>(source: T[]) {
    const items = Array<T>(source.length);

    for (let i = 0; i < source.length; i++) {
      const j = Math.floor(Math.random() * i);
      items[i] = source[i];
      items[i] = items[j];
      items[j] = source[i];
    }

    return items;
  }

  listItem(text: string, tags: string[] = []) {
    this.fire("listItem", { value: { text, tags } });
  }
  paragraph(text: string, tags: string[] = []) {
    this.fire("paragraph", { value: { text, tags } });
  }
  choices(values: TaggedText[]) {
    this.fire("choices", { values });
  }
  error(value: string) {
    console.error(value);
    this.fire("error", { value });
  }
}

export function addLibrary(store: AppStore) {
  const library = new Library(new Engine(store));
  return (window.BECMI = library);
}
