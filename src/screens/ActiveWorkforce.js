import React , { useContext }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart, Grid } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { AppContext } from '../Context/AppContext';

const ActiveWorkforce = () => {
  // Dummy data for the bar chart
  const { summary , exitData , themeColor } = useContext(AppContext);
  const data = [
    {  value: summary?.Active_Person }
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

  const GrayGradient = () => (
    <Defs key={'grayGradient'}>
      <LinearGradient id={'grayGradient'} x1={'0'} y1={'0'} x2={'0'} y2={'100%'}>
        <Stop offset={'0%'} stopColor={'rgba(169,169,169,0.8)'} />
        <Stop offset={'100%'} stopColor={'rgba(192,192,192,0.8)'} />
      </LinearGradient>
    </Defs>
  );

  return (
    <View style={[styles.container , { backgroundColor: themeColor }]}>
      <View style={styles.greenBackground}>
        <View style={styles.card}>
          <View style={styles.chartContainer}>
            <BarChart
              style={styles.chart}
              data={data}
              yAccessor={({ item }) => item.value}
              svg={{
                fill: 'url(#blueGradient)', // Use blue gradient for bars
              }}
              contentInset={{ top: 5, bottom: 5 }}
              gridMin={0}
            >
              <Grid />
              <BlueGradient />
            </BarChart>
            <Text style={styles.chartText}>{data[0].value}</Text>
          </View>
        </View>
        <Text style={styles.chartText_active}>Active Workforce</Text>
        <Text style={styles.chartText_num}>{summary?.Active_Person}</Text>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00544d', // Green background color
    padding: 20,
    marginTop: 100,
    height: 150, // Adjusted height to accommodate the chart and labels
    marginBottom: 100,
    borderRadius: 20,
  },
  greenBackground: {
    alignItems: 'center',
    borderRadius: 20,
    position: "absolute",
    top: -50
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
  },
  chartContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    height: 89,
    width: 100,
  },
  chartText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  chartText_active: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  chartText_num: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
});

export default ActiveWorkforce;
