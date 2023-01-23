/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import {
  Card
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { IProps, TableData } from "../../models/invoice.models";
import { selectInvoices } from "../../store/invoice.selectors";
import { useDataGridStyles } from "./dataGrid.styles";
import { setSelection } from "./store/data-grid.reducer";
import { selectSelection } from "./store/data-grid.selectors";
import TableToolbar, { TableToolbarProps } from "./TableToolbar";
import TableNoRowsOverlay from "./NoRowsOverlay";
import ConfirmWithCommentDialog from "../ConfirmWithCommentDialog";
import { useTranslation } from "react-i18next";
import TablePagination from "./TablePagination";
import ModalPdf from "../../../shared/components/ModalPdf";
import  { SelectAllAction }  from '../SelectAllActionsComponent'
import  { selectOpenPdf }    from  "../../store/invoice.selectors"

import { getTotalAmount } from "./util";

export type TableComponentProps = {
  columnsDef: GridColDef[];
  toolbarProps: TableToolbarProps;
  footerProps: any;
  type?: string;
};

export default function TableComponent({
  props,
}: IProps<TableComponentProps>): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { tableComponentStyles } = useDataGridStyles();
  const [pageSize, setPageSize] = React.useState<number>(30);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [actionValue, setActionValue] = React.useState<any>(null);
  const openPdf = useAppSelector(selectOpenPdf);
  const selector  = props.type !==  'errorLogs' ?   selectInvoices  :  selectInvoices   ;
  
  const tableData: TableData<any>[] = useAppSelector(selector);

  const selection: GridSelectionModel = useAppSelector(selectSelection);

  const fontSize  =    window.devicePixelRatio === 1.5 ?    '12px' :  '14px';


   /**
   * Handle close dialog comment = false on cancel comment = string on confirm
   * @param comment input value on dialog
   */
    const handleClose = (data: {comment?: string | boolean, flagButton: string}): void => {
      if (data.flagButton  === "cancel") {
        setOpenConfirm(false);
        setActionValue(null);
      } else {
        const dataToSend = { ...actionValue, comment: data.comment };
        //dispach(updateStatusInvoice({ ...dataToSend }));
        setOpenConfirm(false);
        setActionValue(null);
        //navigate(`/invoices/${props.pageType}`)
      }
    };

    const handleActionClick =  async (action: SelectAllAction, id: number) => {

      setActionValue({
        actionType: action.actionName,
        invoiceId: id,
        invoiceType: "",
        comment: "",
      });
        setOpenConfirm(true);

    };

  return (
    <>
      <ModalPdf    open={openPdf} ></ModalPdf>
      <ConfirmWithCommentDialog
        props={{
          id: "ringtone-menu",
          keepMounted: true,
          open: openConfirm,
          onClose: handleClose,
        }}
      ></ConfirmWithCommentDialog>
            <DataGrid
              style={{ minHeight: tableData.length ? undefined : 200,   backgroundColor: 'white',  fontSize:   fontSize }}
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
              rowsPerPageOptions={[5, 10, 15, 30]}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              components={{
                //Toolbar: TableToolbar,
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
                  props: { message: t("Table.NoRows") },
                },
                pagination: {
                  labelRowsPerPage: t('redova po strani')
                }
              }}
              sx={tableComponentStyles.dataGrid}
              checkboxSelection
              onSelectionModelChange={(newSelectionModel) => {
                dispatch(setSelection(newSelectionModel));
              }}
              selectionModel={selection}
            />

    </>
  );
}
