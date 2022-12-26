/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { IProps } from "../../models";
import FormAutocompleteField from "../form-fields/FormAutocompleteField";
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
  const childRef = React.useRef();





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

            <Box sx={{ display: "flex" }}>Ukupan iznos bez popusta :  {currencyFormat(priceWithoutDiscount)}</Box>
            <Box sx={{ display: "flex" }}>Ukupan iznos sa popustom :    {currencyFormat(sumWithDiscount)}</Box>
            <Box sx={{  display: "flex" }}>Osnovica za PDV :    {currencyFormat(taxableAmount)}</Box>
            <Box sx={{  display: "flex" }}>Iznos PDV :   {currencyFormat(taxAmount)}</Box>
            <Box sx={{ paddingTop:   '10px', display: "flex", fontWeight: 700 }}>Ukupno : {currencyFormat(totalSum)}</Box>
      </Box>
      </>
    );
  }


  return (
    <>
      {/*<div style={{ width: "20%" }}>*/}
      <Grid container spacing={1}  >
        <Grid item xs={2} >
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
      {/*</div>*/}
        <Grid item xs={10} >
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
      style={{ minHeight:  400,   backgroundColor: 'white',  overflow: "auto", scrollBehavior: "smooth" }}
      disableColumnMenu
      pagination
      disableColumnFilter
      showCellRightBorder={true}
      components={{
        Footer: CustomFooterTotalComponent
      }}
      
      rows={itemsList}
      getRowId={(row: any) =>  Math.random()}
      rowsPerPageOptions={[5, 10, 15, 30]}
      columns={[
        {
          field: "name",
          headerName: "naziv",
          flex: 1,
          headerAlign: "center",
          align: "center",
          hideable: false,
        }, 
        {
        field: "invoicedQuantity",
        headerName: "kolicina",
        flex: 1,
        headerAlign: "center",
        align: "center",
        hideable: false,
      },
      {
        field: "price",
        headerName: "cena",
        flex: 1,
        headerAlign: "center",
        align: "center",
        hideable: false,
      },
      {
        field: "unitCode",
        headerName: "Mera",
        flex: 1,
        headerAlign: "center",
        align: "center",
        hideable: false,
      },
      {
        field: "discount",
        headerName: "popust",
        flex: 1,
        headerAlign: "center",
        align: "center",
        hideable: false,
      },
      {
        field: "vatName",
        headerName: "pdv",
        flex: 1,
        headerAlign: "center",
        align: "center",
        hideable: false,
      },
  
      {
        field: "priceAmount",
        headerName: "konacna cena",
        flex: 1,
        headerAlign: "center",
        align: "center",
        hideable: false,
      },
      {
        field: 'action',
        headerName: 'Action',
        flex: 1,
        headerAlign: "center",
        align: "center",
        hideable: true,
        renderCell: (params) => (
          <Box sx={{display:  'flex', justifyContent: 'space-between', p: 2}}>
                <IconButton color="primary" aria-label="xml" component="label"    onClick={() => deleteListItem(params.row.id)} >
                    <DeleteIcon  sx={{  color: "#0D78DE"}} />
                  </IconButton>
          </Box>
        )
      },
    ]}
      autoHeight={true}
      density="compact"
      pageSize={10}

    />
    </>
  );
}
