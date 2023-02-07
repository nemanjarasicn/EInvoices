import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableFooter from './InvoiceTableFooter';
import { AnyAaaaRecord } from 'dns';

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
    },
});

const InvoiceItemsTable = (props: any) => {
    //console.log('invoiceTableda', props.data) 
    return (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow  data={props.dataRow} />
        <InvoiceTableFooter  data={props.data}  dataRow={props.dataRow}  />
    </View>
)};

export default InvoiceItemsTable;