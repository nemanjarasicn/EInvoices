import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import  { setopenModalFilter }  from   "../store/invoice.reducer"
import { searchInvoices } from "../store/invoice.actions";
import CheckboxField from '../../shared/components/form-fields/FormCheckboxField';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FormTextField  from  "../../shared/components/form-fields/FormTextField"
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import { yupResolver } from "@hookform/resolvers/yup";
import { setFilters } from "../store/invoice.reducer";
import { InvoiceSearchParams, IProps } from "../models/invoice.models";
import { selectFilters }   from  "../store/invoice.selectors"


const schema = yup
 .object({
   // client: yup
   //   .object({
   //     vatRegistrationCode: yup.string().required(),
   //   })
   //   .required(),
   // dropdownValue: yup.string().required(),
   // textAreaValue: yup.string().required(),
   // dateValue: yup.string().required(), //validate date format
   // autocompleteValue: yup.object().required(),
   // checkbox: yup.bool().required(),
   // numberValue: yup.number().required(),
   // invoiceLine: yup.array().of(
   //   yup.object({
   //     invoicedQuantity: yup.number().moreThan(0, ""),
   //   })
   // ),
 })
 .required();

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio === 1.5 ? 350 : 600 , 
    height: () => window.devicePixelRatio === 1.5 ? 320 : 500 ,
   

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 5,
    backgroundColor:  '#323b40',
    display:  'flex',
    justifyContent:  'center'
  };



  const  filterItemsTypeDocument =   [
    { index: 0, name: "debitInvoice", label: "Faktura", value: "380" },
    { index: 1, name: "creditNote", label: "Knjižno odobrenje", value: "381" },
    { index: 2,  name: "debitNote", label: "Knjižno zaduženje", value: "384" },
    { index: 3, name: "prepayment",  label: "Avansni račun", value: "386" },
  ]


  const filterItems =  [
    { index: 0, name: "InvoiceStatuses.draft", label: "Draft", value: "Draft" },
    { index: 1, name: "InvoiceStatuses.sent", label: "Sent", value: "Sent" },
    { index: 2, name: "InvoiceStatuses.new", label: "New", value: "New" },
    {
      index: 3,
      name: "InvoiceStatuses.cancelled",
      label: "Cancelled",
      value: "Cancelled",
    },
    { index: 4, name: "InvoiceStatuses.approved", label: "Approved", value: "Approved" },
    { index: 5, name: "InvoiceStatuses.rejected", label: "Rejected", value: "Rejected" },
    { index: 6, name: "InvoiceStatuses.storno", label: "Storno", value: "Storno" },
    { index: 7, name: "InvoiceStatuses.sending", label: "Sending", value: "Sending" },
    { index: 8, name: "InvoiceStatuses.paid", label: "Paid", value: "Paid" },
    { index: 9, name: "InvoiceStatuses.mistake", label: "Mistake", value: "Mistake" },
    { index: 10, name: "InvoiceStatuses.overDue", label: "OverDue", value: "OverDue" },
    {
      index: 11,
      name: "InvoiceStatuses.archived",
      label: "Archived",
      value: "Archived",
    },
    { index: 12, name: "InvoiceStatuses.deleted", label: "Deleted", value: "Deleted" },
    { index: 13, name: "InvoiceStatuses.unknown", label: "Unknown", value: "Unknown" },
    { index: 14, name: "InvoiceStatuses.seen", label: "Seen", value: "Seen" },
  ]
  

