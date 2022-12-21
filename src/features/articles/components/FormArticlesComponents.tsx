import React from "react";
import {
    Paper,
    Typography,
    Grid,
    Box,
  } from "@mui/material";
import { ArticlesFormComponentProps }  from "./ArticlesFormComponent"
import FormTextField  from  "../../shared/components/form-fields/FormTextField"
import { useComponentsStyles } from "../../shared/components/components.styles";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import { ArticleFormModel,   IProps } from "../models/articles.models";
import { useNavigate } from 'react-router-dom';
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import  ErrorModal   from   "../../shared/components/ErrorModals"
import SucessModal   from "../../shared/components/SucessModal"
import  { getObjectsAll,  getUnitsAll, getVatAll, getMarketPlacesAll }  from  "../../shared/components/form-fields/store/form.actions"
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import  {  selectUnitsAll,  selectVatsAll,   selectMarketPlaces }  from   "../../shared/components/form-fields/store/form.selectors"
import { sendArticle } from "../store/articles.actions";
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

export default function FormArticleComponent({
    props,
  }: IProps<ArticlesFormComponentProps>): JSX.Element {
    const companyId = useAppSelector(selectCompanyCurrent) as any;



    /*const marketPlacesAll = useAppSelector(selectMarketPlaces).map((item) => ({
      uuid:  item.item.uuid,
      id:  item.item.id,
      marketPlaceName:   item.item.marketPlaceName
    }));*/



    const  defaultValues:  ArticleFormModel = {
      productName:  "",
      sale:  true,
      recipe:  true,
      stock:  true,
      production:  true,
      consumables:  true,
      modificationRequired:   true,
      decimalShow:   true,
      priceChangeForbidden:   true,
      barCode:   "",
      code:   "",
      idCompany:  companyId,
      idObject:   0,
      productUnitRequest:  "",
      productVatRequest:  "",
      price:  "",
      marketPlaceDtos:  useAppSelector(selectMarketPlaces).map((item) => ({
        uuid:  item.item.uuid,
        id:  item.item.id,
        marketPlaceName:   item.item.marketPlaceName
      }))
    };
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
      

      React.useEffect(() => {
        dispatch(getObjectsAll({companyId: companyId}));
        dispatch(getUnitsAll());
        dispatch(getVatAll());
        dispatch(getMarketPlacesAll({companyId: companyId}));
  
      }, []);

      const onSubmit = async  (data: ArticleFormModel) => {
         await dispatch(sendArticle({data})).then(async (res) => {
            if(res.payload.message === "sucsess") {
              setShowError(true);
              setTimeout(() => {
                  setShowError(false);
                  navigate('/articles/createArtikalPrice', 
                  {state: res.payload.data[0].createProduct})
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
                    {('Osnovni podaci').toUpperCase()}
                </Typography>
                <Paper style={formComponent.groupPaper}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
  
                      <FormTextField
                        props={{
                            control: control,
                            name: "productName",
                            label:   "Naziv artikla",
                            disabled: false,
                            additional: { readonly: false, labelShrink: true }
                        
                        }}
                    />

                      <FormTextField
                        props={{
                            control: control,
                            name: "code",
                            label:  "Code",
                            disabled: false,
                            additional: { readonly: false, labelShrink: true }
                        
                        }}
                    />
                     {/*not need only for e facture */}
                     {/* <Grid container sx={{display:   'flex' }} >

                          <Grid item xs={6} sx={{display: 'flex' , flexDirection:  'column'}} >

                            <CheckboxField 
                                  props={{
                                      control: control,
                                      name: "sale",
                                      label: 'Sale',
                                      disabled: false,
                                      additional: { readonly: false, labelShrink: true },
                                  
                                  }}
                            />
                            <CheckboxField 
                                  props={{
                                      control: control,
                                      name: "stock",
                                      label: 'Magacin',
                                      disabled: false,
                                      additional: { readonly: false, labelShrink: true },
                                  
                                  }}
                            />
                            <CheckboxField 
                                  props={{
                                      control: control,
                                      name: "recipe",
                                      label: 'Recipe',
                                      disabled: false,
                                      additional: { readonly: false, labelShrink: true },
                                  
                                  }}
                            />
                            <CheckboxField 
                                  props={{
                                      control: control,
                                      name: "consumables",
                                      label: 'consumables',
                                      disabled: false,
                                      additional: { readonly: false, labelShrink: true },
                                  
                                  }}
                            />
                            <CheckboxField 
                                  props={{
                                      control: control,
                                      name: "production",
                                      label: 'Production',
                                      disabled: false,
                                      additional: { readonly: false, labelShrink: true },
                                  
                                  }}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <CheckboxField 
                                  props={{
                                      control: control,
                                      name: "modificationRequired",
                                      label: 'Modification Required',
                                      disabled: false,
                                      additional: { readonly: false, labelShrink: true },
                                  
                                  }}
                            />

                            <CheckboxField 
                                  props={{
                                      control: control,
                                      name: "priceChangeForbidden",
                                      label: 'Price Change Forbidden',
                                      disabled: false,
                                      additional: { readonly: false, labelShrink: true },
                                  
                                  }}
                            />
                            <CheckboxField 
                                  props={{
                                      control: control,
                                      name: "decimalShow",
                                      label: 'Decimal show',
                                      disabled: false,
                                      additional: { readonly: false, labelShrink: true },
                                  
                                  }}
                            />
                          </Grid>
                        </Grid>*/}
                      </Grid>
                    
                    <Grid item xs={6}>
                    <FormTextField
                        props={{
                            control: control,
                            name: "barCode",
                            label:  "Barcode",
                            disabled: false,
                            additional: { readonly: false, labelShrink: true }
                        
                        }}
                    />
                    {/*not need only for e facture */}
                    {/*<FormAutocompleteField
                        props={{
                            name: "idObject",
                            control: control,
                            label:  "Objekat",
                            disabled: false,
                            additional: {
                            selector: selectObjectsAll,
                            
                            },
                        }}
                      />*/}

                    <FormAutocompleteField
                        props={{
                            name: "productUnitRequest",
                            control: control,
                            label:  "Unit",
                            disabled: false,
                            additional: {
                            selector:  selectUnitsAll,
                            
                            },
                        }}
                        />

                    <FormAutocompleteField
                        props={{
                            name: "productVatRequest",
                            control: control,
                            label:  "Vat",
                            disabled: false,
                            additional: {
                            selector:  selectVatsAll,
                            
                            },
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