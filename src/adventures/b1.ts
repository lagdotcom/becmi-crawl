import { mkDice as d } from "../tools";
import * as txt from "./b1/text";

export const B1 = window.BECMI.register({
  id: "B1",
  name: "In Search of the Unknown",
  author: "Mike Carr",
  partySize: [3, 6],
  levelRange: [1, 3],

  begin: (e) => e.goto(intro1),
});

const intro1 = B1.node("intro1", (e) => {
  // TODO
  e.paragraph(txt.intro1);
  return e.next(intro2);
});

const intro2 = B1.node("intro2", (e) => {
  const legends = new Set<string>();

  // NOTE this is different; the module says to roll again if duplicates are rolled
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const _ of e.party) {
    const known = e.randomPick([1, 2, 3, 0]);
    for (let i = 0; i < known; i++)
      legends.add(e.randomPick(txt.intro2.legends));
  }

  if (!legends.size) e.paragraph(txt.intro2.no);
  else {
    e.paragraph(txt.intro2.yes);
    for (const legend of legends) e.listItem(legend);
  }

  return e.next(intro3);
});

const intro3 = B1.node("intro3", (e) => {
  // TODO
  e.paragraph(txt.intro3);
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
      e.text(txt.entrance.noticeWhileOpeningDoor);
    }
  }

  return e.goto(a1Alcoves);
});

const a1Alcoves = B1.node("alcoves", (e) => {
  e.paragraph(txt.alcoves);

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
