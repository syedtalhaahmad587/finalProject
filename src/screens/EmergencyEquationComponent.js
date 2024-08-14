import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button  , TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../Context/AppContext';


const EmergencyEquationComponent = () => {
  const {
    selectedRegion,
    selectedCity,
    selectedLocation,
    selectedArea,
    selectedBrand,
} = useContext(AppContext);

const [searchQuery, setSearchQuery] = useState('');
const [originalData, setOriginalData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [emergencypageNumber, setEmergencypageNumber] = useState(0);
const [emergencypageSize, setEmergencypageSize] = useState(10);
const [totalEmergencyRecords, setTotalEmergencyRecords] = useState(0);
const [open, setOpen] = useState(false);
const [pageSizeItems, setPageSizeItems] = useState([
    { label: '10', value: 10 },
    { label: '25', value: 25 },
    { label: '50', value: 50 },
    { label: '100', value: 100 }
]);

useEffect(() => {
    fetchEmergencyData(emergencypageNumber, emergencypageSize);
}, [selectedRegion, selectedCity, selectedLocation, selectedArea, selectedBrand, emergencypageNumber, emergencypageSize]);

const fetchEmergencyData = async (pageNumber, pageSize) => {
    try {
        const baseUrl = await AsyncStorage.getItem('baseURL');
        const token = await AsyncStorage.getItem('userToken');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${baseUrl}/api/GetEmergencyEquation`, {
            params: {
                'api-version': '1.0',
                'Language': 'p',
                'Level1_ID': selectedRegion,
                'Level2_ID': selectedCity,
                'Level3_ID': selectedLocation,
                'Level4_ID': selectedArea,
                'Eqpt_Group_ID': selectedBrand,
                'Page_Number': pageNumber + 1, // API expects 1-based index
                'Page_Size': pageSize
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

const handleSearch = (text) => {
    setSearchQuery(text);
    if (text.trim() === '') {
        setFilteredData(originalData); // Reset to original data when search query is cleared
    } else {
        const filtered = originalData.filter(item => item.Person_Name.toLowerCase().includes(text.toLowerCase()));
        setFilteredData(filtered);
    }
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
                        <Text style={[styles.headerCell, { width: 100, borderRightWidth: 1, borderColor: '#fff' }]}>Designation</Text>
                        <Text style={[styles.headerCell, { width: 100, borderRightWidth: 1, borderColor: '#fff' }]}>Level4</Text>
                        <Text style={[styles.headerCell, { width: 100 }]}>Entry Time</Text>
                    </View>
                    <ScrollView style={styles.scrollView}>
            {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                    <View key={index} style={styles.dataRow}>
                        <Text style={[styles.dataCell, { width: 80, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Person_ID}</Text>
                        <Text style={[styles.dataCell, { width: 110, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Person_Card_No}</Text>
                        <Text style={[styles.dataCell, { width: 110, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Person_Name}</Text>
                        <Text style={[styles.dataCell, { width: 100, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Department_Title}</Text>
                        <Text style={[styles.dataCell, { width: 100, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Designation_Title}</Text>
                        <Text style={[styles.dataCell, { width: 100, borderRightWidth: 1, borderColor: '#ddd' }]}>{item.Level4_Title}</Text>
                        <Text style={[styles.dataCell, { width: 100 }]}>{item.Entry_Time}</Text>
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
  scrollView: {
    flexGrow: 1,
    padding: 10,// Adjust the maximum height as per your requirement
},
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
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

export default EmergencyEquationComponent;
