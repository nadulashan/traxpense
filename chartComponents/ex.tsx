import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LineChart } from 'react-native-gifted-charts';

export default function Chart() {
  // Your 7-day dashboard data layout
  const lineData = [
    { value: 150, label: 'Mon' },
    { value: 230, label: 'Tue' },
    { value: 224, label: 'Wed' },
    { value: 218, label: 'Thu' },
    { value: 135, label: 'Fri' },
    { value: 147, label: 'Sat' },
    { value: 260, label: 'Sun' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Performance</Text>
      
      <View style={styles.chartWrapper}>
        <LineChart
          data={lineData}
          areaChart // Turns it into a sleek area chart
          initialSpacing={20}
          textColor1="#333"
          textFontSize={12}
          // Styling the line and gradient
          color="#007FFF"
          thickness={3}
          startFillColor="rgba(0, 127, 255, 0.4)"
          endFillColor="rgba(0, 127, 255, 0.01)"
          // Customizing grid behavior
          noOfSections={4}
          yAxisColor="#cbd5e1"
          xAxisColor="#cbd5e1"
          dataPointsColor="#0056b3"
          pointerConfig={{
            pointerStripColor: '#007FFF',
            pointerStripWidth: 2,
            strokeDashArray: [2, 5],
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  chartWrapper: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3, // Shadow for Android devices
  },
});