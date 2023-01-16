import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Viewer } from '@react-pdf-viewer/core';

import Divider from '@mui/material/Divider';
import RegistriesFormComponent, {
    RegistriesFormComponentProps,
  } from "./RegistriesFormComponent";
import  { setopenModalPdf }  from   '../../invoices/store/invoice.reducer'
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import CustomButtonFc from "../../shared/components/CustomButtonFc";
import { useNavigate } from 'react-router-dom';
import   {  setopenModalConfirm   }  from  "../store/registries.reducer"
import CustomButtonFcTra from "../../shared/components/CustomButtonFcTra";
import { useFeatureSettings } from "../settings";
import { CreateType, CreateType as CreateTyperegistries}  from "../models/registries.enums"



import Box from '@mui/material/Box'
import FormDistributorComponent from './FormDistributorComponent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 450 : 700 , 
    height: () => window.devicePixelRatio == 1.5 ? 200 : 300 ,
 

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p:  window.devicePixelRatio == 1.5 ? 2 : 5,
    backgroundColor:  'white',
    display:  'flex'
  };

  export default function   ModalConfirm (props: any)  {   

    const { RegistriesCreateTemplatePageSettings } = useFeatureSettings();
    const dispatch = useAppDispatch();
    const navigate  = useNavigate();

      return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            //onBackdropClick="false"
        >
            <Box sx={style} >
            <Grid sx={{display:  'flex', width: '100%',  flexDirection:  'column',  height:  '100%'}} >
                      <Grid sx={{display:  'flex', height:  '70%', justifyContent:  'center'}} >
                            <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'center'}}>
                                    <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center', fontFamily: 'Roboto', 
                                        fontStyle: 'normal',

                                        /* or 158% */
                                        lineHeight:  '32px', 
                                        fontWeight:   700, 
                                        textAlign: 'center',
                                        //textTransform: 'uppercase',
                                        fontSize:  window.devicePixelRatio == 1.5 ?  16 : 24,   color:  'black'}}>
                                        Da li ste uneli putanje na sef-u u api managmentu
                                    </Typography>
                            
                            </Grid>
                      </Grid>
                            <Grid item xs={12} sx = {{display: 'flex', justifyContent: 'space-between'}} >
                                  <CustomButtonFcTra 
                                      soloButton={{
                                          title: "Otkaži",
                                          disabled: false,
                                          btnFn:  ()  =>  dispatch(setopenModalConfirm(false))
                                      }}
                                    />

                                    <CustomButtonFc 
                                      soloButton={{
                                          title: "SAČUVAJ",
                                          disabled: false,
                                          btnFn:  ()  =>  navigate("/registries/companies"),
                                      }}
                                    />
                              </Grid>
                            
                    </Grid>
                
            </Box>
      </Modal>
    );
  }