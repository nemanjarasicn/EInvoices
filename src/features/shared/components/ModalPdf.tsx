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
import  { selectInvoiceDetails, selectOpenPdf }    from  "../../invoices/store/invoice.selectors"

import Box from '@mui/material/Box'

//import XMLParser from 'react-xml-parser';
import xml2js from "xml2js";
import { object } from 'yup';
import { open } from 'fs/promises';

const xml = `
<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"yes\"?>\n
<Invoice
	xmlns=\"urn:oasis:names:specification:ubl:schema:xsd:Invoice-2\"
	xmlns:cac=\"urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2\"
	xmlns:cbc=\"urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2\"
	xmlns:ns2=\"urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2\">\n    
	<cbc:CustomizationID/>\n    
	<cbc:ID>MS-2023/48</cbc:ID>\n    
	<cbc:IssueDate>2023-01-23</cbc:IssueDate>\n    
	<cbc:DueDate>2023-01-23</cbc:DueDate>\n    
	<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>\n    
	<cbc:Note></cbc:Note>\n    
	<cbc:DocumentCurrencyCode>RSD</cbc:DocumentCurrencyCode>\n    
	<cac:InvoicePeriod>\n        
		<cbc:DescriptionCode>3</cbc:DescriptionCode>\n    
	</cac:InvoicePeriod>\n    
	<cac:AccountingSupplierParty>\n        
		<cac:Party>\n            
			<cbc:EndpointID schemeID=\"9948\">111560838</cbc:EndpointID>\n            
			<cac:PartyName>\n                
				<cbc:Name>MASTER SOFTWARE</cbc:Name>\n            
			</cac:PartyName>\n            
			<cac:PostalAddress>\n                
				<cbc:StreetName>MARIČKA 22</cbc:StreetName>\n                
				<cbc:CityName>Beograd</cbc:CityName>\n                
				<cac:Country>\n                    
					<cbc:IdentificationCode>RS</cbc:IdentificationCode>\n                
				</cac:Country>\n            
			</cac:PostalAddress>\n            
			<cac:PartyTaxScheme>\n                
				<cbc:CompanyID>RS111560838</cbc:CompanyID>\n                
				<cac:TaxScheme>\n                    
					<cbc:ID>VAT</cbc:ID>\n                
				</cac:TaxScheme>\n            
			</cac:PartyTaxScheme>\n            
			<cac:PartyLegalEntity>\n                
				<cbc:RegistrationName>MASTER SOFTWARE</cbc:RegistrationName>\n                
				<cbc:CompanyID>21502243</cbc:CompanyID>\n            
			</cac:PartyLegalEntity>\n            
			<cac:Contact>\n                
				<cbc:ElectronicMail>dbogi89@gmail.com</cbc:ElectronicMail>\n            
			</cac:Contact>\n        
		</cac:Party>\n    
	</cac:AccountingSupplierParty>\n    
	<cac:AccountingCustomerParty>\n        
		<cac:Party>\n            
			<cbc:EndpointID schemeID=\"9948\">105917685</cbc:EndpointID>\n            
			<cac:PartyName>\n                
				<cbc:Name>5.com</cbc:Name>\n            
			</cac:PartyName>\n            
			<cac:PostalAddress>\n                
				<cbc:StreetName>MARIČKA 22</cbc:StreetName>\n                
				<cbc:CityName>Beograd</cbc:CityName>\n                
				<cac:Country>\n                    
					<cbc:IdentificationCode>RS</cbc:IdentificationCode>\n                
				</cac:Country>\n            
			</cac:PostalAddress>\n            
			<cac:PartyTaxScheme>\n                
				<cbc:CompanyID>RS105917685</cbc:CompanyID>\n                
				<cac:TaxScheme>\n                    
					<cbc:ID>VAT</cbc:ID>\n                
				</cac:TaxScheme>\n            
			</cac:PartyTaxScheme>\n            
			<cac:PartyLegalEntity>\n                
				<cbc:RegistrationName>5.com</cbc:RegistrationName>\n                
				<cbc:CompanyID>20489197</cbc:CompanyID>\n            
			</cac:PartyLegalEntity>\n            
			<cac:Contact>\n                
				<cbc:ElectronicMail>office@petcom.rs</cbc:ElectronicMail>\n            
			</cac:Contact>\n        
		</cac:Party>\n    
	</cac:AccountingCustomerParty>\n    
	<cac:Delivery>\n        
		<cbc:ActualDeliveryDate>2023-01-23</cbc:ActualDeliveryDate>\n    
	</cac:Delivery>\n    
	<cac:PaymentMeans>\n        
		<cbc:PaymentMeansCode>30</cbc:PaymentMeansCode>\n        
		<cbc:PaymentID>(mod97) 11</cbc:PaymentID>\n        
		<cac:PayeeFinancialAccount>\n            
			<cbc:ID>285233100000025379</cbc:ID>\n        
		</cac:PayeeFinancialAccount>\n    
	</cac:PaymentMeans>\n    
	<cac:TaxTotal>\n        
		<cbc:TaxAmount currencyID=\"RSD\">4115</cbc:TaxAmount>\n        
		<cac:TaxSubtotal>\n            
			<cbc:TaxableAmount currencyID=\"RSD\">20575</cbc:TaxableAmount>\n            
			<cbc:TaxAmount currencyID=\"RSD\">4115</cbc:TaxAmount>\n            
			<cac:TaxCategory>\n                
				<cbc:ID>S</cbc:ID>\n                
				<cbc:Percent>20</cbc:Percent>\n                
				<cac:TaxScheme>\n                    
					<cbc:ID>VAT</cbc:ID>\n                
				</cac:TaxScheme>\n            
			</cac:TaxCategory>\n        
		</cac:TaxSubtotal>\n    
	</cac:TaxTotal>\n    
	<cac:LegalMonetaryTotal>\n        
		<cbc:LineExtensionAmount currencyID=\"RSD\">20575</cbc:LineExtensionAmount>\n        
		<cbc:TaxExclusiveAmount currencyID=\"RSD\">20575</cbc:TaxExclusiveAmount>\n        
		<cbc:TaxInclusiveAmount currencyID=\"RSD\">24690</cbc:TaxInclusiveAmount>\n        
		<cbc:AllowanceTotalAmount currencyID=\"RSD\">0</cbc:AllowanceTotalAmount>\n        
		<cbc:PrepaidAmount currencyID=\"RSD\">0</cbc:PrepaidAmount>\n        
		<cbc:PayableAmount currencyID=\"RSD\">24690.00</cbc:PayableAmount>\n    
	</cac:LegalMonetaryTotal>\n    
	<cac:InvoiceLine>\n        
		<cbc:ID>1</cbc:ID>\n        
		<cbc:InvoicedQuantity unitCode=\"Kom\">2</cbc:InvoicedQuantity>\n        
		<cbc:LineExtensionAmount currencyID=\"RSD\">20575</cbc:LineExtensionAmount>\n        
		<cac:AllowanceCharge>\n            
			<cbc:ChargeIndicator>false</cbc:ChargeIndicator>\n            
			<cbc:MultiplierFactorNumeric>0</cbc:MultiplierFactorNumeric>\n            
			<cbc:Amount currencyID=\"RSD\">0</cbc:Amount>\n        
		</cac:AllowanceCharge>\n        
		<cac:Item>\n            
			<cbc:Name>Losos</cbc:Name>\n            
			<cac:SellersItemIdentification>\n                
				<cbc:ID>1</cbc:ID>\n            
			</cac:SellersItemIdentification>\n            
			<cac:ClassifiedTaxCategory>\n                
				<cbc:ID>S</cbc:ID>\n                
				<cbc:Percent>20</cbc:Percent>\n                
				<cac:TaxScheme>\n                    
					<cbc:ID>VAT</cbc:ID>\n                
				</cac:TaxScheme>\n            
			</cac:ClassifiedTaxCategory>\n        
		</cac:Item>\n        
		<cac:Price>\n            
			<cbc:PriceAmount currencyID=\"RSD\">10287.5</cbc:PriceAmount>\n        
		</cac:Price>\n    
	</cac:InvoiceLine>\n
</Invoice>\n",`

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
	const [invoiceObject, setInvoiceObject]  =  React.useState({});
	const [datainvoice,   setDataInvoice]  =  React.useState({});
	const openPdfData = useAppSelector(selectOpenPdf);
	const [showModel, setShowModel] = React.useState(false);
	const listRow = useAppSelector(selectInvoiceDetails);
	const [loading, setLoading] = React.useState(true);

	//console.log('modalda',  openPdfData);


    React.useEffect(() => {
		console.log('dassasdsds', openPdfData?.data?.dataRows)
		const xmlTmp = openPdfData?.data?.dataXml ? openPdfData?.data?.dataXml : "";
		xml2js.parseString(xmlTmp, (err, result) => {
			if (err) {
			  throw err;
			}
			const json = JSON.stringify(result, null, 4);
			const objectTmp = {
				AccountingCustomerParty: {
					name: result?.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:RegistrationName'][0],
					adress:  result?.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:StreetName'][0],
					city:  result?.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:CityName'][0],
					pib:  result?.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cbc:EndpointID'][0]['_'],
					mb:  result?.Invoice['cac:AccountingCustomerParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:CompanyID'][0]
				},
				AccountingSupplierParty: {
					name: result?.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:RegistrationName'][0],
					adress:  result?.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:StreetName'][0],
					city:  result?.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PostalAddress'][0]['cbc:CityName'][0],
					pib:  result?.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cbc:EndpointID'][0]['_'],
					mb:  result?.Invoice['cac:AccountingSupplierParty'][0]['cac:Party'][0]['cac:PartyLegalEntity'][0]['cbc:CompanyID'][0]
				},
				paymentMeans:  result?.Invoice['cac:PaymentMeans'][0]['cac:PayeeFinancialAccount'][0]['cbc:ID'][0],
				paymentMode:   result?.Invoice['cac:PaymentMeans'][0]['cbc:PaymentID'][0],
				dueDate:    result?.Invoice['cbc:DueDate'][0],
				delivery:    result?.Invoice['cac:Delivery'][0]['cbc:ActualDeliveryDate'][0],
				note:  result?.Invoice['cbc:Note'][0],
				numberDocument:    result?.Invoice['cbc:ID'][0]
			}
			console.log('dataobje', result )
			setDataInvoice(objectTmp);
			
			if(result) {
				setLoading(false);
			}
			
		  });
    }, [openPdfData]);

	if(loading) {
		return <div>Loading</div>
	}

	const handleClose = () =>   { console.log('asasas'); setLoading(true)  } ;

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
						

						<PDFViewer width={750} height={700} showToolbar={false}>
							<DocumentPdf  data={datainvoice}  listRow={openPdfData?.data?.dataRows} />
						</PDFViewer>

						
						<Grid sx={{display:  'flex', height:  '10%', mt: 2.5, justifyContent:  'center'}} >
										<Grid  item xs={6} sx={{mr: 2.5}}>
													<Button fullWidth variant="contained"     onClick={() => {handleClose();dispatch(setopenModalPdf({open: false, data: ""}))}}    sx={{mt: 2  ,fontSize: 14, backgroundColor:  'transparent',  border:  'solid 1px white',  height:  '56px',  borderRadius:  '8px',   display:  'flex',  justifyContent:  'center' }}>Odustani</Button>
										</Grid>
										<Divider />
										<Grid  item xs={6} >
										<PDFDownloadLink
												document={<DocumentPdf  />}
												fileName={'invoice.pdf'}
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