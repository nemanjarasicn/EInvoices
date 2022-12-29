import * as React from "react";
import clsx from "clsx";
import { ButtonUnstyledProps, useButton } from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import Stack from "@mui/material/Stack";
import { InvoiceTemplatePageProps }  from  "../../../invoices/pages/InvoiceTemplatePage"
import { IProps } from "../../../invoices/models/invoice.models";
import CustomButtonFilters from "../../../invoices/components/form-fields/CustomButtonFilters";
import CheckboxField from '../../../shared/components/form-fields/FormCheckboxField';
import { useForm } from "react-hook-form";
import { Path, TemplatePageTypes } from "../../../invoices/models";
import Grid from "@mui/material/Grid";
import { useFeatureSettings } from "../../../invoices/settings";
import FormDateField from "../../../invoices/components/form-fields/FormDateField";
import { useTranslation } from "react-i18next";
import { selectFilters }   from  "../../../invoices/store/invoice.selectors"
import { searchInvoices } from "../../../invoices/store/invoice.actions";
import { format } from 'date-fns'
import dayjs from "dayjs";
import FormAutocompleteField from "../form-fields/FormAutocompleteField";
import FilterComponent, { FilterComponentProps } from "../../../invoices/components/FilterComponent";
import SelectAllActionsComponent, {
    SelectAllAction,
  } from "../../../invoices/components/SelectAllActionsComponent";

  import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
  import  { selectOpenFilter  }  from   "../../../invoices/store/invoice.selectors"
  import FilterModal from "../../../invoices/components/FilterModal";
  import { selectCompany } from "../../../../app/core/core.selectors";
  import { selectCompanyCurrent }  from  "../../../../app/core/core.selectors"


export interface ButtonProps {
  disabled: boolean;
  title: string;
  btnFn: () => void;
}
// TODO MAX Factory
type FiltersToolbarComponentProps = {
    filters: FilterComponentProps[];
    actions: SelectAllAction[];
    type: TemplatePageTypes;
  };

export default function CustomFilterBox({
    props,
}: IProps<FiltersToolbarComponentProps>): JSX.Element {
  const { t } = useTranslation();
  const { templatePageSettings } = useFeatureSettings();
  const companyId = useAppSelector(selectCompanyCurrent);


  const date  = new Date();
    //const dateTmp = new Date(date)
    const today = format(date, 'yyyy-MM-dd');
    const inputAndOutputDocumentsTmp =  props.type === 'sales' ?  'Output'  :  'Input';


  const defaultFilters = {
    companyId:  companyId,  
    inputAndOutputDocuments:  inputAndOutputDocumentsTmp,
    sendToCir: "",
    
    invoiceStatus:  "",
    typeDocument:  "",
    date: {from: today, to:  today}
}

  const dispatch = useAppDispatch();
  const [filtersSearch, setFiltersSearch]  =  React.useState(defaultFilters);
  const openModalFilter =  useAppSelector(selectOpenFilter)
  const [selectValue, setSelectValue]  =  React.useState('');


  
  const methods = useForm({
    });
  const { handleSubmit, reset, control, watch } = methods;

  React.useEffect(() => {
    const subscription = watch( async (value, { name, type }) => {
      const sendToCirValue  =   !value.sendToCir  ?   ""  :  "auto";
        setFiltersSearch((prevState: any)  => {
          return({
            ...prevState,
            companyId: companyId,
            date: 
            {from: dayjs(value.from).format("YYYY-MM-DD"), to:  dayjs(value.to).format("YYYY-MM-DD")},
            sendToCir:  sendToCirValue
          });
      });
    })
    return () => subscription.unsubscribe();
  }, [watch, companyId]);


  React.useEffect(() => {
    dispatch(
      searchInvoices({
        params: filtersSearch,
      })
    );
  }, [filtersSearch, companyId]);


  const addFiltersFromModal  = (data: any)  => {
    setFiltersSearch((prevState: any)  => {
        return({
          ...prevState,
          companyId: companyId,
          invoiceStatus:  data.invoiceStatus,
          typeDocument:  data.typeDocument
        });

    })
}

const handleChangeSelect = (value: any) =>  {
    setSelectValue(value.item.uuid)
  }


  const scaleDate  =   window.devicePixelRatio === 1.5 ?  0.7 : 0.9; 
  const fontSizeDate  =   window.devicePixelRatio === 1.5 ?  '12px' :   '14px'; 

  return (
    <>
     <FilterModal  open={openModalFilter.open} data={props.filters} filterName={openModalFilter.filterName} onSubmitFromFilterModal={addFiltersFromModal} ></FilterModal>
     <Grid item xs={12} sx={{display:  'flex'}}   >
        <Grid item xs={3.5}  mr={2}>    
                {props.filters && (
                    <CustomButtonFilters
                    groupButton={props.filters} 
                />
                )}
            </Grid>

            <Grid item xs={3.5} sx={{display:  'flex'}}  mr={2}>  

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent:  'flex-start',
                                alignContent:  'flex-start',
                                //alignContent: "space-around",
                                height: "20px ",
                                
                                margin: "auto",
                                width: "max-content",
                                
                                columnGap: "3%",
                                alignItems: "baseline",
                                marginTop: "-1px",
                              }}
                            >
                              {/*{t(`Common.from`)}*/}
                              <FormDateField
                                props={{
                                  disabled: false,
                                  name: "from",
                                  control: control,
                                  label: "",
                                }}
                              />
                              <span style={{fontSize:  fontSizeDate}}>{t(`Common.to`)}</span>
                              <FormDateField
                                props={{
                                  disabled: false,
                                  name: "to",
                                  control: control,
                                  label: "",
                                }}
                              />
                            </div>
                        
            </Grid>

          <Grid item xs={4}   sx={{color:  ' #323B40'}}>    
                <CheckboxField 
                        props={{
                            control: control,
                            name: 'sendToCir',
                            label: 'Registrovano u CRF',
                            disabled: false,
                            additional: { readonly: false, labelShrink: true ,  defaultValue: "1", color: 'black'},
                        
                        }}
                />
            </Grid>

      </Grid>


        {/*<Grid item  xs={12} sx={{dispaly: 'flex', justifyContent: 'center', alignContent: 'center', mt: 3}} >
        
                <FormAutocompleteField
                            props={{
                                name: 'companyId',
                                control: control,
                                label:  'Kompanija',
                                disabled: true,
                                additional: {
                                    parentFn: handleChangeSelect,
                                    data: [{id: 7,item: [], name: 'Palisad' }],
                                    selector:  selectCompany ,
                                },
                            }}
                        />
      
                        </Grid>*/}
    </>
  );
}
