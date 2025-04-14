import { CharacterClassData, ClassLevel, ThresholdTable } from "../../types";

export const Cleric: CharacterClassData = {
  name: "Cleric",
  primeRequisite: ["wis"],
  hitDiceSize: 6,
  hpPerLevelFrom10: 1,
  maximumLevel: 36,
  // Armor: Any, plus shield.
  // Weapons: No edged or pointed weapons; all others permitted.
  // Special Abilities: Turning undead; clerical spells.

  experience: [
    0, 1500, 3000, 6000, 12000, 25000, 50000, 100000, 200000, 300000, 400000,
    500000, 600000, 700000, 800000, 900000, 1000000, 1100000, 1200000, 1300000,
    1400000, 1500000, 1600000, 1700000, 1800000, 1900000, 2000000, 2100000,
    2200000, 2300000, 2400000, 2500000, 2600000, 2700000, 2800000, 2900000,
  ],
  savesTable: [
    [1, [11, 12, 14, 16, 15]],
    [5, [9, 10, 12, 14, 13]],
    [9, [7, 8, 10, 12, 11]],
    [13, [6, 7, 8, 10, 9]],
    [17, [5, 6, 6, 8, 7]],
    [21, [4, 5, 5, 6, 5]],
    [25, [3, 4, 4, 4, 4]],
    [29, [2, 3, 3, 3, 3]],
    [33, [2, 2, 2, 2, 2]],
  ],
};

const slotsTable = [
  [],
  [1],
  [2],
  [2, 1],
  [2, 2],
  [2, 2, 1],
  [3, 2, 2],
  [3, 3, 2, 1],
  [3, 3, 3, 2],
  [4, 4, 3, 2, 1],
  [4, 4, 3, 3, 2],
  [4, 4, 4, 3, 2, 1],
  [5, 5, 4, 3, 2, 2],
  [5, 5, 5, 3, 3, 2],
  [6, 5, 5, 3, 3, 3],
  [6, 5, 5, 4, 4, 3],
  [6, 6, 5, 4, 4, 3, 1],
  [6, 6, 5, 4, 4, 3, 2],
  [7, 6, 5, 4, 4, 4, 2],
  [7, 6, 5, 4, 4, 4, 3],
  [7, 6, 5, 5, 5, 4, 3],
  [7, 6, 5, 5, 5, 4, 4],
  [8, 7, 6, 6, 5, 5, 4],
  [8, 7, 6, 6, 5, 5, 5],
  [8, 7, 7, 6, 6, 5, 5],
  [8, 8, 7, 6, 6, 6, 5],
  [8, 8, 7, 6, 6, 6, 5],
  [8, 8, 7, 7, 7, 6, 5],
  [8, 8, 7, 7, 7, 6, 6],
  [8, 8, 8, 7, 7, 7, 6],
  [8, 8, 8, 8, 8, 7, 6],
  [9, 8, 8, 8, 8, 7, 7],
  [9, 9, 8, 8, 8, 8, 7],
  [9, 9, 9, 8, 8, 8, 8],
  [9, 9, 9, 9, 9, 8, 8],
  [9, 9, 9, 9, 9, 9, 9],
];

type TurnType =
  | 7
  | 9
  | 11
  | "Turn 2d6"
  | "Destroy 2d6"
  | "Destroy 3d6"
  | "Destroy 4d6";
const T2: TurnType = "Turn 2d6";
const D2: TurnType = "Destroy 2d6";
const D3: TurnType = "Destroy 3d6";
const D4: TurnType = "Destroy 4d6";

const turningTable: ThresholdTable<
  ClassLevel,
  [
    skeleton: TurnType,
    zombie: TurnType,
    ghoul: TurnType,
    wight?: TurnType,
    wraith?: TurnType,
    mummy?: TurnType,
    spectre?: TurnType,
    vampire?: TurnType,
    phantom?: TurnType,
    haunt?: TurnType,
    spirit?: TurnType,
    nightshade?: TurnType,
    lich?: TurnType,
    special?: TurnType,
  ]
> = [
  [1, [7, 9, 11]],
  [2, [T2, 7, 9, 11]],
  [3, [T2, T2, 7, 9, 11]],
  [4, [D2, T2, T2, 7, 9, 11]],
  [5, [D2, D2, T2, T2, 7, 9, 11]],
  [6, [D2, D2, D2, T2, T2, 7, 9, 11]],
  [7, [D2, D2, D2, D2, T2, T2, 7, 9, 11]],
  [8, [D2, D2, D2, D2, D2, T2, T2, 7, 9, 11]],
  [9, [D2, D2, D2, D2, D2, D2, T2, T2, 7, 9, 11]],
  [11, [D3, D2, D2, D2, D2, D2, D2, T2, T2, 7, 9, 11]],
  [13, [D3, D3, D2, D2, D2, D2, D2, D2, T2, T2, 7, 9, 11]],
  [15, [D3, D3, D3, D2, D2, D2, D2, D2, D2, T2, T2, 7, 9, 11]],
  [17, [D3, D3, D3, D3, D2, D2, D2, D2, D2, D2, T2, T2, 7, 9]],
  [21, [D3, D3, D3, D3, D3, D2, D2, D2, D2, D2, D2, T2, T2, 7]],
  [25, [D4, D3, D3, D3, D3, D3, D2, D2, D2, D2, D2, D2, T2, T2]],
  [29, [D4, D4, D3, D3, D3, D3, D3, D2, D2, D2, D2, D2, T2, T2]],
  [33, [D4, D4, D4, D3, D3, D3, D3, D3, D2, D2, D2, D2, T2, T2]],
];
