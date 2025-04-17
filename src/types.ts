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
export type EnemyId = Flavour<string, "EnemyId">;
export type ExperiencePoints = Flavour<number, "ExperiencePoints">;
export type Feet = Flavour<number, "Feet">;
export type HitDice = Flavour<number, "HitDice">;
export type ItemId = Flavour<string, "ItemId">;
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

export type Money = Record<CoinType, number>;

export interface CharData {
  id: CharId;
  name: string;
  alignment: Alignment;
  characterClass: CharacterClass;
  level: number;
  abilities: Record<AbilityScore, number>;
  hp: number;
  hpMax: number;
  money: Money;
  xp: ExperiencePoints;
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

export type EnemyType =
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

export interface EnemyAttack {
  name: string;
  damage: [type: "weapon", bonus: number, multiplier: number] | Dice;
  extra?: unknown;
}

export type Size = "S" | "M" | "L";

export interface EnemyStats {
  name: string;
  ac: AC;
  hd: HitDice;
  hdBonus?: number;
  hdAsterisks?: number;
  size: Size;
  mv: [feetPerTurn: Feet, feetPerRound: Feet];
  attacks: EnemyAttack[];
  numberAppearing: [dungeon: number | Dice, wilderness: number | Dice];
  save: "NM" | [as: "C" | "F" | "M" | "T" | "D" | "E" | "H", level: ClassLevel];
  morale: number;
  treasure: null | TreasureType | [carried: TreasureType, lair: TreasureType];
  intelligence: number;
  alignment: Alignment;
  xp: number;
  type: EnemyType | EnemyType[];
  terrain: string;
  load?: [fullSpeed: CoinWeight, halfSpeed: CoinWeight];
  bardingMultiplier?: number;
  rarity: "C" | "R" | "VR";

  onCreate?: (me: EnemyData) => void;
}
type EnemyOverrides = Partial<Omit<EnemyStats, "onCreate">>;

export interface EnemyData {
  id: EnemyId;
  base: string;
  hpMax: number;
  hp: number;
  overrides: EnemyOverrides;
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

interface ItemBase {
  name: string;
  value: Partial<Money>;
  weight: CoinWeight;
}

export interface ArmorItem extends ItemBase {
  ac: number;
  druid?: boolean;
  thief?: boolean;
  s?: string;
}
export type ArmorOverrides = Partial<ArmorItem>;

export interface ShieldItem extends ItemBase {
  acBonus: number;
  druid?: boolean;
  thief?: boolean;
}
export type ShieldOverrides = Partial<ShieldItem>;

export type Ranges = [short: Feet, medium: Feet, long: Feet];

export interface WeaponItem extends ItemBase {
  type:
    | "axe"
    | "bow"
    | "bludgeon"
    | "dagger"
    | "pole"
    | "shield"
    | "sword"
    | "other";
  damage?: Dice;
  size: Size;
  a?: readonly [ammoItem: string, count: number];
  c?: boolean;
  m?: Ranges;
  r?: boolean;
  s?: string; // TODO
  t?: Ranges;
  v?: boolean;
  w?: boolean;
  hh?: Dice;
  th?: boolean;
}
// note meanings:
//   a: one load of ammo is included in weight
//      bow = 20 arrows, crossbow = 30 quarrels, sling = 30 stones, blowgun = 5 darts
//      arrow = 1/2cn, quarrel = 1/3cn, stone = 1/5cn, dart = 1/5cn
//   c: ok for clerics/druids (if natural)
//   m: missile only
//   r: thrown, but rarely, only Expert+ can do this
//   s: special features!!!
//   t: hand weapon, can be thrown
//   v: can be set vs. a charge
//   w: magic-users may use this if DM says so
//   hh: can be 1- or 2-handed, does not cause loss of initiative etc.
//   th: only 2-handed. no shield, always lose individual initiative. halfling/small cannot use.
export type WeaponOverrides = Partial<WeaponItem>;
