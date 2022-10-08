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
