import { mkDice as d, mulMoney } from "../../tools";
import { CoinWeight, Feet, WeaponItem } from "../../types";

const arrowBundle = ["arrow", 20] as const;
const quarrelBundle = ["quarrel", 30] as const;
const pelletBundle = ["pellet", 30] as const;
const dartBundle = ["dart", 5] as const;

const arrowsWeight: CoinWeight = arrowBundle[1] / 2;
const quarrelsWeight: CoinWeight = quarrelBundle[1] / 3;
const pelletsWeight: CoinWeight = pelletBundle[1] / 5;
const dartsWeight: CoinWeight = dartBundle[1] / 5;

const battleAxe: WeaponItem = {
  name: "battle axe",
  type: "axe",
  damage: d(1, 8),
  value: { gp: 7 },
  weight: 60,
  size: "M",
  r: true,
  th: true,
};

const handAxe: WeaponItem = {
  name: "hand axe",
  type: "axe",
  damage: d(1, 6),
  value: { gp: 4 },
  weight: 30,
  size: "S",
  t: [10, 20, 30],
};

const shortBow: WeaponItem = {
  name: "short bow",
  type: "bow",
  damage: d(1, 6),
  value: { gp: 25 },
  weight: 20 - arrowsWeight,
  size: "M",
  a: arrowBundle,
  m: [50, 100, 150],
  th: true,
};

const longBow: WeaponItem = {
  name: "long bow",
  type: "bow",
  damage: d(1, 6),
  value: { gp: 40 },
  weight: 30 - arrowsWeight,
  size: "L",
  a: arrowBundle,
  m: [70, 140, 210],
  th: true,
};

const lightCrossbow: WeaponItem = {
  name: "light crossbow",
  type: "bow",
  damage: d(1, 6),
  value: { gp: 30 },
  weight: 50 - quarrelsWeight,
  size: "M",
  a: quarrelBundle,
  m: [60, 120, 180],
  s: `This weapon is similar to the heavy crossbow, but smaller. It also requires two hands to load, but only one to fire`,
  th: true,
};

const heavyCrossbow: WeaponItem = {
  name: "heavy crossbow",
  type: "bow",
  damage: d(2, 4),
  value: { gp: 50 },
  weight: 80 - quarrelsWeight,
  size: "L",
  a: quarrelBundle,
  m: [80, 160, 240],
  s: `Heavy crossbows are bulky, requiring two hands to use, and are slow to reload. A character with 18 strength can draw back the string with one hand and fire every round, but weaker characters must point the crossbow nose-down on the ground, brace it with one foot, and draw back the string with both hands in order to reload it; they can only fire it once every two rounds.`,
  th: true,
};

const blackjack: WeaponItem = {
  name: "blackjack",
  type: "bludgeon",
  damage: d(1, 2),
  value: { gp: 5 },
  weight: 5,
  size: "S",
  c: true,
  r: true,
  s: `This weapon is a small leather sack, 4″-8″ long, filled with sand or metal shot and with a looped strap attached. It causes little damage (1d2 points) but, if it is used to strike a victim's head or neck, it can possibly stun or cause unconsciousness.
This weapon has no effect on a victim wearing a metal helmet (which is included in any set of plate, banded, chain, or scale mail) or on any unarmored monster of armor class 0 or less (which indicates very tough skin or protective plating).
The DM decides whether or not someone using a blackjack can hit his target's head. The DM might decide, for example, that someone who has sneaked up on a completely unsuspecting target can aim at the target's head with no penalty, or that the character, in combat, can aim at the enemy's head by taking a -4 penalty to the attack roll. Also at the DM's discretion, if the target is so much taller than the attacker that the attacker can't reach his head, then the attack can only inflict normal damage.
If the attack does hit the target's head, consult the Weapon Special Effects Table. The victim must make a saving throw vs. death ray (possibly with a bonus; see the table). If he fails the saving throw, he suffers the additional effects shown on the table, as determined by his Hit Dice. These effects are as follows:
- Knockout: The victim is immediately unconscious and remains helpless for dl00 (d%) rounds.
- Stun: The victim is stunned and will remain stunned until he successfully makes a saving throw vs. death ray. He may try to make a new saving throw each round.
- Delay: The victim is mildly dazed; he loses initiative on the next round.`,
};

const club: WeaponItem = {
  name: "club",
  type: "bludgeon",
  damage: d(1, 4),
  value: { gp: 3 },
  weight: 50,
  size: "M",
  c: true,
  r: true,
};

