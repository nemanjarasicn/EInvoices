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
  
/**
 * Select company apiKey
 */
export const apiKeyExist = createSelector(coreSelectors, (state: CoreState) =>
  Boolean(state.userCompany?.apiKey)
);

/**
 * Select token
 */
export const selectToken = createSelector(
  coreSelectors,
  (state: CoreState) => state.user?.token
);

/**
 * Select error
 */
export const hasError = createSelector(
  coreSelectors,
  (state: CoreState) => state.error
);

/**
 * Select isLoading
 */
export const loginLoading = createSelector(
  coreSelectors,
  (state: CoreState) => state.loading
);

/**
 * Select all info company
 */
 export const selectCompanyInfo = createSelector(
  coreSelectors,
  (state: CoreState) => state.userCompany
);


/**
 * Select color
 */
 export const selectColor = createSelector(
  coreSelectors,
  (state: CoreState) => state.color
);


/**
 * Select company current
 */
 export const selectCompanyCurrent = createSelector(
  coreSelectors,
  (state: CoreState) => state.companyCurrent
);


/**
 * Select all company
 */
 export const selectCompanyList = createSelector(
  coreSelectors,
  (state: CoreState) => state.companyList
);



/**
 * Select company admin
 */
 export const selectCompanyAdmin = createSelector(
  coreSelectors,
  (state: CoreState) => state.companyAdmin
);
