import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { generateParty } from "../data/sampleCharacters";
import { CharData } from "../types";

export const charactersAdapter = createEntityAdapter<CharData>();

export const charactersSlice = createSlice({
  name: "characters",
  initialState: charactersAdapter.getInitialState(undefined, generateParty(6)),
  reducers: {
    addCharacter: charactersAdapter.addOne,
  },
});

export default charactersSlice.reducer;
export const { addCharacter } = charactersSlice.actions;
