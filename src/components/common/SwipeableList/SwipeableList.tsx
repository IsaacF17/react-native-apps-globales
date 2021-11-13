import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { Icon } from 'react-native-elements';
import { SwipeListView } from 'react-native-swipe-list-view';
import styles from './styles';

interface IHideContent {
  title?: string;
  icon_name?: string;
}

interface IProps {
  childComponent: React.FunctionComponent<any>;
  data: any;
  disabledLeftContent?: boolean;
  disabledRightContent?: boolean;
  leftContent?: IHideContent;
  rightContent?: IHideContent;
  leftFunction?: (data: any) => void;
  rightFunction?: (data: any) => void;
}

export const SwipeableList: React.FC<IProps> = props => {
  return (
    <SwipeListView
      data={props.data}
      renderItem={(data: any, rowMap) => (
        <>
          <props.childComponent data={data.item} />
        </>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={styles.hide_content_container}>
          {!props.disabledRightContent && (
            <TouchableHighlight
              onPress={() =>
                props.leftFunction ? props.leftFunction(data.item) : null
              }>
              <View style={styles.left_content}>
                <Text style={styles.left_content_title}>
                  {props.leftContent?.title}
                </Text>
                <Icon
                  solid
                  size={30}
                  name={`${props.leftContent?.icon_name}`}
                  type="font-awesome"
                  color="white"
                  tvParallaxProperties={undefined}
                />
              </View>
            </TouchableHighlight>
          )}
          {!props.disabledLeftContent && (
            <TouchableHighlight
              onPress={() =>
                props.leftFunction ? props.leftFunction(data.item) : null
              }>
              <View style={styles.right_content}>
                <Text style={styles.right_content_title}>
                  {props.rightContent?.title}
                </Text>
                <Icon
                  solid
                  size={30}
                  name={`${props.rightContent?.icon_name}`}
                  type="font-awesome"
                  color="white"
                  tvParallaxProperties={undefined}
                />
              </View>
            </TouchableHighlight>
          )}
        </View>
      )}
      leftOpenValue={70}
      rightOpenValue={-70}
      disableLeftSwipe={props.disabledRightContent}
      disableRightSwipe={props.disabledLeftContent}
    />
  );
};
