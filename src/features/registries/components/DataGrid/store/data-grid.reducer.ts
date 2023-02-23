import { createSlice, Slice } from '@reduxjs/toolkit';
import { GridSelectionModel } from '@mui/x-data-grid';

const DATA_GRID_KEY: string = 'data-grid';

export interface DataGridState {
  selection: GridSelectionModel;
}

const initialState: DataGridState = {
  selection: [],
};

const dataGridSlice: Slice<DataGridState> = createSlice({
  name: DATA_GRID_KEY,
  initialState,
  reducers: {
    setSelection: (state, { payload }) => ({
      ...state,
      selection: payload,
    }),
    resetSelectionState: (state) => ({
      ...state,
      selection: [],
    }),
  },
});

export const { setSelection, resetSelectionState } = dataGridSlice.actions;
export default dataGridSlice.reducer;
