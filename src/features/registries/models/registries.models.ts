
  import { CountryCode, Currency, SchemeID } from "./registries.enums";
  
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
  export class ObjectFormModel {
    id: string = "";
    companyId: number = 0;
    objectName: string = "";
    latitude: string = "";
    longitude: string = "";
  }

  export class MarketPlaceFormModel {
    companyId: number = 0;
    marketPlaceName: string = "";
    objectUuid: string = "";
  }

  export class CompanyFormModel {
    id: string = "";
    companyName: string =  "";
    primaryVat: boolean = false;
    pib: string = "";
    date: string = "";
    apiKey:  string = "";
    mb:  string = "";
    address: string = "";
    zip:  string  = "";
    city: string  = "";
    country:  string =  "";
  }


  export class PointOfSaleFormModel {
    id: string = "";
    namePointOfSale: string = "";
    idMarketPlace: number = 0;
    companyName: string = "";
    uuidMarketPlace: string = "";
    idCompany:  number =  0;
    code: string  =   "";
    lastUpdatedBy:  number | string =   "";
    createdBy:  number | string  = "";
  }



  export class WarehouseFormModel {
    idMarketPlace: number = 0;
    warehouseName: string = "";
    marketPlaceUuid: string = "";
  }


  export class UnitFormModel {
    productUnitName: string = "";
    productUnitCode: number | string =  "";
    productUnitPlural: number | string  =    "";
    productUnitPriority:  number = 0
    productUnitDecimalShow:  number =   0;

  }


  export class GroupFormModel {
    groupName: string =  "";
    idPointOfSale: string = "";
    idCompany: number =  0;
    idObject: number =  0;
  }

  export class VatFormModel {
    name: string = "";
    value1: number  =  0;
    value2: number  =  0;
    value3: number =  0;
    activ: boolean = false;
    code:  string  =  "";
    default?: boolean = true;
    idCountry:  number  = 0;
  }
  
 
  export interface CustomerPartyModel {
    main: {
      idCompany: number;
      companyName:  string;
    }
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
  }
  