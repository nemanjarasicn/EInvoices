// TODO Capital letter uppercase string representation
export enum SalesInvoiceStatus {
  NEW,
  DRAFT,
  SENT,
  PAID,
  MISTAKE,
  OVER_DUE,
  ARCHIVED,
  SSENDING,
  DELETED,
  APPROVED,
  REJECTED,
  CANCELLED,
  STORNO,
  UNKNOWN,
}
// TODO Capital letter uppercase string representation
export enum PurchaseInvoiceStatus {
  NEW,
  SEEN,
  REMINDED,
  RE_NOTIFIED,
  RECIVED,
  DELETED,
  APPROVED,
  REJECTED,
  CANCELLED,
  STORNO,
  UNKNOWN,
}

export enum TemplatePageTypes {
  SALES = "sales",
  PURCHASES = "purchases",
  // VAT = "vat",
  // CIR = "cir",
  // SEARCH = "search",
  // RECORDS = "records",
}

export enum HeaderSettingsTypes {
  SALES = "sales",
  PURCHASES = "purchases",
  // VAT = "vat",
  // CIR = "cir",
  // SEARCH = "search",
  // RECORDS = "records",
}
