import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Viewer } from '@react-pdf-viewer/core';

import Divider from '@mui/material/Divider';
import  { setopenModalPdf }  from   '../../invoices/store/invoice.reducer'
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import DocumentPdf from './DocumentPdf';
import { sampleBase64pdf } from "./sampleBase64pdf";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';

import Box from '@mui/material/Box'



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 550 : 828 , 
    height: () => window.devicePixelRatio == 1.5 ? 350 : 978 ,
 

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 5,
    backgroundColor:  '#323b40',
    display:  'flex'
  };

  export default function  ModalPdf (props: any)  {   

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
                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,   color:  'white'}}>
                                        Pdf 1
                                    </Typography>
                            
                            </Grid>
                            <Grid item  xs={2}  sx={{display:   'flex',   color:  'white',   justifyContent:  'flex-end'}} >
                                    <Typography onClick={() => {dispatch(setopenModalPdf(false))}} sx={{fontFamily: 'Roboto', 
                                        fontStyle: 'normal',

                                        /* or 158% */
                                        lineHeight:  '32px', 
                                        textAlign: 'center',
                                        textTransform: 'uppercase',
                                        fontSize:  window.devicePixelRatio == 1.5 ?  12 : 24,
                                        '&:hover':{cursor: 'pointer'
                                    }}}>X</Typography>
                            </Grid>
                    </Grid>
                    <Divider sx={{backgroundColor:  '#6cb238'}} />

                    {/*<Grid sx={{display:  'flex', height:  '90%', overflow: "auto", scrollBehavior: "smooth", justifyContent: 'center', mt: 2.5}} >
                                <DocumentPdf  pdf={sampleBase64pdf}  />
                                  </Grid>*/}
                    

                    <PDFViewer width={750} height={700} showToolbar={false}>
                      <DocumentPdf  />
                    </PDFViewer>

                    
                    <Grid sx={{display:  'flex', height:  '10%', mt: 2.5, justifyContent:  'center'}} >
                                    <Grid  item xs={6} sx={{mr: 2.5}}>
                                                <Button fullWidth variant="contained"     onClick={() => {dispatch(setopenModalPdf(false))}}    sx={{mt: 2  ,fontSize: 14, backgroundColor:  'transparent',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
                                    </Grid>
                                    <Divider />
                                    <Grid  item xs={6} >
                                    <PDFDownloadLink
                                              document={<DocumentPdf  />}
                                              fileName={'test.pdf'}
                                              style={{textDecoration: 'none'}} 
                                            >
                                                <Button fullWidth variant="contained"    sx={{mt: 2  ,fontSize: 14, height:    '56px',  backgroundColor:  '#6cb238',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Stampa</Button>
                                    </PDFDownloadLink>
                                  </Grid>      
                            </Grid>
            </Grid>
            </Box>
      </Modal>
    );
  }