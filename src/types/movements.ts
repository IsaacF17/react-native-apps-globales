export type MovementScheduleType = 'single' | 'scheduled';
export type MovementType = 'income' | 'expense';
export type MovementPeriodicity = 'weekly' | 'biweekly' | 'monthly' | 'annual';

interface Movement {
  id: string;
  userId: string;
  type: MovementType;
  name: string;
  details?: string;
  value: number;
}

export interface IMovement extends Movement {
  date: number; // Unix
}

export interface IScheduledMovement extends Movement {
  periodicity: MovementPeriodicity;
  nextDate: number; // Unix
}
