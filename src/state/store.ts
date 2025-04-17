import { configureStore, createSelector, Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import characters from "./characters";
import enemies from "./enemies";
import game from "./game";
import items from "./items";
import modules from "./modules";

export const store = configureStore({
  reducer: { characters, enemies, game, items, modules },
});
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppAction = AppDispatch extends Dispatch<infer A> ? A : never;

export const createAppSelector = createSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
