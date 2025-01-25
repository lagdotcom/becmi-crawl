import { setModuleState } from "../state/game";
import { selectParty } from "../state/selectors";
import { AppAction, AppStore } from "../state/store";
import { BECMIEngine, BECMINode, StateId } from "../types";
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

  randomPick<T>(items: T[]) {
    const index = Math.random() * items.length;
    return items[Math.floor(index)];
  }
  percentage(chance: number) {
    return Math.random() < chance / 100;
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

  listItem(value: string) {
    this.fire("listItem", { value });
  }
  next(node: BECMINode) {
    this.fire("next", { node });
  }
  paragraph(value: string) {
    this.fire("paragraph", { value });
  }
  text(value: string) {
    this.fire("text", { value });
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
