import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { CharacterClass, CharData } from "../types";

const mkSample = (
  characterClass: CharacterClass,
  str: number,
  int: number,
  wis: number,
  dex: number,
  con: number,
  cha: number,
  ac: number,
  hp: number,
  gp: number,
): CharData => ({
  id: `_${characterClass}`,
  name: characterClass,
  characterClass,
  level: 1,
  abilities: { str, int, wis, dex, con, cha },
  ac,
  hp,
  hpMax: hp,
  money: { pp: 0, ep: 0, gp, sp: 0, cp: 0 },
  xp: 0,
});

const characterSamples: CharData[] = [
  mkSample("Cleric", 9, 11, 17, 8, 14, 16, 5, 6, 10),
  mkSample("Magic User", 8, 17, 11, 16, 14, 9, 7, 4, 10),
  mkSample("Thief", 16, 14, 9, 17, 11, 8, 5, 4, 3),
  mkSample("Dwarf", 16, 7, 11, 14, 9, 9, 1, 6, 7),
  mkSample("Elf", 16, 9, 7, 14, 9, 11, 3, 5, 10),
  mkSample("Halfling", 16, 11, 14, 9, 9, 7, 4, 5, 6),
];

export const charactersAdapter = createEntityAdapter<CharData>();

export const charactersSlice = createSlice({
  name: "characters",
  initialState: charactersAdapter.getInitialState(undefined, characterSamples),
  reducers: {
    addCharacter: charactersAdapter.addOne,
  },
});

export default charactersSlice.reducer;
export const { addCharacter } = charactersSlice.actions;
