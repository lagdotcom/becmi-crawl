// https://spin.atomicobject.com/typescript-flexible-nominal-typing/
interface Flavouring<FlavourT> {
  _type?: FlavourT;
}
type Flavour<T, FlavourT> = T & Flavouring<FlavourT>;

export type AC = Flavour<number, "AC">;
export type CharId = Flavour<string, "CharId">;
export type ClassLevel = Flavour<number, "ClassLevel">;
export type CoinWeight = Flavour<number, "CoinWeight">;
export type DiceSize = Flavour<number, "DiceSize">;
export type ExperiencePoints = Flavour<number, "ExperiencePoints">;
export type Feet = Flavour<number, "Feet">;
export type HitDice = Flavour<number, "HitDice">;
export type ModuleId = Flavour<string, "ModuleId">;
export type MonsterBaseName = Flavour<string, "MonsterBaseName">;
export type MonsterId = Flavour<string, "MonsterId">;
export type NodeId = Flavour<string, "NodeId">;
export type Percentage = Flavour<number, "Percentage">;
export type ResourceURL = Flavour<string, "ResourceURL">;

export interface BECMILibrary {
  register: (info: ModuleInfo) => void;
}

export interface ModuleInfo {
  id: ModuleId;
  name: NodeId;
  author: string;
  partySize: [min: number, max: number];
  levelRange: [min: ClassLevel, max: ClassLevel];
  inkUrl: ResourceURL;
}

export type AbilityScore = "str" | "int" | "wis" | "dex" | "con" | "cha";
export type CharacterClass =
  | "Cleric"
  | "Druid"
  | "Fighter"
  | "Magic User"
  | "Mystic"
  | "Thief"
  | "Dwarf"
  | "Elf"
  | "Halfling";
export type CoinType = "pp" | "ep" | "gp" | "sp" | "cp";

export interface CharData {
  id: CharId;
  name: string;
  alignment: Alignment;
  characterClass: CharacterClass;
  level: number;
  abilities: Record<AbilityScore, number>;
  // ac: number;
  hp: number;
  hpMax: number;
  money: Record<CoinType, number>;
  xp: ExperiencePoints;
  // TODO equipment
}

export interface BECMIChar extends CharData {}

export type ThresholdTable<T, D> = [T, D][];

export interface CharacterClassData {
  name: CharacterClass;
  primeRequisite: AbilityScore[];
  abilityRequirements?: Partial<Record<AbilityScore, number>>;
  alignmentRequirement?: Alignment[];
  hitDiceSize: DiceSize;
  hpPerLevelFrom10: number;
  maximumLevel: ClassLevel;
  experience: ExperiencePoints[];
  savesTable: ThresholdTable<
    ClassLevel,
    [
      deathRayPoison: number,
      magicWands: number,
      paralysisTurnToStone: number,
      breathAttack: number,
      rodStaffSpell: number,
    ]
  >;
  attackRanks?: ThresholdTable<ExperiencePoints, AttackRank>;
}

export type Dice = [
  count: number,
  size: DiceSize,
  bonus: number,
  multiplier: number,
];

export type Alignment = "L" | "N" | "C";

export type MonsterType =
  | "Normal Animal"
  | "Giant Animal"
  | "Lowlife"
  | "Construct"
  | "Dragon"
  | "Human"
  | "Humanoid"
  | "Monster"
  | "Planar Monster"
  | "Undead";
// Normal Animal: [Giant Animal, Prehistoric Animal]
// Lowlife: [Insect, Arachnid, Fungi, Slime]
// Construct
// Dragon: [Dragon-Kin]
// Humanoid: [Human, Demihuman, Giant Humanoid],
// Monster
// Planar Monster
// Undead

export type TreasureType =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V";

export interface MonsterAttack {
  name: string;
  damage: [type: "weapon", bonus: number, multiplier: number] | Dice;
  extra?: unknown;
}

export interface MonsterStats {
  name: string;
  ac: AC;
  hd: HitDice;
  hdBonus?: number;
  hdAsterisks?: number;
  size: "S" | "M" | "L";
  mv: [feetPerTurn: Feet, feetPerRound: Feet];
  attacks: MonsterAttack[];
  numberAppearing: [dungeon: number | Dice, wilderness: number | Dice];
  save: "NM" | [as: "C" | "F" | "M" | "T" | "D" | "E" | "H", level: ClassLevel];
  morale: number;
  treasure: null | TreasureType | [carried: TreasureType, lair: TreasureType];
  intelligence: number;
  alignment: Alignment;
  xp: number;
  type: MonsterType | MonsterType[];
  terrain: string;
  load?: [fullSpeed: CoinWeight, halfSpeed: CoinWeight];
  bardingMultiplier?: number;
  rarity: "C" | "R" | "VR";
}

export enum ArmorType {
  none = 9,
  leather = 7,
  scale = 6,
  chain = 5,
  banded = 4,
  plate = 3,
  suit = 0,
}

export type AttackRank =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M";
