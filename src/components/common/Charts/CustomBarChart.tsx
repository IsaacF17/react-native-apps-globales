import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';

interface IChartProps {
  data: any;
  title: string;
  type?: string;
}

export const CustomBarChart = (props: IChartProps) => {
  const { data, title } = props;
  if (data) Object.assign(data, { legend: [`${title}`] });

  return (
    <>
      {data && (
        <View>
          <BarChart
            data={data}
            width={Dimensions.get('window').width - 15} // from react-native
            height={200}
            yAxisLabel="₡"
            yAxisSuffix=""
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: '#1D1A31',
              backgroundGradientFrom: '#374A67',
              backgroundGradientTo: '#4E4F6A',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={{
              marginVertical: 8,
              borderRadius: 12,
              marginLeft: 8,
            }}
          />
        </View>
      )}
    </>
  );
};
