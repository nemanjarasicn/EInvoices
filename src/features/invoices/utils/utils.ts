import { UserCompany } from "../../../app/core/core.models";
import { ProductModel } from "../models";
import xml2js from "xml2js";

/**
 * DO NOT USE it with LANG CHANGE it trigger re-render
 * Each child in a list should have a unique "key" prop.
 * @param prefix index or concanitation with index
 * @returns unique key for childs in list
 */
const generateKey = (prefix: string) => `${prefix}_${new Date().getTime()}`;

/**
 * Function That Calculate Tax From Total Amount
 * @param value Total Amount
 * @param percent Tax Percent
 * @returns {number} Tax Amount In Currency
 */
const calculateTax = (value: number, percent: number): number => {
  return value - value / (percent / 100 + 1);
};

/**
 * Calculate New Price
 * @param unitPrice Unit Price
 * @param discount Discount
 * @returns {number} New Price
 */
const calculateNewPrice = (unitPrice: number, discount: number): number => {
  return unitPrice - unitPrice * (discount / 100);
};


/**
 * Calculate New Discount
 * @param unitPrice Unit Price
 * @param newPrice  New Price
 * @returns {number} discount
 */
 const calculateNewDiscount = (unitPrice: number, newPrice: number): number => {
  return  (100 * newPrice) / unitPrice ;
};

/**
 * Calculate total
 * @param productList List of products
 * @returns {number} Summ of all products price amount
 */
const calculateTotal = (
  productList: ProductModel[],
  discount?: number
): number => {
  let total: number = 0;
  productList.map((item) => (total = total + Number(item.price.priceAmount)));

  return total;
};
/**
 * Total without discount
 * @param productList
 * @returns {number} Total
 */
const totalWithoutDiscount = (productList: ProductModel[]): number => {
  let total: number = 0;
  productList.map(
    (item) =>
      (total = total + Number(item.price.unitPrice) * item.invoicedQuantity)
  );
  return total;
};
/**
 * Total whit discount
 * @param productList
 * @returns {number}
 */
const totalWithDiscount = (productList: ProductModel[]): number => {
  let total: number = 0;
  productList.map(
    (item) =>
      (total = total + Number(item.price.newPrice) * item.invoicedQuantity)
  );
  return total;
};
/**
 * Summ of tax for each product
 * @param productList
 * @returns {number} Value Of Tax
 */
const sumTax = (productList: ProductModel[]): number => {
  let total: number = 0;
  productList.map((item) => {
    total = total + item.price.unitTaxAmount;
  });
  return total;
};
/**
 * Calculate Base
 * @param total Total amount
 * @param tax Total tax
 * @returns {number} Difrence of Total and Tax
 */
const calculateBase = (total: number, tax: number): number => {
  return total ? total - tax : 0;
};

/**
 *
 * @param status API response number value of invoice type
 * @returns
 */
const handleInvoiceStatus = (status: number | string): string => {
  switch (Number(status)) {
    case 380:
      return "Invoice";
    case 381:
      return "Credit note";
    case 383:
      return "Debit note";
    case 386:
      return "Prepayment";
    default:
      throw new Error("No such type!!!");
  }
};

/**
 * Handle PaymentsMeans when sending invoice
 * @param foundComapny
 * @param ref
 * @param model
 * @returns
 */
const createPaymentMeans = (foundComapny: any[], ref: any, model: any): any[] => {
  const accounts: any[] = [];
  //foundComapny.payeeFinancialAccountDto.map((item: any) => {
    foundComapny.map((item: any) => {
    let acc = {
      paymentMeansCode: "30", //TODO
      paymentID: `(mod${model}) ${ref}`,
      payeeFinancialAccount: {
        id: item.payeeFinancialAccountValue, // id tekuceg racuna  
      },
    };
    accounts.push(acc);
  });
  return accounts;
};

/**
 * Handle every line on invoice
 * @param invoiceLine
 * @returns
 */
