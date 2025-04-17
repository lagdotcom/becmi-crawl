import { nanoid } from "nanoid";

import { addEnemy, removeAllEnemies } from "../state/enemies";
import { EnemyData, EnemyStats } from "../types";
import Engine from "./Engine";

export default class CombatManager {
  partyInitiative: number;
  npcInitiative: number;

  constructor(private engine: Engine) {
    this.partyInitiative = NaN;
    this.npcInitiative = NaN;
  }

  clearEnemies() {
    this.engine.dispatch(removeAllEnemies());
  }

  addEnemies(
    data: EnemyStats,
    count: number,
    hpCounts: number[] = [],
    overrides: Partial<EnemyStats> = {},
  ) {
    for (let i = 0; i < count; i++) {
      const id = nanoid();
      const hp =
        hpCounts[i] ??
        (data.hd === 0.5
          ? this.engine.dice(1, 4, data.hdBonus)
          : this.engine.dice(data.hd, 8, data.hdBonus));

      const enemy: EnemyData = {
        id,
        hp,
        hpMax: hp,
        base: data.name,
        overrides,
      };
      data.onCreate?.(enemy);
      this.engine.dispatch(addEnemy(enemy));
    }
  }

  rollInitiative() {
    this.partyInitiative = this.engine.dice(1, 6);
    this.npcInitiative = this.engine.dice(1, 6);

    this.engine.fire("initiative", {
      party: this.partyInitiative,
      npc: this.npcInitiative,
    });
  }
}
