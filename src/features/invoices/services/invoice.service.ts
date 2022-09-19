import httpClient from "./htpp-public-gov";
import commonHttpClient from "../../../app/http-common";
import mockClient from "./json.mock.http";

class InvoicePublicService {
  public getAll() {
    return httpClient.get<any[]>("/get-unit-measures");
  }
  get() {
    return commonHttpClient.get<any>("/provider");
  }

  getInvoicesSales() {
    return mockClient.get<any>("invoices-sales.json");
  }

  getInvoicesPurchase() {
    return mockClient.get<any>("invoices-purchase.json");
  }
}
export default new InvoicePublicService();
