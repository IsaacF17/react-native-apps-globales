import { IScheduledMovement } from '../types/movements';
import { parseToUnix } from './dates';

export const updateNextDates = (
  scheduledMovement: IScheduledMovement,
): IScheduledMovement => {
  let newNextDate: number | null = null;
  if (scheduledMovement.periodicity === 'weekly') {
    newNextDate = scheduledMovement.nextDate + 7 * 24 * 60 * 60 * 1000;
  } else if (scheduledMovement.periodicity === 'biweekly') {
    newNextDate = scheduledMovement.nextDate + 14 * 24 * 60 * 60 * 1000;
  } else if (scheduledMovement.periodicity === 'monthly') {
    let asDate = new Date(scheduledMovement.nextDate);
    if (asDate.getMonth() === 12) {
      asDate = new Date(asDate.setFullYear(asDate.getFullYear() + 1));
      asDate = new Date(asDate.setMonth(0));
    } else {
      asDate = new Date(asDate.setMonth(asDate.getMonth() + 1));
    }
    newNextDate = parseToUnix(asDate) ?? 1;
  } else {
    let asDate = new Date(scheduledMovement.nextDate);
    asDate = new Date(asDate.setFullYear(asDate.getFullYear() + 1));
    newNextDate = parseToUnix(asDate) ?? 1;
  }
  if (newNextDate) {
    return { ...scheduledMovement, nextDate: newNextDate ?? 1 };
  }
  return scheduledMovement;
};
