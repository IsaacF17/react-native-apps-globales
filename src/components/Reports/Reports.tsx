import RNDateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { SafeAreaView, View, Text, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import { getReportData } from '../../firebase/Reports';
import useToggleButtonGroup, {
  IUseToggleButtonGroupReturn,
} from '../../hooks/useToggleButtonGroup';
import {
  checkDates,
  convertToMonthOrDayData,
  convertToWeekData,
} from '../../utils/reports';
import { fromDateToUnix } from '../../utils/unix';
import { CustomBarChart } from '../common/Charts/CustomBarChart';
import CustomLineChart from '../common/Charts/CustomLineChart';
import { DatePickers } from './DatePickers/DatePickers';
import styles from './styles';

export const Reports = () => {
  const [ToggleButtonGroup, selectedTypes]: IUseToggleButtonGroupReturn =
    useToggleButtonGroup({
      buttons: ['Ingresos', 'Gastos'],
      safeToggle: true,
      initialSelectedIndexes: [0],
    });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [activeDatePicker, setActiveDatePicker] = useState<string>(''); // possible values from - to - undefined

  const [fromDate, setFromDate] = useState<any>();
  const [toDate, setToDate] = useState<any>();

  const [chartExpenses, setChartExpenses] = useState<any>();
  const [chartIncomes, setChartIncomes] = useState<any>();
  const [chartFlow, setChartFlow] = useState<any>();
  const [chartComparison, setChartComparison] = useState<any>();

  const [chartsVisibility, setChartsVisibility] = useState<{
    chart_incomes: boolean;
    chart_expenses: boolean;
  }>({
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
  };

  React.useEffect(() => {
    if (selectedTypes.length === 1)
      selectedTypes[0] === 0
        ? setChartsVisibility({ chart_expenses: false, chart_incomes: true })
        : setChartsVisibility({ chart_incomes: false, chart_expenses: true });
    else setChartsVisibility({ chart_expenses: true, chart_incomes: true });
  }, [selectedTypes]);

  const test = async () => {
    if (fromDate && toDate) {
      const dbData = await getReportData(
        fromDateToUnix(fromDate),
        fromDateToUnix(toDate),
      );
      if (dbData) {
        let chartData: any = null;
        const decisionData = await checkDates(fromDate, toDate);
        if (
          decisionData[0].length === 1 &&
          (decisionData[0][0] === 'Días' || decisionData[0][0] === 'Mensual')
        ) {
          const param = decisionData[0][0] === 'Mensual' ? 'month' : 'day';
          chartData = convertToMonthOrDayData(dbData, param);
        } else if (
          decisionData[0].length === 1 &&
          decisionData[0][0] === 'Semanal'
        ) {
          chartData = convertToWeekData(dbData, decisionData[2]);
        }
        if (chartData[0]) setChartIncomes(chartData[0]);
        if (chartData[1]) setChartExpenses(chartData[1]);
        if (chartData[2]) setChartComparison(chartData[2]);
        if (chartData[2]) setChartFlow(chartData[3]);
      }
    }
  };

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
          toDateValue={toDate}
        />
        <View>
          <Button title="Generar" onPress={test} buttonStyle={styles.button} />
        </View>
        <View style={styles.filersContainer}>{ToggleButtonGroup}</View>
        <View style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {chartsVisibility.chart_incomes && chartsVisibility.chart_expenses && (
              <>
                <CustomLineChart data={chartComparison} title="Flujo" />
                <CustomBarChart
                  data={chartFlow}
                  type="expense"
                  title="Gastos"
                />
              </>
            )}
            {chartsVisibility.chart_expenses &&
              !chartsVisibility.chart_incomes && (
                <CustomBarChart
                  data={chartExpenses}
                  type="expense"
                  title="Gastos"
                />
              )}
            {chartsVisibility.chart_incomes &&
              !chartsVisibility.chart_expenses && (
                <CustomBarChart
                  data={chartIncomes}
                  type="income"
                  title="Ingresos"
                />
              )}
          </ScrollView>
        </View>
        {isDatePickerOpen && (
          <RNDateTimePicker
            mode="date"
            value={
              activeDatePicker
                ? activeDatePicker === 'from'
                  ? fromDate
                    ? fromDate
                    : new Date()
                  : toDate
                  ? toDate
                  : new Date()
                : new Date()
            }
            testID="from-date"
            onChange={setDate}
            minimumDate={
              fromDate && activeDatePicker === 'to' ? fromDate : null
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};
