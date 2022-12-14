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
import { selectCompany } from "../../../app/core/core.selectors";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectObjectsAll } from "../../shared/components/form-fields/store/form.selectors";
import { getObjectsAll } from "../../shared/components/form-fields/store/form.actions";
import  ErrorModal   from   "../../shared/components/ErrorModals"
import SucessModal   from "../../shared/components/SucessModal"
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

  
   marketPlaceName: yup.string().required('ovo je obavezno polje'),
 })
 .required();

export default function FormMarketPlaceComponent({
    props,
  }: IProps<RegistriesFormComponentProps>): JSX.Element {
    const companyId = useAppSelector(selectCompany) as number;
    const defaultValues:  MarketPlaceFormModel = {
      companyId:  companyId,
      marketPlaceName: "",
      objectUuid: "",
    };
    
    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();
    const [showError, setShowError] = React.useState(false);
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


      const onSubmit = (data: MarketPlaceFormModel) => {
        dispatch(sendMarketPlace({data})).then((res) => {
            if(res.payload === 'sucsess') {
              setShowError(true);
              setTimeout(() => {
                  setShowError(false);    
                  navigate('/registries/marketPlace'
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
        }
        )
      }

      React.useEffect(() => {
        dispatch(getObjectsAll({companyId: companyId}));
      }, []);

      
  
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