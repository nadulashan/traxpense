import React from 'react';
import { BarChart } from 'react-native-gifted-charts';

export default function Chart() {
    const barData = [{value: -15, label:'s'}, {value: 30, label:'s'}, {value: 26, label:'s'}, {value: 40, label:'s'}];
    return <BarChart 
      data={barData}
      // width={}
      barWidth={1}
      // spacing={1}
      roundedTop={true}
      barBorderTopLeftRadius={8}
      barBorderTopRightRadius={8}
      noOfSections={5}
      yAxisThickness={0}
      xAxisLabelTextStyle={{color:'pink'}}
      />;
}