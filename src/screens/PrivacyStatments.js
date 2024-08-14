import React from 'react'
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, StyleSheet, Modal, Animated } from 'react-native';

const PrivacyStatments = () => {
  return (
    <View style={styles.modalOverlay}>


      {/* Top Header */}
      

      {/* Scrollable Content */}
      <View style={styles.modalContent_rt_f2}>
        <ScrollView contentContainerStyle={styles.scrollViewContentf2}>
          <Text style={styles.textStyleSubtitle} >Privacy Statement for On-Premises Digital Faciliter Software</Text>
          <View>
          <Text style={styles.textStyle_H1} >Last Updated: 19-02-2024</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >SAM Controls, a software development company based in Regina, SK, Canada (\"we,"
            "our,"
            "or"
            "us"
            "is dedicated to safeguarding the privacy and security of your personal information"
            "in relation to our on-premises digital dashboard software. This Privacy Statement outlines how we collect, use, disclose, and protect your personal information within the context of our software
            </Text>
            </View>
            <View style={styles.textStyle_second}>
            <Text style={styles.textStyle_H1} >1. Information Collection</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >Our on-premises digital dashboard software does not collect or transmit personal information to our servers or any third-party entities. All data and information processed by the software remains under your control and within your organization's premises.
            </Text>
            </View>
            <View style={styles.textStyle_second}>
            <Text style={styles.textStyle_H1} >2. Data Processing</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >The data and information processed by our on-premises digital dashboard software are solely under your organization's control. We do not access, process, or use this data for any purpose other than providing the intended functionalities of the software.
            </Text>
            </View>
            <View style={styles.textStyle_second}>
            <Text style={styles.textStyle_H1} >3. Security Measures</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >We have implemented robust security measures to protect the data processed by our software within your organization's premises. These measures include encryption, access controls, and other industry-standard security practices to prevent unauthorized access, disclosure, or misuse.
            </Text>
            </View>
            <View style={styles.textStyle_second}>
            <Text style={styles.textStyle_H1} >4. User Responsibilities</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >We have implemented robust security measures to protect the data processed by our software within your organization's premises. These measures include encryption, access controls, and other industry-standard security practices to prevent unauthorized access, disclosure, or misuse.
            </Text>
            </View>
            <View style={styles.textStyle_second}>
            <Text style={styles.textStyle_H1} >5. Cookies and Tracking Technologies</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >As the user of our on-premises digital dashboard software, you are responsible for ensuring the security and compliance of the data and information processed by the software within your organization. This includes implementing appropriate access controls and security measures.
            </Text>
            </View>
            <View style={styles.textStyle_second}>
            <Text style={styles.textStyle_H1} >6. Support and Technical Assistance</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >In the event that you require technical support or assistance, our support team may request access to the software and the data processed within it. Such access will only be granted with your explicit consent and will be limited to providing technical assistance.
            </Text>
            </View>
            <View style={styles.textStyle_second}>
            <Text style={styles.textStyle_H1} >7. Updates to the Privacy Statement</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >We may update this Privacy Statement from time to time to reflect changes in our practices or legal requirements. We will notify you about significant changes by providing a notice through appropriate communication channels.
            </Text>
            </View>
            <View style={styles.textStyle_second}>
            <Text style={styles.textStyle_H1} >8. Contact Information</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >For any questions, concerns, or inquiries regarding the privacy and security of our on-premises digital dashboard software, please contact us at:
            </Text>
            </View>
            <View style={styles.textStyle_second}>
            <Text style={styles.textStyle_H1} >SAM Controls</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >Email: info@samcontrols.com</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >Phone: +1 306 700 4950</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >Address: 2010 11th Avenue Royal Bank Building, 7th Floor, Regina SK S4P 0J3, Canada</Text>
          <Text style={styles.textStyleSubtitle_TEXT} >Email: info@samcontrols.com</Text>
          <Text style={styles.textStyleSubtitle_TEXT_f2} >By using our on-premises digital dashboard software, you acknowledge and agree to the practices outlined in this Privacy Statement.</Text>
            </View>

        </ScrollView>
      </View>

      {/* Bottom Footer */}
      <View style={styles.serverURLContainer_bottom_f2}>
        <Text style={styles.serverURL_bottom_f2}>SAM Controls 2023. All rights reserved</Text>

      </View>
    
  </View>
  )
}
const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center', // Center the modal vertically
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentf2: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
  },
  serverURLContainerf2: {
    backgroundColor: '#00544d',
    paddingVertical: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  serverURLContainer_bottom_f2:{
    backgroundColor: '#00544d',
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },
  serverURLf2: {
    color: 'white',
    // textAlign: 'center',
    fontWeight: "700",
    fontSize: 16,
    flex: 1,
    marginLeft: 0,
  },
  serverURL_bottom_f2: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    marginLeft: 0,
  },
  cancelIcon: {
    width: 24,
    height: 24,
  },
  modalContent_rt_f2: {
    flex: 1,
    paddingHorizontal: 12
  },
  scrollViewContentf2: {
    paddingVertical: 20,
  },
  modalTextf2: {
    marginBottom: 20,
    textAlign: 'left',
    paddingHorizontal: 10
  },
  closeButtonf2: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
  },
  closeButtonTextf2: {
    color: 'white',
    fontWeight: 'bold',
  },
  textStyleSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "BLACK",
    paddingBottom: 5,
    textAlign: 'justify',
    lineHeight: 20,
  },
  textStyle_second: {
    paddingTop: 8
   },
  textStyle_H1: {
    fontSize: 16,
    fontWeight: "700",
    color: "BLACK",
  },
  textStyleSubtitle_TEXT: {
    fontSize: 14,
    fontWeight: "500",
    color: "BLACK",
    textAlign: 'justify',
    lineHeight: 20,
    paddingTop: 5
  },
  textStyleSubtitle_TEXT_f2: {
    fontSize: 14,
    fontWeight: "500",
    color: "BLACK",
    textAlign: 'justify',
    lineHeight: 20,
    paddingTop: 14
  },
  loginFormContainer: {
    alignItems: 'center',
    width:"100%"
  },
  button_login: {
    backgroundColor: '#046357', // Color with 50% opacity
    paddingVertical: 15,
    paddingHorizontal: 0,
    marginHorizontal: 10,
    marginTop: 20,
    marginVertical: 10,
    borderRadius: 10,
    width: '100%',
    // shadowColor: '#000000',
    // shadow/Offset: { width: 0, height: 4 },
    Opacity: 0.5,
    // shadowRadius: 4,
    // elevation: 8, 
  },
  buttonText_login: {
    color: '#ffff',
    fontWeight: "700",
    fontSize: 16,
    textAlign:"center"
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  
  passwordIconContainer: {
    position: 'absolute',
    right: 4,
    padding: 10,
    top:"26%"
  },
  input_login_form: {
    backgroundColor: 'white',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  
  forgetPasswordContainer: {
    marginVertical: 0,
    width:"100%"
    
  },
  forgetPasswordText: {
    color: 'white',
    textAlign:"right",
    fontWeight:"600",
  },
  errorText: {
    color: 'red',
    // marginBottom: 10,
    alignSelf: 'flex-start',
    textAlign: 'left',
    
  },
  errorInput: {
    borderColor: 'red',
  },
}); 
export default PrivacyStatments