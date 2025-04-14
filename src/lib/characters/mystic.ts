import { mkDice as d } from "../../tools";
import { CharacterClassData, Dice, Feet } from "../../types";

export const Mystic: CharacterClassData = {
  name: "Mystic",
  primeRequisite: ["str", "dex"],
  abilityRequirements: { wis: 13, dex: 13 },
  hitDiceSize: 6,
  hpPerLevelFrom10: 2,
  maximumLevel: 16,
  // Armor: None; shield not permitted. Nor can they ever use protective magical devices (such as rings, cloaks, etc.)
  // Weapons: Any.
  // Special Abilities: AC bonuses, increased movement, and martial arts (see Mystic Special Abilities Table); (at 9th level) Set Spear vs. Charge, Fighter Combat Options; Acrobatics; thief abilities; mystic abilities.

  experience: [
    0, 2000, 4000, 8000, 16000, 32000, 64000, 120000, 240000, 360000, 480000,
    600000, 720000, 840000, 960000, 1080000,
  ],
  savesTable: [
    [1, [12, 13, 14, 15, 16]],
    [4, [10, 11, 12, 13, 14]],
    [7, [8, 9, 10, 11, 12]],
    [10, [6, 7, 8, 9, 10]],
    [13, [6, 6, 7, 8, 9]],
    [16, [5, 6, 6, 7, 8]],
  ],
};

const specialAbilitiesTable: [
  ac: number,
  mv: Feet,
  attacks: number,
  damage: Dice,
  ability?: string,
][] = [
  [9, 120, 1, d(1, 4)],
  [8, 130, 1, d(1, 4, 1), "Awareness"],
  [7, 140, 1, d(1, 6)],
  [6, 150, 1, d(1, 6, 1), "Heal Self"],
  [5, 160, 2, d(1, 8)],
  [4, 170, 2, d(1, 8, 1), "Speak with Animals"],
  [3, 180, 2, d(1, 10)],
  [2, 190, 2, d(1, 12), "Resistance"],
  [1, 200, 3, d(2, 8)],
  [0, 210, 3, d(2, 10), "Speak with Anyone"],
  [-1, 220, 3, d(2, 12)],
  [-2, 240, 3, d(3, 8, 1), "Mind Block"],
  [-3, 260, 4, d(4, 6, 2)],
  [-4, 280, 4, d(5, 6), "Blankout"],
  [-5, 300, 4, d(4, 8)],
  [-6, 320, 4, d(3, 12), "Gentle Touch"],
];

// Awareness: The mystic is only surprised on a roll of 1 (on 1d6).
// Heal Self: The mystic may, once per day, cure himself of 1 point of damage for each experience level he has. He does this simply by concentrating for 1 round.
// Speak with Animals: The mystic may speak with any normal or giant animal as often as desired; animals understand his speech and he understands theirs, though no animal is forced to talk to him.
// Resistance: The mystic takes only half damage (round down) from all spells and breath weapons that inflict damage, or one-quarter damage (round down) if the saving throw is successful. Any attack that does him damage will do a minimum of 1 point of damage, even if rounding indicates 0 points of damage.
// Speak with Anyone: The mystic may speak with any living creature that has a language of any sort, as often as desired. The creature being spoken to does not have to converse with him.
// Mind Block: The mystic is immune to ESP, hold and slow spells, magical charms, quests, and geas spells.
// Blankout: By concentrating for 1 round, the mystic causes his presence to "disappear." No living or undead creature can see him; there is no saving throw. The effect lasts for 1 round per level of the mystic; it is dispelled automatically if he attacks. He may only do this once per day.

// Gentle Touch: Once per day, the mystic may use the Gentle Touch on any one living creature (it requires a normal roll to hit; if he fails to hit, he can try the Gentle Touch again). The mystic must declare he is using the Gentle Touch before he rolls to hit, and must declare which result (explained below) he is seeking. The victim does not get a saving throw, but a victim which has more Hit Dice than the mystic's experience level is not affected.
// The Touch will have one of the following results (the mystic decides and announces which before he rolls to hit): charm, cureall, death, quest, or paralysis. These effects mimic the same effects of the following spells in all respects except duration: charm person, cureall, death spell, quest, and hold person. The effect lasts for 24 hours — except for death, which is a permanent effect.
