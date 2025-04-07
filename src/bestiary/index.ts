import { animals } from "./animals";
import { humanoids } from "./humanoids";
import { lowlife } from "./lowlife";
import { monsters } from "./monsters";

export const bestiary = Object.fromEntries(
  [...animals, ...humanoids, ...lowlife, ...monsters].map((s) => [s.name, s]),
);
