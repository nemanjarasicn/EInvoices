import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
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

const list: any[] = [
    {naziv:  'test'},
    {naziv: 'test'}
];

const InvoiceTableRow = () => {

    //const rows = items.map(item =>
      const rows = 
        list.map((item, index)=> 
        <View style={styles.row} key={index}>
            <Text style={styles.description}>FinePix Pro2 3D Camera</Text>
            <Text style={styles.qty}>2</Text>
            <Text style={styles.rate}>1600</Text>
            <Text style={styles.unit}>{item.naziv}</Text>
            <Text style={styles.discount}>0</Text>
            <Text style={styles.vat}>1440</Text>
            <Text style={styles.tax}>10</Text>
        </View>
        )
    //);
    return (<Fragment>{rows}</Fragment>)
};

export default InvoiceTableRow;