import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { RadioButton, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { AppContext } from '../Context/AppContext';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FFFF',
  },
  fonts: {
    ...DefaultTheme.fonts,
    regular: {
      ...DefaultTheme.fonts.regular,
      fontSize: 14,
    },
  },
  radioButton: {
    size: 16, // Custom size for the radio button
  },
};

const InOutComponent = () => {
  const { deviceLoc, selectedButton , setSelectedButton , themeColor  } = useContext(AppContext);
  
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   getSummary(selectedButton);
  // }, [selectedButton]);

  const handleRadioButtonPress = (value) => {
    setSelectedButton(value);
    // getSummary(value);
  };


  return (
    <PaperProvider theme={theme}>
    <ScrollView contentContainerStyle={styles.container}>
      <View  style={[styles.header , { backgroundColor: themeColor }]}>
        <Text style={styles.headerText}>IN & OUT</Text>
        <RadioButton.Group onValueChange={handleRadioButtonPress} value={selectedButton}>
          <View style={styles.inner_radio}>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonLabel}>Category</Text>
              <RadioButton value="FilterByCat" color="#FFFF" />
            </View>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonLabel}>Group</Text>
              <RadioButton value="FilterByGroup" color="#FFFF" />
            </View>
            <View style={styles.radioButtonContainer}>
              <Text style={styles.radioButtonLabel}>Department</Text>
              <RadioButton value="FilterByDept" color="#FFFF" />
            </View>
          </View>
        </RadioButton.Group>
      </View>
      <View style={styles.body}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {deviceLoc.length > 0 ? (
              <View style={styles.table}>
                <View style={styles.tableRow}>
                  <Text style={[styles.tableCellHeader , { color: themeColor }]}>Description</Text>
                  <Text  style={[styles.tableCellHeader , { color: themeColor }]}>Entry</Text>
                  <Text style={[styles.tableCellHeader , { color: themeColor }]}>Exit</Text>
                </View>
                {deviceLoc.map((row, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCell , { color: themeColor }]}>{row.Title}</Text>
                    <Text style={[styles.tableCell , { color: themeColor }]}>{row.Entry}</Text>
                    <Text style={[styles.tableCell , { color: themeColor }]}>{row.Exit}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text>No Data Found</Text>
            )}
          </>
        )}
      </View>
    </ScrollView>
  </PaperProvider>
);
};

const styles = StyleSheet.create({
container: {
  flexGrow: 1,
  backgroundColor: '#ffffff',
  borderRadius: 10,
  borderWidth: 1,
  borderColor: '#004d4d',
  marginTop: 25,
},
header: {
  flexDirection: 'row',
  backgroundColor: '#004d4d',
  borderTopLeftRadius: 10,
  alignItems: 'center',
  borderTopRightRadius: 10,
},
headerText: {
  color: '#ffffff',
  fontSize: 12,
  fontWeight: 'bold',
  marginBottom: 10,
  marginRight: 20,
  marginLeft: 10,
  marginTop: 3,
},
radioButtonContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 5,
},
radioButtonLabel: {
  color: '#ffffff',
  marginLeft: 0,
  marginRight: 0,
  fontSize: 10,
},
body: {
  alignItems: 'center',
  justifyContent: 'center',
},
table: {
  width: '100%',
},
tableRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#ddd',
},
tableCell: {
  flex: 1,
  textAlign: 'center',
  fontSize: 16,
},
tableCellHeader: {
  flex: 1,
  textAlign: 'center',
  fontSize: 16,
  fontWeight: 'bold',
},
inner_radio: {
  flexDirection: 'row',
  marginRight: 50,
},
});

export default InOutComponent;
