import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Layout from "./app/components/Layout";
import { theme } from "./app/styles/Theme";

const InvoicesPage = React.lazy(
  () => import("./features/invoices/pages/InvoicesPage")
);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div>HOME</div>} />
          <Route
            path="invoices"
            element={
              // TODO LOADER
              <React.Suspense fallback={<>...</>}>
                <InvoicesPage />
              </React.Suspense>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

function getInvoiceFeatureRoutes(): React.ReactNode {
  return;
}
