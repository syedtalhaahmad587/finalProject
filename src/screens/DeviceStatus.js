import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../Context/AppContext';

const DeviceStatus = () => {
  const { dashDeviceData , themeColor } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const navigation = useNavigation();

  const filteredData = dashDeviceData?.filter(device => 
    device?.Eqpt_Type_Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device?.Eqpt_Title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device?.Device_Status?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRowPress = (deviceId) => {
    setSelectedRow(deviceId);
    // Navigate to another screen (adjust the route name and params as needed)
    navigation.navigate('DeviceDetails', { deviceId });
  };



  return (
    <View  style={[styles.container_device_status , { borderColor: themeColor }]} >
      {/* Table Header */}
      <View  style={[styles.tableHeader, styles.headerRow, { borderColor: themeColor , backgroundColor:themeColor }]}>
        <Text  style={[styles.headerText_device]}>Device Status</Text>
      </View>

      {/* Main Table Container */}
      <View style={styles.tableContainer}>
        {/* Table Headers */}
        <View style={styles.tableRow}>
          <Text style={[styles.headerText, styles.tableCellHeader , { color: themeColor }]}>Type</Text>
          <Text style={[styles.headerText,  , { color: themeColor }]}>Device</Text>
          <Text style={[styles.headerText  , { color: themeColor }]}>Status</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            placeholderTextColor={themeColor}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* No Data Message */}
        {filteredData?.length === 0 && (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data</Text>
          </View>
        )}

        {/* Table Rows */}
        <ScrollView style={styles.scrollView}>
          {filteredData?.map(device => (
            <TouchableOpacity
              key={device?.Eqpt_ID}
              onPress={() => handleRowPress(device?.Eqpt_ID)}
            >
              <View style={[styles.tableRow, selectedRow === device?.Eqpt_ID && styles.selectedRow]}>
                <Text style={[styles.tableCell,  , { color: themeColor }]}>{device?.Eqpt_Type_Title}</Text>
                <Text  style={[styles.cellText,  , { color: themeColor }]}>{device?.Eqpt_Title}</Text>
                <Text style={[
                  styles.cellText, 
                  device?.Device_Status === 'ON' ? styles.onStatus : styles.offStatus
                ]}>
                  {device?.Device_Status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container_device_status: {
    flex: 1,
    paddingBottom: 10,
    backgroundColor: '#ffffff', // Table background color
    borderRadius: 10,
    maxHeight: '80%', // Adjust the height as needed
  },
  scrollView: {
    maxHeight: '70%', // Adjust the height as needed
  },
  tableHeader: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tableCellHeader: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: "20%",
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00544d', // Header text color
    flex: 1,
    textAlign: 'center',
  },
  headerText_device: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff', // Header text color
    flex: 1,
    textAlign: 'left',
    marginLeft: 10,
  },
  tableContainer: {
    backgroundColor: '#ffffff', // Table background color
    borderWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#00544d', // Table border color
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  cellText: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 14,
    flex: 1,
    textAlign: 'center',
    marginRight: "20%",
  },
  
  searchContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0', // Search bar background color
  },
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#ffffff', // Input background color
  },
  noDataContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#888',
  },
  selectedRow: {
    backgroundColor: '#e0f7fa', // Selected row background color
  },
  onStatus: {
    color: 'green', // Color for "ON" status
  },
  offStatus: {
    color: 'red', // Color for "OFF" status
  },
});

export default DeviceStatus;
