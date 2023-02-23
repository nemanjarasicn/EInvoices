import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';

import { useAppDispatch } from '../../../app/hooks';
import AddTaskIcon from '@mui/icons-material/AddTask';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '20%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: () => (window.devicePixelRatio == 1.5 ? 400 : 800),
  height: () => (window.devicePixelRatio == 1.5 ? 300 : 500),

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 5,
  backgroundColor: 'white',
  display: 'flex',
};

export default function ModalSucessArticles(props: any) {
  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      //onBackdropClick="false"
    >
      <Box
        sx={{
          position: 'absolute',
          display: 'flex',
          width: '340px',
          height: '48px',
          borderRadius: '8px',
          top: '5%',
          left: '45%',
          backgroundColor: 'white',
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography sx={{ display: 'flex' }}>
            <AddTaskIcon
              sx={{ fontSize: 30, mr: 1.5, mt: 0.5, color: 'green' }}
            />
            <Typography
              sx={{
                fontFamily: 'Roboto',
                mt: 0.5,
                color: 'black',
                fontStyle: 'normal',

                /* or 158% */
                letterSpacing: '0.02em',
                fontWeight: 700,
                lineHeight: '32px',
                textAlign: 'center',
                textTransform: 'uppercase',
                fontSize: window.devicePixelRatio == 1.5 ? 12 : 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              Uspesno sacuvano
            </Typography>
          </Typography>
        </Grid>
      </Box>
    </Modal>
  );
}
