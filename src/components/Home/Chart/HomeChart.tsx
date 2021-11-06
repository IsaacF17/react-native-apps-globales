import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const HomeChart = () => (
  <View>
    <LineChart
      data={{
        labels: ['Enero', 'Febrero', 'Marzo'],
        datasets: [
          {
            data: [19000, 28000, 24000],
          },
        ],
      }}
      width={Dimensions.get('window').width - 15} // from react-native
      height={200}
      yAxisLabel="₡"
      //yAxisSuffix="k"
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: '#1D1A31',
        backgroundGradientFrom: '#1D1A31',
        backgroundGradientTo: '#1D1A31',
        decimalPlaces: 0, // optional, defaults to 2dp
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
          borderRadius: 16,
        },
        propsForDots: {
          r: '3',
          strokeWidth: '3',
          stroke: '#FFFF',
        },
      }}
      bezier
      style={{
        marginVertical: 8,
        borderRadius: 12,
        marginLeft: 8,
      }}
    />
  </View>
);

export default HomeChart;
