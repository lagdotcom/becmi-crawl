import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CharId, ModuleId } from "../types";

export interface GameState {
  module?: ModuleId;
  party: CharId[];
}

const initialState: GameState = {
  party: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startModule(
      state,
      {
        payload: { id, party },
      }: PayloadAction<{ id: ModuleId; party: CharId[] }>,
    ) {
      state.module = id;
      state.party = party;
    },
  },
});

export default gameSlice.reducer;
export const { startModule } = gameSlice.actions;
