import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";
import { HeaderSettingsTypes } from "../../models/invoice.enums";
import {
  getPurchaseInvoices,
  getSalesInvoices,
} from "../../store/invoice.actions";
import { TableToolbarProps } from "./TableToolbar";

const dateFormater = new Intl.DateTimeFormat("en-US", {
  localeMatcher: "best fit",
});

type TableSettings = {
  tableSettings: {
    [key in HeaderSettingsTypes]: {
      dataGrid: {
        columns: GridColDef[];
        toolbarProps: TableToolbarProps;
        getDataAction: AsyncThunkAction<any, void, {}>;
      };
    };
  };
};
/**
 * hook predefine table settings
 * @returns {TableSettings}
 */
const useTableSettings = (): TableSettings => {
  const { t } = useTranslation();
  return {
    tableSettings: {
      [HeaderSettingsTypes.SALES]: {
        dataGrid: {
          columns: [
            {
              field: "InvoiceNumber",
              headerName: t("TableColumns.InvoiceNumber"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "InvoiceType",
              headerName: t("TableColumns.InvoiceType"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "CirInvoiceId",
              headerName: t("TableColumns.CirInvoiceId"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "CirStatus",
              headerName: t("TableColumns.CirStatus"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "Status",
              headerName: t("TableColumns.Status"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            {
              field: "Receiver",
              headerName: t("TableColumns.Receiver"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "TotalToPay",
              headerName: t("TableColumns.TotalToPay"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "InvoiceDateUtc",
              headerName: t("TableColumns.InvoiceDateUtc"),
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dateFormater.format(params.row.InvoiceDateUtc),
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
              field: "InvoiceSentDateUtc",
              headerName: t("TableColumns.InvoiceSentDateUtc"),
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dateFormater.format(params.row.InvoiceSentDateUtc),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "PaymentDateUtc",
              headerName: t("TableColumns.PaymentDateUtc"),
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dateFormater.format(params.row.PaymentDateUtc),
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
            {
              field: "ReferenceNumber",
              headerName: t("TableColumns.ReferenceNumber"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
            {
              field: "ServiceProvider",
              headerName: t("TableColumns.ServiceProvider"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
            {
              field: "ChannelAdress",
              headerName: t("TableColumns.ChannelAdress"),
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
          ],
          toolbarProps: {
            showFilters: false,
            showDensity: false,
            showHideColumns: true,
            showExport: false,
          },
          getDataAction: getSalesInvoices(),
        },
      },
      [HeaderSettingsTypes.PURCHASES]: {
        dataGrid: {
          columns: [],
          toolbarProps: {
            showFilters: false,
            showDensity: false,
            showHideColumns: true,
            showExport: false,
          },
          getDataAction: getPurchaseInvoices(),
        },
      },
    },
  };
};
export { useTableSettings };
