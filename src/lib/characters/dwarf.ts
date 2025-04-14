import { CharacterClassData } from "../../types";

export const Dwarf: CharacterClassData = {
  name: "Dwarf",
  primeRequisite: ["str"],
  abilityRequirements: { con: 9 },
  hitDiceSize: 8,
  hpPerLevelFrom10: 3,
  maximumLevel: 12,
  // Armor: Any; shields permitted.
  // Weapons: Any Small or Medium melee weapon; short bows and crossbows permitted, but longbows forbidden.
  // Special Abilities:
  //   at 1st level: Fighter Maneuvers (Lance Attack and Set Spear vs. Charge maneuvers); infravision; extra languages (dwarf, gnome, goblin, kobold); 1 in 3 chance to detect traps, sliding walls, sloping corridors, new construction.
  //   at 660,000 XP: Fighter Combat Options; two attacks per round.
  //   at 1,400,000 XP: half damage from spells.
  //   at 2,200,000 XP: three attacks per round.

  experience: [
    0, 2200, 4400, 8800, 17000, 35000, 70000, 140000, 270000, 400000, 530000,
    660000,
  ],
  savesTable: [
    [1, [8, 9, 10, 13, 12]],
    [4, [6, 7, 8, 10, 9]],
    [7, [4, 5, 6, 7, 6]],
    [10, [2, 3, 4, 4, 3]],
  ],
  attackRanks: [
    [660000, "C"],
    [800000, "D"],
    [1000000, "E"],
    [1200000, "F"],
    [1400000, "G"],
    [1600000, "H"],
    [1800000, "I"],
    [2000000, "J"],
    [2200000, "K"],
    [2400000, "L"],
    [2600000, "M"],
  ],
};
