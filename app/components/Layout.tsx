import React from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import {LayoutPropsType} from '../types/components';
import {COLORS} from 'theme/colors';
import ScreenHeader from './headers/ScreenHeader';
import {useNavigation} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const Layout = ({
  children,
  style,
  headerTitle = '',
  onBackPress,
  hideStatusBar = false,
  isScrollable = false,
  customLogo = () => null,
  onPressCustomLogo,
  headerScrollable = false,
}: LayoutPropsType) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const renderHeader = () => (
    <ScreenHeader
      onBackPress={() => {
        if (onBackPress) {
          onBackPress();
        } else {
          navigation.goBack();
        }
      }}
      customLogo={customLogo}
      onPressLogo={onPressCustomLogo}
      header={headerTitle}
    />
  );
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        animated
        barStyle="light-content"
        backgroundColor={COLORS.dDarkGreen}
        hidden={hideStatusBar}
      />
      <View style={[styles.statusBarPlaceholder, {height: insets.top}]} />

      {headerTitle && !headerScrollable && renderHeader()}

      {isScrollable ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}
          automaticallyAdjustKeyboardInsets={true}>
          {headerTitle && headerScrollable && renderHeader()}
          <View style={[styles.scrollableLayout, style]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.layout, style]}>
          {headerTitle && headerScrollable && renderHeader()}
          {children}
        </View>
      )}
    </View>
  );
};

export default Layout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Platform.OS === 'ios' ? COLORS.dDarkGreen : COLORS.white,
  },
  layout: {
    flex: 1,
    backgroundColor: COLORS.lightGreenBackground,
  },
  scrollView: {flexGrow: 1},
  scrollableLayout: {
    flex: 1,
    flexGrow: 1,
    backgroundColor: COLORS.lightGreenBackground,
  },
  statusBarPlaceholder: {
    backgroundColor: COLORS.dDarkGreen,
  },
});
