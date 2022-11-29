import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import { getLoggedSubject, login } from "./core.actions";
import { User, UserCompany } from "./core.models";

const CORE_KEY: string = "core";

export interface CoreState {
  user: Partial<User> | null;
  userCompany: UserCompany | null;
  loading: boolean;
  error: string;
}

const initialState: CoreState = {
  user: null,
  userCompany: null,
  loading: false,
  error: "",
};

const authSlice: Slice<CoreState> = createSlice({
  name: CORE_KEY,
  initialState,
  reducers: {
    removeUser: (state) => ({
      ...state,
      user: null,
      userCompany: null,
    }),
    resetError: (state) => ({
      ...state,
      error: "",
    }),
  },
  extraReducers: (builder) => {
    loginAsync(builder);
    getAsyncUserCompany(builder);
  },
});

export const { removeUser, resetError } = authSlice.actions;

export default authSlice.reducer;

function loginAsync(builder: ActionReducerMapBuilder<CoreState>) {
  builder.addCase(login.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
    error: "",
    user: payload,
  }));
  builder.addCase(login.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(login.rejected, (state, { payload }) => ({
    ...state,
    loading: false,
    error: (payload as any).error,
  }));
}

function getAsyncUserCompany(builder: ActionReducerMapBuilder<CoreState>) {
  builder.addCase(getLoggedSubject.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
    userCompany: payload,
  }));
  builder.addCase(getLoggedSubject.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getLoggedSubject.rejected, (state) => ({
    ...state,
    loading: false,
    userCompany: null,
  }));
}
