import React from "react";
import {
    Paper,
    Grid,
    Box,
  } from "@mui/material";
import { RegistriesFormComponentProps }  from "./RegistriesFormComponent"
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { useComponentsStyles } from "../../shared/components/components.styles";
import { useAppDispatch,   useAppSelector } from "../../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormTextField  from  "../../shared/components/form-fields/FormTextField"
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import { CompanyFormModel, IProps } from "../models/registries.models"
import { sendCompanies,   updateCompanies } from "../store/registries.actions";
import  ErrorModal   from   "../../shared/components/ErrorModals"
import { selectUser }  from  "../../../app/core/core.selectors"
import SucessModal   from "../../shared/components/SucessModal"
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import  {  sendsubscribe  }  from   "../store/registries.actions"
import   { selectUserRole, selectDistributor }  from  '../../shared/components/form-fields/store/form.selectors'
import { setCompanyAdmin } from "../../../app/core/core.reducer";
import { getDistributor } from "../../shared/components/form-fields/store/form.actions";
import { sendDistributorCompany } from  "../store/registries.actions"
import { getCompaniesDistributor }  from  "../store/registries.actions"
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import  { selectDistributorInfo  }   from  "../../../app/core/core.selectors"
import  {  selectDistributorCompanies }  from  "../store/registries.selectors"
import {useLocation} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import {  faTrash}   from '@fortawesome/pro-solid-svg-icons';
import {  faPlus}   from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getValue } from "@mui/system";

