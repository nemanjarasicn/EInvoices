import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import {
  getAllUnitMesures,
  getClientCompanies,
  getMarketPlaces,
  getProducts,
} from "./form.actions";

const FORM_FIELDS_KEY: string = "form";

export type AutocompleteData = {
  unitMesures: any[];
  companies: any[];
  products: any[];
};
export type DropdownData = {
  marketPlaces: any[];
};

export interface FormState {
  loading: boolean;
  autocompleteData: AutocompleteData;
  dropdownData: DropdownData;
}

const initialState: FormState = {
  loading: false,
  autocompleteData: {
    unitMesures: [],
    companies: [],
    products: [],
  },
  dropdownData: {
    marketPlaces: [],
  },
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
  },

  extraReducers: (builder) => {
    getAsyncUnitMesures(builder);
    getAsyncClientCompanies(builder);
    getAsyncProducts(builder);
    getAsyncMarketPlaces(builder);
  },
});

export const { clearCompanies, clearProducts, clearMarketPlaces } =
  formSlice.actions;
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
