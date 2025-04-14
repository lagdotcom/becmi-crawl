import { CharacterClassData } from "../../types";

export const Halfling: CharacterClassData = {
  name: "Halfling",
  primeRequisite: ["str", "dex"],
  abilityRequirements: { dex: 9, con: 9 },
  hitDiceSize: 6,
  hpPerLevelFrom10: 0,
  maximumLevel: 8,
  // Armor: Any; shield is permitted; armor must be designed specifically for halflings.
  // Weapons: Any Small melee weapon; short bow; light crossbow.
  // Special Abilities:
  //   at 1st level: Fighter Maneuver (Set Spear vs. Charge); Combat Bonuses (-2 AC vs. monsters larger than man-size, +1 to attack roll with missile weapons, +1 to Individual Initiative); 90% chance to hide motionless in woodlands, 33% chance to hide motionless in dimly lit building interiors.
  //   at 300,000 XP: half damage from spells.
  //   at 900,000 XP: Fighter Combat Options; two attacks per round.
  //   at 2,100,000 XP: half damage from dragon breath.
  //   at 3,000,000 XP: three attacks per round.

  experience: [0, 2000, 4000, 8000, 16000, 32000, 64000, 120000],
  savesTable: [
    [1, [8, 9, 10, 13, 12]],
    [4, [5, 6, 7, 9, 8]],
    [7, [2, 3, 4, 5, 4]],
  ],
  attackRanks: [
    [120000, "A"],
    [300000, "B"],
    [600000, "C"],
    [900000, "D"],
    [1200000, "E"],
    [1500000, "F"],
    [1800000, "G"],
    [2100000, "H"],
    [2400000, "I"],
    [2700000, "J"],
    [3000000, "K"],
  ],
};
