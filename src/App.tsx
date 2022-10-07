import React from "react";
import "./i18n/config";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./app/components/Layout";
import { theme } from "./app/styles/Theme";
import InvoiceLayout from "./features/invoices/components/InvoiceLayout";
import { TemplatePageTypes } from "./features/invoices/models/invoice.enums";

const DashboardPage = React.lazy(
  () => import("./features/invoices/pages/DashboardPage")
);

const InvoiceTemplatePage = React.lazy(
  () => import("./features/invoices/pages/InvoiceTemplatePage")
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <div style={{ maxWidth: "500px" }}>
                <img alt="x" src="/logopetcom.svg"></img>
              </div>
            }
          />
          {invoicesRoutes()}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

function invoicesRoutes(): React.ReactNode {
  return (
    <>
      <Route path="invoices" element={<InvoiceLayout />}>
        <Route
          index
          element={
            // TODO LOADER
            <React.Suspense fallback={<>...</>}>
              <DashboardPage props={{}} />
            </React.Suspense>
          }
        />
        <Route
          path="sales"
          element={
            // TODO LOADER
            <React.Suspense fallback={<>...</>}>
              <InvoiceTemplatePage
                props={{ templateType: TemplatePageTypes.SALES }}
              />
            </React.Suspense>
          }
        />
        <Route
          path="purchases"
          element={
            // TODO LOADER
            <React.Suspense fallback={<>...</>}>
              <InvoiceTemplatePage
                props={{ templateType: TemplatePageTypes.PURCHASES }}
              />
            </React.Suspense>
          }
        />
      </Route>
    </>
  );
}
