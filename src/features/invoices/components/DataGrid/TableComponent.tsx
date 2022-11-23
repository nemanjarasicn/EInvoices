/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { IProps, TableData } from "../../models/invoice.models";
import { selectInvoices } from "../../store/invoice.selectors";
import { useDataGridStyles } from "./dataGrid.styles";
import { setSelection } from "./store/data-grid.reducer";
import { selectSelection } from "./store/data-grid.selectors";
import TableToolbar, { TableToolbarProps } from "./TableToolbar";
import TableNoRowsOverlay from "./NoRowsOverlay";
import { useTranslation } from "react-i18next";
import TablePagination from "./TablePagination";
import { getTotalAmount } from "./util";

export type TableComponentProps = {
  columnsDef: GridColDef[];
  toolbarProps: TableToolbarProps;
  footerProps: any;
};

export default function TableComponent({
  props,
}: IProps<TableComponentProps>): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { tableComponentStyles } = useDataGridStyles();
  const [pageSize, setPageSize] = React.useState<number>(10);

  const tableData: TableData<any>[] = useAppSelector(selectInvoices);

  const selection: GridSelectionModel = useAppSelector(selectSelection);

  return (
    <div style={tableComponentStyles.wrapper}>
      <DataGrid
        style={{ minHeight: tableData.length ? undefined : 400 }}
        disableColumnMenu
        pagination
        disableColumnFilter
        showCellRightBorder={true}
        localeText={{
          toolbarColumns: "",
          columnsPanelTextFieldPlaceholder: `${t("Table.ColumnsPlaceholder")}`,
          columnsPanelTextFieldLabel: `${t("Table.FieldLabel")}`,
          columnsPanelShowAllButton: `${t("Table.ShowAll")}`,
          columnsPanelHideAllButton: `${t("Table.HideAll")}`,
          footerRowSelected: (count) => `
          ${t(props.footerProps.countTxt)} :
          ${count} ${t(
            props.footerProps.totalAmountTxt
          )} : RSD ${getTotalAmount(tableData, selection)}`,
        }}
        rows={[...tableData]}
        columns={props.columnsDef.map((item) => ({
          ...item,
          headerName: t(`${item.headerName}`),
        }))}
        autoHeight={true}
        density="compact"
        // pageSize={10}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 15]}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        components={{
          Toolbar: TableToolbar,
          NoRowsOverlay: TableNoRowsOverlay,
          Pagination: TablePagination,
        }}
        componentsProps={{
          toolbar: {
            props: props.toolbarProps,
          },
          panel: {
            placement: "bottom-end",
            sx: {
              [`& .MuiDataGrid-columnsPanel > div:first-of-type`]: {
                display: "none",
              },
            },
          },
          noRowsOverlay: {
            props: { message: "Table.NoRows" },
          },
        }}
        sx={tableComponentStyles.dataGrid}
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          dispatch(setSelection(newSelectionModel));
        }}
        selectionModel={selection}
      />
    </div>
  );
}
