import { AsyncThunk, createAsyncThunk } from '@reduxjs/toolkit';
import InvoicePublicService from '../services/invoice.service';
import {
  createMonetaryTotal,
  createPaymentMeans,
  createSupplayerData,
  mapInvoiceLinesCreateTaxTotal,
} from '../utils/utils';
import { updateInvoiceStatus } from './invoice.reducer';

const getAllCompanies: AsyncThunk<any, void, {}> = createAsyncThunk(
  'GET/Companies',
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
    'POST/InvocieXML',
    async (asyncDTO, _) => {
      const { core } = (_ as any).getState();
      const { apiKey } = core.userCompany;
      return await InvoicePublicService.sendInvoiceXml(
        asyncDTO.file,
        _.requestId,
        apiKey
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
>('POST/SearchInvoices', async (searchDTO, _) => {
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
const sendInvoce: AsyncThunk<
  any,
  {
    invoice: any;
    companyInfo?: any;
    filesList: any[];
    advanceAccountList?: any[];
  },
  {}
> = createAsyncThunk<
  any,
  {
    invoice: any;
    companyInfo?: any;
    filesList: any[];
    advanceAccountList?: any[];
  }
>('POST/Invoice', async (invoiceDto, _) => {
  const { core } = (_ as any).getState();
  const { apiKey } = core.userCompany;
  const payeeFinancialAccountDtoCompany =
    invoiceDto?.companyInfo?.payeeFinancialAccountDto;
  

  (invoiceDto.invoice as any)['paymentMeans'] = createPaymentMeans(
    payeeFinancialAccountDtoCompany,
    invoiceDto.invoice.referenceNumber,
    invoiceDto.invoice.modelNumber
  );

  (invoiceDto.invoice as any)['idCompany'] = core.userCompany.idCompany;
  (invoiceDto.invoice as any)['note'] = [invoiceDto.invoice.note];
  /*if(invoiceDto.invoice.accountingCustomerParty.jbkjs)   {
      (invoiceDto.invoice as any)["buyerReference"] =  invoiceDto.invoice.accountingCustomerParty.jbkjs;
   }*/

  if (invoiceDto.invoice.accountingCustomerParty.jbkjs) {
    (invoiceDto.invoice as any)['sendToCir'] = 'Yes';
  }

  (invoiceDto.invoice as any)['accountingSupplierParty'] = createSupplayerData(
    core.userCompany
  );
  (invoiceDto.invoice as any)['legalMonetaryTotal'] =
    createMonetaryTotal(invoiceDto);
  (invoiceDto.invoice as any)['taxTotal'] = mapInvoiceLinesCreateTaxTotal(
    invoiceDto.invoice.invoiceLine
  );

  invoiceDto.invoice['invoiceLine'].map((item: any) => ({
    ...item,
    lineExtensionAmount: Number(item.lineExtensionAmount.toFixed(2)),
  }));

  return await InvoicePublicService.sendInvoice(invoiceDto, apiKey).then(
    (data) => _.fulfillWithValue({ message: 'REDIRECT', data: data }),
    (err) => _.rejectWithValue({ message: 'ERR', error: err })
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

  switch (asyncDto.actionType) {
    case 'storno':
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
        (err) => console.log('Error', err)
      );
    case 'cancel':
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
        (err) => console.log('Error', err)
      );
    case 'approve':
      return await InvoicePublicService.rejectOrApprovePurchase(
        { ...asyncDto, invoiceId: found.purchaseInvoiceId },
        apiKey
      ).then(
        (response) =>
          _.dispatch(
            updateInvoiceStatus({
              id: found?.purchaseInvoiceId,
              status: response.data?.Invoice?.Status,
            })
          ), //console.log("ACTION DATA", data),
        (err) => console.log('Error', err)
      );
    case 'reject':
      return await InvoicePublicService.rejectOrApprovePurchase(
        { ...asyncDto, invoiceId: found.purchaseInvoiceId },
        apiKey
      ).then(
        (response) =>
          _.dispatch(
            updateInvoiceStatus({
              id: found?.purchaseInvoiceId,
              status: response.data?.Invoice?.Status,
            })
          ), // console.log("ACTION DATA", data),
        (err) => console.log('ACTION ERR', err)
      );
    default:
      throw new Error('No such action type');
  }
});

const getZip: AsyncThunk<
  any,
  {
    id: number | string;
    typeDocument: number | string;
    typeInvoices: number | string;
  },
  {}
> = createAsyncThunk<
  any,
  {
    id: number | string;
    typeDocument: number | string;
    typeInvoices: number | string;
  }
>('GET/getZip', async (data, _) => {
  const { core } = (_ as any).getState();
  const { apiKey } = core.userCompany;
  return await InvoicePublicService.getZip(
    data.id,
    data.typeDocument,
    data.typeInvoices,
    apiKey
  )
    .then((res: any) => {
      return res.data;
    })
    .catch((err: any) => []);
});

const getInvoiceDetails: AsyncThunk<any, { id: number | string }, {}> =
  createAsyncThunk<any, { id: number | string }>(
    'GET/getinvoiceDetail',
    async (data, _) => {
      return await InvoicePublicService.getInvoiceDetails(data.id)
        .then((res: any) => {
          return res.data;
        })
        .catch((err: any) => []);
    }
  );

const getTaxBase: AsyncThunk<any, void, {}> = createAsyncThunk(
  'GET/taxBase',
  async () => {
    return await InvoicePublicService.getTaxBase()
      .then((res) => res.data)
      .catch((err) => []);
  }
);

export {
  getAllCompanies,
  sendInvoceXml,
  searchInvoices,
  sendInvoce,
  updateStatusInvoice,
  getZip,
  getTaxBase,
  getInvoiceDetails,
};
