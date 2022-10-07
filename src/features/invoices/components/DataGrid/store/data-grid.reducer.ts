import { createSlice } from "@reduxjs/toolkit";
import { GridSelectionModel } from "@mui/x-data-grid";

const DATA_GRID_KEY: string = "data-grid";

export interface DataGridState {
  selection: GridSelectionModel;
}

const initialState: DataGridState = {
  selection: [],
};

const dataGridSlice = createSlice({
  name: DATA_GRID_KEY,
  initialState,
  reducers: {
    setSelection: (state, { payload }) => ({
      ...state,
      selection: payload,
    }),
    resetDataGridState: () => ({
      ...initialState,
    }),
  },
});

export const { setSelection, resetDataGridState } = dataGridSlice.actions;
export default dataGridSlice.reducer;
