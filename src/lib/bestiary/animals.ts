import { mkDice as d, percentage } from "../../tools";
import { EnemyStats } from "../../types";

const GiantRat: EnemyStats = {
  name: "giant rat",
  ac: 7,
  hd: 0.5,
  size: "S",
  mv: [120, 40],
  // TODO swimming: [60, 20],
  attacks: [{ name: "bite", damage: d(1, 3) }],
  numberAppearing: [d(3, 6), d(3, 10)],
  save: "NM",
  morale: 8,
  treasure: "L",
  intelligence: 2,
  alignment: "N",
  xp: 5,
  type: "Giant Animal",
  rarity: "C",
  // TODO afraid of fire
  terrain: "Cavern, Ruins",

  onCreate(me) {
    // TODO this could override other overrides...
    if (percentage(5)) {
      me.overrides.xp = 6;
      me.overrides.attacks = [
        { name: "bite", damage: d(1, 3), extra: "disease" },
      ];
      // TODO save vs. poison or (1 in 4, die in 1d6 days / sick for 1mo unable to adventure)
    }
  },
};

export const animals = [GiantRat];
