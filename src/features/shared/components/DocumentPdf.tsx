import { AnyAction } from "@reduxjs/toolkit";
import { AnyAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { AnyCnameRecord } from "dns";
import React, { useState } from "react";
//import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";

import { Page, Document, StyleSheet, Image } from "@react-pdf/renderer";

import InvoiceTitle from "../components/pdf/InvoiceTitle";
import  InvoiceNo  from  "../components/pdf/InvoiceNo"
import BillTo from "./pdf/BillTo";
import InvoiceItemsTable from "./pdf/InvoiceItemsTable";
import InvoiceNote from "./pdf/InvoiceNote";
import Footer from "./pdf/Footer";

const styles = StyleSheet.create({
  page: {
      backgroundColor: '#fff',
      fontFamily: 'Helvetica',
      fontSize: 11,
      paddingTop: 30,
      paddingLeft: 20,
      paddingRight: 20,
      lineHeight: 1.5,
      flexDirection: 'column',
  },
  logo: {
      width: 200,
      height: 70,
      marginLeft: 'auto',
      marginRight: 'auto'
  }
});

export  const DocumentPdf = React.forwardRef<any, any>((props, ref) => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  const [dataInvoiceTmp, setDataInvoiceTmp]  =  React.useState();
  const [listRow, setListRow]  =  React.useState();
  function onDocumentLoadSuccess({ numPages = 1 }) {
    setNumPages(1);
    setPageNumber(1);
  }

  function changePage(offset: number) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  React.useEffect(() => {
    setListRow(props.listRow)
    setDataInvoiceTmp(props.data)
  }, []);

  const {pdf}  =  props ;
  //pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/legacy/build/pdf.worker.min.js`;
  //console.log('dataasas', props.data )
  return (
    <>
      <Document>
        <Page size="A4" style={styles.page} >
            {/*<Image style={styles.logo} src="/logoMaster.png"/>*/}
            <InvoiceTitle     />
            <InvoiceNo  data={dataInvoiceTmp} />
            <BillTo   data={dataInvoiceTmp} />
            <InvoiceItemsTable  dataRow={props.listRow } data={dataInvoiceTmp} />
            <InvoiceNote  data={dataInvoiceTmp} />
            <Footer    data={dataInvoiceTmp} />
        </Page>
        
      </Document>
    </>
  );
})