const throwingHammer: WeaponItem = {
  name: "throwing hammer",
  type: "bludgeon",
  damage: d(1, 4),
  value: { gp: 4 },
  weight: 25,
  size: "M",
  c: true,
  t: [10, 20, 30],
};

const warHammer: WeaponItem = {
  name: "war hammer",
  type: "bludgeon",
  damage: d(1, 6),
  value: { gp: 5 },
  weight: 50,
  size: "M",
  c: true,
  r: true,
};

const mace: WeaponItem = {
  name: "mace",
  type: "bludgeon",
  damage: d(1, 6),
  value: { gp: 5 },
  weight: 30,
  size: "M",
  c: true,
  r: true,
};

const staff: WeaponItem = {
  name: "staff",
  type: "bludgeon",
  damage: d(1, 6),
  value: { gp: 5 },
  weight: 40,
  size: "M",
  c: true,
  r: true,
  w: true,
  th: true,
};

const torch: WeaponItem = {
  name: "torch",
  type: "bludgeon",
  damage: d(1, 4),
  value: { sp: 6 },
  weight: 20,
  size: "M",
  c: true,
  s: `A torch is basically a flaming club. Although lighter than a club, it is on fire so it does the same amount of damage as a club (1d4). If someone uses an unlit torch as a bludgeoning weapon, it does 1d2 points of damage.
If you use the optional Weapon Mastery rules, mastery with a club is also mastery with a torch. However (also from the Weapon Mastery rules), someone unskilled with a torch does not halve damage, but always inflicts 1d4 points (regardless if the torch is lit).`,
  r: true,
};

const dagger: WeaponItem = {
  name: "dagger",
  type: "dagger",
  damage: d(1, 4),
  value: { gp: 3 },
  weight: 10,
  size: "S",
  t: [10, 20, 30],
  w: true,
};

const silverDagger: WeaponItem = {
  ...dagger,
  name: "silver dagger",
  value: { gp: 30 },
  // TODO silver lol
};

const polearmSpecial = `Polearms consist of various weapon blades mounted on long poles. Polearms may be used only by fighters, dwarves, elves, and mystics. Because of a polearm's length, a character with a polearm may attack a foe even when there is another friend or foe between them. Often, polearm wielders stand in the second rank of the combat, striking over the heads of their frontline comrades to hit front-line fighters of the enemy force.
A polearm may be used with the Fighter Combat options. However, the optional disarm rule may only be used where noted with the weapon type.
The polearm user's attack rolls suffer penalties of -3 for each of the following cases:
- The user is a dwarf.
- The wielder is attacking from behind a larger ally.
- An ally in front of the user is using a two-handed weapon (other than a polearm) or any weapon that is swung backward behind the
wielder (e.g., a battle axe, bola, sling, etc.), thus endangering the polearm bearer.
If you are using the Weapon Mastery rules from the next chapter, characters trained in the use of these two-handed weapons can deflect attacks with them.`;

const halberd: WeaponItem = {
  name: "halberd",
  type: "pole",
  damage: d(1, 10),
  value: { gp: 7 },
  weight: 150,
  size: "L",
  s: polearmSpecial,
  th: true,
};

const javelin: WeaponItem = {
  name: "javelin",
  type: "pole",
  damage: d(1, 6),
  value: { gp: 1 },
  weight: 20,
  size: "M",
  t: [30, 60, 90],
};

const lance: WeaponItem = {
  name: "lance",
  type: "pole",
  damage: d(1, 10),
  value: { gp: 10 },
  weight: 180,
  size: "L",
  s: `When in combat on horseback, many fighters use a special long spear called a lance. Fighters, dwarves, and elves can use the Lance Attack maneuver (see Chapter 8). Mystics can use lances, though they do not have the Lance Attack combat maneuver; even when on the back of a charging horse, mystics always thrust with the weapon as though fighting with a spear. Other human classes cannot use a lance effectively.
A character with a lance may still use a shield; however, if you are using the optional Weapon Mastery rules (in the next chapter), a character who is at Basic mastery with the lance cannot yet use a shield. Under the Weapon Mastery rules, a lance can be used to gain a defense bonus, but each round a lance is used to defend, it causes only half damage.
If the wielder of the lance has the Multiple Attacks option, he can indeed make multiple attacks, but not all against the same foe. He must make each attack against a different target, taking them in the course of his lance charge.
A lance used from the back of a flying mount can be used normally. If the wielder needs to release the lance and ties it to his saddle so that it will not drop to the ground, he cannot defend with it.`,
  v: true,
};

