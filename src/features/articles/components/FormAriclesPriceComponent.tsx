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
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import {useLocation} from 'react-router-dom';
import {  sendArticlesPrice } from "../store/articles.actions";
import FormCurrencyField from "../../shared/components/form-fields/FormCurrencyField";
import { setopenModalCreateArticalPrice,  setOpenSucessModal } from "../store/articles.reducer";
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
    const companyId = useAppSelector(selectCompanyCurrent);

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
          const dataArtikal =  props?.data; //location.state;
          await dispatch(sendArticlesPrice({data:dataArtikal , price: dataPrice })).then((res) => {
            if(res.payload === "sucsess") {
                  //setShowError(true);
      
                  dispatch(setopenModalCreateArticalPrice({open: false}));
                  dispatch(setOpenSucessModal(true));
                  setTimeout(() => {
                      //setShowError(false);
                      dispatch(setOpenSucessModal(false));
                      navigate('/articles/articlesList'
                      )
                  }, 2000);
                  navigate('/articles/articlesList')
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
        <Grid item xs={12}  sx={{mt: 2}}>
            <SucessModal    open={showError} ></SucessModal>
            <ErrorModal    open={showErrorModal} ></ErrorModal>
            
                <Paper style={formComponent.groupPaperPrice}>
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

            
            <Grid item xs={5}  sx={{mt: 5}}>
            
                      <CustomButtonFc
                        groupButton={[
                          
                          {
                            title: "ODUSTANI",
                            disabled: false,
                            btnFn: () => { console.log('asassas'); dispatch(setopenModalCreateArticalPrice(false))},
                          },
                          {
                            title: "SACUVAJ",
                            disabled: false,
                            btnFn: handleSubmit(onSubmit),
                          },
                        ]}
                      />

            </Grid>
  
        </Grid>
    )
}