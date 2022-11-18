
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
      multiplierFactorNumeric: number;
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
  }
  