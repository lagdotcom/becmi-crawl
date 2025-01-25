import { configureStore, createSelector, Dispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

import characters from "./characters";
import game from "./game";
import modules from "./modules";

export const store = configureStore({ reducer: { characters, game, modules } });
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppAction = AppDispatch extends Dispatch<infer A> ? A : never;

export const createAppSelector = createSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
