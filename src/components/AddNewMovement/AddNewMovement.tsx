import React from 'react';
import { Controller as FormElement, useForm } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-ui-lib';
import IconButton from '../common/Buttons/IconButton/IconButton';

import styles from './styles';

const AddNewMovement: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(
      'TODO: Save new income/expense',
      `Data: ${JSON.stringify(data)}`,
    );
  };

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
            <Text style={styles.headerData}>28/09/2021</Text>
          </View>
          <View style={[styles.iconContainer, { backgroundColor: '#4287f5' }]}>
            {/* TODO: Date picker to choose date */}
            <IconButton
              name="calendar"
              iconProps={{ size: 25 }}
              style={styles.iconButtons}
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
              {/* TODO: Single toggle button for type (income/expense) */}
              <Text style={{ color: 'white' }}>TODO: Toggle</Text>
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
                rules={{ required: true }}
                defaultValue=""
              />
              {errors.value && (
                <Text style={styles.formErrorMessage}>Monto requerido</Text>
              )}
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
            onPress={handleSubmit(data => onSubmit(data))}
          />
        </View>
      </View>
    </View>
  );
};

export default AddNewMovement;
