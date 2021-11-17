import React from 'react'
import RadioButtonRN from 'radio-buttons-react-native';
import { View } from 'react-native';

export const VisualizationOptions = () => {
    const data = [
        {
            label: 'Día'
        },
        {
            label: 'Semana'
        },
        {
            label: 'Quincena'
        },
        {
            label: 'Mes'
        },
        {
            label: 'Año'
        }
    ];
    return (
        <View style={{alignSelf: 'center'}}>
            <RadioButtonRN
                data={data}
                selectedBtn={(e) => console.log(e)}
                boxStyle={{height : 60, width: 200}}
            />
        </View>
    );
}