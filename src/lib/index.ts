import getByThreshold, { getByThresholdLE } from "../tools/getByThreshold";
import {
  AbilityScore,
  AttackRank,
  BECMIChar,
  CharacterClass,
  CharacterClassData,
  ClassLevel,
  EnemyStats,
  HitDice,
  Percentage,
  ThresholdTable,
} from "../types";
import { animals } from "./bestiary/animals";
import { humanoids } from "./bestiary/humanoids";
import { lowlife } from "./bestiary/lowlife";
import { monsters } from "./bestiary/monsters";
import { Cleric } from "./characters/cleric";
import { Druid } from "./characters/druid";
import { Dwarf } from "./characters/dwarf";
import { Elf } from "./characters/elf";
import { Fighter } from "./characters/fighter";
import { Halfling } from "./characters/halfling";
import { MagicUser } from "./characters/magicUser";
import { Mystic } from "./characters/mystic";
import {
  saves as normalManSaves,
  thac0 as normalManThac0,
} from "./characters/normalMan";
import { Thief } from "./characters/thief";
import { armor, shields } from "./equipment/armor";
import { weapons } from "./equipment/weapons";

export const bestiary = Object.fromEntries(
  [...animals, ...humanoids, ...lowlife, ...monsters].map((s) => [s.name, s]),
);

export const pcClassData: Record<CharacterClass, CharacterClassData> = {
  Cleric,
  Druid,
  Dwarf,
  Elf,
  Fighter,
  Halfling,
  "Magic User": MagicUser,
  Mystic,
  Thief,
};

export const armorLibrary = Object.fromEntries(armor.map((i) => [i.name, i]));

export const shieldLibrary = Object.fromEntries(
  shields.map((i) => [i.name, i]),
);

export const weaponLibrary = Object.fromEntries(
  weapons.map((i) => [i.name, i]),
);

export function getPCSaves(pc: BECMIChar) {
  return getByThreshold(pc.level, pcClassData[pc.characterClass].savesTable);
}

const pcClassByShortCode: Record<string, CharacterClass> = {
  C: "Cleric",
  F: "Fighter",
  M: "Magic User",
  T: "Thief",
  D: "Dwarf",
  E: "Elf",
  H: "Halfling",
};
export function getMonsterSaves(m: EnemyStats["save"]) {
  if (m === "NM") return normalManSaves;

  const [as, level] = m;
  return getByThreshold(level, pcClassData[pcClassByShortCode[as]].savesTable);
}

export function getAdjustment(score: number) {
  if (score <= 3) return -3;
  else if (score <= 5) return -2;
  else if (score <= 8) return -1;
  else if (score <= 12) return 0;
  else if (score <= 15) return 1;
  else if (score <= 17) return 2;
  return 3;
}

export function getCharismaAdjustment(
  score: number,
): [reactionAdjustment: number, maxRetainers: number, retainerMorale: number] {
  const adjustment = getAdjustment(score);
  return [adjustment, 4 + adjustment, 7 + adjustment];
}

function getNormalExperienceBonus(
  pc: BECMIChar,
  ability: AbilityScore,
  bonuses: [number, number, number, number, number],
) {
  const score = pc.abilities[ability];
  if (score <= 5) return bonuses[0];
  else if (score <= 8) return bonuses[1];
  else if (score <= 12) return bonuses[2];
  else if (score <= 15) return bonuses[3];
  return bonuses[4];
}

export function getExperienceBonus(pc: BECMIChar): Percentage {
  switch (pc.characterClass) {
    case "Cleric":
    case "Druid":
      return getNormalExperienceBonus(pc, "wis", [-20, -10, 0, 5, 10]);

    case "Dwarf":
    case "Fighter":
      return getNormalExperienceBonus(pc, "str", [-20, -10, 0, 5, 10]);
    case "Mystic":
      return getNormalExperienceBonus(pc, "str", [-10, -5, 0, 5, 10]);

    case "Magic User":
      return getNormalExperienceBonus(pc, "int", [-20, -10, 0, 5, 10]);

    case "Thief":
      return getNormalExperienceBonus(pc, "dex", [-20, -10, 0, 5, 10]);

    case "Elf":
      if (pc.abilities.str < 13) return 0;
      if (pc.abilities.int < 13) return 0;
      else if (pc.abilities.int < 16) return 5;
      return 10;

    case "Halfling":
      if (pc.abilities.str < 13) {
        if (pc.abilities.dex < 13) return 0;
        return 5;
      }
      if (pc.abilities.dex < 13) return 5;
      return 10;
  }
}

const muThac0: ThresholdTable<ClassLevel, number> = [
  [1, 19],
  [6, 17],
  [11, 15],
  [16, 13],
  [21, 11],
  [26, 9],
  [31, 7],
  [36, 5],
];

