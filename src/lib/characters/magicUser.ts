import { CharacterClassData } from "../../types";

export const MagicUser: CharacterClassData = {
  name: "Magic User",
  primeRequisite: ["int"],
  hitDiceSize: 4,
  hpPerLevelFrom10: 1,
  maximumLevel: 36,
  // Armor: None; no shield permitted
  // Weapons: Dagger only. Optional (DM's discretion): staff, blowgun, flaming oil, holy water, net, thrown rock, sling, whip.
  // Special Abilities: Magical spells.

  experience: [
    0, 2500, 5000, 10000, 20000, 40000, 80000, 150000, 300000, 450000, 600000,
    750000, 900000, 1050000, 1200000, 1350000, 1500000, 1650000, 1800000,
    1950000, 2100000, 2250000, 2400000, 2550000, 2700000, 2850000, 3000000,
    3150000, 3300000, 3450000, 3600000, 3750000, 3900000, 4050000, 4200000,
    4350000,
  ],
  savesTable: [
    [1, [13, 14, 13, 16, 15]],
    [6, [11, 12, 11, 14, 12]],
    [11, [9, 10, 9, 12, 9]],
    [16, [7, 8, 7, 10, 6]],
    [21, [5, 6, 5, 8, 4]],
    [25, [4, 4, 4, 6, 3]],
    [29, [3, 3, 3, 4, 2]],
    [33, [2, 2, 2, 2, 2]],
  ],
};

const slotsTable = [
  [1],
  [2],
  [2, 1],
  [2, 2],
  [2, 2, 1],
  [3, 2, 2],
  [3, 3, 2, 1],
  [3, 3, 2, 2],
  [3, 3, 3, 2, 1],
  [3, 3, 3, 3, 2],
  [4, 3, 3, 3, 2, 1],
  [4, 4, 4, 3, 2, 1],
  [4, 4, 4, 3, 2, 2],
  [4, 4, 4, 4, 3, 2],
  [5, 4, 4, 4, 3, 2, 1],
  [5, 5, 5, 4, 3, 2, 2],
  [6, 5, 5, 4, 4, 3, 2],
  [6, 5, 5, 4, 4, 3, 2, 1],
  [6, 5, 5, 5, 4, 3, 2, 2],
  [6, 5, 5, 5, 4, 4, 3, 2],
  [6, 5, 5, 5, 4, 4, 3, 2, 1],
  [6, 6, 5, 5, 5, 4, 3, 2, 2],
  [6, 6, 6, 6, 5, 4, 3, 3, 2],
  [7, 7, 6, 6, 5, 5, 4, 3, 2],
  [7, 7, 6, 6, 5, 5, 4, 4, 3],
  [7, 7, 7, 6, 6, 5, 5, 4, 3],
  [7, 7, 7, 6, 6, 5, 5, 5, 4],
  [8, 8, 7, 6, 6, 6, 6, 5, 4],
  [8, 8, 7, 7, 7, 6, 6, 5, 5],
  [8, 8, 8, 7, 7, 7, 6, 6, 5],
  [8, 8, 8, 7, 7, 7, 7, 6, 6],
  [9, 8, 8, 8, 8, 7, 7, 7, 6],
  [9, 9, 9, 8, 8, 8, 7, 7, 7],
  [9, 9, 9, 9, 8, 8, 8, 8, 7],
  [9, 9, 9, 9, 9, 9, 8, 8, 8],
  [9, 9, 9, 9, 9, 9, 9, 9, 9],
];

// NOTE: Any damage-causing spell can produce a maximum of 20 dice of damage (of whatever type is applicable). Therefore, a 16th level magic-user casting a fireball spell can deal out 16d6 points of damage, but a 27th level caster only inflicts the maximum of 20d6 points of damage.
