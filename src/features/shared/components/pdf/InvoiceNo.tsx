import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 50,
        marginLeft: 20
    },
    invoiceNoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor:  'gray',
        color:  'white',

      
    },
    section1: {
        width:  '50%',
        flexDirection: 'column',
       
    },

    section2: {
        width:  '50%',
        flexDirection: 'column',
       
    },

    dateConteiner: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        color:  'black',


    },


    clientContainer: {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        color:  'black',


    },


    invoiceDataConteiner:  {
        marginTop: 10,
        flexDirection: 'column',
        justifyContent:  'center',
        color:  'black', 
        alignContent:  'center' 
    },

    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },

    textConteiner: {
        flexDirection: 'row',
        
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    name: {
        fontSize: 10,
        fontStyle: 'bold',
        fontWeight: 700
    },
    adress: {
        fontSize: 10,
       
    },
    city: {
        fontSize: 10,
       
    },


    invoiceLabelNo:  {
        flexDirection: 'row',
        justifyContent: 'center'
    },

    labelNo: {
        fontSize: 8,
        color:   'white',
       

    },


    dataTextRightBold: {
        width:  '50%',
        flexDirection: 'row',
        fontSize: 12,
        color:   'black',
        justifyContent:   'flex-start',
        marginLeft: 14,
        fontWeight:  700
       

    },


    dataTextLeft: {
        flexDirection: 'row',
        justifyContent:   'flex-end',
        textAlign: 'right',
        width:  '50%',  
        fontSize: 10,
        color:   'black',

       

    },

    dataTextRight: {
        width:  '50%',
        flexDirection: 'row',
        fontSize: 10,
        color:   'black',
        justifyContent:   'flex-start',
        marginLeft: 14
       

    },


    dataText: {
        fontSize: 10,
        color:   'black',
       

    },
    invoiceNo: {
        fontSize: 12,
        color:   'black',
        fontStyle: 'bold',
    }, 
    labelClient: {
        fontSize: 8,
        color:   'gray'
    }
});

const InvoiceNo = () => (
    <Fragment>
        <View style={styles.container}>
            <View  style={styles.section1} >
                <View  style={styles.dateConteiner}>
                    <Text style={styles.labelClient}>Datum izdavanja</Text>
                    <Text style={styles.labelClient}>14.01.2023</Text>
                </View>
                <View  style={styles.clientContainer}>
                    <View  style={styles.textConteiner}><Text  style={styles.name}>5.COM</Text></View>
                    <View  style={styles.textConteiner}><Text  style={styles.adress}>MARIČKA 22</Text></View>
                    <View style={styles.textConteiner}><Text style={styles.city}>Beograd (Rakovica) Srbija</Text></View>
                </View>
            </View>
            <View style={styles.section2}>
                <View  style={styles.invoiceNoContainer}>
                    <Text style={styles.labelNo}>Broj fakture</Text>
                </View>
                <View  style={styles.invoiceLabelNo}><Text  style={styles.invoiceNo}>2023/2</Text></View>
                <View  style={styles.invoiceDataConteiner}>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Uplatu izvrsiti sa uplatom na broj</Text>
                            <Text style={styles.dataTextRight}>(97) 11</Text>
                    </View>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Datum prometa</Text>
                            <Text style={styles.dataTextRight}>14.01.2023</Text>
                    </View>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Datum dospeca</Text>
                            <Text style={styles.dataTextRight}>14.01.2023</Text>
                    </View>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Maticni broj kupca</Text>
                            <Text style={styles.dataTextRight}>1212122</Text>
                    </View>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>PIB kupca</Text>
                            <Text style={styles.dataTextRight}>121221121112</Text>
                    </View>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Valuta fakture</Text>
                            <Text style={styles.dataTextRightBold}>RSD</Text>
                    </View>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Ukupno za placanje</Text>
                            <Text style={styles.dataTextRightBold}>120</Text>
                    </View>
            
            
                </View>

            </View>
        </View >
    </Fragment>
);

export default InvoiceNo;