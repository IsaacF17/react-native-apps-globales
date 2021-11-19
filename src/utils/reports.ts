import { IChartDataItems } from '../types/chartData';
import { generateWeeksInfo, getMonth } from './dates';
import moment from 'moment';

export const checkDates = (fromDate: Date, toDate: Date) => {
  const data: any = [];
  let periods: any[] = []; // valores [Dias, Semanal, Quincenal, Mensual]

  const from = moment(fromDate);
  const to = moment(toDate);
  const diffByWeeks = to.diff(from, 'weeks');
  const diffByDays = to.diff(from, 'days');
  const diffByMonths = to.diff(from, 'months');

  if (diffByDays <= 7) periods.push('Días');
  else if (diffByWeeks <= 4) periods.push('Semanal');
  else if (diffByWeeks >= 4 && diffByWeeks <= 12) periods.push('Mensual');
  else {
    if (diffByMonths >= 2 && diffByMonths <= 12) periods.push('Mensual');
    else if (diffByMonths > 12) periods.push('Anual');
  }
  data.push(periods, diffByDays, diffByWeeks, diffByMonths);
  return data;
};

export const convertToMonthOrDayData = (
  array: IChartDataItems,
  unit: string,
) => {
  const data = {};
  let day = 'Vie';
  array.forEach(el => {
    let timeUnit: any = null;

    if (unit === 'day') timeUnit = new Date(el.date).getDate();
    else if (unit === 'month')
      timeUnit = getMonth(new Date(el.date).getMonth());

    if (data.hasOwnProperty(timeUnit)) {
      if (!data[timeUnit].hasOwnProperty(el.type))
        Object.assign(data[timeUnit], { [el.type]: Number(el.value) });
      else {
        const newValue = data[timeUnit][el.type] + Number(el.value);
        Object.assign(data[timeUnit], { [el.type]: newValue });
      }
    } else Object.assign(data, { [timeUnit]: { [el.type]: Number(el.value) } });
  });
  return convertToChartData(data);
};

export const convertToWeekData = (
  array: IChartDataItems,
  weeksNumber?: number,
) => {
  const startDate = array[0].date;
  const weeksTemplate = generateWeeksInfo(startDate, 3);
  const weeksData = {};
  const keys: any = [];

  for (let name in weeksTemplate) {
    keys.push(Object.keys(weeksTemplate[name]));
  }

  array.forEach(el => {
    const date = moment(el.date);

    keys.forEach(key => {
      const str = String(key).replace(/[^a-zA-Z0-9-/]/g, '');
      const dates = str.split('-');
      const fromDate = moment(dates[0]);
      const toDate = moment(dates[1]);
      const isBetween = date.isBetween(fromDate, toDate);

      if (isBetween) {
        if (weeksData.hasOwnProperty(key)) {
          if (!weeksData[key].hasOwnProperty(el.type))
            Object.assign(weeksData[key], { [el.type]: Number(el.value) });
          else {
            const newValue = weeksData[key][el.type] + Number(el.value);
            Object.assign(weeksData[key], { [el.type]: newValue });
          }
        } else
          Object.assign(weeksData, { [key]: { [el.type]: Number(el.value) } });
      }
    });
  });
  return convertToChartData(weeksData);
};

const convertToChartData = (data: any) => {
  // convierte los datos en un JSON legible para los Gráficos
  const chartObjectExpenses = {};
  const chartObjectIncomes = {};
  const chartObjectFlow = {};
  const chartObjectComparison = {};

  const keys = Object.keys(data);
  const expenses: any = [];
  const incomes: any = [];
  const moneyFlow: any = [];

  Object.assign(chartObjectExpenses, { labels: [...keys] });
  Object.assign(chartObjectIncomes, { labels: [...keys] });
  Object.assign(chartObjectFlow, { labels: [...keys] });
  Object.assign(chartObjectComparison, { labels: [...keys] });

  Object.entries(data).forEach(([key, value]: any) => {
    if (value.expense) expenses.push(value.expense);
    if (value.income) incomes.push(value.income);
  });

  const arrayLegth =
    incomes.length > expenses.length ? incomes.length : expenses.length;

  for (let i = 0; i < arrayLegth; i++) {
    const val = (incomes[i] || 0) - (expenses[i] || 0);
    moneyFlow.push(val);
  }

  Object.assign(chartObjectIncomes, { datasets: [{ data: [...incomes] }] });
  Object.assign(chartObjectExpenses, { datasets: [{ data: [...expenses] }] });
  Object.assign(chartObjectComparison, {
    datasets: [
      { data: [...expenses], color: (opacity = 1) => `red` },
      { data: [...incomes], color: (opacity = 1) => `green` },
      { data: [...moneyFlow], color: (opacity = 0.5) => `blue` },
    ],
  });
  Object.assign(chartObjectFlow, { datasets: [{ data: [...moneyFlow] }] });

  //Debug purpose logs
  //console.log("Expenses", JSON.stringify(chartObjectExpenses, null, 1));
  //console.log("Incomes", JSON.stringify(chartObjectIncomes, null, 1));
  //console.log("Flujo", JSON.stringify(chartObjectFlow, null, 1));

  return [
    chartObjectIncomes,
    chartObjectExpenses,
    chartObjectComparison,
    chartObjectFlow,
  ];
};
