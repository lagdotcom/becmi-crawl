import { CharacterClassData } from "../../types";

export const Fighter: CharacterClassData = {
  name: "Fighter",
  primeRequisite: ["str"],
  hitDiceSize: 8,
  hpPerLevelFrom10: 2,
  maximumLevel: 36,
  // Armor: Any; shields allowed.
  // Weapons: Any.
  // Special Abilities: Lance Attack and Set Spear vs. Charge maneuvers, Fighter Combat Options.

  experience: [
    0, 2000, 4000, 8000, 16000, 32000, 64000, 120000, 240000, 360000, 480000,
    600000, 720000, 840000, 960000, 1080000, 1200000, 1320000, 1440000, 1560000,
    1680000, 1800000, 1920000, 2040000, 2160000, 2280000, 2400000, 2520000,
    2640000, 2760000, 2880000, 3000000, 3120000, 3240000, 3360000, 3480000,
  ],
  savesTable: [
    [1, [12, 13, 14, 15, 16]],
    [4, [10, 11, 12, 13, 14]],
    [7, [8, 9, 10, 11, 12]],
    [10, [6, 7, 8, 9, 10]],
    [13, [6, 6, 7, 8, 9]],
    [16, [5, 6, 6, 7, 8]],
    [19, [5, 5, 6, 6, 7]],
    [22, [4, 5, 5, 5, 6]],
    [25, [4, 4, 5, 4, 5]],
    [28, [3, 4, 4, 3, 4]],
    [31, [3, 3, 3, 2, 3]],
    [34, [2, 2, 2, 2, 2]],
  ],
};

// TODO Paladins, Avengers
