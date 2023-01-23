import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    noteContainer: {
        marginTop: 15,
    },
    note: {
        color: 'black',
        fontSize: 10,
        // textTransform: 'uppercase',
    },

    
    date: {
        color: 'gray',
        marginTop: 30,
        fontSize: 10,
        // textTransform: 'uppercase',
    }
});

const InvoiceNote = () => (
    <View style={styles.noteContainer}>
        <Text style={styles.note}>Napomena:  poruka </Text>
        <Text style={styles.date}>Datum obračuna pdv-a je datum slanja </Text>

    </View>

);

export default InvoiceNote;