import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import InvoicePublicService from "../services/invoice.service";
import { updateInvoiceStatus } from "./invoice.reducer";

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
    .then((res) => {
      // res.data[0] = { ...res.data[0], invoiceStatus: "New" };
      return res.data;
    })
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

/**
 * Create Async Action update status E-Invoice
 */
const updateStatusInvoice: AsyncThunk<
  any,
  { actionType: string; invoiceId: number | string; invoiceType: string },
  {}
> = createAsyncThunk<
  any,
  { actionType: string; invoiceId: number | string; invoiceType: string }
>(`POST/Update Status Invoice`, async (asyncDto, _) => {
  const { core, invoices } = (_ as any).getState();
  const { apiKey } = core.userCompany;
  const found = invoices.invoicesR.find(
    (item: any) => item.id === asyncDto.invoiceId
  );

  console.log("asyncDto", asyncDto);
  console.log("INVOICE", found);

  switch (asyncDto.actionType) {
    case "storno":
      return await InvoicePublicService.stornoSales(
        { ...asyncDto, invoiceId: found.salesInvoiceId },
        apiKey
      ).then(
        (response) =>
          _.dispatch(
            updateInvoiceStatus({
              id: response.data.InvoiceId,
              status: response.data.Status,
            })
          ),
        (err) => console.log("Error", err)
      );
    case "cancel":
      return await InvoicePublicService.cancelSales(
        { ...asyncDto, invoiceId: found.salesInvoiceId },
        apiKey
      ).then(
        (response) =>
          _.dispatch(
            updateInvoiceStatus({
              id: response.data.InvoiceId,
              status: response.data.Status,
            })
          ),
        (err) => console.log("Error", err)
      );
    case "approve":
      return await InvoicePublicService.rejectOrApprovePurchase(
        { ...asyncDto, invoiceId: found.purchaseInvoiceId },
        apiKey
      ).then(
        (data) => console.log("ACTION DATA", data),
        (err) => console.log("Error", err)
      );
    case "reject":
      return await InvoicePublicService.rejectOrApprovePurchase(
        { ...asyncDto, invoiceId: found.purchaseInvoiceId },
        apiKey
      ).then(
        (data) => console.log("ACTION DATA", data),
        (err) => console.log("ACTION ERR", err)
      );
    default:
      throw new Error("No such action type");
  }
});

export {
  getAllCompanies,
  sendInvoceXml,
  searchInvoices,
  sendInvoce,
  updateStatusInvoice,
};
