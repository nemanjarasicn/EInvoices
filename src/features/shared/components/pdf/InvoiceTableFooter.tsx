import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { green } from '@mui/material/colors';

const borderColor = '#3778C2'

Font.register({
    family: "Roboto",
    fonts: [
        { src:
            "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", color: 'black' },
        { src:
            "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontStyle: 'bold' },
      ]
  });


const styles = StyleSheet.create({
    conteiner: {
        flexDirection: 'row',
        justifyContent:  'flex-end',
        alignContent:  'flex-end',
        textAlign:  'right',
        marginTop: 10,
        width:  '100%',
    },
    description: {
        justifyContent:  'flex-end',
        width: '85%',
        textAlign: 'right',
        backgroundColor:  'red'
    },

    textConteiner: {
        flexDirection:  'row',
        justifyContent:  'flex-end',
    },


    text: {
        fontFamily: "Roboto",
        fontSize:  10,
        textAlign:  'right',
        borderBottom:  'solid 1px',
        color:  'black'
    },
    textBold: {
        fontFamily: "Roboto",
        fontSize:  10,
        textAlign:  'right',
        fontStyle: 'bold',
    },

    textPrice: {
        fontFamily: "Roboto",
        marginLeft: 40,
        fontSize:  10,
        fontStyle: 'bold',
        textAlign:  'right',
        borderBottom:  'solid 1px'
    },

    section1:  {
        flexDirection:  'column',
        width:  '20%'
    },


    section2:  {
        flexDirection:  'column',
        width:  '80%'
    },

    columnConteiner:  {
        flexDirection:  'column'
    },
    divider: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },

    dividerEnd:  {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 5
    }
});

const InvoiceTableFooter = ({data}: any) => {
    /*const total = items.map(item => item.qty * item.rate)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)*/
        

    const  total: string  = '1600';
    
    const currencyFormat = (num: any) => {
        return  num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
      }


    return (
        <View style={styles.conteiner}>
            <View style={styles.section1} >
             
              {/*<View >
                    <Text style={styles.text}>Zbir stavki sa stopom 20%:</Text>  
                    <View style={styles.divider}></View>
            </View>*/}
        </View>
        <View style={styles.section2} >

                <View   style={styles.columnConteiner}>
                    <View  style={styles.textConteiner}>
                        <Text style={styles.text}>Zbir stavki sa stopom 20%:</Text>
                        <Text style={styles.textPrice}>{currencyFormat(Number(data?.legalMonetaryTotal?.lineExtensionAmount))}</Text>
                    </View>
                    <View style={styles.divider}></View>
                    <View  style={styles.textConteiner}>
                        <Text style={styles.text}>Ukupno osnovica - stopa 20%:</Text> 
                        <Text style={styles.textPrice}>{currencyFormat(Number(data?.legalMonetaryTotal?.lineExtensionAmount))}</Text>
                    </View>
                    <View  style={styles.textConteiner}>
                        <Text style={styles.text}>Ukupno PDV - stopa 20%:</Text> 
                        <Text style={styles.textPrice}>{currencyFormat(Number(data?.taxTotal?.taxAmount))}</Text>
                    </View>
                    <View  style={styles.textConteiner}>
                        <Text style={styles.textBold}>Ukupan iznos:</Text>  
                        <Text style={styles.textPrice}>{currencyFormat(Number(data?.legalMonetaryTotal?.payableAmount))}</Text>
                    </View>
                    {data?.invoiceTypeCode !=='386' ?
                    <>
                    <View style={styles.divider}></View>
                    <View  style={styles.textConteiner}>
                        <Text style={styles.text}>Ukupno osnovica umanjena za avanse - stopa 20%:</Text>
                        <Text style={styles.textPrice}>{currencyFormat(Number(data?.legalMonetaryTotal?.lineExtensionAmount))}</Text>
                    </View>
                    <View  style={styles.textConteiner}>
                        <Text style={styles.text}>Ukupno PDV umanjen za avanse - stopa 20%: </Text>         
                        <Text style={styles.textPrice}>{currencyFormat(Number(data?.taxTotal?.taxAmount))}</Text>
                    </View>
                    <View  style={styles.textConteiner}>
                        <Text style={styles.textBold}>Ukupno za uplatu:</Text>
                        <Text style={styles.textPrice}>{currencyFormat(Number(data?.legalMonetaryTotal?.payableAmount))}</Text>
                    </View>
                    </>
                     :
                    ""
                    }
        
                    <View style={styles.dividerEnd}></View>
                </View>  
             {/*<View >
                    <Text style={styles.text}>Zbir stavki sa stopom 20%:</Text>  
                    <View style={styles.divider}></View>
              </View>  

              <View >
                    <Text style={styles.text}>Zbir stavki sa stopom 20%:</Text>  
                    <View style={styles.divider}></View>
            </View>*/}
        </View>
        </View>
    )
};

export default InvoiceTableFooter;