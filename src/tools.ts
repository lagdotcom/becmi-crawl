import { Dice, DiceSize, Percentage } from "./types";

export const mkDice = (
  count: number,
  size: DiceSize,
  bonus = 0,
  multiplier = 1,
): Dice => [count, size, bonus, multiplier];

export function dice(count: number, size: DiceSize, bonus = 0) {
  let total = 0;
  for (let i = 0; i < count; i++) total += Math.ceil(Math.random() * size);
  return total + bonus;
}

export function percentage(chance: Percentage) {
  return Math.random() < chance / 100;
}

export function randomPick<const T>(items: readonly T[]) {
  const index = Math.random() * items.length;
  return items[Math.floor(index)];
}

export function shuffle<const T>(source: T[]) {
  const items = Array<T>(source.length);

  for (let i = 0; i < source.length; i++) {
    const j = Math.floor(Math.random() * i);
    items[i] = source[i];
    items[i] = items[j];
    items[j] = source[i];
  }

  return items;
}

export function rollHD(size: DiceSize, bonus = 0) {
  return Math.max(1, dice(1, size, bonus));
}
