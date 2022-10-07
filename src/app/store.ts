import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import invoicesReducer from "../features/invoices/store/invoice.reducer";
import dataGridReducer from "../features/invoices/components/DataGrid/store/data-grid.reducer";

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    dataGrid: dataGridReducer,
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
