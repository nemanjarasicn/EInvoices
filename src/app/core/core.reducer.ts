import { createSlice, Slice } from "@reduxjs/toolkit";
import { User, UserCompany } from "./core.models";

/**
 * TODO AUTH and logic around it recomended
 */
const defaultUser: User = {
  token: "placeholderForTokenValue",
  type: "Bearer",
  username: "placeholderForUsername",
  authorities: [
    {
      authority: "ROLE_USER",
    },
  ],
  companyId: 1,
};

/**
 * TODO
 */
const defaultCompany: UserCompany = {
  companyName: "MASTER SOFTWARE",
  idCompany: 1,
  id: 1,
  pib: "",
  uuid: null,
  objectUuid: null,
  apiKey: "1a51e09d-e74d-4cd5-9d62-67de819e36ff",
  mb: 21502243,
  address: "office@mastersoftware.rs",
  zip: "11000",
  city: "Beograd",
  country: "RS",
};

const CORE_KEY: string = "core";

export interface CoreState {
  user: User | null;
  userCompany: UserCompany;
}

const initialState: CoreState = {
  user: defaultUser,
  userCompany: defaultCompany,
};

const authSlice: Slice<CoreState> = createSlice({
  name: CORE_KEY,
  initialState,
  reducers: {
    setUser: (state, { payload }) => ({
      ...state,
      user: payload,
    }),
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
