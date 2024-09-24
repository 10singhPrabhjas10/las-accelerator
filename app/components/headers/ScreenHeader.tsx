import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {IScreenHeaderProps} from 'types/headers';
import {COLORS} from 'theme/colors';
import LogoSvg from '../../../assets/images/logo.svg';
import Icon from 'react-native-vector-icons/Ionicons';

const ScreenHeader = ({
  showScreenName = true,
  onBackPress,
  header,
  headerStyle,
  customLogo = () => null,
  onPressLogo = () => false,
}: IScreenHeaderProps) => {
  return (
    <View style={[styles.container, headerStyle]}>
      {showScreenName ? (
        <>
          <Icon
            onPress={onBackPress}
            style={styles.iconStyle}
            name="arrow-back"
            size={25}
            color="white"
          />
          <Text variant="bodyLarge" style={styles.header}>
            {header}
          </Text>
          <TouchableOpacity
            disabled={!onPressLogo()}
            onPress={onPressLogo}
            style={styles.logoContainer}>
            {!customLogo() ? <LogoSvg /> : customLogo()}
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          disabled={!onPressLogo()}
          onPress={onPressLogo}
          style={styles.header}>
          {!customLogo() ? <LogoSvg /> : customLogo()}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    height: 54,
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: 16,
    backgroundColor: COLORS.dDarkGreen,
    borderBottomColor: COLORS.grey3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3.84,
    shadowOpacity: 0.25,
    paddingVertical: 10,
  },
  iconStyle: {
    marginLeft: 10,
  },
  header: {
    flex: 1,
    color: COLORS.white,
    marginLeft: 24,
  },
  logoContainer: {
    marginRight: 16,
  },
});
