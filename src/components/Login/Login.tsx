import React, { useContext } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput } from 'react-native';
import styles from '../Registration/styles';
import { Button } from 'react-native-elements';
import { checkUserData } from '../../firebase/Users';
import { getCategories } from '../../firebase/Categories';
import GlobalContext from '../../contexts/GlobalContext';
import { fromDateToUnix } from '../../utils/unix';
import moment from 'moment';
import { getReportData } from '../../firebase/Reports';
import { convertToMonthOrDayData } from '../../utils/reports';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { setCategoriesList, setUser, setHomeChartData } =
    useContext(GlobalContext);

  const onSubmit = async (data: any) => {
    //data.email, data.pass
    const userResponse = await checkUserData('admin@mail.com', '123');
    if (userResponse) {
      setUser(userResponse);
      //setUser({ id: 'cufVpoJMKg6Xq1tKryo7' });
      const categories = await getCategories(userResponse.id);
      setCategoriesList(categories);
      const fromDate = fromDateToUnix(
        moment(new Date()).subtract(2, 'month').toDate(),
      ); // 2 meses antes de la fecha de hoy
      const toDate = fromDateToUnix(new Date());
      const dbData = await getReportData(fromDate, toDate);
      const chartData: any = convertToMonthOrDayData(dbData, 'month');
      setHomeChartData(chartData[2]);
      navigation.navigate('Home');
    }
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
        onPress={handleSubmit(data => onSubmit(data))}></Button>
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
