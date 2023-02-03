import React from "react";
import {
    Paper,
    Typography,
    Button,
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
import {  sendSubject, updateSubject, getSubjectDetails } from "../store/articles.actions";
import {   setError, setOpenModalSucessLoad  }  from  "../../../app/core/core.reducer"
import   { selectSubjectGategory,  selectSubjectType }  from  "../../shared/components/form-fields/store/form.selectors"
import FormCurrencyField from "../../shared/components/form-fields/FormCurrencyField";


//import ClientComponent from "./form-group/ClientComponent";


/**
 * Register Form validation schema for every field
 */
 /*const schema = yup
 .object({
  companyName: yup.string().required('ovo je obavezno polje'),
  address:   yup.string().required('ovo je obavezno polje'),
  city:  yup.string().required('ovo je obavezno polje'),
  zip: yup.string().required('ovo je obavezno polje'),
  mb: yup.string().trim().required('ovo je obavezno polje'),
  pib: yup.string().trim().required('ovo je obavezno polje'),
  payeeFinancialAccountDto: yup.string().required('ovo je obavezno polje'),
  email: yup.string().email('email mora biti ispravnog formata'),
  subjectIdCategory: yup.object().required('ovo je obavezno polje'),
  subjectIdType: yup.object().required('ovo je obavezno polje'),
 })
 .required();*/

export default function FormSubjectComponent({
    props,
  }: IProps<ArticlesFormComponentProps>): JSX.Element {

    const companyId = useAppSelector(selectCompanyCurrent);
    const [disableJbkjs,  setDisableJbkjs]  =   React.useState(true);
    const  subjectCategoryTmp  =  useAppSelector(selectSubjectGategory);
    const  subjectType  =  useAppSelector(selectSubjectType)
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
        payeeFinancialAccountDto: "",
        searchSubject:  ""
        
    
    };

        /**
 * Register Form validation schema for every field
 */
 const schema = 
 (disableJbkjs) ?
    yup.object({
      companyName: yup.string().required('ovo je obavezno polje'),
      address:   yup.string().required('ovo je obavezno polje'),
      city:  yup.string().required('ovo je obavezno polje'),
      zip: yup.string().required('ovo je obavezno polje'),
      mb: yup.string().trim().required('ovo je obavezno polje'),
      pib: yup.string().trim().required('ovo je obavezno polje'),
      payeeFinancialAccountDto: yup.string().required('ovo je obavezno polje'),
      email: yup.string().email('email mora biti ispravnog formata').required("ovo je obavezno polje"),
      subjectIdCategory: yup.object().required('ovo je obavezno polje'),
      subjectIdType: yup.object().required('ovo je obavezno polje'),
      //jbkjs: yup.string().required('ovo je obavezno polje')
    })  :
  
    yup.object({
      companyName: yup.string().required('ovo je obavezno polje'),
      address:   yup.string().required('ovo je obavezno polje'),
      city:  yup.string().required('ovo je obavezno polje'),
      zip: yup.string().required('ovo je obavezno polje'),
      mb: yup.string().trim().required('ovo je obavezno polje'),
      pib: yup.string().trim().required('ovo je obavezno polje'),
      payeeFinancialAccountDto: yup.string().required('ovo je obavezno polje'),
      email: yup.string().email('email mora biti ispravnog formata').required("ovo je obavezno polje"),
      subjectIdCategory: yup.object().required('ovo je obavezno polje'),
      subjectIdType: yup.object().required('ovo je obavezno polje'),
      jbkjs: yup.string().required('ovo je obavezno polje')
    })
 .required();
    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();
    const [showError, setShowError] = React.useState(false);
    const [showErrorModal, setShowErrorModal] = React.useState(false);
    const [errorMessageSearch,  setErrorMessageSearch]  =  React.useState("");
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
            if(props.flag === 'edit') {
              const subjectIdCategoryObject = subjectCategoryTmp.find((item)  => item.id  ===  props.data.subjectIdCategory);
              const subjectIdTypeObject = subjectType.find((item)  => item.id  ===  props.data.subjectIdType)
              setValue('companyName', props.data.companyName);
              setValue('mb', props.data.mb)
              
              setValue('city', props.data.city)
              setValue('phone', props.data.phone)
              setValue('pib', props.data.pib);
              setValue('address', props.data.address);
              setValue('zip', props.data.zip);
              setValue('email', props.data.email);
              setValue('payeeFinancialAccountDto',  props.data?.payeeFinancialAccountDto ?  props.data.payeeFinancialAccountDto[0]?.payeeFinancialAccountValue : "");
              setValue('subjectIdCategory',  subjectIdCategoryObject )
              setValue('subjectIdType',  subjectIdTypeObject )
              setValue('jbkjs',  props.data.jbkjs)
            }
      }, []);

      const onSubmit = async  (data: SubjectFormModel) => {
    
          if(props.flag  !==  'edit')  {
              await dispatch(sendSubject({data})).then((res) => {
                if(res.payload === "sucsess") {
                      //setShowError(true);
                      dispatch(setopenModalCreateSubject({open:  false}));
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
            } else {
              await dispatch(updateSubject({idSubject: props.data.id, data: data,  idpayeeFinancialAccountDto:  props.data.payeeFinancialAccountDto[0]?.id })).then((res) => {
                if(res.payload === "sucsess") {
                      //setShowError(true);
                      dispatch(setopenModalCreateSubject({open:  false}));
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
      }

      React.useEffect(() => {
        if(getValues('subjectIdCategory'))  {
            const subjectCategory = getValues('subjectIdCategory');
      
            if(subjectCategory.name === "Javna preduzeća") {
              setDisableJbkjs(false);
            } else {
              setDisableJbkjs(true)
            }
          }
        
      }, [watch('subjectIdCategory')]);


      const  handleFindSubject = () => {
        dispatch(getSubjectDetails({pib:  getValues('pib')})).then((res) => {
          console.log('asasasasasassasasasaas', res);
          if(res?.payload?.CompanyDataSet !==  "")   {
            setValue('pib', (getValues('pib')).toString()); 
            setValue('companyName', res?.payload?.CompanyDataSet?.Company?.Name); 
            setValue('city',  res?.payload?.CompanyDataSet?.Company?.City); 
            setValue('address', res?.payload?.CompanyDataSet?.Company?.Address); 
            setValue('zip', res?.payload?.CompanyDataSet?.Company?.PostalCode); 
            setValue('mb',   res?.payload?.CompanyDataSet?.Company?.NationalIdentificationNumber); 
            setErrorMessageSearch("");
          } else {
            setErrorMessageSearch('Ne postoji kompanija za izabrani PIB');
          }
        });
          
      }
      
  
    return (
        <Grid item xs={12}>
            <SucessModal    open={showError} ></SucessModal>
            <ErrorModal    open={showErrorModal} ></ErrorModal>
                <Grid container spacing={2} sx = {{ minHeight: "300px", marginTop: '10px'}}>
                    {/*<Grid xs={12}  sx={{ml: 2, mt: 2}}>
                    <FormTextField
                        props={{
                          name: "searchSubject",
                          control: control,
                          label: "pretraga po pibu",
                          additional: { mask: {}, readonly: false , parentFn: handleFindSubject},
                          disabled: false,
                        }}
                     /> 
                     <span style={{fontSize: '12px', color: 'red'}}>{errorMessageSearch}</span>
                      </Grid>*/}
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
                          name: "companyId",
                          control: control,
                          label: "Id kompanije",
                          additional: { mask: {}, readonly: true },
                          disabled: true,
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

                      <div  style  =   {{visibility: disableJbkjs ? 'hidden'  :  'visible'}}  >
                      <FormTextField
                        props={{
                          name: "jbkjs",
                          control: control,
                          label: "jbkjs",
                          additional: { mask: {}, readonly: disableJbkjs },
                          disabled: disableJbkjs,
                        }}
                     /> 
                     </div> 
                    </Grid>
                    <Grid item xs={4}>
                      <Grid sx={{display:  'flex'}} >
                          <Grid xs={10} >
                              <FormTextField
                                  props={{
                                    name: "pib",
                                    control: control,
                                    label: "PIB",
                                    additional: { mask: {}, readonly: false },
                                    disabled: false,
                                  }}
                              /> 
                          </Grid>
                          <Grid xs={2}>
                                <Button    variant="contained"
                                           component="label"
                                           sx={{backgroundColor: 'blue'}}
                                           onClick = {()  => handleFindSubject()}>
                                          NBS
                                </Button> 
                          </Grid>
                      </Grid>
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
                     <div   style = {{visibility:  'hidden'}}  >
                     <FormTextField
                        props={{
                          name: "identificationNumber",
                          control: control,
                          label: "Indetifikacioni broj",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     />  
                    </div>
                    </Grid>
                    <Grid xs={12}>
                      <span style={{color: 'red'}}>{errorMessageSearch} </span>
                    </Grid>
                </Grid>
            <Grid item xs={5} sx={{mt:  marginTopBox}}>
                  <Grid item xs={12} sx = {{display: 'flex', justifyContent: 'space-between'}} >
                      <CustomButtonFcTra 
                           soloButton={{
                              title: "Otkaži",
                              disabled: false,
                              btnFn: () => dispatch(setopenModalCreateSubject({open:  false})),
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