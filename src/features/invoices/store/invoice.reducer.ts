import {
  createEntityAdapter,
  createSlice,
  EntityAdapter,
  EntityState,
  Slice,
} from "@reduxjs/toolkit";
import { InvoiceDto } from "../models/invoice.models";
import { getSalesInvoices } from "./invoice.actions";

const FEATURE_INVOICES_KEY: string = "invoices";

export const invoiceAdapter: EntityAdapter<InvoiceDto> =
  createEntityAdapter<InvoiceDto>({
    selectId: (invoice) => invoice.InvoiceId,
    // sortComparer: (a, b) => a.id.localeCompare(b.id),
  });

const invoicesSlice: Slice<EntityState<InvoiceDto>> = createSlice({
  name: FEATURE_INVOICES_KEY,
  initialState: invoiceAdapter.getInitialState(),
  reducers: {
    setAllInvoices: invoiceAdapter.setAll,
    setManyInvoices: invoiceAdapter.addMany,
    updateOneInvoice: invoiceAdapter.updateOne,
    addOneInvoice: invoiceAdapter.addOne,
    //custom
    clearCache: () => invoiceAdapter.getInitialState(),
  },
  extraReducers: (builder) => {
    builder.addCase(getSalesInvoices.fulfilled, (state, action) => {
      invoiceAdapter.addMany(state, action.payload);
    });
  },
});

export const { updateOneInvoice, clearCache, setManyInvoices, addOneInvoice } =
  invoicesSlice.actions;
export default invoicesSlice.reducer;
