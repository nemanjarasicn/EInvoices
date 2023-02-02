import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import Box from '@mui/material/Box'
import FormSubjectComponent from './FormSubjectComponent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 700 : 900 , 
    height: () => window.devicePixelRatio == 1.5 ? 600 : 750 ,
 

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p:  window.devicePixelRatio == 1.5 ? 2 : 5,
    backgroundColor:  'white',
    display:  'flex'
  };

  export default function  ModalCreateArtical (props: any)  {   

    const dispatch = useAppDispatch();
    
      return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            //onBackdropClick="false"
        >
            <Box sx={style} >
            <Grid sx={{display:  'flex', width: '100%',  flexDirection:  'column',  height:  '100%'}} >
                    <Grid sx={{display:  'flex', height:  '5%'}} >
                            <Grid item  xs={10}  sx={{display:  'flex', justifyContent:  'flex-start'}}>
                                    <Typography id="modal-modal-title"    sx={{display:  'flex', justifyContent:  'center', fontFamily: 'Roboto', 
                                        fontStyle: 'normal',

                                        /* or 158% */
                                        lineHeight:  '32px', 
                                        fontWeight:   700, 
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        fontSize:  window.devicePixelRatio == 1.5 ?  16 : 24,   color:  'black'}}>
                                        Novi Komitent
                                    </Typography>
              
                            </Grid> 
                    </Grid>
                    <FormSubjectComponent   props={props} />
                
            </Grid>
            </Box>
      </Modal>
    );
  }