const mapInvoiceLinesCreateTaxTotal = (invoiceLine: any[]): any[] => {
  invoiceLine.map((item: any, index: number) => {
    item.allowanceCharge.multiplierFactorNumeric = Number(item.price.discount);
    item.lineExtensionAmount =
      item.invoicedQuantity * item.price.newPrice - item.price.unitTaxAmount;
    item.id = index + 1;
    item.price.priceAmount = Number(
      (
        item.price.unitPrice -
        calculateTax(
          item.price.unitPrice,
          item.item.classifiedTaxCategory.percent
        )
      ).toFixed(2)
    );
    const totalDivide = Number(item.lineExtensionAmount / item.invoicedQuantity).toFixed(2);
    item.allowanceCharge.amount = Number(
      (
        (item.price.priceAmount - Number(totalDivide)) * item.invoicedQuantity
      ).toFixed(2)
    );
    item.price.discount = Number(
      (item.price.unitPrice - item.price.newPrice) * item.invoicedQuantity
    ).toFixed(2);
    item.lineExtensionAmount = Number(item.lineExtensionAmount.toFixed(2));
    item.price.unitTaxAmount = Number(item.price.unitTaxAmount.toFixed(2));
    return item;
  });
  const array: any[] = [];
  array.push({ currencyId: "RSD", taxAmount: 0, taxSubtotal: [] });
  invoiceLine.map((line) => {
    array[0].taxAmount = Number(
      (array[0].taxAmount + line.price.unitTaxAmount).toFixed(2)
    );
    let taxPresent: boolean = array[0].taxSubtotal.some(
      (item: any) =>
        item.taxCategory.percent === line.item.classifiedTaxCategory.percent
    );
    if (!taxPresent) {
      if(line.baseCode) {
          array[0].taxSubtotal.push({
            currencyId: "RSD",
            taxableAmount: line.lineExtensionAmount,
            taxAmount: line.price.unitTaxAmount,
            taxCategory: {
              id: "S",
              percent: line.item.classifiedTaxCategory.percent,
              taxScheme: {
                id: "VAT",
              },
              taxreson: "PDV-RS-10-1",
            },
          });
        } else {
          array[0].taxSubtotal.push({
            currencyId: "RSD",
            taxableAmount: line.lineExtensionAmount,
            taxAmount: line.price.unitTaxAmount,
            taxCategory: {
              id: "S",
              percent: line.item.classifiedTaxCategory.percent,
              taxScheme: {
                id: "VAT",
              },
            },
          });
        }
    } else {
      array[0].taxSubtotal.map((total: any) => {
        if (
          total.taxCategory.percent === line.item.classifiedTaxCategory.percent
        ) {
          total.taxAmount = Number(
            (total.taxAmount + line.price.unitTaxAmount).toFixed(2)
          );
          total.taxableAmount = Number(
            (total.taxableAmount + line.lineExtensionAmount).toFixed(2)
          );
        }
      });
    }
  });
  return array;
};

const createSupplayerData = (userCompany: UserCompany): any => {
  console.log('asasasas',  userCompany)
  return {
    party: {
      schemeID: "9948",
      endpointID: userCompany.pib,
      partyName: [
        {
          name: userCompany.companyName,
        },
      ],
    },
    postalAddress: {
      streetName: userCompany?.address,
      cityName: userCompany.city,
      country: {
        identificationCode: "RS",
      },
    },
    partyTaxScheme: {
      companyID: `RS${userCompany.pib}`,
      taxScheme: {
        id: "VAT",
      },
    },
    partyLegalEntity: {
      registrationName: userCompany.companyName,
      companyID: userCompany.mb,
    },
    contact: {
      electronicMail: "dbogi89@gmail.com", //TODO
    },
  };
};
/**
 * Handle 2 decimal
 * @param invoice
 * @returns
 */
const createMonetaryTotal = (invoice: any): any => {
  let   prepaidAmountTotal: number   =  0;
  if(invoice?.invoice?.invoiceTypeCode === 380  && invoice?.advanceAccountList?.length) {
    invoice?.advanceAccountList.map((item: any)  =>  {
        prepaidAmountTotal =  prepaidAmountTotal + item?.item?.finalSum; 
    })
  }


  return {
    currencyId: "RSD", //only rsd on system
    lineExtensionAmount: Number(invoice?.invoice?.taxableAmount.toFixed(2)),
    taxExclusiveAmount: Number(invoice?.invoice?.taxableAmount.toFixed(2)),
    taxInclusiveAmount: Number(invoice?.invoice?.finalSum.toFixed(2)),
    allowanceTotalAmount: 0, //TODO other types of invoice
    prepaidAmount: (invoice?.invoice?.invoiceTypeCode === 380  && invoice?.advanceAccountList?.length)  ?  Number(prepaidAmountTotal.toFixed(2)) :  0, // TODO for prepayment
    payableAmount:  (invoice?.invoice?.invoiceTypeCode === 380  && invoice?.advanceAccountList?.length) ?  (Number(invoice?.invoice?.finalSum.toFixed(2))  -  Number(prepaidAmountTotal.toFixed(2)))    :     invoice?.invoice?.finalSum.toFixed(2),
  };
};

