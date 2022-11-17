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
}

export enum HeaderSettingsTypes {
  SALES = "sales",
  PURCHASES = "purchases",
}

export enum CreateType {
  XML = "xml",
  FORM = "form",
}

export enum FileStatus {
  PREPARED = "FileStatus.Prepared",
  HAS_ERROR = "FileStatus.HasError",
  ACCEPTED = "FileStatus.Accepted",
}

export enum Currency {
  RSD = "RSD",
}

export enum SchemeID {
  NOT_CIR = "9948",
  CIR = "",
}

export enum CountryCode {
  RS = "RS",
}

export enum Path {
  "sales" = "Output",
  "purchases" = "Input",
}
