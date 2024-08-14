import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, RefreshControl, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import { AppContext } from '../Context/AppContext';

const DevicesActivity = () => {
  const {
    selectedRegion,
    selectedCity,
    selectedLocation,
    selectedArea,
    selectedBrand,
  } = useContext(AppContext);

  const [lastActivity, setLastActivity] = useState([]);
  const [filteredActivityData, setFilteredActivityData] = useState([]);
  const [filteredDurationData, setFilteredDurationData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQueryActivity, setSearchQueryActivity] = useState('');
  const [searchQueryduration, setSearchQueryduration] = useState('');
  const [lastDuration, setLastDuration] = useState([]);
  const currentDate = new Date();
  const fromDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
  const toDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

  const [fromDate, setFromDate] = useState(fromDateTime);
  const [toDate, setToDate] = useState(toDateTime);

 

  const convertToLocalTime = (date) => {
    
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 19).replace('T', ' ');
  };

  const startDate = convertToLocalTime(fromDate);
  const endDate = convertToLocalTime(toDate);

  useEffect(() => {
    fetchLastActivity();
    fetchLastDuration();
  }, [selectedRegion, selectedCity, selectedLocation, selectedArea, selectedBrand, startDate, endDate]);

  useEffect(() => {
    fetchLastActivity();
  }, []);
  useEffect(() => {
    fetchLastDuration();
  }, []);

  const fetchLastDuration = async () => {
    try {
      const baseUrl = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${baseUrl}/api/GetDeviceOfflineDuration`, {
        params: {
          'api-version': '1.0',
          'Language': 'p',
          'Level1_ID': selectedRegion,
          'Level2_ID': selectedCity,
          'Level3_ID': selectedLocation,
          'Level4_ID': selectedArea,
          'Eqpt_Group_ID': selectedBrand,
          "Start_Date": startDate,
          "End_Date": endDate,
        },
        headers: headers
      });

      if (response.data.StatusCode === 200) {
        setLastDuration(response.data.Data.Data);
        setFilteredDurationData(response.data.Data.Data);            
      } else {
        console.error('Error fetching data:', response.data.Message);
        setLastDuration([]);
        setFilteredDurationData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLastDuration([]);
      setFilteredDurationData([]);
    }
  };

  const fetchLastActivity = async () => {
    try {
      const baseUrl = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(`${baseUrl}/api/GetDeviceLastActivity`, {
        params: {
          'api-version': '1.0',
          'Language': 'P',
          'Level1_ID': selectedRegion,
          'Level2_ID': selectedCity,
          'Level3_ID': selectedLocation,
          'Level4_ID': selectedArea,
          'Eqpt_Group_ID': selectedBrand,
          "Start_Date": startDate,
          "End_Date": endDate,
        },
        headers,
      });

      if (response.data.StatusCode === 200) {
        setLastActivity(response.data.Data);
        setFilteredActivityData(response.data.Data);
      } else {
        console.error('Error fetching data:', response.data.Message);
        setLastActivity([]);
        setFilteredActivityData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setLastActivity([]);
      setFilteredActivityData([]);
    }
  };

 
  

  const handleConfirm = () => {
    setModalVisible(false);
    fetchLastActivity();
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const handleSearch = (query) => {
    setSearchQueryActivity(query);
    if (query.trim() === '') {
      setFilteredActivityData(lastActivity);
    } else {
      const filteredItems = lastActivity.filter(item =>
        item.Eqpt_Title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredActivityData(filteredItems);
    }
  };
  
  const handleSearchDuration = (query) => {
    // setSearchQueryduration(query);
    // const filteredData = lastDuration.filter(item =>
    //   item.Eqpt_Title.toLowerCase().includes(query.toLowerCase())
    // );
    // setFilteredDurationData(filteredData);
    setSearchQueryduration(query);
    if (query.trim() === '') {
      setFilteredDurationData(lastDuration);
    } else {
      const filteredItems = lastDuration.filter(item =>
        item.Eqpt_Title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDurationData(filteredItems);
    }
  };

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
            <Icon name="refresh" size={28} color="#00544d" onPress={fetchLastActivity} />
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
      <View>
        <Text style={styles.Summary}>Offline Device</Text>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Device Name"
        onChangeText={handleSearch}
        value={searchQueryActivity}
      />
      <View style={styles.container_grid}>
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={[styles.headerCell, { width: 80, borderRightWidth: 1, borderColor: '#fff' }]}>Type</Text>
              <Text style={[styles.headerCell, { width: 110, borderRightWidth: 1, borderColor: '#fff' }]}>Device Name</Text>
              <Text style={[styles.headerCell, { width: 110, borderRightWidth: 1, borderColor: '#fff' }]}>Last Activity</Text>
              <Text style={[styles.headerCell, { width: 100, borderRightWidth: 1, borderColor: '#fff' }]}>Total Duration</Text>
            </View>
            <ScrollView>
              {filteredActivityData.length > 0 ? (
                filteredActivityData.map((item, index) => (
                  <View key={index} style={styles.dataRow}>
                    <Text style={[styles.dataCell, { width: 80, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Eqpt_Type_Title}</Text>
                    <Text style={[styles.dataCell, { width: 110, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Eqpt_Title}</Text>
                    <Text style={[styles.dataCell, { width: 110, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Last_Activity}</Text>
                    <Text style={[styles.dataCell, { width: 100, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Offline_For}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No data found</Text>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    <View>
      <Text style={[styles.Summary , styles.mt]}>Device with the Longest Total Duration</Text>
      </View>
      <TextInput
          style={styles.searchInput}
          placeholder="Search by Person Name"
          onChangeText={handleSearchDuration}
          value={searchQueryduration}
        />
     <View style={styles.container_grid}>
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={[styles.headerCell, { width: 80, borderRightWidth: 1, borderColor: '#fff' }]}>Type</Text>
              <Text style={[styles.headerCell, { width: 110, borderRightWidth: 1, borderColor: '#fff' }]}>Device Name</Text>
              <Text style={[styles.headerCell, { width: 110, borderRightWidth: 1, borderColor: '#fff' }]}>Last Activity</Text>
              <Text style={[styles.headerCell, { width: 100, borderRightWidth: 1, borderColor: '#fff' }]}>Total Duration</Text>
            </View>
            <ScrollView>
              {filteredDurationData?.length > 0 ? (
                filteredDurationData.map((item, index) => (
                  <View key={index} style={styles.dataRow}>
                    <Text style={[styles.dataCell, { width: 80, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Eqpt_Type_Title}</Text>
                    <Text style={[styles.dataCell, { width: 110, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Eqpt_Title}</Text>
                    <Text style={[styles.dataCell, { width: 110, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Last_Activity}</Text>
                    <Text style={[styles.dataCell, { width: 100, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Offline_For}</Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>No data found</Text>
              )}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    marginLeft: 8,
  },
  label_from: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  label_To: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  right_icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  openModalButton: {
    marginRight: 16,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label_dash: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  datePicker: {
    flex: 1,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  confirmButton: {
    backgroundColor: '#00544d',
  },
  cancelButtonText: {
    color: '#333',
  },
  confirmButtonText: {
    color: '#fff',
  },
  Summary: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingLeft: 8,
  },
  container_grid: {
    flex: 1,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#00544d',
  },
  headerCell: {
    padding: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  dataRow: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
  },
  dataCell: {
    padding: 10,
    color: '#333',
  },
  noDataText: {
    textAlign: 'center',
    padding: 20,
    color: '#333',
  },
});

export default DevicesActivity;
