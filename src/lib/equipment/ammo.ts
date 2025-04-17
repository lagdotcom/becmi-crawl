import { AmmoItem } from "../../types";

const dart: AmmoItem = {
  name: "dart",
  type: "dart",
  value: { sp: 2 },
  weight: 1 / 5,
};

const arrow: AmmoItem = {
  name: "arrow",
  type: "arrow",
  value: { sp: 2, cp: 5 },
  weight: 1 / 2,
};

const silverTippedArrow: AmmoItem = {
  ...arrow,
  name: "silver-tipped arrow",
  value: { gp: 5 },
};

const quarrel: AmmoItem = {
  name: "quarrel",
  type: "quarrel",
  value: { sp: 3, cp: 3 },
  weight: 1 / 3,
};

const silverTippedQuarrel: AmmoItem = {
  ...quarrel,
  name: "silver-tipped quarrel",
  value: { gp: 5 },
};

const pellet: AmmoItem = {
  name: "pellet",
  type: "pellet",
  value: { cp: 3 },
  weight: 1 / 5,
};

const silverPellet: AmmoItem = {
  ...pellet,
  name: "silver pellet",
  value: { gp: 5 },
};

export const ammo = [
  dart,
  arrow,
  silverTippedArrow,
  quarrel,
  silverTippedQuarrel,
  pellet,
  silverPellet,
];
