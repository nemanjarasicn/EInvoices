/**
 * DO NOT USE it with LANG CHANGE it trigger re-render
 * Each child in a list should have a unique "key" prop.
 * @param prefix index or concanitation with index
 * @returns unique key for childs in list
 */
const generateKey = (prefix: string) => `${prefix}_${new Date().getTime()}`;

export { generateKey };
