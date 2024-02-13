import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font, PDFViewer } from '@react-pdf/renderer';
import Api from '../api';
import { useState, useEffect } from 'react';


// Register font
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: 'table',
    padding: '10',
  },
  tableRow: { margin: 'auto', flexDirection: 'row' },
  tableColHeader: {
    width: '90px',
    borderStyle: 'solid',
    borderBottomColor: '#000',
    borderWidth: 1,
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
    fontSize: "11px",
    paddingVertical: '3',
  },
  tableCol: {
    width: '90px',
    borderStyle: 'solid',
    borderBottomColor: '#000',
    borderWidth: 1,
    fontSize: "11px",

  },
});

function MyDocument() {
  const [customer, setCustomer] = useState([]);

  const fetchDataCustomer = async () => {

    await Api.get('/api/rekap/customer')
      .then(response => {
        setCustomer(response.data.data);
      })

  }

  useEffect(() => {

    fetchDataCustomer();

  }, []);
  return (
    <PDFViewer style={{ width: '100%', height: '98vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.section}>
            <Text>Rekap Sales</Text>
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <View style={styles.tableColHeader}>
                  <Text>Sales</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text>Nama Customer</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text>Paket</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text>Harga</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text>Alamat</Text>
                </View>
                <View style={styles.tableColHeader}>
                  <Text>Nomor Telepon</Text>
                </View>
              </View>
              {
                customer.length > 0
                  ? customer.map((customer, index) => (
                    <View style={styles.tableRow} key={index}>
                      <View style={styles.tableCol}>
                        <Text>{customer.sales}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text>{customer.nama}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text>{customer.nama_paket}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text>{customer.harga_paket}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text>{customer.alamat}</Text>
                      </View>
                      <View style={styles.tableCol}>
                        <Text>{customer.nomor_telepon}</Text>
                      </View>

                    </View>
                  ))

                  : <View>

                  </View>
              }



            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}
export default MyDocument;
