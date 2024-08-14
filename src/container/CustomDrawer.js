import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useTranslation } from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const [accessControlsDropdown, setAccessControlsDropdown] = useState(false);
  const [attendanceDropdown, setAttendanceDropdown] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [helpDropdown, setHelpDropdown] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const fetchMenuItems = async () => {
    try {
      const baseURL = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      
      if (!baseURL || !token) {
        throw new Error('Base URL or token not found in storage');
      }
  
      const headers = {
        Authorization: `Bearer ${token}`,
      };
  
      const response = await axios.get(`${baseURL}/api/GetMenuItem?Language=P&Used_By=M&api-version=1.0`, { headers });
      const responseData = response.data;
      console.log('Menu response:', response);
      if (response.status === 200 && responseData.StatusCode === 200) {
        setMenuItems(responseData.Data); // Store the menu items in state
        // Alert.alert('Success', responseData.Message);
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (error) {
      console.error(error);
  
      let errorMessage = 'An error occurred. Please try again later.';
      if (error.response) {
        errorMessage = error.response.data.Message || errorMessage;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your internet connection.';
      }
  
      // Alert.alert('Error', errorMessage);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      await AsyncStorage.removeItem('userToken');
      closeModal();
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error logging out:', error);
      Alert.alert('Error', 'An error occurred while logging out');
    }
  };

  const handleNo = () => {
    closeModal();
  };

  const slideAnim = useRef(new Animated.Value(-500)).current;

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
  
  const renderIcon = (menuName) => {
    switch (menuName) {
      case 'Access Controls Insights':
        return <FontAwesome5 name="door-closed" size={20} color="#333" />;
      case 'Attendance Insights':
        return <FontAwesome5 name="cogs" size={20} color="#333" />;
      case 'Emergency Equation':
        return <FontAwesome5 name="exclamation-triangle" size={20} color="#333" />;
      case 'Denied By Device':
        return <FontAwesome5 name="times-circle" size={20} color="#333" />;
      case 'Denied By Cardholder':
        return <FontAwesome5 name="user-times" size={20} color="#333" />;
      case 'Door Alarms':
        return <FontAwesome5 name="bell" size={20} color="#333" />;
      case 'Devices Activity':
        return <FontAwesome5 name="clipboard-list" size={20} color="#333" />;
      case 'Door Management':
        return <FontAwesome5 name="clipboard-list" size={20} color="#333" />;
      case 'Attendance Analysis':
        return <FontAwesome5 name="chart-line" size={20} color="#333" />;
      case 'Absentees People':
        return <FontAwesome5 name="user-slash" size={20} color="#333" />;
      default:
        return <Ionicons name="help-circle-outline" size={20} color="#333" />;
    }
  };
  
  const renderMenuItems = () => {
    return menuItems.map((item, index) => {
      // Exclude the "Dashboard" item
      if (item.Menu_Name === 'Dashboard') return null;
  
      if (item.Menu_Type === 'C') {
        return (
          <TouchableOpacity
            key={item.Menu_ID}
            onPress={() =>
              item.Menu_Name === 'Access Controls Insights'
                ? setAccessControlsDropdown(!accessControlsDropdown)
                : setAttendanceDropdown(!attendanceDropdown)
            }
            style={styles.drawerItem}
          >
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center' }}>
              {renderIcon(item.Menu_Name)}
              <Text style={styles.drawerLabel}>{item.Menu_Name}</Text>
            </View>
            <Ionicons
              name={(item.Menu_Name === 'Access Controls Insights' && accessControlsDropdown) || (item.Menu_Name === 'Attendance Insights' && attendanceDropdown) ? 'chevron-up' : 'chevron-down'}
              size={22}
              color="#333"
            />
          </TouchableOpacity>
        );
      } else if (item.Menu_Type === 'D' && accessControlsDropdown && item.Parent_Menu_ID === 3) {
        return (
          <TouchableOpacity
            key={item.Menu_ID}
            onPress={() => navigation.navigate(item.Page_Name)}
            style={styles.dropdownItem}
          >
            {renderIcon(item.Menu_Name)}
            <Text style={styles.dropdownLabel}>{item.Menu_Name}</Text>
          </TouchableOpacity>
        );
      } else if (item.Menu_Type === 'D' && attendanceDropdown && item.Parent_Menu_ID === 4) {
        return (
          <TouchableOpacity
            key={item.Menu_ID}
            onPress={() => navigation.navigate(item.Page_Name)}
            style={styles.dropdownItem}
          >
            {renderIcon(item.Menu_Name)}
            <Text style={styles.dropdownLabel}>{item.Menu_Name}</Text>
          </TouchableOpacity>
        );
      }
      return null;
    });
  };
  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContentf2, { transform: [{ translateY: slideAnim }] }]}>
            <View style={styles.serverURLContainerf2}>
              <Text style={styles.serverURLf2}>Log Out</Text>
              <TouchableOpacity onPress={closeModal}>
                <Image source={require('../../assets/images/cancel-39-39.png')} style={styles.cancelIcon} />
              </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.logoutText}>Are you sure you want to logout?</Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button_rt} onPress={handleNo}>
                  <Ionicons name="close-circle" size={24} color="white" style={styles.icon} />
                  <Text style={styles.buttonText_rt}>No</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLogout}>
                  <Ionicons name="checkmark-circle" size={24} color="white" style={styles.icon} />
                  <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        </View>
      </Modal>
      <DrawerContentScrollView {...props} contentContainerStyle={{ marginTop: -4 }}>
        <ImageBackground source={require('../../assets/images/drawer.png')} style={{ padding: 20, height: 200 }}>
          <Text style={{ color: '#fff', fontSize: 30, fontFamily: 'Roboto-Medium', marginBottom: 5, fontWeight: '700', textAlign: 'center' }}>
            {t('Digital_Faciliter')}
          </Text>
          <Text style={{ color: '#fff', fontSize: 18, fontFamily: 'Roboto-Medium', marginBottom: 5, fontWeight: '600', textAlign: 'center' }}>
            {t('Seamless_Solutions')}
          </Text>
          <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'Roboto-Medium', marginBottom: 0, fontWeight: '800', marginTop: '20%' }}>
            System Admin
          </Text>
        </ImageBackground>
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props} />
          {renderMenuItems()}
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings-outline" size={20} color="#333" />
            <Text style={styles.drawerLabel}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Claim Home')}>
            <Ionicons name="settings-outline" size={20} color="#333" />
            <Text style={styles.drawerLabel}>ClaimHome</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('About Screen')}>
            <Ionicons name="information-circle-outline" size={20} color="#333" />
            <Text style={styles.drawerLabel}>About</Text>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('AddHome')}>
            <Ionicons name="information-circle-outline" size={20} color="#333" />
            <Text style={styles.drawerLabel}>AddHome</Text>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Home Information')}>
            <Ionicons name="information-circle-outline" size={20} color="#333" />
            <Text style={styles.drawerLabel}>HomeInformation</Text>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('VerifyAddressScreen')}>
            <Ionicons name="information-circle-outline" size={20} color="#333" />
            <Text style={styles.drawerLabel}>AddHome</Text>
            
          </TouchableOpacity>
          <TouchableOpacity style={styles.drawerItem} onPress={() => navigation.navigate('Privacy Statments')}>
            <Ionicons name="shield-checkmark-outline" size={20} color="#333" />
            <Text style={styles.drawerLabel}>Privacy Statement</Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc'  }}>
        {/* <TouchableOpacity onPress={() => setHelpDropdown(!helpDropdown)} style={styles.drawerItem_inner}>
          <Ionicons name="help-circle-outline" size={22} color="#333" />
          <Text  style={{ flexDirection: 'row', flex: 1, alignItems: 'center' , marginLeft:10 ,  fontSize: 15,
    color: '#333',
    fontFamily: 'Roboto-Medium', }}>{t('Help')}</Text>
          <Ionicons name={helpDropdown ? 'chevron-up' : 'chevron-down'} size={22} color="#333" />
        </TouchableOpacity>
        {helpDropdown && (
          <View style={styles.dropdownContent}>
            <TouchableOpacity onPress={() => navigation.navigate('Help')} style={styles.dropdownItem}>
              <FontAwesome5 name="clipboard-list" size={20} color="#333" />
              <Text style={styles.dropdownLabel}>{t('Help')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('HelpSettings')} style={styles.dropdownItem}>
              <FontAwesome5 name="clipboard-list" size={20} color="#333" />
              <Text style={styles.dropdownLabel}>{t('HelpSettings')}</Text>
            </TouchableOpacity>
          </View>
        )} */}
        <TouchableOpacity onPress={openModal} style={styles.drawerItem}>
          <Ionicons name="exit-outline" size={22} color="#333" />
          <Text style={styles.drawerLabel}>{t('Logout')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  drawerLabel: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
    fontFamily: 'Roboto-Medium',
    // fontWeight: '800'
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    paddingLeft: 30,
  },
  dropdownLabel: {
    marginLeft: 10,
    fontSize: 15,
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentf2: {
    width: '85%',
    height: 220,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  serverURLContainerf2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serverURLf2: {
    fontSize: 24,
    fontWeight: 'bold',
    color:"white"
  },
  cancelIcon: {
    width: 24,
    height: 24,
  },
  contentContainer: {
    
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // marginTop:20,
    // textAlign:"center"
  },
  logoutText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    textAlign:"center"
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop:30
  },
  button: {
    backgroundColor: '#00544d',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  button_rt: {
    backgroundColor: '#6e6e6e',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText_rt : {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  drawerItem_inner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 15,
    // backgroundColor: '#E8E8E8',
  },
  dropdownContent: {
    paddingLeft: 20,
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
});

export default CustomDrawer;
