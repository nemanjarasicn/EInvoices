import React from "react";
import {
    Paper,
    Typography,
    Grid,
    Box,
  } from "@mui/material";
import { ArticlesFormComponentProps }  from "./ArticlesFormComponent"
import { useTranslation } from "react-i18next";
import { useComponentsStyles } from "../../shared/components/components.styles";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import { PriceFormModel,   IProps } from "../models/articles.models";
import { useNavigate } from 'react-router-dom';
import  ErrorModal   from   "../../shared/components/ErrorModals"
import SucessModal   from "../../shared/components/SucessModal"
import  { getObjectsAll,  getUnitsAll, getVatAll, getMarketPlacesAll }  from  "../../shared/components/form-fields/store/form.actions"
import { selectCompany } from "../../../app/core/core.selectors";
import {useLocation} from 'react-router-dom';
import {  sendArticlesPrice } from "../store/articles.actions";
import FormCurrencyField from "../../shared/components/form-fields/FormCurrencyField";
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

export default function FormArticlePriceComponent({
    props,
  }: IProps<ArticlesFormComponentProps>): JSX.Element {
    const companyId = useAppSelector(selectCompany) as number;

    const  defaultValues:  PriceFormModel = {
      price: ""
    };
    const { t } = useTranslation();
    const { formComponent } = useComponentsStyles();
    const navigate  = useNavigate();
    const dispatch = useAppDispatch();
    const [showError, setShowError] = React.useState(false);
    const [showErrorModal, setShowErrorModal] = React.useState(false);
    
    const location = useLocation();
  


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
        dispatch(getObjectsAll({companyId: companyId}));
        dispatch(getUnitsAll());
        dispatch(getVatAll());
        dispatch(getMarketPlacesAll({companyId: companyId}));
  
      }, []);

      const onSubmit = async  (dataPrice: PriceFormModel) => {
          const dataArtikal = location.state;
          await dispatch(sendArticlesPrice({data:dataArtikal , price: dataPrice })).then((res) => {
            if(res.payload === "sucsess") {
                  setShowError(true);
                  setTimeout(() => {
                      setShowError(false);
                      navigate('/articles/articlesList'
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
          });
      }
      
  
    return (
        <Grid item xs={12}>
            <SucessModal    open={showError} ></SucessModal>
            <ErrorModal    open={showErrorModal} ></ErrorModal>
            <Box
              sx={{
                ...formComponent.basicBox,
                textAlign: "start",
              }}
            >
                <Typography sx={formComponent.typography}>
                    {('PODACI O CENI').toUpperCase()}
                </Typography>
                <Paper style={formComponent.groupPaper}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                    <FormCurrencyField
                        props={{
                          name: "price",
                          control: control,
                          label: "Cena",
                          additional: { mask: {}, readonly: false },
                          disabled: false,
                        }}
                     />    
                    </Grid>
                </Grid>
                </Paper>
            </Box>
            
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