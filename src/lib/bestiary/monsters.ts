import { mkDice as d } from "../../tools";
import { EnemyStats } from "../../types";

const Actaeon: EnemyStats = {
  name: "actaeon",
  ac: 3,
  hd: 11,
  hdAsterisks: 2,
  size: "L",
  mv: [150, 50],
  // TODO attacks: 2 spears (1d6+6), 1 antler (2d8) or breath (special)
  attacks: [
    { name: "weapon", damage: ["weapon", 6, 1] },
    { name: "weapon", damage: ["weapon", 6, 1] },
    { name: "antler", damage: d(2, 8) },
  ],
  numberAppearing: [0, 1],
  save: ["C", 11],
  morale: 10,
  treasure: "B",
  intelligence: 12,
  alignment: "N",
  xp: 2700,
  type: "Monster",
  rarity: "R",
  // TODO breath weapon: 1/day, 10' cube, save vs. spell and polymorph into normal forest creature, save makes duration 24h
  // TODO summon woodland creatures: 1/day, 1d6 [boar/bear/centaur/griffon/chameleon/treant] arrive in 1d4 turns
  terrain: "Woods",
  load: [3000, 6000],
};

export const monsters = [Actaeon];
