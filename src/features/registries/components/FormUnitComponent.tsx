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
import FormTextField  from  "../../shared/components/form-fields/FormTextField"
import { useComponentsStyles } from "../../shared/components/components.styles";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import { UnitFormModel, IProps } from "../models/registries.models";
import { selectClientCompanies } from "../../shared/components/form-fields/store/form.selectors";
import { useNavigate } from 'react-router-dom';
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import { sendUnit } from "../store/registries.actions";
import SucessModal   from "../../shared/components/SucessModal"

import  CheckboxField  from  "../../shared/components/form-fields/FormCheckboxField"
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

export default function FormUnitComponent({
    props,
  }: IProps<RegistriesFormComponentProps>): JSX.Element {
    const defaultValues:  UnitFormModel = {
        productUnitName:  "",
        productUnitCode:  "",
        productUnitPlural:  "",
        productUnitPriority:  1,
        productUnitDecimalShow:  0,
    };
    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();
    const [showError, setShowError] = React.useState(false);

   

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

      const onSubmit = (data: any) => {
        dispatch(sendUnit({data})).then((res) => {
            if(res.payload === 'sucsses') {
              setShowError(true);
              setTimeout(() => {
                  setShowError(false);
                  navigate('/registries/units'
                  )
              }, 2000);
            }
        } 
        )
      }
  
  
    return (
        <Grid item xs={12}>
            <SucessModal    open={showError} ></SucessModal>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormTextField
                        props={{
                            control: control,
                            name: "productUnitName",
                            label:  "Naziv unit",
                            disabled: false,
                            additional: { readonly: false, labelShrink: true}

                        }}
                    />
                    <FormTextField
                        props={{
                            control: control,
                            name: "productUnitCode",
                            label: "Unit code",
                            disabled: false,
                            additional: { readonly: false, labelShrink: true }
                        
                        }}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <FormTextField
                        props={{
                            control: control,
                            name: "productUnitPlural",
                            label:  "Unit Plural",
                            disabled: false,
                            additional: { readonly: false, labelShrink: true },
                        
                        }}
                    />
                    <CheckboxField 
                            props={{
                                control: control,
                                name: "productUnitPriority",
                                label: 'productUnitPriority',
                                disabled: false,
                                additional: { readonly: false, labelShrink: true },
                            
                            }}
                    />
                    <CheckboxField 
                            props={{
                                control: control,
                                name: "productUnitDecimalShow",
                                label: 'productUnitDecimalShow',
                                disabled: false,
                                additional: { readonly: false, labelShrink: true },
                            
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