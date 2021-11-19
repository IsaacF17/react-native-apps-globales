import React from 'react';
import { View, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

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
            yAxisInterval={2} // optional, defaults to 1
            chartConfig={{
              backgroundGradientFrom: '#2B7C85',
              backgroundGradientTo: '#87ACA3',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `#183339`,
              labelColor: (opacity = 1) => `#e5ebec`,
              style: {
                borderRadius: 16,
              },
            }}
            yLabelsOffset={10}
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
