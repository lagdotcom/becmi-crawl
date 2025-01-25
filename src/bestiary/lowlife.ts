import { mkDice as d } from "../tools";
import { MonsterStats } from "../types";

export const GiantCentipede: MonsterStats = {
  name: "giant centipede",
  ac: 9,
  hd: 0.5,
  hdAsterisks: 1,
  size: "S",
  mv: [60, 20],
  // attacks: no damage but save vs. poison or become ill for 10d [half speed, no physical action] OR if very small die
  numberAppearing: [d(2, 4), d(1, 8)],
  save: "NM",
  morale: 7,
  treasure: null,
  intelligence: 0,
  alignment: "N",
  xp: 6,
  type: "Lowlife",
  rarity: "C",
  terrain: "Cavern, Ruins, Woods",
};
