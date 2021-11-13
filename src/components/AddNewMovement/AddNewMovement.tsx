import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Controller as FormElement, useForm } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import { ItemValue } from '@react-native-community/picker/typings/Picker';
import { Picker } from '@react-native-community/picker';
import uuid from 'react-native-uuid';
import IconButton from '../common/Buttons/IconButton/IconButton';
import ToggleButton from '../common/Buttons/ToggleButton/ToggleButton';
import { IMovement } from '../../types/movements';
import { formatShortDate } from '../../utils/dates';
import { IDatePickerState } from '../../types/dates';
import GlobalContext from '../../contexts/GlobalContext';

import styles from './styles';

export interface IAddNewMovement {
  onSubmit: (data: any) => void;
  initialType?: 'income' | 'expense';
  initialPeriocity?: 'single' | 'auto';
}

const AddNewMovement: React.FC<IAddNewMovement> = props => {
  const { testCategoryList } = useContext(GlobalContext);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { onSubmit, initialType, initialPeriocity } = props;

  const [globalUniqueId] = useState<string>(uuid.v4().toString());
  const [toggleType, setToggleType] = useState<IMovement['type']>('income');
  const [togglePeriocity, setTogglePeriocity] = useState<'single' | 'auto'>(
    'single',
  );
  const [periodicity, setPeriodicity] =
    useState<IMovement['periodicity']>('weekly');
  const [datePickerState, setDatePickerState] = useState<IDatePickerState>({
    isOpen: false,
    currentDate: new Date(),
  });

  useEffect(() => {
    if (initialType === 'expense') {
      setToggleType('expense');
    }
    if (initialPeriocity === 'auto') {
      setTogglePeriocity('auto');
    }
  }, []);

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
              defaultValue=""
            />
            {errors.name && (
              <Text style={styles.formErrorMessage}>Nombre requerido</Text>
            )}
          </View>
          <View
            style={[styles.defaultContainer, styles.formMultiInputContainer]}>
            <View style={styles.formInputTypeContainer}>
              <ToggleButton
                style={styles.toggleButton}
                initialLabelIndex={initialType === 'expense' ? 1 : 0}
                onChange={(activeLabel, activeIndex) => {
                  setToggleType(activeIndex === 0 ? 'income' : 'expense');
                }}
                labels={[
                  { label: 'Ingreso', color: '#27a02b' },
                  { label: 'Gasto', color: '#ff0000' },
                ]}
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
                    value={value}
                    keyboardType="numeric"
                    placeholder="Monto"
                  />
                )}
                name="value"
                rules={{ required: true, pattern: /^\d+$/ }}
                defaultValue=""
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
                style={styles.toggleButton}
                initialLabelIndex={initialPeriocity === 'auto' ? 1 : 0}
                onChange={(activeLabel, activeIndex) => {
                  setTogglePeriocity(activeIndex === 0 ? 'single' : 'auto');
                }}
                labels={[
                  { label: 'Simple', color: '#4287f5' },
                  { label: 'Auto', color: '#863bdb' },
                ]}
              />
            </View>
            <View style={styles.formInputPeriodicityContainer}>
              <Picker
                key={`new-movement-periocity-picker-${globalUniqueId}`}
                testID={`new-movement-periocity-picker-${globalUniqueId}`}
                pointerEvents={togglePeriocity === 'auto' ? 'auto' : 'none'}
                enabled={togglePeriocity === 'auto'}
                style={[
                  styles.formTextInput,
                  styles.formInputPeriodicity,
                  {
                    color: togglePeriocity === 'auto' ? 'black' : 'white',
                    opacity: togglePeriocity === 'auto' ? 1 : 0.5,
                  },
                ]}
                itemStyle={[styles.formInputPeriodicity]}
                selectedValue={periodicity}
                onValueChange={(itemValue: ItemValue) => {
                  setPeriodicity(itemValue as IMovement['periodicity']);
                }}>
                <Picker.Item label="Semanal" value="weekly" />
                <Picker.Item label="Quincenal" value="biweekly" />
                <Picker.Item label="Mensual" value="monthly" />
                <Picker.Item label="Anual" value="annual" />
              </Picker>
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
                  value={value}
                  placeholder="Detalles"
                />
              )}
              name="details"
              defaultValue=""
            />
          </View>
        </View>
        <View style={[styles.defaultContainer, styles.buttonsContainer]}>
          <Button
            style={styles.saveButton}
            label="Guardar"
            onPress={handleSubmit(data => {
              Object.assign(data, {
                date: datePickerState.currentDate,
              });
              onSubmit(data);
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
