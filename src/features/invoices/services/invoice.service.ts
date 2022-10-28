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

  getClientCompanies() {
    return mockClient.get<any>("client.json");
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

  /**
   * UPLOAD MULTIPART FORM DATA //TODO send in CRF
   * @param file
   * @param requestId
   * @returns
   */
  public sendInvoiceXml(file: File, requestId: string) {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    return publicClient.post<any>(
      `/sales-invoice/ubl/upload?requestId=${requestId}`,
      formData,
      config
    );
  }
}
export default new InvoicePublicService();
