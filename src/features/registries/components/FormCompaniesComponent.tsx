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
import { sendCompanies } from "../store/registries.actions";
import  ErrorModal   from   "../../shared/components/ErrorModals"
import { selectUser }  from  "../../../app/core/core.selectors"
import SucessModal   from "../../shared/components/SucessModal"
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import  {  sendsubscribe  }  from   "../store/registries.actions"
import   { selectUserRole, selectDistributor }  from  '../../shared/components/form-fields/store/form.selectors'
import { setCompanyAdmin } from "../../../app/core/core.reducer";
import { getDistributor } from "../../shared/components/form-fields/store/form.actions";
import { sendDistributorCompany } from  "../store/registries.actions"

/**
 * Register Form validation schema for every field
 */
 const schema = yup
 .object({
 })
 .required();

export default function FormCompaniesComponent({
    props,
  }: IProps<RegistriesFormComponentProps>): JSX.Element {
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
      distributor:  ""
    };
    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();
    const [showError, setShowError] = React.useState(false);
    const userAuthority = useAppSelector(selectUser)?.authorities?.slice(0,1)[0].authority === "ROLE_ADMIN" ? true  :   false;
    const [showErrorModal, setShowErrorModal] = React.useState(false);

    const methods = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
      });
      const {
        handleSubmit,
        reset,
        control,
      } = methods;

      const onSubmit = async (data: CompanyFormModel) => {
        console.log('asasas', data);
        dispatch(sendCompanies({data})).then(async (res) => { 
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
      }


      React.useEffect(() => {
        dispatch(getDistributor());
      }, []);

      
    return (
        <Grid item xs={12}>
            <SucessModal    open={showError} ></SucessModal>
            <ErrorModal    open={showErrorModal} ></ErrorModal>
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


                    <FormAutocompleteField
                        props={{
                            name: "distributor",
                            control: control,
                            label: 'Distributer',
                            disabled: true,
                            additional: {
                            selector: selectDistributor,
                            //data:  []
                            
                            },
                        }}
                        />
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