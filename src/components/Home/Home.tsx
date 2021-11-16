import React, { useContext, useState, useEffect } from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalContext from '../../contexts/GlobalContext';
import { IMovement, IScheduledMovement } from '../../types/movements';
import { SwipeableList } from '../common/SwipeableList/SwipeableList';
import HomeChart from './Chart/HomeChart';
import Header from './Header/Header';
import { List } from './List/List';
import ModalContent from './Modal/Modal';
import { updateNextDates } from '../../utils/scheduledMovements';
import ScheduledService from '../../firebase/Scheduled';
import MovementService from '../../firebase/Movement';

import styles from './styles';

const left_content = {
  title: 'INFO',
  icon_name: 'info-circle',
};

const right_content = {
  title: 'Quitar',
  icon_name: 'trash',
};

const test = (item?: any) => {
  console.log('Test completed, ID: ', item.id);
};

export interface IHomeScreen {
  navigation: any;
}

const HomeScreen: React.FC<IHomeScreen> = () => {
  const {
    scheduledMovements,
    refreshScheduledMovements,
    movementList,
    refreshMovementList,
    expiredMovements,
  } = useContext(GlobalContext);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleSavePendingMovements = (selectedIds: {
    [key: string]: boolean;
  }) => {
    const selectedMovements: Array<IScheduledMovement> =
      scheduledMovements.filter(movement => selectedIds[movement.id]);

    const newMovements: Array<IMovement> = selectedMovements.map<IMovement>(
      movement => ({
        id: 'undefined',
        name: movement.name,
        userId: movement.userId,
        type: movement.type,
        value: movement.value,
        date: movement.nextDate,
      }),
    );

    const updatedScheduledMovements: Array<IScheduledMovement> =
      selectedMovements.map(updateNextDates);

    if (newMovements?.length) {
      MovementService.addAll(newMovements).then(response => {
        if (response) {
          refreshMovementList();
        }
      });
    }

    if (updatedScheduledMovements?.length) {
      ScheduledService.updateAll(updatedScheduledMovements).then(response => {
        if (response) {
          refreshScheduledMovements();
        }
      });
    }

    setIsModalOpen(false);
  };

  useEffect(() => {
    if (expiredMovements.length) {
      setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Header />
        <HomeChart />
        <SwipeableList
          data={movementList}
          childComponent={List}
          rightContent={right_content}
          leftContent={left_content}
          leftFunction={test}
        />
        <Modal
          style={styles.modal}
          isVisible={isModalOpen}
          // isVisible={true}
          animationIn="slideInDown"
          animationOut="slideOutDown"
          backdropOpacity={0}
          onBackdropPress={() => setIsModalOpen(false)}>
          <ModalContent
            expiredMovements={expiredMovements}
            handleSavePendingMovements={handleSavePendingMovements}
          />
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
