import React, { useState, useEffect , useContext  } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomDropdown from '../container/SelectCustomDropdown';
import { AppContext } from '../Context/AppContext';

const SelectDropdown = () => {
  const { getLevel4 ,  selectedRegion,
    setSelectedRegion,
    selectedCity,
     setSelectedCity,
     selectedLocation, 
     setSelectedLocation , selectedArea , selectedBrand  , getSummary , themeColor, setThemeColor , backgroundImage, setBackgroundImage , iconImage, setIconImage } = useContext(AppContext);
  const navigation = useNavigation();
  const [isOpen, setOpen] = useState(false);
  // const [selectedRegion, setSelectedRegion] = useState(null);
  // const [selectedCity, setSelectedCity] = useState(null);
  // const [selectedLocation, setSelectedLocation] = useState(null);  
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [locations, setLocations] = useState([]);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTk3NTEzNjUsImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMC8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAvIn0.KDAPZYa2qAZqgVUFmG7VBKElQkNrbREZ4SP67YBf5bg';
  const [isOpenDropdown1, setIsOpenDropdown1] = useState(false);
  const [isOpenDropdown2, setIsOpenDropdown2] = useState(false);
  const [isOpenDropdown3, setIsOpenDropdown3] = useState(false);

  
  useEffect(() => {
    getLevel1();
  }, []);

  const getLevel1 = async () => {
    try {
      const baseUrl = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${baseUrl}/api/GetLevelList`, {
        params: {
          List_Name: 'Level1',
          language: 'P',
          UserId: '1',
          'api-version': '1.0'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const level1Data = response.data.Data;
      setRegions(level1Data.map(item => ({ label: item.Title, value: item.ID })));
      setSelectedRegion(level1Data[0].ID);
      getLevel2(level1Data[0].ID);
    } catch (error) {
      console.error('Error fetching Level 1 data:', error);
    }
  };

  const getLevel2 = async (regionId) => {
    try {
      const baseUrl = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${baseUrl}/api/GetLevelList`, {
        params: {
          List_Name: 'Level2',
          language: 'P',
          UserId: '1',
          Parent_Id: regionId,
          'api-version': '1.0'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const level2Data = response.data.Data;
      setCities(level2Data.map(item => ({ label: item.Title, value: item.ID })));
      setSelectedCity(level2Data[0].ID);
      getLevel3(level2Data[0].ID);
    } catch (error) {
      console.error('Error fetching Level 2 data:', error);
    }
  };

  const getLevel3 = async (cityId) => {
    try {
      const baseUrl = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      const response = await axios.get(`${baseUrl}/api/GetLevelList`, {
        params: {
          List_Name: 'Level3',
          language: 'P',
          UserId: '1',
          Parent_Id: cityId,
          'api-version': '1.0'
        },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const level3Data = response.data.Data;
      setLocations(level3Data.map(item => ({ label: item.Title, value: item.ID })));
      setSelectedLocation(level3Data[0].ID);
      getLevel4(level3Data[0].ID)
    } catch (error) {
      console.error('Error fetching Level 3 data:', error);
    }
  };
  const toggleDropdown1 = () => {
    setIsOpenDropdown1(!isOpenDropdown1);
    setIsOpenDropdown2(false); // Close other dropdowns
    setIsOpenDropdown3(false); // Close other dropdowns
  };

  const toggleDropdown2 = () => {
    setIsOpenDropdown2(!isOpenDropdown2);
    setIsOpenDropdown1(false); // Close other dropdowns
    setIsOpenDropdown3(false); // Close other dropdowns
  };

  const toggleDropdown3 = () => {
    setIsOpenDropdown3(!isOpenDropdown3);
    setIsOpenDropdown1(false); // Close other dropdowns
    setIsOpenDropdown2(false); // Close other dropdowns
  };
  const handleNext = () => {
    navigation.navigate('DrawerNavigator');
    getSummary(selectedRegion , selectedCity , selectedLocation , selectedArea , selectedBrand);
  };

  return (
    <ImageBackground
    source={backgroundImage}
      style={styles.backgroundImage_drop_Rt}
    >
      <View style={styles.logoContainer_drop_Rt}>
        <Image
          source={iconImage} // apne logo ka path lagaye
          style={styles.logo_drop_Rt}
        />
      </View>
      <View style={styles.container_drop_Rt}>
        <CustomDropdown
          items={regions}
          selectedValue={selectedRegion}
          setSelectedValue={setSelectedRegion}
          placeholder="Select Region"
          iconName="globe"
          isOpen={isOpenDropdown1}
          setOpen={toggleDropdown1}
          style={[styles.inputContainer, { borderColor: themeColor , color:themeColor }]}  // Apply additional styles here
             color="black"
             style2={[styles.input, {  color:themeColor }]}
            //  style2={styles.input} 
        />
        <CustomDropdown
          items={cities}
          selectedValue={selectedCity}
          setSelectedValue={setSelectedCity}
          placeholder="Select City"
          iconName="building"
          isOpen={isOpenDropdown2}
        setOpen={toggleDropdown2}
        style={[styles.inputContainer, { borderColor: themeColor , color:themeColor }]}  // Apply additional styles here
        color="black"
        style2={[styles.input, {  color:themeColor }]}
        />
        <CustomDropdown
          items={locations}
          selectedValue={selectedLocation}
          setSelectedValue={setSelectedLocation}
          placeholder="Select Location"
          iconName="map-marker"
          isOpen={isOpenDropdown3}
          setOpen={toggleDropdown3}
          style={[styles.inputContainer, { borderColor: themeColor , color:themeColor }]}  // Apply additional styles here
          color="black"
          style2={[styles.input, {  color:themeColor }]}
        />
        <TouchableOpacity  style={[styles.button__drop_Rt, { backgroundColor: themeColor }]}  onPress={handleNext} >
          <Text style={styles.buttonText__drop_Rt}>Next</Text>
          <Icon name="arrow-right" size={20} color="#fff" style={styles.buttonIcon_drop_Rt} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  backgroundImage_drop_Rt: {
    flex: 1,
    resizeMode: 'cover',
  },
  container_drop_Rt: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingRight: 5,
    marginVertical: 10,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  input: {
    flex: 1,
    marginLeft: 10,
  },
  dropdownWrapper_drop_Rt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#00544d',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 0,
    paddingVertical: 20,
    width: '100%',
    zIndex: 1,
  },
  icon_drop_Rt: {
    position: 'absolute',
    left: 10,
    zIndex: 5000,
  },
  picker_drop_Rt: {
    flex: 1,
    color: '#fff',
    paddingLeft: 35,
  },
  dropDownContainerStyle: {
    backgroundColor: '#00544d',
  },
  button__drop_Rt: {
    flexDirection: 'row',
    alignItems: 'center',

    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText__drop_Rt: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  buttonIcon_drop_Rt: {
    marginLeft: 10,
  },
  logoContainer_drop_Rt: {
    alignItems: 'center',
    width: '100%',
  },
  logo_drop_Rt: {
    color: 'white',
    marginBottom: 10,
    resizeMode: 'contain',
    marginTop: '25%',
  },
});

export default SelectDropdown;