import { CharacterClassData } from "../../types";

export const Elf: CharacterClassData = {
  name: "Elf",
  primeRequisite: ["str", "int"],
  abilityRequirements: { int: 9 },
  hitDiceSize: 6,
  hpPerLevelFrom10: 1,
  maximumLevel: 10,
  // Armor: All; shields permitted.
  // Weapons: Any.
  // Special Abilities:
  //   at 1st level: Fighter Maneuvers (Lance Attack, Set Spear vs. Charge); infravision; extra languages (elf, gnoll, hobgoblin, orc); 1 in 3 chance to detect secret and hidden doors; immunity to ghoul paralysis; magic spells.
  //   at 850,000 XP: Combat Options for Fighters; two attacks per round.
  //   at 1,600,000 XP: half damage from dragon breath.
  //   at 2,600,000 XP: three attacks per round.

  experience: [
    0, 4000, 8000, 16000, 32000, 64000, 120000, 250000, 400000, 600000,
  ],
  savesTable: [
    [1, [12, 13, 13, 15, 15]],
    [4, [8, 10, 10, 11, 11]],
    [7, [4, 7, 7, 7, 7]],
    [10, [2, 4, 4, 3, 3]],
  ],
  attackRanks: [
    [600000, "C"],
    [850000, "D"],
    [1100000, "E"],
    [1350000, "F"],
    [1600000, "G"],
    [1850000, "H"],
    [2100000, "I"],
    [2350000, "J"],
    [2600000, "K"],
    [2850000, "L"],
    [3100000, "M"],
  ],
};

const slotsTable = [
  [1],
  [2],
  [2, 1],
  [2, 2],
  [2, 2, 1],
  [2, 2, 2],
  [3, 2, 2, 1],
  [3, 3, 2, 2],
  [3, 3, 3, 2, 1],
  [3, 3, 3, 3, 2],
];
