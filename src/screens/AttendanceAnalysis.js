import React, { useState, useRef , useContext , useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, RefreshControl , TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker';
import { AppContext } from '../Context/AppContext'


;

const AttendanceAnalysis = () => {
  const {
    selectedRegion,
    selectedCity,
    selectedLocation,
    selectedArea,
    selectedBrand,
    
  } = useContext(AppContext);
  const headers = ['Person ID', 'Card Number', 'Person Name', 'Department', 'Designation', 'Level 4', 'Entry Time'];
    const currentDate = new Date();
  const fromDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
  const toDateTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);

  const [fromDate, setFromDate] = useState(fromDateTime);
  const [toDate, setToDate] = useState(toDateTime);
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [originalData, setOriginalData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
console.log(filteredData , originalData , "originalData" )
  const [emergencypageNumber, setEmergencypageNumber] = useState(0);
const [emergencypageSize, setEmergencypageSize] = useState(10);
const [totalEmergencyRecords, setTotalEmergencyRecords] = useState(0);
  const [pageSizeItems, setPageSizeItems] = useState([
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 }
]);
  
  const convertToLocalTime = (date) => {
    
    const localDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000));
    return localDate.toISOString().slice(0, 19).replace('T', ' ');
  };
//   useEffect(() => {
//     fetchEmergencyData(emergencypageNumber, emergencypageSize);
// }, [selectedRegion, selectedCity, selectedLocation, selectedArea, selectedBrand, emergencypageNumber, emergencypageSize , startDate , endDate]);

const fetchEmergencyData = async (pageNumber, pageSize) => {
    try {
        const baseUrl = await AsyncStorage.getItem('baseURL');
        const token = await AsyncStorage.getItem('userToken');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${baseUrl}/api/GetAttendEntryExit`, {
            params: {
                'api-version': '1.0',
                'Language': 'p',
                'Level1_ID': selectedRegion,
                'Level2_ID': selectedCity,
                'Level3_ID': selectedLocation,
                'Level4_ID': selectedArea,
                'Eqpt_Group_ID': selectedBrand,
                'Start_Date': startDate,
                'End_Date': endDate,
                'Filter_By': "A",
                'Filter_Text': "None",
                'Page_Number': pageNumber + 1, // API expects 1-based index
                'Page_Size': pageSize,
            },
            headers: headers
        });

        if (response.data.StatusCode === 200) {
            setOriginalData(response.data.Data.Data);
            setFilteredData(response.data.Data.Data);
            setTotalEmergencyRecords(response.data.Data.TotalCount);
        } else {
            console.error('Error fetching data:', response.data.Message);
            setOriginalData([]);
            setFilteredData([]);
            setTotalEmergencyRecords(0);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        setOriginalData([]);
        setFilteredData([]);
        setTotalEmergencyRecords(0);
    }
};
useEffect(() => {
  fetchEmergencyData(emergencypageNumber, emergencypageSize);
}, [selectedRegion, selectedCity, selectedLocation, selectedArea, selectedBrand, emergencypageNumber, emergencypageSize , startDate , endDate]);

  const startDate = convertToLocalTime(fromDate);
  const endDate = convertToLocalTime(toDate);
  const handleConfirm = () => {
    setModalVisible(false);
    fetchEmergencyData(emergencypageNumber, emergencypageSize , startDate , endDate);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  const onPageChange = (newPageNumber) => {
    setEmergencypageNumber(newPageNumber);
};

const onIncomingpageSizeChange = (itemValue) => {
    setEmergencypageSize(itemValue);
    setEmergencypageNumber(0); // Reset to first page on page size change
};

 

  
  

  const personIdWidth = 80;
  const cardNumberWidth = 110;
  const PersonNameWidth = 110;
  const DepartmentWidth = 100;
  const DesignationWidth = 100;
  const Level4Width = 100;
  const EntryTimeWidth = 100;

  // Function to handle search input change
  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
        setFilteredData(originalData); // Reset to original data when search query is cleared
    } else {
        const filtered = originalData.filter(item => item.Person_Name.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
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
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.openModalButton}
        >
          <Icon name="calendar" size={28} color="#00544d" />
        </TouchableOpacity>
        
        <TouchableOpacity
          // onPress={handleRefresh}
          // style={styles.iconButton}
        >
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
      <TextInput
                style={styles.searchInput}
                placeholder="Search by Person Name"
                onChangeText={handleSearch}
                value={searchQuery}
            />
      <ScrollView horizontal>
        <View style={styles.table}>
          <View style={styles.headerRow}>
            <Text style={[styles.headerCell, { width: personIdWidth, borderRightWidth: 1, borderColor: '#fff' }]}>Person ID</Text>
            <Text style={[styles.headerCell, { width: cardNumberWidth, borderRightWidth: 1, borderColor: '#fff' }]}>Card Number</Text>
            <Text style={[styles.headerCell, { width: PersonNameWidth, borderRightWidth: 1, borderColor: '#fff' }]}>Person Name</Text>
            <Text style={[styles.headerCell, { width: DepartmentWidth, borderRightWidth: 1, borderColor: '#fff' }]}>Entry Date</Text>
            <Text style={[styles.headerCell, { width: DesignationWidth, borderRightWidth: 1, borderColor: '#fff' }]}>Entry Time</Text>
            <Text style={[styles.headerCell, { width: Level4Width, borderRightWidth: 1, borderColor: '#fff' }]}>Exit Date</Text>
            <Text style={[styles.headerCell, { width: EntryTimeWidth }]}>Exit Time</Text>
          </View>
          <ScrollView style={styles.scrollView}>
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <View key={index} style={styles.dataRow}>
                <Text style={[styles.dataCell, { width: personIdWidth, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Person_ID}</Text>
                <Text style={[styles.dataCell, { width: cardNumberWidth, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Person_Card_No}</Text>
                <Text style={[styles.dataCell, { width: PersonNameWidth, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Person_Name}</Text>
                <Text style={[styles.dataCell, { width: DepartmentWidth, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Entry_Date}</Text>
                <Text style={[styles.dataCell, { width: DesignationWidth, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Entry_Time}</Text>
                <Text style={[styles.dataCell, { width: Level4Width, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Exit_Date}</Text>
                <Text style={[styles.dataCell, { width: EntryTimeWidth }]}>{item.Exit_Time}</Text>
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
    maxHeight: 420, // Adjust the maximum height as per your requirement
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

export default AttendanceAnalysis;
