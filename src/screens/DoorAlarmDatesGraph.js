import React, { useState, useContext } from 'react';
import { View, StyleSheet, ScrollView, Text, Modal, TouchableOpacity, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import moment from "moment";
import { AppContext } from '../Context/AppContext';

const screenWidth = Dimensions.get("window").width;

const DoorDayGraph = () => {
  const { Device_DeniedDaySum } = useContext(AppContext);
  const [clickedData, setClickedData] = useState({ date: null, value: null });
  const [modalVisible, setModalVisible] = useState(false);

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const onClickHandler = (label, value) => {
    const clickedData = Device_DeniedDaySum.find((item) => item.Period === label);
    const clickedDate = moment(clickedData?.Period, "ddd DD/MM").format("YYYY-MM-DD");
    setClickedData({ date: clickedDate, value: value });
    setModalVisible(true);
  };

  const formattedData = daysOfWeek.map((day) => {
    const foundItem = Device_DeniedDaySum.find((item) => item.Period && item.Period.startsWith(day));
    return {
      Period: `${day} ${moment().format("DD/MM")}`, // Adjust the format as needed
      Door_Forced: foundItem ? foundItem.Door_Forced : 0,
      Door_Held: foundItem ? foundItem.Door_Held : 0
    };
  });

  const dayLabels = formattedData.map((item) => item.Period);

  const data = {
    labels: dayLabels,
    datasets: [
      {
        data: formattedData.map((item) => item.Door_Forced),
        color: (opacity = 1) => `rgba(32, 142, 121, ${opacity})`, // Bar color
      },
      {
        data: formattedData.map((item) => item.Door_Held),
        color: (opacity = 1) => `rgba(7, 45, 38, ${opacity})`, // Bar color
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const barWidth = 40; // Adjust bar width according to your need
  const chartWidth = daysOfWeek.length * barWidth * 2; // Calculate total chart width

  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <BarChart
            data={data}
            width={chartWidth} // Adjust width based on the number of data points
            height={250}
            yAxisLabel=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
            fromZero={true}
            showBarTops={true}
            showValuesOnTopOfBars={true}
            style={{ borderRadius: 10 }}
          />
          <View style={[styles.overlay, { width: chartWidth }]}>
            {dayLabels.map((label, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.touchableBar,
                  { left: index * barWidth * 2, width: barWidth * 2 },
                ]}
                onPress={() => onClickHandler(label, data.datasets[0].data[index])}
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
            <Text style={styles.modalText}>Date: {clickedData.date}</Text>
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
      <Text style={styles.date_m}>Date</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 250,
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
  date_m: {
    paddingTop: 0
  }
});

export default DoorDayGraph;
