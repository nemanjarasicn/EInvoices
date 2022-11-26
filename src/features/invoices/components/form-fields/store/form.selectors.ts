import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../../app/store";
import {
  CountryCode,
  CustomerPartyModel,
  ProductModel,
  SchemeID,
} from "../../../models";
import { OptionItem } from "../models/form-fields.models";
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
 * Select market-places for dropdown component
 */
export const selectMarketPlaces = createSelector(
  dropdownSelectors,
  (state: DropdownData) =>
    state.marketPlaces.map(
      (item) => ({ name: item.marketPlaceName, value: item.uuid } as OptionItem)
    )
);

/**
 * Select current Invoice id
 */
export const selectDocumentTypes = createSelector(
  dropdownSelectors,
  (state: DropdownData) => state.documentTypes
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
      name: item.companyName,
      id: item.pib,
      item: convertToCompanyModel(item),
    }))
);

/**
 * Select products for autocomplete component
 * map to Autocomplete item
 */
export const selectProducts = createSelector(
  autocompleteSelectors,
  (state: AutocompleteData) =>
    state.products.map((item, index) => ({
      name: item.productName,
      id: item.id,
      item: convertToProductModel(item),
    }))
);

/**
 * Select current Invoice id
 */
export const selectCurrentDocNumber = createSelector(
  formSelectors,
  (state: FormState) => state.documentNumber
);

function convertToProductModel(item: any): ProductModel {
  return {
    idVat: item.productVatRequest?.idVat,
    vatName: item.productVatRequest?.vatName,
    unitCode: item.productUnitRequest?.unitName,
    idUnit: item.productUnitRequest?.idUnit,
    currencyID: "RSD",
    id: item.prodctId,
    invoicedQuantity: 0,
    lineExtensionAmount: 0,
    allowanceCharge: {
      currencyId: "RSD",
      chargeIndicator: false,
      multiplierFactorNumeric: 0,
      amount: 0,
    },
    item: {
      idProduct: item.prodctId,
      name: item.productName,
      sellersItemIdentification: { id: 1 },
      classifiedTaxCategory: {
        id: 1,
        taxScheme: { id: "VAT" },
        percent: Number(((item.vatValue1 - 1) * 100).toFixed(2)),
      },
    },
    price: {
      priceAmount: 0,
      discount: 0,
      newPrice: 0,
      unitPrice: resolvePrice(item.priceLists),
      unitTaxAmount: 0,
    },
  };
}
function convertToCompanyModel(item: any): CustomerPartyModel {
  return {
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

function resolvePrice(priceLists: any[]): number {
  if (!priceLists) return 0;
  let activePrices: any[] = priceLists
    .filter((item) => Boolean(item.activ))
    .filter((val) => {
      const fDate = Date.parse(val.dateFrom.toString());
      const lDate = Date.parse(val.dateTo.toString());
      const cDate = Date.parse(new Date().toString());
      if (cDate <= lDate && cDate >= fDate) {
        return val;
      }
    });
  const highPrio = activePrices.find(
    (item) =>
      item.priority === Math.min(...activePrices.map((item) => item.priority))
  );
  return highPrio ? highPrio.price : 0;
}
