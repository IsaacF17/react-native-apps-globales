import React, { createContext } from 'react';
import {
  IMovement,
  IScheduledMovement,
  MovementScheduleType,
  MovementType,
} from '../types/movements';

export interface INewMovementContextState {
  isModalOpen: boolean;
}

export interface INewMovementContextDispatchers {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setInitialType: React.Dispatch<React.SetStateAction<MovementType>>;
  setInitialScheduleType: React.Dispatch<
    React.SetStateAction<MovementScheduleType>
  >;
  setEditingMovement: React.Dispatch<React.SetStateAction<IMovement | null>>;
  setEditingScheduledMovement: React.Dispatch<
    React.SetStateAction<IScheduledMovement | null>
  >;
  removeSingleMovement: (id: string) => Promise<void>;
  removeScheduledMovement: (id: string) => Promise<void>;
}

export type INewMovementContext = INewMovementContextState &
  INewMovementContextDispatchers;

export default createContext<INewMovementContext>({} as INewMovementContext);
