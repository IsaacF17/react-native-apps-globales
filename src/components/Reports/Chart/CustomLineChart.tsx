import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface IChartProps {
  data: any;
  type: string;
  title: string;
}

const CustomLineChart = (props: IChartProps) => {

  const { data, type, title } = props;

  if (data) Object.assign(data, {legend: [`${title}`]})

  return (
    <View>
      {data &&
        <LineChart
          data={props?.data}
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
              fill: type === 'income' ? 'green' : 'red'
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 12,
            marginLeft: 8,
          }}
        />}
    </View>
  )
};

export default CustomLineChart;
