import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { invoiceAdapter } from "./invoice.reducer";

const selectSelf = (state: RootState) => state.invoices;

// TODO
export const selectInvoicesWithStatusSent = createDraftSafeSelector(
  selectSelf,
  (state) =>
    Object.values(state.entities).filter((invoice) => invoice?.id === 3)
);

/**
 * EntityAdapter selectors
 */
export const invoiceSelectors = invoiceAdapter.getSelectors<RootState>(
  (state) => state.invoices
);
