import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CharId, ModuleId, StateId } from "../types";

export interface GameState {
  module?: ModuleId;
  moduleState: Record<string, unknown>;
  party: CharId[];
}

const initialState: GameState = {
  moduleState: {},
  party: [],
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setModuleState(
      state,
      {
        payload: { id, value },
      }: PayloadAction<{ id: StateId; value: unknown }>,
    ) {
      state.moduleState[id] = value;
    },

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
export const { setModuleState, startModule } = gameSlice.actions;
