import {
  SourceSelectionMode,
  VATPointDate,
} from '../components/form-fields/models/form-fields.models';
import { CountryCode, Currency, FileStatus, SchemeID } from './invoice.enums';

/**
 * Generic for Table Data
 */
export type TableData<T> = { id: number } & T;

/**
 * Generic for Components Props
 */
export interface IProps<T> {
  props: T;
}
/**
 * Invoice Dto
 */
export interface InvoiceDto {
  InvoiceId: number; // Invoice Number
  InvoiceNumber: string | number | null; //Document number
  InvoiceType: string | null; // Document type
  CirInvoiceId: string | null; // CIR ID
  CirStatus: string | null; // CIR Status
  Status: string | null; // Status
  Receiver: string | null; // Client
  TotalToPay: string | number | null; //Amount
  Supplier: string | number | null; // Supplier
  // DATUMI PROVERIT
  InvoiceDateUtc: number | string | null; // Delivery date
  InvoiceSentDateUtc: number | string | null; //Sent date
  PaymentDateUtc: number | string | null; //due date
  // CreatedUtc: number | string | null;
  // LastModifiedUtc: number | string | null;

  ReferenceNumber: string | null; // Reference number
  ServiceProvider: string | null; //Document channel
  ChannelAdress: string | number | null; // Document address
}

export interface IFile {
  name: string;
  lastModified: string;
  size: number;
  type: string;
  id: number;
  status: FileStatus;
  error: IErrorFile | null;
}
export interface IErrorFile {
  ErrorCode: string;
  FieldName: string;
  Message: string;
}
export enum InvoiceType {
  INVOICE = 380, // комерцијална фактура
  CREDIT_NOTE = 381, //књижно одобрење
  DEBIT_NOTE = 383, // књижно задужење
  PREPAYMENT = 386, // авансна фактура
}

// uvek za 380
// "invoiceTransactionType":"Sale",
// "invoiceType":"Normal",
// "inputAndOutputDocuments":"Output",

// <cac:PaymentMeans>
//         <cbc:PaymentMeansCode>30</cbc:PaymentMeansCode>
//         <cbc:PaymentID>(mod97) 123456789</cbc:PaymentID> kombina
//         <cac:PayeeFinancialAccount>
//           <cbc:ID>285233100000025379</cbc:ID> broj tekuceg racuna pravnog lica
//         </cac:PayeeFinancialAccount>
//       </cac:PaymentMeans>

// FORM MODELS ////////////////////////////////////////////////////////////
export class InvoiceFormModel {
  id: string = '';
  invoiceTypeCode: InvoiceType = InvoiceType.INVOICE;
  issueDate: Date = new Date();
  deliveryDate: Date = new Date();
  dueDate: Date = new Date();
  vatPointDate: VATPointDate = VATPointDate.ISSUING_DATE;
  sourceInvoiceSelectionMode: SourceSelectionMode = SourceSelectionMode.SINGLE;
  sourceInvoice: string = '';
  modePeriodFrom: Date = new Date();
  modePeriodTo: Date = new Date();
  documentCurrencyCode: Currency = Currency.RSD;

  warehouse_uuid: string = '';
  contractNumber: string = '';
  orderNumber: string = '';
  lotNumber: string = '';
  modelNumber: string = '';
  referenceNumber: string = '';
  finalSum: number = 0;

  priceWithoutDiscount: number = 0;
  sumWithDiscount: number = 0;
  taxableAmount: number = 0; // osnovica za pdv
  taxAmount: number = 0;
  paymentMeans: any[] = [];
  legalMonetaryTotal: any = null;
  taxTotal: any[] = [];

  invoiceLine: ProductModel[] = []; //stavke
  accountingCustomerParty: CustomerPartyModel | null = null;
  note: string = '';
  advanceAccount: any[] = [];

  public constructor(init?: Partial<InvoiceFormModel>) {
    Object.assign(this, init);
  }
}

export interface ProductModel {
  idUnit: number;
  idVat: number;
  vatName: string;
  unitCode: string;
  currencyID: string;
  id: number;
  invoicedQuantity: number;
  lineExtensionAmount: number;
  allowanceCharge: {
    currencyId: string;
    chargeIndicator: boolean;
    multiplierFactorNumeric: number | string;
    amount: number;
  };
  item: {
    idProduct: number;
    name: string;
    sellersItemIdentification: { id: number };
    classifiedTaxCategory: {
      id: number;
      taxScheme: { id: string };
      percent: number;
    };
  };
  price: {
    priceAmount: number;
    discount: number;
    newPrice: number;
    unitPrice: number;
    unitTaxAmount: number;
  };
  taxCode?: string;
  taxName?: string;
  taxValue1?: number | string;
  baseCode?: string;
  unitName?: string | number;
}

export interface CustomerPartyModel {
  party: {
    schemeID: SchemeID;
    endpointID: number;
    partyName: { name: string }[];
  };
  postalAddress: {
    streetName: string;
    cityName: string;
    zip: string;
    country: { identificationCode: CountryCode };
  };
  partyTaxScheme: {
    companyID: string;
    taxScheme: { id: string };
  };
  partyLegalEntity: {
    registrationName: string;
    companyID: number;
  };
  contact: { electronicMail: string };
  jbkjs?: string;
}

export interface InvoiceSearchParams {
  companyId: string;
  inputAndOutputDocuments?: string;
  sendToCir?: string;
  invoiceStatus?: string[];
  subjectId?: string;
  typeDocument?: string[];
  date?: { from: string; to: string };
}
