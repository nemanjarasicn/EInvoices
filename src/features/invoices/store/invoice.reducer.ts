import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import { FileStatus } from "../models";
import { IFile } from "../models/invoice.models";
import {
  getAllCompanies,
  searchInvoices,
  sendInvoce,
  sendInvoceXml,
} from "./invoice.actions";

const FEATURE_INVOICES_KEY: string = "invoices";

export interface FeatureState {
  unitMesures: any[];
  companies: any[];
  loading: boolean;
  files: IFile[];
  invoicesR: any[];
}
const initialState: FeatureState = {
  unitMesures: [],
  loading: false,
  companies: [],
  files: [],
  invoicesR: [],
};

const invoicesSlice: Slice<FeatureState> = createSlice({
  name: FEATURE_INVOICES_KEY,
  initialState: initialState,
  reducers: {
    setManyFiles: (state, { payload }) => ({ ...state, files: [...payload] }),
    removeFile: (state, { payload }) => {
      const newState = state;
      newState.files.splice(
        newState.files.findIndex((item) => item.name === payload),
        1
      );
      return newState;
    },
    updateInvoiceStatus: (state, { payload }) => {
      console.log("PAYLOAD", payload);
      const newState = state;
      newState.invoicesR.map((inv) => {
        if (inv.invoiceId === payload.id) {
          console.log("INV", inv);
        }
      });
    },
  },
  extraReducers: (builder) => {
    getAsyncCompanies(builder);
    sendAsyncInvoiceXML(builder);
    searchAsyncInvoices(builder);
    sendAsyncInvoice(builder);
  },
});

export const { setManyFiles, removeFile, updateInvoiceStatus } =
  invoicesSlice.actions;

export default invoicesSlice.reducer;

function sendAsyncInvoice(builder: ActionReducerMapBuilder<FeatureState>) {
  builder.addCase(sendInvoce.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
  }));
  builder.addCase(sendInvoce.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(sendInvoce.rejected, (state) => ({
    ...state,
    loading: false,
  }));
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

function sendAsyncInvoiceXML(builder: ActionReducerMapBuilder<FeatureState>) {
  builder.addCase(sendInvoceXml.fulfilled, (state, { payload }) => {
    const newState = state;
    newState.files.map((item: IFile) => {
      if (item.name === (payload as any)) {
        item.status = FileStatus.ACCEPTED;
      }
      return item;
    });
    newState.loading = false;
    return newState;
  });
  builder.addCase(sendInvoceXml.pending, (state) => ({
    ...state,
    loading: true,
  }));

  builder.addCase(sendInvoceXml.rejected, (state, { payload }) => {
    const newState = state;
    newState.files.map((item: IFile) => {
      if (item.name === (payload as any).id) {
        item.error = (payload as any).error;
        item.status = FileStatus.HAS_ERROR;
      }
      return item;
    });
    newState.loading = false;
    return newState;
  });
}
// TODO
function searchAsyncInvoices(builder: ActionReducerMapBuilder<FeatureState>) {
  builder.addCase(searchInvoices.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
    invoicesR: payload,
  }));
  builder.addCase(searchInvoices.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(searchInvoices.rejected, (state) => ({
    ...state,
    loading: false,
    invoicesR: [],
  }));
}
