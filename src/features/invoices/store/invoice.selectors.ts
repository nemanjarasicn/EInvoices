import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { FeatureState, invoiceAdapter } from "./invoice.reducer";

// const selectSelf = (state: RootState) => state.invoices;

// TODO
// export const selectInvoicesWithStatusSent = createDraftSafeSelector(
//   selectSelf,
//   (state) =>
//     Object.values(state.entities).filter((invoice) => invoice?.InvoiceId === 3)
// );

/**
 * EntityAdapter selectors
 */
export const entitySelector = invoiceAdapter.getSelectors<RootState>(
  (state) => state.invoices
);

/**
 * Feature state
 */
const featureSelectors = (state: RootState) => state.invoices;

/**
 * Select isLoading state
 */
export const isLoading = createSelector(
  featureSelectors,
  (state: FeatureState) => state.loading
);
