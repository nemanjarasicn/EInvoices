import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { hasError} from "../../../app/core/core.selectors";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { setopenModalError } from '../../invoices/store/invoice.reducer';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio === 1.5 ? 350 : 550 , 
    height: () => window.devicePixelRatio === 1.5 ? 320 : 300 ,
   

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 2,
    backgroundColor:  '#323b40',
    display:  'flex',
    justifyContent:  'center'
  };


  

export default function  ErrorModal(props: any)  {
    
    let open = useAppSelector(hasError) ? true : false;
    const error = useAppSelector(hasError);
    const dispatch = useAppDispatch(); 

    

      return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Grid id="gridConteiner"  sx={{height: '100%'}}   >
                      <Grid id="gridConteinerImg"  sx={{display: 'flex', justifyContent:  'center', height: '30%'}}  >
                          <Box  >
                            <ErrorOutlineIcon id="imgAlert"  sx={{width: 60, height: 60,  color:   'red'}} />
                          </Box>
                      </Grid>
                      <Grid sx={{height:  '70%'}}>
                          <Grid sx ={{display:  'flex',  flexDirection:   'column',  height: '80%'}}  container  >
                              <Typography id="modal-modal-message" sx={{display: 'flex', justifyContent: 'center',  alignItems:  'center'}} variant="h6" color={'white'} component="h2">
                                  Greska
                              </Typography>
                              <Typography id="modal-modal-message" sx={{display: 'flex', justifyContent: 'center',  alignItems:  'center',  color:  'gray', fontSize:  '16px'}} variant="h6" color={'white'} component="h2">
                                  {props?.message}
                              </Typography>
                              <Typography id="modal-modal-message" sx={{display: 'flex', justifyContent: 'center',  alignItems:  'center',  color:  'gray', fontSize:  '14px'}} variant="h6" color={'white'} component="h2">
                                  Molimo pozovite administratora
                              </Typography>
                          </Grid>
                          <Grid  sx ={{height:  '20%'}}>
                                  <Grid sx = {{display:  'flex',  justifyContent:  'center'}}>
                                      <Button fullWidth variant="contained"   onClick={() => {dispatch(setopenModalError(false))}}     sx={{ width: '60%', fontSize: '14px', backgroundColor:  'white',  color: 'black',  border:  'solid 1px white',  height: '30px',  borderRadius:  '10px',   display:  'flex',  justifyContent:  'center' }}>ZATVORI</Button>
                                  </Grid>
                          </Grid>
                      </Grid>
                </Grid>

            </Box>
      </Modal>
    );
  }