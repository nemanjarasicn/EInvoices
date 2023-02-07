/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { DataGrid, GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { IProps, TableData } from "../../models/registries.models";

import { useDataGridStyles } from "./dataGrid.styles";
import { setSelection } from "./store/data-grid.reducer";
import { selectSelection } from "./store/data-grid.selectors";
import TableToolbar, { TableToolbarProps } from "./TableToolbar";
import TableNoRowsOverlay from "./NoRowsOverlay";
import { useTranslation } from "react-i18next";
import TablePagination from "./TablePagination";
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { Button,  Grid } from "@mui/material";
import SearchField from "../../../shared/components/form-fields/SearchField";
import { useForm } from "react-hook-form";
import { searchModel  }  from  "../../models/registries.models"


export type TableComponentProps = {
  columnsDef: GridColDef[];
  toolbarProps: TableToolbarProps;
  getDataAction: AsyncThunkAction<any, void | {companyId: number | string } | {uuid:  number |  string}, {}>;
  selectType: string;
  selector:  any;
  parentColumn: string;
  footerProps: any;
};

export default function TableComponent({
  props,
}: IProps<TableComponentProps>): JSX.Element {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { tableComponentStyles } = useDataGridStyles();
  const selectType = props.selector;
  const [searchData, setSearchData]  = React.useState<any[]>([])
  // TODO
  const [pageSize, setPageSize] = React.useState<number>(30);

  const  defaultValues:  searchModel = {
    search:  "",
  };

  const methods = useForm({
    defaultValues
  });
  const {
    control,
    setValue,
    getValues,
    watch
  } = methods;



  const tableData: TableData<any>[] = (useAppSelector(selectType) as any).map(
    (row: any) => ({
      ...row,
      id: row[props.parentColumn],
    })
  );

  

  const selection: GridSelectionModel = useAppSelector(selectSelection);


  const fontSize  =    window.devicePixelRatio === 1.5 ?    '12px' :  '16px';



  React.useEffect(() => {
    setSearchData(tableData);
  }, [useAppSelector(selectType)]);


  const   handleSearch  = ()  =>  {
    const selectType = props.selectType
    if(getValues('search')) {
      if(selectType === 'COMPANIES') {
        const searchDataTmp =  tableData.filter((item)  => (item.companyName.toLowerCase().includes(getValues('search').toLowerCase()))  ||  (item.pib.toLowerCase().includes(getValues('search').toLowerCase())));
        setSearchData(searchDataTmp);
      } 
    } else {
      setSearchData(tableData);
    }

  }

  return (
    <>
      <Grid  item xs={12}   sx={{display:  'flex', justifyContent: 'center'}} >
        <Grid item xs={6} sx={{justifyContent:  'center'}}>
           <SearchField   props={{
                                    name: "search",
                                    control: control,
                                    label: "Pretraga",
                                    additional: { readonly: false,   parentFn:  handleSearch},
                                    disabled: false,
                                  }} />
        </Grid>
      </Grid>
      <DataGrid
        style={{ minHeight: tableData.length ? undefined : 400, backgroundColor: 'white', borderRadius:  '15px',  fontSize:  fontSize }}
        disableColumnMenu
        pagination
        disableColumnFilter
        disableSelectionOnClick
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
         rowsPerPageOptions={[5, 10, 15, 30]}
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
        /*checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          dispatch(setSelection(newSelectionModel));
        }}
        selectionModel={selection}*/
      />
    </>
  );
}
