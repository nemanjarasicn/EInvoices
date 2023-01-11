import React from "react";
import {
    Paper,
    Typography,
    Grid,
    Box,
  } from "@mui/material";
import { ArticlesFormComponentProps }  from "./ArticlesFormComponent"
import { useTranslation } from "react-i18next";
import { useComponentsStyles } from "../../shared/components/components.styles";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import CustomButtonFcTra from "../../shared/components/CustomButtonFcTra";
import { PriceFormModel,   IProps,  SubjectFormModel } from "../models/articles.models";
import { useNavigate } from 'react-router-dom';
import  ErrorModal   from   "../../shared/components/ErrorModals"
import SucessModal   from "../../shared/components/SucessModal"
import  { getObjectsAll,  getUnitsAll, getVatAll, getMarketPlacesAll,  getSubjectCategory,  getSubjectType }  from  "../../shared/components/form-fields/store/form.actions"
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import {  setopenModalCreateSubject, setOpenSucessModal   }  from  "../store/articles.reducer"
import {useLocation} from 'react-router-dom';
import FormTextField  from  "../../shared/components/form-fields/FormTextField"
import {  sendSubject } from "../store/articles.actions";
import {   setOpenModalSucessLoad  }  from  "../../../app/core/core.reducer"
import   { selectSubjectGategory,  selectSubjectType }  from  "../../shared/components/form-fields/store/form.selectors"
import FormCurrencyField from "../../shared/components/form-fields/FormCurrencyField";
//import ClientComponent from "./form-group/ClientComponent";


/**
 * Register Form validation schema for every field
 */
 const schema = yup
 .object({
  companyName: yup.string().required('ovo je obavezno polje'),
  address:   yup.string().required('ovo je obavezno polje'),
  city:  yup.string().required('ovo je obavezno polje'),
  zip: yup.string().required('ovo je obavezno polje'),
  mb: yup.string().trim().required('ovo je obavezno polje'),
  pib: yup.string().trim().required('ovo je obavezno polje'),
  payeeFinancialAccountDto: yup.string().required('ovo je obavezno polje'),
  email: yup.string().email('email mora biti ispravnog formata'),
 })
 .required();

