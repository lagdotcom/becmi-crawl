import { nanoid } from "nanoid";

import { getAdjustment, pcClassData, weaponLibrary } from "../lib";
import { Item } from "../state/items";
import { randomPick, rollHD } from "../tools";
import { BECMIChar, CharacterClass, CharData, CharId } from "../types";

type SamplePC = Pick<CharData, "name" | "characterClass" | "abilities">;

const mkSample = (
  characterClass: CharacterClass,
  name: string,
  title: string,
  str: number,
  int: number,
  wis: number,
  con: number,
  dex: number,
  cha: number,
): SamplePC => ({
  characterClass,
  name,
  abilities: { str, int, wis, dex, con, cha },
});

const clerics = [
  mkSample("Cleric", "Farned", "of the Great Church", 7, 10, 14, 9, 14, 9),
  mkSample(
    "Cleric",
    "Dohram",
    "Servant of Saint Carmichael",
    10,
    10,
    14,
    10,
    11,
    12,
  ),
  mkSample("Cleric", "Steve", "the Mystical One", 12, 10, 15, 15, 8, 14),
  mkSample("Cleric", "Mulgar", "the Merciful", 10, 10, 18, 8, 12, 17),
  mkSample("Cleric", "Seeful", "the Unforgiving", 6, 8, 12, 12, 11, 10),
  mkSample("Cleric", "Philgo", "", 9, 10, 13, 9, 7, 12),
  mkSample(
    "Cleric",
    "Tassit",
    "Servant of Saint Cuthbert",
    11,
    9,
    12,
    10,
    7,
    11,
  ),
  mkSample("Cleric", "Wilberd", "the Silent", 13, 8, 17, 12, 9, 10),
  mkSample("Cleric", "Kracky", "the Hooded One", 8, 14, 16, 8, 8, 12),
  mkSample("Cleric", "Grampal", "of the Secret Church", 12, 11, 12, 10, 9, 10),
  mkSample("Cleric", "Nupo", "Servant of The Bringer", 10, 7, 15, 17, 10, 8),
  mkSample("Cleric", "Eggo", "of the Holy Brotherhood", 7, 10, 13, 8, 9, 11),
];

const clericWeapons = ["club", "war hammer", "mace"];
const clericArmor = [
  {},
  { armor: "leather armor" },
  { armor: "leather armor" },
  { armor: "leather armor", shield: "shield" },
  { armor: "chain mail" },
  { armor: "chain mail", shield: "shield" },
];

const fighters = [
  mkSample("Fighter", "Brandon", "", 14, 8, 11, 13, 9, 12),
  mkSample("Fighter", "Evro", "", 14, 13, 7, 12, 11, 9),
  mkSample("Fighter", "Glendor", "the Fourth", 17, 10, 9, 14, 9, 14),
  mkSample("Dwarf", "Zeffan", "", 14, 11, 8, 8, 14, 7),
  mkSample("Fighter", "Alho", "Rengate", 12, 10, 9, 11, 12, 12),
  mkSample("Dwarf", "Krago", "of the Mountains", 18, 9, 15, 16, 9, 14),
  mkSample("Fighter", "Mohag", "the Wanderer", 13, 12, 9, 10, 6, 10),
  mkSample("Fighter", "Norrin", "the Barbarian", 15, 8, 10, 14, 9, 9),
  mkSample("Halfling", "Lefto", "", 11, 10, 11, 18, 8, 10),
  mkSample("Fighter", "Webberan", "of the Great North", 16, 10, 13, 10, 7, 7),
  mkSample("Halfling", "Sho-Rembo", "", 9, 11, 9, 18, 9, 15),
];

const fighterWeapons = [
  ["hand axe", "dagger"],
  ["normal sword", "dagger"],
  ["battle axe"],
  ["mace"],
  ["normal sword"],
  ["normal sword"],
  ["bastard sword"],
  ["two-handed sword"],
  ["halberd"],
  ["poleaxe"],
  ["pike"],
  ["short bow"],
];

const fighterArmor = [
  { armor: "leather armor" },
  { armor: "leather armor", shield: "shield" },
  { armor: "scale mail" },
  { armor: "scale mail" },
  { armor: "scale mail", shield: "shield" },
  { armor: "scale mail", shield: "shield" },
  { armor: "chain mail" },
  { armor: "chain mail" },
  { armor: "chain mail", shield: "shield" },
  { armor: "chain mail", shield: "shield" },
  { armor: "banded mail" },
  { armor: "banded mail", shield: "shield" },
];

