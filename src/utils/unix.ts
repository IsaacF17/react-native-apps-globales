// Parsers

export const unixToShortDate = (date: number): string => {
  const fullYear = getFullYear(date);
  const month = getMonth(date) + 1;
  const dayOfMonth = getDayOfMonth(date);
  return `${dayOfMonth < 10 ? '0' : ''}${dayOfMonth}/${
    month < 10 ? '0' : ''
  }${month}/${fullYear}`;
};

export const unixToShortDateTime = (date: number): string => {
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const seconds = getSeconds(date);
  return `${unixToShortDate(date)} ${hours < 10 ? '0' : ''}${hours}:${
    minutes < 10 ? '0' : ''
  }${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const fromDateToUnix = (date: Date, reset?: boolean): number =>
  reset ? resetDay(date.getTime()) : date.getTime();

// Getters

export const getToday = (): number => resetDay(Date.now());

export const getYesterday = (): number => getToday() - 24 * 60 * 60 * 1000;

export const getTomorrow = (): number => getToday() + 24 * 60 * 60 * 1000;

export const getThisWeekUnixRange = (): {
  thisMonday: number;
  nextMonday: number;
} => {
  const today = getToday();
  let dayOfWeek = getDayOfWeek(today) - 1;
  if (dayOfWeek === -1) {
    dayOfWeek = 6;
  }

  const thisMonday = today - dayOfWeek * 24 * 60 * 60 * 1000;
  const nextMonday = today + (7 - dayOfWeek) * 24 * 60 * 60 * 1000;

  return {
    thisMonday,
    nextMonday,
  };
};

// Atomic Getters

export const simulateCRDate = (date: number): Date =>
  new Date(date - 6 * 60 * 60 * 1000);

export const getFullYear = (date: number): number =>
  simulateCRDate(date).getUTCFullYear();

export const getMonth = (date: number): number =>
  simulateCRDate(date).getUTCMonth();

export const getDayOfMonth = (date: number): number =>
  simulateCRDate(date).getUTCDate();

export const getDayOfWeek = (date: number): number =>
  simulateCRDate(date).getUTCDay();

export const getHours = (date: number): number =>
  simulateCRDate(date).getUTCHours();

export const getMinutes = (date: number): number =>
  simulateCRDate(date).getUTCMinutes();

export const getSeconds = (date: number): number =>
  simulateCRDate(date).getUTCSeconds();

export const resetDay = (date: number): number =>
  new Date(
    getFullYear(date),
    getMonth(date),
    getDayOfMonth(date),
    0,
    0,
    0,
    0,
  ).getTime() +
  60 * 60 * 1000;
