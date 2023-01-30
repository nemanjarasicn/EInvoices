import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        marginTop: 10,
    },
    reportTitle: {
        color: 'gray',
        paddingLeft: 90,
        paddingRight:  90,
        fontSize: 8,
        textAlign: 'center',
        // textTransform: 'uppercase',
    }
});

const InvoiceTitle = () => (
    <View style={styles.titleContainer}>
        {/*<Text style={styles.reportTitle}>Generisao sistem eFaktura pod brojem:2023/2 | Identifikator:cef32575-5037-4a70-9e72-4f3db20deb03
                | datum i vreme generisanja: 13.01.2023 13:30:51</Text>*/}
    </View>
);

export default InvoiceTitle;