const magicUsers = [
  mkSample("Elf", "Presto", "", 9, 17, 11, 14, 11, 14),
  mkSample("Elf", "Mezlo", "", 11, 14, 8, 9, 12, 13),
  mkSample("Magic User", "Nickar", "", 11, 15, 8, 12, 5, 13),
  mkSample("Magic User", "Shobaffum", "", 7, 13, 9, 13, 11, 10),
  mkSample("Magic User", "Yor", "", 11, 14, 8, 12, 5, 13),
  mkSample("Magic User", "Ralt", "Gaither", 11, 18, 7, 9, 14, 10),
  mkSample("Elf", "Fencig", "", 8, 17, 10, 5, 11, 9),
  mkSample("Magic User", "Glom", "the Mighty", 12, 15, 15, 7, 10, 11),
  mkSample("Magic User", "Trebbelos", "Boy Magician", 9, 16, 9, 7, 12, 13),
  mkSample("Magic User", "Beska", "Miltar", 10, 13, 12, 15, 8, 14),
  mkSample("Elf", "Lappoy", "the Unexpected", 11, 14, 9, 10, 7, 9),
  mkSample("Magic User", "Surfal", "", 12, 14, 11, 8, 12, 5),
];

const magicUserWeapons = ["staff", "dagger"];

const thieves = [
  mkSample("Thief", "Luven", "Lightfinger", 13, 14, 9, 12, 16, 13),
  mkSample("Thief", "Treddo", "", 10, 9, 7, 11, 17, 14),
  mkSample("Thief", "Bozomus", "", 5, 9, 12, 6, 13, 12),
  mkSample("Thief", "Estra", "Zo", 12, 12, 11, 7, 16, 12),
  mkSample("Thief", "Laggamundo", "", 11, 10, 9, 13, 13, 6),
  mkSample("Thief", "Feggener", "the Quick", 10, 9, 7, 11, 17, 14),
  mkSample("Thief", "Mezron", "", 5, 9, 12, 6, 13, 12),
  mkSample("Thief", "Drebb", "", 7, 12, 10, 11, 12, 11),
  mkSample("Thief", "Postue", "", 10, 8, 7, 10, 18, 12),
  mkSample("Thief", "Harg", "of the City Afar", 9, 13, 10, 6, 15, 8),
  mkSample("Thief", "Afton", "Borr", 11, 11, 8, 10, 13, 9),
  mkSample("Thief", "Sporragha", "", 10, 7, 11, 14, 12, 18),
];

const classes = [
  "Fighter",
  "Fighter",
  "Fighter",
  "Cleric",
  "Cleric",
  "Thief",
  "Thief",
  "Magic User",
  "Magic User",
] as const;

function makePC(sample: SamplePC): BECMIChar {
  const cd = pcClassData[sample.characterClass];
  const hp = rollHD(cd.hitDiceSize, getAdjustment(sample.abilities.con));

  return {
    ...sample,
    abilities: { ...sample.abilities },
    id: `B1_${sample.name}`,
    alignment: randomPick(["L", "N"]),
    level: 1,
    xp: 0,
    hp,
    hpMax: hp,
    money: { cp: 0, sp: 0, gp: 0, ep: 0, pp: 0 },
  };
}

function makeItem(
  pc: CharId,
  base: string,
  type: "armor" | "shield" | "weapon",
  equipped = true,
  qty = 1,
): Item {
  return {
    base,
    id: `${base}_${nanoid()}`,
    type,
    overrides: {},
    location: "pc",
    who: pc,
    equipped,
    identified: true,
    qty,
  };
}

function getRandomPC() {
  const inventory: Item[] = [];

  switch (randomPick(classes)) {
    case "Fighter": {
      const pc = makePC(randomPick(fighters));

      let uses2h = false;
      const weapons = randomPick(fighterWeapons);
      for (const name of weapons) {
        inventory.push(
          makeItem(pc.id, name, "weapon", inventory.length === 0, 1),
        );

        const stats = weaponLibrary[name];
        if (stats.th) uses2h = true;
      }

      const { armor, shield } = randomPick(fighterArmor);
      if (armor) inventory.push(makeItem(pc.id, armor, "armor"));
      if (shield && !uses2h) inventory.push(makeItem(pc.id, shield, "shield"));

      return { pc, inventory };
    }

    case "Cleric": {
      const pc = makePC(randomPick(clerics));

      const weapon = randomPick(clericWeapons);
      inventory.push(makeItem(pc.id, weapon, "weapon"));

      const { armor, shield } = randomPick(clericArmor);
      if (armor) inventory.push(makeItem(pc.id, armor, "armor"));
      if (shield) inventory.push(makeItem(pc.id, shield, "shield"));

      return { pc, inventory };
    }

    case "Magic User": {
      const pc = makePC(randomPick(magicUsers));

      const weapon = randomPick(magicUserWeapons);
      inventory.push(makeItem(pc.id, weapon, "weapon"));

      // TODO random spells
      return { pc, inventory };
    }

    case "Thief": {
      const pc = makePC(randomPick(thieves));

      inventory.push(makeItem(pc.id, "dagger", "weapon"));
      inventory.push(makeItem(pc.id, "leather armor", "armor"));

      return { pc, inventory };
    }
  }
}

export function generateParty(size: number) {
  const party: CharData[] = [];
  const items: Item[] = [];

  while (party.length < size) {
    const { pc, inventory } = getRandomPC();
    if (party.find((o) => o.name === pc.name)) continue;

    party.push(pc);
    items.push(...inventory);
  }

  return { party, items };
}
