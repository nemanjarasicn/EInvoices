import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { useAppSelector } from '../../../../app/hooks';
import { selectInvoiceDetails } from '../../../invoices/store/invoice.selectors';

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    conteiner: {
        flexDirection: 'column',
        width:  '100%'
    },
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
        width: '12%',
        fontSize:  8,
        textAlign:  'right',
    },
    rate: {
        width: '15%',
        fontSize:  8,
        textAlign:  'right',
    },
    tax: {
        width: '7%',
        fontSize:  8,
        textAlign:  'right',
        paddingRight: 2
    },
    divider: {
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
    },
    discount: {
        fontSize:  8,
        textAlign:  'right',
    },

    discountConteiner: {    
        width: '10%',
        flexDirection:  'column'
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

const InvoiceTableRow = ({data} : any) => {
    //const rows = items.map(item =>
    console.log('sasasaasas',  data?.invoiceLine)

    const currencyFormat = (num: any) => {
        return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }

    const getUnitPrice = (priceAmount: number | string, percent:  number | string )  =>  {
        const divideTmp  =  Number(100)  + Number(percent);
        return (Number(priceAmount)  * 100 ) / divideTmp;
    }

    const getDiscount = (discount: number | string,   priceAmount: number | string )  =>  {
        return (Number(discount)  * 100 ) / Number(priceAmount);
    }

    const listRows = data?.invoiceLine ?   data?.invoiceLine  :  [];
      const rows = 
      listRows.map((item: any, index: any)=>        
        <View style={styles.row} key={index}>
            <Text style={styles.description}>{item?.productName}</Text>
            <Text style={styles.qty}>{item?.quantity}</Text>
            <Text style={styles.rate}>{currencyFormat(getUnitPrice(item?.oldPrice, item?.percent))}</Text>
            <Text style={styles.unit}>kom</Text>
            <View style={styles.discountConteiner}>
                <Text style={styles.discount}>{currencyFormat(getDiscount(item?.discount, item?.oldPrice ))}</Text>
                <Text style={styles.discount}>({currencyFormat(item?.discount)})</Text>
            </View>
            <Text style={styles.vat}>{currencyFormat((item?.newPrice -(item?.tax / item?.quantity)) * item?.quantity)}</Text>
            <Text style={styles.tax}>{(item?.percent).toFixed(2)}</Text>
        </View>       
        )
    //);
    return (
                <View style={styles.conteiner}>
                    {rows}
                    <View style={styles.divider}></View>
                </View>
            
            )
};

export default InvoiceTableRow;