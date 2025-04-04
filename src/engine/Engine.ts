import { setModuleState } from "../state/game";
import { selectParty } from "../state/selectors";
import { AppAction, AppStore } from "../state/store";
import { BECMIEngine, BECMINode, StateId, Styling } from "../types";
import EngineChar from "./Char";
import EngineMenuBuilder from "./EngineMenuBuilder";
import EngineNode from "./EngineNode";
import { EngineEventHandler, EngineEventName, EngineEvents } from "./events";
import Library from "./Library";

type EngineListeners = {
  [E in EngineEventName]: Set<EngineEventHandler<E>>;
};

export default class Engine implements BECMIEngine {
  listeners: EngineListeners;
  menuBuilder?: EngineMenuBuilder;
  node!: BECMINode;

  constructor(private store: AppStore) {
    this.listeners = {
      listItem: new Set(),
      menu: new Set(),
      next: new Set(),
      paragraph: new Set(),
      text: new Set(),
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

  goto(node: BECMINode) {
    console.log(`[Engine.goto] ${node.id} from ${this.node?.id}`);
    const previousNode = this.node;
    this.menuBuilder = undefined;
    this.node = node;
    (node as EngineNode).enter(this, previousNode);

    if (this.menuBuilder)
      this.fire("menu", {
        options: (this.menuBuilder as EngineMenuBuilder).options,
      });
  }

  listItem(value: string, style?: Styling) {
    this.fire("listItem", { value, style });
  }
  next(node: BECMINode) {
    this.fire("next", { node });
  }
  paragraph(value: string, style?: Styling) {
    this.fire("paragraph", { value, style });
  }
  text(value: string, style?: Styling) {
    this.fire("text", { value, style });
  }

  getState<T>(id: StateId) {
    return this.store.getState().game.moduleState[id] as T | undefined;
  }

  setState<T>(id: StateId, value: T) {
    this.dispatch(setModuleState({ id, value }));
  }

  menu() {
    this.menuBuilder = new EngineMenuBuilder();
    return this.menuBuilder;
  }
}

export function addLibrary(store: AppStore) {
  const library = new Library(new Engine(store));
  return (window.BECMI = library);
}
