/**
 * DO NOT USE it with LANG CHANGE it trigger re-render
 * Each child in a list should have a unique "key" prop.
 * @param prefix index or concanitation with index
 * @returns unique key for childs in list
 */
const generateKey = (prefix: string) => `${prefix}_${new Date().getTime()}`;

const calculateTax = (priceAmount: number, percent: number) => {
  return priceAmount - priceAmount / (percent / 100 + 1);
};
const calculateNewPrice = (unitPrice: number, discount: number) => {
  return unitPrice - unitPrice * (discount / 100);
};

export { generateKey, calculateTax, calculateNewPrice };
