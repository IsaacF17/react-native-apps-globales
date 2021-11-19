import React, { useContext, useState, useEffect } from 'react';
import { View, ScrollView, Text } from 'react-native';
import Modal from 'react-native-modal';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalContext from '../../contexts/GlobalContext';
import { IMovement, IScheduledMovement } from '../../types/movements';
import { SwipeableList } from '../common/SwipeableList/SwipeableList';
import Header from './Header/Header';
import { List } from './List/List';
import ModalContent from './Modal/Modal';
import { updateNextDates } from '../../utils/scheduledMovements';
import ScheduledService from '../../firebase/Scheduled';
import MovementService from '../../firebase/Movement';
import { getToday, getTomorrow } from '../../utils/unix';
import { orderBy } from 'lodash';

import styles from './styles';
import NewMovementContext from '../../contexts/NewMovementContext';
import CustomLineChart from '../common/Charts/CustomLineChart';

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
    homeChartData,
    user,
  } = useContext(GlobalContext);

  const { setIsModalOpen, setEditingMovement, removeSingleMovement } =
    useContext(NewMovementContext);

  const [isPendingModalOpen, setIsPendingModalOpen] = useState<boolean>(false);
  const [weekMovements, setWeekMovements] = useState<{
    today: Array<IMovement>;
    restOfWeek: Array<IMovement>;
  }>({ today: [], restOfWeek: [] });

  const handleSavePendingMovements = (selectedIds: {
    [key: string]: boolean;
  }) => {
    const selectedMovements: Array<IScheduledMovement> =
      scheduledMovements.filter(movement => selectedIds[movement.id]);

    const newMovements: Array<IMovement> = selectedMovements.map<IMovement>(
      movement => ({
        id: 'undefined',
        name: movement.name,
        category: movement.category,
        userId: movement.userId,
        type: movement.type,
        value: movement.value,
        date: movement.nextDate,
        iconCategoryName: movement.iconCategoryName,
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

    setIsPendingModalOpen(false);
  };

  useEffect(() => {
    if (movementList.length) {
      const todayUnix = getToday();
      const tomorrowUnix = getTomorrow();

      const today: Array<IMovement> = [];
      const restOfWeek: Array<IMovement> = [];

      movementList.forEach(movement => {
        if (movement.date >= todayUnix && movement.date < tomorrowUnix) {
          today.push(movement);
        } else {
          restOfWeek.push(movement);
        }
      });

      setWeekMovements({
        today: orderBy(today, ['date'], ['desc']),
        restOfWeek: orderBy(restOfWeek, ['date'], ['desc']),
      });
    }
  }, [movementList]);

  useEffect(() => {
    if (expiredMovements.length) {
      setTimeout(() => {
        setIsPendingModalOpen(true);
      }, 2000);
    }
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#161d1d' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Header user_name={user.name} />
          <CustomLineChart
            data={homeChartData}
            titles={['Gastos', 'Ingresos', 'Fujo']}
          />
          <ScrollView>
            {weekMovements?.today?.length ? (
              <>
                <Text style={styles.sectionSubtitle}>Hoy:</Text>
                <SwipeableList
                  data={weekMovements.today}
                  childComponent={List}
                  disableNestedScrollView
                  leftFunction={(data: IMovement) => {
                    setEditingMovement(
                      weekMovements.today.find(
                        movement => movement.id === data.id,
                      ) ?? null,
                    );
                    setIsModalOpen(true);
                  }}
                  rightFunction={(data: IMovement) =>
                    removeSingleMovement(data.id)
                  }
                />
              </>
            ) : null}
            {weekMovements?.restOfWeek?.length ? (
              <>
                <Text
                  style={[
                    styles.sectionSubtitle,
                    { marginTop: weekMovements?.today?.length ? 15 : 0 },
                  ]}>
                  Esta semana:
                </Text>
                <SwipeableList
                  data={weekMovements.restOfWeek}
                  childComponent={List}
                  disableNestedScrollView
                  leftFunction={(data: IMovement) => {
                    setEditingMovement(
                      weekMovements.restOfWeek.find(
                        movement => movement.id === data.id,
                      ) ?? null,
                    );
                    setIsModalOpen(true);
                  }}
                  rightFunction={(data: IMovement) =>
                    removeSingleMovement(data.id)
                  }
                />
              </>
            ) : null}
          </ScrollView>
          <Modal
            style={styles.modal}
            isVisible={isPendingModalOpen}
            animationIn="slideInDown"
            animationOut="slideOutDown"
            backdropOpacity={0}
            onBackdropPress={() => setIsPendingModalOpen(false)}>
            <ModalContent
              expiredMovements={expiredMovements}
              handleSavePendingMovements={handleSavePendingMovements}
            />
          </Modal>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
