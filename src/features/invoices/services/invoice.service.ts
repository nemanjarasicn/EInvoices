import publicClient from "./htpp-public-gov";
import publicClientZip from "../services/htpp-public-gov_zip"
import commonHttpClient from "../../../app/http-common";
import dayjs from "dayjs";

class InvoicePublicService {
  public getProducts(marketPlace: string) {
    // TODO
    const config = {
      headers: { PETCOM: "dejan" },
    };
    return commonHttpClient.get<any>(
      `search/products/pm/${marketPlace}`,
      config
    );
  }

  public getCustomerSubjects(companyId: number | string) {
    return commonHttpClient.get<any>(`subject/${companyId}`);
  }

  public getMarketPlaces(companyId: number | string) {
    return commonHttpClient.get<any>(`marketplace/company/${companyId}`);
  }

  public getDocumentsTypes() {
    return commonHttpClient.get<any>(`documents/type`);
  }

  public searchInvoices(searchDTO: any) {
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
    if (!params.date) {
      delete params.date; 
    }
    return commonHttpClient.post<any>("invoices/search", params);
  }

  public stornoSales(data: any, apiKey: string) {
    const dataToSend = {
      invoiceId: data.invoiceId,
      stornoNumber: "",
      stornoComment: data.comment,
    };
    const config = {
      headers: { apiKey: apiKey },
    };
    return commonHttpClient.put<any>(
      "invoice/sales-storno",
      { ...dataToSend },
      config
    );
  }

  public cancelSales(data: any, apiKey: string) {
    const dataToSend = {
      invoiceId: data.invoiceId,
      cancelComments: data.comment,
    };
    const config = {
      headers: { apiKey: apiKey },
    };
    return commonHttpClient.put<any>(
      "invoice/sales-cancel",
      {
        ...dataToSend,
      },
      config
    );
  }

  public rejectOrApprovePurchase(data: any, apiKey: string) {
    const dataToSend = {
      invoiceId: data.invoiceId,
      accepted: Boolean(data.actionType === "approve"),
      comment: data.comment,
    };
    const config = {
      headers: { apiKey: apiKey },
    };
    return commonHttpClient.put<any>(
      "invoice/purchase",
      { ...dataToSend },
      config
    );
  }

  public getCurrentDocNumber(idCompany: any) {
    return commonHttpClient.get<any>(`invoices/search/${idCompany}`);
  }

  public sendInvoice(data: any, apiKey: string) {
    const config = {
      headers: { apiKey: apiKey },
    };
    const dataToSend = mapToRequestDTO(data.invoice);
    return commonHttpClient.post<any>("invoice", { ...dataToSend }, config);
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

  getZip(id: number  |   string, typeDocument: number | string,  typeInvoices: number  |  string,  apiKey: string  ) {
    const config = {
      headers: {
        "content-type": "application/json",
        apiKey: apiKey,
      },
    };
    return publicClientZip.get<any>
    (`invoices/search/${typeInvoices}/${id}/${typeDocument}`,config
    );
  }

  public getTaxBase() {
    return publicClient.get<any[]>("/tax/base/1");
  }

  /**
   * UPLOAD MULTIPART FORM DATA //TODO send in CRF and put in DB file with response data
   * @param file
   * @param requestId
   * @returns
   */
  public sendInvoiceXml(file: File, requestId: string, apiKey: string) {
    const formData = new FormData();
    formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        apiKey: apiKey,
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
  invoice.issueDate = dayjs(invoice.issueDate).format("YYYY-MM-DD");
  invoice.dueDate = dayjs(invoice.dueDate).format("YYYY-MM-DD");
  invoice["discount"] = invoice.priceWithoutDiscount - invoice.sumWithDiscount;
  invoice["sumWithDiscount"] = invoice.priceWithoutDiscount;
  invoice["documentTypeId"] = 1; //uvek je 1 jer si posiljalac
  invoice["invoiceTransactionType"] = "Sale";
  invoice["invoiceType"] = "Normal";
  invoice["inputAndOutputDocuments"] = "Output"; //TODO proveriti kod tipova faktura drugih
  invoice["invoicePeriod"] = [{ descriptionCode: invoice.vatPointDate }];
  invoice["orderReference"] = {
    id: invoice.orderNumber,
  };
  invoice["contractDocumentReference"] = [{
    id: invoice.contractNumber,
  }];
  invoice["originatorDocumentReference"] = [{
    id: invoice.lotNumber,
  }];
  invoice["delivery"] = {
    actualDeliveryDate: invoice.issueDate,
  };
  return invoice;
}
