import { startModule } from "../state/game";
import { addModule } from "../state/modules";
import { BECMILibrary, CharId, ModuleId, ModuleInfo } from "../types";
import Engine from "./Engine";
import EngineModule from "./EngineModule";

export default class Library implements BECMILibrary {
  currentModule?: EngineModule;
  modules: Map<ModuleId, EngineModule>;

  constructor(public engine: Engine) {
    this.modules = new Map();
  }

  register(info: ModuleInfo) {
    if (this.modules.has(info.id))
      throw new Error(`Module ID already used: ${info.id}`);

    const module = new EngineModule(this, info);
    this.modules.set(module.id, module);

    this.engine.dispatch(addModule({ id: module.id, name: module.info.name }));

    return module;
  }

  begin(id: ModuleId, party: CharId[]) {
    if (this.currentModule?.id === id) return;

    const module = this.modules.get(id);
    if (!module) throw new Error(`Unknown module ID: ${id}`);

    this.currentModule = module;
    this.engine.dispatch(startModule({ id, party }));
    module.info.begin(this.engine);
  }
}
