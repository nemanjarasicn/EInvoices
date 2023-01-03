import React from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../core/auth";
import { removeUser } from "../core/core.reducer";
import { useAppDispatch } from "../hooks";

import MenuAppBar from "./MenuAppBar";

export default function ProtectedLayout(): JSX.Element {
  const dispatch = useAppDispatch();
  const token: string | null = JSON.parse(
    String(sessionStorage.getItem("token"))
  );

  React.useEffect(() => {
    if (!token || !validateToken(token)) {
      dispatch(removeUser({}));
      sessionStorage.removeItem("token");
    }
  }, [token, dispatch]);

  return !token || !validateToken(token) ? (
    <Navigate to="/login" />
  ) : (<MenuAppBar />);
}
