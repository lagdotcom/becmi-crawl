import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { EnemyData } from "../types";

export const enemiesAdapter = createEntityAdapter<EnemyData>();

export const enemiesSlice = createSlice({
  name: "enemies",
  initialState: enemiesAdapter.getInitialState(),
  reducers: {
    addEnemy: enemiesAdapter.addOne,
    addEnemies: enemiesAdapter.addMany,
    removeAllEnemies: enemiesAdapter.removeAll,
  },
});

export default enemiesSlice.reducer;
export const { addEnemies, addEnemy, removeAllEnemies } = enemiesSlice.actions;
