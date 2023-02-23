import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../../app/store';
import { DataGridState } from './data-grid.reducer';

/**
 * Data-Grid state
 */
const dataGridSelector = (state: RootState) => state.dataGrid;

/**
 * Select selection
 */
export const selectSelection = createSelector(
  dataGridSelector,
  (state: DataGridState) => state.selection
);
