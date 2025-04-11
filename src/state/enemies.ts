import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import { MonsterStats } from "../types";

export interface EnemyData {
  id: string;
  type: string;
  hpMax: number;
  hp: number;
  overrides: Partial<MonsterStats>;
}

export const enemiesAdapter = createEntityAdapter<EnemyData>();

export const enemiesSlice = createSlice({
  name: "enemies",
  initialState: enemiesAdapter.getInitialState(),
  reducers: {
    addEnemy: enemiesAdapter.addOne,
    addEnemies: enemiesAdapter.addMany,
  },
});

export default enemiesSlice.reducer;
export const { addEnemies, addEnemy } = enemiesSlice.actions;
