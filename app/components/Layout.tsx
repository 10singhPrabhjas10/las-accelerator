import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {LayoutPropsType} from '../types/components';
import {COLORS} from 'theme/colors';
import ScreenHeader from './headers/ScreenHeader';
import {useNavigation} from '@react-navigation/native';

const Layout = ({
  children,
  style,
  headerTitle = '',
  onBackPress,
  hideStatusBar = false,
  isScrollable = false,
}: LayoutPropsType) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        animated
        barStyle="light-content"
        backgroundColor={COLORS.dDarkGreen}
        hidden={hideStatusBar}
      />
      {headerTitle && (
        <ScreenHeader
          onBackPress={() => {
            if (onBackPress) {
              onBackPress();
            } else {
              navigation.goBack();
            }
          }}
          header={headerTitle}
        />
      )}

      {isScrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          automaticallyAdjustKeyboardInsets={true}>
          <View style={[styles.scrollableLayout, style]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.layout, style]}>{children}</View>
      )}
    </SafeAreaView>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {flex: 1},
  layout: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollView: {flexGrow: 1},
  scrollableLayout: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: COLORS.white,
  },
});
