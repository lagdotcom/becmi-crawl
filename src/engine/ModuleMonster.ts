import { ModuleId, MonsterOverride } from "../types";

export default interface ModuleMonster {
  module: ModuleId;
  base: string;
  override?: MonsterOverride;
}
