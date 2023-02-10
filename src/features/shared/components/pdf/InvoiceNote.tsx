import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({
    family: "Roboto",
    src:
      "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf"
  });

const styles = StyleSheet.create({
    noteContainer: {
        marginTop: 15,
    },
    note: {
        fontFamily: "Roboto",
        color: 'black',
        fontSize: 10,
        // textTransform: 'uppercase',
    },

    
    date: {
        fontFamily: "Roboto",
        color: 'gray',
        marginTop: 30,
        fontSize: 10,
        // textTransform: 'uppercase',
    }
});

const InvoiceNote = ({data}:any) => {
    const vatPointDate  = data?.descriptionCode !== '3' ? (data?.descriptionCode === '35'  ? 'Datum obračuna pdv-a je datum prometa'  :  'Datum obračuna pdv-a je na dan plaćanja') : 'Datum obračuna pdv-a je datum slanja';
    return (
    <View style={styles.noteContainer}>
        <Text style={styles.note}>Napomena:  {data?.note} </Text>
        <Text style={styles.date}>{vatPointDate}</Text>

    </View>
    )

};

export default InvoiceNote;