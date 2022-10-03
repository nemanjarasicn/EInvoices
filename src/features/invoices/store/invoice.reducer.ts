import {
  createEntityAdapter,
  createSlice,
  EntityAdapter,
  EntityState,
  Slice,
} from "@reduxjs/toolkit";

export type Invoice = {
  id: number;
  lastName: string;
  firstName: string;
  age: number;
};
const FEATURE_INVOICES_KEY: string = "invoices";

export const invoiceAdapter: EntityAdapter<Invoice> =
  createEntityAdapter<Invoice>({
    selectId: (invoice) => invoice.id,
    // sortComparer: (a, b) => a.id.localeCompare(b.id),
  });

const invoicesSlice: Slice<EntityState<Invoice>> = createSlice({
  name: FEATURE_INVOICES_KEY,
  initialState: invoiceAdapter.getInitialState(),
  reducers: {
    setAllInvoices: invoiceAdapter.setAll,
    // setOneInvoices: invoiceAdapter.removeOne,
    setManyInvoices: invoiceAdapter.addMany,
    updateOneInvoice: invoiceAdapter.updateOne,
    addOneInvoice: invoiceAdapter.addOne,
    //custom
    clearCache: () => invoiceAdapter.getInitialState(),
  },
});

export const { updateOneInvoice, clearCache, setManyInvoices, addOneInvoice } =
  invoicesSlice.actions;

export default invoicesSlice.reducer;
