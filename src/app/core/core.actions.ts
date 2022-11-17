import { AsyncThunk, createAsyncThunk } from "@reduxjs/toolkit";
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
          localStorage.setItem("token", JSON.stringify(res.data.token));
          delete res.data.token;
          delete res.data.type;
          return res.data;
        })
        .catch((err) => {
          return _.rejectWithValue({
            error: `${err.message}-${err.response.data.error}`,
          });
        });
    }
  );

export { login };
