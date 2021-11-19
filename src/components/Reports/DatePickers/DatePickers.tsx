import React from 'react';
import { Pressable, View } from 'react-native';
import { Icon, Input } from 'react-native-elements';
import { formatShortDate } from '../../../utils/dates';
import styles from './styles';

interface IDatePickerProps {
  showCalendar: (arg: boolean) => void;
  setActiveDatePicker: (arg: string) => void;
  fromDateValue: Date;
  toDateValue: Date;
  clearDate: (arg: string) => void;
}

export const DatePickers = (props: IDatePickerProps) => {
  const { fromDateValue, toDateValue } = props;
  return (
    <View style={styles.dates_container}>
      <Pressable
        onPress={() => {
          props.showCalendar(true);
          props.setActiveDatePicker('from');
        }}>
        <View pointerEvents="none" style={styles.date_input}>
          <Input
            placeholder="DD/MM/AAAA"
            disabled
            leftIcon={
              <Icon
                name="calendar"
                type="font-awesome"
                size={20}
                color="#e5ebec"
              />
            }
            style={{ textAlign: 'center', fontSize: 15, color: 'white' }}
            label="Desde"
            value={fromDateValue ? formatShortDate(fromDateValue) : ''}
          />
        </View>
      </Pressable>
      <View>
        {fromDateValue && (
          <Icon
            name="times"
            type="font-awesome"
            size={15}
            color="red"
            onPress={() => props.clearDate('from')}
            iconStyle={styles.remove_icon}
          />
        )}
      </View>
      <Pressable
        onPress={() => {
          props.showCalendar(true);
          props.setActiveDatePicker('to');
        }}>
        <View pointerEvents="none" style={styles.date_input}>
          <Input
            placeholder="DD/MM/AAAA"
            disabled
            leftIcon={
              <Icon
                name="calendar"
                type="font-awesome"
                size={20}
                color="#e5ebec"
                onPress={() => console.log('FUNCA')}
              />
            }
            style={{ textAlign: 'center', fontSize: 15, color: 'white' }}
            label="Hasta"
            value={toDateValue ? formatShortDate(toDateValue) : ''}
          />
        </View>
      </Pressable>
      <View>
        {toDateValue && (
          <Icon
            name="times"
            type="font-awesome"
            size={15}
            color="red"
            iconStyle={styles.remove_icon}
            onPress={() => props.clearDate('to')}
          />
        )}
      </View>
    </View>
  );
};
