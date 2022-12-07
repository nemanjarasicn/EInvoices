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
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {  IProps } from "../models/registries.models";
import { selectCompaniesAll,  selectMarketPlaces } from "../../shared/components/form-fields/store/form.selectors";
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import { sendPointOfSales } from "../store/registries.actions";
import { PointOfSaleFormModel }  from "../models/registries.models"
import { getCompaniesAll,  getMarketPlacesAll }  from  "../../shared/components/form-fields/store/form.actions"
import { selectCompany, selectCompanyInfo } from "../../../app/core/core.selectors";
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

   namePointOfSale: yup.string().required('ovo je obavezno polje'),
   code:  yup.string().required('ovo je obavezno polje'),
   idMarketPlace: yup
    .object({
      uuid: yup.string().required(),
     })
     .required(),
 })
 .required();

export default function FormPointOfSaleComponents({
    props,
  }: IProps<RegistriesFormComponentProps>): JSX.Element {
    const companyId = useAppSelector(selectCompany) as number;
    const defaultValues:  PointOfSaleFormModel = {
      id: "",
      namePointOfSale: "",
      idMarketPlace: 0,
      companyName:  "",
      idCompany:   companyId,
      uuidMarketPlace:  "",
      code: "",
      lastUpdatedBy: "",
      createdBy: ""

    };

    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();
    const [showError, setShowError] = React.useState(false)
    const companyInfo = useAppSelector(selectCompanyInfo);

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
        dispatch(getCompaniesAll());
        dispatch(getMarketPlacesAll({companyId: companyId}));
      }, []);


      const onSubmit = (data: any) => {
        const dataSend = {
            ...data,
            companyNameSend: companyInfo?.companyName,
          
        }
        dispatch(sendPointOfSales(dataSend)).then((res) => {
            if(res.payload === 'sucsses') {
              setShowError(true);
              setTimeout(() => {
                    setShowError(false);
                    navigate('/registries/pointOfSale'
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
                        {false ?
                            <FormAutocompleteField
                            props={{
                                name: "idCompany",
                                control: control,
                                label: t(props.formFieldsLabels.pointOfSale.company),
                                disabled: true,
                                additional: {
                                selector: selectCompaniesAll,
                                
                                },
                            }}
                            /> : 
                            <FormTextField
                            props={{
                                control: control,
                                name: "idCompany",
                                label: t(props.formFieldsLabels.pointOfSale.company),
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
                            name: "namePointOfSale",
                            label: t(props.formFieldsLabels.pointOfSale.name),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true }
                        
                        }}
                    />
                    <FormTextField
                        props={{
                            control: control,
                            name:  "code",
                            label: t(props.formFieldsLabels.pointOfSale.code),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true },
                        
                        }}
                    />
                    <FormAutocompleteField
                        props={{
                            name: "idMarketPlace",
                            control: control,
                            label: t(props.formFieldsLabels.pointOfSale.marketPlace),
                            disabled: false,
                            additional: {
                            selector: selectMarketPlaces,
                            
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