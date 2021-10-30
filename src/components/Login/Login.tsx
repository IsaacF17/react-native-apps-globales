import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../Registration/styles';
import { Button } from 'react-native-elements';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    console.log(data);
  };

  const onFooterLinkPress = () => {
    navigation.navigate('Registro');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Correo electrónico"
          />
        )}
        name="email"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.email && <Text style={styles.error}>Este campo es requerido.</Text>}
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Contraseña"
            textContentType="password"
          />
        )}
        name="pass"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.pass?.type === 'required' && (
        <Text style={styles.error}>Este campo es requerido</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleSubmit(data => onSubmit(data))}>
        <Text style={styles.buttonTitle}>Inciar Sesión</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.footerText}>
          No tengo una cuenta.
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            {' '}
            Crear una nueva
          </Text>
        </Text>
        <Button title="Solid Button" />
      </View>
    </View>
  );
};

export default LoginScreen;
