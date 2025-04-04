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

  return e.goto(a1Alcoves);
});

const a1Alcoves = B1.node("alcoves", (e) => {
  e.paragraph(txt.alcovesTODO, todo);

  // TODO
});

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
