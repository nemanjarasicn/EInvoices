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

const getAllUnitMesures: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/Units",
  async () => {
    return await InvoicePublicService.getAllUnitMesures()
      .then((res) => res.data)
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

export {
  getSalesInvoices,
  getPurchaseInvoices,
  getAllUnitMesures,
  getAllCompanies,
};
