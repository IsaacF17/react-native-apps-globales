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

export const parseToUnix = (
  date: Date | string | undefined,
): number | undefined => {
  if (typeof date === 'string') {
    return formatDateAsUnix(parseToDate(date));
  } else if (date) {
    return formatDateAsUnix(date);
  }
};

export const removeTime = (date: Date | number): Date => {
  let asDate: Date | null = null;
  if (typeof date === 'number') {
    asDate = new Date(date);
  } else {
    asDate = date;
  }
  asDate = new Date(
    asDate.getFullYear(),
    asDate.getMonth(),
    asDate.getDate(),
    0,
    0,
    0,
    0,
  );
  return new Date(asDate.getTime() - 5 * 60 * 60 * 1000);
};

export const getTodayAsUnix = (): number => {
  let today = new Date();
  if (today.getHours() < 6) {
    today = new Date(today.getTime() - 6 * 60 * 60 * 1000);
  }
  return today.getTime();
};

export const getTodayAsDate = (): Date => new Date(getTodayAsUnix());

export const formatDateAsUnix = (date: Date): number =>
  removeTime(date).getTime();

export const getTomorrowAsUnix = (): number =>
  getTodayAsUnix() + 24 * 60 * 60 * 1000;

export const getThisWeekUnixRange = (): {
  mondayUnix: number;
  nextMondayUnix: number;
} => {
  const nowAsUnix = getTodayAsUnix();

  const dayOfWeek = new Date(nowAsUnix).getDay();

  const mondayUnix = nowAsUnix - dayOfWeek * 24 * 60 * 60 * 1000;
  const nextMondayUnix = nowAsUnix + (7 - dayOfWeek) * 24 * 60 * 60 * 1000;

  return {
    mondayUnix,
    nextMondayUnix,
  };
};
