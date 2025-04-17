import { createEntityAdapter, createSlice } from "@reduxjs/toolkit";

import {
  ArmorOverrides,
  CharId,
  EnemyId,
  ItemId,
  ShieldOverrides,
  WeaponOverrides,
} from "../types";

type ItemType =
  | { type: "armor"; overrides: ArmorOverrides }
  | { type: "shield"; overrides: ShieldOverrides }
  | { type: "weapon"; overrides: WeaponOverrides };

type ItemLocation =
  | { location: "pc"; who: CharId; equipped: boolean }
  | { location: "enemy"; who: EnemyId; equipped: boolean }
  | { location: "floor"; where: string };

export type Item = {
  id: ItemId;
  base: string;
  qty: number;
  identified: boolean;
} & ItemType &
  ItemLocation;

export const itemsAdapter = createEntityAdapter<Item>();

export const itemsSlice = createSlice({
  name: "items",
  initialState: itemsAdapter.getInitialState(),
  reducers: {
    addItem: itemsAdapter.addOne,
  },
});

export default itemsSlice.reducer;
export const { addItem } = itemsSlice.actions;
