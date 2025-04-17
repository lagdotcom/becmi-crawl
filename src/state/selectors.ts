import { charactersAdapter, charactersSlice } from "./characters";
import { enemiesAdapter, enemiesSlice } from "./enemies";
import { gameSlice } from "./game";
import { itemsAdapter } from "./items";
import { modulesAdapter, modulesSlice } from "./modules";
import { createAppSelector } from "./store";

export const {
  selectById: selectCharacterById,
  selectIds: selectCharacterIds,
  selectEntities: selectCharacterEntities,
  selectAll: selectAllCharacters,
  selectTotal: selectTotalCharacters,
} = charactersAdapter.getSelectors(charactersSlice.selectSlice);

export const selectGameState = gameSlice.selectSlice;
export const selectCurrentModuleId = createAppSelector(
  [selectGameState],
  (game) => game.module,
);

export const selectParty = createAppSelector(
  [selectGameState, selectCharacterEntities],
  (game, characters) => game.party.map((id) => characters[id]),
);

export const {
  selectById: selectModuleById,
  selectIds: selectModuleIds,
  selectEntities: selectModuleEntities,
  selectAll: selectAllModules,
  selectTotal: selectTotalModules,
} = modulesAdapter.getSelectors(modulesSlice.selectSlice);

export const { selectAll: selectAllEnemies } = enemiesAdapter.getSelectors(
  enemiesSlice.selectSlice,
);

export const { selectAll: selectAllItems } = itemsAdapter.getSelectors();