const ctdThac0: ThresholdTable<ClassLevel, number> = [
  [1, 19],
  [5, 17],
  [9, 15],
  [13, 13],
  [17, 11],
  [21, 9],
  [25, 7],
  [29, 5],
  [33, 3],
  [36, 1.8],
];

const fThac0: ThresholdTable<ClassLevel, number> = [
  [1, 19],
  [4, 17],
  [7, 15],
  [10, 13],
  [13, 11],
  [16, 9],
  [19, 7],
  [22, 5],
  [25, 3],
  [28, 1.8],
  [31, 1.4],
  [34, 1],
];

const dhThac0: Record<AttackRank, number> = {
  A: 15,
  B: 14,
  C: 13,
  D: 12,
  E: 11,
  F: 10,
  G: 9,
  H: 8,
  I: 7,
  J: 6,
  K: 5,
  L: 4,
  M: 3,
};

function getThac0(
  className: CharacterClass | "Normal Man",
  level: number,
  xp: number,
) {
  switch (className) {
    case "Normal Man":
      return normalManThac0;

    case "Magic User":
      return getByThreshold(level, muThac0);

    case "Cleric":
    case "Druid":
    case "Thief":
      return getByThreshold(level, ctdThac0);

    case "Fighter":
    case "Mystic":
      return getByThreshold(level, fThac0);

    case "Dwarf":
    case "Elf":
    case "Halfling": {
      const cd = pcClassData[className];
      if (level < cd.maximumLevel) return getByThreshold(level, fThac0);

      if (!cd.attackRanks)
        throw new Error(`${cd.name} has no attack rank table`);
      const rank = getByThreshold(xp, cd.attackRanks);
      return dhThac0[rank];
    }
  }
}

class Fifths {
  whole: number;
  fifths: number;

  constructor(value: number) {
    this.whole = Math.floor(value);
    this.fifths = 0;

    let diff = value - this.whole;
    while (diff > 0.19) {
      diff -= 0.2;
      this.fifths++;
    }
  }

  get value() {
    return this.whole + this.fifths * 0.2;
  }

  increment() {
    this.whole++;
  }

  decrement() {
    this.whole--;
  }

  incFifth() {
    this.fifths++;
    while (this.fifths >= 5) {
      this.fifths -= 5;
      this.whole++;
    }
  }

  decFifth() {
    this.fifths--;
    while (this.fifths < 0) {
      this.fifths += 5;
      this.whole--;
    }
  }
}

function calculateHitRoll(
  thac0: number,
  targetAC: number,
): [toHit: number, extraDamage: number] {
  const need = new Fifths(thac0);
  let hitsAC = 0;

  while (hitsAC > targetAC) {
    hitsAC--;

    // TODO generalise these patterns
    if (need.value >= 1 && need.value < 2) need.incFifth();
    else if (need.value >= 19 && need.value < 20) need.incFifth();
    else if (need.value >= 29 && need.value < 30) need.incFifth();
    else need.increment();
  }
  while (hitsAC < targetAC) {
    hitsAC++;

    if (need.value > 19 && need.value <= 20) need.decFifth();
    else if (need.value > 29 && need.value <= 30) need.decFifth();
    else if (need.value > 1 && need.value <= 2) need.decFifth();
    else if (need.value > -11 && need.value <= -10) need.decFifth();
    else need.decrement();
  }

  const rounded = Math.ceil(need.value);
  const extraDamage = rounded <= 0 ? -rounded : NaN;
  const toHit = Math.max(0, rounded);
  return [toHit, extraDamage];
}

export function getAttackRollByClass(
  cl: CharacterClass | "Normal Man",
  level: number,
  experience: number,
  targetAC: number,
) {
  return calculateHitRoll(getThac0(cl, level, experience), targetAC);
}

export function getPCAttackRoll(pc: BECMIChar, targetAC: number) {
  return getAttackRollByClass(pc.characterClass, pc.level, pc.xp, targetAC);
}

const monsterThac0: ThresholdTable<HitDice, number> = [
  [1, 19],
  [2, 18],
  [3, 17],
  [4, 16],
  [5, 15],
  [6, 14],
  [7, 13],
  [8, 12],
  [9, 11],
  [11, 10],
  [13, 9],
  [15, 8],
  [17, 7],
  [19, 6],
  [21, 5],
  [23, 4],
  [25, 3],
  [27, 2],
  [29, 1.8],
  [31, 1.6],
  [33, 1.4],
  [35, 1.2],
  [Infinity, 1],
];
export function getAttackRollByHD(
  hd: number,
  hdBonus: number,
  targetAC: number,
) {
  const hitDice = hdBonus ? hd + 0.5 : hd < 1 ? 1 : hd;
  return calculateHitRoll(getByThresholdLE(hitDice, monsterThac0), targetAC);
}

export function getEnemyAttackRoll(m: EnemyStats, targetAC: number) {
  return getAttackRollByHD(m.hd, m.hdBonus ?? 0, targetAC);
}
