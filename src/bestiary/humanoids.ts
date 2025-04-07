import { mkDice as d } from "../tools";
import { MonsterStats } from "../types";

const Berserker: MonsterStats = {
  name: "berserker",
  ac: 7,
  hd: 1,
  hdBonus: 1,
  hdAsterisks: 1,
  size: "M",
  mv: [120, 40],
  // attacks: 1 (by weapon)
  numberAppearing: [d(1, 6), d(3, 10)],
  save: ["F", 1],
  morale: 12,
  treasure: ["P", "B"],
  intelligence: 9,
  alignment: "N",
  xp: 19,
  type: "Human",
  rarity: "R",
  // ferocity: never retreat, attack +2 vs. human/humanoids
  terrain: "Any",
};

const Kobold: MonsterStats = {
  name: "kobold",
  ac: 7,
  hd: 0.5,
  size: "S",
  mv: [90, 30],
  // attacks: 1 (by weapon -1)
  numberAppearing: [d(4, 4), d(1, 6, 0, 10)],
  save: "NM",
  morale: 6,
  treasure: ["P", "J"],
  intelligence: 9,
  alignment: "C",
  xp: 5,
  type: "Humanoid",
  rarity: "C",
  // TODO infravision 90'
  // TODO kobold chieftain = 9hp, 2HD monster. 1d6 bodyguards = 6hp, 1+1HD monster
  // TODO kobolds attack gnomes on sight
  terrain: "Cavern, Hill, Mountain, Wood",
};

const Orc: MonsterStats = {
  name: "orc",
  ac: 6,
  hd: 1,
  size: "M",
  mv: [120, 40],
  // attacks: 1 (by weapon)
  numberAppearing: [d(2, 4), d(1, 6, 0, 10)],
  save: ["F", 1],
  morale: 6,
  treasure: ["P", "D"],
  intelligence: 7,
  alignment: "C",
  xp: 10,
  type: "Humanoid",
  rarity: "C",
  // TODO daylight sensitivity: -1 attack in daylight
  // TODO one member of each group of orcs is a leader with 8hp and +1 damage who gives other orcs morale=8
  terrain: "Wilderness (any)",
};

const Troglodyte: MonsterStats = {
  name: "troglodyte",
  ac: 5,
  hd: 2,
  hdAsterisks: 1,
  size: "L",
  mv: [120, 40],
  // attacks: 2 claws (1d4), 1 bite (1d4)
  numberAppearing: [d(1, 8), d(5, 8)],
  save: ["F", 2],
  morale: 9,
  treasure: "A",
  intelligence: 10,
  alignment: "C",
  xp: 25,
  type: "Humanoid",
  rarity: "R",
  // TODO colour changing: surprise on 1-4
  // TODO nauseating stench: in combat, save vs. poison or -2 to attack while in h2h
  terrain: "Cavern, Ruins",
};

export const humanoids = [Berserker, Kobold, Orc, Troglodyte];
