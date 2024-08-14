import React, { useState, useContext } from 'react';
import { View, ScrollView, StyleSheet, Text, Modal, TouchableOpacity, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { AppContext } from '../Context/AppContext';

const screenWidth = Dimensions.get("window").width;

const CardByCardholderGraphDay = () => {
  const { Device_DeniedDaySum , selectedPersonName } = useContext(AppContext);
  const [clickedData, setClickedData] = useState({ day: null, value: null });
  const [modalVisible, setModalVisible] = useState(false);

  const onClickHandler = (label, value) => {
    const clickedData = Device_DeniedDaySum.find((item) => item.Day === parseInt(label.replace('Day ', '')));
    setClickedData({ day: clickedData ? clickedData.Day : label, value: value });
    setModalVisible(true);
  };

  // Ensure all days from 1 to 30 are included and aggregate values by day
  const completeData = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const foundData = Device_DeniedDaySum.filter(item => item.Day === day);
    const totalValues = foundData.reduce((acc, curr) => acc + curr.Values, 0);
    return { Values: totalValues, Day: day };
  });

  const chartData = {
    labels: completeData.map(item => `Day ${item.Day}`),
    datasets: [{
      data: completeData.map(item => item.Values),
    }],
  };

  const chartConfig = {
    backgroundGradientFrom: '#f0f0f0',
    backgroundGradientTo: '#f0f0f0',
    color: (opacity = 1) => `rgba(0, 84, 77, ${opacity})`,
    strokeWidth: 2,
  };

  const barWidth = 50; // Adjust bar width according to your need
  const chartWidth = completeData.length * barWidth; // Calculate total chart width

  return (
    <View style={styles.container}>
         <Text style={styles.titleBottom}>Access Denied for {selectedPersonName ? selectedPersonName : name}</Text>
      <ScrollView horizontal style={{ flex: 1 }}>
        <View>
          <BarChart
            style={{ marginBottom: 15 }}
            data={chartData}
            width={chartWidth} // Adjust width based on the number of data points
            height={220}
            yAxisLabel=""
            chartConfig={chartConfig}
            fromZero={true}
            showBarTops={true}
            showValuesOnTopOfBars={true}
          />
          <View style={[styles.overlay, { width: chartWidth }]}>
            {completeData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.touchableBar,
                  { left: index * barWidth, width: barWidth },
                ]}
                onPress={() => onClickHandler(`Day ${item.Day}`, item.Values)}
              />
            ))}
          </View>
        </View>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Day: {clickedData.day}</Text>
            <Text style={styles.modalText}>Value: {clickedData.value}</Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 220,
    flexDirection: 'row',
    zIndex: 1,
  },
  touchableBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#00544d",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  titleBottom: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: "center",
    marginBottom: 5,
},
});

export default CardByCardholderGraphDay;
