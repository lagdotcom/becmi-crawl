import { Dice } from "./types";

export const mkDice = (
  count: number,
  size: number,
  bonus = 0,
  multiplier = 1,
): Dice => [count, size, bonus, multiplier];