export default function FormSubjectComponent({
    props,
  }: IProps<ArticlesFormComponentProps>): JSX.Element {
    const companyId = useAppSelector(selectCompanyCurrent);
    const [disableJbkjs,  setDisableJbkjs]  =   React.useState(true);

    const  defaultValues:  SubjectFormModel = {
        firstName:  "",
        lastName:   "",
        companyName:   "",
        identificationNumber:    "",
        pib:   "",
        mb:  "",
        companyId:  companyId,
        address:   "",
        city:  "",
        zip:   "",
        phone:   "",
        email:   "",
        jbkjs:   "",
        subjectIdCategory:   "",
        subjectIdType:  "",
        payeeFinancialAccountDto: ""
    
    };
    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();
    const [showError, setShowError] = React.useState(false);
    const [showErrorModal, setShowErrorModal] = React.useState(false);
    const marginTopBox =  window.devicePixelRatio == 1.5 ? 2 : 5 
    
    const location = useLocation();
  


    const methods = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
      });
      const {
        handleSubmit,
        reset,
        control,
        setValue,
        formState,
        getValues,
        trigger,
        getFieldState,
        watch,
      } = methods;


      React.useEffect(() => {
            dispatch(getSubjectCategory());
            dispatch(getSubjectType());
      }, []);

      const onSubmit = async  (data: SubjectFormModel) => {
          console.log('sasassas');
          //const dataArtikal = location.state;
          await dispatch(sendSubject({data})).then((res) => {
            if(res.payload === "sucsess") {
                  //setShowError(true);
                  dispatch(setopenModalCreateSubject(false));
                  dispatch(setOpenModalSucessLoad(true));
                  setTimeout(() => {
                      //setShowError(false);
                      dispatch(setOpenModalSucessLoad(false));
                      navigate('/articles/subject'
                      )
                      window.location.reload();
                  }, 2000);
            }  else {
              setShowErrorModal(true);  
              setTimeout(() => {
                    setShowErrorModal(false);
                    /*navigate('/registries/companies'
                    )*/
              }, 2000);
            }
          });
      }

      React.useEffect(() => {
        const subjectCategory = getValues('subjectIdCategory');

        if(subjectCategory.categoryName === "Javna preduzeća") {
          setDisableJbkjs(false);
        } else {
          setDisableJbkjs(true)
        }
        
      }, [watch('subjectIdCategory')]);
      
  
    return (
        <Grid item xs={12}>
            <SucessModal    open={showError} ></SucessModal>
            <ErrorModal    open={showErrorModal} ></ErrorModal>
        
               
                <Grid container spacing={2} sx = {{ minHeight: "300px", marginTop: '10px'}}>
                    <Grid item xs={4}>
                    {/*<FormTextField
                        props={{
                          name: "firstName",
                          control: control,
                          label: "Ime komitenta",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                    />*/}
                     <FormTextField
                        props={{
                          name: "companyName",
                          control: control,
                          label: "Naziv komitenta",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     />      
                    </Grid>
                    <Grid item xs={4}>
                    {/*<FormTextField
                        props={{
                          name: "lastName",
                          control: control,
                          label: "Prezime komitenta",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                    /> */}
                     <FormTextField
                        props={{
                          name: "identificationNumber",
                          control: control,
                          label: "Indetifikacioni broj",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     />  
                     <FormTextField
                        props={{
                          name: "mb",
                          control: control,
                          label: "Matični broj",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     />  
                     <FormTextField
                        props={{
                          name: "city",
                          control: control,
                          label: "Grad",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     />  
                     


                     <FormTextField
                        props={{
                          name: "phone",
                          control: control,
                          label: "Telefon",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     />


                     
                     <FormAutocompleteField
                        props={{
                            name: "subjectIdCategory",
                            control: control,
                            label: 'Kategorija komitenta',
                            disabled: true,
                            additional: {
                            selector: selectSubjectGategory,
                            //data: dataObject
                            
                            },
                        }}
                        /> 

                      
                      <FormTextField
                        props={{
                          name: "jbkjs",
                          control: control,
                          label: "jbkjs",
                          additional: { mask: {}, readonly: disableJbkjs },
                          disabled: disableJbkjs,
                        }}
                     />  
                    </Grid>
                    <Grid item xs={4}>
                    <FormTextField
                        props={{
                          name: "companyId",
                          control: control,
                          label: "Id kompanije",
                          additional: { mask: {}, readonly: true },
                          disabled: true,
                        }}
                     /> 
                    <FormTextField
                        props={{
                          name: "pib",
                          control: control,
                          label: "PIB",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     /> 
                     <FormTextField
                        props={{
                          name: "address",
                          control: control,
                          label: "Adresa",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     />  

                     <FormTextField
                        props={{
                          name: "zip",
                          control: control,
                          label: "Poštanski broj",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     /> 
                     <FormTextField
                        props={{
                          name: "email",
                          control: control,
                          label: "Email",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     /> 

                      <FormAutocompleteField
                        props={{
                            name: "subjectIdType",
                            control: control,
                            label: 'Tip komitenta',
                            disabled: true,
                            additional: {
                            selector: selectSubjectType,
                            //data: dataObject
                            
                            },
                        }}
                        /> 
                        <FormTextField
                        props={{
                          name: "payeeFinancialAccountDto",
                          control: control,
                          label: "Žiro račun",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     /> 
                    </Grid>
                </Grid>
      
            
            <Grid item xs={5} sx={{mt:  marginTopBox}}>
                  <Grid item xs={12} sx = {{display: 'flex', justifyContent: 'space-between'}} >
                      <CustomButtonFcTra 
                           soloButton={{
                              title: "Otkaži",
                              disabled: false,
                              btnFn: () => dispatch(setopenModalCreateSubject(false)),
                          }}
                        />

                        <CustomButtonFc 
                           soloButton={{
                              title: "SAČUVAJ",
                              disabled: false,
                              btnFn: handleSubmit(onSubmit),
                          }}
                        />
                  </Grid>
                      {/*<CustomButtonFc
                        groupButton={[
                          {
                            title: "ODUSTANI",
                            disabled: false,
                            btnFn: () => dispatch(setopenModalCreateSubject(false)),
                          },
                          {
                            title: "SACUVAJ",
                            disabled: false,
                            btnFn: handleSubmit(onSubmit),
                          },
                        ]}
                      />*/}
                   

            </Grid>
                        
        </Grid>
    )
}