/**
 * return error message
 * @param error
 * @returns
 */
 const returnInvoiceMessage = (error: string): any => {

  const errorsMessage = [
    {error: "401 Unauthorized: [no body]", message: "Proverite na sefu-u api key i da li je api status aktivan"},
    {error: "contains duplicates", message: "Faktura koju pokušavate da pošaljete sa istim brojem već postoji na SEF.  Proverite da li si ste već poslali tu fakturu"},
    {error: "Quanitity on invoice lines of prepayment must be 1", message: "Kada saljete avans, kolicina ne sme biti veca od 1"},
    {error: "Source invoice not exists", message: "Morate uneti izvornu fakturu"},
    {error: "IssueDate is not correct because it cannot be different from todays", message: "SEF prihvata isključivo e-Fakture sa današnjim datumom"},
    {error: "When receiver is budget user order number", message: "Za budžetske korisnike je obavezno jedno od polja “broj narudžbine” ili “broj ugovora” ili “broj sporazuma”"},
    {error: "Selected prepayment invoice", message: "Firma kojoj fakturišete još nije prihvatila prethodno poslatu avansnu e-Fakturu"},
    {error: "Invalid user type for debtor", message: "Fakture ne treba da se šalju i na CRF za datog budžetskog korisnika"},
    {error: "must be approved", message: " Knjižno odobrenje, ne može biti poslato jer faktura po kojoj ga izdajete nije prihvaćena, niti odbijena"},
    {error: "mandatory for CreditNote document", message: "Knjižno odobrenje koje šaljete na SEF nema referencu na fakturu za koju je urađen povrat"},
    {error: "Company with identifier", message: "Proverite da li je korisnik registrovan na SEF-u."},
    {error: "503 Service Unavailable", message: "Poreska nije dostupna"},
    {error: "504 Gateway Time-out", message: "Poreska nije dostupna"},
    {error: "VAT registration code must be 9 or 13 characters long", message: ""},
    {error: "The receiver's registration code does not have a good length", message: "Dobavljač nema ispravan matični broj"},
  ]

  const errorTranslate: any = errorsMessage.filter((item)  =>  error.includes(item.error));

  return  errorTranslate.length ? errorTranslate[0]?.message :  error
};

/**
 * create pdfObject
 * @param error
 * @returns
 */
 const createPdfObject = (xmlTmp: any): any => {
  let objectTmp;
  xml2js.parseString(xmlTmp, (err, result) => {
    if (err) {
      throw err;
    }
    const json = JSON.stringify(result, null, 4);
    objectTmp = {
      AccountingCustomerParty: {
        name: result?.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:RegistrationName'][0],
        adress:  result?.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:StreetName'][0],
        city:  result?.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:CityName'][0],
        pib:  result?.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cbc:EndpointID'][0]['_'],
        mb:  result?.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:CompanyID'][0]
      },
      AccountingSupplierParty: {
        name: result?.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:RegistrationName'][0],
        adress:  result?.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:StreetName'][0],
        city:  result?.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:CityName'][0],
        pib:  result?.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cbc:EndpointID'][0]['_'],
        mb:  result?.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:CompanyID'][0]
      },
      paymentMeans:  result?.Invoice['cac:PaymentMeans'][0]['cac:PayeeFinancialAccount'][0]['cbc:ID'][0],
      paymentMode:   result?.Invoice['cac:PaymentMeans'][0]['cbc:PaymentID'][0],
      dueDate:    result?.Invoice['cbc:DueDate'][0],
      delivery:   result?.Invoice['cac:Delivery'] ?    result?.Invoice['cac:Delivery'][0]['cbc:ActualDeliveryDate'][0]  :  "",
      issueDate:   result?.Invoice['cbc:IssueDate'][0],
      note:  result?.Invoice['cbc:Note'] ?  result?.Invoice['cbc:Note'][0] :  "",
      numberDocument:    result?.Invoice['cbc:ID'][0],
      legalMonetaryTotal:  {
        payableAmount:   result?.Invoice['cac:LegalMonetaryTotal'][0]['cbc:PayableAmount'][0]['_'],
        lineExtensionAmount:   result?.Invoice['cac:LegalMonetaryTotal'][0]['cbc:LineExtensionAmount'][0]['_'],
      },
      taxTotal: {
        taxAmount:  result?.Invoice['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cbc:TaxAmount'][0]['_'],
      }

    }
  })

  return   objectTmp;
};

/**
 * convert object to json 
 * @param obj
 * @returns
 */

const  jsonBlob = (obj: any)  => {
  return new Blob([JSON.stringify(obj)], {
    type: "application/json",
  });
}

export {
  handleInvoiceStatus,
  generateKey,
  calculateTax,
  calculateNewPrice,
  calculateTotal,
  totalWithoutDiscount,
  totalWithDiscount,
  sumTax,
  calculateBase,
  createPaymentMeans,
  mapInvoiceLinesCreateTaxTotal,
  createSupplayerData,
  createMonetaryTotal,
  calculateNewDiscount,
  returnInvoiceMessage,
  createPdfObject,
  jsonBlob
};
