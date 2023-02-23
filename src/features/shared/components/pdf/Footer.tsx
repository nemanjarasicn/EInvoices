import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  titleContainer: {
    position: 'absolute',
    bottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  reportTitle: {
    color: 'gray',
    paddingLeft: 80,
    paddingRight: 80,
    fontSize: 8,
    textAlign: 'center',
    // textTransform: 'uppercase',
  },
  textTop: {
    color: 'gray',
    paddingLeft: 70,
    paddingRight: 50,
    fontSize: 8,
    textAlign: 'center',
    // textTransform: 'uppercase',
  },
});

const Footer = ({ data }: any) => {
  const today = dayjs(new Date()).format('DD-MM-YYYY HH:mm:ss');
  return (
    <View style={styles.titleContainer} fixed>
      <Text style={styles.textTop}>
        {data?.additionalDocumentReference?.name}
      </Text>
      <Text style={styles.textTop}>
        Generisao MASTER SOFTWARE pod brojem:{data?.numberDocument} | datum i
        vreme generisanja: {today}
      </Text>
      <Text style={styles.reportTitle}>
        MASTER SOFTWARE | office@mastersoftware.rs | Telefon 011/4405-405 |
        www.mastersoftware.rs
      </Text>
    </View>
  );
};

export default Footer;
