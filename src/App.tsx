import React from "react";
import "./i18n/config";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./app/styles/Theme";
import BasicModal from "./app/components/ApiKeyModal";
import InvoiceLayout from "./features/invoices/components/InvoiceLayout";
import { useAppSelector, useToken } from "./app/hooks";

import {
  CreateType,
  TemplatePageTypes,
} from "./features/invoices/models/invoice.enums";
import { apiKeyExist, selectUser } from "./app/core/core.selectors";
import LoginPage from "./app/pages/LoginPage";
import ProtectedLayout from "./app/components/ProtectedLayout";
import RegistriesLayout from "./features/registries/components/RegistriesLayout";
import ArticlesLayout from "./features/articles/components/ArticlesLayout";
import { TemplatePageRegistriesTypes } from "../src/features/registries/models/registries.enums"
import { TemplatePageArticlesTypes }  from "../src/features/articles/models/articles.enums"
import { CreateType as CreateTyperegistries}  from "../src/features/registries/models/registries.enums"
import { CreateType as CreateTypeArticles}  from "../src/features/articles/models/articles.enums"
import { selectColor } from "./app/core/core.selectors";

import InfoCompany from "./features/registries/components/InfoCompany";



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

const DashboardArticlesPage = React.lazy(
  () => import("./features/articles/pages/DashboardArticlesPage")
);

const RegistriesTemplatePage = React.lazy(
  () => import("./features/registries/pages/registriesTemplatePage")
);

const ArticlesTemplatePage = React.lazy(
  () => import("./features/articles/pages/articlesTemplatePage")
);

const RegistriesCreateTemplatePage = React.lazy(
  () => import("./features/registries/pages/RegistriesCreateTemplatePage")
);

const ArticlesCreateTemplatePage = React.lazy(
  () => import("./features/articles/pages/ArticlesCreateTemplatePage")
);

const HomePage = React.lazy(
  () => import("./app/pages/HomePage")
);

