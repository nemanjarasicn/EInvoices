import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../../app/store";
import {
  CustomerPartyModel,
} from "../../../../registries/models/registries.models";
import {CountryCode, SchemeID }   from  "../../../../registries/models/registries.enums"
import { OptionItem } from "../models/form-fields.models";
import { AutocompleteData, DropdownData, FormSharedState } from "./form.reducer";

/**
 * State Form Selector
 */
const formSelectors = (state: RootState) => state.formShared;

/**
 * Autocomplete Data Selector
 */
const autocompleteSelectors = (state: RootState) => state.formShared.autocompleteData;

/**
 * Dropdown Data Selector
 */
const dropdownSelectors = (state: RootState) => state.formShared.dropdownData;

/**
 * Select isLoading state
 */
export const isLoadingFormShared = createSelector(
  formSelectors,
  (state: FormSharedState) => state.loading
);

/**
 * Select market-places for dropdown component
 */
export const selectMarketPlaces = createSelector(
  dropdownSelectors,
  (state: DropdownData) =>
    state.marketPlaces.map(
      (item) => ({id: item.id, name: item.marketPlaceName, item: item})
    )
);

/**
 * Select objects for dropdown component
 */
 export const selectObjectsAll = createSelector(
  dropdownSelectors,
  (state: DropdownData) =>
    state.objects.map(
      (item) => ({id: item.idObject, name: item.name, item: item})
    )
);

/**
 * Select  point of sales for dropdown component
 */
 export const selectPointOfSale = createSelector(
  dropdownSelectors,
  (state: DropdownData) =>
    state.groups.map(
      (item) => ({id: item.id, name: item.namePointOfSale, item: item})
    )
);


export const selectCompaniesAll = createSelector(
  autocompleteSelectors,
  (state: AutocompleteData) =>
    state.companies.map((item, index) => ({
      name: item.companyName,
      id: item.pib,
      item: convertToCompanyModel(item),
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
      name: item.companyName,
      id: item.pib,
      item: convertToCompanyModel(item),
    })) 
);

/**
 * Select units for dropdown component
 */
 export const selectUnitsAll = createSelector(
  dropdownSelectors,
  (state: DropdownData) =>
    state.units.map(
      (item) => ({id: item.id, name: item.productUnitName, item: item})
    )
);


/**
 * Select vat for dropdown component
 */
 export const selectVatsAll = createSelector(
  dropdownSelectors,
  (state: DropdownData) =>
    state.vats.map(
      (item) => ({id: item.id, name: item.name, item: item})
    )
);

function convertToCompanyModel(item: any): CustomerPartyModel {
  return {
    main: {
      idCompany: item.idCompany,
      companyName:  item.companyName,
    },
    party: {
      schemeID: SchemeID.NOT_CIR,
      endpointID: item.pib,
      partyName: [
        {
          name: item.companyName,
        },
      ],
    },
    postalAddress: {
      streetName: item.address,
      cityName: item.city,
      zip: item.zip,
      country: { identificationCode: CountryCode.RS },
    },
    partyTaxScheme: {
      companyID: `RS${item.pib}`,
      taxScheme: {
        id: "VAT",
      },
    },
    partyLegalEntity: {
      registrationName: item.companyName,
      companyID: item.mb,
    },
    contact: {
      electronicMail: item.email,
    },
  };
}
