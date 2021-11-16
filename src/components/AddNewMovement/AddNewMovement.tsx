import React, { useState } from 'react';
import { Controller as FormElement, useForm } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { Picker } from '@react-native-community/picker';
import uuid from 'react-native-uuid';
import IconButton from '../common/Buttons/IconButton/IconButton';
import ToggleButton from '../common/Buttons/ToggleButton/ToggleButton';
import {
  IMovement,
  IScheduledMovement,
  MovementScheduleType,
  MovementType,
} from '../../types/movements';
import { formatShortDate, parseToDate, parseToUnix } from '../../utils/dates';
import { IDatePickerState } from '../../types/dates';

import styles from './styles';

export interface IAddNewMovement {
  submitNewSingleMovement: (data: IMovement) => void;
  submitNewScheduledMovement: (data: IScheduledMovement) => void;
  updateScheduledMovement: (newData: IScheduledMovement) => void;
  scheduledMovement?: IScheduledMovement | null | undefined;
  initialType?: MovementType;
  initialScheduleType?: MovementScheduleType;
}

const AddNewMovement: React.FC<IAddNewMovement> = props => {
  const {
    submitNewSingleMovement,
    submitNewScheduledMovement,
    updateScheduledMovement,
    scheduledMovement,
    initialType,
    initialScheduleType,
  } = props;

  const [globalUniqueId] = useState<string>(uuid.v4().toString());
  const [isUpdating] = useState<boolean>(!!scheduledMovement?.id);
  const [toggleScheduleType, setToggleScheduleType] =
    useState<MovementScheduleType>(initialScheduleType ?? 'single');
  const [datePickerState, setDatePickerState] = useState<IDatePickerState>({
    isOpen: false,
    currentDate: scheduledMovement?.nextDate
      ? new Date(scheduledMovement.nextDate)
      : new Date(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IMovement & IScheduledMovement>();

  return (
    <View style={styles.mainContainer}>
      <View style={styles.modalView}>
        <View style={[styles.defaultContainer, styles.headerContainer]}>
          <View style={styles.iconContainer}>
            <IconButton
              name="taxi"
              iconProps={{ size: 25 }}
              style={styles.iconButtons}
            />
          </View>
          <View style={styles.dataContainer}>
            <Text style={styles.headerData}>Transporte</Text>
            <Text style={styles.headerData}>
              {formatShortDate(datePickerState.currentDate)}
            </Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: '#4287f5' }]}>
            <IconButton
              name="calendar"
              iconProps={{ size: 25 }}
              style={styles.iconButtons}
              onPress={() => {
                setDatePickerState(prevState => ({
                  ...prevState,
                  isOpen: true,
                }));
              }}
            />
          </View>
        </View>
        <View style={[styles.defaultContainer, styles.formContainer]}>
          <View style={styles.formInputNameContainer}>
            <FormElement
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.formTextInput, styles.formInputName]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder="Nombre"
                />
              )}
              name="name"
              rules={{ required: true }}
              defaultValue={isUpdating ? scheduledMovement?.name : undefined}
            />
            {errors.name && (
              <Text style={styles.formErrorMessage}>Nombre requerido</Text>
            )}
          </View>
          <View
            style={[styles.defaultContainer, styles.formMultiInputContainer]}>
            <View style={styles.formInputTypeContainer}>
              <FormElement
                control={control}
                name="type"
                defaultValue={
                  (isUpdating && scheduledMovement?.type) ||
                  initialType ||
                  'income'
                }
                render={({ field: { onChange } }) => (
                  <ToggleButton
                    style={styles.toggleButton}
                    initialLabelIndex={
                      (isUpdating && scheduledMovement?.type === 'expense') ||
                      initialType === 'expense'
                        ? 1
                        : 0
                    }
                    onChange={(activeLabel, activeIndex) => {
                      const newType = activeIndex === 0 ? 'income' : 'expense';
                      onChange(newType);
                    }}
                    labels={[
                      { label: 'Ingreso', color: '#27a02b' },
                      { label: 'Gasto', color: '#ff0000' },
                    ]}
                  />
                )}
              />
            </View>
            <View style={styles.formInputValueContainer}>
              <FormElement
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.formTextInput, styles.formInputValue]}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value?.toString()}
                    keyboardType="numeric"
                    placeholder="Monto"
                  />
                )}
                name="value"
                rules={{ required: true, pattern: /^\d+$/ }}
                defaultValue={isUpdating ? scheduledMovement?.value : undefined}
              />
              {errors.value && (
                <Text style={styles.formErrorMessage}>
                  {errors?.value?.type === 'required'
                    ? 'Monto requerido'
                    : 'Solo números'}
                </Text>
              )}
            </View>
          </View>
          <View
            style={[styles.defaultContainer, styles.formMultiInputContainer]}>
            <View style={styles.formInputPerioToggleContainer}>
              <ToggleButton
                disabled={isUpdating}
                style={styles.toggleButton}
                initialLabelIndex={initialScheduleType === 'scheduled' ? 1 : 0}
                onChange={(activeLabel, activeIndex) => {
                  setToggleScheduleType(
                    activeIndex === 0 ? 'single' : 'scheduled',
                  );
                }}
                labels={[
                  { label: 'Simple', color: '#4287f5' },
                  { label: 'Auto', color: '#863bdb' },
                ]}
              />
            </View>
            <View style={styles.formInputPeriodicityContainer}>
              <FormElement
                control={control}
                name="periodicity"
                defaultValue={
                  isUpdating ? scheduledMovement?.periodicity : 'weekly'
                }
                render={({ field: { onChange, value } }) => (
                  <Picker
                    key={`new-movement-periodicity-picker-${globalUniqueId}`}
                    testID={`new-movement-periodicity-picker-${globalUniqueId}`}
                    enabled={toggleScheduleType === 'scheduled'}
                    style={[
                      styles.formTextInput,
                      styles.formInputPeriodicity,
                      {
                        color:
                          toggleScheduleType === 'scheduled'
                            ? 'black'
                            : 'white',
                        opacity: toggleScheduleType === 'scheduled' ? 1 : 0.5,
                      },
                    ]}
                    itemStyle={[styles.formInputPeriodicity]}
                    selectedValue={value}
                    onValueChange={(itemValue: ItemValue) => {
                      onChange(itemValue);
                    }}>
                    <Picker.Item label="Semanal" value="weekly" />
                    <Picker.Item label="Quincenal" value="biweekly" />
                    <Picker.Item label="Mensual" value="monthly" />
                    <Picker.Item label="Anual" value="annual" />
                  </Picker>
                )}
              />
            </View>
          </View>
          <View style={styles.formInputDetailsContainer}>
            <FormElement
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.formTextInput, styles.formInputDetails]}
                  multiline={true}
                  numberOfLines={4}
                  maxLength={100}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value?.toString()}
                  placeholder="Detalles"
                />
              )}
              name="details"
              defaultValue={isUpdating ? scheduledMovement?.details : undefined}
            />
          </View>
        </View>
        <View style={[styles.defaultContainer, styles.buttonsContainer]}>
          <Button
            style={styles.saveButton}
            label="Guardar"
            onPress={handleSubmit(data => {
              if (toggleScheduleType === 'single') {
                // @ts-ignore
                delete data.periodicity;
                data.date = parseToUnix(datePickerState.currentDate) ?? 1;
                submitNewSingleMovement(data);
              } else if (toggleScheduleType === 'scheduled') {
                data.nextDate = parseToUnix(datePickerState.currentDate) ?? 1;
                if (isUpdating && scheduledMovement?.id) {
                  data.id = scheduledMovement.id;
                  updateScheduledMovement(data);
                } else {
                  submitNewScheduledMovement(data);
                }
              }
            })}
          />
        </View>
      </View>
      {datePickerState.isOpen && (
        <DateTimePicker
          key={`new-movement-date-picker-${globalUniqueId}`}
          testID={`new-movement-date-picker-${globalUniqueId}`}
          display="default"
          value={datePickerState.currentDate}
          onChange={(event: any, selectedDate?: Date) => {
            console.log('DatePicker: ', parseToUnix(selectedDate));
            setDatePickerState({
              currentDate: selectedDate || datePickerState.currentDate,
              isOpen: false,
            });
          }}
        />
      )}
    </View>
  );
};

export default AddNewMovement;
