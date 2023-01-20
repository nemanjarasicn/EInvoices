/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IProps } from "../../models";
import {FormAutocompleteField} from "../form-fields/FormAutocompleteField";
import { GroupFieldProps } from "../form-fields/models/form-fields.models";
import InvoiceLine from "./InvoiceLine";
import { selectProducts } from "../form-fields/store/form.selectors";
import { AutocompleteItem } from "../form-fields/models/form-fields.models";
import Box from '@mui/material/Box'
import { DataGrid, GridColDef, GridSelectionModel,  GridToolbar , GridPagination} from "@mui/x-data-grid";
import { Grid, IconButton } from "@mui/material";
import TableNoRowsOverlay from "../DataGrid/NoRowsOverlay";
import { useTranslation } from "react-i18next";
import TablePagination from "../DataGrid/TablePagination";
import DeleteIcon from "@mui/icons-material/Delete";
import FormTextField from "../form-fields/FormTextField";


type InvoiceItemsComponentProps = Omit<GroupFieldProps, "title"> & {
  formSetValue: Function;
  formGetValues: Function;
  formWatch: Function;
  fieldLabels: any;
  reset?: any;
};



export default function InvoiceItemsComponent({
  props,
}: IProps<InvoiceItemsComponentProps>): JSX.Element {
  const { control, formWatch, formSetValue, formGetValues, fieldLabels } =
    props;
  const { t } = useTranslation();
  const [items, setItems] = React.useState<any[]>([]);
  const [itemsList, setItemsList] = React.useState<any[]>([]);
  const [name, setName] = React.useState<any>("");
  const childRef = React.useRef();


  const columns: GridColDef[] =  [
    {
      field: "name",
      headerName: t("Form.formFieldsLabels.productName"),
      flex: 1,
      headerAlign: "center",
      align: "center",
      hideable: false,
    }, 
    {
    field: "invoicedQuantity",
    headerName: t("Form.formFieldsLabels.invoicedQuantity"),
    flex: 1,
    headerAlign: "center",
    align: "center",
    hideable: false,
  },
  {
    field: "price",
    headerName: t("Form.formFieldsLabels.price"),
    flex: 1,
    headerAlign: "center",
    align: "center",
    hideable: false,
  },
  {
    field: "unitCode",
    headerName: t("Form.formFieldsLabels.unitCode"),
    flex: 1,
    headerAlign: "center",
    align: "center",
    hideable: false,
  },
  {
    field: "discount",
    headerName: t("Form.formFieldsLabels.discount"),
    flex: 1,
    headerAlign: "center",
    align: "center",
    hideable: false,
  },
  {
    field: "vatName",
    headerName: t("Form.formFieldsLabels.percent"),
    flex: 1,
    headerAlign: "center",
    align: "center",
    hideable: false,
  },

  {
    field: "priceAmount",
    headerName: t("Form.formFieldsLabels.priceAmount"),
    flex: 1,
    headerAlign: "center",
    align: "center",
    hideable: false,
  },
  {
    field: 'action',
    headerName: t("Form.formFieldsLabels.delete"),
    flex: 1,
    headerAlign: "center",
    align: "center",
    hideable: true,
    renderCell: (params: any) => (
      <Box sx={{display:  'flex', justifyContent: 'space-between', p: 2}}>
            <IconButton color="primary" aria-label="xml" component="label"    onClick={() => deleteListItem(params.row.id)} >
                <DeleteIcon  sx={{  color: "#0D78DE"}} />
              </IconButton>
      </Box>
    )
  },
]



  React.useEffect(() => {
    setItems(formGetValues("invoiceLine"));
  }, []);

  React.useEffect(() => {
    setItems([]);
    formSetValue("invoiceLine", []);
  }, [formWatch("warehouse_uuid")]);



  /**
   * Handle Add New Line
   */
  const handleAddLine = (item: AutocompleteItem) => {
    if (item && item.item) {
      const id = Math.random();
      setItems(() => [
        ...formGetValues("invoiceLine"),
        { idLine: id, ...item?.item },
      ]);
      formSetValue(
        `naziv`, item?.name);
      formSetValue("invoiceLine", [
        ...formGetValues("invoiceLine"),
        { idLine: id, ...item?.item },
      ]);
    }
  };

  /**
   * Handle Delete Line
   */
  const handleAddItemList = (index: any) => {
    const newItems: any[] = [];
    const newItemsList: any = formGetValues("invoiceLine").slice(-1)[0];

  if(newItemsList.invoicedQuantity)  {
      setItems([]);
        setItemsList((prevState)   =>  [...prevState, 
                                        {id:  newItemsList.id, 
                                        name: newItemsList.item.name, 
                                        unitCode: newItemsList.unitCode,
                                        vatName:  newItemsList.vatName,
                                        invoicedQuantity:    newItemsList.invoicedQuantity,
                                        price:   newItemsList.price.unitPrice,
                                        discount:  newItemsList.price.discount,
                                        priceAmount:  newItemsList.price.priceAmount }]);
        formSetValue(`naziv`, "");
  }
                                      
  };  


  
  const  deleteListItem   = (id: number | string) =>  {
    const newItemInvoiceLine =  formGetValues("invoiceLine").filter((item: any)   =>  item.id !==  id);
    const  newList = itemsList.filter((item)   =>  item.id  !== id);
    setItemsList(newList);
    formSetValue("invoiceLine", newItemInvoiceLine);

  }

  function CustomFooterTotalComponent() {
    const totalSum = formGetValues('finalSum');
    const priceWithoutDiscount = formGetValues('priceWithoutDiscount');
    const sumWithDiscount =  formGetValues('sumWithDiscount');
    const taxAmount =  formGetValues('taxAmount');
    const  taxableAmount  =  formGetValues('taxableAmount');

    const currencyFormat = (num: any) => {
      return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }

    return (
      <>
      <Box sx={{display:  'flex', mt: 7, flexDirection:  'column',  justifyContent: 'center', alignItems:  'flex-end'}}>

            <Box sx={{ display: "flex" }}>  {t("Form.formFieldsLabels.priceWithoutDiscount")} :  {currencyFormat(priceWithoutDiscount)}</Box>
            <Box sx={{ display: "flex" }}>  {t("Form.formFieldsLabels.sumWithDiscount")} :    {currencyFormat(sumWithDiscount)}</Box>
            <Box sx={{  display: "flex" }}>   {t("Form.formFieldsLabels.taxableAmount")}:    {currencyFormat(taxableAmount)}</Box>
            <Box sx={{  display: "flex" }}>   {t("Form.formFieldsLabels.taxAmount")}:   {currencyFormat(taxAmount)}</Box>
            <Box sx={{ paddingTop:   '10px', display: "flex", fontWeight: 700 }}>   {t("Form.formFieldsLabels.priceAmount")}  : {currencyFormat(totalSum)}</Box>
      </Box>
      </>
    );
  }


  const fontSize  =    window.devicePixelRatio === 1.5 ?    '12px' :  '16px';


  return (
    <>
      {/*<div style={{ width: "20%" }}>*/}
      <Grid container spacing={1}  >
        <Grid item xs={3} >
            <FormAutocompleteField
              props={{
                name: "foundProduct",
                control: control,
                label: t(fieldLabels.search.label),
                disabled: false,
                additional: {
                  selector: selectProducts,
                  parentFn: handleAddLine,
                  labelShrink: true,
                  placeholder: t(fieldLabels.search.placeholder),
                  noResultText: t(fieldLabels.search.noResult),
                  reset: props.reset,
                },
              }}
            />
        </Grid>
        <Grid item xs={2}>
        <FormTextField
          props={{
            control: control,
            disabled: true,
            label: t('Form.formFieldsLabels.productName'),
            name: `naziv`,
            additional: {
              suffix: "",
              readonly: true,
            },
          }}
        />
        </Grid>
      {/*</div>*/}
        <Grid item xs={12} >
            {items.map((item: any, index: number) => {
              if(items.length - 1 === index) {
              return (
                <InvoiceLine
                  key={`invoice_liine_${item.idLine}_id`}
                  props={{
                    item: item,
                    control: control,
                    formWatch: formWatch,
                    formSetValue: formSetValue,
                    formGetValues: formGetValues,
                    index: index,
                    handleAddItemList: handleAddItemList,
                    fieldLabels: fieldLabels.invoiceLine,
                  }}
                ></InvoiceLine> 
              );
              }
              
            })}
        </Grid>
    </Grid>
    <DataGrid
      style={{ minHeight:  500,   backgroundColor: 'white',  overflow: "auto", scrollBehavior: "smooth",  fontSize:   fontSize }}
      disableColumnMenu
      pagination
      disableColumnFilter
      showCellRightBorder={false}
      components={{
        NoRowsOverlay: TableNoRowsOverlay,
        Footer: CustomFooterTotalComponent
      }}
      
      rows={itemsList}
      getRowId={(row: any) =>  Math.random()}
      rowsPerPageOptions={[5, 10, 15, 30]}
      columns={columns}
      //autoHeight={true}
      density="compact"
      componentsProps={{
        
        noRowsOverlay: {
          props: { message: t("Table.NoRows") },
        },
        pagination: {
          labelRowsPerPage: t('redova po strani')
        }
      }}
      //pageSize={10}
      sx={{ "& .MuiDataGrid-columnHeaderCheckbox .MuiDataGrid-columnHeaderTitleContainer":
      {
        display: "none",
      },

    ".MuiDataGrid-columnSeparator": {
      display: "none",
    },
    "&.MuiDataGrid-root": {
      border: "none",
    },}}

    />
    </>
  );
}
