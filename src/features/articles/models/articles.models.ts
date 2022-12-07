
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
    price:  string   =  "";
    marketPlaceDtos: any   = []

  }