export default function FormCompaniesComponent({
    props,
  }: IProps<RegistriesFormComponentProps>): JSX.Element {
    const isDistributor  =  useAppSelector(selectUser)?.authorities?.slice(0,1)[0].authority === "ROLE_DISTRIBUTER" ? true  :   false;
    const company = useAppSelector(selectCompanyCurrent) ?? "";
    const idDistributor  = useAppSelector(selectDistributorInfo)[0]?.idDistributor;
    const location = useLocation();
    const companyIdLocation = location.state.id;
    const companyData: any  =  location.state.data
    const [listPayeeFinancialAccount,  setListPayeeFinancialAccount]  =  React.useState<any[]>([]);


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
  apiKey: yup.string().required('ovo je obavezno polje'),
  country: yup.string().required('ovo je obavezno polje'),
  pib: yup.string().trim().required('ovo je obavezno polje'),
  payeeFinancialAccount: yup.string().test(
    "",
    "Ovo polje je obavezno",
    function (item) {
      if(listPayeeFinancialAccount.length) {
      return (
          true
      );
    } else {
      return false;
    }
    }
  ),
  email: yup.string().email('email mora biti ispravnog formata'),
 })
 .required();
  
    

    const defaultValues:  CompanyFormModel = {
      id: "",
      companyName: "",
      primaryVat: false,
      pib: "",
      date: "",
      apiKey: "", 
      mb: "",
      address: "",
      zip: "",
      city: "",
      country: "",
      distributor: isDistributor ? idDistributor :  "",
      email:    "",
      payeeFinancialAccount:   "",
    };
    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();
    const [showError, setShowError] = React.useState(false);
    
    const isAdmin  =  useAppSelector(selectUser)?.authorities?.slice(0,1)[0].authority === "ROLE_ADMIN" ? true  :   false;
    const userAuthority =  isAdmin || isDistributor ? true  :   false;
    const  distributorTmp  =  useAppSelector(selectDistributor);
    const [showErrorModal, setShowErrorModal] = React.useState(false);
    const [apiKeyDefault,   setApiKeyDefault] =  React.useState("");
    
    
    const methods = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
      });
      const {
        handleSubmit,
        reset,
        control,
        setValue,
        getValues
      } = methods;



      React.useEffect(() => {
        dispatch(getDistributor());
        /*if(idDistributor) {
            dispatch(getCompaniesDistributor({companyId:   company as any}));
        }*/

        if(companyIdLocation !== 0  )  {
              const distributorEdit = distributorTmp.find((item)  => item.id  ===  companyData?.idDistributor);
              setValue('companyName', companyData?.companyName);
              setValue('address', companyData?.address);
              setValue('apiKey', companyData?.apiKey);
              setValue('country', companyData?.country);
              setValue('city', companyData?.city);
        
              setValue('mb', companyData?.mb);
              setValue('zip', companyData?.zip);
              setValue('pib', companyData?.pib);
              setValue('email', companyData?.email);
              //setValue('payeeFinancialAccount', companyData?.payeeFinancialAccountDto[0]?.payeeFinancialAccountValue) 
              setValue('distributor', distributorEdit);
              setListPayeeFinancialAccount(companyData?.payeeFinancialAccountDto) 


              // we set apiKeyDefault when edit company
              setApiKeyDefault(companyData?.apiKey);
        }
      }, []);

      

      const onSubmit = async (data: CompanyFormModel) => {
        if(companyIdLocation === 0  )  {
            dispatch(sendCompanies({data: data, listPayeeFinancialAccount:  listPayeeFinancialAccount})).then(async (res) => { 
                if(res.payload.message === 'sucsses') {
                  if(data.apiKey) {
                    dispatch(sendsubscribe({data: res.payload.data}));
                  }
          
                  /*if(data.distributor) {
                    console.log('distributer', res.payload.idCompany);
                    dispatch(sendDistributorCompany({companyId: res.payload.idCompany, }))
                  }*/
                  setShowError(true);  
                  setTimeout(async () => {
                        setShowError(false);
                        if(!userAuthority) {
                            navigate('/registries/companies')
                        } else{
                          await navigate('/registries/createObject',{
                            state: {
                              company: res.payload.data
                            }
                          })
                        }
                        
                  }, 2000);
                } else {
                  setShowErrorModal(true);  
                  setTimeout(() => {
                        setShowErrorModal(false);
                        /*navigate('/registries/companies'
                        )*/
                  }, 2000);
                }
            } 
            )
        } else {
          dispatch(updateCompanies({idCompany: companyIdLocation, data: data,  idpayeeFinancialAccountDto: 1})).then(async (res) => { 
            if(res.payload.message === 'sucsses') {
              if(data.apiKey !==  apiKeyDefault) {
                dispatch(sendsubscribe({data: res.payload.data}));
              }
              setShowError(true);  
              setTimeout(async () => {
                    setShowError(false);
                        navigate('/registries/companies')  
              }, 2000);
            } else {
              setShowErrorModal(true);  
              setTimeout(() => {
                    setShowErrorModal(false);
                    
              }, 2000);
            }
          })
        }
      }

      const addPayeeFinancialAccount  =  ()  =>  {
          setListPayeeFinancialAccount((prevState)   =>  [...prevState, {id:  Math.random(),  payeeFinancialAccountValue: getValues('payeeFinancialAccount')}]);
          setValue('payeeFinancialAccount', "");
      }


      const  handleDeletePayeeFinancialAccount  = (id: string |  number)  =>  {
        const newState =  listPayeeFinancialAccount.filter((item)  => item.id  !==  id);

        setListPayeeFinancialAccount(newState);
      }

      
    return (
        <Grid item xs={12}>
            <SucessModal    open={showError} ></SucessModal>
            <ErrorModal    open={showErrorModal}  ></ErrorModal>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormTextField
                        props={{
                            control: control,
                            name: "companyName",
                            label: t(props.formFieldsLabels.companies.companiName),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true}

                        }}
                    />
                     <FormTextField
                        props={{
                            control: control,
                            name: "address",
                            label: t(props.formFieldsLabels.companies.adress),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true}

                        }}
                    />
                    <FormTextField
                        props={{
                            control: control,
                            name: "city",
                            label: t(props.formFieldsLabels.companies.city),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true}

                        }}
                    />
                     <FormTextField
                        props={{
                            control: control,
                            name: "mb",
                            label: t(props.formFieldsLabels.companies.mb),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true },
                        
                        }}
                    />

                    <FormTextField
                        props={{
                            control: control,
                            name: "email",
                            label: t(props.formFieldsLabels.companies.email),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true}

                        }}
                    />
                    <Grid item xs={12} sx={{display: "flex"}}>
                          <Grid item xs={11} >
                                <FormTextField
                                    props={{
                                        control: control,
                                        name: "payeeFinancialAccount",
                                        label: t(props.formFieldsLabels.companies.payeeFinancialAccount),
                                        disabled: false,
                                        additional: { readonly: false, labelShrink: true}

                                    }}
                                />
                          </Grid>
                          <Grid item xs={1} >
                            <IconButton sx={{display:  'flex', justifyContent:  'center'}} color="primary" aria-label="pdf" component="label"  >
                                  <FontAwesomeIcon icon={faPlus}   onClick={() => addPayeeFinancialAccount()}    color="#E9950C"   />
                              </IconButton>
                          </Grid>
                    </Grid>
                    <Grid item xs={12} sx={{display:  'flex' , flexDirection:  'column'}}>
                      {listPayeeFinancialAccount.map((item)  => (
                          <Grid  item  xs={4}  sx ={{display:   'flex'}}>
                            <Grid  item xs={1}>1.</Grid>
                            <Grid    item  xs={9}>{item?.payeeFinancialAccountValue}</Grid>
                            <Grid  item xs={2} sx={{mt: -1}}>
                            <IconButton color="primary" aria-label="add" component="label"  >
                                  <FontAwesomeIcon icon={faTrash}     onClick={()   =>  handleDeletePayeeFinancialAccount(item?.id)}     color="#E9950C"   />
                              </IconButton>
                            </Grid>
                          </Grid>
                      ))}
                    </Grid>
                    </Grid>
                    <Grid item xs={6}>
                    <FormTextField
                        props={{
                            control: control,
                            name: "pib",
                            label: t(props.formFieldsLabels.companies.pib),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true }
                        
                        }}
                    />
                    <FormTextField
                        props={{
                            control: control,
                            name: "zip",
                            label: t(props.formFieldsLabels.companies.zip),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true}

                        }}
                    />
                     <FormTextField
                        props={{
                            control: control,
                            name: "country",
                            label: t(props.formFieldsLabels.companies.country),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true}

                        }}
                    />
                   
                    <FormTextField
                        props={{
                            control: control,
                            name: "apiKey",
                            label: t(
                                props.formFieldsLabels.companies.apyKey
                            ),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true },
                        }}
                    />

                    <div style={{visibility: isDistributor ?  'hidden' : 'visible'}}>
                        <FormAutocompleteField
                            props={{
                                name: "distributor",
                                control: control,
                                label: 'Distributer',
                                disabled: true,
                                additional: {
                                selector: selectDistributor,
                                disableOption:  companyIdLocation === 0 ?  false :  true
                                //data:  []
                                
                                },
                            }}
                            />
                    </div>
                    </Grid>
                </Grid>
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