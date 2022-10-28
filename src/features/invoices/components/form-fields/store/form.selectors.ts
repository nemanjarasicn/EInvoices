import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../../app/store";
import { AutocompleteData, DropdownData, FormState } from "./form.reducer";

/**
 * State Form Selector
 */
const formSelectors = (state: RootState) => state.form;

/**
 * Autocomplete Data Selector
 */
const autocompleteSelectors = (state: RootState) => state.form.autocompleteData;

/**
 * Dropdown Data Selector
 */
const dropdownSelectors = (state: RootState) => state.form.dropdownData;

/**
 * Select isLoading state
 */
export const isLoadingForm = createSelector(
  formSelectors,
  (state: FormState) => state.loading
);

/**
 * Select unit mesures for autocomplete component
 */
export const selectUnitMesures = createSelector(
  autocompleteSelectors,
  (state: AutocompleteData) =>
    state.unitMesures.map((item, index) => ({
      id: index,
      name: item.Code,
      item: item,
    }))
);
/**
 * Select companies for autocomplete component
 * map to Autocomplete item
 */
export const selectClientCompanies = createSelector(
  autocompleteSelectors,
  (state: AutocompleteData) =>
    state.companies.map((item, index) => ({
      name: item.Name,
      id: item.VatRegistrationCode,
      item: {
        id: item.VatRegistrationCode,
        companyName: item.Name,
        registrationCode: item.RegistrationCode,
        vatRegistrationCode: item.VatRegistrationCode,
        address: "",
      },
    }))
);
