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
export {
  generateKey,
  calculateTax,
  calculateNewPrice,
  calculateTotal,
  totalWithoutDiscount,
  totalWithDiscount,
  sumTax,
  calculateBase,
};
