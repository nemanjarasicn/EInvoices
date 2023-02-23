import publicClient from './htpp-public-gov';
import publicClientZip from '../services/htpp-public-gov_zip';
import commonHttpClient from '../../../app/http-common';
import dayjs from 'dayjs';
import { jsonBlob } from '../utils/utils';
import { faGameConsoleHandheld } from '@fortawesome/pro-solid-svg-icons';
import { AutocompleteItem } from '../components/form-fields/models/form-fields.models';

class InvoicePublicService {
  public getProducts(marketPlace: string) {
    // TODO
    const config = {
      headers: { PETCOM: 'dejan' },
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
    return commonHttpClient.post<any>('invoices/search', params);
  }

  public stornoSales(data: any, apiKey: string) {
    const dataToSend = {
      invoiceId: data.invoiceId,
      stornoNumber: '',
      stornoComment: data.comment,
    };
    const config = {
      headers: { apiKey: apiKey },
    };
    return commonHttpClient.put<any>(
      'invoice/sales-storno',
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
      'invoice/sales-cancel',
      {
        ...dataToSend,
      },
      config
    );
  }

  public rejectOrApprovePurchase(data: any, apiKey: string) {
    const dataToSend = {
      invoiceId: data.invoiceId,
      accepted: Boolean(data.actionType === 'approve'),
      comment: data.comment,
    };
    const config = {
      headers: { apiKey: apiKey },
    };
    return commonHttpClient.put<any>(
      'invoice/purchase',
      { ...dataToSend },
      config
    );
  }

  public getCurrentDocNumber(idCompany: any) {
    return commonHttpClient.get<any>(`invoices/search/${idCompany}`);
  }

  public getInvoiceByType(companyId: any, typeDocument?: string | number) {
    const params = {
      companyId: 10000000099,
      inputAndOutputDocuments: 'Output',
      typeDocument: ['386'],
    };
    return commonHttpClient.post<any>('invoices/search', params);
  }

  public sendInvoice(data: any, apiKey: string) {
    /*const config = {
      headers: { apiKey: apiKey },
    };*/

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        apiKey: apiKey,
      },
    };
    const formData = new FormData();
    for (let i = 0; i < data?.filesList.length; i++) {
      formData.append('file', data?.filesList[i]);
    }

    const dataToSend = mapToRequestDTO(
      data.invoice,
      data?.filesList,
      data?.advanceAccountList
    );
    formData.append('invoiceDto', jsonBlob(dataToSend));
    //return commonHttpClient.post<any>("invoice", { ...dataToSend }, config);
    return commonHttpClient.post<any>(`/invoice/create`, formData, config);
  }

  // Public E-Fakture

  public getAllUnitMesures() {
    return publicClient.get<any[]>('/get-unit-measures');
  }

  public getAllSalesInvoiceIds() {
    return publicClient.get<number[]>('/sales-invoice/ids');
  }

  public getAllPurchasesInvoiceIds() {
    return publicClient.get<number[]>('/purchase-invoice/ids');
  }

  public getAllCompanies() {
    return publicClient.get<any[]>('/getAllCompanies');
  }

  getZip(
    id: number | string,
    typeDocument: number | string,
    typeInvoices: number | string,
    apiKey: string
  ) {
    const config = {
      headers: {
        'content-type': 'application/json',
        apiKey: apiKey,
      },
    };
    return publicClientZip.get<any>(
      `invoices/search/${typeInvoices}/${id}/${typeDocument}`,
      config
    );
  }

  getInvoiceDetails(id: number | string) {
    return commonHttpClient.get<any>(`invoices/search/invoiceDetails/${id}`);
  }

  public getTaxBase() {
    return publicClient.get<any[]>('/tax/base/1');
  }

  /**
   * UPLOAD MULTIPART FORM DATA //TODO send in CRF and put in DB file with response data
   * @param file
   * @param requestId
   * @returns
   */
  public sendInvoiceXml(file: File, requestId: string, apiKey: string) {
    const formData = new FormData();
    formData.append('file', file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        apiKey: apiKey,
      },
    };
    return publicClient.post<any>(
      `/sales-invoice/ubl/upload?requestId=${requestId}`,
      formData,
      config
    );
  }

  /*public sendInvoiceFileTest(filesList: File[], apiKey:  string) {
    console.log('sasasasaasaasas',  filesList)
    const formData = new FormData();
    for (let i = 0; i < filesList.length; i++) {
      formData.append(i==0 ? "invoiceDto" : "file", filesList[i])
    }
    //formData.append("file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        apiKey: apiKey,
      },
    };
    return commonHttpClient.post<any>(
      `/invoice/create`,
      formData,
      config
    );
  }*/
}

