import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  IMovement,
  IScheduledMovement,
  MovementScheduleType,
  MovementType,
} from '../types/movements';
import MovementService from '../firebase/Movement';
import ScheduledService from '../firebase/Scheduled';
import GlobalContext from '../contexts/GlobalContext';
import NewMovementContext, {
  INewMovementContext,
} from '../contexts/NewMovementContext';
import ModalAddNewMovement from '../components/Modals/AddNewMovement/ModalAddNewMovement';

const NewMovementProvider: React.FC = ({ children }) => {
  const { user, setMovementList, setScheduledMovements } =
    useContext(GlobalContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [initialType, setInitialType] = useState<MovementType>('income');
  const [initialScheduleType, setInitialScheduleType] =
    useState<MovementScheduleType>('single');
  const [editingMovement, setEditingMovement] = useState<IMovement | null>(
    null,
  );
  const [editingScheduledMovement, setEditingScheduledMovement] =
    useState<IScheduledMovement | null>(null);

  const resetStates = () => {
    setInitialType('income');
    setInitialScheduleType('single');
    setEditingMovement(null);
    setEditingScheduledMovement(null);
  };

  const submitNewSingleMovement = async (data: IMovement) => {
    data.userId = user.id;
    const newId = await MovementService.add(data);
    if (newId) {
      setMovementList(prevState => [{ ...data, id: newId }, ...prevState]);
    }
    setIsModalOpen(false);
  };

  const updateSingleMovement = async (newData: IMovement) => {
    newData.userId = user.id;
    console.log('updating movement:', newData);
    const response = await MovementService.update(newData);
    if (response) {
      setMovementList(prevState =>
        prevState.map(movement =>
          movement.id === newData.id ? newData : movement,
        ),
      );
    }
    setIsModalOpen(false);
  };

  const removeSingleMovement = async (id: string) => {
    const response = await MovementService.remove(id, user.id);
    if (response) {
      setMovementList(prevState =>
        prevState.filter(movement => movement.id !== id),
      );
    }
  };

  const submitNewScheduledMovement = async (data: IScheduledMovement) => {
    data.userId = user.id;
    const newId = await ScheduledService.add(data);
    if (newId) {
      setScheduledMovements(prevState => [
        { ...data, id: newId },
        ...prevState,
      ]);
    }
    setIsModalOpen(false);
  };

  const updateScheduledMovement = async (newData: IScheduledMovement) => {
    newData.userId = user.id;
    const response = await ScheduledService.update(newData, user.id);
    if (response) {
      setScheduledMovements(prevState =>
        prevState.map(movement =>
          movement.id === newData.id ? newData : movement,
        ),
      );
    }
    setIsModalOpen(false);
  };

  const removeScheduledMovement = async (id: string) => {
    const response = await ScheduledService.remove(id, user.id);
    if (response) {
      setScheduledMovements(prevState =>
        prevState.filter(movement => movement.id !== id),
      );
    }
  };

  const contextValue: INewMovementContext = {
    isModalOpen,
    setIsModalOpen,
    setInitialType,
    setInitialScheduleType,
    setEditingMovement,
    setEditingScheduledMovement,
    removeSingleMovement,
    removeScheduledMovement,
  };

  return (
    <NewMovementContext.Provider value={contextValue}>
      <View style={{ flex: 1 }}>
        {children}
        <ModalAddNewMovement
          isModalOpen={isModalOpen}
          initialType={initialType}
          initialScheduleType={initialScheduleType}
          editingMovement={editingMovement}
          editingScheduledMovement={editingScheduledMovement}
          setIsModalOpen={setIsModalOpen}
          submitNewSingleMovement={submitNewSingleMovement}
          submitNewScheduledMovement={submitNewScheduledMovement}
          updateSingleMovement={updateSingleMovement}
          updateScheduledMovement={updateScheduledMovement}
          onModalHide={resetStates}
        />
      </View>
    </NewMovementContext.Provider>
  );
};

export default NewMovementProvider;
