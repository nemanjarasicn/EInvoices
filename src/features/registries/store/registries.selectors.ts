import { createDraftSafeSelector, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { FeatureState } from "./registries.reducer";

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
/*export const entitySelector = registriesAdapter.getSelectors<RootState>(
  (state) => state.registries
);*/

/**
 * Feature state
 */
const featureSelectors = (state: RootState) => state.registries;

/**
 * Select isLoading state
 */
export const isLoading = createSelector(
  featureSelectors,
  (state: FeatureState) => state.loading
);

export const selectIds = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    const ids: number[] = [];
    state.objects.map((object) => {
      if (Boolean(object.idObject)) ids.push(object.idObject);
    });
    return ids;
  }
);

export const selectObjects = createSelector(
  featureSelectors,
  (state: FeatureState) => {
    return state.objects.filter((item) => Boolean(item.idObject));
  }
);