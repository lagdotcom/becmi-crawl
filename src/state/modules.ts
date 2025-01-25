import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { ModuleId } from "../types";

interface ModuleData {
  id: ModuleId;
  name: string;
}

export const modulesAdapter = createEntityAdapter<ModuleData>();

export const modulesSlice = createSlice({
  name: "modules",
  initialState: modulesAdapter.getInitialState(),
  reducers: {
    addModule: modulesAdapter.addOne,
  },
});

export default modulesSlice.reducer;
export const { addModule } = modulesSlice.actions;