function App() {
  const apiKeyPresent = useAppSelector(apiKeyExist);
  const color = useAppSelector(selectColor);
  const isDistributor  =  useAppSelector(selectUser)?.authorities?.slice(0,1)[0].authority === "ROLE_DISTRIBUTER" ? true  :   false;
  const isAdmin  =  useAppSelector(selectUser)?.authorities?.slice(0,1)[0].authority === "ROLE_ADMIN" ? true  :   false;
  const userAuthority =  isAdmin || isDistributor ? true  :   false;

  
  const isUserAuthorityList  =   useAppSelector(selectUser)?.authorities?.length  ?  true :  false;

  return (
    <ThemeProvider theme={theme(color)}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedLayout />}>
          <Route
            index
            element={
              !userAuthority ? <div style={{ maxWidth: "500px" }}>
                {/*<img alt="x" src="/logopetcom.svg"></img>*/}
              </div>  :  <Navigate to="/registries/companies" />
            }
          />
          {apiKeyPresent ? invoicesRoutes() : modalRoute()}
          {registriesRoutes() }
          {articlesRoutes()}
          <Route path="home" element={
            <React.Suspense fallback={<>...</>}>
              <HomePage props={{IsFromHome: true}} />
            </React.Suspense>} />
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
function tokenRoute(): React.ReactNode {
  return <Route path="*" element={<Navigate to="/" />}></Route>;
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
          path="errorLogs"
          element={
            <React.Suspense fallback={<>...</>}>
              <InvoiceTemplatePage
                key={`key_${TemplatePageTypes.ERRORLOGS}.id`}
                props={{ templateType: TemplatePageTypes.ERRORLOGS }}
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
          path="marketPlace"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesTemplatePage
                key={`key_${TemplatePageRegistriesTypes.MARKETPLACE}.id`}
                props={{ templateType: TemplatePageRegistriesTypes.MARKETPLACE }}
              />
            </React.Suspense>
          }
        />
         <Route
          path="pointOfSale"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesTemplatePage
                key={`key_${TemplatePageRegistriesTypes.POINTOFSALE}.id`}
                props={{ templateType: TemplatePageRegistriesTypes.POINTOFSALE }}
              />
            </React.Suspense>
          }
        />
         <Route
          path="companies"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesTemplatePage
                key={`key_${TemplatePageRegistriesTypes.COMPANIES}.id`}
                props={{ templateType: TemplatePageRegistriesTypes.COMPANIES }}
              />
            </React.Suspense>
          }
        />
         <Route
          path="warehouse"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesTemplatePage
                key={`key_${TemplatePageRegistriesTypes.WAREHOUSES}.id`}
                props={{ templateType: TemplatePageRegistriesTypes.WAREHOUSES }}
              />
            </React.Suspense>
          }
        />
         <Route
          path="units"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesTemplatePage
                key={`key_${TemplatePageRegistriesTypes.UNITS}.id`}
                props={{ templateType: TemplatePageRegistriesTypes.UNITS }}
              />
            </React.Suspense>
          }
        />
        <Route
          path="vat"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesTemplatePage
                key={`key_${TemplatePageRegistriesTypes.VAT}.id`}
                props={{ templateType: TemplatePageRegistriesTypes.VAT }}
              />
            </React.Suspense>
          }
        />
         <Route
          path="users"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesTemplatePage
                key={`key_${TemplatePageRegistriesTypes.USERS}.id`}
                props={{ templateType: TemplatePageRegistriesTypes.USERS }}
              />
            </React.Suspense>
          }
        />
        <Route
          path="groups"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesTemplatePage
                key={`key_${TemplatePageRegistriesTypes.GROUPS}.id`}
                props={{ templateType: TemplatePageRegistriesTypes.GROUPS }}
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
        <Route
          path="createMarketPlace"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMMARKETPLACE }} />
            </React.Suspense>
          }
        />
        <Route
          path="createPointOfSale"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMPOINTOFSALE }} />
            </React.Suspense>
          }
        />
        <Route
          path="createCompany/:id"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMCOMPANY, typeFrom: "" }} />
            </React.Suspense>
          }
        />
        <Route
          path="createDistributor"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMDISTRIBUTOR, typeFrom: "" }} />
            </React.Suspense>
          }
        />
        <Route
          path="createCompanyWizard"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMCOMPANY, typeFrom: "wizard" }} />
            </React.Suspense>
          }
        />
        <Route
          path="createWarehouse"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMWAREHOUSE }} />
            </React.Suspense>
          }
        />
        <Route
          path="createUnit"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMUNIT }} />
            </React.Suspense>
          }
        />
        <Route
          path="createGroup"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMGROUP }} />
            </React.Suspense>
          }
        />

        <Route
          path="createVat"
          element={ 
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMVAT }} />
            </React.Suspense>
          }
        />
        <Route
          path="createUser/:id"
          element={
            <React.Suspense fallback={<>...</>}>
              <RegistriesCreateTemplatePage props={{ type: CreateTyperegistries.FORMUSERS }} />
            </React.Suspense>
          }
        />
      </Route> 
      <Route
          path="/registries/infoCompany"
          element={
            <InfoCompany />
          }
        />

    </>
  );
}
function articlesRoutes(): React.ReactNode {
  return (
    <>
      <Route path="articles" element={<ArticlesLayout />}>
        <Route
            index
            element={
              <React.Suspense fallback={<>...</>}>
                <DashboardArticlesPage  props={ {}} />
              </React.Suspense>
            }
          />
         <Route
          path="articlesList"
          element={
            <React.Suspense fallback={<>...</>}>
              <ArticlesTemplatePage
                key={`key_${TemplatePageArticlesTypes.LIST}.id`}
                props={{ templateType: TemplatePageArticlesTypes.LIST }}
              />
            </React.Suspense>
          }
        />
        <Route
          path="subject"
          element={
            <React.Suspense fallback={<>...</>}>
              <ArticlesTemplatePage
                key={`key_${TemplatePageArticlesTypes.SUBJECT}.id`}
                props={{ templateType: TemplatePageArticlesTypes.SUBJECT }}
              />
            </React.Suspense>
          }
        />

        <Route
          path="createArtikal"
          element={
            <React.Suspense fallback={<>...</>}>
              <ArticlesCreateTemplatePage props={{ type: CreateTypeArticles.FORMARTICLES }} />
            </React.Suspense>
          }
        />
        <Route
          path="createArtikalPrice"
          element={
            <React.Suspense fallback={<>...</>}>
              <ArticlesCreateTemplatePage props={{ type: CreateTypeArticles.FORMARTICLESPRICE }} />
            </React.Suspense>
          }
        />

        <Route
          path="createSubject"
          element={
            <React.Suspense fallback={<>...</>}>
              <ArticlesCreateTemplatePage props={{ type: CreateTypeArticles.FORMSUBJECT }} />
            </React.Suspense>
          }
        />
      </Route> 
    </>
  );
}
