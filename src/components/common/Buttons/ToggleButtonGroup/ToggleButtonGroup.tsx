import React from 'react';
import { ButtonGroup } from 'react-native-elements';
import styles from './styles';

export interface IToggleButtonGroup {
  buttons: Array<string>;
  selectedIndexes: Array<number>;
  setSelectedIndexes: (value: Array<number>) => void;
}

const ToggleButtonGroup: React.FC<IToggleButtonGroup> = props => {
  const { buttons, selectedIndexes, setSelectedIndexes } = props;

  return (
    <ButtonGroup
      buttons={buttons}
      selectMultiple
      selectedIndexes={selectedIndexes}
      onPress={setSelectedIndexes}
      containerStyle={[styles.transparency, styles.container]}
      buttonContainerStyle={[styles.transparency, styles.buttonContainer]}
      buttonStyle={[styles.transparency, styles.button]}
      textStyle={[styles.transparency, styles.text]}
      innerBorderStyle={styles.innerBorderStyle}
      selectedButtonStyle={[styles.transparency, styles.button]}
      selectedTextStyle={[
        styles.transparency,
        styles.text,
        styles.selectedTextStyle,
      ]}
    />
  );
};

export default ToggleButtonGroup;
