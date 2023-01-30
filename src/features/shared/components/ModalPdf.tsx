import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Viewer } from '@react-pdf-viewer/core';

import Divider from '@mui/material/Divider';
import  { setopenModalPdf }  from   '../../invoices/store/invoice.reducer'
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {DocumentPdf} from './DocumentPdf';
import { sampleBase64pdf } from "./sampleBase64pdf";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import  { selectInvoiceDetails, selectOpenPdf }    from  "../../invoices/store/invoice.selectors"
import { printPlugin } from '@react-pdf-viewer/print';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';
import { unzipFile,  unzipFileData }  from  "../../invoices/pages/InvoiceTemplatePage"
import {getInvoiceDetails, getZip }  from  "../../invoices/store/invoice.actions"
import  {  createPdfObject  }    from  "../../invoices/utils/utils"


import Box from '@mui/material/Box'

//import XMLParser from 'react-xml-parser';
import xml2js from "xml2js";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 600 : 828 , 
    height: () => window.devicePixelRatio == 1.5 ? 700 : 978 ,
 

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
	const [invoiceObject, setInvoiceObject]  =  React.useState({});
	const [datainvoice,   setDataInvoice]  =  React.useState({});
	const openPdfData = useAppSelector(selectOpenPdf);
	const [showModel, setShowModel] = React.useState(false);
	const listRow = useAppSelector(selectInvoiceDetails);
	const [loading, setLoading] = React.useState(true);
	const [idXml, setIdXml]  =   React.useState("");
	const [typeInvoicesZip, settypeInvoicesZip]  = React.useState(0);

	const componentRef = useRef(null);

	const printPluginInstance = printPlugin();
	const { print } = printPluginInstance;
	const widthPdf =  window.devicePixelRatio == 1.5 ? 520 : 750

	//console.log('modalda',  openPdfData);


    React.useEffect(() => {
		const xmlTmp = openPdfData?.data?.dataRows ? openPdfData?.data?.dataRows?.xml : "";
		const prefixPdf = openPdfData?.data?.paramData?.typeDocument === '381' ? 'CreditNote'  : 'Invoice';
		const typCodeTmp = openPdfData?.data?.paramData?.typeDocument === '381' ? 'cbc:CreditNoteTypeCode'  : 'cbc:InvoiceTypeCode';
		setIdXml(openPdfData?.data?.dataInfo);
		settypeInvoicesZip(openPdfData?.data?.typeInvoicesZip);
		xml2js.parseString(xmlTmp, (err, result) => {
			if (err) {
			  throw err;
			}
			const json = JSON.stringify(result, null, 4);
			const objectTmp = {
				AccountingCustomerParty: {
					name: result?.[`${prefixPdf}`]['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:RegistrationName'][0],
					adress:  result?.[`${prefixPdf}`]['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:StreetName'][0],
					city:  result?.[`${prefixPdf}`]['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:CityName'][0],
					pib:  result?.[`${prefixPdf}`]['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cbc:EndpointID'][0]['_'],
					mb:  result?.[`${prefixPdf}`]['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:CompanyID'][0]
				},
				AccountingSupplierParty: {
					name: result?.[`${prefixPdf}`]['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:RegistrationName'][0],
					adress:  result?.[`${prefixPdf}`]['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:StreetName'][0],
					city:  result?.[`${prefixPdf}`]['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:CityName'][0],
					pib:  result?.[`${prefixPdf}`]['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cbc:EndpointID'][0]['_'],
					mb:  result?.[`${prefixPdf}`]['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:CompanyID'][0]
				},
				paymentMeans:  result?.[`${prefixPdf}`]['cac:PaymentMeans'][0]['cac:PayeeFinancialAccount'][0]['cbc:ID'][0],
				paymentMode:   result?.[`${prefixPdf}`]['cac:PaymentMeans'][0]['cbc:PaymentID'][0],
				dueDate:    result?.[`${prefixPdf}`]['cbc:DueDate'],
				delivery:   result?.[`${prefixPdf}`]['cac:Delivery'] ?    result?.[`${prefixPdf}`]['cac:Delivery'][0]['cbc:ActualDeliveryDate'][0]  :  "",
				issueDate:   result?.[`${prefixPdf}`]['cbc:IssueDate'][0],
				invoiceTypeCode: result?.[`${prefixPdf}`][`${typCodeTmp}`][0],
				note:  result?.[`${prefixPdf}`]['cbc:Note'] ?  result?.[`${prefixPdf}`]['cbc:Note'][0] :  "",	
				numberDocument:    result?.[`${prefixPdf}`]['cbc:ID'][0],
				legalMonetaryTotal:  {
					payableAmount:   result?.[`${prefixPdf}`]['cac:LegalMonetaryTotal'][0]['cbc:PayableAmount'][0]['_'],
					lineExtensionAmount:   result?.[`${prefixPdf}`]['cac:LegalMonetaryTotal'][0]['cbc:LineExtensionAmount'][0]['_'],
				},
				taxTotal: {
					taxAmount:  result?.[`${prefixPdf}`]['cac:TaxTotal'][0]['cac:TaxSubtotal'][0]['cbc:TaxAmount'][0]['_'],
				}

			}
			setDataInvoice(objectTmp);
			if(result) {
				setLoading(false);
			}
			
		  });
    }, [openPdfData]);

	const handlePrint = () => {
		let PDF:  HTMLIFrameElement = document.getElementsByClassName("test")[0]  as HTMLIFrameElement;
		console.log(PDF)
		PDF.focus();
		PDF.contentWindow?.print();
	}

	const getZipData = async  (flag: string, typeInvoicesZip:  number,  id: any) =>  {
		const  typeInvoices =  flag ===  'XML'  ?   'downloadXml'  :  'printPdf';
		//const dataInvoicePdf = setDataPdf(dataRows.xml);
		const zipData = await dispatch(getZip({id: id,typeDocument: typeInvoicesZip, typeInvoices:  typeInvoices}));
		//const unzipData = await  unzipFileData(zipData);
		/*if(flag ===  'PDF') {
		  dispach(getInvoiceDetails({id: dataRows?.id})).then((res) => {
			dispach(setopenModalPdf({open:true, data: {dataXml: dataRows.xml, dataRows: res.payload}}))
	
		});*/
	   unzipFile(flag, zipData)
		.catch((err)   =>  console.log('greska prilikom download ' + flag));
	}
	

	if(loading) {
		return <div></div>
	}
	

	const handleClose = () =>   {  setLoading(true)  } ;

      return (
		
			<Modal
				open={props.open}
				onClose={handleClose}
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
										<Typography onClick={() => {handleClose();dispatch(setopenModalPdf({open: false,  data:  ""}))}} sx={{fontFamily: 'Roboto', 
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
						

						<PDFViewer width={widthPdf} height={700} showToolbar={false}  className="test" >
							<DocumentPdf  data={datainvoice}  listRow={openPdfData?.data?.dataRows}   />
						</PDFViewer>
						

						
						<Grid sx={{display:  'flex', height:  '10%', mt: 2.5, justifyContent:  'center'}}  >
										<Grid  item xs={6} sx={{mr: 2.5}}>
													<Button fullWidth variant="contained"     onClick={() => {handleClose();dispatch(setopenModalPdf({open: false, data: ""}))}}    sx={{mt: 2  ,fontSize: 14, backgroundColor:  'transparent',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
										</Grid>
										<Divider />
										<Grid  item xs={6} >
										<PDFDownloadLink
												document={<DocumentPdf   data={datainvoice}  listRow={openPdfData?.data?.dataRows} />}
												fileName={`${idXml}.pdf`}
												style={{textDecoration: 'none'}} 
												>
													<Button fullWidth variant="contained"    sx={{mt: 2  ,fontSize: 14, height:    '56px',  backgroundColor:  '#6cb238',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Download</Button>
										</PDFDownloadLink>
									</Grid>      
								</Grid>

								<Grid sx={{display:  'flex', height:  '10%', mt: 1, justifyContent:  'center'}} >
										<Grid  item xs={6} sx={{mr: 2.5}}>

													<Button fullWidth variant="contained"     onClick={()  =>  handlePrint()}   sx={{mt: 2  ,fontSize: 14, backgroundColor:  '#E9950C',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Stampa</Button>
										</Grid>
										<Divider />
										<Grid  item xs={6} >
													<Button fullWidth variant="contained"   onClick = {() =>  {getZipData('XML', typeInvoicesZip, idXml,)}}    sx={{mt: 2  ,fontSize: 14, height:    '56px',  backgroundColor:  'blue',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>DownloadXml</Button>
									</Grid>      
								</Grid>
				</Grid>
				</Box>
			</Modal>

    );
  }