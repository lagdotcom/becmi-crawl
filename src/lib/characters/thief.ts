import { CharacterClassData, Percentage } from "../../types";

export const Thief: CharacterClassData = {
  name: "Thief",
  primeRequisite: ["dex"],
  hitDiceSize: 4,
  hpPerLevelFrom10: 2,
  maximumLevel: 36,
  // Armor: Leather armor only; shield not permitted.
  // Weapons: Any missile weapon; any one-handed melee weapon.
  // Special Abilities:
  //   at 1st level: Open Locks, Find Traps, Remove Traps, Climb Walls, Move Silently, Hide in Shadows, Pick Pockets, Hear Noise, and Backstab
  //   at 4th level: Read any normal language 80%;
  //   at 10th level: Cast magic-user spells from scrolls (10% chance of backfire).

  experience: [
    0, 1200, 2400, 4800, 9600, 20000, 40000, 80000, 160000, 280000, 400000,
    520000, 640000, 760000, 880000, 1000000, 1120000, 1240000, 1360000, 1480000,
    1600000, 1720000, 1840000, 1960000, 2080000, 2200000, 2320000, 2440000,
    2560000, 2680000, 2800000, 2920000, 3040000, 3160000, 3280000, 3400000,
  ],
  savesTable: [
    [1, [13, 14, 13, 16, 15]],
    [5, [11, 12, 11, 14, 13]],
    [9, [9, 10, 9, 12, 11]],
    [13, [7, 8, 7, 10, 9]],
    [17, [5, 6, 5, 8, 7]],
    [21, [4, 5, 4, 6, 5]],
    [25, [3, 4, 3, 4, 4]],
    [29, [2, 3, 2, 3, 3]],
    [33, [2, 2, 2, 2, 2]],
  ],
};

const specialAbilitiesTable: [
  openLocks: Percentage,
  findTraps: Percentage,
  removeTraps: Percentage,
  climbWalls: Percentage,
  moveSilently: Percentage,
  hideInShadows: Percentage,
  pickPockets: Percentage,
  hearNoise: Percentage,
][] = [
  [15, 10, 10, 87, 20, 10, 20, 30],
  [20, 15, 15, 88, 25, 15, 25, 35],
  [25, 20, 20, 89, 30, 20, 30, 40],
  [30, 25, 25, 90, 35, 24, 35, 45],
  [35, 30, 30, 91, 40, 28, 40, 50],
  [40, 35, 34, 92, 44, 32, 45, 54],
  [45, 40, 38, 93, 48, 35, 50, 58],
  [50, 45, 42, 94, 52, 38, 55, 62],
  [54, 50, 46, 95, 55, 41, 60, 66],
  [58, 54, 50, 96, 58, 44, 65, 70],
  [62, 58, 54, 97, 61, 47, 70, 74],
  [66, 62, 58, 98, 64, 50, 75, 78],
  [69, 66, 61, 99, 66, 53, 80, 81],
  [72, 70, 64, 100, 68, 56, 85, 84],
  [75, 73, 67, 101, 70, 58, 90, 87],
  [78, 76, 70, 102, 72, 60, 95, 90],
  [81, 80, 73, 103, 74, 62, 100, 92],
  [84, 83, 76, 104, 76, 64, 105, 94],
  [86, 86, 79, 105, 78, 66, 110, 96],
  [88, 89, 82, 106, 80, 68, 115, 98],
  [90, 92, 85, 107, 82, 70, 120, 100],
  [92, 94, 88, 108, 84, 72, 125, 102],
  [94, 96, 91, 109, 86, 74, 130, 104],
  [96, 98, 94, 110, 88, 76, 135, 106],
  [98, 99, 97, 111, 89, 78, 140, 108],
  [100, 100, 100, 112, 90, 80, 145, 110],
  [102, 101, 103, 113, 91, 82, 150, 112],
  [104, 102, 106, 114, 92, 84, 155, 114],
  [106, 103, 109, 115, 93, 86, 160, 116],
  [108, 104, 112, 116, 94, 88, 165, 118],
  [110, 105, 115, 117, 95, 90, 170, 120],
  [112, 106, 118, 118, 96, 92, 175, 122],
  [114, 107, 121, 118, 97, 94, 180, 124],
  [116, 108, 124, 119, 98, 96, 185, 126],
  [118, 109, 127, 119, 99, 98, 190, 128],
  [120, 110, 130, 120, 100, 100, 195, 130],
];

// OL: The character may try to use this skill only once per lock. The thief may not try again with that particular lock until he gains another level of experience. Without lockpicks, he may not use this ability.
// FT: He may check only once per trap, and failure prevents the character from finding any trap in or on the object searched.
// RT: He may not roll this ability against a trap unless the trap has been found. The thief may try his ability only once per trap; failure to remove a trap triggers the trap.
// CW: ...if failed, the thief slips at the halfway point and falls. The DM rolls for success once for every 100′ climbed. If the roll is a failure, the thief takes 1-6 (1d6) points of damage per 10′ fallen. Falling during a 10′ climb will inflict 1 point of damage.
// MS/HS: how on earth is this going to work
// PP: If the roll is a simple failure, the thief fails to get his hands on what he's seeking. If the roll is greater than twice what the thief needs to succeed or an 00 in any case, the thief is caught in the act by his intended victim, and possibly others.. While using the skill, subtract 5% per level or HD of victim. (Normal men — men and women who have no adventuring ability at all and do not belong to any adventuring character class - are treated as being 0 level.)

// A stuck or exceptionally difficult lock, carefully hidden trap, slippery wall, or very faint noise may cause a penalty to be applied to the normal chances of successful skill use. The DM could assign the task a penalty of -5 %, -10%, -20%, or higher depending on the difficulty of the task. If, after applying such penalties, the chance of success remains 100% or greater, the DM should adjust it to 99%, allowing a 1% minimum chance of failure in all cases.

// Backstabbing: If a thief can sneak up on a victim, completely unnoticed, the thief may backstab—if he is using a one-handed melee weapon, he may strike at particularly vulnerable points of his target's body. (Though the ability is called "backstabbing," the weapon doesn't have to be a stabbing weapon. A thief can use this ability with a club, for example.)
// When backstabbing, the thief gains a bonus of +4 on the attack roll; if the target is hit, the damage done is twice normal (roll the damage for the weapon, multiply the result by two, and then add any pertinent modifiers).
// If the intended victim sees, hears, or is warned of the thief's approach, the thief's attack is not a backstab; it is an ordinary attack, doing the damage appropriate for the weapon used.
// When no battle is in progress, a backstab attempt may require a Move Silently ability check. The DM will make all the necessary decisions on that matter.

// Read Languages: When the thief reaches 4th level, he gains an 80% chance to read any normal writing or language (including simple codes, dead languages, treasure maps, and so on, but not magical writings). If he tries but fails to read apiece of writing, he must gain at least one experience level before trying to read it again.

// Cast Spells From Magic-User Scrolls: At 10th level, a thief gains the ability to cast magic-user spells from spell scrolls. However, there is always a 10% chance that the spell will backfire, creating an unexpected result, because of the thief's imperfect understanding of magical writings.
// This ability only allows thieves to cast spells from existing magic scrolls, not to write their own.
