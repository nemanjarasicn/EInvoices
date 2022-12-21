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

export { login, getLoggedSubject,  getCompaniesAllLogin };
