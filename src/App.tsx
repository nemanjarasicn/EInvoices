import React from "react";
import "./i18n/config";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./app/components/Layout";
import { theme } from "./app/styles/Theme";
import InvoiceLayout from "./features/invoices/components/InvoiceLayout";
import {
  CreateType,
  TemplatePageTypes,
} from "./features/invoices/models/invoice.enums";

const DashboardPage = React.lazy(
  () => import("./features/invoices/pages/DashboardPage")
);

const InvoiceTemplatePage = React.lazy(
  () => import("./features/invoices/pages/InvoiceTemplatePage")
);

const SalesTemplatePage = React.lazy(
  () => import("./features/invoices/pages/SalesTemplatePage")
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
            <React.Suspense fallback={<>...</>}>
              <DashboardPage props={{}} />
            </React.Suspense>
          }
        />
        <Route
          path="sales"
          element={
            <React.Suspense fallback={<>...</>}>
              <InvoiceTemplatePage
                key={`key_${TemplatePageTypes.SALES}.id`}
                props={{ templateType: TemplatePageTypes.SALES }}
              />
            </React.Suspense>
          }
        />
        <Route
          path="purchases"
          element={
            <React.Suspense fallback={<>...</>}>
              <InvoiceTemplatePage
                key={`key_${TemplatePageTypes.PURCHASES}.id`}
                props={{ templateType: TemplatePageTypes.PURCHASES }}
              />
            </React.Suspense>
          }
        />
        <Route
          path="create"
          element={
            <React.Suspense fallback={<>...</>}>
              <SalesTemplatePage props={{ type: CreateType.FORM }} />
            </React.Suspense>
          }
        />
        <Route
          path="create-xml"
          element={
            <React.Suspense fallback={<>...</>}>
              <SalesTemplatePage props={{ type: CreateType.XML }} />
            </React.Suspense>
          }
        />
      </Route>
    </>
  );
}
