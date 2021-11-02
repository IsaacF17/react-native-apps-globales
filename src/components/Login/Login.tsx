import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';
import styles from '../Registration/styles';
import { Button } from 'react-native-elements';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  //enable google sing in configuration
  GoogleSignin.configure({
    webClientId:
      '413467188114-lo4s4kqhpa8ii1naffkd3qktc29ohgpi.apps.googleusercontent.com',
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    navigation.navigate('Home');
  };

  const onFooterLinkPress = () => {
    navigation.navigate('Registro');
  };

  const googleSignIn = () => {
    // onGoogleButtonPress();
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
        //rules={{ required: true }}
        defaultValue=""
      />
      {errors.email && (
        <Text style={styles.error}>Este campo es requerido.</Text>
      )}
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
        //rules={{ required: true }}
        defaultValue=""
      />
      {errors.pass?.type === 'required' && (
        <Text style={styles.error}>Este campo es requerido</Text>
      )}
      <Button
        title="Iniciar Sesión"
        onPress={handleSubmit(data => onSubmit(data))}
      ></Button>
      <View>
        <Text style={styles.footerText}>
          Utiliza tu cuenta de
          <Text onPress={googleSignIn} style={styles.footerLink}>
            {' '}
            Google
          </Text>
        </Text>
      </View>
      <View>
        <Text style={styles.footerText}>
          No tengo una cuenta.
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            {' '}
            Crear una nueva
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
