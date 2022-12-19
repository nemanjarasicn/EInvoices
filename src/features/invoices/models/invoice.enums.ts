export enum InvoiceStatus {
  NEW = "New",
  DRAFT = "Draft",
  SENT = "Sent",
  CANCELLED = "Cancelled",
  APPROVED = "Approved",
  REJECTED = "Rejected",
  STORNO = "Storno",
  SENDING = "Sending",
  PAID = "Paid",
  MISTAKE = "Mistake",
  OVER_DUE = "OverDue",
  ARCHIVED = "Archived",
  DELETED = "Deleted",
  UNKNOWN = "Unknown",
  SEEN = "Seen",
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

