import React from 'react';
import { View, Text, ScrollView, StyleSheet, SafeAreaView } from 'react-native';

const AboutUsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.title}>WHO WE ARE?</Text>
            <Text style={styles.paragraph}>
              To create innovative software solutions that improve the lives of our customers. We are committed to delivering high-quality products and excellent customer service, and to being a reliable partner for businesses and individuals. Our goal is to become a leading provider of software solutions in our target markets, and to create value for our customers, employees, and shareholders.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>What we are</Text>
            <Text style={styles.paragraph}>
              SAM Controls, strive to lead in the invention, development and maintenance of the security industry's most advanced, state-of-the-art information security technology solutions. SAM is technology based company providing systems integration & solutions, specializing in designing and developing of ANPR and other security application software and Digital Transformation. Our management team has over 17 years of extensive experience in the ANPR technologies industry. Based on the highest accuracy LPR Engine, we provide a full range of secure and sophisticated capabilities for ANPR applications, including speed control, electronic tolling, access control, parking system and red light enforcement. Our system components meet the highest industry standards.
            </Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.title}>Our Core Values</Text>
            <Text style={styles.paragraph}>
              We drives to be a distinct leader in Digital Transmission with a focus on security in the Canada / Middle East / Asian Region with quality products and services. Our experienced and energetic team is always ready to meet the challenges facing our customers. Whether it’s from the Government or Private sector, our team is ready to provide the latest and customizable solutions to meet constantly changing requirements. SAM is looking forward to working with anyone needing Digital and solutions with the support and knowledge of a well-experienced team. SAM Controls as brand FoxEye (Parking & Vehicle Access Control Solutions), we have various installation in Saudi Arabia including Riyadh & Jeddah Airports.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>SAM Controls 2024. All rights reserved</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 80, // Add padding to ensure content is scrollable above footer
  },
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  footer: {
    backgroundColor: '#00544d',
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  footerText: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    marginLeft: 0,
  },
});

export default AboutUsScreen;
