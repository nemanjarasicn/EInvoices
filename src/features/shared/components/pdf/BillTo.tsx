import React from 'react';
import { Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { borderBottom, style } from '@mui/system';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
    },
    {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf',
      fontStyle: 'bold',
    },
  ],
});

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: 15,
    justifyContent: 'flex-start',
  },
  billTo: {
    marginTop: 10,
    paddingBottom: 3,
    fontSize: 10,
  },

  divider: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginRight: 5,
  },
  textSupplier: {
    fontFamily: 'Roboto',
    fontSize: 12,
    marginTop: 2,
    fontStyle: 'bold',
  },

  textStyle: {
    fontFamily: 'Roboto',
    fontSize: 10,
    fontStyle: 'bold',
  },
  textStyleLeft: {
    fontFamily: 'Roboto',
    fontSize: 10,
    marginLeft: 5,
    color: 'gray',
  },
  textConteiner: {
    flexDirection: 'row',
  },
  textRacun: {
    fontSize: 10,
    marginLeft: 250,
  },
});

const BillTo = ({ data }: any) => (
  <View style={styles.headerContainer}>
    <Text style={styles.billTo}>Prodavac</Text>
    <View style={styles.divider}></View>
    <Text style={styles.textSupplier}>
      {data?.AccountingSupplierParty?.name}
    </Text>
    <View style={styles.textConteiner}>
      <Text style={styles.textStyle}>Adresa:</Text>
      <Text style={styles.textStyleLeft}>
        {' '}
        {data?.AccountingSupplierParty?.city}{' '}
        {data?.AccountingSupplierParty?.adress}{' '}
      </Text>
      <Text style={styles.textRacun}>| {data?.paymentMeans}</Text>
    </View>
    <View style={styles.textConteiner}>
      <Text style={styles.textStyle}>Maticni broj:</Text>
      <Text style={styles.textStyleLeft}>
        {' '}
        {data?.AccountingSupplierParty?.mb}
      </Text>
    </View>
    <View style={styles.textConteiner}>
      <Text style={styles.textStyle}>PIB:</Text>
      <Text style={styles.textStyleLeft}>
        {' '}
        {data?.AccountingSupplierParty?.pib}
      </Text>
    </View>
  </View>
);

export default BillTo;
