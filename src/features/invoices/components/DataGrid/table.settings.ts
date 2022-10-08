import { GridValueGetterParams } from "@mui/x-data-grid";
import { HeaderSettingsTypes } from "../../models/invoice.enums";
import {
  getPurchaseInvoices,
  getSalesInvoices,
} from "../../store/invoice.actions";
import { TableComponentProps } from "./TableComponent";

const dateFormater = new Intl.DateTimeFormat("en-US", {
  localeMatcher: "best fit",
});

type TableSettings = {
  tableSettings: {
    [key in HeaderSettingsTypes]: {
      dataGrid: TableComponentProps;
    };
  };
};
/**
 * hook predefine table settings
 * @returns {TableSettings}
 */
const useTableSettings = (): TableSettings => {
  return {
    tableSettings: {
      [HeaderSettingsTypes.SALES]: {
        dataGrid: {
          columnsDef: [
            {
              field: "InvoiceNumber",
              headerName: "TableColumns.InvoiceNumber",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "InvoiceType",
              headerName: "TableColumns.InvoiceType",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "CirInvoiceId",
              headerName: "TableColumns.CirInvoiceId",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "CirStatus",
              headerName: "TableColumns.CirStatus",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "Status",
              headerName: "TableColumns.Status",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            {
              field: "Receiver",
              headerName: "TableColumns.Receiver",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "TotalToPay",
              headerName: "TableColumns.TotalToPay",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "InvoiceDateUtc",
              headerName: "TableColumns.InvoiceDateUtc",
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
              headerName: "TableColumns.InvoiceSentDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dateFormater.format(params.row.InvoiceSentDateUtc),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "PaymentDateUtc",
              headerName: "TableColumns.PaymentDateUtc",
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
              headerName: "TableColumns.ReferenceNumber",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
            {
              field: "ServiceProvider",
              headerName: "TableColumns.ServiceProvider",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: true,
            },
            {
              field: "ChannelAdress",
              headerName: "TableColumns.ChannelAdress",
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
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
      [HeaderSettingsTypes.PURCHASES]: {
        dataGrid: {
          columnsDef: [
            {
              field: "InvoiceNumber",
              headerName: "TableColumns.InvoiceNumber",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "InvoiceType",
              headerName: "TableColumns.InvoiceType",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "CirInvoiceId",
              headerName: "TableColumns.CirInvoiceId",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "CirStatus",
              headerName: "TableColumns.CirStatus",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "Status",
              headerName: "TableColumns.Status",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            {
              field: "Supplier",
              headerName: "TableColumns.Supplier",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "TotalToPay",
              headerName: "TableColumns.TotalToPay",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "InvoiceDateUtc",
              headerName: "TableColumns.InvoiceDateUtc",
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
              headerName: "TableColumns.InvoiceSentDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dateFormater.format(params.row.InvoiceSentDateUtc),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "PaymentDateUtc",
              headerName: "TableColumns.PaymentDateUtc",
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
              headerName: "TableColumns.ReferenceNumber",
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
          getDataAction: getPurchaseInvoices(),
          footerProps: {
            countTxt: "Table.FooterCountTxt",
            totalAmountTxt: "Table.FooterTotalAmountTxt",
          },
        },
      },
    },
  };
};
export { useTableSettings };
