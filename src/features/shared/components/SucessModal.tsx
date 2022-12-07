import * as React from 'react';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import Box from '@mui/material/Box';

import Divider from '@mui/material/Divider';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 350 : 480 , 
    height: () => window.devicePixelRatio == 1.5 ? 320 : 240 ,
   

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 5,
    backgroundColor:  '#323b40',
    display:  'flex',
    justifyContent:  'center'
  };


  

export default function  SucessModal(props: any)  {
      return (
        <Modal
            open={props.open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} >
                <Grid id="gridConteiner"    >
                    <Grid id="gridConteinerImg"  sx={{display: 'flex', justifyContent:  'center'}}  >
                        <Box  >
                          <CheckCircleOutlineIcon id="imgAlert"  sx={{width: 100, height: 100,  color:   'green'}} />
                        </Box>
                    </Grid>
                    <Grid>
                    <Typography id="modal-modal-message" sx={{display: 'flex', justifyContent: 'center',  alignItems:  'center'}} variant="h6" color={'white'} component="h2">
                        Uspesno ste sacuvali podatak
                    </Typography>
                    </Grid>
                </Grid>

            </Box>
      </Modal>
    );
  }