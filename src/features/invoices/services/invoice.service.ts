import publicClient from "./htpp-public-gov";
import commonHttpClient from "../../../app/http-common";
import mockClient from "./json.mock.http";
import dayjs from "dayjs";

class InvoicePublicService {
  //TODO commonHttpClient api/v1/search/products/pm/{pmuuid}
  // https://api-gateway.mastersoftware.trampic.info/api/v1/search/products/pm/6205e800d9ce434a
  public getProducts(marketPlace: string) {
    return commonHttpClient.get<any>(`search/products/pm/${marketPlace}`);
  }

  getCustomerSubjects(companyId: number | string) {
    return commonHttpClient.get<any>(`subject/${companyId}`);
  }

  getMarketPlaces(companyId: number | string) {
    return commonHttpClient.get<any>(`marketplace/company/${companyId}`);
  }

  searchInvoices(searchDTO: any) {
    let { params } = searchDTO;

    if (!params.typeDocument) {
      delete params.typeDocument;
    }
    if (!params.invoiceStatus) {
      delete params.invoiceStatus;
    }
    if (!params.sendToCir) {
      delete params.sendToCir;
    }
    return commonHttpClient.post<any>("invoices/search", params);
  }

  //TODO commonHttpClient api/v1/invoice
  sendInvoice(data: any) {
    const dataToSend = mapToRequestDTO(data.invoice);
    return commonHttpClient.post<any>("invoice", { ...dataToSend });
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

function mapToRequestDTO(invoice: any): any {
  console.log("INVOICE", invoice);
  invoice.issueDate = dayjs(invoice.issueDate).format("YYYY-MM-DD");
  invoice.dueDate = dayjs(invoice.dueDate).format("YYYY-MM-DD");
  invoice["discount"] = invoice.priceWithoutDiscount - invoice.sumWithDiscount;

  invoice["documentTypeId"] = 1;
  invoice["invoiceTransactionType"] = "Sale";
  invoice["invoiceType"] = "Normal";
  invoice["inputAndOutputDocuments"] = "Input";

  invoice["orderReference"] = {
    id: invoice.orderNumber,
  };
  console.log("INVOICE", invoice);
  return invoice;
}
