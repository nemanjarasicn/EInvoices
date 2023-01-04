import React from "react";
import {
    Paper,
    Grid,
    Box,
    Typography,
    TextField,
    Button
  } from "@mui/material";
import { RegistriesFormComponentProps }  from "./RegistriesFormComponent"
import { useTranslation } from "react-i18next";
import { useComponentsStyles } from "../../shared/components/components.styles";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormTextField  from  "../../shared/components/form-fields/FormTextField"
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import { ObjectFormModel, IProps } from "../models/registries.models";
import { selectClientCompanies } from "../../shared/components/form-fields/store/form.selectors";
import { useNavigate } from 'react-router-dom';
import FormAutocompleteField from "../../shared/components/form-fields/FormAutocompleteField";
import { selectCompanyCurrent } from "../../../app/core/core.selectors";
import { sendObjects } from "../store/registries.actions";
import { selectUser, selectCompanyAdmin }  from  "../../../app/core/core.selectors"
import  ErrorModal   from   "../../shared/components/ErrorModals"
import  {  getCompaniesAll }   from   "../../shared/components/form-fields/store/form.actions"
import { useLocation } from "react-router-dom";
import {  selectUsers }  from  "../store/registries.selectors"
import  { selectCompanyInfo }  from   "../store/registries.selectors"
import  { getLoggedSubject }  from "../../../app/core/core.actions"
import  {  getCompanyInfo }  from  "../store/registries.actions"
import  { getUsers }   from  "../store/registries.actions"
import { getObjectsAll,  getMarketPlacesAll } from "../../shared/components/form-fields/store/form.actions";
import SucessModal   from "../../shared/components/SucessModal"
import { selectObjectsAll, selectMarketPlaces } from "../../shared/components/form-fields/store/form.selectors";
import List from '@mui/material/List';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
//import ClientComponent from "./form-group/ClientComponent";




