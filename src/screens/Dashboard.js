import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView, RefreshControl } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import DeviceStatus from "./DeviceStatus";
import ActiveWorkforce from './ActiveWorkforce';
import AlarmPerChart from './AlarmPerChart';
import PeopleEntryPerHour from './PeopleEntryPerHour';
import PeopleExitPerHour from './PeopleExitPerHour';
import TotalWorkForce from './TotalWorkForce';
import AccessDenied from './AccessDenied';
import AccessGranted from './AccessGranted';
import DeviceAlarm from './DeviceAlarm';
import CustomDropdown from '../container/SelectCustomDropdown';
import InOutComponent from './InOutComponent';
import { AppContext } from '../Context/AppContext';

const Dashboard = () => {
  const { themeColor , area, brand, selectedArea, setSelectedArea, selectedBrand, setSelectedBrand, summary, getSummary } = useContext(AppContext);
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


  
  const [modalVisible, setModalVisible] = useState(false);
  const [refreshBackgroundColor, setRefreshBackgroundColor] = useState('#ffffff'); // State for background color
  const scrollViewRef = useRef(null); // Ref for ScrollView
  const [isOpenDropdown4, setIsOpenDropdown4] = useState(false);
  const [isOpenDropdown5, setIsOpenDropdown5] = useState(false);
 
  const handleRefresh = () => {
    // Set background color to indicate refresh
    setRefreshBackgroundColor('#f0f0f0');

    // Reset the date range to current date
    const newFromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const newToDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
    setFromDate(newFromDate);
    setToDate(newToDate);

    // After refresh, scroll to top
    scrollViewRef.current.scrollTo({ y: 0, animated: true });

    // Reset background color after a short delay
    setTimeout(() => {
      setRefreshBackgroundColor('#ffffff'); // Reset to original background color
      getSummary(convertToLocalTime(newFromDate), convertToLocalTime(newToDate));
    }, 1000); // Adjust delay as needed
  };
  // useEffect(() =>{
  //   getSummary();
  // }, [selectedRegion , selectedCity , selectedLocation , selectedArea , selectedBrand] )
  const handleConfirm = () => {
    getSummary(startDate, endDate);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
  };
  useEffect(() => {
    getSummary(startDate, endDate);
  }, [selectedArea , selectedBrand]);
  useEffect(() => {
    getSummary(startDate, endDate);
  }, []);

  const CustomArrowUpIcon = () => (
    <Icon name="chevron-up" size={16} color="#fff" />
  );

  const CustomArrowDownIcon = () => (
    <Icon name="chevron-down" size={16} color="#fff" />
  );

  const toggleDropdown4 = () => {
    setIsOpenDropdown4(!isOpenDropdown4);
    setIsOpenDropdown5(false); // Close other dropdowns
  };

  const toggleDropdown5 = () => {
    setIsOpenDropdown5(!isOpenDropdown5);
    setIsOpenDropdown4(false); // Close other dropdowns
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: refreshBackgroundColor }}
      refreshControl={
        <RefreshControl refreshing={false} onRefresh={handleRefresh} />
      }
  >
    <View style={styles.container}>
      <View style={styles.topContainer}>
      <View>
        <View style={styles.dateContainer}>
          <Text style={[styles.label_from, { color: themeColor }]} >From : </Text>
          <Text style={[styles.dateText, { color: themeColor }]} >{startDate}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Text style={[styles.label_To, { color: themeColor }]}>To : </Text>
          <Text style={[styles.dateText, { color: themeColor }]}>{endDate}</Text>
          
        </View>
        </View>
          <View style={styles.right_icons}>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={styles.openModalButton}
        >
          <Icon name="calendar" size={28} color={themeColor} />
        </TouchableOpacity>
        
        {/* <TouchableOpacity
          // onPress={handleRefresh}
          // style={styles.iconButton}
        >
          <Icon name="refresh" size={28} color="#00544d" />
        </TouchableOpacity> */}
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
              <View style={[styles.serverURLContainerf2, { backgroundColor: themeColor }]}>
                <Text style={styles.modalTitle}>Select Dates</Text>
              </View>
              <View style={styles.datePickerContainer}>
                <Text style={[styles.label_dash, { color: themeColor }]}>From: </Text>
                <DatePicker
                  date={fromDate}
                  onDateChange={(date) => setFromDate(new Date(date))}
                  mode="datetime"
                  style={styles.datePicker}
                  is24hourSource="locale"
                />
              </View>
              <View style={styles.datePickerContainer}>
                <Text style={[styles.label_dash, { color: themeColor }]}>To: </Text>
                <DatePicker
                  date={toDate}
                  onDateChange={(date) => setToDate(new Date(date))}
                  mode="datetime"
                  style={styles.datePicker}
                  is24hourSource="locale"
                />
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={handleCancel} style={[styles.modalButton, { backgroundColor: themeColor }]}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleConfirm}  style={[styles.modalButton, { backgroundColor: themeColor }]}>
                  <Text style={styles.confirmButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

      <View style={[styles.dropdownWrapper, { zIndex: 3000 }]}>
        {/* <Icon name="globe" size={20} color="#fff" style={styles.icon} /> */}
        {/* <DropDownPicker
          open={openArea}
          value={selectedArea}
          items={areas}
          setOpen={handleOpenArea}
          setValue={setSelectedArea}
          setItems={setAreas}
          placeholder="Select Area"
          searchable={true}
          style={styles.picker}
          searchPlaceholderTextColor='#ffff'
          placeholderStyle={styles.placeholderStyle}
          ArrowUpIconComponent={CustomArrowUpIcon}
          ArrowDownIconComponent={CustomArrowDownIcon}
          labelStyle={styles.labelStyle}
          textStyle={styles.selectedTextStyle} 
          searchTextInputStyle={styles.searchTextInputStyle}
          // dropDownContainerStyle={styles.dropDownContainerStyle}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          zIndex={3000}
          zIndexInverse={1000}
        /> */}
          <CustomDropdown
          items={area}
          selectedValue={selectedArea}
          setSelectedValue={setSelectedArea}
          placeholder="Select Area"
          iconName="globe"
          isOpen={isOpenDropdown4}
          setOpen={toggleDropdown4}
          color="white"
          style={[styles.dropcontainer, { borderColor: themeColor , backgroundColor:themeColor }]}  // Apply additional styles here
          style2={[styles.input]}
        />
      </View>

      <View style={[styles.dropdownWrapper, { zIndex: 2000 }]}>
        {/* <Icon name="tags" size={20} color="#ffff" style={styles.icon} /> */}
        {/* <DropDownPicker
           open={openBrand}
           value={selectedBrand}
           items={brands}
           setOpen={handleOpenBrand}
           setValue={setSelectedBrand}
           setItems={setBrands}
          placeholder="Select Brand"
          searchPlaceholderTextColor='#ffff'
          placeholderStyle={styles.placeholderStyle}
          searchable={true}
          style={styles.picker}
          ArrowUpIconComponent={CustomArrowUpIcon}
          ArrowDownIconComponent={CustomArrowDownIcon}
          dropDownContainerStyle={styles.dropDownContainerStyle}
          searchTextInputStyle={styles.searchTextInputStyle}
          labelStyle={styles.labelStyle}
          textStyle={styles.selectedTextStyle}
          zIndex={2000}
          zIndexInverse={1000}
          
        /> */}
          <CustomDropdown
          items={brand}
          selectedValue={selectedBrand}
          setSelectedValue={setSelectedBrand}
          placeholder="Select Brand"
          iconName="tags"
          isOpen={isOpenDropdown5}
          setOpen={toggleDropdown5}
          color="white"
          style={[styles.dropcontainer, { borderColor: themeColor , backgroundColor:themeColor }]}  // Apply additional styles here
          style2={[styles.input]}
          
        />
      </View>
      <View style={styles.device_top}  >
    <DeviceStatus />
    </View>
    <View style={styles.maindash_firstchart} >
    <View style={styles.GraphDashboard}  >
    <ActiveWorkforce  />
    </View>
    <View style={styles.GraphDashboard}  >
    <AlarmPerChart />
    </View>
    </View>
    <View style={styles.maindash_firstchart_second} >
    <View style={styles.GraphDashboard}  >
    <PeopleEntryPerHour />
    </View>
    <View style={styles.GraphDashboard}  >
    <PeopleExitPerHour />
    </View>
    
    </View>
    <View style={styles.maindash_thirdchart_second} >
    <View style={styles.GraphDashboard}  >
    <TotalWorkForce/>
    </View>
    <View style={styles.GraphDashboard}  >
    <DeviceAlarm   />
    </View>
    </View>
    
  {/* ///  second Half /// */}
  <View style={styles.maindash_fourthchart_second} >
    <View style={styles.GraphDashboard}  >
    <AccessGranted />
    </View>
    <View style={styles.GraphDashboard}  >
    <AccessDenied value={summary?.Access_Denied}   />
    </View>
    
    </View>
    <InOutComponent />
    </View>
     </ScrollView> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 18,
  },
  dropcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingRight: 5,
    marginVertical: 8,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  topContainer: {
    flexDirection:"row",
    justifyContent:"space-between",
    marginBottom: 0,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: 'white',
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
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
    width: 120,
    textAlign: "center",
  },
  dropdownWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    // paddingHorizontal: 20,
    // paddingTop: 50,// Ensure initial zIndex is set
    width:"100%"
  },
  icon: {
    position: 'absolute',
    left: 10,
    zIndex: 5000,
  },
  picker: {
    flex: 1,
    backgroundColor: '#00544d', // Background color of the dropdown
    color: '#fff',
    paddingLeft: 35, // Add padding to avoid overlap with the icon
  },
  dropDownContainerStyle: {
    backgroundColor: '#00544d',
     // Background color of the dropdown container
  },
  dropDownContainerOpen: {
    backgroundColor: 'lightgreen', // Background color when dropdown is open
  },
  placeholderStyle: {
    color: '#ffff', // Color of the placeholder text
  },
  labelStyle: {
    color: '#fff', // Color of the dropdown items
  },
  selectedTextStyle: {
    color: '#fff', // Color of the selected value
  },
  searchTextInputStyle: {
    color: '#fff', // Color of the search text input
  },
  device_top: {
    paddingTop:8,
  },
  GraphDashboard: {
// paddingTop:7,
    width:"48%",
    
    // marginVertical:20,
    marginHorizontal:5,
  },
  maindash_firstchart: {
    flexDirection:"row",
    marginBottom:-120,
    marginTop:-20,
    // justifyContent:"space-between"
  },
  maindash_firstchart_second: {
    flexDirection:"row",
    // marginBottom:-100,
    // marginTop:-20,
    // justifyContent:"space-between"
  },
  maindash_thirdchart_second:{
    flexDirection:"row",
    // marginBottom:-120,
    marginTop:-40,
  },
  maindash_fourthchart_second:{
    flexDirection:"row",
    marginTop: 50,
  }
});

export default Dashboard;
