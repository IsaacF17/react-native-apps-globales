import moment from 'moment';
import { toInteger } from 'lodash';

const months = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const formatShortDate = (date: Date) => {
  const splittedDate = date
    .toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
    })
    .split('/');
  return `${splittedDate[1]}/${splittedDate[0]}/${splittedDate[2]}`;
};

export const getMonth = (month: number) => {
  return months[month];
};

export const generateWeeksInfo = (startDate: any, weeksNumber: number) => {
  const data: any[] = [];
  let date = moment(startDate);

  for (let i = 0; i < weeksNumber; i++) {
    const toDate = moment(date).add(7, 'days');
    const week = `${date.format('MM/DD/YY')} - ${toDate.format('MM/DD/YY')}`;
    data.push({ [week]: {} });
    date = moment(toDate).add(1, 'days');
  }
  //console.log(data);

  return data;
};
export const formatShortDateAndTime = (date: Date) => {
  return `${formatShortDate(
    date,
  )} - ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
};

export const parseToDate = (date: string) => {
  try {
    const splittedDate = date.split('/');
    return new Date(
      toInteger(splittedDate[2]),
      toInteger(splittedDate[1]),
      toInteger(splittedDate[0]),
    );
  } catch (error) {
    console.log(`Error parsing date: ${date}\nError: ${error}`);
    return new Date();
  }
};
