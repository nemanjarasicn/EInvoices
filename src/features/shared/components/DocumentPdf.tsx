import React from 'react';
//import { Document, Page, pdfjs } from "react-pdf/dist/esm/entry.webpack";

import { Page, Document, StyleSheet } from '@react-pdf/renderer';

import InvoiceTitle from '../components/pdf/InvoiceTitle';
import InvoiceNo from '../components/pdf/InvoiceNo';
import BillTo from './pdf/BillTo';
import InvoiceItemsTable from './pdf/InvoiceItemsTable';
import InvoiceNote from './pdf/InvoiceNote';
import Footer from './pdf/Footer';

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
    marginRight: 'auto',
  },
});

export const DocumentPdf = React.forwardRef<any, any>((props, ref) => {
  const [dataInvoiceTmp, setDataInvoiceTmp] = React.useState();

  React.useEffect(() => {
    setDataInvoiceTmp(props.data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Document>
        <Page size="A4" style={styles.page}>
          {/*<Image style={styles.logo} src="/logoMaster.png"/>*/}
          <InvoiceTitle />
          <InvoiceNo data={dataInvoiceTmp} />
          <BillTo data={dataInvoiceTmp} />
          <InvoiceItemsTable dataRow={props.listRow} data={dataInvoiceTmp} />
          <InvoiceNote data={dataInvoiceTmp} />
          <Footer data={dataInvoiceTmp} />
        </Page>
      </Document>
    </>
  );
});
