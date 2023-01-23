import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    titleContainer: {
        position: 'absolute',
        paddingTop: 40,
        bottom: 10,
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

const Footer = () => (
    <View style={styles.titleContainer} fixed>
        <Text style={styles.reportTitle}>MASTER SOFTWARE | office@mastersoftware.rs | Telefon 011/4405-405 | www.mastersoftware.rs</Text>
    </View>
);

export default Footer;