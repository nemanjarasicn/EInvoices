import React from "react";
import {
    Paper,
    Grid,
    Box,
  } from "@mui/material";
import { RegistriesFormComponentProps }  from "./RegistriesFormComponent"
import { useTranslation } from "react-i18next";
import FormTextField  from  "../../shared/components/form-fields/FormTextField"
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import { useComponentsStyles } from "../../shared/components/components.styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { MarketPlaceFormModel } from "../models/registries.models";
import { IProps  } from "../models/registries.models";
import { selectClientCompanies } from "../../shared/components/form-fields/store/form.selectors";
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import { sendMarketPlace } from "../store/registries.actions";
import { useNavigate } from 'react-router-dom';
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectObjectsAll } from "../../shared/components/form-fields/store/form.selectors";
import { selectUser, selectCompanyAdmin }  from  "../../../app/core/core.selectors"
import { getObjectsAll } from "../../shared/components/form-fields/store/form.actions";
import  ErrorModal   from   "../../shared/components/ErrorModals"
import { useLocation } from "react-router-dom";
import  {  getCompaniesAll }   from   "../../shared/components/form-fields/store/form.actions"
import SucessModal   from "../../shared/components/SucessModal"
//import ClientComponent from "./form-group/ClientComponent";


/**
 * Register Form validation schema for every field
 */
 const schema = yup
 .object({
   marketPlaceName: yup.string().required('ovo je obavezno polje'),
   objectUuid:   yup.object().required('ovo je obavezno polje')
 })
 .required();

export default function FormMarketPlaceComponent({
    props,
  }: IProps<RegistriesFormComponentProps>): JSX.Element {
    const companyId = useAppSelector(selectCompanyCurrent) as any;
    const location = useLocation();
    const id = location.state.company;
    const defaultValues:  MarketPlaceFormModel = {
      companyId:  id, //{main: {idCompany: 0}},
      marketPlaceName: "",
      objectUuid: "",
    };
    
    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();
    const [showError, setShowError] = React.useState(false);
    const isDistributor  =  useAppSelector(selectUser)?.authorities?.slice(0,1)[0].authority === "ROLE_DISTRIBUTER" ? true  :   false;
    const isAdmin  =  useAppSelector(selectUser)?.authorities?.slice(0,1)[0].authority === "ROLE_ADMIN" ? true  :   false;
    const userAuthority =  isAdmin || isDistributor ? true  :   false;
    const [showErrorModal, setShowErrorModal] = React.useState(false);
    const dataObject = useAppSelector(selectObjectsAll);

  
    const methods = useForm({
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
      });
      const {
        handleSubmit,
        reset,
        control,
        watch,
        getValues
      } = methods;


      const onSubmit = (data: MarketPlaceFormModel) => {
        dispatch(sendMarketPlace({data})).then((res) => {
          if(res.payload === 'sucsess') {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);    
                if(!userAuthority) {
                  navigate('/registries/marketPlace'
                  )
                } else{
                    navigate('/registries/createUser', {
                      state: {
                        company: id
                      }
                    })
                }
            }, 2000);
          }  else {
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
        dispatch(getObjectsAll({companyId: id}));
        dispatch(getCompaniesAll());
      }, []);

      

     /* React.useEffect(() => {
      const id =  getValues(`companyId`).main.idCompany;
      if(id)  {
          dispatch(getObjectsAll({companyId: id}));
      }
      }, [watch("companyId")]);*/
      
  
    return (
        <Grid item xs={12}>
          <SucessModal    open={showError} ></SucessModal>
          <ErrorModal    open={showErrorModal} ></ErrorModal>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
          
                         {false ?
                        <FormAutocompleteField
                        props={{
                            name: "companyId",
                            control: control,
                            label: t(props.formFieldsLabels.marketPlace.company),
                            disabled: true,
                            additional: {
                            selector: selectClientCompanies,
                            
                            },
                        }}
                        /> : 
                        <FormTextField
                        props={{
                            control: control,
                            name: "companyId",
                            label: t(props.formFieldsLabels.marketPlace.company),
                            disabled: true,
                            additional: { readonly: true, labelShrink: true}

                        }}
                    />
                      }
                    </Grid>
                    <Grid item xs={6}>
                    <FormTextField
                        props={{
                            control: control,
                            name: "marketPlaceName",
                            label: t(props.formFieldsLabels.marketPlace.name),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true }
                        
                        }}
                    />

                    <FormAutocompleteField
                        props={{
                            name: "objectUuid",
                            control: control,
                            label: t(
                              props.formFieldsLabels.marketPlace.uuidObject),
                            disabled: true,
                            additional: {
                            selector: selectObjectsAll,
                            //data: dataObject
                            
                            },
                        }}
                        />
            
                    {/*<FormTextField
                        props={{
                            control: control,
                            name: "objectUuid",
                            label: t(
                                props.formFieldsLabels.marketPlace.uuidObject
                            ),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true },
                        }}
                      />*/}
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