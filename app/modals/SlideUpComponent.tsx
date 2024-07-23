import React from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import {COLORS} from 'theme/colors';
import {ISlideUpComponentProps} from 'types/modal';

const SlideUpComponent = ({
  modalHeight,
  children,
  ...customProps
}: ISlideUpComponentProps) => {
  const componentMaxHeight = Math.round(Dimensions.get('window').height * 0.35);

  return (
    <View style={[styles.container, {maxHeight: componentMaxHeight}]}>
      <Animated.View style={[styles.modalContainer, {height: modalHeight}]}>
        <ScrollView style={styles.modalContainerView} {...customProps}>
          {children}
        </ScrollView>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    bottom: 0,
    width: Dimensions.get('window').width,
  },
  modalContainer: {
    backgroundColor: COLORS.white,
    ...Platform.select({
      ios: {
        shadowOffset: {width: 0, height: -2},
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 2,
        shadowOpacity: 0.2,
      },
    }),
  },
  modalContainerView: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default SlideUpComponent;
