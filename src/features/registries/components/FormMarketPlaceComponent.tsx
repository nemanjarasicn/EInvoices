import React from "react";
import {
    Paper,
    Typography,
    Grid,
    Box,
    Switch,
    FormControlLabel,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    IconButton,
  } from "@mui/material";
import { RegistriesFormComponentProps }  from "./RegistriesFormComponent"
import { useTranslation } from "react-i18next";
import FormTextField  from  "./form-fields/FormTextField"
import { useComponentsStyles } from "./components.styles";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { IProps, ProductModel } from "../models";
import { selectClientCompanies } from "./form-fields/store/form.selectors";
import FormAutocompleteField from "./form-fields/FormAutocompleteField";
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

export default function FormMarketPlaceComponent({
    props,
  }: IProps<RegistriesFormComponentProps>): JSX.Element {
    
    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
  
  
   

    const methods = useForm({
        
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

      
  
    return (
        <Grid item xs={12}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormAutocompleteField
                        props={{
                            name: "foundClient",
                            control: control,
                            label: t(props.formFieldsLabels.marketPlace.company),
                            disabled: false,
                            additional: {
                            selector: selectClientCompanies,
                            
                            },
                        }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                    <FormTextField
                        props={{
                            control: control,
                            name: "accountingCustomerParty.partyLegalEntity.registrationName",
                            label: t(props.formFieldsLabels.marketPlace.name),
                            disabled: false,
                            additional: { readonly: true, labelShrink: true }
                        
                        }}
                    />
            
                    <FormTextField
                        props={{
                            control: control,
                            name: "accountingCustomerParty.partyLegalEntity.companyID",
                            label: t(
                                props.formFieldsLabels.marketPlace.uuidObject
                            ),
                            disabled: false,
                            additional: { readonly: true, labelShrink: true },
                        }}
                    />
                    </Grid>
                </Grid>
        </Grid>
    )
}