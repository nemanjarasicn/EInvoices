import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import { AutocompleteItem } from "../models/form-fields.models";
import { getAllUnitMesures, getClientCompanies } from "./form.actions";

const FORM_FIELDS_KEY: string = "form";

export type AutocompleteData = { unitMesures: any[] };
export type DropdownData = { companies: any[] };

export interface FormState {
  loading: boolean;
  autocompleteData: AutocompleteData;
  dropdownData: DropdownData;
}

const initialState: FormState = {
  loading: false,
  autocompleteData: {
    unitMesures: [],
  },
  dropdownData: {
    companies: [],
  },
};

const formSlice: Slice<FormState> = createSlice({
  name: FORM_FIELDS_KEY,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    getAsyncUnitMesures(builder);
    getAsyncClientCompanies(builder);
  },
});

export const { setSelection, resetSelectionState } = formSlice.actions;
export default formSlice.reducer;

/**
 * Handle async action GET CLIENT COMPANIES
 * @param builder ActionReducerMapBuilder
 */
function getAsyncClientCompanies(builder: ActionReducerMapBuilder<FormState>) {
  builder.addCase(getClientCompanies.fulfilled, (state, { payload }) => ({
    ...state,
    dropdownData: { ...state.dropdownData, companies: payload },
    loading: false,
  }));
  builder.addCase(getClientCompanies.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getClientCompanies.rejected, (state) => ({
    ...state,
    dropdownData: { ...state.dropdownData, companies: [] },
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
