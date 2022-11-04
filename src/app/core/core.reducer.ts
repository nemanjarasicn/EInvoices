import { createSlice, Slice } from "@reduxjs/toolkit";
import { User } from "./core.models";

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
  companyId: 3,
};

const CORE_KEY: string = "core";

export interface CoreState {
  user: User | null;
}

const initialState: CoreState = {
  user: defaultUser,
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
