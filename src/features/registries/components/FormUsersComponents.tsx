import React from "react";
import {
    Paper,
    Grid,
    Box
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
import { UsersFormModel, IProps } from "../models/registries.models";
import { selectCompaniesAll } from "../../shared/components/form-fields/store/form.selectors";
import { useNavigate } from 'react-router-dom';
import FormDropdownField from "../../shared/components/form-fields/FormDropdownField";
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import  MultipleSelect  from  "../../shared/components/form-fields/FormDropdownFieldNew"
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import { getCompaniesAll }  from  "../../shared/components/form-fields/store/form.actions"
import { sendUsers } from "../store/registries.actions";
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
    password: yup.string().required('Password is required'),
    confirmpassword: yup.string()
       .oneOf([yup.ref('password'), null], 'Passwords must match')
 })
 .required();

export default function FormUsersComponent({
    props,
  }: IProps<RegistriesFormComponentProps>): JSX.Element {
    const companyId = useAppSelector(selectCompanyCurrent) as any;
    const defaultValues:  UsersFormModel = {
      id: "",
      companyId: companyId ,
      username: "",
      password: "",
      confirmpassword: "",
      companyList: []
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

      const onSubmit = (data: UsersFormModel) => {
       console.log(data);
       dispatch(sendUsers({data})).then((res) => {
        if(res.payload === 'sucsses') {
          setShowError(true);
          setTimeout(() => {
              setShowError(false);
              navigate('/registries/users'
              )
          }, 2000);
        }   else {
            setShowErrorModal(true);  
            setTimeout(() => {
                  setShowErrorModal(false);
                  /*navigate('/registries/companies'
                  )*/
            }, 2000);
          }
      })
    
    }
  
      

      React.useEffect(() => {
        dispatch(getCompaniesAll());
      }, []);
  
    return (
        <Grid item xs={12}>
            <SucessModal    open={showError} ></SucessModal>
            <ErrorModal    open={showErrorModal} ></ErrorModal>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {true ?
                        <MultipleSelect  props={{
                          selector: selectCompaniesAll,
                          control: control,
                          name: 'companyList'
                        }}/> : 
                        <FormTextField
                        props={{
                            control: control,
                            name: "companyId",
                            label: t(props.formFieldsLabels.users.company),
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
                            name: "username",
                            label: t(props.formFieldsLabels.users.username),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true }
                        
                        }}
                    />
                    <FormTextField
                        props={{
                            control: control,
                            name: "password",
                            label: t(props.formFieldsLabels.users.password),
                            disabled: false,
                            additional: { readonly: false, labelShrink: true },
                        
                        }}
                    />

                    <FormTextField
                        props={{
                            control: control,
                            name: "confirmpassword",
                            label: t(props.formFieldsLabels.users.confirmPassword),
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