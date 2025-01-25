import {
  BECMIModule,
  BECMINode,
  ModuleId,
  ModuleInfo,
  MonsterOverride,
  NodeId,
  StateId,
} from "../types";
import EngineNode from "./EngineNode";
import EngineState from "./EngineState";
import Library from "./Library";
import ModuleMonster from "./ModuleMonster";

export default class EngineModule implements BECMIModule {
  private nextId: number;

  id: ModuleId;
  monsters: Map<string, ModuleMonster>;
  nodes: Map<NodeId, EngineNode>;
  states: Map<StateId, EngineState<unknown>>;

  constructor(
    private lib: Library,
    public info: ModuleInfo,
  ) {
    this.id = info.id;
    this.monsters = new Map();
    this.nodes = new Map();
    this.states = new Map();

    this.nextId = 1;
  }

  private getNextId(prefix: string) {
    return `${this.id}:${prefix}${this.nextId++}`;
  }

  monster(base: string, override?: MonsterOverride) {
    const monster: ModuleMonster = {
      module: this.getNextId(base),
      base,
      override,
    };
    this.monsters.set(monster.module, monster);

    return monster;
  }

  node(id: NodeId, enter: BECMINode["enter"]) {
    if (this.nodes.has(id)) throw new Error(`Node ID already used: ${id}`);

    const n = new EngineNode(this, id, enter);
    this.nodes.set(id, n);

    return n;
  }

  state<T>(id: StateId, defaultValue: T) {
    if (this.states.has(id)) throw new Error(`State ID already used: ${id}`);

    const s = new EngineState(this.lib.engine, id, defaultValue);
    this.states.set(id, s);

    return s;
  }
}
