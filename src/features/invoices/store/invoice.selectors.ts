import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { FeatureState } from "./invoice.reducer";

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

/**
 * Select Files from state
 */
export const selectAllFiles = createSelector(
  featureSelectors,
  (state: FeatureState) => state.files
);

export const selectIds = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    const ids: number[] = [];
    state.invoicesR.map((invoice) => {
      if (Boolean(invoice.id)) ids.push(invoice.id);
    });
    return ids;
  }
);

export const selectInvoices = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.invoicesR.filter((item) => Boolean(item.id));
  }
);


export const selectZip = createSelector(
  featureSelectors,
  (state: FeatureState) => state.zip
);


export const selectOpenConfirm = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.openModalConfirm;
  }
);



export const selectOpenPdf = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.openModalPdf;
  }
);


export const selectOpenFilter = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.openModalFilter;
  }
);


export const selectOpenError = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.openModalError;
  }
);


export const selectInvoiceDetails = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.invoiceDetails;
  }
);


export const selectFilters = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.filters;
  }
);

export const selectTaxBase = createSelector(
  featureSelectors,
  (state: FeatureState) => state.taxBase
);
