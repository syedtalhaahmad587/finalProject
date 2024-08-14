import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet , Alert  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LanguageModal from './LanguageModal'; // Adjust the import path as necessary
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModifyPasswordModal from './ModifyPasswordModal'; // Adjust the import path as necessary
import ServerURLModal from './ServerURLModal';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [passwordModalVisible, setPasswordModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleSelectLanguage = (language) => {
    setSelectedLanguage(language);
    // Add any additional logic for changing the app language
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const handleSavePassword = async (currentPassword, newPassword, confirmPassword , onClose , reset) => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      
      if (userData) {
        const parsedData = JSON.parse(userData);
        const { User_Auto_ID, User_Password } = parsedData?.userInfo || {};
  
        console.log('User_Auto_ID:', User_Auto_ID);
        console.log('User_Password:', User_Password);
  
        if (User_Password !== currentPassword) {
          Alert.alert('Error', 'Current password is incorrect');
          return;
        }
  
        if (newPassword !== confirmPassword) {
          Alert.alert('Error', 'New password and confirm password do not match');
          return;
        }
  
        const baseUrl = await AsyncStorage.getItem('baseURL');
        const url = `${baseUrl}/api/ModifyPassword`;
        console.log('API URL:', `${url}?UserAutoId=${User_Auto_ID}&UserPwd=${newPassword}`);
  
        const response = await axios({
          method: "post",
          url: `${url}?UserAutoId=${User_Auto_ID}&UserPwd=${newPassword}`,
        });
  
        const { StatusCode, Message, Data } = response.data; // Assuming your API response structure
  
        console.log('Password change response:', response.data);
  
        if (StatusCode === 200) {
          Alert.alert('Success', 'Password changed successfully');
          onClose();
          reset();
        } else {
          Alert.alert('Error', `Password change failed: ${Message}`);
        }
      } else {
        Alert.alert('Error', 'No user data found in AsyncStorage');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      Alert.alert('Error', 'An error occurred while changing the password');
    }
  };

  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.option}
        onPress={() => setLanguageModalVisible(true)}
      >
        <Icon name="globe" size={24} color="black" />
        <Text style={styles.optionText}>{selectedLanguage}</Text>
        <Icon name="chevron-right" size={24} color="black" style={styles.chevron} />
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option} onPress={toggleModal}>
        <Icon name="laptop" size={24} color="black" />
        <Text style={styles.optionText}>Server URL</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.option} onPress={() => setPasswordModalVisible(true)}>
        <Icon name="key" size={24} color="black" />
        <Text style={styles.optionText}>Modify Password</Text>
      </TouchableOpacity>

      

      <LanguageModal
        visible={languageModalVisible}
        onClose={() => setLanguageModalVisible(false)}
        onSelectLanguage={handleSelectLanguage}
      />
      <ModifyPasswordModal
        visible={passwordModalVisible}
        onClose={() => setPasswordModalVisible(false)}
        onSave={handleSavePassword}
      />
        <ServerURLModal visible={isModalVisible} onClose={toggleModal} />
        
    </View>
    <View style={styles.footer}>
        <Text style={styles.footerText}>SAM Controls 2024. All rights reserved</Text>
      </View>
      </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  option: {
  flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    flex: 1,
    marginLeft: 16,
    fontSize: 16,
  },
  chevron: {
    marginLeft: 'auto',
  },
  footer: {
   padding: 16,
    backgroundColor: '#004d40',
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default SettingsScreen;
