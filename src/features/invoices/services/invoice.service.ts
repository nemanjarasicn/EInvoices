import publicClient from "./htpp-public-gov";
import commonHttpClient from "../../../app/http-common";
import mockClient from "./json.mock.http";

class InvoicePublicService {
  get() {
    return commonHttpClient.get<any>("/provider");
  }

  getInvoicesSales() {
    return mockClient.get<any>("invoices-sales.json");
  }

  getInvoicesPurchase() {
    return mockClient.get<any>("invoices-purchase.json");
  }

  // Public E-Fakture

  public getAllUnitMesures() {
    return publicClient.get<any[]>("/get-unit-measures");
  }

  public getAllSalesInvoiceIds() {
    return publicClient.get<number[]>("/sales-invoice/ids");
  }

  public getAllPurchasesInvoiceIds() {
    return publicClient.get<number[]>("/purchase-invoice/ids");
  }

  public getAllCompanies() {
    return publicClient.get<any[]>("/getAllCompanies");
  }
}
export default new InvoicePublicService();
