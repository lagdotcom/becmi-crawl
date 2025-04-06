import { startModule } from "../state/game";
import { addModule } from "../state/modules";
import { BECMILibrary, CharId, ModuleId, ModuleInfo } from "../types";
import Engine from "./Engine";

export default class Library implements BECMILibrary {
  currentModule?: ModuleId;
  modules: Map<ModuleId, ModuleInfo>;

  constructor(public engine: Engine) {
    this.modules = new Map();
  }

  register(info: ModuleInfo) {
    if (this.modules.has(info.id))
      throw new Error(`Module ID already used: ${info.id}`);

    this.modules.set(info.id, info);
    this.engine.dispatch(addModule({ id: info.id, name: info.name }));
  }

  begin(id: ModuleId, party: CharId[]) {
    if (this.currentModule === id) return;

    const info = this.modules.get(id);
    if (!info) throw new Error(`Unknown module ID: ${id}`);

    this.currentModule = info.id;
    this.engine.dispatch(startModule({ id, party }));
    void this.engine.loadInk(info.inkUrl);
  }
}
