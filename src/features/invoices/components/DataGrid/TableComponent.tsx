/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { TemplatePageTypes } from "../../models/invoice.enums";
import { InvoiceDto, IProps, TableData } from "../../models/invoice.models";
import { invoiceSelectors } from "../../store/invoice.selectors";
import { useDataGridStyles } from "./dataGrid.styles";
import { setSelection } from "./store/data-grid.reducer";
import { selectSelection } from "./store/data-grid.selectors";
import TableToolbar, { TableToolbarProps } from "./TableToolbar";
import { AsyncThunkAction } from "@reduxjs/toolkit";

type TableComponentProps = {
  columnsDef: GridColDef[];
  toolbarProps: TableToolbarProps;
  pageType: TemplatePageTypes;
  getDataAction: AsyncThunkAction<any, void, {}>;
};

export default function TableComponent({
  props,
}: IProps<TableComponentProps>): JSX.Element {
  const dispatch = useAppDispatch();
  const getDataAction = props.getDataAction;
  const { tableComponentStyles } = useDataGridStyles();
  // TODO
  // const [pageSize, setPageSize] = React.useState<number>(5);

  React.useEffect(() => {
    dispatch(getDataAction);
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
        columns={props.columnsDef}
        autoHeight={true}
        density="compact"
        // pageSize={pageSize}
        // rowsPerPageOptions={[5, 10, 15]}
        // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        components={{
          Toolbar: TableToolbar,
        }}
        componentsProps={{
          toolbar: {
            props: props.toolbarProps,
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
