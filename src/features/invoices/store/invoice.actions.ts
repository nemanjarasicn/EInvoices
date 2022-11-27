import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import { UserCompany } from "../../../app/core/core.models";
import InvoicePublicService from "../services/invoice.service";
import { calculateTax } from "../utils/utils";
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
  const { core, form } = (_ as any).getState();
  const { apiKey } = core.userCompany;
  const { autocompleteData } = form;
  const foundCompany = autocompleteData.companies.find(
    (buyer: any) =>
      buyer.mb ===
      invoiceDto.invoice.accountingCustomerParty.partyLegalEntity.companyID
  );
  (invoiceDto.invoice as any)["paymentMeans"] = createPaymentMeans(
    foundCompany,
    invoiceDto.invoice.referenceNumber,
    invoiceDto.invoice.modelNumber
  );

  (invoiceDto.invoice as any)["idCompany"] = core.userCompany.idCompany;

  (invoiceDto.invoice as any)["accountingSupplierParty"] = createSupplayerData(
    core.userCompany
  );
  (invoiceDto.invoice as any)["legalMonetaryTotal"] = createMonetaryTotal(
    invoiceDto.invoice
  );
  (invoiceDto.invoice as any)["taxTotal"] = createTaxTotal(
    invoiceDto.invoice.invoiceLine
  );

  invoiceDto.invoice["invoiceLine"].map((item: any) => ({
    ...item,
    lineExtensionAmount: Number(item.lineExtensionAmount.toFixed(2)),
  }));

  return await InvoicePublicService.sendInvoice(invoiceDto, apiKey).then(
    (data) => _.fulfillWithValue("REDIRECT"),
    (err) => _.rejectWithValue("ERR")
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

function createSupplayerData(userCompany: UserCompany): any {
  console.log("USER COMP", userCompany);

  return {
    party: {
      schemeID: "9948",
      endpointID: userCompany.pib,
      partyName: [
        {
          name: userCompany.companyName,
        },
      ],
    },
    postalAddress: {
      cityName: userCompany.city,
      country: {
        identificationCode: "RS",
      },
    },
    partyTaxScheme: {
      companyID: `RS${userCompany.pib}`,
      taxScheme: {
        id: "VAT",
      },
    },
    partyLegalEntity: {
      registrationName: userCompany.companyName,
      companyID: userCompany.mb,
    },
    contact: {
      electronicMail: "dbogi89@gmail.com", //TODO
    },
  };
}
function createPaymentMeans(foundComapny: any, ref: any, model: any): any[] {
  const accounts: any[] = [];
  foundComapny.payeeFinancialAccountDto.map((item: any) => {
    let acc = {
      paymentMeansCode: "30", //TODO
      paymentID: `(mod${model}) ${ref}`,
      payeeFinancialAccount: {
        id: item.payeeFinancialAccountValue, // id tekuceg racuna
      },
    };
    accounts.push(acc);
  });
  return accounts;
}
function createMonetaryTotal(invoice: any): any {
  // console.log("CIFRE", invoice);

  return {
    currencyId: "RSD",
    lineExtensionAmount: Number(invoice.taxableAmount.toFixed(2)),
    taxExclusiveAmount: Number(invoice.taxableAmount.toFixed(2)),
    taxInclusiveAmount: Number(invoice.finalSum.toFixed(2)),
    allowanceTotalAmount: 0,
    prepaidAmount: 0,
    payableAmount: invoice.finalSum.toFixed(2),
  };
}

function createTaxTotal(invoiceLine: any): any[] {
  invoiceLine.map((item: any, index: number) => {
    item.allowanceCharge.multiplierFactorNumeric = Number(item.price.discount);
    item.lineExtensionAmount =
      item.invoicedQuantity * item.price.newPrice - item.price.unitTaxAmount;
    item.id = index + 1;
    item.price.priceAmount = Number(
      (
        item.price.unitPrice -
        calculateTax(
          item.price.unitPrice,
          item.item.classifiedTaxCategory.percent
        )
      ).toFixed(2)
    );
    item.allowanceCharge.amount = Number(
      (
        (item.price.priceAmount -
          item.lineExtensionAmount / item.invoicedQuantity) *
        item.invoicedQuantity
      ).toFixed(2)
    );
    item.price.discount = Number(
      (item.price.unitPrice - item.price.newPrice) * item.invoicedQuantity
    ).toFixed(2);
    item.lineExtensionAmount = Number(item.lineExtensionAmount.toFixed(2));
    item.price.unitTaxAmount = Number(item.price.unitTaxAmount.toFixed(2));
    return item;
  });
  // TODO ZA MENE
  return [
    {
      currencyId: "RSD",
      taxAmount: 20,
      taxSubtotal: [
        {
          currencyId: "RSD",
          taxableAmount: 100,
          taxAmount: 20,
          taxCategory: {
            id: "S",
            percent: 20,
            taxScheme: {
              id: "VAT",
            },
          },
        },
      ],
    },
  ];
}
