import React from "react";
import { Outlet } from "react-router-dom";

type InvoiceLayoutProps = {};

export default function InvoiceLayout({}: InvoiceLayoutProps): JSX.Element {
  return (
    <div>
      <div style={{ textAlign: "center", margin: "10px", background: "gray" }}>
        <h3>PLACEHOLDER FOR SEARCH</h3>
      </div>
      <div className="outlet">
        <Outlet />
      </div>
    </div>
  );
}
