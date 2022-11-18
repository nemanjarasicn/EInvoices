import React from "react";
import "./i18n/config";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./app/styles/Theme";
import BasicModal from "./app/components/AuthModal";
import InvoiceLayout from "./features/invoices/components/InvoiceLayout";
import { useAppSelector } from "./app/hooks";

import {
  CreateType,
  TemplatePageTypes,
} from "./features/invoices/models/invoice.enums";
import { apiKeyExist } from "./app/core/core.selectors";
import LoginPage from "./app/pages/LoginPage";
import ProtectedLayout from "./app/components/ProtectedLayout";
import RegistriesLayout from "./features/registries/components/RegistriesLayout";
import { TemplatePageRegistriesTypes } from "./features/registries/models/registries.enums"
import { CreateType as CreateTyperegistries}  from "./features/registries/models/registries.enums"

const DashboardPage = React.lazy(
  () => import("./features/invoices/pages/DashboardPage")
);

const InvoiceTemplatePage = React.lazy(
  () => import("./features/invoices/pages/InvoiceTemplatePage")
);

const SalesTemplatePage = React.lazy(
  () => import("./features/invoices/pages/SalesTemplatePage")
);

const DashboardRegistriesPage = React.lazy(
  () => import("./features/registries/pages/DashboardRegistriesPage")
);

const RegistriesTemplatePage = React.lazy(
  () => import("./features/registries/pages/registriesTemplatePage")
);

const RegistriesCreateTemplatePage = React.lazy(
  () => import("./features/registries/pages/RegistriesCreateTemplatePage")
);

function App() {
  const apiKeyPresent = useAppSelector(apiKeyExist);
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route
            index
            element={
              <div style={{ maxWidth: "500px" }}>
                <img alt="x" src="/logopetcom.svg"></img>
              </div>
            }
          />
          {apiKeyPresent ? invoicesRoutes() : modalRoute()}
          {registriesRoutes()}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;

function modalRoute(): React.ReactNode {
  return <Route path="*" element={<BasicModal />}></Route>;
}

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
function registriesRoutes(): React.ReactNode {
  return (
    <>
      <Route path="registries" element={<RegistriesLayout />}>
        <Route
          index
          element={
            <React.Suspense fallback={<>...</>}>
              <DashboardRegistriesPage  props={ {}} />
            </React.Suspense>
          }
        />
         <Route
          path="objects"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesTemplatePage
                key={`key_${TemplatePageRegistriesTypes.OBJECTS}.id`}
                props={{ templateType: TemplatePageRegistriesTypes.OBJECTS }}
              />
            </React.Suspense>
          }
        />
        <Route
          path="createObject"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMOBJECT }} />
            </React.Suspense>
          }
        />
      </Route> 
    </>
  );
}
