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
import { GroupFormModel, IProps } from "../models/registries.models";
import { selectClientCompanies } from "../../shared/components/form-fields/store/form.selectors";
import { useNavigate } from 'react-router-dom';
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import { sendGroup } from "../store/registries.actions";
import SucessModal   from "../../shared/components/SucessModal"

import { getPointOfSalesAll, getObjectsAll }  from  "../../shared/components/form-fields/store/form.actions"
import  { selectPointOfSale, selectObjectsAll }  from  "../../shared/components/form-fields/store/form.selectors"
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

export default function FormGroupComponent({
    props,
  }: IProps<RegistriesFormComponentProps>): JSX.Element {
    const defaultValues:  GroupFormModel = {
        groupName:  "",
        idPointOfSale:   "",
        idCompany:  7,
        idObject:  0
      }
    
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

      React.useEffect(() => {
        dispatch(getPointOfSalesAll({companyId: 7}));
        dispatch(getObjectsAll({companyId: 7}));
      }, []);

      const onSubmit = (data: GroupFormModel) => {
        console.log(data);
        dispatch(sendGroup({data})).then((res) => {
            if(res.payload === 'sucsses') {
              setShowError(true);
              setTimeout(() => {
                  setShowError(false);
                  navigate('/registries/groups'
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
                            name: "idCompany",
                            label: t(props.formFieldsLabels.objects.company),
                            disabled: true,
                            additional: { readonly: true, labelShrink: true}

                        }}
                    />
                     
                    <FormAutocompleteField
                        props={{
                            name: "idPointOfSale",
                            control: control,
                            label:  "Kasa",
                            disabled: true,
                            additional: {
                            selector: selectPointOfSale,
                            
                            },
                        }}
                        /> 
                    </Grid>
                    <Grid item xs={6}>
                    <FormTextField
                        props={{
                            control: control,
                            name: "groupName",
                            label: "Naziv grupe",
                            disabled: false,
                            additional: { readonly: false, labelShrink: true }
                        
                        }}
                    />

                    <FormAutocompleteField
                        props={{
                            name: "idObject",
                            control: control,
                            label:  "Objekat",
                            disabled: true,
                            additional: {
                            selector: selectObjectsAll,
                            
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