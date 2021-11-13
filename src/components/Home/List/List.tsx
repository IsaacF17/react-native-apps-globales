import React from 'react';
import { View, Text } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from './styles';

interface IHideContent {
  title?: string;
  icon_name?: string;
}

interface IListData {
  title?: string;
  subtitle?: string;
  icon_name?: string;
  right_title?: string;
  right_subtitle?: string;
  right_content?: IHideContent;
  left_content?: IHideContent;
}

export const List: React.FC<any> = (props?) => {
  const data = props.data;
  return (
    <>
      <View style={styles.rowFront}>
        <Avatar
          rounded
          icon={{
            name: 'spotify',
            type: 'font-awesome',
            color: 'green',
          }}
          iconStyle={{ marginTop: -2 }}
          size={70}
        />
        <View>
          <Text style={[styles.tex, styles.title]}>{data?.title}</Text>
          <Text style={[styles.tex, styles.subTitle]}>{data?.subtitle}</Text>
        </View>
        <View>
          <Text style={[styles.tex, styles.right_title]}>
            {data?.right_title}
          </Text>
          <Text style={[styles.tex, styles.right_subtitle]}>
            {data?.right_subtitle}
          </Text>
        </View>
      </View>
    </>
  );
};
