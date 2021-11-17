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
  disableNestedScrollView?: boolean;
  leftContent?: IHideContent;
  rightContent?: IHideContent;
  leftFunction?: (data: any) => void;
  rightFunction?: (data: any) => void;
}

const defaultLeftContent = {
  title: 'INFO',
  icon_name: 'info-circle',
};

const defaultRightContent = {
  title: 'Quitar',
  icon_name: 'trash',
};

export const SwipeableList: React.FC<IProps> = props => {
  const { leftContent, rightContent } = props;

  const scrollEnabled = props.disableNestedScrollView ?? false;

  return (
    <SwipeListView
      nestedScrollEnabled={scrollEnabled}
      scrollEnabled={scrollEnabled}
      disableScrollViewPanResponder={!scrollEnabled}
      data={props.data}
      renderItem={(data: any, rowMap) => (
        <>
          <props.childComponent data={data.item} key={rowMap} />
        </>
      )}
      renderHiddenItem={(data, rowMap) => (
        <View style={styles.hide_content_container}>
          {!props.disabledLeftContent && (
            <TouchableHighlight onPress={() => props.leftFunction?.(data.item)}>
              <View style={styles.left_content}>
                <Text style={styles.left_content_title}>
                  {(leftContent ?? defaultLeftContent)?.title}
                </Text>
                <Icon
                  solid
                  size={30}
                  name={`${(leftContent ?? defaultLeftContent)?.icon_name}`}
                  type="font-awesome"
                  color="white"
                  tvParallaxProperties={undefined}
                />
              </View>
            </TouchableHighlight>
          )}
          {!props.disabledRightContent && (
            <TouchableHighlight
              onPress={() => props.rightFunction?.(data.item)}>
              <View style={styles.right_content}>
                <Text style={styles.right_content_title}>
                  {(rightContent ?? defaultRightContent)?.title}
                </Text>
                <Icon
                  solid
                  size={30}
                  name={`${(rightContent ?? defaultRightContent)?.icon_name}`}
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
