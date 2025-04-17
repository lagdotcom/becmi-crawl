import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { CharData } from "../types";

export const charactersAdapter = createEntityAdapter<CharData>();

export const charactersSlice = createSlice({
  name: "characters",
  initialState: charactersAdapter.getInitialState(),
  reducers: {
    addCharacter: charactersAdapter.addOne,
  },
});

export default charactersSlice.reducer;
export const { addCharacter } = charactersSlice.actions;
