import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Box, Modal } from '@mui/material';
import AddTaskIcon from '@mui/icons-material/AddTask';

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
                fontSize: window.devicePixelRatio === 1.5 ? 12 : 16,
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
