import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import invoicesReducer from "../features/invoices/store/invoice.reducer";

export const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
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
