import { createAsyncThunk } from "@reduxjs/toolkit";
import InvoicePublicService from "../services/invoice.service";
/**
 * Async Custom Actions
 */
const getSalesInvoices = createAsyncThunk("GET/SalesInvoices", async () => {
  const response = await InvoicePublicService.getInvoicesSales();
  return response.data.Invoices;
});

const getPurchaseInvoices = createAsyncThunk(
  "GET/PurchaseInvoices",
  async () => {
    const response = await InvoicePublicService.getInvoicesPurchase();
    return response.data.Invoices;
  }
);
export { getSalesInvoices, getPurchaseInvoices };
