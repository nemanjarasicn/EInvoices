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
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomButtonFc from "./CustomButtonFc";
import { ObjectFormModel, IProps } from "../models/registries.models";
import { selectClientCompanies } from "./form-fields/store/form.selectors";
import { useNavigate } from 'react-router-dom';
import FormAutocompleteField from "./form-fields/FormAutocompleteField";
import {
    getClientCompanies,
    getMarketPlaces,
    getProducts,
  } from "./form-fields/store/form.actions";
import { sendObjects } from "../store/registries.actions";
import SucessModal   from "./SucessModal"
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

export default function FormObjectComponent({
    props,
  }: IProps<RegistriesFormComponentProps>): JSX.Element {
    const defaultValues:  ObjectFormModel = {
      id: "",
      companyId: 7,
      objectName: "",
      latitude: "",
      longitude: "",


    };
    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();

   

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

      const onSubmit = (data: ObjectFormModel) => {
        console.log(data);
        dispatch(sendObjects()).then((res) => {
            if(res.payload === 'sucsses') {
              navigate('/registries/objects'
              )
            }
        } 
        )
      }
  
  
    return (
        <Grid item xs={12}>
            <SucessModal    open={false} ></SucessModal>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {false ?
                        <FormAutocompleteField
                        props={{
                            name: "companyId",
                            control: control,
                            label: t(props.formFieldsLabels.objects.company),
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
                            label: t(props.formFieldsLabels.objects.company),
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
                            name: "objectName",
                            label: t(props.formFieldsLabels.objects.name),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true }
                        
                        }}
                    />
                    <FormTextField
                        props={{
                            control: control,
                            name: "longitude",
                            label: t(props.formFieldsLabels.objects.longitude),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true },
                        
                        }}
                    />
                    <FormTextField
                        props={{
                            control: control,
                            name: "latitude",
                            label: t(
                                props.formFieldsLabels.objects.latitude
                            ),
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