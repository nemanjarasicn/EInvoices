// TODO Capital letter uppercase string representation
export enum ArticlesStatus {
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
  
  export enum TemplatePageArticlesTypes {
    LIST =  "list",
    SUBJECT  =   "subject"
    // VAT = "vat",
    // CIR = "cir",
    // SEARCH = "search",
    // RECORDS = "records",
  }
  
  export enum HeaderSettingsTypes {
    LIST  =  "list", 
    SUBJECT  = "subject"
    // VAT = "vat",
    // CIR = "cir",
    // SEARCH = "search",
    // RECORDS = "records",
  }
  
  
  export enum Currency {
    RSD = "RSD",
  }

  export enum CreateType {
    FORMARTICLES  = "Articles",
    FORMARTICLESPRICE =  "articlesPrice",
    FORMSUBJECT  =  "subject"
  }
  
  export enum SchemeID {
    NOT_CIR = "9948",
    CIR = "",
  }
  
  export enum CountryCode {
    RS = "RS",
  }
  