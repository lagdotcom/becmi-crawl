import { Story } from "inkjs";

import { selectParty } from "../state/selectors";
import { AppAction, AppStore } from "../state/store";
import { ResourceURL } from "../types";
import EngineChar from "./Char";
import { EngineEventHandler, EngineEventName, EngineEvents } from "./events";
import Library from "./Library";

type EngineListeners = {
  [E in EngineEventName]: Set<EngineEventHandler<E>>;
};

export default class Engine {
  listeners: EngineListeners;
  story!: Story;

  constructor(private store: AppStore) {
    this.listeners = {
      listItem: new Set(),
      paragraph: new Set(),
      choices: new Set(),
    };
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

    this.story = new Story(raw);
    this.run();
  }

  private run() {
    while (this.story.canContinue) {
      const str = this.story.Continue();
      if (!str?.trim()) continue;

      if (str.startsWith("•")) this.listItem(str.slice(1).trim());
      else this.paragraph(str.trim());
    }

    this.choices(this.story.currentChoices.map((ch) => ch.text));
  }

  choose(index: number) {
    this.story.ChooseChoiceIndex(index);
    this.run();
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

  listItem(value: string) {
    this.fire("listItem", { value });
  }
  paragraph(value: string) {
    this.fire("paragraph", { value });
  }
  choices(value: string[]) {
    this.fire("choices", { value });
  }
}

export function addLibrary(store: AppStore) {
  const library = new Library(new Engine(store));
  return (window.BECMI = library);
}
