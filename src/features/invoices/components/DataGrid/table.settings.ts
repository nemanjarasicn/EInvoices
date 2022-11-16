import { GridValueGetterParams } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { HeaderSettingsTypes } from "../../models/invoice.enums";
import { handleInvoiceStatus } from "../../utils/utils";
import { TableComponentProps } from "./TableComponent";

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
              field: "numberDocument",
              headerName: "TableColumns.InvoiceNumber",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "typeDocument",
              headerName: "TableColumns.InvoiceType",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                handleInvoiceStatus(params.row.typeDocument),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "crfInvoiceId",
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
              field: "invoiceStatus",
              headerName: "TableColumns.Status",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            {
              field: "clientName",
              headerName: "TableColumns.Receiver",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "finalSum",
              headerName: "TableColumns.TotalToPay",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "deliveryDate",
              headerName: "TableColumns.InvoiceDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.deliveryDate).format("YYYY-MM-DD"),
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
              field: "dateIssue",
              headerName: "TableColumns.InvoiceSentDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dateIssue).format("YYYY-MM-DD"),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "dueDate",
              headerName: "TableColumns.PaymentDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dueDate).format("YYYY-MM-DD"),
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
              field: "numberDocument",
              headerName: "TableColumns.InvoiceNumber",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "typeDocument",
              headerName: "TableColumns.InvoiceType",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                handleInvoiceStatus(params.row.typeDocument),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "crfInvoiceId",
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
              field: "invoiceStatus",
              headerName: "TableColumns.Status",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: true,
            },
            {
              field: "clientName",
              headerName: "TableColumns.Supplier",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "finalSum",
              headerName: "TableColumns.TotalToPay",
              flex: 1,
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "deliveryDate",
              headerName: "TableColumns.InvoiceDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.deliveryDate).format("YYYY-MM-DD"),
              headerAlign: "center",
              align: "center",
              hideable: true,
              hide: false,
            },
            {
              field: "dateIssue",
              headerName: "TableColumns.InvoiceSentDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dateIssue).format("YYYY-MM-DD"),
              headerAlign: "center",
              align: "center",
              hideable: false,
            },
            {
              field: "dueDate",
              headerName: "TableColumns.PaymentDateUtc",
              flex: 1,
              valueGetter: (params: GridValueGetterParams) =>
                dayjs(params.row.dueDate).format("YYYY-MM-DD"),
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
