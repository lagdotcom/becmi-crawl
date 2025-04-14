import { nanoid } from "nanoid";

import { addEnemy } from "../state/enemies";
import { MonsterStats } from "../types";
import Engine from "./Engine";

export default class CombatManager {
  constructor(private engine: Engine) {}

  addEnemies(
    data: MonsterStats,
    count: number,
    hpCounts: number[] = [],
    overrides: Partial<MonsterStats> = {},
  ) {
    for (let i = 0; i < count; i++) {
      const id = nanoid();
      const hp =
        hpCounts[i] ??
        (data.hd === 0.5
          ? this.engine.dice(1, 4, data.hdBonus)
          : this.engine.dice(data.hd, 8, data.hdBonus));

      this.engine.dispatch(
        addEnemy({
          id,
          hp,
          hpMax: hp,
          type: data.name,
          overrides,
        }),
      );
    }
  }
}
