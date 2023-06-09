import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid, Box, Modal } from '@mui/material';
import FormArticlePriceComponent from '../components/FormAriclesPriceComponent';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: () => (window.devicePixelRatio === 1.5 ? 600 : 800),
  height: () => (window.devicePixelRatio === 1.5 ? 300 : 300),

  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 5,
  backgroundColor: 'white',
  display: 'flex',
};

export default function ModalCreateArticalPrice(props: any) {
  return (
    <Modal
      open={props.open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      //onBackdropClick="false"
    >
      <Box sx={style}>
        <Grid
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
            height: '100%',
          }}
        >
          <Grid sx={{ display: 'flex', height: '5%' }}>
            <Grid
              item
              xs={10}
              sx={{ display: 'flex', justifyContent: 'flex-start' }}
            >
              <Typography
                id="modal-modal-title"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',

                  /* or 158% */
                  lineHeight: '32px',
                  fontWeight: 700,
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  fontSize: window.devicePixelRatio === 1.5 ? 16 : 24,
                  color: 'black',
                }}
              >
                Nova cena
              </Typography>
            </Grid>
          </Grid>
          <FormArticlePriceComponent props={props} />
        </Grid>
      </Box>
    </Modal>
  );
}
