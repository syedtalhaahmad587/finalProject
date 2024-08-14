import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { AppContext } from '../Context/AppContext';

const AbsenteesPeople = () => {
  const headers = ['Person ID', 'Card Number', 'Person Name', 'Department', 'Designation', 'Level 4', 'Entry Time'];
  const {
    selectedRegion,
    selectedCity,
    selectedLocation,
    selectedArea,
    selectedBrand,
  } = useContext(AppContext);

  const currentDate = new Date();
  const fromDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
  const toDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

  const [onlyDate, setOnlyDate] = useState(currentDate);
  const [fromDate, setFromDate] = useState(fromDateTime);
  const [toDate, setToDate] = useState(toDateTime);
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [totalRecords, setTotalRecords] = useState(0);
  const [open, setOpen] = useState(false);
  const [emergencypageNumber, setEmergencypageNumber] = useState(0);
const [emergencypageSize, setEmergencypageSize] = useState(10);
const [totalEmergencyRecords, setTotalEmergencyRecords] = useState(0);
const [pageSizeItems, setPageSizeItems] = useState([
  { label: '10', value: 10 },
  { label: '25', value: 25 },
  { label: '50', value: 50 },
  { label: '100', value: 100 }
]);
useEffect(() => {
  fetchAttendanceData(emergencypageNumber, emergencypageSize);
}, [emergencypageNumber, emergencypageSize, onlyDate, fromDate, toDate , selectedRegion, selectedCity, selectedLocation, selectedArea, selectedBrand]);

  const fetchAttendanceData = async (pageNumber, pageSize) => {
    setLoading(true);
    try {
      const baseUrl = await AsyncStorage.getItem('baseURL');
      const token = await AsyncStorage.getItem('userToken');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${baseUrl}/api/GetAttendAbsentees`, {
        params: {
          "Language": "p",
          "Level1_ID": selectedRegion,
          "Level2_ID": selectedCity,
          "Level3_ID": selectedLocation,
          "Level4_ID": selectedArea,
          "Eqpt_Group_ID": selectedBrand,
          "EventDate": convertToLocalTime(onlyDate),
          "StartTime": convertToLocalTime(fromDate),
          "EndTime": convertToLocalTime(toDate),
          "Filter_By": "A",
          "Filter_Text": "None",
         "Page_Number": pageNumber + 1,
          "Page_Size": pageSize,
          "api-version": "1.0"
        },
        headers: headers
      });
      if (response.data.StatusCode === 200) {
      setData(response.data.Data.Data);
      setFilteredData(response.data.Data.Data);
      setTotalEmergencyRecords(response.data.Data.TotalCount);
      setLoading(false);
    } else {
      console.error('Error fetching data:', response.data.Message);
      setData([]);
      setFilteredData([]);
      setTotalEmergencyRecords(0);
      setLoading(false);
  }
} catch (error) {
  console.error('Error fetching data:', error);
  setData([]);
  setFilteredData([]);
  setTotalEmergencyRecords(0);
  setLoading(false);
}
  };

  
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredData(data); // Reset to original data if search query is empty
    } else {
      const filtered = data.filter(item => item.Person_Name.toLowerCase().includes(text.toLowerCase()));
      setFilteredData(filtered);
    }
  };

  const handleConfirm = () => {
    setModalVisible(false);
    fetchAttendanceData(); // Fetch data based on new date range
  };

  const handleCancel = () => {
    setModalVisible(false);
  };

  const convertToLocalTime = (date) => {
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 19).replace('T', ' ');
  };

 
  const onPageChange = (newPageNumber) => {
    setEmergencypageNumber(newPageNumber);
};

const onIncomingpageSizeChange = (itemValue) => {
    setEmergencypageSize(itemValue);
    setEmergencypageNumber(0); // Reset to first page on page size change
};

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View>
          <View style={styles.dateContainer}>
            <Text style={styles.label_from}>Date : </Text>
            <Text style={styles.dateText}>{onlyDate.toLocaleDateString()}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.label_from}>From : </Text>
            <Text style={styles.dateText}>{fromDate.toLocaleTimeString()}</Text>
          </View>
          <View style={styles.dateContainer}>
            <Text style={styles.label_To}>To : </Text>
            <Text style={styles.dateText}>{toDate.toLocaleTimeString()}</Text>
          </View>
        </View>
        <View style={styles.right_icons}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openModalButton}>
            <Icon name="calendar" size={28} color="#00544d" />
          </TouchableOpacity>
          <TouchableOpacity onPress={fetchAttendanceData}>
            <Icon name="refresh" size={28} color="#00544d" />
          </TouchableOpacity>
        </View>
      </View>

      <Modal transparent={true} visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Dates</Text>
            <View style={styles.datePickerContainer}>
              <Text style={styles.label_dash}>Date: </Text>
              <DatePicker date={onlyDate} onDateChange={setOnlyDate} mode="date" style={styles.datePicker} />
            </View>
            <View style={styles.datePickerContainer}>
              <Text style={styles.label_dash}>From Time: </Text>
              <DatePicker date={fromDate} onDateChange={setFromDate} mode="time" style={styles.datePicker} />
            </View>
            <View style={styles.datePickerContainer}>
              <Text style={styles.label_dash}>To Time: </Text>
              <DatePicker date={toDate} onDateChange={setToDate} mode="time" style={styles.datePicker} />
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

      <TextInput
        style={styles.searchInput}
        placeholder="Search by Person Name"
        onChangeText={handleSearch}
        value={searchQuery}
      />

     
        <ScrollView horizontal>
          <View style={styles.table}>
            <View style={styles.headerRow}>
              <Text style={[styles.headerCell, { width: 80, borderRightWidth: 1, borderColor: '#fff' }]}>Person ID</Text>
              <Text style={[styles.headerCell, { width: 110, borderRightWidth: 1, borderColor: '#fff' }]}>Card Number</Text>
              <Text style={[styles.headerCell, { width: 110, borderRightWidth: 1, borderColor: '#fff' }]}>Person Name</Text>
              <Text style={[styles.headerCell, { width: 100, borderRightWidth: 1, borderColor: '#fff' }]}>Department</Text>
            </View>
            <ScrollView style={styles.scrollView}>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#00544d" />
      ) : filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <View key={index} style={styles.dataRow}>
            <Text style={[styles.dataCell, { width: 80, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Person_ID}</Text>
            <Text style={[styles.dataCell, { width: 110, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Person_Card_No}</Text>
            <Text style={[styles.dataCell, { width: 110, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Person_Name}</Text>
            <Text style={[styles.dataCell, { width: 100, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Department_Title}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.noDataText}>No data found</Text>
      )}
    </ScrollView>
          </View>
        </ScrollView>
     
    <View style={styles.pagination}>
                <TouchableOpacity 
                    onPress={() => onPageChange(0)} 
                    disabled={emergencypageNumber === 0}
                    style={[styles.button, emergencypageNumber === 0 && styles.disabledButton]}
                >
                    <Text style={styles.buttonText}>{"<<"}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => onPageChange(emergencypageNumber - 1)} 
                    disabled={emergencypageNumber === 0}
                    style={[styles.button, emergencypageNumber === 0 && styles.disabledButton]}
                >
                    <Text style={styles.buttonText}>{"<"}</Text>
                </TouchableOpacity>
                <Text style={styles.pageNumber}>
                    Page {emergencypageNumber + 1} of {Math.ceil(totalEmergencyRecords / emergencypageSize)}
                </Text>
                <TouchableOpacity 
                    onPress={() => onPageChange(emergencypageNumber + 1)} 
                    disabled={emergencypageNumber === Math.ceil(totalEmergencyRecords / emergencypageSize) - 1}
                    style={[styles.button, emergencypageNumber === Math.ceil(totalEmergencyRecords / emergencypageSize) - 1 && styles.disabledButton]}
                >
                    <Text style={styles.buttonText}>{">"}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => onPageChange(Math.ceil(totalEmergencyRecords / emergencypageSize) - 1)} 
                    disabled={emergencypageNumber === Math.ceil(totalEmergencyRecords / emergencypageSize) - 1}
                    style={[styles.button, emergencypageNumber === Math.ceil(totalEmergencyRecords / emergencypageSize) - 1 && styles.disabledButton]}
                >
                    <Text style={styles.buttonText}>{">>"}</Text>
                </TouchableOpacity>
            </View>
            <DropDownPicker
                open={open}
                value={emergencypageSize}
                items={pageSizeItems}
                setOpen={setOpen}
                setValue={setEmergencypageSize}
                setItems={setPageSizeItems}
                containerStyle={styles.dropdownContainer}
                onChangeValue={onIncomingpageSizeChange}
            />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
  },
  scrollView: {
    flexGrow: 1,
    padding: 10,
},
loadingIndicator: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  // marginTop:"30%"
}, 
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#004d40',
  },
  headerCell: {
    padding: 8,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  dataRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  dataCell: {
    padding: 8,
    textAlign: 'center',
  },
  noDataText: {
    padding: 20,
    textAlign: 'center',
    color: '#777',
    fontStyle: 'italic',
  },
  topContainer: {
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom: 0,
  },
  right_icons: {
    flexDirection:"row",
    marginTop:8
    
    // justifyContent:"space-between",
    // marginBottom: 20,
  },
  
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginRight: 10,
     fontWeight: "700"
  },
  dateText: {
    fontSize: 15,
    color: '#00544d',
  },
  openModalButton: {
    paddingRight:15
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
    fontWeight: "700"
  },
  label_from: {
    fontSize: 14,
    marginRight: 5,
    fontWeight: "700",
    color:"#00544d"
  },
  label_To: {
    fontSize: 14,
    marginRight: 22,
    fontWeight: "700",
     color:"#00544d"
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
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
},
button: {
  padding: 10,
  backgroundColor: '#004d40',
  marginHorizontal: 5,
  borderRadius: 5,
},
disabledButton: {
  backgroundColor: '#ccc',
},
buttonText: {
  color: '#fff',
},
pageNumber: {
  marginHorizontal: 10,
  fontSize: 16,
},
dropdownContainer: {
    width: 150,
    marginTop: 10,
},
});

export default AbsenteesPeople;
