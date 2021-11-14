export type MovementScheduleType = 'single' | 'scheduled';
export type MovementType = 'income' | 'expense';
export type MovementPeriodicity = 'weekly' | 'biweekly' | 'monthly' | 'annual';

interface Movement {
  id: string;
  type: MovementType;
  name: string;
  details?: string;
  value: number;
}

export interface IMovement extends Movement {
  date: string;
}

export interface IScheduledMovement extends Movement {
  periodicity: MovementPeriodicity;
  nextDate: string;
}
