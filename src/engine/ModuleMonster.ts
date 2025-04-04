import {
  ModuleId,
  MonsterBaseName,
  MonsterId,
  MonsterOverride,
} from "../types";

export default interface ModuleMonster {
  id: MonsterId;
  module: ModuleId;
  base: MonsterBaseName;
  override?: MonsterOverride;
}
