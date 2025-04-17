import { ArmorItem, ShieldItem } from "../../types";

const shield: ShieldItem = {
  name: "shield",
  acBonus: -1,
  value: { gp: 10 },
  weight: 100,
  druid: true,
};

export const shields = [shield];

const leatherArmor: ArmorItem = {
  name: "leather armor",
  ac: 7,
  value: { gp: 20 },
  weight: 200,
  druid: true,
  thief: true,
};

const scaleMail: ArmorItem = {
  name: "scale mail",
  ac: 6,
  value: { gp: 30 },
  weight: 300,
};

const chainMail: ArmorItem = {
  name: "chain mail",
  ac: 5,
  value: { gp: 40 },
  weight: 400,
};

const bandedMail: ArmorItem = {
  name: "banded mail",
  ac: 4,
  value: { gp: 50 },
  weight: 450,
};

const plateMail: ArmorItem = {
  name: "plate mail",
  ac: 3,
  value: { gp: 60 },
  weight: 500,
};

const suitArmor: ArmorItem = {
  name: "suit armor",
  ac: 0,
  value: { gp: 250 },
  weight: 750,
  s: `Suit armor is the type of armor associated with the mounted knights of high romance. It encloses the wearer completely in a sheath of steel, with chain-link joints to permit movement. It is often called plate armor (which is different than plate mail), full plate, gothic armor, or jousting armor. However, suit armor is more like the plate armor made during the last days of armor-making. The arrival of gunpowder forced armor-makers to thicken the armor made, which rendered it too heavy and clumsy and impractical for use, leading to the abandonment of making armor. In the D&D game, the presence of magic has had almost the same effect on suit armor.
Advantages: Suit armor alone is armor class 0. It may be used with a shield for armor class -1.
Suit armor reduces the damage inflicted by most area effects (fire, cold, gas, acid), including breath weapons. The base damage is reduced by 1 point per die of damage, and the wearer gains a +2 bonus to the applicable saving throw. The minimum base damage is always at least 1 point per die.
For example, the damage from the breath of a small red dragon (HD 10, 57 hit points) is reduced by 1 point per die of damage (-10) to 47; the fighter in suit armor may make the usual saving throw, but with a +2 bonus, to take half damage (24 points).
Magical suit armor can reduce such damage still further, by 1 point per die of damage for each two pluses of enchantment (rounded down).
If a fighter in suit armor is mounted and has assistance from others, the disadvantages of encumbrance, slow movement, and surprise can be minimized.
Disadvantages: Suit armor is bulky and expensive. Its encumbrance is 750 cn. It must be specially made for one wearer, tailored exactly to fit; the cost is 250 gp. Magical forms are proportionately more valuable, averaging 50% greater value than plate mail of identical enchantment.
Suit armor is awkward in some situations, especially when getting up from a prone position or mounting a steed. If attempted alone, the chance of success is 1 in 6 per round. In late medieval times, the latter problem was solved by the use of a strap tied around the wearer and over a handy limb or bar. The knight was then hoisted into the air and lowered onto the mount. In the D&D game, assume automatic success in getting up if anyone is available to help the wearer.
Suit armor is noisy and slow. Its common creaks and clanks can be heard up to 120 feet away and negate chances for surprise. The wearer's movement rate is 30′ (10′); most fighters prefer to use their suit armor only when fighting from horseback.
An unarmored fighter needs two full turns to dress in suit armor; it takes one full turn to take it off.
Suit armor gives no additional protection against gaze attacks (such as a medusa's) or electricity (such as a blue dragon's lightning breath).
The wearer has a -5 penalty when using any missile device other than a crossbow. If alone, the wearer suffers a -1 penalty to be surprised. (In other words, a fighter in such armor rolling for surprise might roll a 3, indicating no surprise, but the penalty applied will reduce the roll to a 2, resulting in the fighter being surprised.)`,
};

export const armor = [
  leatherArmor,
  scaleMail,
  chainMail,
  bandedMail,
  plateMail,
  suitArmor,
];
