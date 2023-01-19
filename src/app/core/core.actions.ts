import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
import AppService from "./app.service";
import AuthService from "./auth.services";
import { Credentials } from "./core.models";

/**
 * Login Async
 */
const login: AsyncThunk<any, { credentials: Credentials }, {}> =
  createAsyncThunk<any, { credentials: Credentials }>(
    "POST/Login",
    async (params, _) => {
      return await AuthService.login(params.credentials)
        .then((res) => {
          sessionStorage.setItem("token", JSON.stringify(res.data.token));
          _.dispatch(getLoggedSubject({ id: res.data.companyId[0] }));
          _.dispatch(getMarketPlacesLogin({ companyId: res.data.companyId[0] }));
          if(res.data.authorities[0]?.authority === "ROLE_DISTRIBUTER")  {
              _.dispatch(getCompaniesDistributor({ id: res.data.companyId[0] }));
          }
          delete res.data.token;
          delete res.data.type;
          return res.data;
        })
        .catch((err) => {
          return _.rejectWithValue({
            // error: `${err.message}-${err.response.data.error}`,
            error: `Bad Credentials`,
          });
        });
    }
  );

/**
 * Get Subject Async
 */
const getLoggedSubject: AsyncThunk<any, { id: number }, {}> = createAsyncThunk<
  any,
  { id: number }
>("GET/Logged-Subject", async (params, _) => {
  return await AppService.getLoggedSubject(params.id)
    .then((res) => res.data)
    .catch((err) => console.log(err));
});

/**
 * Get distributor Async
 */

const getCompaniesDistributor: AsyncThunk<any, { id: number } , {}> = createAsyncThunk<any, { id: number }>(
  "GET/companiesDistributorGet",
  async (data) => {
    return     await AppService.getCompaniesDistributor(data.id)
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);

/**
 * Get error logs
 */

 const getErrorLogs: AsyncThunk<any, void , {}> = createAsyncThunk(
  "GET/errorLogget",
  async () => {
    return     await AppService.getErrorLogs()
    .then((res: any) => res.data)
    .catch((err: any) => []);
}
);

const getMarketPlacesLogin: AsyncThunk<any, { companyId: number | string }, {}> =
  createAsyncThunk<any, { companyId: number | string }>(
    "GET/MarketPlacesAll",
    async (params) => {
      return await AppService.getMarketPlacesLogin(params.companyId)
        .then((res) => res.data)
        .catch((err) => []);
    }
  );

/**
 * Get Async Companies
 */
 const getCompaniesAllLogin: AsyncThunk<any, void, {}> =
 createAsyncThunk(
   "GET/CompaniesAllLogin",
   async () => {
     return await AppService.getCompaniesAll()
       .then((res) => res.data)
       .catch((err) => []);
   } 
 );

export { login, 
         getLoggedSubject,  
         getCompaniesAllLogin,  
         getCompaniesDistributor,  
         getMarketPlacesLogin,  
         getErrorLogs };
