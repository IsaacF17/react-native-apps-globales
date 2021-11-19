import React, { useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { Controller, useForm } from 'react-hook-form';
import { add } from '../../firebase/Users';
import { omit } from 'lodash';

export const RegistrationScreen = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const [error, setError] = useState('');

  const password = useRef({});
  password.current = watch('pass', '');

  const onSubmit = async (data: any) => {
    const userData = omit(data, ['confirmPass']);
    const res = await add(userData);
    if (res) navigation.navigate('Login');
    else setError('Email ya está en uso, ingrese uno diferente');
  };

  const onFooterLinkPress = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
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
      {errors.nombre && (
        <Text style={styles.error}>Este campo es requerido.</Text>
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Correo electrónico"
            textContentType="emailAddress"
          />
        )}
        name="email"
        rules={{
          required: {
            value: true,
            message: 'Este campo es requerido',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Dirección de correo inválida',
          },
        }}
        defaultValue=""
      />
      {errors.email && (
        <Text style={styles.error}>{errors?.email?.message}</Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            placeholder="Contraseña"
          />
        )}
        name="pass"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.pass?.type === 'required' && (
        <Text style={styles.error}>Este campo es requerido</Text>
      )}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
            placeholder="Confirmar contraseña"
          />
        )}
        name="confirmPass"
        rules={{
          required: {
            value: true,
            message: 'Este campo es requerido',
          },
          validate: {
            value: value =>
              value === password.current || 'Las contraseñas no coinciden',
          },
        }}
        defaultValue=""
      />
      {errors.confirmPass && (
        <Text style={styles.error}>{errors.confirmPass?.message}</Text>
      )}
      <View>
        <Text style={styles.footerText}>
          Ya tengo una cuenta.
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            {' '}
            Iniciar sesión
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(data => onSubmit(data))}>
        <Text style={styles.buttonTitle}>Crear cuenta</Text>
      </TouchableOpacity>
    </View>
  );
};