const pike: WeaponItem = {
  name: "pike",
  type: "pole",
  damage: d(1, 10),
  value: { gp: 3 },
  weight: 80,
  size: "L",
  s: polearmSpecial,
  v: true,
  th: true,
};

const polearm: WeaponItem = {
  name: "polearm",
  type: "pole",
  damage: d(1, 10),
  value: { gp: 7 },
  weight: 150,
  size: "L",
  s: polearmSpecial,
  th: true,
};

const poleaxe: WeaponItem = {
  name: "poleaxe",
  type: "pole",
  damage: d(1, 10),
  value: { gp: 5 },
  weight: 120,
  size: "L",
  s: polearmSpecial,
  th: true,
};

const spear: WeaponItem = {
  name: "spear",
  type: "pole",
  damage: d(1, 6),
  value: { gp: 3 },
  weight: 30,
  size: "L",
  t: [20, 40, 60],
  v: true,
};

const trident: WeaponItem = {
  name: "trident",
  type: "pole",
  damage: d(1, 6),
  value: { gp: 5 },
  weight: 25,
  size: "M",
  s: `This is a light spear with three barbed prongs on the end, designed for underwater use. Any small creatures (2′ long or less, such as normal fish) hit by a trident become stuck on the spiked prongs. To free themselves, they need to make an ability check vs. Strength to free themselves. They may make one attempt per round; many small creatures have Strengths that do not exceed 1 or 2.
This weapon can be used either one- or two-handed. Used two-handed, it operates similarly to other two-handed weapons (i.e., the wielder cannot use a shield when using the weapon this way). However, a character using this weapon even in its two-handed style, does not lose his initiative roll, and halflings and other small creatures can use this weapon.`,
  t: [10, 20, 30],
};

const shieldWeaponSpecial = `These weapons combine a shield with weapon blades. Though awkward and prone to breaking, a shield weapon can provide a second attack when used with a one# handed weapon. Only fighters, thieves, and demihumans may use these weapons. Monsters rarely use shield weapons.
The larger shield weapons may break during battle. Check for breakage whenever the attacker or the defender rolls the exact attack roll needed. (For example, if a roll of 9 or better is needed to hit and a 9 is rolled on the die, check for breakage.) Each time a breakage occurs, one of the shield weapon's blades becomes unusable.
The chance that a shield weapon will break is 5 or less on 1d10. Magical shield bonuses add to the die roll, and magical weapon bonuses of the foe subtract from it. In addition to magical modifiers, modify the foe's attack roll by -1 per 10 points of maximum damage possible.
For example, a fighter with a [sword shield +3] is attacked by a monster using a two-handed sword. The monster needs a 7 to hit his target (before any modifications), and he rolls a 7 on the die. The wielder of the sword shield must check for breakage.
The shield wielder's base roll is 1d10; on a 5 or less his shield breaks. His roll will have a -1 penalty because his opponent's two-handed sword can do up to 10 points of damage. But he will have a bonus of +3 because his shield is magical. He rolls a 6, which yields 6 - 1 + 3 = 8. His shield doesn't break.
The four types of shield weapons are as follows:
- Horned Shield: A one-foot circular shield that is strapped to the arm rather than held. A single spike projects from its center. This shield is very durable and will not break.
- Knife Shield: A small buckler equipped with one or two short blades protruding from its sides.
- Sword Shield: A medium-size shield with one or two sword or spear blades projecting from the sides (if round) or ends (if oblong).
- Tusked Shield: A large shield with one to four short blades protruding from the sides. It may have a central spike. Due to its size, the tusked shield requires two hands to use and may not be used with an additional weapon or another shield. Characters using this weapon always lose individual initiative to characters not using a two-handed weapon. Halflings and small nonhumans such as goblins cannot use this weapon.
`;

const hornedShield: WeaponItem = {
  name: "horned shield",
  type: "shield",
  damage: d(1, 2),
  value: { gp: 15 },
  weight: 20,
  size: "S",
  s: shieldWeaponSpecial,
};

const knifeShield: WeaponItem = {
  name: "knife shield",
  type: "shield",
  damage: d(1, 4, 1),
  value: { gp: 65 },
  weight: 70,
  size: "S",
  s: shieldWeaponSpecial,
};

