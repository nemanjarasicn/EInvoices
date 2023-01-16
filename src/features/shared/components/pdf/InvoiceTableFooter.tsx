import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { green } from '@mui/material/colors';

const borderColor = '#3778C2'
const styles = StyleSheet.create({
    conteiner: {
        flexDirection: 'row',
        justifyContent:  'flex-end',
        alignContent:  'flex-end',
        textAlign:  'right',
        width:  '100%'
    },
    description: {
        justifyContent:  'flex-end',
        width: '85%',
        textAlign: 'right',
        backgroundColor:  'red'
    },
    text: {
        fontSize:  10,
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

const InvoiceTableFooter = () => {
    /*const total = items.map(item => item.qty * item.rate)
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)*/

    const  total: string  = '1600';
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
                    <Text style={styles.text}>Zbir stavki sa stopom 20%:</Text>  
                    <View style={styles.divider}></View>
                    <Text style={styles.text}>Ukupno osnovica - stopa 20%:</Text> 
                    <Text style={styles.text}>Ukupno PDV - stopa 20%:</Text> 
                    <Text style={styles.text}>Ukupan iznos:</Text>  
                    <View style={styles.divider}></View>
                    <Text style={styles.text}>Ukupno osnovica umanjena za avanse - stopa 20%:</Text>
                    <Text style={styles.text}>Ukupno PDV umanjen za avanse - stopa 20%: </Text> 
                    <Text style={styles.text}>Ukupno za uplatu:</Text>
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