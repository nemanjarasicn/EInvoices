import {
  ActionReducerMapBuilder,
  createEntityAdapter,
  createSlice,
  EntityAdapter,
  EntityState,
  Slice,
} from "@reduxjs/toolkit";
import { ok } from "assert";
import { InvoiceDto } from "../models/invoice.models";
import {
  getAllCompanies,
  getAllUnitMesures,
  getPurchaseInvoices,
  getSalesInvoices,
} from "./invoice.actions";

const FEATURE_INVOICES_KEY: string = "invoices";

export const invoiceAdapter: EntityAdapter<InvoiceDto> =
  createEntityAdapter<InvoiceDto>({
    selectId: (invoice) => invoice.InvoiceId,
    // sortComparer: (a, b) => a.id.localeCompare(b.id),
  });
export interface FeatureState extends EntityState<InvoiceDto> {
  unitMesures: any[];
  companies: any[];
  loading: boolean;
}
const initialState: FeatureState = {
  ...invoiceAdapter.getInitialState(),
  unitMesures: [],
  loading: false,
  companies: [],
};

const invoicesSlice: Slice<FeatureState> = createSlice({
  name: FEATURE_INVOICES_KEY,
  initialState: initialState,
  reducers: {
    setAllInvoices: invoiceAdapter.setAll,
    setManyInvoices: invoiceAdapter.addMany,
    updateOneInvoice: invoiceAdapter.updateOne,
    addOneInvoice: invoiceAdapter.addOne,
    //custom
    clearCache: () => initialState,
  },
  extraReducers: (builder) => {
    getAsyncInvoices(builder);
    getAsyncUnitMesures(builder);
    getAsyncCompanies(builder);
  },
});

export const { updateOneInvoice, clearCache, setManyInvoices, addOneInvoice } =
  invoicesSlice.actions;
export default invoicesSlice.reducer;

/**
 * Handle async action GET UNIT MESURES
 * @param builder ActionReducerMapBuilder
 */
function getAsyncUnitMesures(builder: ActionReducerMapBuilder<FeatureState>) {
  builder.addCase(getAllUnitMesures.fulfilled, (state, { payload }) => ({
    ...state,
    unitMesures: payload,
    loading: false,
  }));
  builder.addCase(getAllUnitMesures.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getAllUnitMesures.rejected, (state) => ({
    ...state,
    loading: false,
    unitMesures: [],
  }));
}

function getAsyncInvoices(builder: ActionReducerMapBuilder<FeatureState>) {
  builder.addCase(
    getSalesInvoices.fulfilled,
    (state, { payload }) => (
      invoiceAdapter.removeAll(state), invoiceAdapter.addMany(state, payload)
    )
  );

  builder.addCase(
    getPurchaseInvoices.fulfilled,
    (state, { payload }) => (
      invoiceAdapter.removeAll(state), invoiceAdapter.addMany(state, payload)
    )
  );
}

function getAsyncCompanies(builder: ActionReducerMapBuilder<FeatureState>) {
  builder.addCase(getAllCompanies.fulfilled, (state, { payload }) => ({
    ...state,
    companies: payload,
    loading: false,
  }));
  builder.addCase(getAllCompanies.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getAllCompanies.rejected, (state) => ({
    ...state,
    loading: false,
    companies: [],
  }));
}
// addOne: accepts a single entity, and adds it if it's not already present.
// addMany: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds them if not already present.
// setOne: accepts a single entity and adds or replaces it.
// setMany: accepts an array of entities or an object in the shape of Record<EntityId, T>, and adds or replaces them.
// setAll: accepts an array of entities or an object in the shape of Record<EntityId, T>, and replaces all existing entities with the values in the array.
// removeOne: accepts a single entity ID value, and removes the entity with that ID if it exists.
// removeMany: accepts an array of entity ID values, and removes each entity with those IDs if they exist.
// removeAll: removes all entities from the entity state object.
// updateOne: accepts an "update object" containing an entity ID and an object containing one or more new field values to update inside a changes field, and performs a shallow update on the corresponding entity.
// updateMany: accepts an array of update objects, and performs shallow updates on all corresponding entities.
// upsertOne: accepts a single entity. If an entity with that ID exists, it will perform a shallow update and the specified fields will be merged into the existing entity, with any matching fields overwriting the existing values. If the entity does not exist, it will be added.
// upsertMany: accepts an array of entities or an object in the shape of Record<EntityId, T> that will be shallowly upserted.
