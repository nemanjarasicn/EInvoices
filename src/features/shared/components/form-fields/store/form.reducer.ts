import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import {
  getCompaniesAll,
  getMarketPlacesAll,
  getPointOfSalesAll,
  getObjectsAll,
  getUnitsAll,
  getVatAll,
  getUserRole,
  getSubjectCategory,
  getSubjectType,
  getTaxCode,
  getTaxBase
} from "./form.actions";

const FORM_FIELDS_KEY: string = "formShared";

export type AutocompleteData = {
  unitMesures: any[];
  companies: any[];
  products: any[];
  userRole:  any[];
  subjectCategory:  any[];
  subjectType:  any[];
  taxCode:   any[];
  taxBase:   any[];
};
export type DropdownData = {
  marketPlaces: any[];
  groups:    any[];
  objects:  any[];
  units:  any[];
  vats:  any[];

};

export interface FormSharedState {
  loading: boolean;
  autocompleteData: AutocompleteData;
  dropdownData: DropdownData;
}

const initialState: FormSharedState = {
  loading: false,
  autocompleteData: {
    unitMesures: [],
    companies: [],
    products: [],
    userRole:  [],
    subjectCategory:  [],
    subjectType:  [],
    taxCode:  [],
    taxBase:  []
  },
  dropdownData: {
    marketPlaces: [],
    groups: [],
    objects: [],
    units:  [],
    vats:  []
  },
};

const formSharedSlice: Slice<FormSharedState> = createSlice({
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
    getAsyncClientCompanies(builder);
    getAsyncMarketPlaces(builder);
    getAsyncPointOfSAles(builder);
    getAsyncObjectsAll(builder);
    getAsyncUnitsAll(builder);
    getAsyncVatAll(builder);
    getAsyncUserRole(builder);
    getAsyncSubjectCategory(builder);
    getAsyncSubjectType(builder);
    getAsyncTaxCode(builder);
    getAsyncTaxBase(builder);
  },
});

export const { clearCompanies, clearProducts, clearMarketPlaces } =
formSharedSlice.actions;
export default formSharedSlice.reducer;

/**
 * Handle async action GET MARKET-PLACES
 * @param builder ActionReducerMapBuilder
 */
function getAsyncMarketPlaces(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getMarketPlacesAll.fulfilled, (state, { payload }) => ({
    ...state,
    dropdownData: { ...state.dropdownData, marketPlaces: payload },
    loading: false,
  }));
  builder.addCase(getMarketPlacesAll.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getMarketPlacesAll.rejected, (state) => ({
    ...state,
    dropdownData: { ...state.dropdownData, marketPlaces: [] },
    loading: false,
  }));
}

/**
 * Handle async action GET CLIENT COMPANIES
 * @param builder ActionReducerMapBuilder
 */
function getAsyncClientCompanies(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getCompaniesAll.fulfilled, (state, { payload }) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, companies: payload },
    loading: false,
  }));
  builder.addCase(getCompaniesAll.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getCompaniesAll.rejected, (state) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, companies: [] },
    loading: false,
  }));
}


/**
 * Handle async action GET POINT OF SALE
 * @param builder ActionReducerMapBuilder
 */
 function getAsyncPointOfSAles(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getPointOfSalesAll.fulfilled, (state, { payload }) => ({
    ...state,
    dropdownData: { ...state.dropdownData, groups: payload },
    loading: false,
  }));
  builder.addCase(getPointOfSalesAll.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getPointOfSalesAll.rejected, (state) => ({
    ...state,
    dropdownData: { ...state.dropdownData, groups: [] },
    loading: false,
  }));
}

/**
 * Handle async action GET OBJECTS
 * @param builder ActionReducerMapBuilder
 */
 function getAsyncObjectsAll(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getObjectsAll.fulfilled, (state, { payload }) => ({
    ...state,
    dropdownData: { ...state.dropdownData, objects: payload },
    loading: false,
  }));
  builder.addCase(getObjectsAll.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getObjectsAll.rejected, (state) => ({
    ...state,
    dropdownData: { ...state.dropdownData, objects: [] },
    loading: false,
  }));
}

/**
 * Handle async action GET UNITS
 * @param builder ActionReducerMapBuilder
 */
 function getAsyncUnitsAll(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getUnitsAll.fulfilled, (state, { payload }) => ({
    ...state,
    dropdownData: { ...state.dropdownData, units: payload },
    loading: false,
  }));
  builder.addCase(getUnitsAll.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getUnitsAll.rejected, (state) => ({
    ...state,
    dropdownData: { ...state.dropdownData, units: [] },
    loading: false,
  }));
}


/**
 * Handle async action GET VAT
 * @param builder ActionReducerMapBuilder
 */
 function getAsyncVatAll(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getVatAll.fulfilled, (state, { payload }) => ({
    ...state,
    dropdownData: { ...state.dropdownData, vats: payload },
    loading: false,
  }));
  builder.addCase(getVatAll.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getVatAll.rejected, (state) => ({
    ...state,
    dropdownData: { ...state.dropdownData, vats: [] },
    loading: false,
  }));
}

/**
 * Handle async action GET USER ROLE
 * @param builder ActionReducerMapBuilder
 */
 function getAsyncUserRole(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getUserRole.fulfilled, (state, { payload }) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, userRole: payload },
    loading: false,
  }));
  builder.addCase(getUserRole.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getUserRole.rejected, (state) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, userRole: [] },
    loading: false,
  }));
}


/**
 * Handle async action GET TAXCODE
 * @param builder ActionReducerMapBuilder
 */
 function getAsyncTaxCode(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getTaxCode.fulfilled, (state, { payload }) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, taxCode: payload },
    loading: false,
  }));
  builder.addCase(getTaxCode.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getTaxCode.rejected, (state) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, taxCode: [] },
    loading: false,
  }));
}


/**
 * Handle async action GET SUBJECT CATEGORY
 * @param builder ActionReducerMapBuilder
 */
 function getAsyncSubjectCategory(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getSubjectCategory.fulfilled, (state, { payload }) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, subjectCategory: payload },
    loading: false,
  }));
  builder.addCase(getSubjectCategory.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getSubjectCategory.rejected, (state) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, subjectCategory: [] },
    loading: false,
  }));
}


/**
 * Handle async action GET  SUBJECT TYPE
 * @param builder ActionReducerMapBuilder
 */
 function getAsyncSubjectType(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getSubjectType.fulfilled, (state, { payload }) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, subjectType: payload },
    loading: false,
  }));
  builder.addCase(getSubjectType.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getSubjectType.rejected, (state) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, subjectType: [] },
    loading: false,
  }));
}


/**
 * Handle async action GET TAXBASE
 * @param builder ActionReducerMapBuilder
 */
 function getAsyncTaxBase(builder: ActionReducerMapBuilder<FormSharedState>) {
  builder.addCase(getTaxBase.fulfilled, (state, { payload }) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, taxBase: payload },
    loading: false,
  }));
  builder.addCase(getTaxBase.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getTaxBase.rejected, (state) => ({
    ...state,
    autocompleteData: { ...state.autocompleteData, taxBase: [] },
    loading: false,
  }));
}

