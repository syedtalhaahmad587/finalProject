import React, { createContext, useState , useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const defaultIconColor = '#00544d';
    const defaultImage = require('../../assets/images/abstract1.png');
    const defaultIconImage = require('../../assets/images/SAMGREEN.png');
    const [Device_DeniedHourSum, setDevice_DeniedHourSum] = useState([]);
    const [Device_DeniedDaySum, setDevice_DeniedDaySum] = useState([]);
    const [themeColor, setThemeColor] = useState(defaultIconColor);
    const [backgroundImage, setBackgroundImage] = useState(defaultImage);
    const [iconImage, setIconImage] = useState(defaultIconImage);
    const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);
    const [isServerURLModalVisible, setServerURLModalVisible] = useState(false);
    const [isModifyPasswordModalVisible, setModifyPasswordModalVisible] = useState(false);
    const [area, setArea] = useState([]);
    const [brand, setBrand] = useState([]);
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [selectedPersonName, setSelectedPersonName] = useState(null);
    const [summary, setSummary] = useState('');
    
  const [entryDataSearch, setEntryDataSearch] = useState([]);
  const [exitData, setExitData] = useState([]);
  const [alarmData, setAlarmData] = useState([]);
  const [dashDeviceData, setDashDeviceData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [selectedButton, setSelectedButton] = useState('FilterByCat');
  const [deviceLoc, setDeviceLoc] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
//   useEffect(() =>{
//     getSummary();
//   }, [] )

    const getLevel4 = async (locationId) => {
       
        try {
            const baseUrl = await AsyncStorage.getItem('baseURL');
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get(`${baseUrl}/api/GetLevelList`, {
                params: {
                    List_Name: 'Level4',
                    language: 'P',
                    UserId: '1',
                    Parent_Id: locationId,
                    'api-version': '1.0'
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const level4Data = response.data.Data;
            setArea(level4Data.map(item => ({ label: item.Title, value: item.ID })));
            setSelectedArea(level4Data[0].ID);
            getEqptGroup(level4Data[0].ID)
        } catch (error) {
            console.error('Error fetching Level 4 data:', error);
        }
    };

    const getEqptGroup = async (areaId) => {
        console.log(areaId , "ffff123")
        try {
            const baseUrl = await AsyncStorage.getItem('baseURL');
            const token = await AsyncStorage.getItem('userToken');
            const response = await axios.get(`${baseUrl}/api/GetLevelList`, {
                params: {
                    List_Name: 'Eqpt_Group',
                    language: 'P',
                    UserId: '1',
                    Parent_Id: areaId,
                    'api-version': '1.0'
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const eqptGroupData = response.data.Data;
            setBrand(eqptGroupData.map(item => ({ label: item.Title, value: item.ID })));
            setSelectedBrand(eqptGroupData[0].ID);
        } catch (error) {
            console.error('Error fetching Equipment Group data:', error);
        }
    };
    const getSummary = async (startDate, endDate) => {
        // fromDate.setHours(0, 0, 0, 0);

        // // Set time for toDate to 23:59:59 (end of day)
        // toDate.setHours(23, 59, 59, 999);
        // console.log(fromDate.toISOString(), toDate.toISOString(), selectedRegion, selectedCity, selectedLocation, selectedArea, selectedBrand, "selectedRegion");
        try {
            setLoading(true);
            const baseUrl = await AsyncStorage.getItem('baseURL');
            const token = await AsyncStorage.getItem('userToken');
            const headers = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json-patch+json',
            };
    
            const data = {
                level1_ID: selectedRegion,
                level2_ID: selectedCity,
                level3_ID: selectedLocation,
                level4_ID: selectedArea,
                eqpt_Group_ID: selectedBrand,
                status: "A",
                language: "p",
                alarmType: "0",
                proceName_Device: "DeviceStatus",
                proceName_FilterBy: selectedButton,
                startDT: startDate,
                endDT: endDate,
            };
    
            console.log(data, "Request Data"); // Log the request data for debugging
    
            const response = await axios.post(`${baseUrl}/api/GetDashBoardApis`, data, { headers });
            const responseData = response.data;
    
            console.log(responseData, "Response Data"); // Log the response data for debugging
    
            if (responseData?.StatusCode === 200 && responseData?.Message === "Data found while retrieving.") {
                setSummary(responseData.Data.dashSumModel[0]);
                setEntryDataSearch(responseData.Data.getDashEntryData);
                setExitData(responseData.Data.getDashExitData);
                setAlarmData(responseData.Data.getDashAlarmData);
                setDashDeviceData(responseData.Data.deviceStatusModel);
                setFilter(responseData.Data.deviceStatusModel);
                setDeviceLoc(responseData.Data.dashRowModel);
                setFilterData(responseData.Data.dashRowModel);
            } else {
                console.warn("Unexpected API response structure", responseData);
            }
    
        } catch (error) {
            console.error("Error fetching summary data:", error);
            if (error.response?.status === 404 || error.response?.status === 500) {
                // Handle specific errors
            }
        } finally {
            setLoading(false);
        }
    };
  
    
    return (
        <AppContext.Provider value={{
            isLanguageModalVisible,
            setLanguageModalVisible,
            isServerURLModalVisible,
            setServerURLModalVisible,
            isModifyPasswordModalVisible,
            setModifyPasswordModalVisible,
            getLevel4,
            getEqptGroup,
            area,
            setArea,
            brand,
            setBrand,
            selectedArea, 
            setSelectedArea,
            selectedBrand, 
            setSelectedBrand,
            summary,
    entryDataSearch,
    exitData,
    alarmData,
    dashDeviceData,
    filter,
    deviceLoc,
    filterData,
    loading,
    getSummary,
    selectedRegion,
    setSelectedRegion,
    selectedCity,
     setSelectedCity,
     selectedLocation, 
     setSelectedLocation,
     selectedButton,
      setSelectedButton,
      selectedPersonName, setSelectedPersonName ,
      Device_DeniedHourSum, setDevice_DeniedHourSum , 
      Device_DeniedDaySum, setDevice_DeniedDaySum , 
      themeColor, setThemeColor , backgroundImage, setBackgroundImage , iconImage, setIconImage
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;
