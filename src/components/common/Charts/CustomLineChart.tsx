import React from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

interface IChartProps {
  data: any;
  titles?: Array<string>;
  type?: string;
}

const CustomLineChart = (props: IChartProps) => {
  const { data, type, titles } = props;

  if (data) Object.assign(data, { legend: titles });

  return (
    <View>
      {data && (
        <LineChart
          data={props?.data}
          width={Dimensions.get('window').width - 15} // from react-native
          height={200}
          yAxisLabel="₡"
          //yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundGradientFrom: '#2B7C85',
            backgroundGradientTo: '#87ACA3',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `#FBE5C8`,
            labelColor: (opacity = 1) => `#e5ebec`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              fill: type ? (type === 'income' ? 'green' : 'red') : 'white',
            },
          }}
          bezier
          yLabelsOffset={6}
          style={{
            marginVertical: 8,
            borderRadius: 12,
            marginLeft: 8,
          }}
        />
      )}
    </View>
  );
};

export default CustomLineChart;
