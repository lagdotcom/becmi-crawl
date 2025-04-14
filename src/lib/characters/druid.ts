import { CharacterClassData } from "../../types";
import { Cleric } from "./cleric";

export const Druid: CharacterClassData = {
  ...Cleric,
  name: "Druid",
  alignmentRequirement: ["N"],
  // Armor: Leather armor; shield permitted if made only of wood and leather.
  // Weapons: Any non-edged/non-piercing weapon made with no metal.
  // Special Abilities: Spells (both druidic and clerical).
};

// Druid Spells: Druids can cast any spells that clerics can (except those which affect good or evil). Druids also have access to a special list of druid spells, which normal clerics cannot learn or cast. The druid is not able to cast more spells per day than a cleric, but he can use spells from both cleric and druid spell lists
