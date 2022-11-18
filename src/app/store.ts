import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import invoicesReducer from "../features/invoices/store/invoice.reducer";
import dataGridReducer from "../features/invoices/components/DataGrid/store/data-grid.reducer";
import formReducer from "../features/invoices/components/form-fields/store/form.reducer";
import coreReducer from "./core/core.reducer";
import registriesReducer from "../features/registries/store/registries.reducer";

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    dataGrid: dataGridReducer,
    form: formReducer,
    core: coreReducer,
    registries:  registriesReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
