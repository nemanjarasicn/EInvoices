import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import dayjs from "dayjs";


Font.register({
    family: "Roboto",
    fonts: [
        { src:
            "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf" },
        { src:
            "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontStyle: 'bold' },
      ]
  });

  Font.registerHyphenationCallback(word => [word]);

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
        overfloWrap: 'break-word',
        wordBreak: 'break-all',

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
        whiteSpace: "wrap",
        overflowWrap: "break-word",
        wordBreak: "normal",
        textOverflow: 'ellipsis'
        
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    name: {
        fontFamily: "Roboto",
        fontSize: 10,
        fontStyle: 'bold',
    },
    adress: {
        fontFamily: "Roboto",
        fontSize: 10,
        fontStyle: 'bold',
       
    },
    city: {
        fontFamily: "Roboto",
        fontSize: 10,
        fontStyle: 'bold',
       
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
        fontFamily: "Roboto",
        flexDirection: 'row',
        justifyContent:   'flex-end',
        textAlign: 'right',
        width:  '50%',  
        fontSize: 10,
        color:   'gray',

       

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

const currencyFormat = (num: any) => {
    return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

const InvoiceNo = ({ data } : any ) => (

    <Fragment>
        <View style={styles.container}>
            <View  style={styles.section1} >
                <View  style={styles.dateConteiner}>
                    <Text style={styles.labelClient}>Datum izdavanja</Text>
                    <Text style={styles.labelClient}> {dayjs(data?.issueDate).format("DD.MM.YYYY")}</Text>
                </View>
                <View  style={styles.clientContainer}>
                    <View  style={styles.textConteiner}><Text  style={styles.name}>{data?.AccountingCustomerParty?.name}</Text></View>
                    <View  style={styles.textConteiner}><Text  style={styles.adress}>{data?.AccountingCustomerParty?.adress}</Text></View>
                    <View style={styles.textConteiner}><Text style={styles.city}>{data?.AccountingCustomerParty?.city}</Text></View>
                </View>
            </View>
            <View style={styles.section2}>
                <View  style={styles.invoiceNoContainer}>
                    <Text style={styles.labelNo}>Broj fakture</Text>
                </View>
                <View  style={styles.invoiceLabelNo}><Text  style={styles.invoiceNo}>{data?.numberDocument}</Text></View>
                <View  style={styles.invoiceDataConteiner}>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Uplatu izvrsiti sa uplatom na broj</Text>
                            <Text style={styles.dataTextRight}>{data?.paymentMode}</Text>
                    </View>
                    {data?.invoiceTypeCode !=='381' ?
                    <View  style={styles.textConteiner}> 
                            {data?.invoiceTypeCode !=='386' ?
                                <Text style={styles.dataTextLeft}>Datum prometa</Text>
                                : 
                                <Text style={styles.dataTextLeft}>Datum avansne uplate</Text>
                            }
                            <Text style={styles.dataTextRight}>{(data?.invoiceTypeCode !=='386' && data?.invoiceTypeCode !== '383' ) ? dayjs(data?.delivery).format("DD.MM.YYYY") : dayjs(data?.dueDate).format("DD.MM.YYYY") }</Text>
                    </View>
                    : 
                    ""
                    }
            
                    {(data?.invoiceTypeCode !=='386' &&  data?.invoiceTypeCode !=='383' &&  data?.invoiceTypeCode !== '381') ? 
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Datum dospeca</Text>
                            <Text style={styles.dataTextRight}>{dayjs(data?.dueDate).format("DD.MM.YYYY")}</Text>
                    </View>
                    :
                    ""
                    }

                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Maticni broj kupca</Text>
                            <Text style={styles.dataTextRight}>{data?.AccountingCustomerParty?.mb}</Text>
                    </View>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>PIB kupca</Text>
                            <Text style={styles.dataTextRight}>{data?.AccountingCustomerParty?.pib}</Text>
                    </View>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Valuta fakture</Text>
                            <Text style={styles.dataTextRightBold}>RSD</Text>
                    </View>
                    <View  style={styles.textConteiner}> 
                            <Text style={styles.dataTextLeft}>Ukupno za placanje</Text>
                            <Text style={styles.dataTextRightBold}>{currencyFormat(Number(data?.legalMonetaryTotal?.payableAmount))}</Text>
                    </View>
            
            
                </View>

            </View>
        </View >
    </Fragment>
);

export default InvoiceNo;