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
import  { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faFileArrowDown }   from '@fortawesome/pro-solid-svg-icons';
import  { downloadPDF   }  from  "../../invoices/pages/InvoiceTemplatePage"


import Box from '@mui/material/Box'

//import XMLParser from 'react-xml-parser';
import xml2js from "xml2js";


const xmlTmp1 = `<Invoice
xmlns:cec="urn:oasis:names:specification:ubl:schema:xsd:CommonExtensionComponents-2"
xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2"
xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xmlns:xsd="http://www.w3.org/2001/XMLSchema"
xmlns:sbt="http://mfin.gov.rs/srbdt/srbdtext"
xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
<cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:mfin.gov.rs:srbdt:2021</cbc:CustomizationID>
<cbc:ID>06/2023</cbc:ID>
<cbc:IssueDate>2023-01-26</cbc:IssueDate>
<cbc:DueDate>2023-01-26</cbc:DueDate>
<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
<cbc:DocumentCurrencyCode>RSD</cbc:DocumentCurrencyCode>
<cac:InvoicePeriod>
	<cbc:DescriptionCode>35</cbc:DescriptionCode>
</cac:InvoicePeriod>
<cac:AccountingSupplierParty>
	<cac:Party>
		<cbc:EndpointID schemeID="9948">104977577</cbc:EndpointID>
		<cac:PartyName>
			<cbc:Name>PREDUZEĆE ZA TRGOVINU I USLUGE FRIGO BEST DOO BEOGRAD </cbc:Name>
		</cac:PartyName>
		<cac:PostalAddress>
			<cbc:StreetName>Tome Rosandića 34</cbc:StreetName>
			<cbc:CityName>Beograd (grad)</cbc:CityName>
			<cac:Country>
				<cbc:IdentificationCode>RS</cbc:IdentificationCode>
			</cac:Country>
		</cac:PostalAddress>
		<cac:PartyTaxScheme>
			<cbc:CompanyID>RS104977577</cbc:CompanyID>
			<cac:TaxScheme>
				<cbc:ID>VAT</cbc:ID>
			</cac:TaxScheme>
		</cac:PartyTaxScheme>
		<cac:PartyLegalEntity>
			<cbc:RegistrationName>PREDUZEĆE ZA TRGOVINU I USLUGE FRIGO BEST DOO BEOGRAD </cbc:RegistrationName>
			<cbc:CompanyID>20284951</cbc:CompanyID>
		</cac:PartyLegalEntity>
		<cac:Contact>
			<cbc:ElectronicMail>frigobest@mts.rs</cbc:ElectronicMail>
		</cac:Contact>
	</cac:Party>
</cac:AccountingSupplierParty>
<cac:AccountingCustomerParty>
	<cac:Party>
		<cbc:EndpointID schemeID="9948">105917685</cbc:EndpointID>
		<cac:PartyName>
			<cbc:Name>5.COM DOO BEOGRAD (VOŽDOVAC)</cbc:Name>
		</cac:PartyName>
		<cac:PostalAddress>
			<cbc:StreetName>RADOMIRA MARKOVIĆA 1</cbc:StreetName>
			<cbc:CityName>Beograd (Voždovac)       </cbc:CityName>
			<cac:Country>
				<cbc:IdentificationCode>RS</cbc:IdentificationCode>
			</cac:Country>
		</cac:PostalAddress>
		<cac:PartyTaxScheme>
			<cbc:CompanyID>RS105917685</cbc:CompanyID>
			<cac:TaxScheme>
				<cbc:ID>VAT</cbc:ID>
			</cac:TaxScheme>
		</cac:PartyTaxScheme>
		<cac:PartyLegalEntity>
			<cbc:RegistrationName>5.COM DOO BEOGRAD (VOŽDOVAC)</cbc:RegistrationName>
			<cbc:CompanyID>20489197</cbc:CompanyID>
		</cac:PartyLegalEntity>
		<cac:Contact>
			<cbc:ElectronicMail>office@petcom.rs</cbc:ElectronicMail>
		</cac:Contact>
	</cac:Party>
</cac:AccountingCustomerParty>
<cac:Delivery>
	<cbc:ActualDeliveryDate>2023-01-25</cbc:ActualDeliveryDate>
</cac:Delivery>
<cac:PaymentMeans>
	<cbc:PaymentMeansCode>30</cbc:PaymentMeansCode>
	<cac:PayeeFinancialAccount>
		<cbc:ID>170003004342900063</cbc:ID>
	</cac:PayeeFinancialAccount>
</cac:PaymentMeans>
<cac:TaxTotal>
	<cbc:TaxAmount currencyID="RSD">2000</cbc:TaxAmount>
	<cac:TaxSubtotal>
		<cbc:TaxableAmount currencyID="RSD">10000</cbc:TaxableAmount>
		<cbc:TaxAmount currencyID="RSD">2000.0</cbc:TaxAmount>
		<cac:TaxCategory>
			<cbc:ID>S</cbc:ID>
			<cbc:Percent>20</cbc:Percent>
			<cac:TaxScheme>
				<cbc:ID>VAT</cbc:ID>
			</cac:TaxScheme>
		</cac:TaxCategory>
	</cac:TaxSubtotal>
</cac:TaxTotal>
<cac:LegalMonetaryTotal>
	<cbc:LineExtensionAmount currencyID="RSD">10000</cbc:LineExtensionAmount>
	<cbc:TaxExclusiveAmount currencyID="RSD">10000</cbc:TaxExclusiveAmount>
	<cbc:TaxInclusiveAmount currencyID="RSD">12000</cbc:TaxInclusiveAmount>
	<cbc:AllowanceTotalAmount currencyID="RSD">0</cbc:AllowanceTotalAmount>
	<cbc:PrepaidAmount currencyID="RSD">0</cbc:PrepaidAmount>
	<cbc:PayableAmount currencyID="RSD">12000</cbc:PayableAmount>
</cac:LegalMonetaryTotal>
<cac:InvoiceLine>
	<cbc:ID>1</cbc:ID>
	<cbc:InvoicedQuantity unitCode="H87">1</cbc:InvoicedQuantity>
	<cbc:LineExtensionAmount currencyID="RSD">10000</cbc:LineExtensionAmount>
	<cac:Item>
		<cbc:Name>Popravka frižidera za piće</cbc:Name>
		<cac:SellersItemIdentification>
			<cbc:ID>1</cbc:ID>
		</cac:SellersItemIdentification>
		<cac:ClassifiedTaxCategory>
			<cbc:ID>S</cbc:ID>
			<cbc:Percent>20</cbc:Percent>
			<cac:TaxScheme>
				<cbc:ID>VAT</cbc:ID>
			</cac:TaxScheme>
		</cac:ClassifiedTaxCategory>
	</cac:Item>
	<cac:Price>
		<cbc:PriceAmount currencyID="RSD">10000</cbc:PriceAmount>
	</cac:Price>
</cac:InvoiceLine>
</Invoice>`


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: () => window.devicePixelRatio == 1.5 ? 600 : 828 , 
    height: () => window.devicePixelRatio == 1.5 ? 550 : 800 ,
 

    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    borderRadius: 2,
    p: 1,
    backgroundColor:  'white',
    display:  'flex'
  };
  const defaultValueInvoicePdf = {
	AccountingCustomerParty: {},
    AccountingSupplierParty: {},
    delivery: "",
    note: "",
    legalMonetaryTotal: {},
    taxTotal: {},
    additionalDocumentReference: [{
        name: "",
		atachment:  ""
    }]
  }

  export default function  ModalPdf (props: any)  {   

    const dispatch = useAppDispatch();
	const [invoiceObject, setInvoiceObject]  =  React.useState({});
	const [datainvoice,   setDataInvoice]  =  React.useState(defaultValueInvoicePdf);
	const openPdfData = useAppSelector(selectOpenPdf);
	const [showModel, setShowModel] = React.useState(false);
	const listRow = useAppSelector(selectInvoiceDetails);
	const [loading, setLoading] = React.useState(true);
	const [idXml, setIdXml]  =   React.useState("");
	const [typeInvoicesZip, settypeInvoicesZip]  = React.useState(0);
	const  fontSizeButton   =    window.devicePixelRatio === 1.5 ?  '10px' :     '14px';
	const heightButton  =   window.devicePixelRatio === 1.5 ?  '40px' :     '50px';

	const componentRef = useRef(null);

	const printPluginInstance = printPlugin();
	const { print } = printPluginInstance;
	const widthPdf =  window.devicePixelRatio == 1.5 ? 580 : 810

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
			console.log('sassasasas',result);
			const additionalDocumentReferenceTmp =  result?.[`${prefixPdf}`]['cac:AdditionalDocumentReference'] ?
						result?.[`${prefixPdf}`]['cac:AdditionalDocumentReference'].map((item: any, index: number) => (
							{
							name:  result?.[`${prefixPdf}`]['cac:AdditionalDocumentReference'] ?  result?.[`${prefixPdf}`]['cac:AdditionalDocumentReference'][index]['cbc:ID'][0]  :  "",
							atachment: result?.[`${prefixPdf}`]['cac:AdditionalDocumentReference'] ?   result?.[`${prefixPdf}`]['cac:AdditionalDocumentReference'][index]['cac:Attachment'][0]['cbc:EmbeddedDocumentBinaryObject'][0]['_']  :  "",
							}
						)) 
						:
						[{
							name: "",
							atachment: ""
						}]

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
				},
				additionalDocumentReference: 
					additionalDocumentReferenceTmp
			

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

	const downloadAttachment = (file: any, fileName: string)  => {
		downloadPDF(file, fileName)
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

							<PDFViewer width={widthPdf} height={700} showToolbar={true}  className="test" >
								<DocumentPdf  data={datainvoice}  listRow={openPdfData?.data?.dataRows}   />
							</PDFViewer>
							
							{datainvoice?.additionalDocumentReference.map((item, index) => (
								datainvoice?.additionalDocumentReference[index]?.name ?
									<Button fullWidth variant="contained"    sx={{mt: 2  ,fontSize: '10px', height:  '30px',    borderRadius:  '10px',    display:  'flex',  width: '20%',  justifyContent:  'center' }}   onClick={()  => downloadAttachment(datainvoice?.additionalDocumentReference[index]?.atachment, datainvoice?.additionalDocumentReference[index]?.name)}>
											<div>
												<FontAwesomeIcon icon={faFileArrowDown}   color="#E9950C"   />
											</div>
											<div style={{paddingLeft: '5px'}}>
												{datainvoice?.additionalDocumentReference[index]?.name}
											</div>	
									</Button>
									:
									""
							
							
							))}
	
							
							<Grid sx={{display:  'flex', height:  '10%', mt: 2.5, justifyContent:  'center'}}  >
									<Grid  item xs={6} sx={{display:  'flex', justifyContent:  'flex-start'}}>
												<Button fullWidth variant="contained"     onClick={() => {handleClose();dispatch(setopenModalPdf({open: false, data: ""}))}}    sx={{mt: 2  , width: '60%', fontSize: fontSizeButton, backgroundColor:  'white',  color: 'black',  border:  'solid 1px white',  height: heightButton,  borderRadius:  '10px',   display:  'flex',  justifyContent:  'center' }}>Otkaži</Button>
									</Grid>
									<Divider />
									<Grid  item xs={6} sx={{display:  'flex', justifyContent:  'flex-end'}} >
										<PDFDownloadLink
												document={<DocumentPdf   data={datainvoice}  listRow={openPdfData?.data?.dataRows} />}
												fileName={`${idXml}.pdf`}
												style={{textDecoration: 'none', width: '60%'}} 
												>
													<Button fullWidth variant="contained"    sx={{mt: 2  ,fontSize: fontSizeButton, height:  heightButton,  backgroundColor:  '#ef3e56',  borderRadius:  '10px',   display:  'flex',  justifyContent:  'center' }}>Preuzmi</Button>
										</PDFDownloadLink>
									</Grid>      
									</Grid>

									<Grid sx={{display:  'flex', height:  '10%', mt: 1, justifyContent:  'center'}} >
											<Grid  item xs={6} sx={{display:  'flex', justifyContent:  'flex-start'}}>
												<Button fullWidth variant="contained"     onClick={()  =>  handlePrint()}   sx={{mt: 2  ,fontSize: fontSizeButton,  width:  '60%',  backgroundColor:  '#E9950C',  border:  'solid 1px white',  height: heightButton,  borderRadius:  '10px',   display:  'flex',  justifyContent:  'center' }}>Stampa</Button>
											</Grid>
											<Divider />
											<Grid  item xs={6}   sx={{display:  'flex', justifyContent:  'flex-end'}} >
												<Button fullWidth variant="contained"   onClick = {() =>  {getZipData('XML', typeInvoicesZip, idXml,)}}    sx={{mt: 2  ,fontSize: fontSizeButton, height:    heightButton,  width:  '60%',  backgroundColor:  'blue',  borderRadius:  '10px',   display:  'flex',  justifyContent:  'center' }}>PreuzmiXml</Button>
											</Grid>      
									</Grid>
							</Grid>
					</Box>
				</Modal>

		);

  }