import { ActionReducerMapBuilder, createSlice, Slice } from "@reduxjs/toolkit";
import { login } from "./core.actions";
import { User, UserCompany } from "./core.models";

/**
 * TODO AUTH and logic around it recomended
 */
// const defaultUser: User = {
//   token:
//     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJkZWphbiIsInJvbGVzIjoiUk9MRV9VU0VSIiwidXNlcm5hbWUiOiJkZWphbiIsImV4cCI6MTY2ODY5MjA0OH0.Pt8BwEyOfqv1NIazLYX3IlyS7dxHrFAswwuAUjmoAVybvGWnSiMBnJ2KB--arbUuunzKGjGHHrAAo3zSE6ZHLg",
//   type: "Bearer",
//   username: "placeholderForUsername",
//   authorities: [
//     {
//       authority: "ROLE_USER",
//     },
//   ],
//   companyId: 1,
// };

// /**
//  * TODO After Login
//  */
// const defaultCompany: UserCompany = {
//   companyName: "MASTER SOFTWARE",
//   idCompany: 1,
//   id: 1,
//   pib: "",
//   uuid: null,
//   objectUuid: null,
//   apiKey: "1a51e09d-e74d-4cd5-9d62-67de819e36ff",
//   mb: 21502243,
//   address: "office@mastersoftware.rs",
//   zip: "11000",
//   city: "Beograd",
//   country: "RS",
// };

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
    }),
    resetError: (state) => ({
      ...state,
      error: "",
    }),
  },
  extraReducers: (builder) => {
    loginAsync(builder);
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
