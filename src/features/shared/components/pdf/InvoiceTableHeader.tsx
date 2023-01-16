import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'gray',
        color: '#fff',
        alignItems: 'center',
        height: 18,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    description: {
        width: '30%',
        flexDirection:  'row',
        justifyContent:  'flex-start',
        fontSize:  8,
        textAlign:  'left',

    },
    qty: {
        width: '10%',
        fontSize:  8,
        textAlign:  'right',
    },
    unit: {
        width: '15%',
        fontSize:  8,
        textAlign:  'right',
    },
    vat: {
        width: '10%',
        fontSize:  8,
        textAlign:  'right',
    },
    rate: {
        width: '15%',
        fontSize:  8,
        textAlign:  'right',
    },
    tax: {
        width: '10%',
        fontSize:  8,
        textAlign:  'right',
        paddingRight: 2
    },
    discount: {
        width: '10%',
        fontSize:  8,
        textAlign:  'right',
    },
    amount: {
        width: '5%',
        fontSize:  8,
        textAlign:  'right',
    },
});

const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Opis</Text>
        <Text style={styles.qty}>Kolicina</Text>
        <Text style={styles.rate}>Jedinicna cena</Text>
        <Text style={styles.unit}>jedinica mere</Text>
        <Text style={styles.discount}>Popust</Text>
        <Text style={styles.vat}>Iynos bey PDV</Text>
        <Text style={styles.tax}>PDV stopa</Text>

    </View>
);

export default InvoiceTableHeader;