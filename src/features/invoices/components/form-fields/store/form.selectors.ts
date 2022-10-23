import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../../app/store";
import { AutocompleteData, FormState } from "./form.reducer";

/**
 * State Form Selector
 */
const formSelectors = (state: RootState) => state.form;

/**
 * Autocomplete Data Selector
 */
const autocompleteSelectors = (state: RootState) => state.form.autocompleteData;

/**
 * Select isLoading state
 */
export const isLoadingForm = createSelector(
  formSelectors,
  (state: FormState) => state.loading
);

/**
 * Unit Mesure Autocomplete selector
 */
export const autocompleteData = createSelector(
  autocompleteSelectors,
  (state: AutocompleteData) =>
    state.unitMesures.map((item, index) => ({
      id: index,
      name: item.Code,
      item: item,
    }))
);
