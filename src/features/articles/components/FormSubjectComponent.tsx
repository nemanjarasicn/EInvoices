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
import { PriceFormModel,   IProps,  SubjectFormModel } from "../models/articles.models";
import { useNavigate } from 'react-router-dom';
import  ErrorModal   from   "../../shared/components/ErrorModals"
import SucessModal   from "../../shared/components/SucessModal"
import  { getObjectsAll,  getUnitsAll, getVatAll, getMarketPlacesAll,  getSubjectCategory,  getSubjectType }  from  "../../shared/components/form-fields/store/form.actions"
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import {useLocation} from 'react-router-dom';
import FormTextField  from  "../../shared/components/form-fields/FormTextField"
import {  sendSubject } from "../store/articles.actions";
import   { selectSubjectGategory,  selectSubjectType }  from  "../../shared/components/form-fields/store/form.selectors"
import FormCurrencyField from "../../shared/components/form-fields/FormCurrencyField";
//import ClientComponent from "./form-group/ClientComponent";


/**
 * Register Form validation schema for every field
 */
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

export default function FormSubjectComponent({
    props,
  }: IProps<ArticlesFormComponentProps>): JSX.Element {
    const companyId = useAppSelector(selectCompanyCurrent);

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
          //const dataArtikal = location.state;
          await dispatch(sendSubject({data})).then((res) => {
            if(res.payload === "sucsess") {
                  setShowError(true);
                  setTimeout(() => {
                      setShowError(false);
                      navigate('/articles/subject'
                      )
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
      
  
    return (
        <Grid item xs={12}>
            <SucessModal    open={showError} ></SucessModal>
            <ErrorModal    open={showErrorModal} ></ErrorModal>
            <Box
              sx={{
                ...formComponent.basicBox,
                textAlign: "start",
                mt: 18
              }}
            >
                <Typography sx={formComponent.typography}>
                    {('PODACI O KOMITENTU').toUpperCase()}
                </Typography>
                <Paper style={formComponent.groupPaper}>
                <Grid container spacing={2}>
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
                          label: "mb",
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
                      <FormTextField
                        props={{
                          name: "jbkjs",
                          control: control,
                          label: "jbkjs",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     />  

                     
                     <FormAutocompleteField
                        props={{
                            name: "subjectIdCategory",
                            control: control,
                            label: 'Category',
                            disabled: true,
                            additional: {
                            selector: selectSubjectGategory,
                            //data: dataObject
                            
                            },
                        }}
                        /> 
                    </Grid>
                    <Grid item xs={4}>
                    <FormTextField
                        props={{
                          name: "companyId",
                          control: control,
                          label: "Id kompanije",
                          additional: { mask: {}, readonly: false },
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
                          label: "Postanski broj",
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
                            label: 'Type',
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
                          label: "Ziro racun",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     /> 
                    </Grid>
                </Grid>
                </Paper>
            </Box>
            
            <Grid item xs={5}>
                  <Box
                    sx={{
                      ...formComponent.basicBox,
                      textAlign: "end",
                    }}
                  >
                    <Paper sx={formComponent.paper}>
                      <CustomButtonFc
                        groupButton={[
                          {
                            title: "DELETE",
                            disabled: true,
                            btnFn: () => reset(),
                          },
                          {
                            title: "DOWNLOAD",
                            disabled: true,
                            btnFn: () => reset(),
                          },
                          {
                            title: "UPDATE",
                            disabled: true,
                            btnFn: () => reset(),
                          },
                          {
                            title: "SACUVAJ",
                            disabled: false,
                            btnFn: handleSubmit(onSubmit),
                          },
                        ]}
                      />
                    </Paper>
                  </Box>
            </Grid>
  
        </Grid>
    )
}