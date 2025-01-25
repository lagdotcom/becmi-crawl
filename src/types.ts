// https://spin.atomicobject.com/typescript-flexible-nominal-typing/
interface Flavouring<FlavourT> {
  _type?: FlavourT;
}
type Flavour<T, FlavourT> = T & Flavouring<FlavourT>;

export type AC = Flavour<number, "AC">;
export type CharId = Flavour<string, "CharId">;
export type ClassLevel = Flavour<number, "ClassLevel">;
export type CoinWeight = Flavour<number, "CoinWeight">;
export type Feet = Flavour<number, "Feet">;
export type HitDice = Flavour<number, "HitDice">;
export type ModuleId = Flavour<string, "ModuleId">;
export type NodeId = Flavour<string, "NodeId">;
export type StateId = Flavour<string, "StateId">;

export interface BECMILibrary {
  register: (info: ModuleInfo) => BECMIModule;
}

export interface ModuleInfo {
  id: ModuleId;
  name: NodeId;
  author: string;
  partySize: [min: number, max: number];
  levelRange: [min: ClassLevel, max: ClassLevel];

  begin: (e: BECMIEngine) => void;
}

export interface BECMIModule {
  node: (id: NodeId, enter: BECMINode["enter"]) => BECMINode;
  monster: (name: string, override?: MonsterOverride) => any;
  state: <T>(id: StateId, defaultValue: T) => BECMIState<T>;
}

export interface BECMIState<T> {
  id: StateId;
  defaultValue: T;
  get(): T;
  set(value: T): void;
}

export interface BECMINode {
  id: NodeId;
  enter: (e: BECMIEngine, previousNode?: BECMINode) => void;
  state: <T>(id: StateId, defaultValue: T) => BECMIState<T>;
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
  characterClass: CharacterClass;
  level: number;
  abilities: Record<AbilityScore, number>;
  ac: number;
  hp: number;
  hpMax: number;
  money: Record<CoinType, number>;
  xp: number;
  // TODO equipment
}

export interface BECMIChar extends CharData {}

export interface BECMIEngine {
  party: BECMIChar[];

  randomPick: <T>(items: T[]) => T;
  percentage: (chance: number) => boolean;

  goto: (node: BECMINode) => void;
  next: (node: BECMINode) => void;
  paragraph: (value: string) => void;
  text: (value: string) => void;
  listItem: (value: string) => void;

  menu: () => BECMIMenuBuilder;
}

export interface BECMIMenuBuilder {
  option: (value: string, node: BECMINode) => void;
}

export type Dice = [
  count: number,
  size: number,
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

export interface MonsterStats {
  name: string;
  ac: AC;
  hd: HitDice;
  hdBonus?: number;
  hdAsterisks?: number;
  size: "S" | "M" | "L";
  mv: [feetPerTurn: Feet, feetPerRound: Feet];
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

export type MonsterOverride = Partial<MonsterStats> & {
  number?: number | Dice;
  hp?: number[];
};
