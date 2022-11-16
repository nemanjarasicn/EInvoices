import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import InvoicePublicService from "../services/invoice.service";

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
const searchInvoices: AsyncThunk<any, { params: any }, {}> = createAsyncThunk<
  any,
  { params: any }
>("POST/SearchInvoices", async (searchDTO, _) => {
  return await InvoicePublicService.searchInvoices(searchDTO)
    .then((res) => res.data)
    .catch((err) => []);
});

/**
 * Create Async Action send E-Invoic via DTO
 */
const sendInvoce: AsyncThunk<any, { invoice: any }, {}> = createAsyncThunk<
  any,
  { invoice: any }
>("POST/Invoice", async (invoiceDto, _) => {
  return await InvoicePublicService.sendInvoice(invoiceDto).then(
    (data) => console.log("ACTION DATA", data),
    (err) => console.log("ACTION ERR", err)
  );
});

export { getAllCompanies, sendInvoceXml, searchInvoices, sendInvoce };
