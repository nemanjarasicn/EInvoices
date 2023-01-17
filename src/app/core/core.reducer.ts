import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import { getLoggedSubject, login ,   getCompaniesAllLogin,  getCompaniesDistributor,   getMarketPlacesLogin,  getErrorLogs } from "./core.actions";
import { User, UserCompany } from "./core.models";

const CORE_KEY: string = "core";

export interface CoreState {
  user: Partial<User> | null;
  userCompany: UserCompany | null;
  loading: boolean;
  color:  string; // must change with theme mode
  error: string;
  companyCurrent: number  |  string;
  companyList:  UserCompany[];
  distributerInfo: any;
  openModalSucessLoad:  boolean;
  errorLogs: any[];
  marketPlacesAll: any[];
  companyAdmin: number  |  string;
}

const initialState: CoreState = {
  user: null,
  userCompany: null,
  loading: false,
  color: "#ef3e56",
  error: "",
  companyCurrent:  "",
  companyList:  [],
  distributerInfo:  {},
  openModalSucessLoad:  false,
  errorLogs:   [],
  marketPlacesAll: [],
  companyAdmin:  "",
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
    setColor: (state,{payload}) => ({
      ...state,
      color: payload,
    }),
    setError: (state,{payload}) => ({
      ...state,
      error: payload,
    }),
    setCompanyCurrent: (state,{payload}) => ({
      ...state,
      companyCurrent: payload,
    }),
    setCompanyAdmin: (state,{payload}) => ({
      ...state,
      companyAdmin: payload,
    }),

    setOpenModalSucessLoad: (state,{payload}) => ({
      ...state,
      openModalSucessLoad: payload,
    }),
  },
  extraReducers: (builder) => {
    loginAsync(builder);
    getAsyncUserCompany(builder);
    getAsyncCompanyAll(builder);
    getAsyncDistributerInfo(builder);
    getAsyncMarketPlacesAll(builder);
    getAsyncErrorLogs(builder);
  },
});

export const { removeUser, resetError, setColor,  setError, setCompanyCurrent,  setCompanyAdmin,  setOpenModalSucessLoad } = authSlice.actions;

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


function getAsyncCompanyAll(builder: ActionReducerMapBuilder<CoreState>) {
  builder.addCase(getCompaniesAllLogin.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
    error: "",
    companyList: payload,
  }));
  builder.addCase(getCompaniesAllLogin.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getCompaniesAllLogin.rejected, (state, { payload }) => ({
    ...state,
    loading: false,
    error: (payload as any).error,
  }));
}


function getAsyncDistributerInfo(builder: ActionReducerMapBuilder<CoreState>) {
  builder.addCase(getCompaniesDistributor.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
    error: "",
    distributerInfo: payload,
  }));
  builder.addCase(getCompaniesDistributor.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getCompaniesDistributor.rejected, (state, { payload }) => ({
    ...state,
    loading: false,
    error: (payload as any).error,
  }));
}


function getAsyncMarketPlacesAll(builder: ActionReducerMapBuilder<CoreState>) {
  builder.addCase(getMarketPlacesLogin.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
    marketPlacesAll: payload,
  }));
  builder.addCase(getMarketPlacesLogin.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getMarketPlacesLogin.rejected, (state) => ({
    ...state,
    loading: false,
    marketPlacesAll: [],
  }));
}



function getAsyncErrorLogs(builder: ActionReducerMapBuilder<CoreState>) {
  builder.addCase(getErrorLogs.fulfilled, (state, { payload }) => ({
    ...state,
    loading: false,
    error: "",
    errorLogs: payload,
  }));
  builder.addCase(getErrorLogs.pending, (state) => ({
    ...state,
    loading: true,
  }));
  builder.addCase(getErrorLogs.rejected, (state, { payload }) => ({
    ...state,
    loading: false,
    errorLogs: [],
  }));
}

