import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import {
  getAllUnitMesures,
  getClientCompanies,
  getProducts,
} from "./form.actions";

const FORM_FIELDS_KEY: string = "form";

export type AutocompleteData = {
  unitMesures: any[];
  companies: any[];
  products: any[];
};
export type DropdownData = {};

export interface FormState {
  loading: boolean;
  autocompleteData: AutocompleteData;
  dropdownData: DropdownData | null;
}

const initialState: FormState = {
  loading: false,
  autocompleteData: {
    unitMesures: [],
    companies: [],
    products: [],
  },
  dropdownData: null,
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
  },
  extraReducers: (builder) => {
    getAsyncUnitMesures(builder);
    getAsyncClientCompanies(builder);
    getAsyncProducts(builder);
  },
});

export const { clearCompanies, clearProducts } = formSlice.actions;
export default formSlice.reducer;

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
