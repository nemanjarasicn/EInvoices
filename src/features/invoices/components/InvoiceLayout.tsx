import Search from "@mui/icons-material/Search";
import React from "react";
import { Outlet } from "react-router-dom";
import SearchField from "./SearchField";

type InvoiceLayoutProps = {};

export default function InvoiceLayout({}: InvoiceLayoutProps): JSX.Element {
  return (
    <div>
      <SearchField />
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