export default function InfoCompany(): JSX.Element {
    const navigate  = useNavigate();
    const dispatch = useAppDispatch(); 
    const location = useLocation();
    const id = location.state.company;

    
    const users  =  useAppSelector(selectUsers);
    const companyInfo =  useAppSelector(selectCompanyInfo);
    const marketPlace = useAppSelector(selectMarketPlaces);
    const objects  =  useAppSelector(selectObjectsAll);
    const fontSize  =  window.devicePixelRatio === 1.5 ?    '12px' :  '20px';
    const marginTopBredcumbs   =   window.devicePixelRatio === 1.5 ?    6  :  12;
    const  marginTopBox  =   window.devicePixelRatio === 1.5 ?    5   :   10;
    const fontSizeButton  =  window.devicePixelRatio === 1.5 ?    '12px' :  '16px';

    
    React.useEffect(() => {
        dispatch(getCompanyInfo({id: Number(id) }));
        dispatch(getUsers({companyId: Number(id) }));
        dispatch(getMarketPlacesAll({companyId: Number(id) }));
        dispatch(getObjectsAll({companyId: Number(id) }));
      }, []);
  
  
    return (
        <Grid item xs={12}>
            <Breadcrumbs aria-label="breadcrumb"   sx={{'& .MuiBreadcrumbs-separator': {color: ' #60737C'}, mt:   marginTopBredcumbs}}>
                <Typography  sx={{color: 'white', fontSize:  fontSize, fontFamily:  "Roboto",  lineHeight:  "32px",  fontWeight:  700,}}>Informacije o Kompaniji</Typography>
          </Breadcrumbs>
            <Paper sx={{backgroundColor: 'white' , mt:   marginTopBox, height: '700px'}}>
                <Grid container  sx={{display: 'flex', p: 4}}  spacing={2}>
                    <Grid item xs={6}   >
                        <Typography sx={{ fontSize: fontSize, mb:  4}}  >
                            Naziv Kompanije:  {companyInfo?.companyName}  
                        </Typography>
                        <Typography   sx={{ fontSize: fontSize}} >
                            PIB:     {companyInfo?.pib} 
                        </Typography>
                        <Typography    sx={{ fontSize: fontSize}}>
                            Adresa:   {companyInfo.address} 
                        </Typography>
                        <Typography    sx={{ fontSize: fontSize}} >
                            Mb:   {companyInfo?.mb} 
                        </Typography>
                        <Typography    sx={{ fontSize: fontSize}} >
                            PostanskiBroj:   {companyInfo?.zip} 
                        </Typography>
                        <Typography    sx={{ fontSize: fontSize}} >
                            Drzava:  {companyInfo?.country} 
                        </Typography>
                        <Typography    sx={{ fontSize: fontSize}} >
                            Grad:  {companyInfo?.city} 
                        </Typography>
                    </Grid>
                    <Grid item xs={6}   sx={{display:  'flex',  flexDirection:   'column'}} >
                        <Grid  sx={{display:  'flex',  flexDirection:  "column"}}>
                            <Typography sx={{ fontSize: fontSize}}  >
                                Adresa za primanjenotifikacije o izlaznim fakturama
                            </Typography>
                            <Box component="span" sx={{ p: 2, border: '1px solid grey', backgroundColor:  '#f3f3f4' }}>
                                    <Typography sx={{ fontSize: fontSize}}  >
                                        https://api.master.software/api/v1/invoice/output/{id}
                                    </Typography>
                            </Box>
                        </Grid>
                        <Grid  sx={{display:  'flex',  flexDirection:  "column"}}>
                            <Typography sx={{ fontSize: fontSize, mt: 4}}  >
                                Adresa za primanjenotifikacije o ulaznim fakturama
                            </Typography>
                            <Box component="span" sx={{ p: 2, border: '1px solid grey',  backgroundColor:  '#f3f3f4' }}>
                                    <Typography sx={{ fontSize: fontSize}}  >
                                        https://api.master.software/api/v1/invoice/input/{id}
                                    </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                    <Grid item xs={4}   sx={{display:    'flex',  flexDirection:  'column'}} >
                        <Typography  sx={{fontSize:  fontSize, p: 4,   backgroundColor:  ' #f3f3f4'}}>
                            Objekti
                        </Typography>
                        <List sx={{ backgroundColor:  ' #f3f3f4', height:  '200px',  overflowY: "auto", }}>
                            {objects.map((item, index)  =>  (
                                <Typography   sx={{pl:  4, fontSize: fontSize}}  key={index}>
                                    {Number(index) + 1}.{item.name}
                                </Typography>
                               
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={4}  >
                        <Typography  sx={{fontSize:  fontSize, p: 4,  backgroundColor:  ' #f3f3f4'}}>
                           Prodajna mesta 
                        </Typography>
                        <List sx={{ backgroundColor:  ' #f3f3f4', height:  '200px',   overflowY: "auto", }}>
                            {marketPlace.map((item, index)  =>  (
                                <Typography   sx={{pl:  4,   fontSize: fontSize}}  key={index}>
                                    {Number(index) + 1}.{item.name}
                                </Typography>
                               
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={4}  >
                        <Typography  sx={{fontSize:  fontSize, p: 4,  backgroundColor:  ' #f3f3f4'}}>
                            Korisnici
                        </Typography>
                        <List sx={{ backgroundColor:  ' #f3f3f4', height:  '200px',  overflowY: "auto", }}>
                            {users.map((item, index)  =>  (
                                <Typography   sx={{pl:  4,  fontSize: fontSize}}  key={index}>
                                    {Number(index) + 1}.{item.username}
                                </Typography>
                               
                            ))}
                        </List>
                    </Grid>
                    <Grid item xs={12}  sx={{display:  'flex', justifyContent:  'flex-end', mt: 2}} >
                        <Grid item xs={4} sx={{justifyContent: 'flex-end'}} >
                                <Button
                                    sx={{
                                    width: "220px",
                                    fontSize:  fontSizeButton,
                                    borderRadius: "30px",
                                    float: "right",
                                    mr: 1,
                                    backgroundColor:  ' #f3f3f4'
                                    }}
                                    size="large"
                                    variant="outlined"
                                    onClick={() => navigate("/registries/companies")}
                                >
                                   Lista kompanija
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    )
}