const swordShield: WeaponItem = {
  name: "sword shield",
  type: "shield",
  damage: d(1, 4, 2),
  value: { gp: 200 },
  weight: 185,
  size: "M",
  s: shieldWeaponSpecial,
  v: true,
};

const tuskedShield: WeaponItem = {
  name: "tusked shield",
  type: "shield",
  damage: d(1, 4, 1),
  value: { gp: 200 },
  weight: 275,
  size: "L",
  s: shieldWeaponSpecial,
  th: true,
};

const shortSword: WeaponItem = {
  name: "short sword",
  type: "sword",
  damage: d(1, 6),
  value: { gp: 7 },
  weight: 30,
  size: "S",
  r: true,
};

const normalSword: WeaponItem = {
  name: "normal sword",
  type: "sword",
  damage: d(1, 8),
  value: { gp: 10 },
  weight: 60,
  size: "M",
  r: true,
};

const bastardSword: WeaponItem = {
  name: "bastard sword",
  type: "sword",
  damage: d(1, 6, 1),
  value: { gp: 15 },
  weight: 80,
  size: "L",
  r: true,
  hh: d(1, 8, 1),
};

const twoHandedSword: WeaponItem = {
  name: "two-handed sword",
  type: "sword",
  damage: d(1, 10),
  value: { gp: 15 },
  weight: 100,
  size: "L",
  th: true,
};

const blowgunSpecial = `This weapon is a tube, 6″-4′ long. The user places a small dart or thorn into it, aims the tube at a target, and blows air into it - forcing the dart to fly toward the target.
The darts cause no damage themselves. However, the darts are usually treated with poison. A blowgun dart merely scratches the victim, with little penetration; it inflicts no real damage. If hit, the victim must make a saving throw vs. poison or suffer the effects. Depending on the size or level of experience of the victim, he may gain a bonus to the saving throw (see the Weapon Special Effects Table). No undead creature or any creature immune to poison can be harmed by a blowgun.
The use of deadly poison as a weapon is not a good act. Because of its dangers, poison may be declared illegal by local or regional rulers. In this case, Lawful characters do not typically use it. The DM may choose not to allow player characters to use poisons in his campaign. Warn players that, if they want their characters to use blowguns, monsters will have them as well.
Longer blowguns are two-handed weapons; the wielder of the weapon may not use a shield and always loses individual initiative to characters not using a two-handed weapon. Halflings and small nonhumans such as goblins cannot use this weapon.`;

const shortBlowgun: WeaponItem = {
  name: "short blowgun",
  type: "other",
  value: { gp: 3 },
  weight: 6 - dartsWeight,
  size: "S",
  a: dartBundle,
  m: [10, 20, 30],
  s: blowgunSpecial,
  w: true,
};

const blowgun: WeaponItem = {
  name: "blowgun",
  type: "other",
  value: { gp: 6 },
  weight: 15 - dartsWeight,
  size: "M",
  a: dartBundle,
  m: [20, 25, 30],
  s: blowgunSpecial,
  w: true,
  th: true,
};

const bola: WeaponItem = {
  name: "bola",
  type: "other",
  damage: d(1, 2),
  value: { gp: 5 },
  weight: 5,
  size: "M",
  s: `This weapon is a cord with weighted balls on the ends. It is whirled around and thrown at a victim. It causes very little damage itself (1d2 points), but may entangle, slow, or delay the victim.
If the attack roll is a 20 (not counting any modifiers), the victim must make a saving throw vs. death ray or be immediately paralyzed; he will die in 1d6+2 (3-8) rounds from strangling unless rescued. If freed, the victim remains effectively paralyzed for 2d6 (2-12) rounds. Creatures that do not breathe (such as constructs) are immune to this effect.
If the attack roll is successful but not a 20, the victim must make a saving throw vs. death ray, possibly with a bonus (see the Weapon Special Effects Table). If the saving throw is successful, the attack has no effect except damage. If the victim fails the saving throw, the result varies by the victim's experience level or size (see the Weapon Special Effects Table).
The victim may try to make a new saving throw during the hand-to-hand combat phase of each round until one is successful; this indicates that the victim has removed the bola. If another character tries to remove the bola that has struck a victim, the victim rolls his own saving throw vs. death ray, with a +2 bonus. When the victim makes the saving throw, the bola is removed. The victim may spend 1 round destroying the bola if he has an edged weapon and chooses to destroy it. Otherwise, the bola is undamaged; he can hold on to it or drop it.
Possible bola effects, as listed on the Weapon Special Effects Table, are as follows:
- Entangle: The victim cannot attack, cast spells, or move until his saving throw is successfully made.
- Slow: The victim is slowed, moving and attacking at half his normal rate; he cannot cast spells.
- Delay: The victim automatically loses individual initiative for the next round.
This weapon can only affect solid creatures. Wraiths, spectres, ethereal creatures, and monsters made of water (such as a water elemental) cannot be affected.
Bolas are awkward to carry and may become tangled. For each additional bola carried, the encumbrance of the bolas triples: 1 bola = 5 cn, 2 bolas = 15 cn, 3 bolas = 45 cn, etc.`,
  t: [20, 40, 60],
};

