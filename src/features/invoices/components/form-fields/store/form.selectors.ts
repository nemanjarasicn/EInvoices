import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../../../../app/store";
import { ProductModel } from "../../../models";
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
      multiplierFactorNumeric: 10,
      amount: 0,
    },
    item: {
      idProduct: item.prodctId,
      name: item.productName,
      sellersItemIdentification: { id: 1 },
      classifiedTaxCategory: {
        id: 1,
        taxScheme: { id: "VAT" },
        percent: Number(item.vatValue1) * 100,
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
