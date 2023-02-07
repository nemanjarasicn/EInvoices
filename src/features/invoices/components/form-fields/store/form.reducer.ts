import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import {
  getAllUnitMesures,
  getClientCompanies,
  getCurrentDocumentNumber,
  getDocumentTypes,
  getMarketPlaces,
  getProducts,
  getInvoiceByType
} from "./form.actions";

const FORM_FIELDS_KEY: string = "form";

export type AutocompleteData = {
  unitMesures: any[];
  companies: any[];
  products: any[];
  invoicesByType:  any[];
};
export type DropdownData = {
  marketPlaces: any[];
  documentTypes: any[];
};

export interface FormState {
  loading: boolean;
  autocompleteData: AutocompleteData;
  dropdownData: DropdownData;
  documentNumber: string | null;
}

const initialState: FormState = {
  loading: false,
  autocompleteData: {
    unitMesures: [],
    companies: [],
    products: [],
    invoicesByType:  [],
  },
  dropdownData: {
    marketPlaces: [],
    documentTypes: [],
  },
  documentNumber: null,
};

const formSlice: Slice<FormState> = createSlice({
  name: FORM_FIELDS_KEY,
  initialState: initialState,
  reducers: {
    clearCompanies: (state) => ({
      ...state,
      autocompleteData: { ...state.autocompleteData, companies: [] },
    }),
    clearProducts: (state) => ({
      ...state,
      autocompleteData: { ...state.autocompleteData, products: [] },
    }),
    clearMarketPlaces: (state) => ({
      ...state,
      dropdownData: { ...state.dropdownData, marketPlaces: [] },
    }),
    clearDocumentTypes: (state) => ({
      ...state,
      dropdownData: { ...state.dropdownData, documentTypes: [] },
    }),
  },

  extraReducers: (builder) => {
    getAsyncUnitMesures(builder);
    getAsyncClientCompanies(builder);
    getAsyncProducts(builder);
    getAsyncMarketPlaces(builder);
    getAsyncCurrDocumentNumber(builder);
    getAsyncDocumentTypes(builder);
    getAsyncInvoicesByType(builder);
  },
});

export const {
  clearCompanies,
  clearProducts,
  clearMarketPlaces,
  clearDocumentTypes,
} = formSlice.actions;
export default formSlice.reducer;

/**
 * Handle async action GET MARKET-PLACES
 * @param builder ActionReducerMapBuilder
 */
function getAsyncMarketPlaces(builder: ActionReducerMapBuilder<FormState>) {
  builder.addCase(getMarketPlaces.fulfilled, (state, { payload }) => ({
    ...state,
    dropdownData: { ...state.dropdownData, marketPlaces: payload },
    loading: false,
  }));
  builder.addCase(getMarketPlaces.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getMarketPlaces.rejected, (state) => ({
    ...state,
    dropdownData: { ...state.dropdownData, marketPlaces: [] },
    loading: false,
  }));
}
/**
 * Handle async action GET PRODUCTS
 * @param builder ActionReducerMapBuilder
 */
function getAsyncProducts(builder: ActionReducerMapBuilder<FormState>) {
  builder.addCase(getProducts.fulfilled, (state, { payload }) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, products: payload },
    loading: false,
  }));
  builder.addCase(getProducts.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getProducts.rejected, (state) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, products: [] },
    loading: false,
  }));
}


/**
 * Handle async action GET invoices by type
 * @param builder ActionReducerMapBuilder
 */
 function getAsyncInvoicesByType(builder: ActionReducerMapBuilder<FormState>) {
  builder.addCase(getInvoiceByType.fulfilled, (state, { payload }) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, invoicesByType: payload },
    loading: false,
  }));
  builder.addCase(getInvoiceByType.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getInvoiceByType.rejected, (state) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, invoicesByType: [] },
    loading: false,
  }));
}
/**
 * Handle async action GET CLIENT COMPANIES
 * @param builder ActionReducerMapBuilder
 */
function getAsyncClientCompanies(builder: ActionReducerMapBuilder<FormState>) {
  builder.addCase(getClientCompanies.fulfilled, (state, { payload }) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, companies: payload },
    loading: false,
  }));
  builder.addCase(getClientCompanies.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getClientCompanies.rejected, (state) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, companies: [] },
    loading: false,
  }));
}

/**
 * Handle async action GET UNIT MESURES
 * @param builder ActionReducerMapBuilder
 */
function getAsyncUnitMesures(builder: ActionReducerMapBuilder<FormState>) {
  builder.addCase(getAllUnitMesures.fulfilled, (state, { payload }) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, unitMesures: payload },
    loading: false,
  }));
  builder.addCase(getAllUnitMesures.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getAllUnitMesures.rejected, (state) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, unitMesures: [] },
    loading: false,
  }));
}

/**
 * Handle async action getCurrent Doc Number
 * @param builder ActionReducerMapBuilder
 */
function getAsyncCurrDocumentNumber(
  builder: ActionReducerMapBuilder<FormState>
) {
  builder.addCase(getCurrentDocumentNumber.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
    documentNumber: `${new Date().getUTCFullYear().toString()}/${payload + 1}`,
  }));
  builder.addCase(getCurrentDocumentNumber.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getCurrentDocumentNumber.rejected, (state) => ({
    ...state,
    loading: false,
  }));
}

/**
 * Handle async document types
 * @param builder ActionReducerMapBuilder
 */
function getAsyncDocumentTypes(builder: ActionReducerMapBuilder<FormState>) {
  builder.addCase(getDocumentTypes.fulfilled, (state, { payload }) => ({
    ...state,
    dropdownData: { ...state.dropdownData, documentTypes: payload },
    loading: false,
  }));
  builder.addCase(getDocumentTypes.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getDocumentTypes.rejected, (state) => ({
    ...state,
    dropdownData: { ...state.dropdownData, documentTypes: [] },
    loading: false,
  }));
}
