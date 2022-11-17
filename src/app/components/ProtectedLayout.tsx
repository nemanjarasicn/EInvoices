import React from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../core/auth";
import { removeUser } from "../core/core.reducer";
import { useAppDispatch } from "../hooks";

import MenuAppBar from "./MenuAppBar";

export default function ProtectedLayout(): JSX.Element {
  const dispach = useAppDispatch();

  /**
   * Unmount
   */
  React.useEffect(
    () => () => {
      dispach(removeUser({}));
    },
    [dispach]
  );
  const token: string | null = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (!validateToken(token)) {
    return <Navigate to="/login" />;
  }
  return <MenuAppBar />;
}
