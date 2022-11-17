import React from "react";
import { Navigate } from "react-router-dom";
import { validateToken } from "../core/auth";

import MenuAppBar from "./MenuAppBar";

export default function ProtectedLayout(): JSX.Element {
  const token: string | null = JSON.parse(
    String(sessionStorage.getItem("token"))
  );
  if (!token || !validateToken(token)) {
    return <Navigate to="/login" />;
  }
  return <MenuAppBar />;
}