const cestus: WeaponItem = {
  name: "cestus",
  type: "other",
  damage: d(1, 3),
  value: { gp: 5 },
  weight: 10,
  size: "S",
  s: `The cestus (plural: cesti) is a sort of glove or thong wrapped around the hand; it has rough, cutting edges on the back, so that a punching attack will inflict more damage on an opponent. If the campaign uses the optional rules for two-weapons use, a character does not suffer the -4 penalty for the cestus worn on his offhand.`,
};

const holyWater: WeaponItem = {
  name: "holy water",
  type: "other",
  damage: d(1, 8),
  value: { gp: 25 },
  weight: 1,
  size: "S",
  c: true,
  s: `Holy water only does the listed damage to undead monsters; all other characters and monsters are unaffected by it (except for being dampened).
If you are using the optional Weapon Mastery rules (in the next chapter), all characters have Basic mastery level when using holy water.`,
  t: [10, 30, 50],
  w: true,
};

const makeNet = (x: Feet, y: Feet): WeaponItem => ({
  name: `net (${x}′ x ${y}′)`,
  type: "other",
  value: mulMoney({ sp: 1 }, x * y),
  weight: x * y,
  size: x * y > 36 ? "L" : "M",
  s: `A net is an open mesh of rope or cord. Small nets (up to 10′ x 10′) are commonly used in hunting and adventuring and can be used as either a hand-to-hand or thrown weapon. The net's encumbrance varies by the size.
This weapon is commonly available in most campaign worlds. Its cost is low, but it is easily damaged. The net is one of humankind's first tools, having been invented in prehistoric times, and it is used by most humanoid monsters for both hunting and defense.
A net can only affect creatures made of solid material. Wraiths, spectres, ethereal creatures, and monsters made of water (such as water elementals) cannot be affected. A net inflicts no damage on the victim, but may entangle, slow, or delay the victim. The wielder makes a normal roll to hit his target; if he does, the target must make a saving throw vs. death ray, possibly with a bonus (see the Weapon Special Effects Table).
If the saving throw succeeds, the net does not affect the target; it drops off him without impairing him at all. If the victim fails his saving throw, the result varies by the victim's experience level or size.
Once a target is trapped in a net, he may make a new saving throw during the hand-to-hand combat phase of each round until one is successful; a successful roll indicates that the net has been pulled off and thrown aside. If he has a dagger (but not a longer weapon or a nonbladed weapon) in his hand when he is hit with the net, he has a +4 to his saving throw; success means that he has cut his way out of the net, thus destroying it.
Magical nets are rare. The few that exist cannot be damaged except by fire or acid; daggers will not cut through them. An entangled victim can only remove the net, not damage it.
The effects listed on the Weapon Special Effects Table are as follows:
- Entangle: The victim cannot attack, cast spells, or move until a saving throw is successful.
- Slow: The victim is slowed, moving and attacking at half his normal rate. He cannot cast spells.
- Delay: The victim automatically loses initiative for the next round.
A net can easily be damaged by any edged weapon (or claw or bite), but it can be repaired if rope or cord is available, which requires 1d3 turns of undisturbed repair work. A damaged net is useless.
Nets come in a variety of sizes; if the target is too large for the net, he will gain bonuses to his saving throw to avoid the effects. Using the Nets Table, determine how many sizes the victim is larger than the net. For each size greater, the victim gains a +4 bonus. A roll of 1 is always a failure unless the bonus is +20 or greater.
Nets 6′ x 6′ or smaller may be used one-handed. Larger nets require two hands and suffer the same penalties as other two-handed weapons. The wielder may not use a shield, always loses individual initiative to characters not using a two-handed weapon; and halflings and small nonhumans (such as goblins) cannot use nets larger than 6′ x 6′.`,
  t: [10, 20, 30],
  th: x * y > 36,
  w: true,
});

