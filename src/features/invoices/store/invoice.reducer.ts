import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import { FileStatus } from "../models";
import { IFile } from "../models/invoice.models";
import { InvoiceSearchParams }  from  "../models/invoice.models"
import {
  getAllCompanies,
  searchInvoices,
  sendInvoce,
  sendInvoceXml,
  getZip,
  getTaxBase,
  getInvoiceDetails
} from "./invoice.actions";

const FEATURE_INVOICES_KEY: string = "invoices";

export interface FeatureState {
  unitMesures: any[];
  companies: any[];
  loading: boolean;
  files: IFile[];
  invoicesR: any[];
  zip: any;
  openModalConfirm:  {open: boolean, dataAction?: any };
  openModalPdf:  {open: boolean, data?: any };
  openModalFilter:  {open: boolean, filterName:  string }  ;
  invoiceDetails: any;
  filters: InvoiceSearchParams;
  taxBase: any[];
  
}
const initialState: FeatureState = {
  unitMesures: [],
  loading: false,
  companies: [],
  files: [],
  invoicesR: [],
  zip:   [],
  openModalConfirm:  {open: false, dataAction: "" },
  openModalPdf:  {open: false, data: "" },
  openModalFilter:  {open: false, filterName: ""},
  invoiceDetails:  "",
  filters: {
    companyId: "7",
    inputAndOutputDocuments:  "Output",
    //sendToCir: "",
   
    date: {from: "", to: ""}
  },
  taxBase:  []
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
      const newState = state;
      newState.invoicesR.map((inv) => {
        if (
          inv.salesInvoiceId === payload.id &&
          (payload.status === "Cancelled" || payload.status === "Storno" )
        ) {
          inv.invoiceStatus = payload.status;
        } else if( inv.purchaseInvoiceId === payload.id &&
          (  payload.status === "Approved"  ||   payload.status  ===  "Rejected")) {
            inv.invoiceStatus = payload.status;
        }
        return inv;
      });
      return newState;
    },

    setopenModalConfirm: (state,{payload}) => ({
      ...state,
      openModalConfirm: payload,
    }),

    
    setopenModalPdf: (state,{payload}) => ({
      ...state,
      openModalPdf: payload,
    }),

    setopenModalFilter: (state,{payload}) => ({
      ...state,
      openModalFilter: payload,
    }),

    setFilters: (state,{payload}) => ({
      ...state,
      filters: payload,
    }),
  },
  extraReducers: (builder) => {
    getAsyncCompanies(builder);
    sendAsyncInvoiceXML(builder);
    searchAsyncInvoices(builder);
    sendAsyncInvoice(builder);
    getAsyncZipFile(builder);
    getAsyncTaxBase(builder);
    getAsyncInvoiceDetails(builder);
  },
});

export const { setManyFiles, removeFile, updateInvoiceStatus, setopenModalPdf, setopenModalFilter, setFilters,  setopenModalConfirm } =
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

function getAsyncZipFile(builder: ActionReducerMapBuilder<FeatureState>) {
  builder.addCase(getZip.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
    error: "",
    zip: payload,
  }));
  builder.addCase(getZip.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getZip.rejected, (state, { payload }) => ({
    ...state,
    loading: false,
    zip: [],
    error: (payload as any).error,
  }));
}

function getAsyncTaxBase(builder: ActionReducerMapBuilder<FeatureState>) {
  builder.addCase(getTaxBase.fulfilled, (state, { payload }) => ({
    ...state,
    companies: payload,
    loading: false,
  }));
  builder.addCase(getTaxBase.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getTaxBase.rejected, (state) => ({
    ...state,
    loading: false,
    companies: [],
  }));
}


function getAsyncInvoiceDetails(builder: ActionReducerMapBuilder<FeatureState>) {
  builder.addCase(getInvoiceDetails.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
    error: "",
    invoiceDetails: payload,
  }));
  builder.addCase(getInvoiceDetails.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getInvoiceDetails.rejected, (state, { payload }) => ({
    ...state,
    loading: false,
    invoiceDetails: [],
    error: (payload as any).error,
  }));
}

