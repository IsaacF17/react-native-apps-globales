export interface IMovement {
  id?: string;
  type: 'income' | 'expense';
  name: string;
  value: number;
  nextDate: string;
  periodicity: 'single' | 'weekly' | 'biweekly' | 'monthly' | 'annual';
}
