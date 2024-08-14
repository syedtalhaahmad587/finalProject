import React , { useContext }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { AppContext } from '../Context/AppContext';

const PeopleEntryPerHour = () => {
  const { summary , entryDataSearch  , themeColor} = useContext(AppContext);
  // Data for the bar chart
  const data = [
    { Values: 1, Hour: '5 AM' },
    { Values: 6, Hour: '6 AM' },
    { Values: 11, Hour: '7 AM' },
    { Values: 7, Hour: '8 AM' },
    { Values: 4, Hour: '9 AM' },
    { Values: 6, Hour: '10 AM' },
  ];

  // Gradient definitions for different colors
  const BlueGradient = () => (
    <Defs key={'blueGradient'}>
      <LinearGradient id={'blueGradient'} x1={'0'} y1={'0'} x2={'0'} y2={'100%'}>
        <Stop offset={'50%'} stopColor={'#808080'} />
        <Stop offset={'50%'} stopColor={'#448EE4'} />
      </LinearGradient>
    </Defs>
  );

  // Calculate the maximum value for setting content inset
  // const maxValues = Math.max(...data.map(item => item.Values));
  const contentInset = { top: 10, bottom: 10 }; // Adjust content inset as needed

  return (
    <View  style={[styles.container , { backgroundColor: themeColor }]}>
      <View style={styles.greenBackground}>
        <View style={styles.card}>
          <View style={styles.chartContainer}>
            <BarChart
              style={styles.chart}
              data={entryDataSearch}
              yAccessor={({ item }) => item.Values}
              svg={{
                fill: 'url(#blueGradient)', // Use blue gradient for bars
              }}
              contentInset={contentInset}
              gridMin={0}
            >
              <Grid />
              <BlueGradient />
            </BarChart>
            <View style={styles.labelsContainer}>
              {/* {data.map((item, index) => (
                <Text key={index} style={styles.chartLabel}>
                  {item.Hour}
                </Text>
              ))} */}
            </View>
          </View>
        </View>
        <View style={styles.text_inner_grah}>
        <Text style={styles.chartText_active}>People Entry Per Hour</Text>
        <Text style={styles.chartText_num}>{summary?.Total_Entry}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 100,
    height: 150, // Adjusted height to accommodate the chart and labels
    marginBottom: 100,
    // width:"100%",
    borderRadius: 20,
  },
  greenBackground: {
    alignItems: 'center',
    borderRadius: 20,
    position: "absolute",
    top: -50,
    width: '100%', // Ensure full width within the container
  },
  card: {
    backgroundColor: '#ffffff', // White background color for the card
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
    borderWidth: 2,
    marginBottom: 5,
    height: 135,
    width:125,
    width: 120, // Ensure full width within the card
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // Ensure full width within the chart container
  },
  chart: {
    height: 104, // Adjusted height for the bar chart
    width: 100,
  },
  labelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '90%', // 90% of the container width
    paddingHorizontal: 20, // Add horizontal padding for better spacing
  },
  chartLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000', // Adjust label color as needed
    flex: 1, // Allow flex to distribute space evenly
  },
  chartText_active: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    width:"100%"
    // marginTop: 5,
  },
  chartText_num: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
    marginTop: -12,
  },
  
});

export default PeopleEntryPerHour;
