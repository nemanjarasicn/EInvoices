import publicClient from "./htpp-public-gov";
import commonHttpClient from "../../../app/http-common";
import mockClient from "./json.mock.http";

class InvoicePublicService {
  // MOCK CLIENT

  getInvoicesSales() {
    return mockClient.get<any>("invoices-sales.json");
  }

  getInvoicesPurchase() {
    return mockClient.get<any>("invoices-purchase.json");
  }

  //TODO commonHttpClient api/v1/search/products/${marketplaceUid}
  public getProducts(marketPlace: string) {
    return mockClient.get<any>("product.json");
  }

  //TODO commonHttpClient api/v1/subject/1
  getCustomerSubjects(companyId: number | string) {
    return mockClient.get<any>("client.json");
  }

  //TODO commonHttpClient api/v1/marketplace/company/${companyId}
  getMarketPlaces(companyId: number | string) {
    return mockClient.get<any>("market-places.json");
  }
  // DTO
  // {
  //   "invoiceStatus":"Sent",
  //   "typeDocument":"381",
  //   "inputAndOutputDocuments":"Input"

  //  }
  // TODO commonHttpClient api/v1/invoices/search POST
  // searchInvoices(searchDTO: any) {
  //   console.log("SEARCHDTO", searchDTO);
  //   return mockClient.get<any>("invoices-sales.json");
  // }
  searchInvoices(searchDTO: any) {
    const { params } = searchDTO;
    return commonHttpClient.post<any>("invoices/search", {
      invoiceStatus: "Sent",
      typeDocument: "381",
      inputAndOutputDocuments: "Input",
    });
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
