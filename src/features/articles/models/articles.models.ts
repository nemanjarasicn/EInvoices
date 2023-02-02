
  import { CountryCode, Currency, SchemeID } from "./articles.enums";
  
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
  export interface ObjectsDto {
    idObject: number; // object Number
    name: string;
    uuid: string;
    point: {
          latitude:  string;
          longitude:  string;
    }
  }

  
 
  
  // FORM MODELS ////////////////////////////////////////////////////////////
  export class ArticleFormModel {
    productName: string = "";
    sale:  boolean = true;
    recipe:  boolean = true;
    stock:  boolean = true;
    production:  boolean = true;
    consumables:  boolean = true;
    modificationRequired:  boolean = true;
    decimalShow:  boolean = true;
    priceChangeForbidden:  boolean = true;
    barCode: string =   "";
    code: string  =  "";
    idCompany:  number =  0;
    idObject:  number  =  0;
    productUnitRequest:  any;
    productVatRequest:  any;
    productTaxCategory:  any;
    price:  string   =  "";
    marketPlaceDtos: any   = [];
    taxcodeValue: string = "";
    taxCode!: {
      idTaxCategory: number | string;
      taxCategoryName: string;
      taxCategoryCode: string;
      value1: number | string;
      idCountry: number | string;
    };
    taxBaseValue:  number   |  string =  "";
    taxBase!: {
      id: number | string;
      name: string;
      description:  string;
      taxCategory:   string;
    };
  }

  
  export class PriceFormModel {
   price:  number  |  string   =  "";
  }

  export class SubjectFormModel {
    firstName:  string = "";
    lastName:  string =  "";
    companyName: string  =  "";
    identificationNumber:   string = "";
    pib:  string = "";
    mb:  string = "";
    companyId:  number | string = "";
    address:  string = "";
    city:  string = "";
    zip:  string = "";
    phone:  string = "";
    email:  string = "";
    jbkjs:  string = "";
    subjectIdCategory: any = "";
    subjectIdType: any = "";
    payeeFinancialAccountDto:  string  =  "";
    searchSubject: string  |  number  =  "";

   }

