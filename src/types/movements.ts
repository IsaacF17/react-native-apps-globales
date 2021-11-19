export type MovementScheduleType = 'single' | 'scheduled';
export type MovementType = 'income' | 'expense';
export type MovementPeriodicity = 'weekly' | 'biweekly' | 'monthly' | 'annual';

interface Movement {
  id: string;
  userId: string;
  category: string;
  type: MovementType;
  name: string;
  details?: string;
  value: number;
  iconCategoryName: string;
}

export interface IMovement extends Movement {
  date: number; // Unix
}

export interface IScheduledMovement extends Movement {
  periodicity: MovementPeriodicity;
  nextDate: number; // Unix
}
