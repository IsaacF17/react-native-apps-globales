import { IScheduledMovement } from '../types/movements';
import { fromDateToUnix, getMonth } from './unix';

export const updateNextDates = (
  scheduledMovement: IScheduledMovement,
): IScheduledMovement => {
  const currentAsUnix = scheduledMovement.nextDate;
  const currentAsDate = new Date(currentAsUnix);
  let newNextDate: number;

  switch (scheduledMovement.periodicity) {
    case 'weekly': {
      newNextDate = currentAsUnix + 7 * 24 * 60 * 60 * 1000;
      break;
    }
    case 'biweekly': {
      newNextDate = currentAsUnix + 14 * 24 * 60 * 60 * 1000;
      break;
    }
    case 'monthly': {
      newNextDate = fromDateToUnix(
        new Date(currentAsDate.setUTCMonth(currentAsDate.getUTCMonth() + 1)),
      );
      break;
    }
    case 'annual': {
      newNextDate = fromDateToUnix(
        new Date(
          currentAsDate.setUTCFullYear(currentAsDate.getUTCFullYear() + 1),
        ),
      );
      break;
    }
  }

  if (newNextDate) {
    return { ...scheduledMovement, nextDate: newNextDate };
  }
  return scheduledMovement;
};
