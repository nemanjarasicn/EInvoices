import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const borderColor = '#3778C2'

Font.register({
    family: "Roboto",
    fonts: [
        { src:
            "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf" },
        { src:
            "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontStyle: 'bold' },
      ]
  });

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
        fontFamily: "Roboto",
        width: '30%',
        flexDirection:  'row',
        justifyContent:  'flex-start',
        fontSize:  8,
        textAlign:  'left',

    },
    qty: {
        fontFamily: "Roboto",
        width: '10%',
        fontSize:  8,
        textAlign:  'right',
    },
    unit: {
        fontFamily: "Roboto",
        width: '15%',
        fontSize:  8,
        textAlign:  'right',
    },
    vat: {
        fontFamily: "Roboto",
        width: '12%',
        fontSize:  8,
        textAlign:  'right',
    },
    rate: {
        fontFamily: "Roboto",
        width: '15%',
        fontSize:  8,
        textAlign:  'right',
    },
    tax: {
        fontFamily: "Roboto",
        width: '7%',
        fontSize:  8,
        textAlign:  'right',
        paddingRight: 2
    },
    discount: {
        fontFamily: "Roboto",
        width: '10%',
        fontSize:  8,
        textAlign:  'right',
    },
    amount: {
        fontFamily: "Roboto",
        width: '5%',
        fontSize:  8,
        textAlign:  'right',
    },
});

const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.description}>Opis</Text>
        <Text style={styles.qty}>Količina</Text>
        <Text style={styles.rate}>Jedinična cena</Text>
        <Text style={styles.unit}>jedinica mere</Text>
        <Text style={styles.discount}>Popust</Text>
        <Text style={styles.vat}>Iznos bez PDV</Text>
        <Text style={styles.tax}>PDV stopa</Text>

    </View>
);

export default InvoiceTableHeader;