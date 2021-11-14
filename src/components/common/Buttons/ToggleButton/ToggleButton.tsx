import { get } from 'lodash';
import React, { useEffect, useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-ui-lib';
import { generateColor } from '../../../../utils/colors';

import styles from './styles';

export interface IToggleButtonLabel {
  label: string;
  color?: string;
}

export interface IToggleButton {
  labels: Array<string> | Array<IToggleButtonLabel>;
  initialLabelIndex?: number;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onChange?: (activeLabel: string, activeIndex?: number) => void;
}

const ToggleButton: React.FC<IToggleButton & ButtonProps> = props => {
  const ownProps: IToggleButton = props;
  const buttonProps: ButtonProps = props;

  const {
    labels = ['UNDEFINED'],
    initialLabelIndex,
    style,
    disabled,
    onChange,
  } = ownProps;

  const [activeLabel, setActiveLabel] = useState<number>(
    initialLabelIndex || 0,
  );

  const [colors, setColors] = useState<Array<string>>([]);

  const getLabel = (index: number) =>
    get(labels[index], 'label', labels[index]);

  const triggerToggle = () => {
    if (activeLabel < labels.length - 1) {
      setActiveLabel(prevState => prevState + 1);
    } else {
      setActiveLabel(0);
    }
  };

  useEffect(() => {
    setColors(
      labels.map(label => {
        const color = get(label, 'color');
        return color || generateColor();
      }),
    );
  }, [labels]);

  useEffect(() => {
    onChange?.(getLabel(activeLabel), activeLabel);
  }, [activeLabel]);

  return (
    <Button
      {...buttonProps}
      disabled={disabled ?? false}
      label={getLabel(activeLabel)}
      style={[
        styles.default,
        { backgroundColor: colors[activeLabel] },
        style,
        {
          opacity: disabled ? 0.5 : 1,
        },
      ]}
      onPress={triggerToggle}
    />
  );
};

export default ToggleButton;
