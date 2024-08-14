import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { AppContext } from '../Context/AppContext';

const AlarmPerChart = () => {
  const { summary, alarmData , themeColor } = useContext(AppContext);

  // Check if alarmData is available and not empty
  const hasData = alarmData && alarmData.length > 0;

  const data = {
    series: alarmData.map(item => item.Values), // Use Values for series data
    options: {
      labels: alarmData.map(item => item.Hour), // Use Hour for labels dynamically
      colors: ['#808080', '#448EE4', '#FF6347', '#FFD700', '#8A2BE2', '#7FFF00', '#DC143C', '#00FFFF', '#FF8C00', '#00FA9A', '#1E90FF', '#FF00FF'],
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '5pt', // Adjust font size as needed
        }
      },
      tooltip: {
        enabled: false,
      }
    }
  };

  // Create HTML content for the chart
  const chartHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            text-align: center;
            background-color: transparent;
          }
        
        </style>
      </head>
      <body>
        <div id="chart"></div>
        <script>
          var options = ${JSON.stringify(data.options)};
          options.series = ${JSON.stringify(data.series)};
          options.chart = { type: 'pie', height: 160, width: 160 };
          
          var chart = new ApexCharts(document.querySelector("#chart"), options);
          chart.render();
        </script>
      </body>
    </html>
  `;

  return (
    <View style={[styles.container , { backgroundColor: themeColor }]}>
      <View style={styles.greenBackground}>
        <View style={styles.card}>
          <View style={styles.chartContainer}>
            {hasData ? (
              <WebView
                originWhitelist={['*']}
                source={{ html: chartHtml }}
                style={styles.webView} // Adjust dimensions as needed
              />
            ) : (
              <Text style={styles.noDataText}>No data available</Text>
            )}
          </View>
        </View>
        <Text style={styles.chartText_active}>Alarms Per Hour</Text>
        <Text style={styles.chartText_num}>{summary?.Total_Alarm}</Text>
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
    height: 150, // Set height to 150
    marginBottom: 100,
    borderRadius: 20,
  },
  greenBackground: {
    alignItems: 'center',
    borderRadius: 20,
    position: 'absolute',
    top: -50,
  },
  card: {
    backgroundColor: '#ffffff', // White background color for the card
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
    borderWidth: 2,
    height: 135,
    width: 125,
    marginBottom: 5,
  },
  noDataText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 30,
    // color: '#ff0000', // Red color for no data message
  },
  chartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    marginTop:-10,
    height: 120,
    width: 120, // Adjust dimensions as needed
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

export default AlarmPerChart;
