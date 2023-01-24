import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { borderBottom, style } from '@mui/system';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 15,
        justifyContent: 'flex-start',
    },
    billTo: {
        marginTop: 10,
        paddingBottom: 3,
        fontSize: 10
    },

    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginRight: 5
    },
    textSupplier:  {
        fontSize: 12,
        marginTop: 2
    }, 

    textStyle: {
        fontSize:  10
    },
    textStyleLeft: {
        fontSize:  10,
        marginLeft:  5
    },
    textConteiner: {
        flexDirection: 'row',
    }
});

const BillTo = ({data}:any) => (
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Prodavac</Text>
        <View style={styles.divider}></View>
        <Text style={styles.textSupplier}>{data?.AccountingSupplierParty?.name}</Text>
        <View  style={styles.textConteiner}> 
                <Text style={styles.textStyle}>Adresa:</Text>
                <Text style={styles.textStyleLeft}> {data?.AccountingSupplierParty?.city} {data?.AccountingSupplierParty?.adress} </Text>
        </View>
        <View  style={styles.textConteiner}> 
                <Text style={styles.textStyle}>Maticni broj:</Text>
                <Text style={styles.textStyleLeft}>  {data?.AccountingSupplierParty?.mb}</Text>
        </View>
        <View  style={styles.textConteiner}> 
                <Text style={styles.textStyle}>PIB:</Text>
                <Text style={styles.textStyleLeft}> {data?.AccountingSupplierParty?.pib}</Text>
        </View>

        
    </View>
);

export default BillTo;