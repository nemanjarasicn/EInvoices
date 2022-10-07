/* eslint-disable react-hooks/exhaustive-deps */
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridSelectionModel,
} from "@mui/x-data-grid";

import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { TemplatePageTypes } from "../../models/invoice.enums";
import { InvoiceDto, IProps, TableData } from "../../models/invoice.models";
import { getSalesInvoices } from "../../store/invoice.actions";
import { invoiceSelectors } from "../../store/invoice.selectors";
import { useComponentsStyles } from "../components.styles";
import { setSelection } from "./store/data-grid.reducer";
import { selectSelection } from "./store/data-grid.selectors";
import TableToolbar from "./TableToolbar";

type TableComponentProps = {
  headerNames?: string[];
  pageType: TemplatePageTypes;
};
// TODO Service for Config ////////////////////////////////////////
const dateFormater = new Intl.DateTimeFormat("en-US", {
  localeMatcher: "best fit",
});
const columns: GridColDef[] = [
  {
    field: "InvoiceNumber",
    headerName: "InvoiceNumber",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "InvoiceType",
    headerName: "InvoiceType",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "CirInvoiceId",
    headerName: "CirInvoiceId",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "CirStatus",
    headerName: "CirStatus",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Status",
    headerName: "Status",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "Receiver",
    headerName: "Receiver",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "TotalToPay",
    headerName: "TotalToPay",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "InvoiceDateUtc",
    headerName: "InvoiceDateUtc",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      dateFormater.format(params.row.InvoiceDateUtc),
    headerAlign: "center",
    align: "center",
  },
  {
    field: "InvoiceSentDateUtc",
    headerName: "InvoiceSentDateUtc",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      dateFormater.format(params.row.InvoiceSentDateUtc),
    headerAlign: "center",
    align: "center",
  },
  {
    field: "PaymentDateUtc",
    headerName: "PaymentDateUtc",
    flex: 1,
    valueGetter: (params: GridValueGetterParams) =>
      dateFormater.format(params.row.PaymentDateUtc),
    headerAlign: "center",
    align: "center",
  },
  {
    field: "ReferenceNumber",
    headerName: "ReferenceNumber",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "ServiceProvider",
    headerName: "ServiceProvider",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "ChannelAdress",
    headerName: "ChannelAdress",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
];
//////////////////////////////////////////////////////////////////////////

export default function TableComponent({
  props,
}: IProps<TableComponentProps>): JSX.Element {
  const dispatch = useAppDispatch();
  const { tableComponentStyles } = useComponentsStyles();

  // TODO
  // const [pageSize, setPageSize] = React.useState<number>(5);

  React.useEffect(() => {
    dispatch(getSalesInvoices());
  }, []);

  const tableData: TableData<InvoiceDto>[] = useAppSelector(
    invoiceSelectors.selectAll
  ).map((row: InvoiceDto) => ({
    ...row,
    id: row.InvoiceId,
  }));

  const selectionModel: GridSelectionModel = useAppSelector(selectSelection);

  return (
    <div style={tableComponentStyles.wrapper}>
      <DataGrid
        disableColumnMenu
        disableColumnFilter
        showCellRightBorder={true}
        localeText={{ toolbarColumns: "" }}
        rows={tableData}
        columns={columns}
        autoHeight={true}
        // pageSize={pageSize}
        // rowsPerPageOptions={[5, 10, 15]}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        components={{
          Toolbar: TableToolbar,
        }}
        componentsProps={{
          toolbar: {
            props: {
              showFilters: false,
              showDensity: false,
              showHideColumns: true,
              showExport: false,
            },
          },
          panel: {
            placement: "bottom-end",
          },
        }}
        sx={tableComponentStyles.dataGrid}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          dispatch(setSelection(newSelectionModel));
        }}
        selectionModel={selectionModel}
      />
    </div>
  );
}
