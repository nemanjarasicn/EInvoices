import {
  SourceSelectionMode,
  VATPointDate,
} from "../components/form-fields/models/form-fields.models";
import { FileStatus } from "./invoice.enums";

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

export class Company {
  id?: number = 0;
  companyName: string = "";
  registrationCode: string = ""; //MB
  vatRegistrationCode: string = ""; //PIB
  address?: string = "";

  public constructor(init?: Partial<InvoiceFormModel>) {
    Object.assign(this, init);
  }
}

// FORM MODELS ////////////////////////////////////////////////////////////
export class InvoiceFormModel {
  invoiceTypeCode: InvoiceType = InvoiceType.INVOICE;
  issueDate: Date = new Date();
  dueDate: Date = new Date();
  vatPointDate: VATPointDate = VATPointDate.ISSUING_DATE;
  sourceInvoiceSelectionMode: SourceSelectionMode = SourceSelectionMode.SINGLE;
  sourceInvoice: string = "";
  modePeriodFrom: Date = new Date();
  modePeriodTo: Date = new Date();
  client: Company = new Company();

  public constructor(init?: Partial<InvoiceFormModel>) {
    Object.assign(this, init);
  }
}
