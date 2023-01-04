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
 * Get Async subject category
 */
const getSubjectCategory: AsyncThunk<any, void, {}> =
createAsyncThunk(
  "GET/subjectCategoryget",
  async () => {
    return await PublicService.getSubjectCategory()
      .then((res) => res.data)
      .catch((err) => []);
  }
);

 /**
 * Get Async subject  type
 */
  const getSubjectType: AsyncThunk<any, void, {}> =
  createAsyncThunk(
    "GET/subjectTypeget",
    async () => {
      return await PublicService.getSubjectType()
        .then((res) => res.data)
        .catch((err) => []);
    }
  );

  

  /**
 * Get Async userRole
 */
  const getUserRole: AsyncThunk<any, void, {}> =createAsyncThunk(
    "GET/getUserRole",
    async () => {
      return await PublicService.getUserRole()
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
 * Get Async taxCode
 */
  const getTaxBase: AsyncThunk<any,  { id: number | string }, {}> =
  createAsyncThunk<any, { id: number | string }>(
    "GET/taxBaseget",
    async (params) => {
      return await PublicService.getTaxBase(params.id)
        .then((res) => res.data)
        .catch((err) => []);
    }
  );

  /**
 * Get Async distributor
 */
   const getDistributor: AsyncThunk<any, void, {}> =
   createAsyncThunk(
     "GET/distributorget",
     async () => {
       return await PublicService.getDistributor()
         .then((res) => res.data)
         .catch((err) => []);
     }
   );


 /**
 * Get Async taxCode
 */
  const getTaxCode: AsyncThunk<any,  void, {}> =
  createAsyncThunk(
    "GET/taxCodeget",
    async () => {
      return await PublicService.getTaxCode()
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

  


export { getCompaniesAll, 
         getMarketPlacesAll, 
         getPointOfSalesAll, 
         getObjectsAll, 
         getUnitsAll,  
         getVatAll,  
         getUserRole,   
         getSubjectCategory,   
         getSubjectType,
         getTaxCode,
         getTaxBase,
         getDistributor };
