import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import invoicesReducer from "../features/invoices/store/invoice.reducer";
import dataGridReducer from "../features/invoices/components/DataGrid/store/data-grid.reducer";
import formReducer from "../features/invoices/components/form-fields/store/form.reducer";
import coreReducer from "./core/core.reducer";
import registriesReducer from "../features/registries/store/registries.reducer";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import persistStore from "redux-persist/es/persistStore";

const corePersistConfig = {
  key: "core",
  storage: storage,
};

const rootReducer = combineReducers({
  core: persistReducer(corePersistConfig, coreReducer),
  invoices: invoicesReducer,
  dataGrid: dataGridReducer,
  form: formReducer,
  registries:  registriesReducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
