import { mkDice as d } from "../tools";
import { Styling } from "../types";
import * as txt from "./b1/text";

const todo: Styling = { color: "magenta" };
const minorSecret: Styling = { backgroundColor: "#222" };

export const B1 = window.BECMI.register({
  id: "B1",
  name: "In Search of the Unknown",
  author: "Mike Carr",
  partySize: [3, 6],
  levelRange: [1, 3],

  begin: (e) => e.goto(intro1),
});

const intro1 = B1.node("intro1", (e) => {
  e.paragraph(txt.intro1TODO, todo);
  return e.next(intro2);
});

const intro2 = B1.node("intro2", (e) => {
  const shuffled = e.shuffle(txt.intro2.legends);
  const totalKnown = Math.min(
    shuffled.length,
    e.dice(e.party.length, 4, -e.party.length),
  );
  const legends = shuffled.slice(0, totalKnown);

  if (!legends.length) e.paragraph(txt.intro2.no);
  else {
    e.paragraph(txt.intro2.yes);
    for (const legend of legends) e.listItem(legend);
  }

  return e.next(intro3);
});

const intro3 = B1.node("intro3", (e) => {
  e.paragraph(txt.intro3TODO, todo);
  return e.next(entrance);
});

const entrance = B1.node("entrance", (e, p) => {
  if (p !== entranceExamineDoor) {
    e.paragraph(txt.entrance.approach1);
    e.paragraph(txt.entrance.approach2);
  }

  const m = e.menu();
  if (!noticedForcedDoor.get())
    m.option("examine the door", entranceExamineDoor);
  m.option("go through the door", entranceGo);
});
const noticedForcedDoor = entrance.state("forcedDoor", false);

const entranceExamineDoor = B1.node("entrance.examineDoor", (e) => {
  noticedForcedDoor.set(true);

  e.paragraph(txt.entrance.examineDoor);
  return e.goto(entrance);
});

const entranceGo = B1.node("entrance.go", (e) => {
  e.text(txt.entrance.openDoor);

  if (!noticedForcedDoor.get()) {
    if (e.percentage(e.party.length * 10)) {
      noticedForcedDoor.set(true);
      e.text(txt.entrance.noticeWhileOpeningDoor, minorSecret);
    }
  }

  return e.goto(a1);
});

const a1 = B1.node("a1", (e, p) => {
  if (!p?.hasTag("alcoves")) e.paragraph(txt.a1.alcoves.main);

  const m = e.menu();
  m.option("look at the first set of alcoves", a1Empty);
  m.option("look at the second set of alcoves", a1Empty);
  m.option("look at the third set of alcoves", a1Mouths);
  m.option("go up the steps", a1Steps);
});
const a1HeardMouthMessage = a1.state("heardMouthMessage", false);

const a1Empty = B1.node("a1:empty", (e) => {
  e.paragraph(txt.a1.alcoves.empty);
  return e.goto(a1);
}).tag("alcoves");

const a1Mouths = B1.node("a1:mouths", (e) => {
  if (!a1HeardMouthMessage.get()) e.goto(a1MouthMessage);
  else {
    e.text(txt.a1.alcoves.empty);
    e.text(txt.a1.alcoves.emptyMouth);
    return e.goto(a1);
  }
}).tag("alcoves");

const a1MouthMessage = B1.node("a1:mouthMessage", (e, p) => {
  if (p === a1Mouths) e.text(txt.a1.alcoves.mouthInterruptSearch);
  else if (p === a1Steps) e.text(txt.a1.alcoves.mouthInterruptSteps);

  for (const { text, attach } of txt.a1.alcoves.mouths) {
    if (attach) e.text(text);
    else e.textNew(text);
  }

  a1HeardMouthMessage.set(true);
  return e.goto(p === a1Steps ? a1Intersection : a1);
}).tag("alcoves");

const a1Steps = B1.node("a1:steps", (e) => {
  if (!a1HeardMouthMessage.get()) return e.goto(a1MouthMessage);
  return e.goto(a1Intersection);
});

const a1Intersection = B1.node("a1:intersection", (e, p) => {
  if (!p?.hasTag("body")) e.paragraph(txt.a1.intersection.main);

  const m = e.menu();
  m.option("look at the first body", a1Body1);
  m.option("look at the second body", a1Body2);
  // m.option("look at the third body", a1Body3);
  // m.option("look at the four body", a1Body4);
  // m.option("look at the fifth body", a1Body5);
  m.option("move into the corridor to the south", a1);
});

const a1Body1 = B1.node("a1:body1", (e) => {
  e.paragraph(txt.a1.intersection.body1);

  const m = e.menu();
  if (!a1Body1Examined.get())
    m.option("examine the body more closely", a1Body1x);
  m.option("(back)", a1Intersection);
}).tag("body");
const a1Body1x = B1.node("a1:body1x", (e) => {
  a1Body1Examined.set(true);
  e.paragraph(txt.a1.intersection.body1x);
  // TODO belt pouch w/ 5gp

  e.goto(a1Body1);
});
const a1Body1Examined = a1Body1.state("examined", false);

const a1Body2 = B1.node("a1:body2", (e) => {
  e.paragraph(
    a1Body2SwordRemoved.get()
      ? txt.a1.intersection.body2a
      : txt.a1.intersection.body2,
  );

  const m = e.menu();
  if (!a1Body2Examined.get())
    m.option("examine the body more closely", a1Body2x);
  if (!a1Body2SwordRemoved.get()) m.option("remove the sword", a1Body2s);
  m.option("(back)", a1Intersection);
}).tag("body");
const a1Body2s = B1.node("a1:body2s", (e) => {
  a1Body2SwordRemoved.set(true);
  e.paragraph(txt.a1.intersection.body2s);
  // TODO useless sword

  e.goto(a1Body2);
});
const a1Body2x = B1.node("a1:body2x", (e) => {
  a1Body2Examined.set(true);
  e.paragraph(txt.a1.intersection.body2x);
  // TODO purse w/ 2gp, pouch w/ garlic buds

  e.goto(a1Body2);
});
const a1Body2Examined = a1Body2.state("examined", false);
const a1Body2SwordRemoved = a1Body2.state("swordRemoved", false);

// TODO wandering monster (1 in 6) every 3 turns
// TODO three checks per night for wandering monsters
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const wanderingMonsters = [
  B1.monster("orc", {
    number: d(1, 4),
    hp: [6, 4, 3, 1],
    // D 1-6 or by weapon
    mv: [90, 30],
    morale: 8,
  }),

  B1.monster("giant centipede", {
    number: d(1, 2),
    hp: [2, 2],
  }),

  B1.monster("kobold", {
    number: d(1, 6),
    hp: [4, 3, 3, 2, 2, 1],
    // D 1-4 or weapon -1
  }),

  B1.monster("troglodyte", {
    number: d(1, 2),
    hp: [6, 5],
  }),

  B1.monster("giant rat", {
    number: d(1, 4, 1),
    hp: [4, 3, 2, 1, 1],
  }),

  B1.monster("berserker", {
    number: d(1, 2),
    hp: [5, 4],
    // D 1-8 or by weapon
    mv: [90, 30],
  }),
];
