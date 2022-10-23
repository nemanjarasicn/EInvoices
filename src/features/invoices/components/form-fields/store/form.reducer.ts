import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import { AutocompleteItem } from "../models/form-fields.models";
import { getAllUnitMesures } from "./form.actions";

const FORM_FIELDS_KEY: string = "form";

export type AutocompleteData = { unitMesures: any[] };

export interface FormState {
  loading: boolean;
  autocompleteData: AutocompleteData;
}

const initialState: FormState = {
  loading: false,
  autocompleteData: {
    unitMesures: [],
  },
};

const formSlice: Slice<FormState> = createSlice({
  name: FORM_FIELDS_KEY,
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    getAsyncUnitMesures(builder);
  },
});

export const { setSelection, resetSelectionState } = formSlice.actions;
export default formSlice.reducer;

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
