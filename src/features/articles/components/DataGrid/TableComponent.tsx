/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { IProps, TableData } from "../../models/articles.models";

import { useDataGridStyles } from "../../../shared/components/DataGrid/dataGrid.styles";
import TableToolbar, { TableToolbarProps } from "../../../shared/components/DataGrid/TableToolbar";
import TableNoRowsOverlay from "../../../shared/components/DataGrid/NoRowsOverlay";
import { useTranslation } from "react-i18next";
import TablePagination from "../../../shared/components/DataGrid/TablePagination";
import { selectCompany } from "../../../../app/core/core.selectors";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { Button, Grid } from "@mui/material";
import SearchField from "../../../shared/components/form-fields/SearchField";
import { useForm } from "react-hook-form";
import  { searchSubjectModel }  from "../../models/articles.models"


export type TableComponentProps = {
  columnsDef: GridColDef[];
  toolbarProps: TableToolbarProps;
  getDataAction: AsyncThunkAction<any, void | {uuid:  number |  string} | {companyId: number | string}, {}>;
  selectType: string;
  selector:  any;
  parentColumn: string;
  //footerProps: any;
};

export default function TableComponent({
  props,
}: IProps<TableComponentProps>): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { tableComponentStyles } = useDataGridStyles();
  const selectType = props.selector;
  const [searchData, setSearchData]  = React.useState<any[]>([])
  const [pageSize, setPageSize] = React.useState<number>(30);
  const  defaultValues:  searchSubjectModel = {
        searchSubject:  "",
      };
   const tableData: TableData<any>[] = (useAppSelector(selectType) as any).map(
      (row: any) => ({
        ...row,
        id: row[props.parentColumn],
      })
    );

  const methods = useForm({
    defaultValues
  });
  const {
    control,
    setValue,
    getValues,
    watch
  } = methods;


  React.useEffect(() => {
    setSearchData(tableData);
  }, [useAppSelector(selectType)]);

  const   handleSearch  = ()  =>  {
    const selectType = props.selectType
    console.log('sasaasas',  props.selectType );
    if(getValues('searchSubject')) {
      if(selectType === 'ARTICLES') {
        const searchDataTmp =  tableData.filter((item)  => item.productName.includes(getValues('searchSubject')));
        setSearchData(searchDataTmp);
      } else {
        const searchDataTmp =  tableData.filter((item)  => item.companyName.includes(getValues('searchSubject')));
        setSearchData(searchDataTmp);
      }
    } else {
      setSearchData(tableData);
    }

  }

 // const selection: GridSelectionModel = useAppSelector(selectSelection);


 const fontSize  =    window.devicePixelRatio === 1.5 ?    '12px' :  '16px';

  return (
    <div style={tableComponentStyles.wrapper}>
      <Grid xs={12}   sx={{display:  'flex', justifyContent: 'center'}} >
        <Grid xs={6} sx={{justifyContent:  'center'}}>
           <SearchField   props={{
                                    name: "searchSubject",
                                    control: control,
                                    label: "Pretraga",
                                    additional: { readonly: false,  parentFn:  handleSearch },
                                    disabled: false,
                                  }} />
        </Grid>
      </Grid>
      <DataGrid
        style={{ minHeight: tableData.length ? undefined : 400 ,  backgroundColor: 'white', borderRadius: '15px' }}
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
        }}
        rows={[...searchData]}
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
        //checkboxSelection
        /*onSelectionModelChange={(newSelectionModel) => {
          dispatch(setSelection(newSelectionModel));
        }}*/
        //selectionModel={selection}
      />
    </div>
  );
}
