import React from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../core/auth";
import { removeUser } from "../core/core.reducer";
import { useAppDispatch } from "../hooks";
import {useLocation} from 'react-router-dom';
import { setError } from "../core/core.reducer";

import MenuAppBar from "./MenuAppBar";

export default function ProtectedLayout(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const token: string | null = JSON.parse(
    String(sessionStorage.getItem("token"))
  );
  

  React.useEffect(() => {
    if (!token || !validateToken(token)) {
      dispatch(removeUser({}));
      dispatch(setError('Vaša sesija je istekla, molimo ulogujte se ponovo'));
      sessionStorage.removeItem("token");
    }
  }, [token, dispatch, location]);

  return !token || !validateToken(token) ? (
    <Navigate to="/login" />
  ) : (<MenuAppBar />);
}
