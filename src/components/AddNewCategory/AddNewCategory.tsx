import React, { useContext, useEffect, useState } from 'react';
import { Controller as FormElement, useForm } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-ui-lib';
import IconButton from '../common/Buttons/IconButton/IconButton';
import GlobalContext from '../../contexts/GlobalContext';
import { IMovement } from '../../types/movements';
import { Text as ElementsText } from 'react-native-elements';

import styles from './styles';

export interface IAddNewCategory {
  onSubmit: (data: any, categoryID?: string) => void;
  data?: any;
}

const AddNewCategory: React.FC<IAddNewCategory> = props => {
  const data = props.data;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { onSubmit } = props;

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
          <ElementsText h4 style={{ color: 'white' }}>
            Nueva Categoría
          </ElementsText>
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
              defaultValue={data?.name}
            />
            {errors.name && (
              <Text style={styles.formErrorMessage}>Nombre requerido</Text>
            )}
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
              name="description"
              defaultValue={data?.description || ''}
            />
          </View>
        </View>
        <View style={[styles.defaultContainer, styles.buttonsContainer]}>
          <Button
            style={styles.saveButton}
            label="Guardar"
            onPress={handleSubmit(data => onSubmit(data, props.data?.id))}
          />
        </View>
      </View>
    </View>
  );
};

export default AddNewCategory;
