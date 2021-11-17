import React from 'react';
import Modal from 'react-native-modal';
import {
  IMovement,
  IScheduledMovement,
  MovementScheduleType,
  MovementType,
} from '../../../types/movements';
import AddNewMovement from './AddNewMovement/AddNewMovement';

import styles from './styles';

export interface IModalAddNewMovement {
  isModalOpen: boolean;
  initialType: MovementType;
  initialScheduleType: MovementScheduleType;
  editingMovement: IMovement | null;
  editingScheduledMovement: IScheduledMovement | null;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  submitNewSingleMovement: (data: IMovement) => Promise<void>;
  submitNewScheduledMovement: (data: IScheduledMovement) => Promise<void>;
  updateSingleMovement: (data: IMovement) => Promise<void>;
  updateScheduledMovement: (data: IScheduledMovement) => Promise<void>;
  onModalHide?: () => void;
}

const ModalAddNewMovement: React.FC<IModalAddNewMovement> = props => {
  const {
    isModalOpen,
    initialType,
    initialScheduleType,
    editingMovement,
    editingScheduledMovement,
    setIsModalOpen,
    submitNewSingleMovement,
    submitNewScheduledMovement,
    updateSingleMovement,
    updateScheduledMovement,
    onModalHide,
  } = props;

  return (
    <Modal
      style={styles.addNewMovementModal}
      isVisible={isModalOpen}
      animationIn="slideInDown"
      animationOut="slideOutDown"
      backdropOpacity={0}
      onBackdropPress={() => setIsModalOpen(false)}
      onModalHide={onModalHide}>
      <AddNewMovement
        initialType={initialType}
        initialScheduleType={initialScheduleType}
        singleMovement={editingMovement}
        scheduledMovement={editingScheduledMovement}
        submitNewSingleMovement={submitNewSingleMovement}
        submitNewScheduledMovement={submitNewScheduledMovement}
        updateSingleMovement={updateSingleMovement}
        updateScheduledMovement={updateScheduledMovement}
      />
    </Modal>
  );
};

export default ModalAddNewMovement;
