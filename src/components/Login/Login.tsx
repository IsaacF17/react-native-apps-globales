import React, { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './styles';
import { checkUserData } from '../../firebase/Users';
import { getCategories } from '../../firebase/Categories';
import GlobalContext from '../../contexts/GlobalContext';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setCategoriesList, setUser } = useContext(GlobalContext);

  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    const userResponse = await checkUserData(data.email, data.pass);
    if (userResponse) {
      setUser(userResponse);
      const categories = await getCategories(userResponse.id);
      setCategoriesList(categories);
      navigation.navigate('Home');
    }
    setError('Correo electrónico y/o contraseña incorrecto');
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
            secureTextEntry
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
      {error ? (
        <Text style={[styles.error, { marginTop: 3, marginBottom: 10 }]}>
          {error}
        </Text>
      ) : null}
      <View>
        <Text style={styles.footerText}>
          No tengo una cuenta.
          <Text onPress={onFooterLinkPress} style={styles.footerLink}>
            {' '}
            Crear una nueva
          </Text>
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(data => onSubmit(data))}>
        <Text style={styles.buttonTitle}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
