import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import PublicService from "../../../services/public.service";



/**
 * Get Async Companies
 */
const getCompaniesAll: AsyncThunk<any, void, {}> =
  createAsyncThunk(
    "GET/CompaniesAll",
    async () => {
      return await PublicService.getCompaniesAll()
        .then((res) => res.data)
        .catch((err) => []);
    } 
  );

/**
 * Get Async Products
 */
const getMarketPlacesAll: AsyncThunk<any, { companyId: number | string }, {}> =
  createAsyncThunk<any, { companyId: number | string }>(
    "GET/MarketPlacesAll",
    async (params) => {
      return await PublicService.getMarketPlacesAll(params.companyId)
        .then((res) => res.data)
        .catch((err) => []);
    }
  );



  /**
 * Get Async Point of sales
 */
const getPointOfSalesAll: AsyncThunk<any, { companyId: number | string }, {}> =
createAsyncThunk<any, { companyId: number | string }>(
  "GET/PointOfSAlesAll",
  async (params) => {
    return await PublicService.getPointOfSalesAll(params.companyId)
      .then((res) => res.data)
      .catch((err) => []);
  }
);

/**
 * Get Async Objects
 */
 const getObjectsAll: AsyncThunk<any,  { companyId: number | string }, {}> =
 createAsyncThunk<any, { companyId: number | string }>(
   "GET/ObjectsAll",
   async (params) => {
     return await PublicService.getObjectsAll(params.companyId)
       .then((res) => res.data.objectDtoResponse)
       .catch((err) => []);
   }
 );

 /**
 * Get Async Units
 */
 const getUnitsAll: AsyncThunk<any,  void, {}> =
 createAsyncThunk(
   "GET/unitsAll",
   async () => {
     return await PublicService.getUnitsAll()
       .then((res) => res.data)
       .catch((err) => []);
   }
 );

 /**
 * Get Async Vat
 */
  const getVatAll: AsyncThunk<any,  void, {}> =
  createAsyncThunk(
    "GET/vatAll",
    async () => {
      return await PublicService.getVatAll()
        .then((res) => res.data)
        .catch((err) => []);
    }
  );


export { getCompaniesAll, getMarketPlacesAll, getPointOfSalesAll, getObjectsAll, getUnitsAll,  getVatAll };
