import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 12,
  },
});

const TicketReport = ({ ticket }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Ticket Details Report</Text>
      <View style={styles.section}>
        <Text style={styles.text}>Ticket ID: {ticket._id}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Title: {ticket.title}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Email: {ticket.email}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.text}>Issue: {ticket.description}</Text>
      </View>
    </Page>
  </Document>
);

export default TicketReport;
