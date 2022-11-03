import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CoreState } from "./core.reducer";

/**
 * Core Selectors
 */
const coreSelectors = (state: RootState) => state.core;

/**
 * Select user
 */
export const selectUser = createSelector(
  coreSelectors,
  (state: CoreState) => state.user
);

/**
 * Select company
 */
export const selectCompany = createSelector(
  coreSelectors,
  (state: CoreState) => state.user?.companyId
);
