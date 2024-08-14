import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-date-picker';
import CardByCardholderGraph from './CardByCardholderGraph';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardByCardholderGraphDay from './CardByCardholderGraphDay';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';

const DeniedByCardholder = () => {
  const {
    selectedRegion,
    selectedCity,
    selectedLocation,
    selectedArea,
    selectedBrand,
    Device_DeniedHourSum, setDevice_DeniedHourSum , setSelectedPersonName , selectedPersonName , setDevice_DeniedDaySum
  } = useContext(AppContext);

  const currentDate = new Date();
  const fromDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
  const toDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

  const [fromDate, setFromDate] = useState(fromDateTime);
  const [toDate, setToDate] = useState(toDateTime);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPersonCardNo, setSelectedPersonCardNo] = useState(null);
  console.log(selectedPersonCardNo,"selectedPersonCardNo")
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);

  const convertToLocalTime = (date) => {
    
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 19).replace('T', ' ');
  };

  const startDate = convertToLocalTime(fromDate);
  const endDate = convertToLocalTime(toDate);

  const fetchDeniedCardholders = async () => {
    try {
      const baseUrl = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios({
        method: "get",
        url: `${baseUrl}/api/GetDeniedCardholder?Language=p&Tran_Type=S&Level1_ID=${selectedRegion}&Level2_ID=${selectedCity}&Level3_ID=${selectedLocation}&Level4_ID=${selectedArea}&Eqpt_Group_ID=${selectedBrand}&Start_Date=${startDate}&End_Date=${endDate}`,
        headers: headers,
      });

      console.log("API Response:", response);
      console.log("Response Data:", response.data);

      if (response.status === 200 && response.data.Data) {
        setData(response.data.Data);
        setFilteredData(response.data.Data);

        // Set default selection to the first row
        if (response.data.Data.length > 0) {
          setSelectedPersonCardNo(response.data.Data[0].Person_Card_No);
          setSelectedPersonName(response.data.Data[0].Person_Name);
          setSelectedRowIndex(0);
        }
      } else {
        setData([]);
        setFilteredData([]);
        console.error("No data found or unexpected response format");
      }
    } catch (error) {
      setData([]);
      setFilteredData([]);
      console.error("API Error:", error);
      if (error.response?.status === 404 || error.response?.status === 500) {
        // Handle specific error codes if needed
      }
    } finally {
      // Optionally handle loading state here
    }
  };

  const GetDeniedByHourCardholders = async () => {
    try {
      const baseUrl = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios({
        method: "get",
        url: `${baseUrl}/api/GetDeniedByHour?Language=p&Level1_ID=${selectedRegion}&Level2_ID=${selectedCity}&Level3_ID=${selectedLocation}&Level4_ID=${selectedArea}&Eqpt_Group_ID=${selectedBrand}&Event_Date=${startDate}&FilterBy=Cardholder&FilterValue=${selectedPersonCardNo}`,
        headers: headers,
      });

      console.log("API Response:", response);
      console.log("Response Data:", response.data);

      if (response.status === 200 && response.data.Data) {
        setDevice_DeniedHourSum(response.data.Data);
      } else {
        setDevice_DeniedHourSum([]);
        console.error("No data found or unexpected response format");
      }
    } catch (error) {
      setDevice_DeniedHourSum([]);
      console.error("API Error:", error);
      if (error.response?.status === 404 || error.response?.status === 500) {
        // Handle specific error codes if needed
      }
    } finally {
      // Optionally handle loading state here
    }
  };
  const GetDeniedByDayCardholders = async () => {
    try {
      const baseUrl = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios({
        method: "get",
        url: `${baseUrl}/api/GetDeniedByDay?Language=p&Level1_ID=${selectedRegion}&Level2_ID=${selectedCity}&Level3_ID=${selectedLocation}&Level4_ID=${selectedArea}&Eqpt_Group_ID=${selectedBrand}&Start_Date=${startDate}&End_Date=${endDate}&FilterBy=Cardholder&FilterValue=${selectedPersonCardNo}`,
        headers: headers,
      });

      console.log("API Response:", response);
      console.log("Response Data:", response.data);

      if (response.status === 200 && response.data.Data) {
        setDevice_DeniedDaySum(response.data.Data);
      } else {
        setDevice_DeniedDaySum([]);
        console.error("No data found or unexpected response format");
      }
    } catch (error) {
      setDevice_DeniedDaySum([]);
      console.error("API Error:", error);
      if (error.response?.status === 404 || error.response?.status === 500) {
        // Handle specific error codes if needed
      }
    } finally {
      // Optionally handle loading state here
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setData(filteredData);
    } else {
      const filteredItems = filteredData.filter(item =>
        item.Person_Name.toLowerCase().includes(query.toLowerCase())
      );
      setData(filteredItems);
    }
  };

  const handleConfirm = () => {
    setModalVisible(false);
    fetchDeniedCardholders();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const handleRowClick = (index, personCardNo , personName) => {
    setSelectedPersonName(personName)
    setSelectedPersonCardNo(personCardNo);
    setSelectedRowIndex(index);
    console.log('Clicked on row with ID:', personCardNo);
  };

  useEffect(() => {
    fetchDeniedCardholders();
    
  }, []);
  useEffect(() => {

    GetDeniedByHourCardholders();
    GetDeniedByDayCardholders();
  }, [selectedPersonCardNo ]);
  useEffect(() => {

   
  }, [selectedPersonCardNo]);
  
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View>
          <View style={styles.dateContainer}>
            <Text style={styles.label_from}>From: </Text>
            <Text style={styles.dateText}>{startDate}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.label_To}>To: </Text>
            <Text style={styles.dateText}>{endDate}</Text>
          </View>
        </View>
        <View style={styles.right_icons}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openModalButton}>
            <Icon name="calendar" size={28} color="#00544d" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="refresh" size={28} color="#00544d" />
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <View style={styles.serverURLContainerf2}>
              <Text style={styles.modalTitle}>Select Dates</Text>
            </View>
            <View style={styles.datePickerContainer}>
              <Text style={styles.label_dash}>From: </Text>
              <DatePicker
                date={fromDate}
                onDateChange={(date) => setFromDate(new Date(date))}
                mode="datetime"
                style={styles.datePicker}
                is24hourSource="locale"
              />
            </View>
            <View style={styles.datePickerContainer}>
              <Text style={styles.label_dash}>To: </Text>
              <DatePicker
                date={toDate}
                onDateChange={(date) => setToDate(new Date(date))}
                mode="datetime"
                style={styles.datePicker}
                is24hourSource="locale"
              />
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={handleCancel} style={[styles.modalButton, styles.cancelButton]}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm} style={[styles.modalButton, styles.confirmButton]}>
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.container_grid}>
        <View style={styles.headerRow}>
          <Text style={styles.headerText}>Person Name</Text>
          <Text style={styles.headerText}>Access Denied</Text>
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Person Name"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <ScrollView>
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.row,
                selectedRowIndex === index && styles.selectedRow
              ]}
              onPress={() => handleRowClick(index, item.Person_Card_No , item.Person_Name)}
            >
              <Text style={styles.cell}>{item.Person_Name}</Text>
              <Text style={styles.cell}>{item.Access_Denied}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <ScrollView>
        <CardByCardholderGraph />
        <View style={styles.CardByCardholderGraphDay}>
          <CardByCardholderGraphDay />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 18,
  },
  CardByCardholderGraphDay: {
    paddingHorizontal: 12,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  right_icons: {
    flexDirection: "row",
    marginTop: 8,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label_from: {
    fontSize: 14,
    marginRight: 5,
    fontWeight: "700",
    color: "#00544d",
  },
  label_To: {
    fontSize: 14,
    marginRight: 22,
    fontWeight: "700",
    color: "#00544d",
  },
  dateText: {
    fontSize: 15,
    color: '#00544d',
  },
  openModalButton: {
    paddingRight: 15,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
    alignItems: 'center',
  },
  serverURLContainerf2: {
    width: '100%',
    backgroundColor: '#00544d',
    paddingTop: 16,
    paddingBottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 20,
    color: "#ffff",
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  label_dash: {
    fontSize: 16,
    marginRight: 10,
    fontWeight: "700",
  },
  datePicker: {
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: '#00544d',
  },
  cancelButtonText: {
    color: 'white',
    fontSize: 16,
    width: 120,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: '#00544d',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    width: 120,
    textAlign: "center",
  },
  container_grid: {
    height: 240,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    overflow: 'hidden',
    width: "100%",
    marginBottom:10
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#00695c',
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 15,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingHorizontal: 15,
  },
  selectedRow: {
    backgroundColor: '#cce5ff',
  },
  cell: {
    fontSize: 16,
  },
});

export default DeniedByCardholder;
