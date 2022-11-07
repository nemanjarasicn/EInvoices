import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import InvoicePublicService from "../services/invoice.service";
/**
 * Async Custom Actions
 */
const getSalesInvoices: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/SalesInvoices",
  async () => {
    return await InvoicePublicService.getInvoicesSales()
      .then((res) => res.data.Invoices)
      .catch((err) => []);
  }
);

const getPurchaseInvoices: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/PurchaseInvoices",
  async () => {
    return await InvoicePublicService.getInvoicesPurchase()
      .then((res) => res.data.Invoices)
      .catch((err) => []);
  }
);

const getAllCompanies: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/Companies",
  async () => {
    return await InvoicePublicService.getAllCompanies()
      .then((res) => res.data)
      .catch((err) => []);
  }
);

/**
 * Create Async Action send E-Invoic via XML
 */
const sendInvoceXml: AsyncThunk<any, { file: File; id: string | number }, {}> =
  createAsyncThunk<any, { file: File; id: string | number }>(
    "POST/InvocieXML",
    async (asyncDTO, _) => {
      return await InvoicePublicService.sendInvoiceXml(
        asyncDTO.file,
        _.requestId
      ).then(
        (data) => asyncDTO.id,
        (err) =>
          _.rejectWithValue({ error: err.response.data, id: asyncDTO.id })
      );
    }
  );

/**
 * Search Invoices
 */
const searchInvoices: AsyncThunk<any, { params: Map<string, any[]> }, {}> =
  createAsyncThunk<any, { params: Map<string, any[]> }>(
    "POST/SearchInvoices",
    async (searchDTO, _) => {
      return await InvoicePublicService.searchInvoices(searchDTO)
        .then((res) => res.data.Invoices)
        .catch((err) => []);
    }
  );

export {
  getSalesInvoices,
  getPurchaseInvoices,
  getAllCompanies,
  sendInvoceXml,
  searchInvoices,
};
