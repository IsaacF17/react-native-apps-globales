import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Button, ButtonProps } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import { IconProps } from 'react-native-vector-icons/Icon';

import styles from './styles';

export interface IIconButton {
  name: string;
  style?: StyleProp<ViewStyle>;
  iconProps?: Partial<IconProps>;
  onPress?: (event: Event) => void;
}

const IconButton: React.FC<IIconButton & ButtonProps> = props => {
  const buttonPlusProps: IIconButton = props;
  const buttonProps: ButtonProps = props;

  const { name, style, iconProps, onPress } = buttonPlusProps;

  const plusIcon = <Icon name={name} size={30} color={'#fff'} {...iconProps} />;

  return (
    <Button
      {...buttonProps}
      style={[styles.button, style]}
      onPress={onPress}
      iconSource={() => plusIcon}
    />
  );
};

export default IconButton;
