import { UserCompany } from "../../../app/core/core.models";
import { ProductModel } from "../models";

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
const createPaymentMeans = (foundComapny: any, ref: any, model: any): any[] => {
  const accounts: any[] = [];
  foundComapny.payeeFinancialAccountDto.map((item: any) => {
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
  console.log("%c-DA LI SE VIDI OVO-MLADEN-TRAMPIC", "color:green; border: solid red 1px;");
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
    item.allowanceCharge.amount = Number(
      (
        (item.price.priceAmount -
          item.lineExtensionAmount / item.invoicedQuantity) *
        item.invoicedQuantity
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
  return {
    currencyId: "RSD", //only rsd on system
    lineExtensionAmount: Number(invoice.taxableAmount.toFixed(2)),
    taxExclusiveAmount: Number(invoice.taxableAmount.toFixed(2)),
    taxInclusiveAmount: Number(invoice.finalSum.toFixed(2)),
    allowanceTotalAmount: 0, //TODO other types of invoice
    prepaidAmount: 0, // TODO for prepayment
    payableAmount: invoice.finalSum.toFixed(2),
  };
};

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
};
