import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
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

interface IProps {
  data: IListData[];
  title?: string;
}

export const SwipeableList = (props: IProps) => {
  return (
    <SwipeListView
      data={props.data}
      renderItem={(data: any, rowMap) => (
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
            <Text style={[styles.tex, styles.title]}>{data.item.title}</Text>
            <Text style={[styles.tex, styles.subTitle]}>
              {data.item.subtitle}
            </Text>
          </View>
          <View>
            <Text style={[styles.tex, styles.right_title]}>
              {data.item.right_title}
            </Text>
            <Text style={[styles.tex, styles.right_subtitle]}>
              {data.item.right_subtitle}
            </Text>
          </View>
        </View>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={styles.hide_content_container}>
          <TouchableHighlight>
            <View style={styles.left_content}>
              <Text style={styles.left_content_title}>
                {data.item.left_content?.title}
              </Text>
              <Icon
                solid
                size={30}
                name={`${data.item.left_content?.icon_name}`}
                type="font-awesome"
                color="white"
                tvParallaxProperties={undefined}
              />
            </View>
          </TouchableHighlight>
          <TouchableHighlight>
            <View style={styles.right_content}>
              <Text style={styles.right_content_title}>
                {data.item.right_content?.title}
              </Text>
              <Icon
                solid
                size={30}
                name={`${data.item.right_content?.icon_name}`}
                type="font-awesome"
                color="white"
                tvParallaxProperties={undefined}
              />
            </View>
          </TouchableHighlight>
        </View>
      )}
      leftOpenValue={70}
      rightOpenValue={-70}
    />
  );
};
