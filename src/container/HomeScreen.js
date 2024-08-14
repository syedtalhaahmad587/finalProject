import React, { useState, useEffect, useRef , useContext } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, ScrollView, ImageBackground, StyleSheet, Modal, Animated, Alert, ActivityIndicator } from 'react-native';
import styles from '../styles';
import axios from "axios";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PasswordClose from "../SVG/PasswordClose";
import PasswordOpen from "../SVG/PasswordOpen";
import { useNavigation } from '@react-navigation/native';
import ServerURLModal from '../screens/ServerURLModal';
import LanguageModal from '../screens/LanguageModal';
import ImageSelectionModal from './ImageSelectionModal';
import { AppContext } from '../Context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalVisibleImage, setModalVisibleImage] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [isModalVisible_forget, setIsModalVisible_forget] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [baseURL, setBaseURL] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(-500)).current;
  const [loading, setLoading] = useState(false); // State for API loading indicator
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const { themeColor, setThemeColor , backgroundImage, setBackgroundImage , iconImage, setIconImage } = useContext(AppContext);
  useEffect(() => {
    checkBaseURL();
  }, []);

  useEffect(() => {
    if (modalVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -500,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [modalVisible, slideAnim]);

  const checkBaseURL = async () => {
    const storedBaseURL = await AsyncStorage.getItem('baseURL');
    if (!storedBaseURL) {
      setIsModalVisible(true);
    } else {
      setBaseURL(storedBaseURL);
    }
  };
  const backgroundImages = [
    require('../../assets/images/PigmentPurple.png'),
    require('../../assets/images/DarKGreen.png'),
    require('../../assets/images/abstract1.png'),
    require('../../assets/images/neptunneBlue.png')
   
  ];
  const Icons = [
    require('../../assets/images/IconneptunnePurple.png'),
    require('../../assets/images/Iconabstract1.png'),
    require('../../assets/images/SAMGREEN.png'),
    require('../../assets/images/IconneptunneBlue.png'),
   
  ];
  const ColorsEffect = [
    '#541091',
    '#00544d',
    '#00544d',
    '#006187'
  ];
  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
  };

  const schema = yup.object().shape({
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const baseURL = await AsyncStorage.getItem('baseURL');
      setLoading(true); // Start loading indicator
      const response = await axios.get(`${baseURL}/api/LoginUser`, {
        params: { UserId: data.username, UserPwd: data.password }
      });
      const token = response.data?.Data?.token;
      if (response.status === 200) {
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.Data));
        AsyncStorage.setItem('userToken', token);
        Alert.alert("Success", "Login successful!");
        navigation.navigate('SelectDropdown');
      } else {
        Alert.alert("user name or password is invalid");
      }
    } catch (error) {
      if (error.response && error.response?.status === 401) {
        // If status code is 401, show a specific message
        Alert.alert("Error", "User name or password is invalid.");
      } else {
        // For other errors, show a generic login failed message
        const apiMessage = error?.message || "Login failed. Please check your credentials.";
        Alert.alert("Error", apiMessage);
      }
      console.error('Error during login:', error);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  const handleEmail = async () => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    if (email === '') {
      setEmailErr('Please enter your email');
      return;
    } else if (!re.test(email)) {
      setEmailErr('Invalid Email');
      return;
    } else {
      setEmailErr('');
      setLoading(true);
    }

    try {
      const baseURL = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(`${baseURL}/api/ForgetPassword?email=${email}`, { headers });
      const responseData = response;

      if (responseData.status === 200) {
        setResponseMessage(responseData.data.Message);
        setIsModalVisible_forget(false);
        Alert.alert('Success', responseData.data.Message);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error(error);

      let errorMessage = 'An error occurred. Please try again later.';
      if (error.response) {
        // The request was made and the server responded with a status code outside the range of 2xx
        if (error.response.status === 400) {
          errorMessage = `Email [${email}] not found.`;
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
      //  else if (error.request) {
      //   // The request was made but no response was received
      //   errorMessage = 'Network error. Please check your internet connection.';
      // }

      setResponseMessage(errorMessage);
      
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleLoginForm = () => {
    if (!baseURL) {
      Alert.alert("Error", "Please set the Server URL before Login / Register");
      setIsModalVisible(true);
     
    }else {
      setIsLoginFormVisible(!isLoginFormVisible);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModal_forget = () => {
    setIsModalVisible_forget(!isModalVisible_forget);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSaveBaseURL = async (url) => {
    await AsyncStorage.setItem('baseURL', url);
    setBaseURL(url);
    setIsModalVisible(false);
  };
 
  const openModalImage = () => {
    setModalVisibleImage(true);
  };

  const closeModalImage = () => {
    setModalVisibleImage(false);
 
  };

  const handleImageSelectedImage = (index) => {
    setBackgroundImage(backgroundImages[index]);
    setIconImage(Icons[index])
    setThemeColor(ColorsEffect[index])
    closeModal();
  };

  return (
    <>
    <ImageSelectionModal
        isVisible={modalVisibleImage}
        onClose={closeModalImage}
        onImageSelected={handleImageSelectedImage}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContentf2, { transform: [{ translateY: slideAnim }] }]}>

            {/* Top Header */}
            <View  style={[styles.serverURLContainerf2, { backgroundColor: themeColor }]} >
              <Text style={styles.serverURLf2}>Privacy Policy</Text>
              <TouchableOpacity onPress={closeModal}>
                <Image source={require('../../assets/images/cancel-39-39.png')} style={styles.cancelIcon} />
              </TouchableOpacity>
            </View>

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
            <View style={[styles.serverURLContainer_bottom_f2, { backgroundColor: themeColor }]}  >
              <Text style={styles.serverURL_bottom_f2}>SAM Controls 2023. All rights reserved</Text>

            </View>
          </Animated.View>
        </View>
      </Modal>
      <ServerURLModal visible={isModalVisible} onClose={toggleModal} onSave={handleSaveBaseURL} />
      {/* <ServerURLModal onClose={toggleModal} onSave={handleSaveBaseURL} /> */}
      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        onSelectLanguage={handleSelectLanguage}
      />
      {/* ///  Forget Password // */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible_forget}
        onRequestClose={toggleModal_forget}
      >
            <View style={styles.modalContainer}>
              
        <View style={styles.modalContent}>
          {/* Server URL Text */}
          <View style={[styles.serverURLContainer, { backgroundColor: themeColor }]}>
            <Text style={styles.serverURL}>Forget Password?</Text>
          </View>

          {/* Input Field */}
          <View style={styles.modalContent_rt}>
            <View>
              <TextInput
                placeholder="Enter Registered Email"
                placeholderTextColor={themeColor}
                style={[styles.inputf1, { borderColor: themeColor }]}
                value={email}
                onChangeText={(text) => setEmail(text)}
              />
              {emailErr ? <Text style={styles.errorText}>{emailErr}</Text> : null}
            </View>

            {/* Text */}
            <Text style={styles.bottomTextf1}>
              Please enter your registered email address to reset your password 
            </Text>

            {/* Buttons */}
            <View style={styles.buttonContainerf1}>
              <View>
                <TouchableOpacity onPress={toggleModal_forget} style={[styles.buttonf1, { backgroundColor: themeColor }]}>
                  <Text style={styles.buttonTextf1}>Cancel</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity onPress={handleEmail}  style={[styles.buttonf1, { backgroundColor: themeColor }]}>
                  <Text style={[styles.buttonTextf2]}>Submit</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      </Modal>
      {/* ///  Forget Password // */}
      {loading ? <ActivityIndicator style={styles.loadingIndicator} size="large" color="#00544d" /> : 
      <ImageBackground source={backgroundImage} style={styles.background}>
        
        <View style={styles.container}>
          {/* Logo */}
          <View>
            <View style={styles.logoContainer}>
              <Image
                source={iconImage} // apne logo ka path lagaye
                resizeMode="contain"
                style={styles.logo}
              />

            </View>
          
            {!isLoginFormVisible && (
            <View style={styles.btn1}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={toggleLoginForm}>
                  <Text style={[styles.buttonText, { color: themeColor }]}>Login / Register</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={openModalImage} >
                  <Text style={[styles.buttonText, { color: themeColor }]}>Theme Setting</Text>
                </TouchableOpacity>
              </View>
            </View>
               )}
               {isLoginFormVisible && (
          <View style={styles.loginFormContainer}>
           <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <>
                      <TextInput
                        placeholder="Enter username"
                        style={[styles.input_login_form, errors.username && styles.errorInput]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        placeholderTextColor={themeColor}
                        value={value}
                      />
                      {errors.username && <Text style={styles.errorText}>{errors.username.message}</Text>}
                    </>
                  )}
                />
       <Controller
  control={control}
  name="password"
  render={({ field: { onChange, onBlur, value } }) => (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Enter password"
        secureTextEntry={!isPasswordVisible}
        style={[styles.input_login_form, errors.password && styles.errorInput]}
        onBlur={onBlur}
        onChangeText={onChange}
        placeholderTextColor={themeColor}
        value={value}
      />
      <TouchableOpacity
        style={styles.passwordIconContainer}
        onPress={() => setPasswordVisible(!isPasswordVisible)}
      >
        {isPasswordVisible ? <PasswordOpen width="30" height="30" color={themeColor} /> : <PasswordClose width="30" height="30" color={themeColor} />}
      </TouchableOpacity>
    </View>
  )}
/>
  {errors.password && <Text style={styles.errorText}>{errors.password.message}</Text>}
            <TouchableOpacity style={styles.forgetPasswordContainer} onPress={toggleModal_forget} >
              <Text style={styles.forgetPasswordText}>Forget Password?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={[styles.button_login, { backgroundColor: themeColor }]}  onPress={handleSubmit(onSubmit)} >
              <Text  style={[styles.buttonText_login]}  >Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button_login, { backgroundColor: themeColor }]} onPress={() => {
                navigation.navigate('Request User Registration');
              }}>
              <Text style={styles.buttonText_login}>Registration</Text>
            </TouchableOpacity>
           
          </View>
        )}
          </View>
          
          <View>
            {/* Bottom Text */}
            <View style={styles.bottomContainer}>
              <View style={styles.bottomLinks}>
                <TouchableOpacity onPress={toggleModal}>
                  <Text style={styles.bottomLinkText}>Server URL</Text>
                </TouchableOpacity>
                <Text style={styles.bottomLinkText}> | </Text>
                <TouchableOpacity onPress={openModal}>
                  <Text style={styles.bottomLinkText}>Privacy Policy</Text>
                </TouchableOpacity>
                <Text style={styles.bottomLinkText}> | </Text>
                <TouchableOpacity  onPress={() => setLanguageModalVisible(true)}>
                <Text style={styles.bottomLinkText}>Language</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.bottomText}>SAM Controls 2024. All rights reserved</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
}
    </>
  );
};


export default HomeScreen;