const burningOil: WeaponItem = {
  name: "burning oil",
  type: "other",
  damage: d(1, 8),
  value: { gp: 2 },
  weight: 10,
  size: "S",
  c: true,
  s: `This type of weapon usually consists of cooking or lamp oil poured into a breakable container (such as a bottle, gourd, or glass lamp), with a fuse or wick attached. In combat, the wielder lights the fuse or wick and throws it at his target (lighting and throwing only takes one round if the character has another lit object handy). If the container hits the target, it bursts, splashes the target with the oil, and ignites the oil on target.
Burning oil causes 1d8 points of damage each round a target is in the fire. Oil that has been lit and thrown will burn for 2 rounds. If you are using the optional Weapon Mastery rules (next chapter), all characters are considered to have Basic mastery level with thrown containers of burning oil.`,
  t: [10, 30, 50],
  w: true,
};

// use this for any thrown object, essentially
const thrownRock: WeaponItem = {
  name: "thrown rock",
  type: "other",
  damage: d(1, 3),
  value: { sp: 1 },
  weight: 10,
  size: "S",
  c: true,
  s: `If you are using the optional Weapon Mastery rules, all characters are considered to have Basic mastery level with thrown rocks.`,
  t: [10, 30, 50],
  w: true,
};

const sling: WeaponItem = {
  name: "sling",
  type: "other",
  damage: d(1, 4),
  value: { gp: 2 },
  weight: 20 - pelletsWeight,
  size: "S",
  c: true,
  m: [40, 80, 160],
  w: true,
};

const makeWhip = (length: Feet): WeaponItem => ({
  name: `whip (${length}′)`,
  type: "other",
  damage: d(1, 2),
  value: { gp: 1 * length },
  weight: 10 * length,
  size: "M",
  s: `This weapon is a long, braided leather strap with a handle. It may be from 5′-30′ long. It is a hand-to-hand weapon and may be used to either cause damage (1d2 points) or to entangle. Before each combat round, the user must declare which option is being used. Whichever he uses, he makes a normal attack roll.
If he scores a hit, the whip either inflicts 1d2 points of damage or (if entangling is attempted) forces the victim to make a saving throw vs. death ray, possibly with a bonus. (See the Weapon Special Effects Table for his saving throw bonus and the result of the attack.) If the victim fails his saving throw, he may be entangled, slowed, or delayed.
The effects listed on the Weapon Special Effects Table are as follows:
- Entangle: The victim cannot attack, cast spells, or move until a saving throw is successful.
- Slow: The victim is slowed, moving and attacking at half his normal rate. He cannot cast spells.
- Delay: The victim automatically loses initiative for the next round.
This weapon is not very useful except as a tactical device. It is most often used by a thief or other character who wants to help a front-line fighter somehow while not actually engaging in melee.
A whip can only entangle creatures made of solid material. Wraiths, spectres, ethereal creatures, and monsters made of water (such as water elementals) cannot be entangled. They will, however, suffer the normal damage caused by a whip. (A normal whip will not hit a monster that can only be hit by magical weapons, of course; that would require a magical whip.)`,
  w: true,
});

export const weapons = [
  battleAxe,
  handAxe,
  shortBow,
  longBow,
  lightCrossbow,
  heavyCrossbow,
  blackjack,
  club,
  throwingHammer,
  warHammer,
  mace,
  staff,
  torch,
  dagger,
  silverDagger,
  halberd,
  javelin,
  lance,
  pike,
  polearm,
  poleaxe,
  spear,
  trident,
  hornedShield,
  knifeShield,
  swordShield,
  tuskedShield,
  shortSword,
  normalSword,
  bastardSword,
  twoHandedSword,
  shortBlowgun,
  blowgun,
  bola,
  cestus,
  holyWater,
  makeNet(2, 2),
  makeNet(4, 4),
  makeNet(6, 6),
  makeNet(9, 9),
  makeNet(12, 12),
  makeNet(16, 16),
  makeNet(25, 25),
  burningOil,
  thrownRock,
  sling,
  makeWhip(5),
];
