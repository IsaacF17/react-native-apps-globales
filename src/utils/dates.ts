import { toInteger } from 'lodash';

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