export default new InvoicePublicService();

function mapToRequestDTO(
  invoice: any,
  filesList: any,
  advanceAccountList?: any[]
): any {
  invoice.issueDate = dayjs(new Date()).format('YYYY-MM-DD'); //dayjs(invoice.issueDate).format("YYYY-MM-DD");
  // ovo se ne salje za knjizna odobrenja
  if (invoice?.invoiceTypeCode !== 381) {
    if (invoice?.invoiceTypeCode !== 386) {
      invoice.dueDate =
        invoice.dueDate.toString() !== 'Invalid Date'
          ? dayjs(invoice.dueDate).format('YYYY-MM-DD')
          : '';
    } else {
      invoice.dueDate =
        invoice.deliveryDate.toString() !== 'Invalid Date'
          ? dayjs(invoice.deliveryDate).format('YYYY-MM-DD')
          : '';
    }
  } else {
    invoice.dueDate = '';
  }
  invoice['discount'] = invoice.priceWithoutDiscount - invoice.sumWithDiscount;
  invoice['sumWithDiscount'] = invoice.priceWithoutDiscount;
  invoice['documentTypeId'] = 1; //uvek je 1 jer si posiljalac
  invoice['invoiceTransactionType'] = 'Sale';
  invoice['invoiceType'] = 'Normal';
  invoice['inputAndOutputDocuments'] = 'Output'; //TODO proveriti kod tipova faktura drugih
  if (invoice?.invoiceTypeCode !== 381 && invoice?.invoiceTypeCode !== 383) {
    invoice['invoicePeriod'] = [{ descriptionCode: invoice.vatPointDate }];
  } else {
    const descriptionCodeTmp = invoice?.invoiceTypeCode === 381 ? 0 : 3;
    if (invoice?.sourceInvoiceSelectionMode === 2) {
      invoice['invoicePeriod'] = [
        {
          descriptionCode: descriptionCodeTmp, //uvek je 0 kada je knjizno odobrenje,
          startDate: dayjs(invoice?.modePeriodFrom).format('YYYY-MM-DD'), //'2023-01-26',
          endDate: dayjs(invoice?.modePeriodTo).format('YYYY-MM-DD'), //"2023-01-27"
        },
      ];
    } else {
      invoice['invoicePeriod'] = [
        {
          descriptionCode: descriptionCodeTmp, //uvek je 0 kada je knjizno odobrenje,
        },
      ];
    }
  }
  invoice['orderReference'] = {
    id: invoice.orderNumber,
  };
  invoice['contractDocumentReference'] = [
    {
      id: invoice.contractNumber,
    },
  ];
  invoice['originatorDocumentReference'] = [
    {
      id: invoice.lotNumber,
    },
  ];

  // ovo se ne salje za avansne
  if (
    invoice?.invoiceTypeCode !== 386 &&
    invoice?.invoiceTypeCode !== 381 &&
    invoice?.invoiceTypeCode !== 383
  ) {
    invoice['delivery'] = {
      actualDeliveryDate: dayjs(invoice.deliveryDate).format('YYYY-MM-DD'),
    };
  }

  if (
    (invoice?.invoiceTypeCode === 381 || invoice?.invoiceTypeCode === 383) &&
    invoice?.sourceInvoiceSelectionMode === 1
  ) {
    invoice['billingReferences'] = [
      {
        invoiceDocumentReference: {
          id: invoice?.sourceInvoice,
          issueDate: dayjs(new Date()).format('YYYY-MM-DD'),
        },
      },
    ];
  }

  if (invoice?.invoiceTypeCode === 380 && advanceAccountList?.length) {
    invoice['finalBill'] = '380';
    invoice['billingReferences'] = advanceAccountList?.map((item: any) => ({
      invoiceDocumentReference: {
        id: item?.name,
        idAdvancedPayment: item?.id,
      },
    }));
  }

  if (filesList.length) {
    invoice['additionalDocumentReference'] = filesList.map((item: any) => ({
      id: item?.name,
    }));
  }
  return invoice;
}
