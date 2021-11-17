import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import useToggleButtonGroup, { IUseToggleButtonGroupReturn } from '../../hooks/useToggleButtonGroup';
import { checkDates, convertToMonthOrDayData, convertToWeekData } from '../../utils/reports';
import CustomLineChart from './Chart/CustomLineChart';
import { testDayData, weekTestData } from './data';
import { DatePickers } from './DatePickers/DatePickers';
import styles from './styles';
import { VisualizationOptions } from './VisualizationOptions/VisualizationOptions';


export const Reports = () => {

  const [ToggleButtonGroup, selectedTypes]: IUseToggleButtonGroupReturn =
    useToggleButtonGroup({
      buttons: ['Ingresos', 'Gastos'],
      safeToggle: true,
      initialSelectedIndexes: [0],
    });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [activeDatePicker, setActiveDatePicker] = useState<string>('') // possible values from - to - undefined

  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();

  const [chartExpenses, setChartExpenses] = useState<any>();
  const [chartIncomes, setChartIncomes] = useState<any>();
  const [chartsVisibility, setChartsVisibility] = useState<{ chart_incomes: boolean, chart_expenses: boolean }>({
    chart_incomes: false,
    chart_expenses: false,
  });


  const setDate = (event, date) => {
    setIsDatePickerOpen(false);
    setActiveDatePicker('');
    if (date !== undefined) {
      if (activeDatePicker === 'from') setFromDate(date);
      else if (activeDatePicker === 'to') setToDate(date);
    }
  };



  const clearDate = (datePicker: string) => {
    if (datePicker === 'from') setFromDate(null);
    else setToDate(null);
  }

  React.useEffect(() => {
    if (selectedTypes.length === 1) 
      selectedTypes[0] === 0 
        ? setChartsVisibility({chart_expenses: false, chart_incomes: true}) 
        : setChartsVisibility({chart_incomes:false, chart_expenses: true}) 
    else setChartsVisibility({chart_expenses: true, chart_incomes: true})  
  }, [selectedTypes])

  const test = () => {
    if (fromDate && toDate) {
      let chartData: any = null;
      const data = checkDates(fromDate, toDate);
      if (data[0].length === 1 && (data[0][0] === 'Días' || data[0][0] === 'Mensual')) {
        const param = data[0][0] === 'month' ? 'dia' : 'month';
        chartData = convertToMonthOrDayData(testDayData, 'day');
      } else if (data[0].length === 1 && data[0][0] === 'Semanal'){
        chartData = convertToWeekData(weekTestData, 2);
      }
      setChartIncomes(chartData[0]);
      setChartExpenses(chartData[1]);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <View>
          <Text style={styles.headerTitle}>Reportes</Text>
        </View>
        <DatePickers
          showCalendar={setIsDatePickerOpen}
          setActiveDatePicker={setActiveDatePicker}
          clearDate={clearDate}
          fromDateValue={fromDate}
          toDateValue={toDate} />
        <View>
          <Button title="Generar" onPress={test} buttonStyle={styles.button} />
        </View>
        <View style={styles.filersContainer}>{ToggleButtonGroup}</View>
        {/* <VisualizationOptions/> */}
        <View>
          {
            chartsVisibility.chart_expenses &&
            <CustomLineChart data={chartExpenses} type="expense" title="Gastos" />
          }
          {
            chartsVisibility.chart_incomes &&
            <CustomLineChart data={chartIncomes} type="income" title="Ingresos" />
          }
          {/* <CustomBarChart data={convertToMonthData(testData)} /> */}
        </View>
        {isDatePickerOpen && (
          <RNDateTimePicker
            mode="date"
            value={activeDatePicker ?
              activeDatePicker === 'from'
                ? (fromDate ? fromDate : new Date())
                : (toDate ? toDate : new Date())
              : new Date()}
            testID="from-date"
            onChange={setDate}
            minimumDate={fromDate && activeDatePicker === 'to' ? fromDate : null}
          />
        )}
      </View>
    </SafeAreaView>
  );
}