export default function  FilterModal(props: any)  {

    const dispach  = useAppDispatch();
    const { t } = useTranslation();

    const [typeDocumentFilter,  setTypeDocumentFilter]  = React.useState<any[]>([]);
    const filter1 =  (props.filterName ===  "Svi tipovi dokumenata"  ?  filterItemsTypeDocument  :  filterItems);
    const  [filterList,  setFilterList]   =  React.useState(useAppSelector(selectFilters));
    const filterTmp = useAppSelector(selectFilters);

    const  defaultValues:  any = {
            debitInvoice:  "380",
            creditNote:  "381",
            debitNote: "384",
            prepayment:  "386",
        InvoiceStatuses: {
            draft:  "Draft",
            sent:  "Sent",
            approved:  "Approved",
            cancelled:  "Cancelled",
            new:  "New",
            rejected:  "Rejected",
            storno:  "Storno",
            paid:   "Paid",
            sending:  "Sending",
            overDue:   false,
            mistake:  "Mistake",
            unknown:  false,
            archived:  false,
            deleted:  false,
            seen:   false,
        },

      };

    
    const methods = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
      });
      const {
        handleSubmit,
        reset,
        control,
      } = methods;

      const companyId = useAppSelector(selectCompanyCurrent);


      const onSubmit = async  (data: any) => {
            //logic for invoices status
            const listData = (Object.keys(data).filter((item)  => item ===  "InvoiceStatuses"))
            const arrayData  = data[listData[0]];
            const array = (Object.keys(arrayData).filter((item)  =>  arrayData[item]  !==  undefined &&  arrayData[item]  !== false));
            const invoicesStatusList =  array.map((item) => arrayData[item]);
            //------------------

            //  logic for typeDocument 
            const arrayTypeDocument = (Object.keys(data).filter((item)  =>  item !==  "InvoiceStatuses" && data[item]  !==  false ));
            const typeDocumentList = arrayTypeDocument.map((item) => data[item]);
            await setTypeDocumentFilter(typeDocumentList);

            
            //  ---------------------------------------
           

            setFilterList((prevState)  => {
                return({
                  ...prevState,
                  typeDocument:  typeDocumentList ,
                  invoiceStatus:  invoicesStatusList
                });
            });

            props.onSubmitFromFilterModal({ 
                typeDocument:  typeDocumentList ,
                invoiceStatus:  invoicesStatusList
            });
            
            dispach(setopenModalFilter({open:  false,  filterName:  ""}));
    }
      return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
            <Grid sx={{display:  'flex', width: '100%',  flexDirection:  'column',  height:  '100%'}} >
                    <Grid sx={{display:  'flex', height:  '10%'}} >
                            <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center', fontFamily: 'Roboto', 
                                        fontStyle: 'normal',

                                        /* or 158% */
                                        lineHeight:  '32px', 
                                        fontWeight:   500, 
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16,   color:  'white'}}>
                                        Filteri
                                    </Typography>
                            
                            </Grid>
                            <Grid item  xs={2}  sx={{display:   'flex',   color:  'white',   justifyContent:  'flex-end'}} >
                                    <Typography onClick={() => {dispach(setopenModalFilter({open:false,  filterName:   ""}))}} sx={{fontFamily: 'Roboto', 
                                        fontStyle: 'normal',

                                        /* or 158% */
                                        lineHeight:  '32px', 
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 16,
                                        '&:hover':{cursor: 'pointer'
                                    }}}>X</Typography>
                            </Grid>
                    </Grid>
                    <Divider sx={{backgroundColor:  '#6cb238'}} />

                    <Grid sx={{display:  'flex', height:  '80%', justifyContent: 'center', mt: 2.5}} >
                        <Grid container spacing={2}  sx={{display: 'flex', flexDirection:  'column'}}>
                            <Grid item xs={6}  sx={{display: 'flex', flexDirection:  'column'}}>
                            {filter1.slice(0,5).map((item) => (
                            <CheckboxField  key={item.value}
                                  props={{
                                      control: control,
                                      name: item.name,
                                      label: item.label,
                                      disabled: false,
                                      additional: { readonly: false, labelShrink: true ,  defaultValue: item.value,},
                                  
                                  }}
                            />
                            ))}
                            </Grid>
                            <Grid item xs={6}  sx={{display: 'flex', flexDirection:  'column'}} >
                            {filter1.slice(5,10).map((item) => (
                            <CheckboxField   key={item.value}
                                  props={{
                                      control: control,
                                      name: item.name,
                                      label: item.label,
                                      disabled: false,
                                      additional: { readonly: false, labelShrink: true ,  defaultValue: item.value,},
                                  
                                  }}
                            />
                            ))}
                            </Grid>
                        </Grid>
                    </Grid>
                    
                    <Grid sx={{display:  'flex', height:  '10%', justifyContent:  'center'}} >
                                    <Grid item xs={6} sx={{mr: 2.5}}>
                                                <Button fullWidth variant="contained"     onClick={() => {dispach(setopenModalFilter({open:  false,  filterName:  ""}))}}    sx={{  fontSize: 14, backgroundColor:  'transparent',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
                                    </Grid>
                                    <Divider />
                                    <Grid item xs={6} >
                                                <Button fullWidth variant="contained"   onClick={handleSubmit(onSubmit)}  sx={{ fontSize: 14, height:    '56px',  backgroundColor:  '#6cb238',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Snimi</Button>
                                  </Grid>      
                            </Grid>
            </Grid>
            </Box>
      </Modal>
    );
  }