import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import InvoicePublicService from "../../../services/invoice.service";

/**
 * Get Async Unit Mesures
 */
const getAllUnitMesures: AsyncThunk<any, void, {}> = createAsyncThunk(
  "GET/Units",
  async () => {
    return await InvoicePublicService.getAllUnitMesures()
      .then((res) => res.data)
      .catch((err) => []);
  }
);

/**
 * Get Async Companies
 */
const getClientCompanies: AsyncThunk<any, { companyId: number | string }, {}> =
  createAsyncThunk<any, { companyId: number | string }>(
    "GET/Companies",
    async (params) => {
      return await InvoicePublicService.getCustomerSubjects(params.companyId)
        .then((res) => res.data)
        .catch((err) => []);
    }
  );

/**
 * Get Async Doc Number
 */
const getCurrentDocumentNumber: AsyncThunk<
  any,
  { companyId: number | string },
  {}
> = createAsyncThunk<any, { companyId: number | string }>(
  "GET/DocumentNumber",
  async (params) => {
    return await InvoicePublicService.getCurrentDocNumber(params.companyId)
      .then((res) => res.data)
      .catch((err) => console.log("Error", err));
  }
);


/**
 * Get Async invoice by type
 */
 const getInvoiceByType: AsyncThunk<any, { companyId: number | string, typeDocument?:  string | number }, {}> =
 createAsyncThunk<any, { companyId: number | string,   typeDocument?:  string | number }>(
   "GET/invoiceByType",
   async (params) => {
     return await InvoicePublicService.getInvoiceByType(params.companyId,  params?.typeDocument)
       .then((res) => res.data)
       .catch((err) => []);
   }
 );

/**
 * Get Async Products
 */
const getProducts: AsyncThunk<any, { marketPlace: string }, {}> =
  createAsyncThunk<any, { marketPlace: string }>(
    "GET/Products",
    async (params) => {
      return await InvoicePublicService.getProducts(params.marketPlace)
        .then((res) => res.data)
        .catch((err) => []);
    }
  );

/**
 * Get Async Market Places
 */
const getMarketPlaces: AsyncThunk<any, { companyId: number | string }, {}> =
  createAsyncThunk<any, { companyId: number | string }>(
    "GET/MarketPlaces",
    async (params) => {
      return await InvoicePublicService.getMarketPlaces(params.companyId)
        .then((res) => res.data)
        .catch((err) => []);
    }
  );

/**
 * Get Async Document Types
 */
const getDocumentTypes: AsyncThunk<any, void, {}> = createAsyncThunk<any, void>(
  "GET/Document types",
  async () => {
    return await InvoicePublicService.getDocumentsTypes()
      .then((res) => res.data)
      .catch((err) => []);
  }
);

export {
  getAllUnitMesures,
  getClientCompanies,
  getProducts,
  getMarketPlaces,
  getCurrentDocumentNumber,
  getDocumentTypes,
  getInvoiceByType
};
