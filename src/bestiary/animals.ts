import { mkDice as d } from "../tools";
import { MonsterStats } from "../types";

const GiantRat: MonsterStats = {
  name: "giant rat",
  ac: 7,
  hd: 0.5,
  size: "S",
  mv: [120, 40],
  // TODO swimming: [60, 20],
  // TODO attacks: 1 bite (1d3 + disease)
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
  // TODO might have disease [6xp if true]: 1/20 chance of disease, save vs. poison or (1 in 4, die in 1d6 days / sick for 1mo unable to adventure)
  terrain: "Cavern, Ruins",
};

export const animals = [GiantRat];
